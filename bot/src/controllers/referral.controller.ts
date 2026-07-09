import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { ReferralService } from '../services/referral.service';
import { config } from '../config/index';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerReferralController(
  bot: Bot<BotContext>,
  referralService: ReferralService,
): void {
  bot.command('referral', async (ctx) => {
    const user = getDbUser(ctx);
    const stats = await referralService.getStats(user.id);
    const link = `https://t.me/${config.BOT_USERNAME}?start=ref_${user.telegramId}`;

    const text =
      '<b>Реферальная программа</b>\n\n' +
      'Приглашайте друзей и получайте бонусы:\n' +
      '• За каждого активного реферала — <b>+7 дней</b> к подписке\n' +
      '• За 5 рефералов — <b>1 месяц PRO</b> бесплатно\n\n' +
      `Ваша ссылка:\n<code>${link}</code>\n\n` +
      `Приглашено: <b>${stats.total}</b>\n` +
      `Бонусных дней получено: <b>${stats.bonusDaysEarned}</b>`;

    await ctx.reply(text, { parse_mode: 'HTML' });
  });
}
