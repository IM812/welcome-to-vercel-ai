import type { Bot } from 'grammy';
import type { BotContext } from '../types/index';
import type { User } from '../generated/prisma/index';
import { UserService } from '../services/user.service';
import { settingsKeyboard } from '../keyboards/main.keyboard';

function getDbUser(ctx: BotContext): User {
  return (ctx as BotContext & { dbUser: User }).dbUser;
}

export function registerSettingsController(
  bot: Bot<BotContext>,
  userService: UserService,
): void {
  async function showSettings(ctx: BotContext): Promise<void> {
    const user = getDbUser(ctx);
    const settings = await userService.getSettings(user.id);

    const text = [
      'Настройки уведомлений',
      '',
      `Звук: ${settings.silentMode ? 'выкл' : 'вкл'}`,
      `Фото: ${settings.photoMode ? 'вкл' : 'выкл'}`,
      `Дайджест: ${settings.digestMode ? 'вкл (раз в день)' : 'выкл'}`,
      `Рабочие часы: ${settings.workingHoursEnabled ? `${settings.workingHoursFrom}:00–${settings.workingHoursTo}:00` : 'выкл'}`,
      `Часовой пояс: ${settings.timezone}`,
    ].join('\n');

    const keyboard = settingsKeyboard(settings);

    if (ctx.callbackQuery) {
      await ctx.editMessageText(text, { reply_markup: keyboard });
      await ctx.answerCallbackQuery();
    } else {
      await ctx.reply(text, { reply_markup: keyboard });
    }
  }

  bot.hears('Настройки', async (ctx) => showSettings(ctx));
  bot.callbackQuery('settings', async (ctx) => showSettings(ctx));

  // Toggle boolean settings
  for (const field of ['silentMode', 'photoMode', 'digestMode', 'workingHoursEnabled'] as const) {
    bot.callbackQuery(`toggle:${field}`, async (ctx) => {
      const user = getDbUser(ctx);
      const settings = await userService.getSettings(user.id);
      await userService.updateSettings(user.id, { [field]: !settings[field] });
      await showSettings(ctx);
    });
  }

  // Set working hours — step 1
  bot.callbackQuery('set_working_hours', async (ctx) => {
    ctx.session.step = 'awaiting_working_hours';
    await ctx.answerCallbackQuery();
    await ctx.reply(
      'Введите рабочие часы в формате "9 22" (с 9:00 до 22:00 по вашему времени):',
    );
  });

  // Set timezone — step 1
  bot.callbackQuery('set_timezone', async (ctx) => {
    ctx.session.step = 'awaiting_timezone';
    await ctx.answerCallbackQuery();
    await ctx.reply(
      'Введите часовой пояс в формате IANA, например: Europe/Moscow, Asia/Novosibirsk',
    );
  });

  // Text step handler for settings
  bot.on('message:text', async (ctx, next) => {
    const step = ctx.session.step;

    if (step === 'awaiting_working_hours') {
      ctx.session.step = undefined;
      const parts = ctx.message.text.trim().split(/\s+/);
      const from = parseInt(parts[0]);
      const to = parseInt(parts[1]);
      if (isNaN(from) || isNaN(to) || from < 0 || to > 24 || from >= to) {
        await ctx.reply('Неверный формат. Попробуйте снова: "9 22"');
        return;
      }
      const user = getDbUser(ctx);
      await userService.updateSettings(user.id, {
        workingHoursEnabled: true,
        workingHoursFrom: from,
        workingHoursTo: to,
      });
      await ctx.reply(`Рабочие часы установлены: ${from}:00–${to}:00`);
      return;
    }

    if (step === 'awaiting_timezone') {
      ctx.session.step = undefined;
      const tz = ctx.message.text.trim();
      const user = getDbUser(ctx);
      await userService.updateSettings(user.id, { timezone: tz });
      await ctx.reply(`Часовой пояс установлен: ${tz}`);
      return;
    }

    return next();
  });
}
