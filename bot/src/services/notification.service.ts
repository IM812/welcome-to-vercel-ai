import type { Bot } from 'grammy';
import type { InlineKeyboardButton } from 'grammy/types';
import type { BotContext } from '../types/index';
import type { Listing, Search, User, UserSettings } from '../generated/prisma/index';
import { NotificationRepository } from '../repositories/notification.repository';
import { UserRepository } from '../repositories/user.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { SubscriptionService } from './subscription.service';
import { isFreshListing } from '../utils/dateParser';
import { logger } from '../utils/logger';

const FRESH_MAX_MINUTES = Number(process.env.FRESH_LISTING_MAX_AGE_MINUTES ?? 5);

export class NotificationService {
  private notifRepo: NotificationRepository;
  private userRepo: UserRepository;
  private adminLogRepo: AdminLogRepository;
  private subService: SubscriptionService;
  private bot: Bot<BotContext> | null = null;

  constructor(
    notifRepo?: NotificationRepository,
    userRepo?: UserRepository,
    adminLogRepo?: AdminLogRepository,
    subService?: SubscriptionService,
  ) {
    this.notifRepo = notifRepo ?? new NotificationRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
    this.subService = subService ?? new SubscriptionService();
  }

  setBot(bot: Bot<BotContext>): void {
    this.bot = bot;
  }

  async sendListingNotification(
    user: User,
    search: Search,
    listing: Listing,
    settings: UserSettings | null,
  ): Promise<boolean> {
    if (!this.bot) throw new Error('Bot not initialized');

    // Hard guards — checked in this exact order, every condition must pass
    if ((listing as Listing & { isBaseline: boolean }).isBaseline) return false;
    if ((listing as Listing & { notifiedAt: Date | null }).notifiedAt) return false;
    if (!listing.publishedAt) {
      logger.debug(`[notification-skip] listingId=${listing.id} reason=no_publishedAt`);
      return false;
    }
    if (!isFreshListing(listing.publishedAt, FRESH_MAX_MINUTES)) {
      logger.debug(`[notification-skip] listingId=${listing.id} reason=stale publishedAt=${listing.publishedAt.toISOString()}`);
      return false;
    }

    // Guard against duplicate Notification rows for the same listing+user
    const existingNotif = await this.notifRepo.findByListingAndUser(listing.id, user.id);
    if (existingNotif && existingNotif.status === 'SENT') return false;

    const canSend = this.subService.canSendNotification(user);
    const withinHours = this.subService.isWithinWorkingHours(settings);

    if (!canSend || !withinHours || (settings?.digestMode ?? false)) {
      const notif = await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: 'QUEUED',
      });

      if (!canSend) {
        await this.notifRepo.updateStatus(notif.id, 'SKIPPED');

        // Send "limit reached" message at most once per calendar day
        const now = new Date();
        const lastNotified = user.limitNotifiedAt;
        const alreadyNotifiedToday =
          lastNotified && lastNotified.toDateString() === now.toDateString();

        if (!alreadyNotifiedToday) {
          try {
            await this.bot.api.sendMessage(
              Number(user.telegramId),
              'Дневной лимит уведомлений исчерпан.\nОбновите тариф чтобы не пропускать объявления.',
            );
            await this.userRepo.updateLimitNotifiedAt(user.id, now);
            await this.adminLogRepo.log('FREE_LIMIT_REACHED', undefined, user.id);
          } catch { /* ignore */ }
        }
      }
      return false;
    }

    try {
      const caption = this.buildCaption(listing, search);
      const keyboard = this.buildKeyboard(listing, search);
      const chatId = Number(user.telegramId);

      // Always try to send with photo — Avito listings reliably have images.
      // Fall back to text-only if the image URL is missing or Telegram rejects it.
      let sent = false;

      if (listing.imageUrl) {
        try {
          await this.bot.api.sendPhoto(chatId, listing.imageUrl, {
            caption,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: keyboard },
          });
          sent = true;
        } catch {
          // image send failed — fall through to text
        }
      }

      if (!sent) {
        // Append a placeholder "photo" line so the message still looks rich
        const textWithLink = `${caption}\n\n<a href="${listing.url}">Смотреть объявление</a>`;
        await this.bot.api.sendMessage(chatId, textWithLink, {
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: keyboard },
          link_preview_options: { is_disabled: false, prefer_large_media: true, show_above_text: true, url: listing.url },
        });
      }

      await this.userRepo.incrementDailyNotification(user.id);

      await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: 'SENT',
        sentAt: new Date(),
      });
      return true;
    } catch (err) {
      logger.error(`Failed to send notification to user ${user.id}`, err);
      const notif = await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: 'FAILED',
      });
      await this.notifRepo.markFailed(notif.id, String(err));
      return false;
    }
  }

  /** Build a rich HTML caption for the listing card. */
  private buildCaption(listing: Listing, search: Search): string {
    const lines: string[] = [];

    // Title — bold and prominent
    lines.push(`<b>${this.esc(listing.title)}</b>`);

    // Price — highlighted
    if (listing.price) {
      lines.push(`\n<b>${this.esc(listing.price)}</b>`);
    }

    lines.push('');

    // Location
    if (listing.location) {
      lines.push(`📍 ${this.esc(listing.location)}`);
    }

    // Published date — always show something so user knows when it appeared
    const dateStr = listing.publishedAt
      ? listing.publishedAt.toLocaleString('ru-RU', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'только что';
    lines.push(`Опубликовано: ${this.esc(dateStr)}`);

    // Search label
    if (search.name) {
      lines.push(`\n🔍 Поиск: <i>${this.esc(search.name)}</i>`);
    }

    // Platform badge
    lines.push(`\n<code>Avito</code>`);

    return lines.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
  }

  /** Inline keyboard with action buttons. */
  private buildKeyboard(listing: Listing, search: Search): InlineKeyboardButton[][] {
    const open: InlineKeyboardButton = { text: 'Открыть на Avito', url: listing.url };
    const fav: InlineKeyboardButton = { text: 'В избранное', callback_data: `fav:${listing.id}` };
    const pause: InlineKeyboardButton = { text: 'Пауза', callback_data: `pause_search:${search.id}` };
    const del: InlineKeyboardButton = { text: 'Удалить', callback_data: `del_search:${search.id}` };
    return [[open], [fav, pause, del]];
  }

  /** Escape HTML special characters. */
  private esc(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  async flushQueue(
    user: User,
    settings: UserSettings | null,
  ): Promise<void> {
    if (!this.bot) return;
    const queued = await this.notifRepo.findQueued(user.id);
    for (const notif of queued) {
      const canSend = this.subService.canSendNotification(user);
      const withinHours = this.subService.isWithinWorkingHours(settings);
      if (!canSend || !withinHours) break;

      const full = notif as typeof notif & { listing: Listing; search: Search };
      await this.sendListingNotification(user, full.search, full.listing, settings);
    }
  }

  async countSentToday(): Promise<number> {
    return this.notifRepo.countSentToday();
  }
}
