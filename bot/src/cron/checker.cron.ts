import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User, UserSettings, Search } from '../generated/prisma/index';
import { SearchRepository } from '../repositories/search.repository';
import { NotificationService } from '../services/notification.service';
import { SearchService } from '../services/search.service';

import { AdminNotificationService } from '../services/admin-notification.service';
import { prisma } from '../database/client';
import { logger } from '../utils/logger';
import { sleep } from '../utils/retry';

type SearchWithUser = Search & {
  user: User & { settings: UserSettings | null };
};

// Poll interval between checker ticks. Lower = faster notifications but more
// requests (higher 403 risk & more cookie purchases). Tunable via .env without
// a code change. Default 10s (was 15s) to edge ahead of competitors.
const CHECK_INTERVAL_MS = Math.max(
  5_000,
  parseInt(process.env.CHECK_INTERVAL_MS ?? '10000', 10) || 10_000,
);

export class CheckerCron {
  private searchRepo: SearchRepository;
  private searchService: SearchService;
  private notifService: NotificationService;
  private adminNotifService: AdminNotificationService;
  private bot: Bot<BotContext>;
  private isRunning = false;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.searchRepo = new SearchRepository();
    this.notifService = new NotificationService();
    this.searchService = new SearchService();
    this.adminNotifService = adminNotifService;
    this.bot = bot;
    this.notifService.setBot(bot);
    // Wire notification service into search service so it can send alerts
    this.searchService.setNotificationService(this.notifService);
  }

  start(): void {
    void this.loop();
    logger.info(`Checker cron started (continuous loop, ${CHECK_INTERVAL_MS / 1000}s interval)`);
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
      await sleep(CHECK_INTERVAL_MS);
    }
  }

  private async run(): Promise<void> {
    const now = new Date();
    const rawSearches = await this.searchRepo.findAllActiveForCron();

    for (const raw of rawSearches) {
      const search = raw as unknown as SearchWithUser;
      const user = search.user;

      if (!user || user.isBanned) continue;

      // ERROR searches: back off 5 min before retrying
      if (search.status === 'ERROR' && search.lastCheckedAt) {
        const diffMinutes = (now.getTime() - search.lastCheckedAt.getTime()) / 60_000;
        if (diffMinutes < 5) continue;
      }
      // Active searches: run every cron tick — no artificial interval gate.
      // Speed is the priority: we want to notify before competitors do.

      await this.processSearch(search, user);

      // Stagger between searches: back-to-back requests from the same IP look
      // like a scraper burst. 3-6s of jitter makes the traffic pattern human.
      await sleep(3_000 + Math.floor(Math.random() * 3_000));
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

      // Cooldown is NOT an error — it's the breaker intentionally waiting for
      // the IP block to expire. Don't increment error counters, don't notify
      // the user, don't disable searches. Just log quietly and let the next
      // tick retry after the pause.
      if (errorMsg.includes('cooldown active')) {
        logger.info(`[checker] search ${search.id} skipped — ${errorMsg}`);
        return;
      }

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
      if (updated && updated.errorCount >= MAX_ERRORS && search.status !== 'ERROR') {
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
