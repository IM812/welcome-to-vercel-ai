import type { Platform, Search, User } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { SubscriptionService } from './subscription.service';
import { NotificationService } from './notification.service';
import { ParserFactory } from '../parsers/parser.factory';
import { withRetry } from '../utils/retry';
import { parseListingDate } from '../utils/dateParser';
// AvitoParser no longer imported — detail-page fetching removed from check loop
import { hashListing } from '../utils/hash';
import { PLATFORM_DOMAINS, PLAN_LIMITS } from '../types/index';
import { logger } from '../utils/logger';

// How many listings to inspect on each cron tick.
const CHECK_LIMIT = 20;

// In-memory seen set per searchId, populated on the first tick after restart.
// Prevents flooding the user with old listings that were already in the feed
// before this bot process started, without requiring DB writes for each one.
const sessionSeen = new Map<number, Set<string>>();



export class SearchService {
  private searchRepo: SearchRepository;
  private listingRepo: ListingRepository;
  private subService: SubscriptionService;
  private notifService: NotificationService | null = null;

  constructor() {
    this.searchRepo = new SearchRepository();
    this.listingRepo = new ListingRepository();
    this.subService = new SubscriptionService();
  }

  /**
   * Inject a NotificationService so checkSearchForNewListings can send alerts.
   * Called by CheckerCron after constructing both services.
   */
  setNotificationService(notifService: NotificationService): void {
    this.notifService = notifService;
  }

  detectPlatform(url: string): Platform | null {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      for (const [platform, domain] of Object.entries(PLATFORM_DOMAINS)) {
        if (hostname.includes(domain)) return platform as Platform;
      }
      return null;
    } catch {
      return null;
    }
  }

  async canAdd(user: User): Promise<{ allowed: boolean; reason?: string }> {
    const plan = this.subService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const currentCount = await this.searchRepo.countActiveByUserId(user.id);

    if (limits.maxSearches !== null && currentCount >= limits.maxSearches) {
      return {
        allowed: false,
        reason: `Ваш тариф ${plan} позволяет не более ${limits.maxSearches} поисков. Перейдите на Pro для большего количества.`,
      };
    }
    return { allowed: true };
  }

  async create(
    user: User,
    url: string,
    platform: Platform,
    name?: string,
  ): Promise<Search> {
    const search = await this.searchRepo.create({
      user: { connect: { id: user.id } },
      url,
      platform,
      name: name ?? null,
      status: 'ACTIVE',
      isActive: true,
    });
    logger.info(`Search ${search.id} created for user ${user.id} on ${platform}`);
    return search;
  }

  async getByUser(userId: number): Promise<Search[]> {
    return this.searchRepo.findByUserId(userId);
  }

  async getById(id: number, userId: number): Promise<Search | null> {
    const search = await this.searchRepo.findById(id);
    if (!search || search.userId !== userId) return null;
    return search;
  }

  async pause(id: number, userId: number): Promise<Search | null> {
    const search = await this.getById(id, userId);
    if (!search) return null;
    return this.searchRepo.setActive(id, false);
  }

  async resume(id: number, userId: number): Promise<Search | null> {
    const search = await this.getById(id, userId);
    if (!search) return null;
    const updated = await this.searchRepo.setActive(id, true);
    await this.searchRepo.resetError(id);
    return updated;
  }

  async rename(id: number, userId: number, name: string): Promise<Search | null> {
    const search = await this.getById(id, userId);
    if (!search) return null;
    return this.searchRepo.update(id, { name });
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const search = await this.getById(id, userId);
    if (!search) return false;
    await this.searchRepo.delete(id);
    return true;
  }

  async getHistory(userId: number, limit: number): Promise<ReturnType<ListingRepository['findHistoryForUser']>> {
    return this.listingRepo.findHistoryForUser(userId, limit);
  }

  async getStats(userId: number): Promise<{
    activeSearches: number;
    totalListings: number;
    newToday: number;
    lastChecked: Date | null;
  }> {
    const searches = await this.searchRepo.findByUserId(userId);
    const activeSearches = searches.filter((s) => s.isActive).length;

    let totalListings = 0;
    let lastChecked: Date | null = null;
    for (const s of searches) {
      totalListings += await this.listingRepo.countBySearchId(s.id);
      if (s.lastCheckedAt) {
        if (!lastChecked || s.lastCheckedAt > lastChecked) {
          lastChecked = s.lastCheckedAt;
        }
      }
    }

    const newToday = await this.listingRepo.countFoundToday();

    return { activeSearches, totalListings, newToday, lastChecked };
  }

  async getAllActiveForCron(): Promise<Search[]> {
    return this.searchRepo.findAllActiveForCron();
  }

  /**
   * Seed baseline: fetch the feed, mark all current externalIds as seen
   * in the DB (isBaseline=true) AND in the in-memory session set.
   * No notifications sent. Called once when the search is first added.
   */
  async initializeSearchBaseline(searchId: number): Promise<number> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) throw new Error(`Search ${searchId} not found`);

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));

    const seen = new Set<string>();
    for (const parsed of allItems) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
      seen.add(externalId);
      try {
        await this.listingRepo.upsert(search.id, externalId, {
          title: parsed.title,
          price: parsed.price ?? null,
          location: parsed.location ?? null,
          imageUrl: parsed.imageUrl ?? null,
          url: parsed.url,
          platform: search.platform,
          rawPublishedAt: parsed.rawPublishedAt ?? null,
          publishedAt: parsed.publishedAt ?? null,
          isBaseline: true,
          skippedReason: null,
        } as Parameters<ListingRepository['upsert']>[2]);
      } catch { /* unique constraint — already seeded */ }
    }

    sessionSeen.set(search.id, seen);

    await this.searchRepo.update(search.id, {
      baselineInitializedAt: new Date(),
      lastCheckedAt: new Date(),
    });

    logger.info(`[baseline-init] searchId=${search.id} saved=${seen.size}/${allItems.length}`);
    return seen.size;
  }

  /**
   * Main method called by CheckerCron on every tick.
   *
   * Seen-set architecture (restart-proof):
   *   - DB seen-set: all externalIds ever saved for this search (baseline + sent).
   *     Prevents double-sends across restarts.
   *   - Session seen-set (in-memory): populated on the FIRST tick after restart
   *     by quietly snapshotting the current feed. Prevents the restart-flood of
   *     old listings that were already in the feed before this process started
   *     but were never saved to DB (because they were skipped by old logic, etc.)
   *
   *   An externalId is sent ONLY if it is absent from BOTH sets.
   */
  async checkSearchForNewListings(
    searchId: number,
    user: { id: number; telegramId: bigint | string | number } & Record<string, unknown>,
    settings: Record<string, unknown> | null,
  ): Promise<void> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) return;

    const extSearch = search as typeof search & { baselineInitializedAt: Date | null };

    // First-ever baseline: seed the DB seen-set and return.
    if (!extSearch.baselineInitializedAt) {
      logger.info(`[baseline-needed] searchId=${searchId}`);
      await this.initializeSearchBaseline(searchId);
      return;
    }

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));
    const items = allItems.slice(0, CHECK_LIMIT);

    await this.searchRepo.update(search.id, { lastCheckedAt: new Date() });

    // First tick after restart: snapshot current feed into session seen-set.
    // This covers listings that were in the feed before this process started
    // but never made it into the DB (old skipped entries, etc.).
    if (!sessionSeen.has(search.id)) {
      const snap = new Set(allItems.map(
        p => p.externalId || hashListing(p.title, p.price, p.url)
      ));
      sessionSeen.set(search.id, snap);
      logger.info(`[session-seed] searchId=${search.id} snapped ${snap.size} ids — skipping this tick`);
      return;
    }

    const seenSession = sessionSeen.get(search.id)!;

    logger.debug(`[tick] searchId=${search.id} feed=${allItems.length} checking=${items.length}`);

    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);

      // 1. In-memory session check — O(1), no DB hit.
      if (seenSession.has(externalId)) {
        logger.debug(`[seen-session] externalId=${externalId}`);
        continue;
      }

      // 2. DB check — protects against double-send across restarts.
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        seenSession.add(externalId); // warm the in-memory cache
        logger.debug(`[seen-db] externalId=${externalId}`);
        continue;
      }

      // Genuinely new — send it.
      logger.info(`[new] searchId=${search.id} externalId=${externalId}`);
      seenSession.add(externalId);

      const rawDate: string | null = parsed.rawPublishedAt ?? null;
      const parsedDate: Date | null = rawDate ? parseListingDate(rawDate) : (parsed.publishedAt ?? null);

      const { listing } = await this.listingRepo.upsert(
        search.id,
        externalId,
        {
          title: parsed.title,
          price: parsed.price ?? null,
          location: parsed.location ?? null,
          imageUrl: parsed.imageUrl ?? null,
          url: parsed.url,
          platform: search.platform,
          rawPublishedAt: rawDate,
          publishedAt: parsedDate,
          isBaseline: false,
          skippedReason: null,
        } as Parameters<ListingRepository['upsert']>[2],
      );

      if (!this.notifService) {
        logger.warn(`[no-notif-service] searchId=${search.id}`);
        continue;
      }

      const sent = await this.notifService.sendListingNotification(
        user as Parameters<NotificationService['sendListingNotification']>[0],
        search,
        listing,
        settings as Parameters<NotificationService['sendListingNotification']>[3],
      );

      if (sent) {
        await this.listingRepo.markNotified(listing.id);
        await this.searchRepo.update(search.id, { lastNewListingAt: new Date() });
        logger.info(`[sent] listingId=${listing.id} externalId=${externalId}`);
      }
    }
  }

  /**
   * Delete all listings for a search and re-initialize baseline.
   * Used by admin /resetbaseline command and user "Сбросить старые объявления".
   */
  async resetBaseline(searchId: number, userId?: number): Promise<number> {
    const search = userId
      ? await this.getById(searchId, userId)
      : await this.searchRepo.findById(searchId);

    if (!search) throw new Error('Search not found or access denied');

    await this.listingRepo.deleteBySearchId(search.id);
    await this.searchRepo.update(search.id, { baselineInitializedAt: null });
    sessionSeen.delete(search.id);
    return this.initializeSearchBaseline(search.id);
  }

  async recordError(id: number, error: string, notifyFn?: (msg: string) => Promise<void>): Promise<void> {
    const search = await this.searchRepo.findById(id);
    if (!search) return;

    const updated = await this.searchRepo.incrementError(id, error);

    if (updated && updated.errorCount >= 3 && notifyFn) {
      await this.searchRepo.setStatus(id, 'ERROR');
      await notifyFn('Поиск временно не работает. Проверьте ссылку.');
    }
  }

  async recordSuccess(id: number): Promise<void> {
    await this.searchRepo.updateLastChecked(id);
    const search = await this.searchRepo.findById(id);
    if (search && search.errorCount > 0) {
      await this.searchRepo.resetError(id);
    }
  }
}
