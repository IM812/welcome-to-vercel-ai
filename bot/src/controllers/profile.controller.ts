import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User, Search } from '../generated/prisma/index';
import { InlineKeyboard } from 'grammy';
import { SearchRepository } from '../repositories/search.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import { SubscriptionService } from '../services/subscription.service';
import { PLAN_LIMITS } from '../types/index';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function planLabel(plan: string): string {
  const labels: Record<string, string> = {
    FREE: 'Бесплатный',
    START: 'Start',
    PRO: 'Pro',
    UNLIMITED: 'Unlimited',
  };
  return labels[plan] ?? plan;
}

export function registerProfileController(
  bot: Bot<BotContext>,
  searchRepo: SearchRepository,
  notifRepo: NotificationRepository,
  subscriptionService: SubscriptionService,
): void {
  async function showProfile(ctx: BotContext): Promise<void> {
    const user = getDbUser(ctx);

    const [searches, notifCount] = await Promise.all([
      searchRepo.findByUserId(user.id),
      notifRepo.countTotalByUser(user.id),
    ]);

    const effectivePlan = subscriptionService.effectivePlan(user);
    const limits = PLAN_LIMITS[effectivePlan];
    const isAdmin = subscriptionService.isAdmin(user);

    const activeSearches = searches.filter((s: Search) => s.isActive);
    const maxSearches = isAdmin || limits.maxSearches === null ? '∞' : String(limits.maxSearches);
    const maxNotifs = isAdmin || limits.maxDailyNotifications === null ? '∞' : String(limits.maxDailyNotifications);

    const subLine = user.subscriptionUntil && effectivePlan !== 'FREE'
      ? `до ${formatDate(user.subscriptionUntil)}`
      : 'бессрочно';

    const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || '—';

    const lines = [
      `Профиль`,
      '',
      `Имя: ${name}`,
      `ID: ${user.telegramId}`,
      `Регистрация: ${formatDate(user.createdAt)}`,
      '',
      `Тариф: ${planLabel(effectivePlan)} (${subLine})`,
      `Поисков: ${activeSearches.length} / ${maxSearches}`,
      `Уведомлений сегодня: ${user.dailyNotificationCount} / ${maxNotifs}`,
      `Всего уведомлений: ${notifCount}`,
      ...(user.isBanned ? ['', 'Аккаунт заблокирован'] : []),
      ...(isAdmin ? ['', 'Администратор'] : []),
    ];

    const keyboard = new InlineKeyboard()
      .text('Мои поиски', 'my_searches')
      .text('Подписка', 'subscription');

    const text = lines.join('\n');

    if (ctx.callbackQuery) {
      await ctx.editMessageText(text, { reply_markup: keyboard });
      await ctx.answerCallbackQuery();
    } else {
      await ctx.reply(text, { reply_markup: keyboard });
    }
  }

  bot.hears('Профиль', async (ctx) => showProfile(ctx));
  bot.callbackQuery('profile', async (ctx) => showProfile(ctx));
  bot.command('profile', async (ctx) => showProfile(ctx));
}
