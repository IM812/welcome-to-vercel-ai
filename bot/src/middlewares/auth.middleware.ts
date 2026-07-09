import type { NextFunction } from 'grammy';
import type { BotContext } from '../types/index';
import { UserService } from '../services/user.service';
import { AdminNotificationService } from '../services/admin-notification.service';
import { ReferralService } from '../services/referral.service';
import { logger } from '../utils/logger';

const userService = new UserService();
const adminNotifService = new AdminNotificationService();
const referralService = new ReferralService();

export async function authMiddleware(ctx: BotContext, next: NextFunction): Promise<void> {
  if (!ctx.from) return next();

  try {
    const refMatch = ctx.message?.text?.match(/^\/start ref_(\d+)$/);
    const referrerTelegramId = refMatch ? BigInt(refMatch[1]) : undefined;

    const { user, isNew } = await userService.getOrCreate(ctx.from, referrerTelegramId);

    if (user.isBanned) {
      await ctx.reply('Ваш доступ к боту ограничен.');
      return;
    }

    (ctx as BotContext & { dbUser: typeof user }).dbUser = user;

    if (isNew) {
      void adminNotifService.notifyNewUser(user);
      if (referrerTelegramId) {
        const referrerUser = await userService.findByTelegramId(referrerTelegramId);
        if (referrerUser) {
          await referralService.saveReferral(user.id, referrerUser.id);
        }
      }
    }

    return next();
  } catch (err) {
    logger.error('Auth middleware error', err);
    return next();
  }
}
