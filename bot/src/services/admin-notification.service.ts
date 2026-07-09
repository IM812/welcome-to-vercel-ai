import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { config } from '../config/index';
import { formatDate, formatUserMention } from '../utils/format';
import { logger } from '../utils/logger';

export class AdminNotificationService {
  private bot: Bot<BotContext> | null = null;

  constructor(bot?: Bot<BotContext>) {
    if (bot) this.bot = bot;
  }

  setBot(bot: Bot<BotContext>): void {
    this.bot = bot;
  }

  private async send(message: string): Promise<void> {
    if (!this.bot) return;
    for (const adminId of config.ADMIN_IDS) {
      try {
        await this.bot.api.sendMessage(Number(adminId), message);
      } catch (err) {
        logger.error(`Failed to send admin notification to ${adminId}`, err);
      }
    }
  }

  async notifyNewUser(user: User): Promise<void> {
    const mention = user.username ? `@${user.username}` : 'нет';
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'нет';
    await this.send(
      `Новый пользователь\n\nИмя: ${name}\nUsername: ${mention}\nTelegram ID: ${user.telegramId}\nДата регистрации: ${formatDate(user.createdAt)}\nТариф: Free`,
    );
  }

  async notifyParserError(platform: string, searchId: number, error: string): Promise<void> {
    await this.send(
      `Ошибка парсера\n\nПлощадка: ${platform}\nПоиск ID: ${searchId}\nОшибка: ${error}`,
    );
  }

  async notifyBan(user: User, reason: string): Promise<void> {
    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await this.send(`Пользователь забанен\n\nПользователь: ${mention}\nПричина: ${reason}`);
  }

  async notifyUnban(user: User): Promise<void> {
    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await this.send(`Пользователь разбанен\n\nПользователь: ${mention}`);
  }

  async notifyBroadcastComplete(
    total: number,
    sent: number,
    failed: number,
  ): Promise<void> {
    await this.send(
      `Рассылка завершена\n\nВсего: ${total}\nОтправлено: ${sent}\nОшибок: ${failed}`,
    );
  }

  async notifyCriticalCronError(job: string, error: string): Promise<void> {
    await this.send(`Критическая ошибка cron\n\nЗадача: ${job}\nОшибка: ${error}`);
  }

  async notifySupportRequest(user: User, message: string): Promise<void> {
    const mention = formatUserMention(user);
    await this.send(
      `Запрос в поддержку\n\nОт: ${mention} (${user.telegramId})\n\n${message}`,
    );
  }
}
