import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { UserRepository } from '../repositories/user.repository';
import { SearchRepository } from '../repositories/search.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import { PLAN_LIMITS, PLAN_NAMES } from '../types/index';
import { formatDate } from '../utils/format';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerStatsController(
  bot: Bot<BotContext>,
  _userRepo: UserRepository,
  searchRepo: SearchRepository,
  notifRepo: NotificationRepository,
): void {
  bot.command('stats', async (ctx) => {
    const user = getDbUser(ctx);
    const limits = PLAN_LIMITS[user.plan];

    const [searches, todayNotifs, totalNotifs] = await Promise.all([
      searchRepo.findActiveByUser(user.id),
      notifRepo.countTodayByUser(user.id),
      notifRepo.countTotalByUser(user.id),
    ]);

    const dailyLimit =
      limits.maxDailyNotifications === null ? '∞' : String(limits.maxDailyNotifications);
    const searchLimit = limits.maxSearches === null ? '∞' : String(limits.maxSearches);

    const planExpiry =
      user.plan !== 'FREE' && user.subscriptionUntil
        ? `\nПодписка до: <b>${formatDate(user.subscriptionUntil)}</b>`
        : '';

    const text =
      `<b>Ваша статистика</b>\n\n` +
      `Тариф: <b>${PLAN_NAMES[user.plan]}</b>${planExpiry}\n\n` +
      `Активных поисков: <b>${searches.length}</b> / ${searchLimit}\n` +
      `Уведомлений сегодня: <b>${todayNotifs}</b> / ${dailyLimit}\n` +
      `Всего уведомлений: <b>${totalNotifs}</b>\n\n` +
      `Зарегистрирован: <b>${formatDate(user.createdAt)}</b>`;

    await ctx.reply(text, { parse_mode: 'HTML' });
  });

  bot.hears('Статистика', async (ctx) => {
    const user = getDbUser(ctx);
    const limits = PLAN_LIMITS[user.plan];

    const [searches, todayNotifs] = await Promise.all([
      searchRepo.findActiveByUser(user.id),
      notifRepo.countTodayByUser(user.id),
    ]);

    const dailyLimit =
      limits.maxDailyNotifications === null ? '∞' : String(limits.maxDailyNotifications);
    const searchLimit = limits.maxSearches === null ? '∞' : String(limits.maxSearches);

    await ctx.reply(
      `Тариф: <b>${PLAN_NAMES[user.plan]}</b>\n` +
        `Поисков: <b>${searches.length}</b> / ${searchLimit}\n` +
        `Уведомлений сегодня: <b>${todayNotifs}</b> / ${dailyLimit}`,
      { parse_mode: 'HTML' },
    );
  });
}
