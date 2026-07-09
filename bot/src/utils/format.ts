import type { Plan, User } from '../generated/prisma/index';
import { PLAN_NAMES } from '../types/index';

export function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return 'не указано';
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
  });
}

export function formatPlanExpiry(user: User): string {
  if (user.plan === 'FREE') return 'бессрочно';
  if (!user.subscriptionUntil) return 'не активна';
  const now = new Date();
  if (user.subscriptionUntil < now) return 'истекла';
  const days = Math.ceil(
    (user.subscriptionUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return `до ${formatDate(user.subscriptionUntil)} (${days} дн.)`;
}

export function formatUserMention(user: User): string {
  if (user.username) return `@${user.username}`;
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ');
  return name || `ID:${user.telegramId}`;
}

export function formatPlanLabel(plan: Plan): string {
  return PLAN_NAMES[plan];
}

export function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} ${many}`;
  if (mod10 === 1) return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} ${few}`;
  return `${n} ${many}`;
}
