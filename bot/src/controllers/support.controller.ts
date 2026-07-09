import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { AdminNotificationService } from '../services/admin-notification.service';
import { logger } from '../utils/logger';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerSupportController(
  bot: Bot<BotContext>,
  adminNotif: AdminNotificationService,
): void {
  bot.hears('Поддержка', async (ctx) => {
    ctx.session.step = 'awaiting_support_message';
    await ctx.reply(
      'Опишите вашу проблему или вопрос.\n\nОтправьте "-" для отмены.',
    );
  });

  bot.command('support', async (ctx) => {
    ctx.session.step = 'awaiting_support_message';
    await ctx.reply(
      'Опишите вашу проблему или вопрос.\n\nОтправьте "-" для отмены.',
    );
  });

  bot.on('message:text', async (ctx, next) => {
    if (ctx.session.step !== 'awaiting_support_message') return next();
    ctx.session.step = undefined;

    const message = ctx.message.text.trim();
    if (message === '-') {
      await ctx.reply('Отменено.');
      return;
    }

    const user = getDbUser(ctx);
    try {
      await adminNotif.notifySupportRequest(user, message);
      await ctx.reply('Ваше сообщение отправлено в поддержку. Мы ответим вам.');
    } catch (err) {
      logger.error('Support message error', err);
      await ctx.reply('Не удалось отправить сообщение. Попробуйте позже.');
    }
  });
}
