import type { Plan, Platform, SearchStatus } from '../generated/prisma/index';
import type { Context, SessionFlavor } from 'grammy';

export interface SessionData {
  step?: string;
  selectedPlatform?: Platform;
  pendingSearchUrl?: string;
  pendingSearchName?: string;
  adminAuthed?: boolean;
}

export type BotContext = Context & SessionFlavor<SessionData>;

export interface ParsedListing {
  externalId: string;
  title: string;
  price?: string;
  location?: string;
  imageUrl?: string;
  url: string;
  /** Raw date string exactly as scraped from the page (e.g. "3 минуты назад"). */
  rawPublishedAt?: string;
  /** Pre-parsed Date, if the parser already converted it. */
  publishedAt?: Date;
}

export interface PlanLimits {
  maxSearches: number | null;
  maxPlatforms: number | null;
  maxDailyNotifications: number | null;
  checkIntervalMinutes: number;
  photosEnabled: boolean;
  historyLimit: number | null;
  favoritesLimit: number | null;
  priorityQueue: boolean;
  allPlatforms: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  FREE: {
    maxSearches: 1,
    maxPlatforms: 1,
    maxDailyNotifications: 5,
    checkIntervalMinutes: 1,   // checked every 30s loop tick
    photosEnabled: true,
    historyLimit: 0,
    favoritesLimit: 0,
    priorityQueue: false,
    allPlatforms: false,
  },
  START: {
    maxSearches: 5,
    maxPlatforms: 2,
    maxDailyNotifications: 50,
    checkIntervalMinutes: 1,
    photosEnabled: true,
    historyLimit: 20,
    favoritesLimit: 20,
    priorityQueue: false,
    allPlatforms: false,
  },
  PRO: {
    maxSearches: 30,
    maxPlatforms: null,
    maxDailyNotifications: 300,
    checkIntervalMinutes: 1,
    photosEnabled: true,
    historyLimit: 200,
    favoritesLimit: 100,
    priorityQueue: true,
    allPlatforms: true,
  },
  UNLIMITED: {
    maxSearches: null,
    maxPlatforms: null,
    maxDailyNotifications: null,
    checkIntervalMinutes: 1,
    photosEnabled: true,
    historyLimit: null,
    favoritesLimit: null,
    priorityQueue: true,
    allPlatforms: true,
  },
};

export const PLAN_PRICES: Record<Exclude<Plan, 'FREE'>, number> = {
  START: 150,
  PRO: 300,
  UNLIMITED: 700,
};

export const PLAN_NAMES: Record<Plan, string> = {
  FREE: 'Free',
  START: 'Start',
  PRO: 'Pro',
  UNLIMITED: 'Unlimited',
};

export const PLATFORM_NAMES: Record<Platform, string> = {
  AVITO: 'Avito',
  CIAN: 'Cian',
  YOULA: 'Youla',
  AUTORU: 'Auto.ru',
};

export const PLATFORM_DOMAINS: Record<Platform, string> = {
  AVITO: 'avito.ru',
  CIAN: 'cian.ru',
  YOULA: 'youla.ru',
  AUTORU: 'auto.ru',
};

export const SEARCH_STATUS_LABELS: Record<SearchStatus, string> = {
  ACTIVE: 'Активен',
  PAUSED: 'Пауза',
  ERROR: 'Ошибка',
  LIMITED: 'Лимит',
};
