import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User, UserSettings, Search } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { NotificationService } from '../services/notification.service';
import { SearchService } from '../services/search.service';
import { SubscriptionService } from '../services/subscription.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { PLAN_LIMITS } from '../types/index';
import { prisma } from '../database/client';
import { logger } from '../utils/logger';
import { sleep } from '../utils/retry';

type SearchWithUser = Search & {
  user: User & { settings: UserSettings | null };
};

export class CheckerCron {
  private searchRepo: SearchRepository;
  private searchService: SearchService;
  private notifService: NotificationService;
  private subService: SubscriptionService;
  private adminNotifService: AdminNotificationService;
  private bot: Bot<BotContext>;
  private isRunning = false;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.searchRepo = new SearchRepository();
    this.notifService = new NotificationService();
    this.searchService = new SearchService();
    this.subService = new SubscriptionService();
    this.adminNotifService = adminNotifService;
    this.bot = bot;
    this.notifService.setBot(bot);
    // Wire notification service into search service so it can send alerts
    this.searchService.setNotificationService(this.notifService);
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
      // All baseline / freshness / dedup logic lives in SearchService.
      // CheckerCron is only responsible for scheduling and error handling.
      await this.searchService.checkSearchForNewListings(
        search.id,
        user,
        (search as SearchWithUser).user.settings,
      );

      if (search.errorCount > 0) {
        await this.searchRepo.resetError(search.id);
      }

      await prisma.parserLog.create({
        data: {
          platform: search.platform,
          searchId: search.id,
          success: true,
          foundCount: 0, // actual count is tracked inside SearchService per listing
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
}
