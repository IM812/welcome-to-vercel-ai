import type { Platform, Search, User, UserSettings } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { SubscriptionService } from './subscription.service';
import { NotificationService } from './notification.service';
import { ParserFactory } from '../parsers/parser.factory';
import { AvitoParser } from '../parsers/avito.parser';
import { withRetry } from '../utils/retry';
import { parseListingDate, isFreshListing, getListingAgeMinutes } from '../utils/dateParser';
import { hashListing } from '../utils/hash';
import { PLATFORM_DOMAINS, PLAN_LIMITS } from '../types/index';
import { logger } from '../utils/logger';

const FRESH_MAX_MINUTES = Number(process.env.FRESH_LISTING_MAX_AGE_MINUTES ?? 5);

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

    for (const parsed of items) {
      // 1. Resolve externalId (parser-provided or content hash)
      const externalId =
        parsed.externalId ||
        hashListing(parsed.title, parsed.price, parsed.url);

      // 2. Skip if already in DB for this search — do this BEFORE fetching the detail page
      const existing = await this.listingRepo.findByExternalId(search.id, externalId);
      if (existing) {
        logger.debug(`[duplicate-skip] searchId=${search.id} externalId=${externalId}`);
        continue;
      }

      logger.debug(`[avito-new-candidate] externalId=${externalId} url=${parsed.url}`);

      // 3. Resolve raw date:
      //    For Avito, the category page does not contain reliable dates.
      //    We open the individual listing page only for NEW externalIds to get
      //    the exact publication time from "№ XXXXXXX · 3 июля в 23:26 · N просмотров".
      let rawDate: string | null = parsed.rawPublishedAt ?? null;
      if (!rawDate && parser instanceof AvitoParser) {
        rawDate = await parser.fetchListingDate(parsed.url);
        if (rawDate) {
          logger.debug(`[avito-details] externalId=${externalId} rawPublishedAt=${rawDate}`);
        }
      }

      const parsedDate: Date | null = rawDate
        ? parseListingDate(rawDate)
        : (parsed.publishedAt ?? null);

      logger.debug(
        `[date-parse] raw=${rawDate ?? 'null'} parsed=${parsedDate?.toISOString() ?? 'null'}`,
      );

      // 4. Freshness check
      const maxAge = Number(process.env.FRESH_LISTING_MAX_AGE_MINUTES ?? FRESH_MAX_MINUTES);
      const fresh = isFreshListing(parsedDate, maxAge);
      const ageMinutes = parsedDate ? getListingAgeMinutes(parsedDate) : null;

      logger.debug(
        `[fresh-check] externalId=${externalId} ageMinutes=${ageMinutes?.toFixed(2) ?? 'n/a'} fresh=${fresh}`,
      );

      if (!fresh) {
        // Save to DB so we never visit it again, but do NOT notify
        const skippedReason = parsedDate ? 'TOO_OLD' : 'UNKNOWN_DATE';

        if (skippedReason === 'TOO_OLD') {
          logger.debug(`[old-skip] externalId=${externalId} reason=TOO_OLD`);
          logger.debug(`[avito-skip-old] externalId=${externalId} ageMinutes=${ageMinutes?.toFixed(2) ?? 'n/a'}`);
        } else {
          logger.debug(`[unknown-date-skip] externalId=${externalId} reason=UNKNOWN_DATE`);
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

      // 5. Fresh listing — save and send notification
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
