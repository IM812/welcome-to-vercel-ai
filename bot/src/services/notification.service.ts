import type { Bot } from 'grammy';
import type { InlineKeyboardButton } from 'grammy/types';
import type { BotContext } from '../types/index';
import type { Listing, Search, User, UserSettings } from '../generated/prisma/index';
import { NotificationRepository } from '../repositories/notification.repository';
import { UserRepository } from '../repositories/user.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { SubscriptionService } from './subscription.service';
import { logger } from '../utils/logger';

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

    // Hard guards — SearchService already applied the baseline-cutoff rule,
    // so here we only protect against baseline records and double-sends.
    if ((listing as Listing & { isBaseline: boolean }).isBaseline) return false;
    if ((listing as Listing & { notifiedAt: Date | null }).notifiedAt) return false;

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

  /**
   * Price-drop alert for a listing the user already received. Bypasses the
   * notifiedAt / duplicate-notification guards on purpose (it is a repeat
   * message about the same listing), but still respects daily limits and
   * working hours.
   */
  async sendPriceDropNotification(
    user: User,
    search: Search,
    listing: Listing,
    oldPrice: string,
    newPrice: string,
    settings: UserSettings | null,
  ): Promise<boolean> {
    if (!this.bot) return false;
    if (!this.subService.canSendNotification(user)) return false;
    if (!this.subService.isWithinWorkingHours(settings)) return false;

    try {
      const lines: string[] = [];
      lines.push(`📉 <b>Цена снижена!</b>`);
      lines.push('');
      lines.push(`<b>${this.esc(listing.title)}</b>`);
      lines.push('');
      lines.push(`Было: <s>${this.esc(oldPrice)}</s>`);
      lines.push(`Стало: <b>${this.esc(newPrice)}</b>`);
      if (listing.location) lines.push(`\n📍 ${this.esc(listing.location)}`);
      if (search.name) lines.push(`🔍 Поиск: <i>${this.esc(search.name)}</i>`);

      const caption = lines.join('\n');
      const keyboard = this.buildKeyboard(listing, search);
      const chatId = Number(user.telegramId);

      let sent = false;
      if (listing.imageUrl) {
        try {
          await this.bot.api.sendPhoto(chatId, listing.imageUrl, {
            caption,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: keyboard },
          });
          sent = true;
        } catch { /* fall through to text */ }
      }

      if (!sent) {
        await this.bot.api.sendMessage(chatId, `${caption}\n\n<a href="${listing.url}">Смотреть объявление</a>`, {
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: keyboard },
          link_preview_options: { is_disabled: false, prefer_large_media: true, show_above_text: true, url: listing.url },
        });
      }

      await this.userRepo.incrementDailyNotification(user.id);
      return true;
    } catch (err) {
      logger.error(`Failed to send price-drop notification to user ${user.id}`, err);
      return false;
    }
  }

  /**
   * Build the listing card caption (competitor-style format):
   *   🏷 : <title>
   *   💵 Цена: <price>
   *   🔗 Ссылка: <url>
   *   👤 <seller> | 📍 <location>
   */
  private buildCaption(listing: Listing, search: Search): string {
    const lines: string[] = [];

    lines.push(`🏷 : <b>${this.esc(listing.title)}</b>`);
    if (listing.price) {
      lines.push(`💵 Цена: <b>${this.esc(listing.price)}</b>`);
    }
    lines.push(`🔗 Ссылка: ${listing.url}`);

    // Seller line — competitor shows "👤 Name | Компания | На Авито с 2017".
    // We show what we scraped from the card (name); location complements it.
    const withSeller = listing as Listing & { sellerName?: string | null };
    const sellerParts: string[] = [];
    if (withSeller.sellerName) sellerParts.push(this.esc(withSeller.sellerName));
    if (listing.location) sellerParts.push(`📍 ${this.esc(listing.location)}`);
    if (sellerParts.length > 0) {
      lines.push('');
      lines.push(`👤 ${sellerParts.join(' | ')}`);
    }

    if (search.name) {
      lines.push('');
      lines.push(`🔍 <i>${this.esc(search.name)}</i>`);
    }

    return lines.join('\n');
  }

  /** Inline keyboard: full-width action buttons, competitor style. */
  private buildKeyboard(listing: Listing, search: Search): InlineKeyboardButton[][] {
    const rows: InlineKeyboardButton[][] = [
      [{ text: '💛 Добавить в избранное', callback_data: `fav:${listing.id}` }],
    ];

    // Seller blocking — only when the listing has seller info.
    const withSeller = listing as Listing & { sellerName?: string | null; sellerUrl?: string | null };
    if (withSeller.sellerUrl || withSeller.sellerName) {
      rows.push([{ text: '🙅‍♂️ Заблокировать продавца', callback_data: `block_seller:${listing.id}` }]);
    }

    rows.push([
      { text: 'Пауза', callback_data: `pause_search:${search.id}` },
      { text: 'Удалить поиск', callback_data: `del_search:${search.id}` },
    ]);
    return rows;
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
