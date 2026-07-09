import cron from 'node-cron';
import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import { SubscriptionService } from '../services/subscription.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { logger } from '../utils/logger';

export class SubscriptionCron {
  private subService: SubscriptionService;
  private adminNotifService: AdminNotificationService;
  private bot: Bot<BotContext>;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.subService = new SubscriptionService();
    this.adminNotifService = adminNotifService;
    this.bot = bot;
  }

  start(): void {
    // Check expired subscriptions every hour
    cron.schedule('0 * * * *', () => {
      this.subService
        .expireSubscriptions(async (telegramId, message) => {
          try {
            await this.bot.api.sendMessage(Number(telegramId), message);
          } catch (err) {
            logger.warn(`Could not notify user ${telegramId} about expiry`, err);
          }
        })
        .catch((err: unknown) => {
          logger.error('Subscription expiry cron error', err);
          void this.adminNotifService.notifyCriticalCronError('subscription_expiry', String(err));
        });
    });
    logger.info('Subscription cron started');
  }
}
