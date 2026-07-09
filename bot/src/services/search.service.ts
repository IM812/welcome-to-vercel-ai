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

// How many listings to seed as baseline on first add.
const BASELINE_LIMIT = 30;
// How many listings to inspect on each cron tick.
const CHECK_LIMIT = 20;

// Per-process warm-up flag. On the very first tick after restart we silently
// mark every visible listing as "seen" so no stale items flood the user.
// Key: searchId, Value: true once warm-up is done for that search.
const warmedUp = new Set<number>();

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
   * Fetch the category page, save the first BASELINE_LIMIT listings as
   * baseline (isBaseline=true). No notifications sent.
   * Sets baselineInitializedAt so future ticks know seeding is done.
   */
  async initializeSearchBaseline(searchId: number): Promise<number> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) throw new Error(`Search ${searchId} not found`);

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));

    // Take only the first BASELINE_LIMIT items — these become the "seen" set.
    const items = allItems.slice(0, BASELINE_LIMIT);

    let count = 0;
    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
      try {
        await this.listingRepo.upsert(
          search.id,
          externalId,
          {
            title: parsed.title,
            price: parsed.price ?? null,
            location: parsed.location ?? null,
            imageUrl: parsed.imageUrl ?? null,
            url: parsed.url,
            platform: search.platform,
            rawPublishedAt: parsed.rawPublishedAt ?? null,
            publishedAt: parsed.publishedAt ?? null,
            isBaseline: true,
          } as Parameters<ListingRepository['upsert']>[2],
        );
        count++;
      } catch { /* unique constraint — already seeded */ }
    }

    await this.searchRepo.update(search.id, {
      baselineInitializedAt: new Date(),
      lastCheckedAt: new Date(),
    });

    logger.info(`[baseline-init] searchId=${search.id} saved=${count}/${allItems.length}`);
    return count;
  }

  /**
   * Main method called by CheckerCron on every tick.
   *
   * Architecture:
   *   1. First run ever: save first BASELINE_LIMIT listings as "seen" (no notify). Done.
   *   2. Every subsequent run: fetch category page, look at first CHECK_LIMIT items.
   *      Any externalId NOT already in DB → send notification immediately.
   *      Date is used only to display in the message, NOT as a filter.
   */
  async checkSearchForNewListings(
    searchId: number,
    user: { id: number; telegramId: bigint | string | number } & Record<string, unknown>,
    settings: Record<string, unknown> | null,
  ): Promise<void> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) return;

    const baselineAt = (search as typeof search & { baselineInitializedAt: Date | null })
      .baselineInitializedAt;

    // First-ever baseline: seed silently and return.
    if (!baselineAt) {
      logger.info(`[baseline-needed] searchId=${searchId} — seeding now`);
      await this.initializeSearchBaseline(searchId);
      return;
    }

    const parser = ParserFactory.create(search.platform);
    const allItems = await withRetry(() => parser.parse(search.url));

    await this.searchRepo.update(search.id, { lastCheckedAt: new Date() });

    // Warm-up tick (once per process restart per search):
    // silently mark everything currently visible as "seen" so that listings
    // already in the feed before this bot instance started are never sent.
    if (!warmedUp.has(search.id)) {
      warmedUp.add(search.id);
      logger.info(`[warm-up] searchId=${search.id} marking ${allItems.length} items as seen`);
      for (const parsed of allItems) {
        const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
        const existing = await this.listingRepo.findByExternalId(search.id, externalId);
        if (!existing) {
          await this.listingRepo.upsert(
            search.id,
            externalId,
            {
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
            } as Parameters<ListingRepository['upsert']>[2],
          );
        }
      }
      return;
    }

    // Normal tick: check only the top CHECK_LIMIT items.
    const items = allItems.slice(0, CHECK_LIMIT);

    logger.debug(`[tick] searchId=${search.id} fetched=${allItems.length} checking=${items.length}`);

    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);

      // Already seen — skip.
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        logger.debug(`[seen] searchId=${search.id} externalId=${externalId}`);
        continue;
      }

      // New externalId in the feed → send immediately, no date filtering.
      logger.info(`[new-listing] searchId=${search.id} externalId=${externalId} url=${parsed.url}`);

      // Resolve a display date from the card's raw string (best-effort, no blocking).
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
