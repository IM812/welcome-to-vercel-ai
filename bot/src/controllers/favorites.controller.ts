import type { Bot } from 'grammy';
import { InlineKeyboard } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { ListingRepository } from '../repositories/listing.repository';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerFavoritesController(
  bot: Bot<BotContext>,
  favoriteRepo: FavoriteRepository,
  listingRepo: ListingRepository,
): void {
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
