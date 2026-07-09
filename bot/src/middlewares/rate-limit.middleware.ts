import type { NextFunction } from 'grammy';
import type { BotContext } from '../types/index';

const userTimestamps = new Map<bigint, number[]>();
const WINDOW_MS = 10_000;
const MAX_REQUESTS = 15;

export async function rateLimitMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.from) return next();

  const telegramId = BigInt(ctx.from.id);
  const now = Date.now();
  const timestamps = (userTimestamps.get(telegramId) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );

  if (timestamps.length >= MAX_REQUESTS) {
    await ctx.reply('Слишком много запросов. Подождите 10 секунд.');
    return;
  }

  timestamps.push(now);
  userTimestamps.set(telegramId, timestamps);
  return next();
}
