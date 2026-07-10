import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { Plan, User } from '../generated/prisma/index';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { PromoService } from '../services/promo.service';
import { UserRepository } from '../repositories/user.repository';
import { SearchRepository } from '../repositories/search.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import { adminGuard } from '../middlewares/admin.middleware';
import { adminMenuKeyboard } from '../keyboards/main.keyboard';
import { formatDate, formatUserMention } from '../utils/format';
import { ParserFactory } from '../parsers/parser.factory';
import { SearchService } from '../services/search.service';
import fs from 'fs';
import path from 'path';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerAdminController(
  bot: Bot<BotContext>,
  userService: UserService,
  subscriptionService: SubscriptionService,
  promoService: PromoService,
  userRepo: UserRepository,
  searchRepo: SearchRepository,
  notifRepo: NotificationRepository,
  adminLogRepo: AdminLogRepository,
  paymentRepo?: PaymentRepository,
): void {
  const pRepo = paymentRepo ?? new PaymentRepository();
  // /admin — dashboard overview
  bot.command('admin', adminGuard, async (ctx) => {
    const [totalUsers, activeToday, planCounts, totalSearches] = await Promise.all([
      userRepo.countAll(),
      userRepo.countActiveToday(),
      userRepo.countByPlan(),
      searchRepo.countAll(),
    ]);

    const text = [
      'Панель администратора',
      '',
      `Пользователей: ${totalUsers}`,
      `Активных сегодня: ${activeToday}`,
      '',
      'По тарифам:',
      `FREE: ${planCounts['FREE'] ?? 0}`,
      `START: ${planCounts['START'] ?? 0}`,
      `PRO: ${planCounts['PRO'] ?? 0}`,
      `UNLIMITED: ${planCounts['UNLIMITED'] ?? 0}`,
      '',
      `Активных поисков: ${totalSearches}`,
    ].join('\n');

    await ctx.reply(text, { reply_markup: adminMenuKeyboard() });
    await adminLogRepo.log('ADMIN_PANEL', 'opened', getDbUser(ctx).id);
  });

  // /ban <telegramId>
  bot.command('ban', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply('Использование: /ban <telegramId>');
      return;
    }
    try {
      await userService.banUser(telegramId);
      await ctx.reply(`Пользователь ${telegramId} заблокирован.`);
      await adminLogRepo.log('BAN_USER', `telegramId:${telegramId}`, getDbUser(ctx).id);
    } catch {
      await ctx.reply('Пользователь не найден.');
    }
  });

  // /unban <telegramId>
  bot.command('unban', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply('Использование: /unban <telegramId>');
      return;
    }
    try {
      await userService.unbanUser(telegramId);
      await ctx.reply(`Пользователь ${telegramId} разблокирован.`);
      await adminLogRepo.log('UNBAN_USER', `telegramId:${telegramId}`, getDbUser(ctx).id);
    } catch {
      await ctx.reply('Пользователь не найден.');
    }
  });

  // /setplan <telegramId> <plan>
  bot.command('setplan', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const [telegramId, planStr] = args;
    const validPlans: Plan[] = ['FREE', 'START', 'PRO', 'UNLIMITED'];

    if (!telegramId || !planStr || !validPlans.includes(planStr as Plan)) {
      await ctx.reply('Использование: /setplan <telegramId> <FREE|START|PRO|UNLIMITED>');
      return;
    }

    try {
      await subscriptionService.setPlanAdmin(telegramId, planStr as Plan);
      await ctx.reply(`Тариф ${telegramId} изменён на ${planStr}.`);
      await adminLogRepo.log('SET_PLAN', `telegramId:${telegramId} plan:${planStr}`, getDbUser(ctx).id);
    } catch {
      await ctx.reply('Пользователь не найден.');
    }
  });

  // /userinfo <telegramId>
  bot.command('userinfo', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply('Использование: /userinfo <telegramId>');
      return;
    }
    try {
      const user = await userRepo.findByTelegramId(telegramId);
      if (!user) throw new Error('not found');

      const [searchCount, totalNotifs] = await Promise.all([
        searchRepo.countByUser(user.id),
        notifRepo.countTotalByUser(user.id),
      ]);

      const text = [
        `Пользователь: ${formatUserMention(user)} (${user.telegramId})`,
        `Тариф: ${user.plan}`,
        `Подписка до: ${user.subscriptionUntil ? formatDate(user.subscriptionUntil) : 'N/A'}`,
        `Забанен: ${user.isBanned ? `да (${user.banReason ?? ''})` : 'нет'}`,
        `Регистрация: ${formatDate(user.createdAt)}`,
        `Последняя активность: ${formatDate(user.lastActiveAt)}`,
        '',
        `Поисков: ${searchCount}`,
        `Уведомлений всего: ${totalNotifs}`,
      ].join('\n');

      await ctx.reply(text);
    } catch {
      await ctx.reply('Пользователь не найден.');
    }
  });

  // /broadcast <message>
  bot.command('broadcast', adminGuard, async (ctx) => {
    const text = ctx.message?.text?.replace(/^\/broadcast\s*/, '').trim();
    if (!text) {
      await ctx.reply('Использование: /broadcast <текст>');
      return;
    }

    ctx.session.step = `broadcast:${text}`;
    await ctx.reply(
      `Предпросмотр рассылки:\n\n${text}\n\nОтветьте "да" для подтверждения или "нет" для отмены.`,
    );
  });

  bot.on('message:text', async (ctx, next) => {
    const step = ctx.session.step;
    if (!step?.startsWith('broadcast:')) return next();

    const text = step.slice('broadcast:'.length);
    const answer = ctx.message.text.trim().toLowerCase();
    ctx.session.step = undefined;

    if (answer !== 'да') {
      await ctx.reply('Рассылка отменена.');
      return;
    }

    await ctx.reply('Рассылка запущена...');
    const users = await userRepo.findAllActive();
    let sent = 0;
    let failed = 0;

    for (const user of users) {
      try {
        await bot.api.sendMessage(Number(user.telegramId), text);
        sent++;
        if (sent % 25 === 0) await new Promise((r) => setTimeout(r, 1000));
      } catch {
        failed++;
      }
    }

    await ctx.reply(`Рассылка завершена.\nОтправлено: ${sent}\nОшибок: ${failed}`);
    await adminLogRepo.log(
      'BROADCAST',
      `sent:${sent} failed:${failed} preview:${text.slice(0, 80)}`,
      getDbUser(ctx).id,
    );
  });

  // /createpromo <code> <plan> <days> [maxUses]
  bot.command('createpromo', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const [code, plan, daysStr, maxUsesStr] = args;
    const validPlans: Plan[] = ['FREE', 'START', 'PRO', 'UNLIMITED'];

    if (!code || !plan || !daysStr || !validPlans.includes(plan as Plan)) {
      await ctx.reply('Использование: /createpromo <КОД> <FREE|START|PRO|UNLIMITED> <дней> [maxUses]');
      return;
    }

    const days = parseInt(daysStr, 10);
    const maxUses = maxUsesStr ? parseInt(maxUsesStr, 10) : 100;

    try {
      const promo = await promoService.createPromo(code.toUpperCase(), plan as Plan, days, maxUses);
      await ctx.reply(
        `Промокод создан:\nКод: ${promo.code}\nТариф: ${promo.planGranted}\nДней: ${promo.daysGranted}\nМакс. использований: ${promo.maxUses}`,
      );
      await adminLogRepo.log('CREATE_PROMO', `code:${code} plan:${plan}`, getDbUser(ctx).id);
    } catch (err) {
      await ctx.reply(`Ошибка: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  // /deletepromo <code>
  bot.command('deletepromo', adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    const code = args[0]?.toUpperCase();
    if (!code) {
      await ctx.reply('Использование: /deletepromo <КОД>');
      return;
    }
    try {
      await promoService.deletePromo(code);
      await ctx.reply(`Промокод ${code} деактивирован.`);
      await adminLogRepo.log('DELETE_PROMO', `code:${code}`, getDbUser(ctx).id);
    } catch (err) {
      await ctx.reply(`Ошибка: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  // /listpromos
  bot.command('listpromos', adminGuard, async (ctx) => {
    const promos = await promoService.listAll();
    if (promos.length === 0) {
      await ctx.reply('Нет активных промокодов.');
      return;
    }
    const lines = promos.map(
      (p) => `${p.code} — ${p.planGranted}, ${p.daysGranted}д, ${p.usedCount}/${p.maxUses} использ.`,
    );
    await ctx.reply(`Промокоды (${promos.length}):\n\n${lines.join('\n')}`);
  });

  // /globalstats
  bot.command('globalstats', adminGuard, async (ctx) => {
    const [totalUsers, planCounts, totalSearches, activeToday] = await Promise.all([
      userRepo.countAll(),
      userRepo.countByPlan(),
      searchRepo.countAll(),
      userRepo.countActiveToday(),
    ]);

    const text = [
      'Глобальная статистика',
      '',
      `Пользователей: ${totalUsers}`,
      `Активных сегодня: ${activeToday}`,
      '',
      `FREE: ${planCounts['FREE'] ?? 0}`,
      `START: ${planCounts['START'] ?? 0}`,
      `PRO: ${planCounts['PRO'] ?? 0}`,
      `UNLIMITED: ${planCounts['UNLIMITED'] ?? 0}`,
      '',
      `Поисков активных: ${totalSearches}`,
    ].join('\n');

    await ctx.reply(text);
  });

  // /testparser <url> — test a URL and show what the parser finds
  bot.command('testparser', adminGuard, async (ctx) => {
    const url = ctx.message?.text?.replace(/^\/testparser\s*/, '').trim();
    if (!url) {
      await ctx.reply('Использование: /testparser <url>\nПример: /testparser https://www.avito.ru/moskva/telefony?q=iphone');
      return;
    }

    const searchService = new SearchService();
    const platform = searchService.detectPlatform(url);
    if (!platform) {
      await ctx.reply('Ссылка не распознана как поддерживаемая площадка.');
      return;
    }

    await ctx.reply(`Тестирую парсер ${platform} для:\n${url}\n\nЖдите...`);

    try {
      const start = Date.now();
      const parser = ParserFactory.create(platform);
      const listings = await parser.parse(url);
      const ms = Date.now() - start;

      if (listings.length === 0) {
        await ctx.reply(`Парсер отработал за ${ms}мс.\nОбъявлений не найдено — возможно изменилась структура страницы или нужен прокси.`);
        return;
      }

      const preview = listings.slice(0, 5).map((l, i) => {
        const date = l.publishedAt
          ? l.publishedAt.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
          : 'дата неизвестна';
        return `${i + 1}. ${l.title}\n   Цена: ${l.price ?? 'не указана'}\n   Дата: ${date}\n   ${l.url}`;
      }).join('\n\n');

      await ctx.reply(
        `Парсер: ${platform} | Время: ${ms}мс | Найдено: ${listings.length} объявлений\n\nПервые 5:\n\n${preview}`,
        { link_preview_options: { is_disabled: true } },
      );
    } catch (err) {
      await ctx.reply(`Ошибка парсера:\n${err instanceof Error ? err.message : String(err)}`);
    }
  });

  // Admin panel button callbacks
  bot.callbackQuery('admin:stats', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const stats = await userService.getStats();
    await ctx.reply(
      `Статистика\n\nПользователей: ${stats.total}\nНовых сегодня: ${stats.newToday}\nАктивных: ${stats.activeToday}\nПлатных: ${stats.paid}\nЗабаненных: ${stats.banned}`,
    );
  });

  // Payments — show last 10 payments inline
  bot.callbackQuery('admin:payments', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const payments = await pRepo.findRecent(10);
    if (payments.length === 0) {
      await ctx.reply('Платежей пока нет.');
      return;
    }
    const [today, starsToday] = await Promise.all([
      pRepo.countToday(),
      pRepo.sumStarsToday(),
    ]);
    const lines = payments.map((p) => {
      const u = (p as typeof p & { user?: { telegramId: bigint; firstName: string } }).user;
      const who = u ? `${u.firstName} (${u.telegramId})` : `user #${p.userId}`;
      const date = formatDate(p.createdAt);
      return `${date} | ${who} | ${p.plan} | ${p.stars} ⭐`;
    });
    await ctx.reply(
      `Платежи\nСегодня: ${today} платежей, ${starsToday} ⭐\n\nПоследние 10:\n\n${lines.join('\n')}`,
    );
  });

  // Users — show last 20 users inline
  bot.callbackQuery('admin:users', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const users = await userRepo.findAll();
    const recent = users.slice(0, 20);
    if (recent.length === 0) {
      await ctx.reply('Пользователей нет.');
      return;
    }
    const lines = recent.map((u) => {
      const name = [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || '—';
      const banned = u.isBanned ? ' [БАН]' : '';
      return `${u.telegramId} | ${name} | ${u.plan}${banned}`;
    });
    await ctx.reply(`Пользователи (${users.length} всего):\n\n${lines.join('\n')}`);
  });

  // Logs
  bot.callbackQuery('admin:logs', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const logs = await adminLogRepo.findRecent(10);
    if (logs.length === 0) {
      await ctx.reply('Логи пусты.');
      return;
    }
    const lines = logs.map((l) => `${formatDate(l.createdAt)} | ${l.action} | ${l.details ?? ''}`);
    await ctx.reply(`Последние логи:\n\n${lines.join('\n')}`);
  });

  // Broadcast — enter text via dialog
  bot.callbackQuery('admin:broadcast_hint', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    ctx.session.step = 'admin:awaiting_broadcast';
    await ctx.reply('Введите текст рассылки.\n\nОтправьте сообщение и оно уйдёт всем пользователям. Для отмены напишите /cancel.');
  });

  // Handle broadcast text input
  bot.on('message:text', adminGuard, async (ctx, next) => {
    if (ctx.session.step !== 'admin:awaiting_broadcast') return next();
    const text = ctx.message.text.trim();
    if (text === '/cancel') {
      ctx.session.step = undefined;
      await ctx.reply('Рассылка отменена.');
      return;
    }
    ctx.session.step = undefined;
    const allUsers = await userRepo.findAllActive();
    let sent = 0, failed = 0;
    for (const u of allUsers) {
      try {
        await ctx.api.sendMessage(Number(u.telegramId), text);
        sent++;
      } catch { failed++; }
    }
    await ctx.reply(`Рассылка завершена.\nОтправлено: ${sent}\nОшибок: ${failed}`);
    await adminLogRepo.log('BROADCAST', `sent:${sent} failed:${failed}`, (ctx as BotContext & { dbUser: User }).dbUser?.id);
  });

  // /resetbaseline SEARCH_ID — admin command to wipe and re-seed a search baseline
  const searchService = new SearchService();
  bot.command('resetbaseline', adminGuard, async (ctx) => {
    const parts = ctx.message?.text?.trim().split(/\s+/) ?? [];
    const searchId = parts[1] ? parseInt(parts[1]) : NaN;
    if (isNaN(searchId)) {
      await ctx.reply('Использование: /resetbaseline <search_id>');
      return;
    }
    await ctx.reply(`Сбрасываю baseline для поиска #${searchId}...`);
    try {
      const count = await searchService.resetBaseline(searchId);
      await ctx.reply(`Готово. Сохранено ${count} объявлений как baseline. Уведомления пойдут только по новым.`);
      await adminLogRepo.log('RESET_BASELINE', `searchId:${searchId} count:${count}`, getDbUser(ctx).id);
    } catch (e) {
      await ctx.reply(`Ошибка: ${e instanceof Error ? e.message : String(e)}`);
    }
  });

  // Admin settings — global parser info
  bot.callbackQuery('admin:settings', adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [totalSearches, errorSearches] = await Promise.all([
      searchRepo.countAll(),
      searchRepo.countByStatus('ERROR'),
    ]);

    const cookiesPath = process.env.AVITO_COOKIES_PATH ??
      path.resolve(process.cwd(), 'storage/avito_cookies.json');
    const cookiesExist = fs.existsSync(cookiesPath);
    const cookiesStatus = cookiesExist
      ? `✅ есть (${cookiesPath})`
      : `❌ не установлены`;

    await ctx.reply(
      `Настройки парсера\n\nАктивных поисков: ${totalSearches}\nПоисков с ошибкой: ${errorSearches}\nКуки Avito: ${cookiesStatus}\n\nКоманды:\n/testparser <url> — тест парсера\n/setcookies <строка> — установить куки Avito\n/ban <id> — заблокировать\n/unban <id> — разблокировать\n/setplan <id> <план> — сменить тариф\n/userinfo <id> — инфо о пользователе`,
    );
  });

  /**
   * /setcookies <cookie_string>
   *
   * Accepts the raw cookie string copied from browser DevTools
   * (Application → Cookies → right-click → Copy All, or just paste from
   * the browser address bar cookie header).
   *
   * Format: "name1=value1; name2=value2; ..."
   * The parsed dict is saved to AVITO_COOKIES_PATH (default: storage/avito_cookies.json).
   * avito_fetch.py reads this file on every request.
   *
   * How to get the cookie string:
   *   1. Open avito.ru in Chrome and solve any CAPTCHA if shown
   *   2. DevTools → Application → Cookies → avito.ru
   *   3. Copy the "ft" cookie value and any others, or use the snippet:
   *      document.cookie  (paste into Console)
   */
  bot.command('setcookies', adminGuard, async (ctx) => {
    const raw = ctx.message?.text?.replace(/^\/setcookies\s*/i, '').trim() ?? '';
    if (!raw) {
      await ctx.reply(
        'Использование: /setcookies <строка куки>\n\n' +
        'Как получить куки:\n' +
        '1. Открой avito.ru в Chrome\n' +
        '2. Открой DevTools (F12) → Console\n' +
        '3. Введи: document.cookie\n' +
        '4. Скопируй всю строку и отправь: /setcookies <вставь сюда>',
      );
      return;
    }

    // Parse "name=value; name2=value2; ..." into a dict
    const cookies: Record<string, string> = {};
    for (const pair of raw.split(';')) {
      const eqIdx = pair.indexOf('=');
      if (eqIdx === -1) continue;
      const key = pair.slice(0, eqIdx).trim();
      const value = pair.slice(eqIdx + 1).trim();
      if (key) cookies[key] = value;
    }

    if (Object.keys(cookies).length === 0) {
      await ctx.reply('Не удалось распарсить куки. Убедись что формат: name=value; name2=value2');
      return;
    }

    const cookiesPath = process.env.AVITO_COOKIES_PATH ??
      path.resolve(process.cwd(), 'storage/avito_cookies.json');

    try {
      fs.mkdirSync(path.dirname(cookiesPath), { recursive: true });
      fs.writeFileSync(
        cookiesPath,
        JSON.stringify({ cookies, saved_at: Date.now() / 1000 }, null, 2),
        'utf-8',
      );
    } catch (e) {
      await ctx.reply(`Ошибка при сохранении куки: ${e instanceof Error ? e.message : String(e)}`);
      return;
    }

    const hasFt = 'ft' in cookies;
    await ctx.reply(
      `✅ Куки сохранены: ${Object.keys(cookies).length} шт.\n` +
      `ft-кука: ${hasFt ? '✅ есть' : '⚠️ нет (парсер может не работать)'}\n` +
      `Путь: ${cookiesPath}`,
    );
    await adminLogRepo.log('SET_COOKIES', `keys:${Object.keys(cookies).join(',').slice(0, 200)}`, getDbUser(ctx).id);
  });
}
