import cron from 'node-cron';
import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { logger } from '../utils/logger';

export class QueueFlushCron {
  private userService: UserService;
  private notifService: NotificationService;
  private adminNotifService: AdminNotificationService;

  constructor(bot: Bot<BotContext>, adminNotifService: AdminNotificationService) {
    this.userService = new UserService();
    this.notifService = new NotificationService();
    this.adminNotifService = adminNotifService;
    this.notifService.setBot(bot);
  }

  start(): void {
    // Flush queued notifications every 5 minutes
    cron.schedule('*/5 * * * *', () => {
      this.flush().catch((err: unknown) => {
        logger.error('Queue flush cron error', err);
        void this.adminNotifService.notifyCriticalCronError('queue_flush', String(err));
      });
    });
    logger.info('Queue flush cron started');
  }

  private async flush(): Promise<void> {
    const users = await this.userService.getAllActive();
    for (const user of users) {
      try {
        const settings = await this.userService.getSettings(user.id);
        await this.notifService.flushQueue(user, settings);
      } catch {
        /* ignore per-user errors */
      }
    }
  }
}
