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

/**
 * Convert an Avito externalId string (e.g. "8207503665") to BigInt.
 * Returns null for hash-based IDs that are not purely numeric.
 */
function toBigInt(externalId: string): bigint | null {
  if (!/^\d+$/.test(externalId)) return null;
  try { return BigInt(externalId); } catch { return null; }
}

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
   * Fetch the category page, compute the maximum numeric Avito listing ID
   * currently visible, and store it as baselineMaxId.
   * No listings are saved to DB, no notifications are sent.
   * On subsequent ticks only listings with externalId > baselineMaxId are sent.
   */
  async initializeSearchBaseline(searchId: number): Promise<number> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) throw new Error(`Search ${searchId} not found`);

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));

    // Find the highest numeric ID in the current feed.
    let maxId = BigInt(0);
    for (const parsed of allItems) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
      const num = toBigInt(externalId);
      if (num !== null && num > maxId) maxId = num;
    }

    await this.searchRepo.update(search.id, {
      baselineInitializedAt: new Date(),
      lastCheckedAt: new Date(),
      baselineMaxId: maxId > BigInt(0) ? maxId : null,
    });

    logger.info(`[baseline-init] searchId=${search.id} items=${allItems.length} baselineMaxId=${maxId}`);
    return allItems.length;
  }

  /**
   * Main method called by CheckerCron on every tick.
   *
   * Freshness rule (simple, reliable, restart-proof):
   *   At baseline time we record the highest Avito listing ID visible in the
   *   feed (baselineMaxId). Avito IDs are a global sequential counter —
   *   any listing with ID > baselineMaxId was published AFTER we started
   *   watching. No date parsing, no warm-up, no DB seen-set lookups.
   *
   *   After each sent notification we update baselineMaxId to the new max,
   *   so the window always advances forward.
   */
  async checkSearchForNewListings(
    searchId: number,
    user: { id: number; telegramId: bigint | string | number } & Record<string, unknown>,
    settings: Record<string, unknown> | null,
  ): Promise<void> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) return;

    const extSearch = search as typeof search & {
      baselineInitializedAt: Date | null;
      baselineMaxId: bigint | null;
    };

    // First-ever baseline: compute maxId from current feed and return.
    if (!extSearch.baselineInitializedAt) {
      logger.info(`[baseline-needed] searchId=${searchId}`);
      await this.initializeSearchBaseline(searchId);
      return;
    }

    const baselineMaxId: bigint = extSearch.baselineMaxId ?? BigInt(0);

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));
    const items = allItems.slice(0, CHECK_LIMIT);

    await this.searchRepo.update(search.id, { lastCheckedAt: new Date() });

    logger.debug(`[tick] searchId=${search.id} baselineMaxId=${baselineMaxId} checking=${items.length}`);

    let newMaxId = baselineMaxId;

    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
      const numId = toBigInt(externalId);

      // Track the highest ID we see this tick regardless of whether we send it.
      if (numId !== null && numId > newMaxId) newMaxId = numId;

      // Skip if ID is not numeric or not greater than baseline.
      if (numId === null || numId <= baselineMaxId) {
        logger.debug(`[skip] externalId=${externalId} numId=${numId} baselineMaxId=${baselineMaxId}`);
        continue;
      }

      // Guard against double-send across restarts (cheap DB check only for new IDs).
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        logger.debug(`[already-sent] externalId=${externalId}`);
        continue;
      }

      logger.info(`[new] searchId=${search.id} externalId=${externalId} (>${baselineMaxId})`);

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

    // Advance baselineMaxId so old listings never resurface after they scroll
    // back into the top of the feed (Avito can re-promote bumped listings).
    if (newMaxId > baselineMaxId) {
      await this.searchRepo.update(search.id, { baselineMaxId: newMaxId });
      logger.debug(`[maxId-advance] searchId=${search.id} ${baselineMaxId} → ${newMaxId}`);
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
    // Clear baselineMaxId so initializeSearchBaseline recomputes it from scratch.
    await this.searchRepo.update(search.id, { baselineInitializedAt: null, baselineMaxId: null });
    return this.initializeSearchBaseline(search.id);
  }

  async recordError(id: number, error: string, notifyFn?: (msg: string) => Promise<void>): Promise<void> {
    const search = await this.searchRepo.findById(id);
    if (!search) return;

    const updated = await this.searchRepo.incrementError(id, error);

    if (updated.errorCount >= 3 && notifyFn) {
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
