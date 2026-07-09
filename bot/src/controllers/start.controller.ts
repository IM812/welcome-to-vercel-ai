import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import { mainMenuKeyboard } from '../keyboards/main.keyboard';

export function registerStartController(bot: Bot<BotContext>): void {
  // Global "back to main menu" callback used by settings, subscription, etc.
  bot.callbackQuery('back_to_main', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('Главное меню', { reply_markup: mainMenuKeyboard() });
  });

  bot.command('start', async (ctx) => {
    const onboarding = [
      'Добро пожаловать в SearchBot!',
      '',
      'Как пользоваться:',
      '1. Нажмите "Добавить поиск"',
      '2. Откройте avito.ru, настройте фильтры и скопируйте ссылку',
      '3. Вставьте ссылку в бот',
      '4. Получайте уведомления о новых объявлениях в реальном времени',
      '',
      'Проверка идёт каждые 30 секунд. Как только появится новое объявление — сразу придёт уведомление.',
    ].join('\n');

    await ctx.reply(onboarding, { reply_markup: mainMenuKeyboard() });
  });

  bot.hears('Помощь', async (ctx) => {
    await ctx.reply(
      'SearchBot — мониторинг объявлений Avito.\n\n' +
        '/start — главное меню\n' +
        '/promo КОД — активировать промокод\n\n' +
        'По вопросам и поддержке нажмите кнопку "Поддержка" в меню.',
    );
  });
}
