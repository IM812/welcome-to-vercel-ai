import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User, UserSettings, Search } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { ParserFactory } from '../parsers/parser.factory';
import { NotificationService } from '../services/notification.service';
import { SubscriptionService } from '../services/subscription.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { PLAN_LIMITS } from '../types/index';
import { prisma } from '../database/client';
import { logger } from '../utils/logger';
import { sleep } from '../utils/retry';
import { withRetry } from '../utils/retry';

type SearchWithUser = Search & {
  user: User & { settings: UserSettings | null };
};

export class CheckerCron {
  private searchRepo: SearchRepository;
  private listingRepo: ListingRepository;
  private notifService: NotificationService;
  private subService: SubscriptionService;
  private adminNotifService: AdminNotificationService;
  private bot: Bot<BotContext>;
  private isRunning = false;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.searchRepo = new SearchRepository();
    this.listingRepo = new ListingRepository();
    this.notifService = new NotificationService();
    this.subService = new SubscriptionService();
    this.adminNotifService = adminNotifService;
    this.bot = bot;
    this.notifService.setBot(bot);
  }

  start(): void {
    void this.loop();
    logger.info('Checker cron started (continuous loop, 30s interval)');
  }

  private async loop(): Promise<void> {
    while (true) {
      if (!this.isRunning) {
        this.isRunning = true;
        this.run()
          .catch((err: unknown) => {
            logger.error('Checker cron crashed', err);
            void this.adminNotifService.notifyCriticalCronError('checker', String(err));
          })
          .finally(() => {
            this.isRunning = false;
          });
      }
      await sleep(30_000);
    }
  }

  private async run(): Promise<void> {
    const now = new Date();
    const rawSearches = await this.searchRepo.findAllActiveForCron();

    for (const raw of rawSearches) {
      const search = raw as unknown as SearchWithUser;
      const user = search.user;

      if (!user || user.isBanned) continue;

      const effectivePlan = this.subService.effectivePlan(user);
      const interval = PLAN_LIMITS[effectivePlan].checkIntervalMinutes;

      if (search.lastCheckedAt) {
        const diffMinutes = (now.getTime() - search.lastCheckedAt.getTime()) / 60_000;
        if (search.status === 'ERROR') {
          if (diffMinutes < 5) continue;
        } else if (diffMinutes < interval) {
          continue;
        }
      }

      await this.processSearch(search, user);
    }
  }

  private async processSearch(search: SearchWithUser, user: User): Promise<void> {
    const start = Date.now();
    try {
      const parser = ParserFactory.create(search.platform);
      const listings = await withRetry(() => parser.parse(search.url));

      await this.searchRepo.updateLastChecked(search.id);

      if (search.errorCount > 0) {
        await this.searchRepo.resetError(search.id);
      }

      // If baseline has never been taken — do a silent seed run.
      // This covers both: first-ever run AND cases where baseline was reset.
      const needsBaseline = !(search as SearchWithUser & { baselineInitializedAt: Date | null }).baselineInitializedAt;

      if (needsBaseline) {
        await this.initializeBaseline(search, listings);
        return;
      }

      // Normal run — only notify for listings whose externalId is new in DB.
      // Age cutoff: skip anything published more than 24h ago.
      // This is the last-resort guard against stale listings slipping through.
      const MAX_LISTING_AGE_MS = 24 * 60 * 60_000;
      const nowMs = Date.now();

      let newCount = 0;
      for (const parsed of listings) {
        // If we have a parsed date and it is older than 24h — skip without saving to DB.
        // This keeps old stock from ever showing up, even after a baseline reset.
        if (parsed.publishedAt) {
          const ageMs = nowMs - parsed.publishedAt.getTime();
          if (ageMs > MAX_LISTING_AGE_MS) continue;
        }

        const externalId = parsed.externalId;

        const { listing, isNew } = await this.listingRepo.upsert(
          search.id,
          externalId,
          {
            title: parsed.title,
            price: parsed.price ?? null,
            location: parsed.location ?? null,
            imageUrl: parsed.imageUrl ?? null,
            url: parsed.url,
            platform: search.platform,
            publishedAt: parsed.publishedAt ?? null,
            isBaseline: false,
          },
        );

        if (!isNew) continue;

        // Guard: never send if already notified
        if (listing.notifiedAt) continue;

        newCount++;

        await this.searchRepo.update(search.id, { lastFoundAt: new Date(), lastNewListingAt: new Date() });

        const settings: UserSettings | null = (search as SearchWithUser).user.settings;
        const sent = await this.notifService.sendListingNotification(user, search, listing, settings);

        if (sent) {
          await this.listingRepo.markNotified(listing.id);
        }
      }

      logger.debug(`Search ${search.id}: checked ${listings.length} listings, sent=${newCount}`);

      await prisma.parserLog.create({
        data: {
          platform: search.platform,
          searchId: search.id,
          success: true,
          foundCount: listings.length,
          duration: Date.now() - start,
        },
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const updated = await this.searchRepo.incrementError(search.id, errorMsg);

      await prisma.parserLog.create({
        data: {
          platform: search.platform,
          searchId: search.id,
          success: false,
          error: errorMsg,
          duration: Date.now() - start,
        },
      });

      const MAX_ERRORS = 5;
      if (updated.errorCount >= MAX_ERRORS && search.status !== 'ERROR') {
        await this.searchRepo.setStatus(search.id, 'ERROR');
        try {
          await this.bot.api.sendMessage(
            Number(user.telegramId),
            `Поиск "${search.name ?? search.url}" перестал работать.\nПроверьте ссылку и нажмите "Мои поиски" чтобы пересоздать его.`,
          );
        } catch { /* ignore */ }
        await this.adminNotifService.notifyParserError(search.platform, search.id, errorMsg);
      }

      logger.error(`Parser error for search ${search.id}: ${errorMsg}`);
    }
  }

  /** Save all current listings as baseline — no notifications sent. */
  async initializeBaseline(
    search: { id: number; platform: Search['platform']; url: string },
    listings?: Awaited<ReturnType<ReturnType<typeof ParserFactory.create>['parse']>>,
  ): Promise<number> {
    if (!listings) {
      const parser = ParserFactory.create(search.platform);
      listings = await withRetry(() => parser.parse(search.url));
    }

    let count = 0;
    for (const parsed of listings) {
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
            publishedAt: parsed.publishedAt ?? null,
            isBaseline: true,
          },
        );
        count++;
      } catch { /* unique constraint — already exists, skip */ }
    }

    await this.searchRepo.update(search.id, {
      baselineInitializedAt: new Date(),
      lastCheckedAt: new Date(),
    } as Parameters<SearchRepository['update']>[1]);

    console.log(`[baseline] search=${search.id} saved=${count}`);
    return count;
  }
}
