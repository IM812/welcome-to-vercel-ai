import type { NextFunction } from 'grammy';
import type { BotContext } from '../types/index';
import { config } from '../config/index';

export async function adminMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.from) return;

  // Session already authenticated — let through
  if (ctx.session.adminAuthed === true) {
    return next();
  }

  // Password provided inline: /admin parseravito123
  const text = ctx.message?.text ?? '';
  const password = text.trim().split(/\s+/)[1];

  if (config.admin.password && password === config.admin.password) {
    ctx.session.adminAuthed = true;
    return next();
  }

  // Block everyone — no bypass for any telegramId
  await ctx.reply('Введите пароль:\n/admin <пароль>');
}

/** Alias used by admin controller as a route-level guard */
export const adminGuard = adminMiddleware;
