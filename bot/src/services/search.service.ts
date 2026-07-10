import type { Platform, Search, User } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { SubscriptionService } from './subscription.service';
import { NotificationService } from './notification.service';
import { ParserFactory } from '../parsers/parser.factory';
import { withRetry } from '../utils/retry';
import { parseListingDate, isFreshListing, getListingAgeMinutes } from '../utils/dateParser';
// AvitoParser no longer imported — detail-page fetching removed from check loop
import { hashListing } from '../utils/hash';
import { PLATFORM_DOMAINS, PLAN_LIMITS } from '../types/index';
import { logger } from '../utils/logger';

// How many listings to inspect on each cron tick.
const CHECK_LIMIT = 20;

// Freshness gate — guards ONLY against genuinely ancient listings that Avito's
// relevance sort rotates into the top of the feed (promoted/old items).
//
// IMPORTANT: Avito's relative timestamps are coarse — a listing posted 2 minutes
// ago can display "1 час назад" (rounded up / cached). Minute-precision filtering
// therefore breaks on fresh listings. The real "is this new?" decision is made by
// the seen-set (DB + session snapshot): while the bot runs, anything not already
// seen genuinely just appeared. So the gate defaults to a wide 24h window and
// exists only to drop day-old rotated junk. Combine with date sorting (&s=104)
// in the search URL for instant, accurate results.
const MAX_AGE_MINUTES = Number(process.env.FRESH_LISTING_MAX_AGE_MINUTES || 1440);

// If the date can't be parsed at all, send anyway (true) or skip (false).
const SEND_WHEN_DATE_UNKNOWN =
  (process.env.SEND_WHEN_DATE_UNKNOWN ?? 'true').toLowerCase() !== 'false';

// In-memory seen set per searchId, populated on the first tick after restart.
// Prevents flooding the user with old listings that were already in the feed
// before this bot process started, without requiring DB writes for each one.
const sessionSeen = new Map<number, Set<string>>();

// In-memory last-known numeric price per listing, per search. Used to detect
// price drops on already-seen listings without a DB hit on every tick.
const sessionPrices = new Map<number, Map<string, number>>();

/** Extract a numeric value from a price string like "45 000 ₽". */
function parsePriceNumber(price: string | null | undefined): number | null {
  if (!price) return null;
  const digits = price.replace(/[^\d]/g, '');
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
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

    // First tick after restart: seed the session seen-set from the DB, NOT
    // from the live feed. Snapshotting the live feed swallowed listings that
    // appeared while the bot was restarting (they were already in the feed at
    // first tick, so they were marked seen and never sent). The DB is the
    // durable record of what was actually processed, so restarts lose nothing —
    // and the tick proceeds immediately instead of being skipped.
    if (!sessionSeen.has(search.id)) {
      const dbIds = await this.listingRepo.findExternalIds(search.id);
      sessionSeen.set(search.id, new Set(dbIds));
      logger.info(`[session-seed] searchId=${search.id} seeded ${dbIds.length} ids from DB`);
    }

    const seenSession = sessionSeen.get(search.id)!;

    logger.debug(`[tick] searchId=${search.id} feed=${allItems.length} checking=${items.length}`);

    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);

      // 1. In-memory session check — O(1), no DB hit.
      if (seenSession.has(externalId)) {
        logger.debug(`[seen-session] externalId=${externalId}`);
        await this.checkPriceDrop(search, user, settings, externalId, parsed.price ?? null);
        continue;
      }

      // 2. DB check — protects against double-send across restarts.
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        seenSession.add(externalId); // warm the in-memory cache
        logger.debug(`[seen-db] externalId=${externalId}`);
        await this.checkPriceDrop(search, user, settings, externalId, parsed.price ?? null);
        continue;
      }

      // Genuinely new — send it.
      logger.info(`[new] searchId=${search.id} externalId=${externalId}`);
      seenSession.add(externalId);

      const rawDate: string | null = parsed.rawPublishedAt ?? null;
      const parsedDate: Date | null = rawDate ? parseListingDate(rawDate) : (parsed.publishedAt ?? null);

      // Freshness gate: skip stale listings that rotated into the feed
      // (promoted/old items Avito re-surfaces in relevance sort).
      let stale = false;
      if (parsedDate) {
        if (!isFreshListing(parsedDate, MAX_AGE_MINUTES)) {
          stale = true;
          logger.info(
            `[stale-skip] searchId=${search.id} externalId=${externalId} age=${Math.round(getListingAgeMinutes(parsedDate))}min raw="${rawDate ?? ''}"`,
          );
        }
      } else if (!SEND_WHEN_DATE_UNKNOWN) {
        stale = true;
        logger.info(`[no-date-skip] searchId=${search.id} externalId=${externalId}`);
      }

      if (stale) {
        // Save quietly so it never comes back, but do NOT notify.
        try {
          await this.listingRepo.upsert(search.id, externalId, {
            title: parsed.title,
            price: parsed.price ?? null,
            location: parsed.location ?? null,
            imageUrl: parsed.imageUrl ?? null,
            url: parsed.url,
            platform: search.platform,
            rawPublishedAt: rawDate,
            publishedAt: parsedDate,
            isBaseline: false,
            skippedReason: parsedDate ? 'stale' : 'no-date',
          } as Parameters<ListingRepository['upsert']>[2]);
        } catch { /* already saved */ }
        continue;
      }

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
   * Detect a price drop on an already-seen listing and notify the user.
   * Prices are cached in memory per search; the first observation per session
   * seeds the cache from the DB record (one-time lookup per listing).
   */
  private async checkPriceDrop(
    search: Search,
    user: unknown,
    settings: unknown,
    externalId: string,
    rawPrice: string | null,
  ): Promise<void> {
    const newPrice = parsePriceNumber(rawPrice);
    if (newPrice === null) return;

    let prices = sessionPrices.get(search.id);
    if (!prices) {
      prices = new Map();
      sessionPrices.set(search.id, prices);
    }

    let oldPrice = prices.get(externalId);
    if (oldPrice === undefined) {
      // First sighting this session — seed from the DB record.
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      const dbPrice = parsePriceNumber(existing?.price ?? null);
      if (dbPrice === null) {
        prices.set(externalId, newPrice);
        return;
      }
      oldPrice = dbPrice;
    }

    if (newPrice >= oldPrice) {
      prices.set(externalId, newPrice);
      return;
    }

    // Genuine drop.
    prices.set(externalId, newPrice);
    const existing = await this.listingRepo.findByExternalId(search.id, externalId);
    if (!existing) return;

    const oldPriceStr = existing.price ?? `${oldPrice.toLocaleString('ru-RU')} ₽`;
    await this.listingRepo.updatePrice(existing.id, rawPrice);

    logger.info(`[price-drop] searchId=${search.id} externalId=${externalId} ${oldPrice} -> ${newPrice}`);

    if (this.notifService) {
      await this.notifService.sendPriceDropNotification(
        user as Parameters<NotificationService['sendPriceDropNotification']>[0],
        search,
        { ...existing, price: rawPrice },
        oldPriceStr,
        rawPrice ?? `${newPrice.toLocaleString('ru-RU')} ₽`,
        settings as Parameters<NotificationService['sendPriceDropNotification']>[5],
      );
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
    sessionPrices.delete(search.id);
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
