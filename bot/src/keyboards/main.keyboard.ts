import { InlineKeyboard, Keyboard } from 'grammy';
import type { Plan, Search } from '../generated/prisma/index';
import { PLAN_PRICES, SEARCH_STATUS_LABELS } from '../types/index';

export function mainMenuKeyboard(): Keyboard {
  return new Keyboard()
    .text('Добавить поиск').text('Мои поиски').row()
    .text('Подписка').text('Профиль').row()
    .text('Настройки').text('Помощь')
    .resized()
    .persistent();
}

export function platformKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Avito', 'platform:AVITO');
}

export function cancelAddKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text('Отмена', 'cancel_add');
}

export function subscriptionKeyboard(currentPlan: Plan): InlineKeyboard {
  const kb = new InlineKeyboard();
  if (currentPlan !== 'START') {
    kb.text(`Start — ${PLAN_PRICES.START} Stars / 30 дней`, 'buy:START').row();
  }
  if (currentPlan !== 'PRO') {
    kb.text(`Pro — ${PLAN_PRICES.PRO} Stars / 30 дней`, 'buy:PRO').row();
  }
  if (currentPlan !== 'UNLIMITED') {
    kb.text(`Unlimited — ${PLAN_PRICES.UNLIMITED} Stars / 30 дней`, 'buy:UNLIMITED').row();
  }
  kb.text('Промокод /promo CODE', 'promo_hint');
  return kb;
}

export function searchListKeyboard(searches: Search[]): InlineKeyboard {
  const kb = new InlineKeyboard();
  for (const s of searches) {
    const statusLabel = SEARCH_STATUS_LABELS[s.status];
    const name = s.name ?? s.platform;
    kb.text(`${name} [${statusLabel}]`, `search:${s.id}`).row();
  }
  return kb;
}

export function searchActionKeyboard(search: Search): InlineKeyboard {
  const kb = new InlineKeyboard();
  if (search.isActive) {
    kb.text('Пауза', `pause_search:${search.id}`);
  } else {
    kb.text('Включить', `resume_search:${search.id}`);
  }
  kb.text('Переименовать', `rename_search:${search.id}`).row();
  kb.text('История', `history:${search.id}`).text('Удалить', `del_search:${search.id}`).row();
  kb.text('Сбросить старые объявления', `reset_baseline:${search.id}`).row();
  kb.text('Назад', 'my_searches');
  return kb;
}

export function settingsKeyboard(settings: {
  silentMode: boolean;
  photoMode: boolean;
  digestMode: boolean;
  workingHoursEnabled: boolean;
}): InlineKeyboard {
  return new InlineKeyboard()
    .text(
      `Звук: ${settings.silentMode ? 'выкл' : 'вкл'}`,
      'toggle:silentMode',
    )
    .text(
      `Фото: ${settings.photoMode ? 'вкл' : 'выкл'}`,
      'toggle:photoMode',
    )
    .row()
    .text(
      `Дайджест: ${settings.digestMode ? 'вкл' : 'выкл'}`,
      'toggle:digestMode',
    )
    .text(
      `Раб. часы: ${settings.workingHoursEnabled ? 'вкл' : 'выкл'}`,
      'toggle:workingHoursEnabled',
    )
    .row()
    .text('Установить часы', 'set_working_hours')
    .text('Часовой пояс', 'set_timezone')
    .row()
    .text('Назад', 'back_to_main');
}

export function favoriteKeyboard(listingId: number): InlineKeyboard {
  return new InlineKeyboard().text('В избранное', `fav:${listingId}`);
}

export function adminMenuKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Пользователи', 'admin:users').text('Платежи', 'admin:payments').row()
    .text('Статистика', 'admin:stats').text('Логи', 'admin:logs').row()
    .text('Рассылка', 'admin:broadcast_hint')
    .text('Настройки', 'admin:settings');
}

export function userActionKeyboard(userId: number): InlineKeyboard {
  return new InlineKeyboard()
    .text('Забанить', `admin_ban:${userId}`).text('Разбанить', `admin_unban:${userId}`).row()
    .text('Выдать Pro 30д', `admin_give:${userId}:PRO:30`)
    .text('Выдать Unlimited 30д', `admin_give:${userId}:UNLIMITED:30`).row()
    .text('Сбросить лимиты', `admin_reset:${userId}`)
    .text('Написать', `admin_msg:${userId}`);
}

export function confirmKeyboard(action: string, id: number): InlineKeyboard {
  return new InlineKeyboard()
    .text('Подтвердить', `confirm:${action}:${id}`)
    .text('Отмена', 'cancel');
}
