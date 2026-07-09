import type { Platform, Search, User } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { SubscriptionService } from './subscription.service';
import { NotificationService } from './notification.service';
import { ParserFactory } from '../parsers/parser.factory';
import { AvitoParser } from '../parsers/avito.parser';
import { withRetry } from '../utils/retry';
import { parseListingDate } from '../utils/dateParser';
import { hashListing } from '../utils/hash';
import { PLATFORM_DOMAINS, PLAN_LIMITS } from '../types/index';
import { logger } from '../utils/logger';



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
   * Parse current listings and save them all as baseline (isBaseline=true).
   * No notifications are sent. Sets baselineInitializedAt and lastCheckedAt.
   * Returns the number of listings saved.
   */
  async initializeSearchBaseline(searchId: number): Promise<number> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) throw new Error(`Search ${searchId} not found`);

    const parser = ParserFactory.create(search.platform);
    const items = await withRetry(() => parser.parse(search.url));

    let count = 0;
    for (const parsed of items) {
      const rawDate: string | null =
        parsed.rawPublishedAt ?? null;
      const parsedDate: Date | null = rawDate
        ? parseListingDate(rawDate)
        : (parsed.publishedAt ?? null);

      try {
        await this.listingRepo.upsert(
          search.id,
          parsed.externalId,
          {
            title: parsed.title,
            price: parsed.price ?? null,
            location: parsed.location ?? null,
            imageUrl: parsed.imageUrl ?? null,
            url: parsed.url,
            platform: search.platform,
            rawPublishedAt: rawDate,
            publishedAt: parsedDate,
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

    logger.info(`[baseline-init] searchId=${search.id} count=${count}`);
    return count;
  }

  /**
   * Check a single search for new listings and send notifications.
   * If baseline has not been initialized yet, calls initializeSearchBaseline and returns early.
   * This is the main method called by CheckerCron on every tick.
   */
  async checkSearchForNewListings(
    searchId: number,
    user: { id: number; telegramId: bigint | string | number } & Record<string, unknown>,
    settings: Record<string, unknown> | null,
  ): Promise<void> {
    const search = await this.searchRepo.findById(searchId);
    if (!search) return;

    // If baseline has never been initialized — do a silent seed run.
    const baselineAt = (search as typeof search & { baselineInitializedAt: Date | null })
      .baselineInitializedAt;
    if (!baselineAt) {
      await this.initializeSearchBaseline(searchId);
      return;
    }

    const parser = ParserFactory.create(search.platform);
    const items = await withRetry(() => parser.parse(search.url));

    await this.searchRepo.update(search.id, { lastCheckedAt: new Date() });

    // ── Step 1: filter out known duplicates in one pass ───────────────────────
    const newItems: typeof items = [];
    for (const parsed of items) {
      const externalId = parsed.externalId || hashListing(parsed.title, parsed.price, parsed.url);
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        logger.debug(`[duplicate-skip] searchId=${search.id} externalId=${externalId}`);
      } else {
        newItems.push({ ...parsed, externalId });
      }
    }

    if (newItems.length === 0) return;

    logger.debug(`[new-candidates] searchId=${search.id} count=${newItems.length}`);

    // ── Step 2: fetch detail pages IN PARALLEL for all new candidates ─────────
    // The meta line "№ XXXXXXX · сегодня в 21:08 · N просмотров" on the
    // individual listing page is the only reliable date source on Avito.
    // Parallel fetch cuts latency from N×8s down to ~8s regardless of count.
    type WithDate = (typeof newItems)[number] & { rawDate: string | null; parsedDate: Date | null };
    const withDates: WithDate[] = await Promise.all(
      newItems.map(async (parsed): Promise<WithDate> => {
        let rawDate: string | null = null;
        if (parser instanceof AvitoParser) {
          rawDate = await parser.fetchListingDate(parsed.url);
          if (rawDate) {
            logger.debug(`[avito-details] externalId=${parsed.externalId} rawPublishedAt="${rawDate}"`);
          } else {
            rawDate = parsed.rawPublishedAt ?? null;
            logger.debug(`[avito-details-fallback] externalId=${parsed.externalId} raw="${rawDate ?? 'null'}"`);
          }
        } else {
          rawDate = parsed.rawPublishedAt ?? null;
        }
        const parsedDate: Date | null = rawDate
          ? parseListingDate(rawDate)
          : (parsed.publishedAt ?? null);
        logger.debug(`[date-parse] externalId=${parsed.externalId} raw="${rawDate ?? 'null'}" parsed=${parsedDate?.toISOString() ?? 'null'}`);
        return { ...parsed, rawDate, parsedDate };
      }),
    );

    // ── Step 3: apply cutoff and notify ──────────────────────────────────────
    for (const parsed of withDates) {
      const externalId = parsed.externalId;
      const rawDate = parsed.rawDate;
      const parsedDate = parsed.parsedDate;

      logger.debug(
        `[date-parse] raw=${rawDate ?? 'null'} parsed=${parsedDate?.toISOString() ?? 'null'}`,
      );

      // 4. Baseline-cutoff rule — the ONLY rule that matters:
      //
      //   Send the listing if and only if its publication date is AFTER the
      //   moment the user added this search (baselineInitializedAt).
      //
      //   • parsedDate exists AND parsedDate >= baselineAt  → send
      //   • parsedDate exists AND parsedDate <  baselineAt  → skip (old listing)
      //   • parsedDate is null (Avito hid the date)         → skip
      //     The user said "I don't want old listings at all". If we cannot
      //     confirm the listing is newer than the search was added, we do not
      //     send it. A truly fresh listing will have a parseable date within
      //     minutes of being posted.
      const cutoff = baselineAt as Date;

      let shouldSend: boolean;
      let skippedReason: string | null;

      if (!parsedDate) {
        shouldSend = false;
        skippedReason = 'UNKNOWN_DATE';
      } else if (parsedDate < cutoff) {
        shouldSend = false;
        skippedReason = 'TOO_OLD';
      } else {
        shouldSend = true;
        skippedReason = null;
      }

      logger.debug(
        `[cutoff-check] externalId=${externalId} publishedAt=${parsedDate?.toISOString() ?? 'null'} cutoff=${cutoff.toISOString()} send=${shouldSend} reason=${skippedReason ?? 'ok'}`,
      );

      if (!shouldSend) {
        if (skippedReason === 'TOO_OLD') {
          logger.debug(`[old-skip] externalId=${externalId} publishedAt=${parsedDate?.toISOString()}`);
        } else {
          logger.debug(`[unknown-date-skip] externalId=${externalId}`);
        }

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
            rawPublishedAt: rawDate,
            publishedAt: parsedDate,
            isBaseline: false,
            skippedReason,
          } as Parameters<ListingRepository['upsert']>[2],
        );
        continue;
      }

      // 5. New listing to notify — save and send.
      // Store the REAL parsed publication date (or null when Avito hid it).
      // We must NOT fake this to "now" — that made the bot display a wrong
      // "Опубликовано" time. The notification guard is mode-aware and does not
      // re-check freshness in competitor mode, so a null date is fine here.
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
        logger.warn(`[notification-skip] notifService not set for searchId=${search.id}`);
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
        logger.info(`[notification-sent] listingId=${listing.id}`);
        logger.info(`[avito-send] externalId=${externalId}`);
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
