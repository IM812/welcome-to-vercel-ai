import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import type { BotContext } from '../types/index';
import type { User, Listing } from '../generated/prisma/index';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { ListingRepository } from '../repositories/listing.repository';
import { BlockedSellerRepository } from '../repositories/blocked-seller.repository';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerFavoritesController(
  bot: Bot<BotContext>,
  favoriteRepo: FavoriteRepository,
  listingRepo: ListingRepository,
): void {
  const blockedSellerRepo = new BlockedSellerRepository();

  // Block a seller from a notification card: block_seller:<listingId>
  bot.callbackQuery(/^block_seller:(\d+)$/, async (ctx) => {
    const user = getDbUser(ctx);
    const listingId = parseInt(ctx.match[1]);

    const listing = await listingRepo.findById(listingId);
    if (!listing) {
      await ctx.answerCallbackQuery({ text: 'Объявление не найдено.' });
      return;
    }

    const withSeller = listing as Listing & { sellerName?: string | null; sellerUrl?: string | null };
    const sellerKey = withSeller.sellerUrl ?? withSeller.sellerName;
    if (!sellerKey) {
      await ctx.answerCallbackQuery({ text: 'Продавец не определён для этого объявления.' });
      return;
    }

    await blockedSellerRepo.block(user.id, sellerKey, withSeller.sellerName ?? null);
    await ctx.answerCallbackQuery({
      text: `Продавец ${withSeller.sellerName ?? ''} скрыт. Новые объявления от него приходить не будут.`.trim(),
    });
  });

  // Unblock from the /blocked list: unblock_seller:<blockedSellerId>
  bot.callbackQuery(/^unblock_seller:(\d+)$/, async (ctx) => {
    const user = getDbUser(ctx);
    const blockedId = parseInt(ctx.match[1]);

    const all = await blockedSellerRepo.findByUser(user.id);
    const target = all.find((b) => b.id === blockedId);
    if (!target) {
      await ctx.answerCallbackQuery({ text: 'Запись не найдена.' });
      return;
    }

    await blockedSellerRepo.unblock(user.id, target.sellerKey);
    await ctx.answerCallbackQuery({ text: 'Продавец разблокирован.' });

    // Refresh the list in-place.
    const remaining = await blockedSellerRepo.findByUser(user.id);
    if (remaining.length === 0) {
      await ctx.editMessageText('Список заблокированных продавцов пуст.');
      return;
    }
    const kb = new InlineKeyboard();
    for (const b of remaining.slice(0, 20)) {
      kb.text(`Разблокировать: ${b.sellerName ?? b.sellerKey}`.slice(0, 60), `unblock_seller:${b.id}`).row();
    }
    await ctx.editMessageText(
      `<b>Заблокированные продавцы (${remaining.length})</b>\n\nОбъявления от них не присылаются.`,
      { parse_mode: 'HTML', reply_markup: kb },
    );
  });

  bot.command('blocked', async (ctx) => {
    const user = getDbUser(ctx);
    const blocked = await blockedSellerRepo.findByUser(user.id);

    if (blocked.length === 0) {
      await ctx.reply(
        'Список заблокированных продавцов пуст.\n\nСкрывайте продавцов кнопкой «Скрыть продавца» в уведомлениях.',
      );
      return;
    }

    const kb = new InlineKeyboard();
    for (const b of blocked.slice(0, 20)) {
      kb.text(`Разблокировать: ${b.sellerName ?? b.sellerKey}`.slice(0, 60), `unblock_seller:${b.id}`).row();
    }
    await ctx.reply(
      `<b>Заблокированные продавцы (${blocked.length})</b>\n\nОбъявления от них не присылаются.`,
      { parse_mode: 'HTML', reply_markup: kb },
    );
  });

  bot.command('favorites', async (ctx) => {
    const user = getDbUser(ctx);
    const favorites = await favoriteRepo.findByUser(user.id);

    if (favorites.length === 0) {
      await ctx.reply(
        'У вас нет избранных объявлений.\n\nДобавляйте объявления в избранное кнопкой в уведомлениях.',
      );
      return;
    }

    const lines = favorites.slice(0, 10).map((f, i) => {
      const priceStr = f.listing.price ? ` — ${f.listing.price}` : '';
      return `${i + 1}. <a href="${f.listing.url}">${f.listing.title}</a>${priceStr}`;
    });

    const text = `<b>Избранное (${favorites.length})</b>\n\n${lines.join('\n\n')}`;

    const keyboard = new InlineKeyboard().text('Очистить избранное', 'clear_favorites');
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: keyboard,
      link_preview_options: { is_disabled: true },
    });
  });

  bot.callbackQuery('clear_favorites', async (ctx) => {
    await ctx.answerCallbackQuery();
    const user = getDbUser(ctx);
    await favoriteRepo.clearByUser(user.id);
    await ctx.editMessageText('Избранное очищено.');
  });

  // Add to favorites from notification callback: fav_<listingId>
  bot.callbackQuery(/^fav:(\d+)$/, async (ctx) => {
    const user = getDbUser(ctx);
    const listingId = parseInt(ctx.match[1]);

    const listing = await listingRepo.findById(listingId);
    if (!listing) {
      await ctx.answerCallbackQuery({ text: 'Объявление не найдено.' });
      return;
    }

    const existing = await favoriteRepo.findByUserId(user.id);
    const alreadySaved = existing.some((f) => f.listingId === listingId);
    if (alreadySaved) {
      await ctx.answerCallbackQuery({ text: 'Уже в избранном.' });
      return;
    }

    await favoriteRepo.add(user.id, listingId);
    await ctx.answerCallbackQuery({ text: 'Добавлено в избранное!' });
  });
}
