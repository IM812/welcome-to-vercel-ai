import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { SubscriptionService } from '../services/subscription.service';
import { PaymentService } from '../services/payment.service';
import { PromoService } from '../services/promo.service';
import { subscriptionKeyboard } from '../keyboards/main.keyboard';
import { PLAN_NAMES, PLAN_PRICES, PLAN_LIMITS } from '../types/index';
import { formatPlanExpiry } from '../utils/format';
import { logger } from '../utils/logger';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerSubscriptionController(
  bot: Bot<BotContext>,
  subscriptionService: SubscriptionService,
  paymentService: PaymentService,
  promoService: PromoService,
): void {
  // Show plan info
  bot.hears('Подписка', async (ctx) => {
    const user = getDbUser(ctx);
    const plan = subscriptionService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const expiry = formatPlanExpiry(user);

    const text = [
      `Ваш тариф: *${PLAN_NAMES[plan]}*`,
      `Действует: ${expiry}`,
      '',
      `Поисков: ${limits.maxSearches ?? '∞'}`,
      `Уведомлений/день: ${limits.maxDailyNotifications ?? '∞'}`,
      `Интервал проверки: ${limits.checkIntervalMinutes} мин`,
      `Фото: ${limits.photosEnabled ? 'да' : 'нет'}`,
      '',
      'Выберите тариф для оплаты:',
    ].join('\n');

    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: subscriptionKeyboard(plan),
    });
  });

  // Buy callback
  bot.callbackQuery(/^buy:(START|PRO|UNLIMITED)$/, async (ctx) => {
    const plan = ctx.match[1] as 'START' | 'PRO' | 'UNLIMITED';
    const price = PLAN_PRICES[plan];
    const payload = paymentService.buildInvoicePayload(plan);

    try {
      await ctx.replyWithInvoice(
        `Подписка ${PLAN_NAMES[plan]}`,
        `Доступ к тарифу ${PLAN_NAMES[plan]} на 30 дней`,
        payload,
        'XTR',
        [{ label: `${PLAN_NAMES[plan]} 30 дней`, amount: price }],
      );
      await ctx.answerCallbackQuery();
    } catch (err) {
      logger.error('Invoice send error', err);
      await ctx.answerCallbackQuery('Ошибка. Попробуйте позже.');
    }
  });

  // Pre-checkout — always approve
  bot.on('pre_checkout_query', async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
  });

  // Successful payment
  bot.on('message:successful_payment', async (ctx) => {
    const payment = ctx.message.successful_payment;
    const user = getDbUser(ctx);

    await paymentService.processSuccessfulPayment(
      user.id,
      payment,
      async (msg) => {
        await ctx.reply(msg);
      },
      async (msg) => {
        // admin notification is handled inside paymentService via AdminNotifService
        logger.info(`Admin payment notification: ${msg}`);
      },
    );
  });

  // Promo hint callback
  bot.callbackQuery('promo_hint', async (ctx) => {
    await ctx.answerCallbackQuery('Используйте /promo КОД');
  });

  // /promo command
  bot.command('promo', async (ctx) => {
    const parts = ctx.message?.text?.split(' ') ?? [];
    const code = parts[1]?.trim();

    if (!code) {
      ctx.session.step = 'awaiting_promo';
      await ctx.reply('Введите промокод:');
      return;
    }

    const user = getDbUser(ctx);
    const result = await promoService.applyPromo(user.id, code);

    if (!result.success) {
      await ctx.reply(result.reason ?? 'Промокод недействителен.');
      return;
    }

    await ctx.reply(
      result.planGranted
        ? `Промокод применён! Тариф ${PLAN_NAMES[result.planGranted]} активирован на ${result.daysGranted} дней.`
        : 'Промокод применён!',
    );
  });

  // Promo text input step
  bot.on('message:text', async (ctx, next) => {
    if (ctx.session.step !== 'awaiting_promo') return next();
    ctx.session.step = undefined;

    const code = ctx.message.text.trim();
    const user = getDbUser(ctx);
    const result = await promoService.applyPromo(user.id, code);

    if (!result.success) {
      await ctx.reply(result.reason ?? 'Промокод недействителен.');
      return;
    }

    await ctx.reply(
      result.planGranted
        ? `Промокод применён! Тариф ${PLAN_NAMES[result.planGranted]} активирован на ${result.daysGranted} дней.`
        : 'Промокод применён!',
    );
  });
}
