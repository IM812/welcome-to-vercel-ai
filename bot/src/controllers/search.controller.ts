import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { SearchService } from '../services/search.service';
import { SubscriptionService } from '../services/subscription.service';
import {
  searchListKeyboard,
  searchActionKeyboard,
  cancelAddKeyboard,
} from '../keyboards/main.keyboard';
import { PLATFORM_NAMES, SEARCH_STATUS_LABELS, PLAN_LIMITS } from '../types/index';
import { formatDate } from '../utils/format';

const searchService = new SearchService();
const subService = new SubscriptionService();

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerSearchController(bot: Bot<BotContext>): void {
  // Add search — auto-select Avito, go straight to URL step
  bot.hears('Добавить поиск', async (ctx) => {
    const user = getDbUser(ctx);
    const plan = subService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const current = await searchService.getByUser(user.id);
    const activeCount = current.filter((s) => s.isActive).length;

    if (limits.maxSearches !== null && activeCount >= limits.maxSearches) {
      await ctx.reply(
        `Ваш тариф ${plan} позволяет до ${limits.maxSearches} активных поисков.\nПерейдите на Pro для большего количества.`,
      );
      return;
    }

    ctx.session.selectedPlatform = 'AVITO';
    ctx.session.step = 'awaiting_url';
    await ctx.reply(
      'Перейдите на avito.ru, настройте нужные фильтры и отправьте сюда ссылку на результаты поиска.',
      { reply_markup: cancelAddKeyboard() },
    );
  });

  // Cancel adding a search — reset session and go back to main menu
  bot.callbackQuery('cancel_add', async (ctx) => {
    ctx.session.step = undefined;
    ctx.session.selectedPlatform = undefined;
    await ctx.editMessageText('Добавление поиска отменено.');
    await ctx.answerCallbackQuery();
  });

  // Platform callback (kept for compatibility, auto-answers)
  bot.callbackQuery(/^platform:(\w+)$/, async (ctx) => {
    const platform = ctx.match[1] as BotContext['session']['selectedPlatform'];
    if (!platform) { await ctx.answerCallbackQuery(); return; }

    ctx.session.selectedPlatform = platform;
    ctx.session.step = 'awaiting_url';

    await ctx.editMessageText(
      `Отправьте ссылку на страницу поиска avito.ru с нужными фильтрами.`,
    );
    await ctx.answerCallbackQuery();
  });

  // URL received
  bot.on('message:text', async (ctx, next) => {
    if (ctx.session.step !== 'awaiting_url') return next();

    const url = ctx.message.text.trim();
    const platform = ctx.session.selectedPlatform;

    if (!platform) {
      ctx.session.step = undefined;
      return next();
    }

    const detected = searchService.detectPlatform(url);
    if (!detected || detected !== platform) {
      await ctx.reply(
        `Ссылка не соответствует площадке Avito.\nОтправьте правильную ссылку или нажмите "Отмена".`,
        { reply_markup: cancelAddKeyboard() },
      );
      return;
    }

    // Auto-generate name from the URL query parameter (e.g. ?q=iphone+15 -> "iphone 15")
    // No extra step needed — create the search immediately.
    ctx.session.step = undefined;
    ctx.session.selectedPlatform = undefined;

    const user = getDbUser(ctx);
    const { allowed, reason } = await searchService.canAdd(user);
    if (!allowed) {
      await ctx.reply(reason ?? 'Нельзя добавить поиск.');
      return;
    }

    let autoName: string | undefined;
    try {
      const q = new URL(url).searchParams.get('q');
      if (q) autoName = decodeURIComponent(q).replace(/\+/g, ' ');
    } catch { /* ignore */ }

    const search = await searchService.create(user, url, platform, autoName);

    // Immediately initialize baseline so the first cron run only sees NEW listings
    try {
      await searchService.initializeSearchBaseline(search.id);
      await ctx.reply(
        `Поиск добавлен: ${search.name ?? PLATFORM_NAMES[platform]}\n\n` +
        `Текущие объявления запомнены. Я буду присылать только новые.`,
      );
    } catch {
      await ctx.reply(
        `Поиск добавлен: ${search.name ?? PLATFORM_NAMES[platform]}\n` +
        `Первая проверка начнётся в ближайшую минуту.`,
      );
    }
  });

  // My searches list
  bot.hears('Мои поиски', async (ctx) => {
    const user = getDbUser(ctx);
    const searches = await searchService.getByUser(user.id);

    if (searches.length === 0) {
      await ctx.reply(
        'У вас нет поисков. Нажмите "Добавить поиск" чтобы создать первый.',
      );
      return;
    }

    await ctx.reply('Ваши поиски:', { reply_markup: searchListKeyboard(searches) });
  });

  bot.callbackQuery('my_searches', async (ctx) => {
    const user = getDbUser(ctx);
    const searches = await searchService.getByUser(user.id);
    await ctx.editMessageText('Ваши поиски:', {
      reply_markup: searchListKeyboard(searches),
    });
    await ctx.answerCallbackQuery();
  });

  // Search detail
  bot.callbackQuery(/^search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    const search = await searchService.getById(id, user.id);

    if (!search) {
      await ctx.answerCallbackQuery('Поиск не найден.');
      return;
    }

    const statusLabel = SEARCH_STATUS_LABELS[search.status];
    const text = [
      `Поиск: ${search.name ?? PLATFORM_NAMES[search.platform]}`,
      `Площадка: ${PLATFORM_NAMES[search.platform]}`,
      `Статус: ${statusLabel}`,
      `URL: ${search.url}`,
      `Последняя проверка: ${formatDate(search.lastCheckedAt)}`,
      `Последнее объявление: ${formatDate(search.lastFoundAt)}`,
      search.lastError ? `Ошибка: ${search.lastError}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    await ctx.editMessageText(text, { reply_markup: searchActionKeyboard(search) });
    await ctx.answerCallbackQuery();
  });

  // Pause
  bot.callbackQuery(/^pause_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    await searchService.pause(id, user.id);
    await ctx.answerCallbackQuery('Поиск на паузе.');
    await ctx.editMessageText('Поиск приостановлен.');
  });

  // Resume
  bot.callbackQuery(/^resume_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    await searchService.resume(id, user.id);
    await ctx.answerCallbackQuery('Поиск возобновлён.');
    await ctx.editMessageText('Поиск активирован.');
  });

  // Delete
  bot.callbackQuery(/^del_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    const deleted = await searchService.delete(id, user.id);
    await ctx.answerCallbackQuery(deleted ? 'Поиск удалён.' : 'Поиск не найден.');
    await ctx.editMessageText(deleted ? 'Поиск удалён.' : 'Поиск не найден.');
  });

  // Rename - step 1
  bot.callbackQuery(/^rename_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    ctx.session.step = `renaming:${id}`;
    await ctx.answerCallbackQuery();
    await ctx.reply('Введите новое название для поиска:');
  });

  // Rename - step 2
  bot.on('message:text', async (ctx, next) => {
    const step = ctx.session.step;
    if (!step?.startsWith('renaming:')) return next();

    const id = parseInt(step.split(':')[1]);
    const user = getDbUser(ctx);
    const name = ctx.message.text.trim();

    ctx.session.step = undefined;

    const updated = await searchService.rename(id, user.id, name);
    if (updated) {
      await ctx.reply(`Поиск переименован: "${updated.name ?? name}"`);
    } else {
      await ctx.reply('Поиск не найден.');
    }
  });

  // Reset baseline — step 1: confirm
  bot.callbackQuery(/^reset_baseline:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    await ctx.answerCallbackQuery();
    const { InlineKeyboard } = await import('grammy');
    const kb = new InlineKeyboard()
      .text('Да, сбросить', `confirm_reset:${id}`)
      .text('Отмена', `search:${id}`);
    await ctx.editMessageText(
      'После сброса текущие объявления будут считаться старыми, уведомления пойдут только по новым.\n\nПодтвердить сброс?',
      { reply_markup: kb },
    );
  });

  // Reset baseline — step 2: execute
  bot.callbackQuery(/^confirm_reset:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('Сбрасываю... пожалуйста подождите.');
    try {
      const count = await searchService.resetBaseline(id, user.id);
      await ctx.editMessageText(`Готово. Запомнил ${count} текущих объявлений.\nТеперь буду присылать только новые.`);
    } catch (e) {
      await ctx.editMessageText('Ошибка при сбросе. Попробуйте позже.');
    }
  });

  // History
  bot.callbackQuery(/^history:(\d+)$/, async (ctx) => {
    const user = getDbUser(ctx);
    const plan = subService.effectivePlan(user);
    const limit = PLAN_LIMITS[plan].historyLimit;

    if (limit === 0 || limit === null && plan === 'FREE') {
      await ctx.answerCallbackQuery('История недоступна на тарифе Free.');
      return;
    }

    const items = await searchService.getHistory(user.id, limit ?? 200);

    if (items.length === 0) {
      await ctx.answerCallbackQuery();
      await ctx.editMessageText('История пуста.');
      return;
    }

    const lines = items.slice(0, 10).map((l) => {
      const listing = l as typeof l & { title: string; price: string | null; url: string };
      return `• ${listing.title}${listing.price ? ' — ' + listing.price : ''}\n  ${listing.url}`;
    });

    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Последние объявления:\n\n${lines.join('\n\n')}`);
  });
}
