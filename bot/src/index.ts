import 'dotenv/config';
import { Bot, session, MemorySessionStorage } from 'grammy';
import type { BotContext, SessionData } from './types/index';
import { config } from './config/index';
import { logger } from './utils/logger';

// Repositories
import { UserRepository } from './repositories/user.repository';
import { SearchRepository } from './repositories/search.repository';
import { ListingRepository } from './repositories/listing.repository';
import { NotificationRepository } from './repositories/notification.repository';
import { FavoriteRepository } from './repositories/favorite.repository';
import { AdminLogRepository } from './repositories/adminlog.repository';

// Services
import { UserService } from './services/user.service';
import { SubscriptionService } from './services/subscription.service';
import { NotificationService } from './services/notification.service';
import { PaymentService } from './services/payment.service';
import { PromoService } from './services/promo.service';
import { ReferralService } from './services/referral.service';
import { AdminNotificationService } from './services/admin-notification.service';

// Middlewares
import { authMiddleware } from './middlewares/auth.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';

// Controllers
import { registerStartController } from './controllers/start.controller';
import { registerSearchController } from './controllers/search.controller';
import { registerSubscriptionController } from './controllers/subscription.controller';
import { registerSettingsController } from './controllers/settings.controller';
import { registerFavoritesController } from './controllers/favorites.controller';
import { registerStatsController } from './controllers/stats.controller';
import { registerSupportController } from './controllers/support.controller';
import { registerReferralController } from './controllers/referral.controller';
import { registerAdminController } from './controllers/admin.controller';
import { registerProfileController } from './controllers/profile.controller';

// Parsers
import { getProxyPoolSize } from './parsers/base.parser';

// Cron jobs (class-based)
import { CheckerCron } from './cron/checker.cron';
import { SubscriptionCron } from './cron/subscription.cron';
import { DailyResetCron } from './cron/daily-reset.cron';
import { QueueFlushCron } from './cron/queue-flush.cron';

async function main() {
  logger.info('Starting SearchBot...');

  // Report proxy-pool status so it's obvious whether IP rotation is active.
  const proxyPoolSize = getProxyPoolSize();
  if (proxyPoolSize > 0) {
    logger.info(`[proxy] pool active — ${proxyPoolSize} proxies, round-robin rotation`);
  } else {
    logger.warn('[proxy] NO proxy pool configured — all requests use the server IP (403 risk). Set AVITO_PROXY_POOL or storage/avito_proxy_pool.txt');
  }

  // ── Bot instance ──────────────────────────────────────────────────────────
  const bot = new Bot<BotContext>(config.BOT_TOKEN);

  // ── Services (self-sufficient with optional DI) ───────────────────────────
  // Services instantiate their own repos internally; bot is injected where needed.
  const adminNotif = new AdminNotificationService(bot);
  const userService = new UserService();
  const subscriptionService = new SubscriptionService();
  const notifService = new NotificationService();
  const paymentService = new PaymentService();
  const promoService = new PromoService();
  const referralService = new ReferralService();

  // Inject bot into services that need to send messages
  notifService.setBot(bot);
  adminNotif.setBot(bot);

  // ── Repos needed by controllers that take them directly ───────────────────
  const userRepo = new UserRepository();
  const searchRepo = new SearchRepository();
  const listingRepo = new ListingRepository();
  const notifRepo = new NotificationRepository();
  const favoriteRepo = new FavoriteRepository();
  const adminLogRepo = new AdminLogRepository();

  // ── Session middleware ─────────────────────────────────────────────────────
  bot.use(
    session<SessionData, BotContext>({
      initial: (): SessionData => ({}),
      storage: new MemorySessionStorage<SessionData>(),
    }),
  );

  // ── Global middlewares ─────────────────────────────────────────────────────
  bot.use(rateLimitMiddleware);
  bot.use(authMiddleware);

  // ── Controllers ────────────────────────────────────────────────────────────
  registerStartController(bot);
  registerSearchController(bot);
  registerSubscriptionController(bot, subscriptionService, paymentService, promoService);
  registerSettingsController(bot, userService);
  registerFavoritesController(bot, favoriteRepo, listingRepo);
  registerStatsController(bot, userRepo, searchRepo, notifRepo);
  registerProfileController(bot, searchRepo, notifRepo, subscriptionService);
  registerSupportController(bot, adminNotif);
  registerReferralController(bot, referralService);
  registerAdminController(
    bot,
    userService,
    subscriptionService,
    promoService,
    userRepo,
    searchRepo,
    notifRepo,
    adminLogRepo,
  );

  // ── Fallback handler ───────────────────────────────────────────────────────
  bot.on('message:text', async (ctx, next) => {
    if (ctx.session.step) return next();
    await ctx.reply('Неизвестная команда. Используйте /start для помощи.');
  });

  bot.catch(async (err) => {
    const message = err.error instanceof Error ? err.error.message : String(err.error);
    logger.error('Unhandled bot error', { error: message });

    // Reply to the user with a friendly message so they are not left hanging
    try {
      await err.ctx.reply(
        'Произошла ошибка при обработке запроса. Попробуйте ещё раз или напишите /start.',
      );
    } catch {
      // ignore send failures
    }
  });

  // ── Cron jobs ──────────────────────────────────────────────────────────────
  new CheckerCron(bot, adminNotif).start();
  new SubscriptionCron(bot, adminNotif).start();
  new DailyResetCron(bot, adminNotif).start();
  new QueueFlushCron(bot, adminNotif).start();

  // ── Start polling ──────────────────────────────────────────────────────────
  // drop_pending_updates: true — при старте сбрасывает очередь апдейтов и
  // перехватывает сессию у любого другого запущенного экземпляра (локального
  // на компе или старого серверного). После этого только этот процесс
  // получает сообщения.
  await bot.start({
    drop_pending_updates: true,
    onStart: (info) => { logger.info(`Bot @${info.username} started`); },
  });
}

main().catch((err) => {
  logger.error('Fatal startup error', { err });
  process.exit(1);
});
