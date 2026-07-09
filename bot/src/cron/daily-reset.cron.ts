import cron from 'node-cron';
import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import { SubscriptionService } from '../services/subscription.service';
import { UserService } from '../services/user.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { logger } from '../utils/logger';

export class DailyResetCron {
  private subService: SubscriptionService;
  private userService: UserService;
  private adminNotifService: AdminNotificationService;
  private bot: Bot<BotContext>;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.subService = new SubscriptionService();
    this.userService = new UserService();
    this.adminNotifService = adminNotifService;
    this.bot = bot;
  }

  start(): void {
    // Reset daily notification counters at midnight Moscow time (UTC+3 = 21:00 UTC)
    cron.schedule('0 21 * * *', () => {
      this.subService.resetDailyNotifications().catch((err: unknown) => {
        logger.error('Daily reset cron error', err);
        void this.adminNotifService.notifyCriticalCronError('daily_reset', String(err));
      });
    });

    // Daily digest at 20:00 UTC (23:00 Moscow)
    cron.schedule('0 20 * * *', () => {
      this.sendDailyDigests().catch((err: unknown) => {
        logger.error('Daily digest cron error', err);
      });
    });

    logger.info('Daily reset cron started');
  }

  private async sendDailyDigests(): Promise<void> {
    const users = await this.userService.getAllActive();
    for (const user of users) {
      try {
        const settings = await this.userService.getSettings(user.id);
        if (!settings.digestMode) continue;

        // Count new listings today for this user
        // (simplified: send a summary message)
        const summary = `Сводка за сегодня: новые объявления по вашим поискам доступны в разделе "Мои поиски".`;
        await this.bot.api.sendMessage(Number(user.telegramId), summary);
      } catch {
        /* ignore per-user errors */
      }
    }
  }
}
