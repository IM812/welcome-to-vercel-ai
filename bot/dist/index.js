"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_config6 = require("dotenv/config");
var import_grammy3 = require("grammy");

// src/config/index.ts
var import_config = require("dotenv/config");
function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}
function optionalEnv(key, fallback = "") {
  return process.env[key] ?? fallback;
}
var BOT_TOKEN = requireEnv("BOT_TOKEN");
var ADMIN_TELEGRAM_ID = requireEnv("ADMIN_TELEGRAM_ID");
var config = {
  // Flat aliases used by controllers / services
  BOT_TOKEN,
  BOT_USERNAME: optionalEnv("BOT_USERNAME", "searchbot"),
  ADMIN_IDS: ADMIN_TELEGRAM_ID.split(",").map((id) => BigInt(id.trim())),
  // Nested form used by legacy service stubs
  bot: {
    token: BOT_TOKEN
  },
  admin: {
    telegramId: BigInt(ADMIN_TELEGRAM_ID.split(",")[0].trim())
  },
  env: process.env["NODE_ENV"] ?? "development",
  logLevel: process.env["LOG_LEVEL"] ?? "info"
};

// src/utils/logger.ts
var import_winston = __toESM(require("winston"));
var { combine, timestamp, colorize, printf, errors } = import_winston.default.format;
var logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return `${String(ts)} [${level}]: ${stack ? String(stack) : String(message)}`;
});
var logger = import_winston.default.createLogger({
  level: config.logLevel,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    config.env === "development" ? colorize() : import_winston.default.format.uncolorize(),
    logFormat
  ),
  transports: [
    new import_winston.default.transports.Console(),
    new import_winston.default.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5
    }),
    new import_winston.default.transports.File({
      filename: "logs/combined.log",
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10
    })
  ]
});

// src/database/client.ts
var import_adapter_pg = require("@prisma/adapter-pg");
var import_prisma = require("../generated/prisma");
function createClient() {
  const connectionString = process.env["DATABASE_URL"];
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const adapter = new import_adapter_pg.PrismaPg({ connectionString });
  return new import_prisma.PrismaClient({ adapter });
}
var prisma = global.__prisma ?? createClient();
if (process.env["NODE_ENV"] !== "production") {
  global.__prisma = prisma;
}
process.on("beforeExit", () => {
  void prisma.$disconnect();
});

// src/repositories/user.repository.ts
var UserRepository = class {
  async findByTelegramId(telegramId) {
    return prisma.user.findUnique({ where: { telegramId: BigInt(telegramId) } });
  }
  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
  async create(data) {
    return prisma.user.create({ data });
  }
  async update(id, data) {
    return prisma.user.update({ where: { id }, data });
  }
  async upsert(telegramId, data) {
    return prisma.user.upsert({
      where: { telegramId },
      create: data,
      update: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        lastActiveAt: /* @__PURE__ */ new Date()
      }
    });
  }
  async getSettings(userId) {
    return prisma.userSettings.findUnique({ where: { userId } });
  }
  async upsertSettings(userId, data) {
    return prisma.userSettings.upsert({
      where: { userId },
      create: {
        user: { connect: { id: userId } },
        ...data
      },
      update: data
    });
  }
  async countAll() {
    return prisma.user.count();
  }
  /** Alias */
  async count() {
    return prisma.user.count();
  }
  async countByPlan() {
    const results = await prisma.user.groupBy({
      by: ["plan"],
      _count: { _all: true }
    });
    const map = {};
    for (const r of results) {
      map[r.plan] = r._count._all;
    }
    return map;
  }
  async countNewToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.user.count({ where: { createdAt: { gte: start } } });
  }
  async countActiveToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.user.count({ where: { lastActiveAt: { gte: start } } });
  }
  async countPaid() {
    return prisma.user.count({ where: { plan: { not: "FREE" } } });
  }
  async countBanned() {
    return prisma.user.count({ where: { isBanned: true } });
  }
  async findAllActive() {
    return prisma.user.findMany({ where: { isBanned: false } });
  }
  async findExpiredSubscriptions() {
    return prisma.user.findMany({
      where: {
        plan: { not: "FREE" },
        subscriptionUntil: { lt: /* @__PURE__ */ new Date() }
      }
    });
  }
  async resetDailyNotifications() {
    await prisma.user.updateMany({
      data: {
        dailyNotificationCount: 0,
        dailyNotificationLimitResetAt: /* @__PURE__ */ new Date()
      }
    });
  }
  async incrementDailyNotification(id) {
    await prisma.user.update({
      where: { id },
      data: { dailyNotificationCount: { increment: 1 } }
    });
  }
  async setPlan(id, plan, days) {
    const now = /* @__PURE__ */ new Date();
    let subscriptionUntil = null;
    if (plan !== "FREE") {
      const base = /* @__PURE__ */ new Date();
      base.setDate(base.getDate() + days);
      subscriptionUntil = base;
    }
    return prisma.user.update({
      where: { id },
      data: { plan, subscriptionUntil, updatedAt: now }
    });
  }
  async findWithExpiredTrials() {
    return prisma.user.findMany({
      where: {
        plan: "START",
        trialEndsAt: { lt: /* @__PURE__ */ new Date() },
        trialUsed: true,
        subscriptionUntil: null
      }
    });
  }
  async findAll() {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }
};

// src/repositories/search.repository.ts
var SearchRepository = class {
  async create(data) {
    return prisma.search.create({ data });
  }
  async findById(id) {
    return prisma.search.findUnique({ where: { id } });
  }
  async findByUserId(userId) {
    return prisma.search.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }
  async findActiveByUserId(userId) {
    return prisma.search.findMany({
      where: { userId, isActive: true, status: "ACTIVE" },
      orderBy: { createdAt: "desc" }
    });
  }
  async countActiveByUserId(userId) {
    return prisma.search.count({ where: { userId, isActive: true } });
  }
  async update(id, data) {
    return prisma.search.update({ where: { id }, data });
  }
  async delete(id) {
    await prisma.search.delete({ where: { id } });
  }
  async setStatus(id, status) {
    return prisma.search.update({ where: { id }, data: { status } });
  }
  async setActive(id, isActive) {
    const status = isActive ? "ACTIVE" : "PAUSED";
    return prisma.search.update({ where: { id }, data: { isActive, status } });
  }
  async incrementError(id, error) {
    return prisma.search.update({
      where: { id },
      data: {
        errorCount: { increment: 1 },
        lastError: error,
        status: "ERROR"
      }
    });
  }
  async resetError(id) {
    return prisma.search.update({
      where: { id },
      data: { errorCount: 0, lastError: null, status: "ACTIVE" }
    });
  }
  async updateLastChecked(id) {
    await prisma.search.update({
      where: { id },
      data: { lastCheckedAt: /* @__PURE__ */ new Date() }
    });
  }
  async findAllActiveForCron() {
    return prisma.search.findMany({
      where: { isActive: true, status: { in: ["ACTIVE", "LIMITED"] } },
      include: { user: { include: { settings: true } } },
      orderBy: [
        {
          user: { plan: "desc" }
        },
        { lastCheckedAt: "asc" }
      ]
    });
  }
  async countActiveTotal() {
    return prisma.search.count({ where: { isActive: true } });
  }
  /** Alias used by admin stats */
  async countAll() {
    return prisma.search.count({ where: { isActive: true } });
  }
  async countByUser(userId) {
    return prisma.search.count({ where: { userId } });
  }
  /** Alias used by SearchService and StatsController */
  async findActiveByUser(userId) {
    return this.findActiveByUserId(userId);
  }
  async deactivateExcessForUser(userId, keepCount) {
    const searches = await prisma.search.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" }
    });
    const toDeactivate = searches.slice(keepCount);
    if (toDeactivate.length === 0) return;
    await prisma.search.updateMany({
      where: { id: { in: toDeactivate.map((s) => s.id) } },
      data: { isActive: false, status: "LIMITED" }
    });
  }
};

// src/repositories/listing.repository.ts
var ListingRepository = class {
  async create(data) {
    return prisma.listing.create({ data });
  }
  async findById(id) {
    return prisma.listing.findUnique({ where: { id } });
  }
  async findByExternalId(searchId, externalId) {
    return prisma.listing.findUnique({
      where: { searchId_externalId: { searchId, externalId } }
    });
  }
  async findBySearchId(searchId, limit) {
    return prisma.listing.findMany({
      where: { searchId },
      orderBy: { foundAt: "desc" },
      take: limit
    });
  }
  async countBySearchId(searchId) {
    return prisma.listing.count({ where: { searchId } });
  }
  async countFoundToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.listing.count({ where: { foundAt: { gte: start } } });
  }
  async upsert(searchId, externalId, data) {
    const existing = await this.findByExternalId(searchId, externalId);
    if (existing) return { listing: existing, isNew: false };
    const listing = await prisma.listing.create({
      data: {
        ...data,
        externalId,
        search: { connect: { id: searchId } }
      }
    });
    return { listing, isNew: true };
  }
  async findHistoryForUser(userId, limit, platform) {
    return prisma.listing.findMany({
      where: {
        search: { userId },
        ...platform ? { platform } : {}
      },
      orderBy: { foundAt: "desc" },
      take: limit,
      include: { search: true }
    });
  }
};

// src/repositories/notification.repository.ts
var NotificationRepository = class {
  async create(data) {
    return prisma.notification.create({ data });
  }
  async markSent(id) {
    await prisma.notification.update({
      where: { id },
      data: { status: "SENT", sentAt: /* @__PURE__ */ new Date() }
    });
  }
  async markFailed(id, reason) {
    await prisma.notification.update({
      where: { id },
      data: { status: "FAILED", reason }
    });
  }
  async findQueued(userId) {
    return prisma.notification.findMany({
      where: { userId, status: "QUEUED" },
      orderBy: { queuedAt: "asc" },
      include: { listing: true, search: true }
    });
  }
  async countSentToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.notification.count({
      where: { status: "SENT", sentAt: { gte: start } }
    });
  }
  async updateStatus(id, status) {
    await prisma.notification.update({ where: { id }, data: { status } });
  }
  async countTodayByUser(userId) {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.notification.count({
      where: { userId, status: "SENT", sentAt: { gte: start } }
    });
  }
  async countTotalByUser(userId) {
    return prisma.notification.count({ where: { userId, status: "SENT" } });
  }
};

// src/repositories/favorite.repository.ts
var FavoriteRepository = class {
  async add(userId, listingId) {
    return prisma.favorite.create({ data: { userId, listingId } });
  }
  async remove(userId, listingId) {
    await prisma.favorite.deleteMany({ where: { userId, listingId } });
  }
  async exists(userId, listingId) {
    const f = await prisma.favorite.findUnique({
      where: { userId_listingId: { userId, listingId } }
    });
    return !!f;
  }
  async findByUserId(userId) {
    return prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { listing: true }
    });
  }
  async countByUserId(userId) {
    return prisma.favorite.count({ where: { userId } });
  }
  /** Alias used by favorites controller */
  async findByUser(userId) {
    return this.findByUserId(userId);
  }
  async clearByUser(userId) {
    await prisma.favorite.deleteMany({ where: { userId } });
  }
};

// src/repositories/adminlog.repository.ts
var AdminLogRepository = class {
  async log(action, details, userId) {
    await prisma.adminLog.create({
      data: { action, details, userId }
    });
  }
  async findRecent(limit = 20) {
    return prisma.adminLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { user: true }
    });
  }
  async countErrorsToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.adminLog.count({
      where: { action: "PARSER_ERROR", createdAt: { gte: start } }
    });
  }
};

// src/services/user.service.ts
var UserService = class {
  userRepo;
  adminLogRepo;
  constructor(userRepo, adminLogRepo) {
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }
  async getOrCreate(telegramUser, referredByTelegramId) {
    const telegramId = BigInt(telegramUser.id);
    const existing = await this.userRepo.findByTelegramId(telegramId);
    if (existing) {
      await this.userRepo.update(existing.id, { lastActiveAt: /* @__PURE__ */ new Date() });
      return { user: existing, isNew: false };
    }
    let referredByUserId;
    if (referredByTelegramId) {
      const referrer = await this.userRepo.findByTelegramId(referredByTelegramId);
      if (referrer) referredByUserId = referrer.id;
    }
    const trialStart = /* @__PURE__ */ new Date();
    const trialEnd = new Date(trialStart.getTime() + 24 * 60 * 60 * 1e3);
    const user = await this.userRepo.create({
      telegramId,
      username: telegramUser.username ?? null,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name ?? null,
      plan: "START",
      subscriptionUntil: trialEnd,
      trialStartedAt: trialStart,
      trialEndsAt: trialEnd,
      trialUsed: true,
      ...referredByUserId !== void 0 ? { referredBy: { connect: { id: referredByUserId } } } : {}
    });
    await this.userRepo.upsertSettings(user.id, {});
    logger.info(`New user registered: ${telegramUser.id} (@${telegramUser.username ?? "none"})`);
    await this.adminLogRepo.log("NEW_USER", `TgID:${telegramUser.id}`, user.id);
    return { user, isNew: true };
  }
  async findByTelegramId(telegramId) {
    return this.userRepo.findByTelegramId(telegramId);
  }
  async findById(id) {
    return this.userRepo.findById(id);
  }
  async getSettings(userId) {
    const settings = await this.userRepo.getSettings(userId);
    if (settings) return settings;
    return this.userRepo.upsertSettings(userId, {});
  }
  async updateSettings(userId, data) {
    return this.userRepo.upsertSettings(userId, data);
  }
  async count() {
    return this.userRepo.countAll();
  }
  async countActiveToday() {
    return this.userRepo.countActiveToday();
  }
  async countByPlan() {
    const [total, newToday, activeToday, paid, banned] = await Promise.all([
      this.userRepo.countAll(),
      this.userRepo.countNewToday(),
      this.userRepo.countActiveToday(),
      this.userRepo.countPaid(),
      this.userRepo.countBanned()
    ]);
    return { total, newToday, activeToday, paid, banned };
  }
  async ban(userId, reason, adminId) {
    await this.userRepo.update(userId, { isBanned: true, banReason: reason });
    await this.adminLogRepo.log("BAN", `reason:${reason}`, userId);
    logger.info(`User ${userId} banned by admin ${adminId}: ${reason}`);
  }
  async unban(userId, adminId) {
    await this.userRepo.update(userId, { isBanned: false, banReason: null });
    await this.adminLogRepo.log("UNBAN", void 0, userId);
    logger.info(`User ${userId} unbanned by admin ${adminId}`);
  }
  /** Alias used by admin controller (takes string telegramId) */
  async banUser(telegramId) {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error("User not found");
    await this.ban(user.id, "admin action", 0);
  }
  async unbanUser(telegramId) {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error("User not found");
    await this.unban(user.id, 0);
  }
  async getStats() {
    const [total, newToday, activeToday, paid, banned] = await Promise.all([
      this.userRepo.countAll(),
      this.userRepo.countNewToday(),
      this.userRepo.countActiveToday(),
      this.userRepo.countPaid(),
      this.userRepo.countBanned()
    ]);
    return { total, newToday, activeToday, paid, banned };
  }
  async getAllActive() {
    return this.userRepo.findAllActive();
  }
  async getAll() {
    return this.userRepo.findAll();
  }
};

// src/types/index.ts
var PLAN_LIMITS = {
  FREE: {
    maxSearches: 1,
    maxPlatforms: 1,
    maxDailyNotifications: 5,
    checkIntervalMinutes: 30,
    photosEnabled: false,
    historyLimit: 0,
    favoritesLimit: 0,
    priorityQueue: false,
    allPlatforms: false
  },
  START: {
    maxSearches: 5,
    maxPlatforms: 2,
    maxDailyNotifications: 50,
    checkIntervalMinutes: 10,
    photosEnabled: true,
    historyLimit: 20,
    favoritesLimit: 20,
    priorityQueue: false,
    allPlatforms: false
  },
  PRO: {
    maxSearches: 30,
    maxPlatforms: null,
    maxDailyNotifications: 300,
    checkIntervalMinutes: 2,
    photosEnabled: true,
    historyLimit: 200,
    favoritesLimit: 100,
    priorityQueue: true,
    allPlatforms: true
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
    allPlatforms: true
  }
};
var PLAN_PRICES = {
  START: 150,
  PRO: 300,
  UNLIMITED: 700
};
var PLAN_NAMES = {
  FREE: "Free",
  START: "Start",
  PRO: "Pro",
  UNLIMITED: "Unlimited"
};
var PLATFORM_NAMES = {
  AVITO: "Avito",
  CIAN: "Cian",
  YOULA: "Youla",
  AUTORU: "Auto.ru"
};
var PLATFORM_DOMAINS = {
  AVITO: "avito.ru",
  CIAN: "cian.ru",
  YOULA: "youla.ru",
  AUTORU: "auto.ru"
};
var SEARCH_STATUS_LABELS = {
  ACTIVE: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D",
  PAUSED: "\u041F\u0430\u0443\u0437\u0430",
  ERROR: "\u041E\u0448\u0438\u0431\u043A\u0430",
  LIMITED: "\u041B\u0438\u043C\u0438\u0442"
};

// src/services/subscription.service.ts
var SubscriptionService = class {
  userRepo;
  searchRepo;
  adminLogRepo;
  constructor(userRepo, searchRepo, adminLogRepo) {
    this.userRepo = userRepo ?? new UserRepository();
    this.searchRepo = searchRepo ?? new SearchRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }
  isActive(user) {
    if (user.plan === "FREE") return true;
    if (!user.subscriptionUntil) return false;
    return user.subscriptionUntil > /* @__PURE__ */ new Date();
  }
  effectivePlan(user) {
    if (user.plan === "FREE") return "FREE";
    if (!this.isActive(user)) return "FREE";
    return user.plan;
  }
  canAddSearch(user, currentCount) {
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.maxSearches === null) return true;
    return currentCount < limits.maxSearches;
  }
  canUsePlatform(user, platformIndex) {
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.allPlatforms || limits.maxPlatforms === null) return true;
    return platformIndex < limits.maxPlatforms;
  }
  canSendNotification(user) {
    if (user.isBanned) return false;
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.maxDailyNotifications === null) return true;
    const now = /* @__PURE__ */ new Date();
    const resetAt = user.dailyNotificationLimitResetAt;
    const isNewDay = now.toDateString() !== resetAt.toDateString();
    const count = isNewDay ? 0 : user.dailyNotificationCount;
    return count < limits.maxDailyNotifications;
  }
  isWithinWorkingHours(settings) {
    if (!settings || !settings.workingHoursEnabled) return true;
    const now = /* @__PURE__ */ new Date();
    const hour = new Date(
      now.toLocaleString("en-US", { timeZone: settings.timezone })
    ).getHours();
    return hour >= settings.workingHoursFrom && hour < settings.workingHoursTo;
  }
  async expireSubscriptions(notifyFn) {
    const expired = await this.userRepo.findExpiredSubscriptions();
    for (const user of expired) {
      try {
        await this.userRepo.setPlan(user.id, "FREE", 0);
        await this.searchRepo.deactivateExcessForUser(user.id, 1);
        await this.adminLogRepo.log("SUBSCRIPTION_EXPIRED", `plan:${user.plan}`, user.id);
        await notifyFn(
          user.telegramId,
          "\u0412\u0430\u0448\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0430\u0441\u044C. \u0410\u043A\u0442\u0438\u0432\u043D\u044B\u043C \u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E 1 \u043F\u043E\u0438\u0441\u043A Free."
        );
        logger.info(`Subscription expired for user ${user.id}`);
      } catch (err) {
        logger.error(`Failed to expire subscription for user ${user.id}`, err);
      }
    }
  }
  async grantPlan(userId, plan, days, adminTelegramId) {
    const user = await this.userRepo.setPlan(userId, plan, days);
    await this.adminLogRepo.log(
      "MANUAL_PLAN",
      `plan:${plan} days:${days} by:${adminTelegramId ?? "system"}`,
      userId
    );
    return user;
  }
  async resetDailyNotifications() {
    await this.userRepo.resetDailyNotifications();
    logger.info("Daily notification counts reset");
  }
  /** Admin override: set plan by string telegramId */
  async setPlanAdmin(telegramId, plan) {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error("User not found");
    await this.grantPlan(user.id, plan, plan === "FREE" ? 0 : 30);
  }
};

// src/utils/format.ts
function escapeMarkdown(text) {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
function formatDate(date) {
  if (!date) return "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E";
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow"
  });
}
function formatPlanExpiry(user) {
  if (user.plan === "FREE") return "\u0431\u0435\u0441\u0441\u0440\u043E\u0447\u043D\u043E";
  if (!user.subscriptionUntil) return "\u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u0430";
  const now = /* @__PURE__ */ new Date();
  if (user.subscriptionUntil < now) return "\u0438\u0441\u0442\u0435\u043A\u043B\u0430";
  const days = Math.ceil(
    (user.subscriptionUntil.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24)
  );
  return `\u0434\u043E ${formatDate(user.subscriptionUntil)} (${days} \u0434\u043D.)`;
}
function formatUserMention(user) {
  if (user.username) return `@${user.username}`;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || `ID:${user.telegramId}`;
}

// src/services/notification.service.ts
var NotificationService = class {
  notifRepo;
  userRepo;
  adminLogRepo;
  subService;
  bot = null;
  constructor(notifRepo, userRepo, adminLogRepo, subService2) {
    this.notifRepo = notifRepo ?? new NotificationRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
    this.subService = subService2 ?? new SubscriptionService();
  }
  setBot(bot) {
    this.bot = bot;
  }
  async sendListingNotification(user, search, listing, settings) {
    if (!this.bot) throw new Error("Bot not initialized");
    const canSend = this.subService.canSendNotification(user);
    const withinHours = this.subService.isWithinWorkingHours(settings);
    if (!canSend || !withinHours || (settings?.digestMode ?? false)) {
      const notif = await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: "QUEUED"
      });
      if (!canSend) {
        await this.notifRepo.updateStatus(notif.id, "SKIPPED");
        const limitMsg = "\u0421\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u0438\u0439 \u043B\u0438\u043C\u0438\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 Free \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F. \u041D\u043E\u0432\u044B\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043D\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443.";
        try {
          await this.bot.api.sendMessage(Number(user.telegramId), limitMsg);
          await this.adminLogRepo.log("FREE_LIMIT_REACHED", void 0, user.id);
        } catch {
        }
      }
      return false;
    }
    try {
      const plan = this.subService.effectivePlan(user);
      const showPhoto = (settings?.photoMode ?? true) && listing.imageUrl && plan !== "FREE";
      const text = this.buildListingText(listing, search);
      if (showPhoto && listing.imageUrl) {
        await this.bot.api.sendPhoto(Number(user.telegramId), listing.imageUrl, {
          caption: text,
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C", url: listing.url },
                { text: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A", callback_data: `del_search:${search.id}` },
                { text: "\u041E\u0442\u043A\u043B. \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F", callback_data: `pause_search:${search.id}` }
              ]
            ]
          }
        });
      } else {
        await this.bot.api.sendMessage(Number(user.telegramId), text, {
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C", url: listing.url },
                { text: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A", callback_data: `del_search:${search.id}` },
                { text: "\u041E\u0442\u043A\u043B. \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F", callback_data: `pause_search:${search.id}` }
              ]
            ]
          }
        });
      }
      await this.userRepo.incrementDailyNotification(user.id);
      const notif = await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: "SENT",
        sentAt: /* @__PURE__ */ new Date()
      });
      await this.notifRepo.markSent(notif.id);
      return true;
    } catch (err) {
      logger.error(`Failed to send notification to user ${user.id}`, err);
      const notif = await this.notifRepo.create({
        user: { connect: { id: user.id } },
        search: { connect: { id: search.id } },
        listing: { connect: { id: listing.id } },
        status: "FAILED"
      });
      await this.notifRepo.markFailed(notif.id, String(err));
      return false;
    }
  }
  buildListingText(listing, search) {
    const platform = PLATFORM_NAMES[listing.platform];
    const lines = [
      `*${escapeMarkdown(listing.title)}*`,
      listing.price ? `\u0426\u0435\u043D\u0430: ${escapeMarkdown(listing.price)}` : "",
      listing.location ? `\u041C\u0435\u0441\u0442\u043E: ${escapeMarkdown(listing.location)}` : "",
      listing.publishedAt ? `\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E: ${escapeMarkdown(listing.publishedAt.toLocaleDateString("ru-RU"))}` : "",
      `\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430: ${escapeMarkdown(platform)}`,
      search.name ? `\u041F\u043E\u0438\u0441\u043A: ${escapeMarkdown(search.name)}` : ""
    ].filter(Boolean);
    return lines.join("\n");
  }
  async flushQueue(user, settings) {
    if (!this.bot) return;
    const queued = await this.notifRepo.findQueued(user.id);
    for (const notif of queued) {
      const canSend = this.subService.canSendNotification(user);
      const withinHours = this.subService.isWithinWorkingHours(settings);
      if (!canSend || !withinHours) break;
      const full = notif;
      await this.sendListingNotification(user, full.search, full.listing, settings);
    }
  }
  async countSentToday() {
    return this.notifRepo.countSentToday();
  }
};

// src/repositories/payment.repository.ts
var PaymentRepository = class {
  async create(data) {
    return prisma.payment.create({ data });
  }
  async findByChargeId(telegramPaymentChargeId) {
    return prisma.payment.findUnique({ where: { telegramPaymentChargeId } });
  }
  async findByUserId(userId, limit = 20) {
    return prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit
    });
  }
  async findRecent(limit = 20) {
    return prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { user: true }
    });
  }
  async countToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.payment.count({ where: { createdAt: { gte: start } } });
  }
  async sumStarsToday() {
    const start = /* @__PURE__ */ new Date();
    start.setHours(0, 0, 0, 0);
    const result = await prisma.payment.aggregate({
      where: { createdAt: { gte: start } },
      _sum: { stars: true }
    });
    return result._sum.stars ?? 0;
  }
};

// src/services/referral.service.ts
var ReferralService = class {
  userRepo;
  constructor(userRepo) {
    this.userRepo = userRepo ?? new UserRepository();
  }
  async saveReferral(newUserId, referrerUserId) {
    try {
      await prisma.referral.upsert({
        where: { referredUserId: newUserId },
        create: { referrerId: referrerUserId, referredUserId: newUserId },
        update: {}
      });
    } catch (err) {
      logger.error("Failed to save referral", err);
    }
  }
  async handlePayment(payingUserId) {
    const referral = await prisma.referral.findUnique({
      where: { referredUserId: payingUserId }
    });
    if (!referral || referral.bonusGranted) return;
    await this.userRepo.setPlan(referral.referrerId, "START", 7);
    await prisma.referral.update({
      where: { id: referral.id },
      data: { bonusGranted: true, bonusGrantedAt: /* @__PURE__ */ new Date() }
    });
    logger.info(
      `Referral bonus: 7 days START granted to user ${referral.referrerId} for referring ${payingUserId}`
    );
  }
  async countReferrals(userId) {
    return prisma.referral.count({ where: { referrerId: userId } });
  }
  async getStats(userId) {
    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId }
    });
    const active = referrals.filter((r) => r.bonusGranted).length;
    const bonusDaysEarned = active * 7;
    return { total: referrals.length, active, bonusDaysEarned };
  }
};

// src/services/payment.service.ts
var PaymentService = class {
  paymentRepo;
  userRepo;
  adminLogRepo;
  referralService;
  constructor(paymentRepo, userRepo, adminLogRepo, referralService2) {
    this.paymentRepo = paymentRepo ?? new PaymentRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
    this.referralService = referralService2 ?? new ReferralService();
  }
  getPlanFromStars(stars) {
    for (const [plan, price] of Object.entries(PLAN_PRICES)) {
      if (price === stars) return plan;
    }
    return null;
  }
  buildInvoicePayload(plan) {
    return `subscribe_${plan}`;
  }
  parsePlanFromPayload(payload) {
    const match = payload.match(/^subscribe_(\w+)$/);
    if (!match) return null;
    const plan = match[1];
    if (!Object.keys(PLAN_PRICES).includes(plan)) return null;
    return plan;
  }
  async processSuccessfulPayment(userId, payment, notifyUserFn, notifyAdminFn) {
    const existing = await this.paymentRepo.findByChargeId(
      payment.telegram_payment_charge_id
    );
    if (existing) {
      logger.warn(`Duplicate payment attempt: ${payment.telegram_payment_charge_id}`);
      return;
    }
    const plan = this.parsePlanFromPayload(payment.invoice_payload);
    if (!plan) {
      logger.error(`Unknown plan payload: ${payment.invoice_payload}`);
      return;
    }
    const days = 30;
    const user = await this.userRepo.setPlan(userId, plan, days);
    await this.paymentRepo.create({
      user: { connect: { id: userId } },
      telegramPaymentChargeId: payment.telegram_payment_charge_id,
      providerPaymentChargeId: payment.provider_payment_charge_id ?? null,
      plan,
      stars: payment.total_amount,
      daysGranted: days
    });
    await this.adminLogRepo.log(
      "PAYMENT",
      `plan:${plan} stars:${payment.total_amount}`,
      userId
    );
    const subUntil = user.subscriptionUntil ? formatDate(user.subscriptionUntil) : "N/A";
    await notifyUserFn(`\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0430: ${PLAN_NAMES[plan]} \u043D\u0430 30 \u0434\u043D\u0435\u0439.`);
    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await notifyAdminFn(
      `\u041D\u043E\u0432\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430

\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${mention}
Telegram ID: ${user.telegramId}
\u0422\u0430\u0440\u0438\u0444: ${PLAN_NAMES[plan]}
\u0421\u0443\u043C\u043C\u0430: ${payment.total_amount} Stars
\u0414\u043E: ${subUntil}`
    );
    await this.referralService.handlePayment(userId);
    logger.info(`Payment processed for user ${userId}: ${plan} / ${payment.total_amount} stars`);
  }
  async getStats() {
    const [countToday, starsToday] = await Promise.all([
      this.paymentRepo.countToday(),
      this.paymentRepo.sumStarsToday()
    ]);
    return { countToday, starsToday };
  }
  async getRecent(limit = 20) {
    return this.paymentRepo.findRecent(limit);
  }
};

// src/repositories/promo.repository.ts
var PromoRepository = class {
  async findByCode(code) {
    return prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
  }
  async create(data) {
    return prisma.promoCode.create({
      data: { ...data, code: data.code.toUpperCase() }
    });
  }
  async incrementUsed(id) {
    await prisma.promoCode.update({
      where: { id },
      data: { usedCount: { increment: 1 } }
    });
  }
  async recordUse(promoCodeId, userId) {
    return prisma.promoCodeUse.create({
      data: { promoCodeId, userId }
    });
  }
  async hasUserUsed(promoCodeId, userId) {
    const use = await prisma.promoCodeUse.findUnique({
      where: { promoCodeId_userId: { promoCodeId, userId } }
    });
    return !!use;
  }
  async deactivate(code) {
    await prisma.promoCode.updateMany({
      where: { code: code.toUpperCase() },
      data: { isActive: false }
    });
  }
  async findAll() {
    const promos = await prisma.promoCode.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" }
    });
    return promos.map((p) => ({
      code: p.code,
      planGranted: p.plan,
      daysGranted: p.days,
      maxUses: p.maxUses,
      usedCount: p.usedCount
    }));
  }
};

// src/services/promo.service.ts
var PromoService = class {
  promoRepo;
  userRepo;
  adminLogRepo;
  constructor(promoRepo, userRepo, adminLogRepo) {
    this.promoRepo = promoRepo ?? new PromoRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }
  async redeem(userId, code) {
    const promo = await this.promoRepo.findByCode(code);
    if (!promo || !promo.isActive) {
      return { success: false, message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0438\u043B\u0438 \u043D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D." };
    }
    if (promo.expiresAt && promo.expiresAt < /* @__PURE__ */ new Date()) {
      return { success: false, message: "\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430 \u0438\u0441\u0442\u0451\u043A." };
    }
    if (promo.usedCount >= promo.maxUses) {
      return { success: false, message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0430\u0437." };
    }
    const alreadyUsed = await this.promoRepo.hasUserUsed(promo.id, userId);
    if (alreadyUsed) {
      return { success: false, message: "\u0412\u044B \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438 \u044D\u0442\u043E\u0442 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434." };
    }
    await this.userRepo.setPlan(userId, promo.plan, promo.days);
    await this.promoRepo.recordUse(promo.id, userId);
    await this.promoRepo.incrementUsed(promo.id);
    await this.adminLogRepo.log("PROMO_USED", `code:${code} plan:${promo.plan}`, userId);
    logger.info(`User ${userId} redeemed promo code ${code}: ${promo.plan} for ${promo.days} days`);
    return {
      success: true,
      message: `\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D: ${PLAN_NAMES[promo.plan]} \u043D\u0430 ${promo.days} \u0434\u043D\u0435\u0439.`,
      plan: promo.plan,
      days: promo.days
    };
  }
  async create(data) {
    const promo = await this.promoRepo.create(data);
    return promo.code;
  }
  /** Alias used by admin controller */
  async createPromo(code, plan, days, maxUses) {
    const existing = await this.promoRepo.findByCode(code);
    if (existing) throw new Error(`Promo code ${code} already exists`);
    const createdCode = await this.create({ code, plan, days, maxUses });
    return { code: createdCode, planGranted: plan, daysGranted: days, maxUses };
  }
  async deletePromo(code) {
    await this.promoRepo.deactivate(code);
  }
  async listAll() {
    return this.promoRepo.findAll();
  }
  /** Alias used by subscription controller */
  async applyPromo(userId, code) {
    const result = await this.redeem(userId, code);
    if (!result.success) return { success: false, reason: result.message };
    return { success: true, planGranted: result.plan, daysGranted: result.days };
  }
};

// src/services/admin-notification.service.ts
var AdminNotificationService = class {
  bot = null;
  constructor(bot) {
    if (bot) this.bot = bot;
  }
  setBot(bot) {
    this.bot = bot;
  }
  async send(message) {
    if (!this.bot) return;
    for (const adminId of config.ADMIN_IDS) {
      try {
        await this.bot.api.sendMessage(Number(adminId), message);
      } catch (err) {
        logger.error(`Failed to send admin notification to ${adminId}`, err);
      }
    }
  }
  async notifyNewUser(user) {
    const mention = user.username ? `@${user.username}` : "\u043D\u0435\u0442";
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "\u043D\u0435\u0442";
    await this.send(
      `\u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C

\u0418\u043C\u044F: ${name}
Username: ${mention}
Telegram ID: ${user.telegramId}
\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: ${formatDate(user.createdAt)}
\u0422\u0430\u0440\u0438\u0444: Free`
    );
  }
  async notifyParserError(platform, searchId, error) {
    await this.send(
      `\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0435\u0440\u0430

\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430: ${platform}
\u041F\u043E\u0438\u0441\u043A ID: ${searchId}
\u041E\u0448\u0438\u0431\u043A\u0430: ${error}`
    );
  }
  async notifyBan(user, reason) {
    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await this.send(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0437\u0430\u0431\u0430\u043D\u0435\u043D

\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${mention}
\u041F\u0440\u0438\u0447\u0438\u043D\u0430: ${reason}`);
  }
  async notifyUnban(user) {
    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await this.send(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0440\u0430\u0437\u0431\u0430\u043D\u0435\u043D

\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${mention}`);
  }
  async notifyBroadcastComplete(total, sent, failed) {
    await this.send(
      `\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430

\u0412\u0441\u0435\u0433\u043E: ${total}
\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E: ${sent}
\u041E\u0448\u0438\u0431\u043E\u043A: ${failed}`
    );
  }
  async notifyCriticalCronError(job, error) {
    await this.send(`\u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 cron

\u0417\u0430\u0434\u0430\u0447\u0430: ${job}
\u041E\u0448\u0438\u0431\u043A\u0430: ${error}`);
  }
  async notifySupportRequest(user, message) {
    const mention = formatUserMention(user);
    await this.send(
      `\u0417\u0430\u043F\u0440\u043E\u0441 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443

\u041E\u0442: ${mention} (${user.telegramId})

${message}`
    );
  }
};

// src/middlewares/auth.middleware.ts
var userService = new UserService();
var adminNotifService = new AdminNotificationService();
var referralService = new ReferralService();
async function authMiddleware(ctx, next) {
  if (!ctx.from) return next();
  try {
    const refMatch = ctx.message?.text?.match(/^\/start ref_(\d+)$/);
    const referrerTelegramId = refMatch ? BigInt(refMatch[1]) : void 0;
    const { user, isNew } = await userService.getOrCreate(ctx.from, referrerTelegramId);
    if (user.isBanned) {
      await ctx.reply("\u0412\u0430\u0448 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0431\u043E\u0442\u0443 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D.");
      return;
    }
    ctx.dbUser = user;
    if (isNew) {
      void adminNotifService.notifyNewUser(user);
      if (referrerTelegramId) {
        const referrerUser = await userService.findByTelegramId(referrerTelegramId);
        if (referrerUser) {
          await referralService.saveReferral(user.id, referrerUser.id);
        }
      }
    }
    return next();
  } catch (err) {
    logger.error("Auth middleware error", err);
    return next();
  }
}

// src/middlewares/rate-limit.middleware.ts
var userTimestamps = /* @__PURE__ */ new Map();
var WINDOW_MS = 1e4;
var MAX_REQUESTS = 15;
async function rateLimitMiddleware(ctx, next) {
  if (!ctx.from) return next();
  const telegramId = BigInt(ctx.from.id);
  const now = Date.now();
  const timestamps = (userTimestamps.get(telegramId) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS) {
    await ctx.reply("\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 10 \u0441\u0435\u043A\u0443\u043D\u0434.");
    return;
  }
  timestamps.push(now);
  userTimestamps.set(telegramId, timestamps);
  return next();
}

// src/keyboards/main.keyboard.ts
var import_grammy = require("grammy");
function mainMenuKeyboard() {
  return new import_grammy.Keyboard().text("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A").text("\u041C\u043E\u0438 \u043F\u043E\u0438\u0441\u043A\u0438").row().text("\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430").text("\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430").row().text("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438").text("\u041F\u043E\u043C\u043E\u0449\u044C").resized().persistent();
}
function platformKeyboard() {
  return new import_grammy.InlineKeyboard().text("Avito", "platform:AVITO").text("Cian", "platform:CIAN").row().text("Youla", "platform:YOULA").text("Auto.ru", "platform:AUTORU");
}
function subscriptionKeyboard(currentPlan) {
  const kb = new import_grammy.InlineKeyboard();
  if (currentPlan !== "START") {
    kb.text(`Start \u2014 ${PLAN_PRICES.START} Stars / 30 \u0434\u043D\u0435\u0439`, "buy:START").row();
  }
  if (currentPlan !== "PRO") {
    kb.text(`Pro \u2014 ${PLAN_PRICES.PRO} Stars / 30 \u0434\u043D\u0435\u0439`, "buy:PRO").row();
  }
  if (currentPlan !== "UNLIMITED") {
    kb.text(`Unlimited \u2014 ${PLAN_PRICES.UNLIMITED} Stars / 30 \u0434\u043D\u0435\u0439`, "buy:UNLIMITED").row();
  }
  kb.text("\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 /promo CODE", "promo_hint");
  return kb;
}
function searchListKeyboard(searches) {
  const kb = new import_grammy.InlineKeyboard();
  for (const s of searches) {
    const statusLabel = SEARCH_STATUS_LABELS[s.status];
    const name = s.name ?? s.platform;
    kb.text(`${name} [${statusLabel}]`, `search:${s.id}`).row();
  }
  return kb;
}
function searchActionKeyboard(search) {
  const kb = new import_grammy.InlineKeyboard();
  if (search.isActive) {
    kb.text("\u041F\u0430\u0443\u0437\u0430", `pause_search:${search.id}`);
  } else {
    kb.text("\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C", `resume_search:${search.id}`);
  }
  kb.text("\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C", `rename_search:${search.id}`).row();
  kb.text("\u0418\u0441\u0442\u043E\u0440\u0438\u044F", `history:${search.id}`).text("\u0423\u0434\u0430\u043B\u0438\u0442\u044C", `del_search:${search.id}`).row();
  kb.text("\u041D\u0430\u0437\u0430\u0434", "my_searches");
  return kb;
}
function settingsKeyboard(settings) {
  return new import_grammy.InlineKeyboard().text(
    `\u0417\u0432\u0443\u043A: ${settings.silentMode ? "\u0432\u044B\u043A\u043B" : "\u0432\u043A\u043B"}`,
    "toggle:silentMode"
  ).text(
    `\u0424\u043E\u0442\u043E: ${settings.photoMode ? "\u0432\u043A\u043B" : "\u0432\u044B\u043A\u043B"}`,
    "toggle:photoMode"
  ).row().text(
    `\u0414\u0430\u0439\u0434\u0436\u0435\u0441\u0442: ${settings.digestMode ? "\u0432\u043A\u043B" : "\u0432\u044B\u043A\u043B"}`,
    "toggle:digestMode"
  ).text(
    `\u0420\u0430\u0431. \u0447\u0430\u0441\u044B: ${settings.workingHoursEnabled ? "\u0432\u043A\u043B" : "\u0432\u044B\u043A\u043B"}`,
    "toggle:workingHoursEnabled"
  ).row().text("\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0447\u0430\u0441\u044B", "set_working_hours").text("\u0427\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441", "set_timezone");
}
function adminMenuKeyboard() {
  return new import_grammy.InlineKeyboard().text("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438", "admin:users").text("\u041F\u043B\u0430\u0442\u0435\u0436\u0438", "admin:payments").row().text("\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430", "admin:stats").text("\u041B\u043E\u0433\u0438", "admin:logs").row().text("\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430 /broadcast", "admin:broadcast_hint").text("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", "admin:settings");
}

// src/controllers/start.controller.ts
function registerStartController(bot) {
  bot.command("start", async (ctx) => {
    const onboarding = [
      "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 SearchBot!",
      "",
      "\u041A\u0430\u043A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F:",
      '1. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A"',
      "2. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0443 (Avito, Cian, Youla, Auto.ru)",
      "3. \u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043F\u043E\u0438\u0441\u043A \u0441 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u043C\u0438",
      "4. \u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043E \u043D\u043E\u0432\u044B\u0445 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F\u0445",
      "",
      '\u0414\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0435\u0433\u043E \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u043F\u043E\u0438\u0441\u043A\u043E\u0432 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0442\u0430\u0440\u0438\u0444 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430".'
    ].join("\n");
    await ctx.reply(onboarding, { reply_markup: mainMenuKeyboard() });
  });
  bot.hears("\u041F\u043E\u043C\u043E\u0449\u044C", async (ctx) => {
    await ctx.reply(
      'SearchBot \u2014 \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439.\n\n/start \u2014 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E\n/promo CODE \u2014 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\n/admin \u2014 \u043F\u0430\u043D\u0435\u043B\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 (\u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430)\n\n\u041F\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0435 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430" \u0432 \u043C\u0435\u043D\u044E.'
    );
  });
}

// src/services/search.service.ts
var SearchService = class {
  searchRepo;
  listingRepo;
  subService;
  constructor() {
    this.searchRepo = new SearchRepository();
    this.listingRepo = new ListingRepository();
    this.subService = new SubscriptionService();
  }
  detectPlatform(url) {
    try {
      const hostname = new URL(url).hostname.replace("www.", "");
      for (const [platform, domain] of Object.entries(PLATFORM_DOMAINS)) {
        if (hostname.includes(domain)) return platform;
      }
      return null;
    } catch {
      return null;
    }
  }
  async canAdd(user) {
    const plan = this.subService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const currentCount = await this.searchRepo.countActiveByUserId(user.id);
    if (limits.maxSearches !== null && currentCount >= limits.maxSearches) {
      return {
        allowed: false,
        reason: `\u0412\u0430\u0448 \u0442\u0430\u0440\u0438\u0444 ${plan} \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ${limits.maxSearches} \u043F\u043E\u0438\u0441\u043A\u043E\u0432. \u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043D\u0430 Pro \u0434\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0435\u0433\u043E \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430.`
      };
    }
    return { allowed: true };
  }
  async create(user, url, platform, name) {
    const search = await this.searchRepo.create({
      user: { connect: { id: user.id } },
      url,
      platform,
      name: name ?? null,
      status: "ACTIVE",
      isActive: true
    });
    logger.info(`Search ${search.id} created for user ${user.id} on ${platform}`);
    return search;
  }
  async getByUser(userId) {
    return this.searchRepo.findByUserId(userId);
  }
  async getById(id, userId) {
    const search = await this.searchRepo.findById(id);
    if (!search || search.userId !== userId) return null;
    return search;
  }
  async pause(id, userId) {
    const search = await this.getById(id, userId);
    if (!search) return null;
    return this.searchRepo.setActive(id, false);
  }
  async resume(id, userId) {
    const search = await this.getById(id, userId);
    if (!search) return null;
    const updated = await this.searchRepo.setActive(id, true);
    await this.searchRepo.resetError(id);
    return updated;
  }
  async rename(id, userId, name) {
    const search = await this.getById(id, userId);
    if (!search) return null;
    return this.searchRepo.update(id, { name });
  }
  async delete(id, userId) {
    const search = await this.getById(id, userId);
    if (!search) return false;
    await this.searchRepo.delete(id);
    return true;
  }
  async getHistory(userId, limit) {
    return this.listingRepo.findHistoryForUser(userId, limit);
  }
  async getStats(userId) {
    const searches = await this.searchRepo.findByUserId(userId);
    const activeSearches = searches.filter((s) => s.isActive).length;
    let totalListings = 0;
    let lastChecked = null;
    for (const s of searches) {
      totalListings += await this.listingRepo.countBySearchId(s.id);
      if (s.lastCheckedAt) {
        if (!lastChecked || s.lastCheckedAt > lastChecked) {
          lastChecked = s.lastCheckedAt;
        }
      }
    }
    const newToday = await this.listingRepo.countFoundToday();
    return { activeSearches, totalListings, newToday, lastChecked };
  }
  async getAllActiveForCron() {
    return this.searchRepo.findAllActiveForCron();
  }
  async recordError(id, error, notifyFn) {
    const search = await this.searchRepo.findById(id);
    if (!search) return;
    const updated = await this.searchRepo.incrementError(id, error);
    if (updated.errorCount >= 3 && notifyFn) {
      await this.searchRepo.setStatus(id, "ERROR");
      await notifyFn("\u041F\u043E\u0438\u0441\u043A \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443.");
    }
  }
  async recordSuccess(id) {
    await this.searchRepo.updateLastChecked(id);
    const search = await this.searchRepo.findById(id);
    if (search && search.errorCount > 0) {
      await this.searchRepo.resetError(id);
    }
  }
};

// src/controllers/search.controller.ts
var searchService = new SearchService();
var subService = new SubscriptionService();
function getDbUser(ctx) {
  return ctx.dbUser;
}
function registerSearchController(bot) {
  bot.hears("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A", async (ctx) => {
    const user = getDbUser(ctx);
    const plan = subService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const current = await searchService.getByUser(user.id);
    const activeCount = current.filter((s) => s.isActive).length;
    if (limits.maxSearches !== null && activeCount >= limits.maxSearches) {
      await ctx.reply(
        `\u0412\u0430\u0448 \u0442\u0430\u0440\u0438\u0444 ${plan} \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0434\u043E ${limits.maxSearches} \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432.
\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043D\u0430 Pro \u0434\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0435\u0433\u043E \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430.`
      );
      return;
    }
    ctx.session.step = "awaiting_platform";
    await ctx.reply("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0443:", { reply_markup: platformKeyboard() });
  });
  bot.callbackQuery(/^platform:(\w+)$/, async (ctx) => {
    const platform = ctx.match[1];
    if (!platform) {
      await ctx.answerCallbackQuery();
      return;
    }
    ctx.session.selectedPlatform = platform;
    ctx.session.step = "awaiting_url";
    await ctx.editMessageText(
      `\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430: ${PLATFORM_NAMES[platform]}

\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043F\u043E\u0438\u0441\u043A\u0430 \u0441 \u043D\u0443\u0436\u043D\u044B\u043C\u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u043C\u0438.`
    );
    await ctx.answerCallbackQuery();
  });
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step !== "awaiting_url") return next();
    const url = ctx.message.text.trim();
    const platform = ctx.session.selectedPlatform;
    if (!platform) {
      ctx.session.step = void 0;
      return next();
    }
    const detected = searchService.detectPlatform(url);
    if (!detected || detected !== platform) {
      await ctx.reply(
        `\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435 ${PLATFORM_NAMES[platform]}.
\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0443\u044E \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0443 \u0437\u0430\u043D\u043E\u0432\u043E.`
      );
      return;
    }
    ctx.session.step = "awaiting_name";
    ctx.session.pendingSearchUrl = url;
    await ctx.reply(
      '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: "BMW X5 \u0434\u043E 3 \u043C\u043B\u043D") \u0438\u043B\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 "-" \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C.'
    );
  });
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step !== "awaiting_name") return next();
    const nameInput = ctx.message.text.trim();
    const name = nameInput === "-" ? void 0 : nameInput;
    const url = ctx.session.pendingSearchUrl;
    const platform = ctx.session.selectedPlatform;
    ctx.session.step = void 0;
    ctx.session.pendingSearchUrl = void 0;
    ctx.session.selectedPlatform = void 0;
    if (!url || !platform) {
      await ctx.reply("\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E.");
      return;
    }
    const user = getDbUser(ctx);
    const { allowed, reason } = await searchService.canAdd(user);
    if (!allowed) {
      await ctx.reply(reason ?? "\u041D\u0435\u043B\u044C\u0437\u044F \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A.");
      return;
    }
    const search = await searchService.create(user, url, platform, name);
    await ctx.reply(
      `\u041F\u043E\u0438\u0441\u043A \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D: ${search.name ?? PLATFORM_NAMES[platform]}
\u041F\u0435\u0440\u0432\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0430\u0447\u043D\u0451\u0442\u0441\u044F \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0443\u044E \u043C\u0438\u043D\u0443\u0442\u0443.`
    );
  });
  bot.hears("\u041C\u043E\u0438 \u043F\u043E\u0438\u0441\u043A\u0438", async (ctx) => {
    const user = getDbUser(ctx);
    const searches = await searchService.getByUser(user.id);
    if (searches.length === 0) {
      await ctx.reply(
        '\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u043E\u0438\u0441\u043A\u043E\u0432. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A" \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u044B\u0439.'
      );
      return;
    }
    await ctx.reply("\u0412\u0430\u0448\u0438 \u043F\u043E\u0438\u0441\u043A\u0438:", { reply_markup: searchListKeyboard(searches) });
  });
  bot.callbackQuery("my_searches", async (ctx) => {
    const user = getDbUser(ctx);
    const searches = await searchService.getByUser(user.id);
    await ctx.editMessageText("\u0412\u0430\u0448\u0438 \u043F\u043E\u0438\u0441\u043A\u0438:", {
      reply_markup: searchListKeyboard(searches)
    });
    await ctx.answerCallbackQuery();
  });
  bot.callbackQuery(/^search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    const search = await searchService.getById(id, user.id);
    if (!search) {
      await ctx.answerCallbackQuery("\u041F\u043E\u0438\u0441\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
      return;
    }
    const statusLabel = SEARCH_STATUS_LABELS[search.status];
    const text = [
      `\u041F\u043E\u0438\u0441\u043A: ${search.name ?? PLATFORM_NAMES[search.platform]}`,
      `\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430: ${PLATFORM_NAMES[search.platform]}`,
      `\u0421\u0442\u0430\u0442\u0443\u0441: ${statusLabel}`,
      `URL: ${search.url}`,
      `\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430: ${formatDate(search.lastCheckedAt)}`,
      `\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435: ${formatDate(search.lastFoundAt)}`,
      search.lastError ? `\u041E\u0448\u0438\u0431\u043A\u0430: ${search.lastError}` : ""
    ].filter(Boolean).join("\n");
    await ctx.editMessageText(text, { reply_markup: searchActionKeyboard(search) });
    await ctx.answerCallbackQuery();
  });
  bot.callbackQuery(/^pause_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    await searchService.pause(id, user.id);
    await ctx.answerCallbackQuery("\u041F\u043E\u0438\u0441\u043A \u043D\u0430 \u043F\u0430\u0443\u0437\u0435.");
    await ctx.editMessageText("\u041F\u043E\u0438\u0441\u043A \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D.");
  });
  bot.callbackQuery(/^resume_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    await searchService.resume(id, user.id);
    await ctx.answerCallbackQuery("\u041F\u043E\u0438\u0441\u043A \u0432\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D.");
    await ctx.editMessageText("\u041F\u043E\u0438\u0441\u043A \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D.");
  });
  bot.callbackQuery(/^del_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    const user = getDbUser(ctx);
    const deleted = await searchService.delete(id, user.id);
    await ctx.answerCallbackQuery(deleted ? "\u041F\u043E\u0438\u0441\u043A \u0443\u0434\u0430\u043B\u0451\u043D." : "\u041F\u043E\u0438\u0441\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    await ctx.editMessageText(deleted ? "\u041F\u043E\u0438\u0441\u043A \u0443\u0434\u0430\u043B\u0451\u043D." : "\u041F\u043E\u0438\u0441\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
  });
  bot.callbackQuery(/^rename_search:(\d+)$/, async (ctx) => {
    const id = parseInt(ctx.match[1]);
    ctx.session.step = `renaming:${id}`;
    await ctx.answerCallbackQuery();
    await ctx.reply("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430:");
  });
  bot.on("message:text", async (ctx, next) => {
    const step = ctx.session.step;
    if (!step?.startsWith("renaming:")) return next();
    const id = parseInt(step.split(":")[1]);
    const user = getDbUser(ctx);
    const name = ctx.message.text.trim();
    ctx.session.step = void 0;
    const updated = await searchService.rename(id, user.id, name);
    if (updated) {
      await ctx.reply(`\u041F\u043E\u0438\u0441\u043A \u043F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D: "${updated.name ?? name}"`);
    } else {
      await ctx.reply("\u041F\u043E\u0438\u0441\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
  });
  bot.callbackQuery(/^history:(\d+)$/, async (ctx) => {
    const user = getDbUser(ctx);
    const plan = subService.effectivePlan(user);
    const limit = PLAN_LIMITS[plan].historyLimit;
    if (limit === 0 || limit === null && plan === "FREE") {
      await ctx.answerCallbackQuery("\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043D\u0430 \u0442\u0430\u0440\u0438\u0444\u0435 Free.");
      return;
    }
    const items = await searchService.getHistory(user.id, limit ?? 200);
    if (items.length === 0) {
      await ctx.answerCallbackQuery();
      await ctx.editMessageText("\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0443\u0441\u0442\u0430.");
      return;
    }
    const lines = items.slice(0, 10).map((l) => {
      const listing = l;
      return `\u2022 ${listing.title}${listing.price ? " \u2014 " + listing.price : ""}
  ${listing.url}`;
    });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F:

${lines.join("\n\n")}`);
  });
}

// src/controllers/subscription.controller.ts
function getDbUser2(ctx) {
  return ctx.dbUser;
}
function registerSubscriptionController(bot, subscriptionService, paymentService, promoService) {
  bot.hears("\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430", async (ctx) => {
    const user = getDbUser2(ctx);
    const plan = subscriptionService.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    const expiry = formatPlanExpiry(user);
    const text = [
      `\u0412\u0430\u0448 \u0442\u0430\u0440\u0438\u0444: *${PLAN_NAMES[plan]}*`,
      `\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442: ${expiry}`,
      "",
      `\u041F\u043E\u0438\u0441\u043A\u043E\u0432: ${limits.maxSearches ?? "\u221E"}`,
      `\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439/\u0434\u0435\u043D\u044C: ${limits.maxDailyNotifications ?? "\u221E"}`,
      `\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438: ${limits.checkIntervalMinutes} \u043C\u0438\u043D`,
      `\u0424\u043E\u0442\u043E: ${limits.photosEnabled ? "\u0434\u0430" : "\u043D\u0435\u0442"}`,
      "",
      "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0430\u0440\u0438\u0444 \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u044B:"
    ].join("\n");
    await ctx.reply(text, {
      parse_mode: "Markdown",
      reply_markup: subscriptionKeyboard(plan)
    });
  });
  bot.callbackQuery(/^buy:(START|PRO|UNLIMITED)$/, async (ctx) => {
    const plan = ctx.match[1];
    const price = PLAN_PRICES[plan];
    const payload = paymentService.buildInvoicePayload(plan);
    try {
      await ctx.replyWithInvoice(
        `\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 ${PLAN_NAMES[plan]}`,
        `\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0442\u0430\u0440\u0438\u0444\u0443 ${PLAN_NAMES[plan]} \u043D\u0430 30 \u0434\u043D\u0435\u0439`,
        payload,
        "XTR",
        [{ label: `${PLAN_NAMES[plan]} 30 \u0434\u043D\u0435\u0439`, amount: price }]
      );
      await ctx.answerCallbackQuery();
    } catch (err) {
      logger.error("Invoice send error", err);
      await ctx.answerCallbackQuery("\u041E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
    }
  });
  bot.on("pre_checkout_query", async (ctx) => {
    await ctx.answerPreCheckoutQuery(true);
  });
  bot.on("message:successful_payment", async (ctx) => {
    const payment = ctx.message.successful_payment;
    const user = getDbUser2(ctx);
    await paymentService.processSuccessfulPayment(
      user.id,
      payment,
      async (msg) => {
        await ctx.reply(msg);
      },
      async (msg) => {
        logger.info(`Admin payment notification: ${msg}`);
      }
    );
  });
  bot.callbackQuery("promo_hint", async (ctx) => {
    await ctx.answerCallbackQuery("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 /promo \u041A\u041E\u0414");
  });
  bot.command("promo", async (ctx) => {
    const parts = ctx.message?.text?.split(" ") ?? [];
    const code = parts[1]?.trim();
    if (!code) {
      ctx.session.step = "awaiting_promo";
      await ctx.reply("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434:");
      return;
    }
    const user = getDbUser2(ctx);
    const result = await promoService.applyPromo(user.id, code);
    if (!result.success) {
      await ctx.reply(result.reason ?? "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D.");
      return;
    }
    await ctx.reply(
      result.planGranted ? `\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D! \u0422\u0430\u0440\u0438\u0444 ${PLAN_NAMES[result.planGranted]} \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 ${result.daysGranted} \u0434\u043D\u0435\u0439.` : "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D!"
    );
  });
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step !== "awaiting_promo") return next();
    ctx.session.step = void 0;
    const code = ctx.message.text.trim();
    const user = getDbUser2(ctx);
    const result = await promoService.applyPromo(user.id, code);
    if (!result.success) {
      await ctx.reply(result.reason ?? "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D.");
      return;
    }
    await ctx.reply(
      result.planGranted ? `\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D! \u0422\u0430\u0440\u0438\u0444 ${PLAN_NAMES[result.planGranted]} \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 ${result.daysGranted} \u0434\u043D\u0435\u0439.` : "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D!"
    );
  });
}

// src/controllers/settings.controller.ts
function getDbUser3(ctx) {
  return ctx.dbUser;
}
function registerSettingsController(bot, userService2) {
  async function showSettings(ctx) {
    const user = getDbUser3(ctx);
    const settings = await userService2.getSettings(user.id);
    const text = [
      "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439",
      "",
      `\u0417\u0432\u0443\u043A: ${settings.silentMode ? "\u0432\u044B\u043A\u043B" : "\u0432\u043A\u043B"}`,
      `\u0424\u043E\u0442\u043E: ${settings.photoMode ? "\u0432\u043A\u043B" : "\u0432\u044B\u043A\u043B"}`,
      `\u0414\u0430\u0439\u0434\u0436\u0435\u0441\u0442: ${settings.digestMode ? "\u0432\u043A\u043B (\u0440\u0430\u0437 \u0432 \u0434\u0435\u043D\u044C)" : "\u0432\u044B\u043A\u043B"}`,
      `\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B: ${settings.workingHoursEnabled ? `${settings.workingHoursFrom}:00\u2013${settings.workingHoursTo}:00` : "\u0432\u044B\u043A\u043B"}`,
      `\u0427\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441: ${settings.timezone}`
    ].join("\n");
    const keyboard = settingsKeyboard(settings);
    if (ctx.callbackQuery) {
      await ctx.editMessageText(text, { reply_markup: keyboard });
      await ctx.answerCallbackQuery();
    } else {
      await ctx.reply(text, { reply_markup: keyboard });
    }
  }
  bot.hears("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", async (ctx) => showSettings(ctx));
  bot.callbackQuery("settings", async (ctx) => showSettings(ctx));
  for (const field of ["silentMode", "photoMode", "digestMode", "workingHoursEnabled"]) {
    bot.callbackQuery(`toggle:${field}`, async (ctx) => {
      const user = getDbUser3(ctx);
      const settings = await userService2.getSettings(user.id);
      await userService2.updateSettings(user.id, { [field]: !settings[field] });
      await showSettings(ctx);
    });
  }
  bot.callbackQuery("set_working_hours", async (ctx) => {
    ctx.session.step = "awaiting_working_hours";
    await ctx.answerCallbackQuery();
    await ctx.reply(
      '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 "9 22" (\u0441 9:00 \u0434\u043E 22:00 \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0432\u0440\u0435\u043C\u0435\u043D\u0438):'
    );
  });
  bot.callbackQuery("set_timezone", async (ctx) => {
    ctx.session.step = "awaiting_timezone";
    await ctx.answerCallbackQuery();
    await ctx.reply(
      "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 IANA, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: Europe/Moscow, Asia/Novosibirsk"
    );
  });
  bot.on("message:text", async (ctx, next) => {
    const step = ctx.session.step;
    if (step === "awaiting_working_hours") {
      ctx.session.step = void 0;
      const parts = ctx.message.text.trim().split(/\s+/);
      const from = parseInt(parts[0]);
      const to = parseInt(parts[1]);
      if (isNaN(from) || isNaN(to) || from < 0 || to > 24 || from >= to) {
        await ctx.reply('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430: "9 22"');
        return;
      }
      const user = getDbUser3(ctx);
      await userService2.updateSettings(user.id, {
        workingHoursEnabled: true,
        workingHoursFrom: from,
        workingHoursTo: to
      });
      await ctx.reply(`\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B: ${from}:00\u2013${to}:00`);
      return;
    }
    if (step === "awaiting_timezone") {
      ctx.session.step = void 0;
      const tz = ctx.message.text.trim();
      const user = getDbUser3(ctx);
      await userService2.updateSettings(user.id, { timezone: tz });
      await ctx.reply(`\u0427\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D: ${tz}`);
      return;
    }
    return next();
  });
}

// src/controllers/favorites.controller.ts
var import_grammy2 = require("grammy");
function getDbUser4(ctx) {
  return ctx.dbUser;
}
function registerFavoritesController(bot, favoriteRepo, listingRepo) {
  bot.command("favorites", async (ctx) => {
    const user = getDbUser4(ctx);
    const favorites = await favoriteRepo.findByUser(user.id);
    if (favorites.length === 0) {
      await ctx.reply(
        "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439.\n\n\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u0432 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\u0445."
      );
      return;
    }
    const lines = favorites.slice(0, 10).map((f, i) => {
      const priceStr = f.listing.price ? ` \u2014 ${f.listing.price}` : "";
      return `${i + 1}. <a href="${f.listing.url}">${f.listing.title}</a>${priceStr}`;
    });
    const text = `<b>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 (${favorites.length})</b>

${lines.join("\n\n")}`;
    const keyboard = new import_grammy2.InlineKeyboard().text("\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", "clear_favorites");
    await ctx.reply(text, {
      parse_mode: "HTML",
      reply_markup: keyboard,
      link_preview_options: { is_disabled: true }
    });
  });
  bot.callbackQuery("clear_favorites", async (ctx) => {
    await ctx.answerCallbackQuery();
    const user = getDbUser4(ctx);
    await favoriteRepo.clearByUser(user.id);
    await ctx.editMessageText("\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043E.");
  });
  bot.callbackQuery(/^fav:(\d+)$/, async (ctx) => {
    const user = getDbUser4(ctx);
    const listingId = parseInt(ctx.match[1]);
    const listing = await listingRepo.findById(listingId);
    if (!listing) {
      await ctx.answerCallbackQuery({ text: "\u041E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E." });
      return;
    }
    const existing = await favoriteRepo.findByUserId(user.id);
    const alreadySaved = existing.some((f) => f.listingId === listingId);
    if (alreadySaved) {
      await ctx.answerCallbackQuery({ text: "\u0423\u0436\u0435 \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C." });
      return;
    }
    await favoriteRepo.add(user.id, listingId);
    await ctx.answerCallbackQuery({ text: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435!" });
  });
}

// src/controllers/stats.controller.ts
function getDbUser5(ctx) {
  return ctx.dbUser;
}
function registerStatsController(bot, _userRepo, searchRepo, notifRepo) {
  bot.command("stats", async (ctx) => {
    const user = getDbUser5(ctx);
    const limits = PLAN_LIMITS[user.plan];
    const [searches, todayNotifs, totalNotifs] = await Promise.all([
      searchRepo.findActiveByUser(user.id),
      notifRepo.countTodayByUser(user.id),
      notifRepo.countTotalByUser(user.id)
    ]);
    const dailyLimit = limits.maxDailyNotifications === null ? "\u221E" : String(limits.maxDailyNotifications);
    const searchLimit = limits.maxSearches === null ? "\u221E" : String(limits.maxSearches);
    const planExpiry = user.plan !== "FREE" && user.subscriptionUntil ? `
\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u0434\u043E: <b>${formatDate(user.subscriptionUntil)}</b>` : "";
    const text = `<b>\u0412\u0430\u0448\u0430 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430</b>

\u0422\u0430\u0440\u0438\u0444: <b>${PLAN_NAMES[user.plan]}</b>${planExpiry}

\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432: <b>${searches.length}</b> / ${searchLimit}
\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: <b>${todayNotifs}</b> / ${dailyLimit}
\u0412\u0441\u0435\u0433\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439: <b>${totalNotifs}</b>

\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D: <b>${formatDate(user.createdAt)}</b>`;
    await ctx.reply(text, { parse_mode: "HTML" });
  });
  bot.hears("\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430", async (ctx) => {
    const user = getDbUser5(ctx);
    const limits = PLAN_LIMITS[user.plan];
    const [searches, todayNotifs] = await Promise.all([
      searchRepo.findActiveByUser(user.id),
      notifRepo.countTodayByUser(user.id)
    ]);
    const dailyLimit = limits.maxDailyNotifications === null ? "\u221E" : String(limits.maxDailyNotifications);
    const searchLimit = limits.maxSearches === null ? "\u221E" : String(limits.maxSearches);
    await ctx.reply(
      `\u0422\u0430\u0440\u0438\u0444: <b>${PLAN_NAMES[user.plan]}</b>
\u041F\u043E\u0438\u0441\u043A\u043E\u0432: <b>${searches.length}</b> / ${searchLimit}
\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: <b>${todayNotifs}</b> / ${dailyLimit}`,
      { parse_mode: "HTML" }
    );
  });
}

// src/controllers/support.controller.ts
function getDbUser6(ctx) {
  return ctx.dbUser;
}
function registerSupportController(bot, adminNotif) {
  bot.hears("\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", async (ctx) => {
    ctx.session.step = "awaiting_support_message";
    await ctx.reply(
      '\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u0432\u043E\u043F\u0440\u043E\u0441.\n\n\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 "-" \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B.'
    );
  });
  bot.command("support", async (ctx) => {
    ctx.session.step = "awaiting_support_message";
    await ctx.reply(
      '\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u0432\u043E\u043F\u0440\u043E\u0441.\n\n\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 "-" \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B.'
    );
  });
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step !== "awaiting_support_message") return next();
    ctx.session.step = void 0;
    const message = ctx.message.text.trim();
    if (message === "-") {
      await ctx.reply("\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E.");
      return;
    }
    const user = getDbUser6(ctx);
    try {
      await adminNotif.notifySupportRequest(user, message);
      await ctx.reply("\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443. \u041C\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432\u0430\u043C.");
    } catch (err) {
      logger.error("Support message error", err);
      await ctx.reply("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.");
    }
  });
}

// src/controllers/referral.controller.ts
function getDbUser7(ctx) {
  return ctx.dbUser;
}
function registerReferralController(bot, referralService2) {
  bot.command("referral", async (ctx) => {
    const user = getDbUser7(ctx);
    const stats = await referralService2.getStats(user.id);
    const link = `https://t.me/${config.BOT_USERNAME}?start=ref_${user.telegramId}`;
    const text = `<b>\u0420\u0435\u0444\u0435\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430</b>

\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0430\u0439\u0442\u0435 \u0434\u0440\u0443\u0437\u0435\u0439 \u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0431\u043E\u043D\u0443\u0441\u044B:
\u2022 \u0417\u0430 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0440\u0435\u0444\u0435\u0440\u0430\u043B\u0430 \u2014 <b>+7 \u0434\u043D\u0435\u0439</b> \u043A \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0435
\u2022 \u0417\u0430 5 \u0440\u0435\u0444\u0435\u0440\u0430\u043B\u043E\u0432 \u2014 <b>1 \u043C\u0435\u0441\u044F\u0446 PRO</b> \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E

\u0412\u0430\u0448\u0430 \u0441\u0441\u044B\u043B\u043A\u0430:
<code>${link}</code>

\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u043E: <b>${stats.total}</b>
\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 (\u043E\u043F\u043B\u0430\u0442\u0438\u043B\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443): <b>${stats.active}</b>
\u0411\u043E\u043D\u0443\u0441\u043D\u044B\u0445 \u0434\u043D\u0435\u0439 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E: <b>${stats.bonusDaysEarned}</b>`;
    await ctx.reply(text, { parse_mode: "HTML" });
  });
}

// src/middlewares/admin.middleware.ts
async function adminMiddleware(ctx, next) {
  if (!ctx.from) return;
  if (BigInt(ctx.from.id) !== config.admin.telegramId) {
    await ctx.reply("\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u044D\u0442\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435.");
    return;
  }
  return next();
}
var adminGuard = adminMiddleware;

// src/controllers/admin.controller.ts
function getDbUser8(ctx) {
  return ctx.dbUser;
}
function registerAdminController(bot, userService2, subscriptionService, promoService, userRepo, searchRepo, notifRepo, adminLogRepo) {
  bot.command("admin", adminGuard, async (ctx) => {
    const [totalUsers, activeToday, planCounts, totalSearches] = await Promise.all([
      userRepo.countAll(),
      userRepo.countActiveToday(),
      userRepo.countByPlan(),
      searchRepo.countAll()
    ]);
    const text = [
      "\u041F\u0430\u043D\u0435\u043B\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430",
      "",
      `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ${totalUsers}`,
      `\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: ${activeToday}`,
      "",
      "\u041F\u043E \u0442\u0430\u0440\u0438\u0444\u0430\u043C:",
      `FREE: ${planCounts["FREE"] ?? 0}`,
      `START: ${planCounts["START"] ?? 0}`,
      `PRO: ${planCounts["PRO"] ?? 0}`,
      `UNLIMITED: ${planCounts["UNLIMITED"] ?? 0}`,
      "",
      `\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u043E\u0438\u0441\u043A\u043E\u0432: ${totalSearches}`
    ].join("\n");
    await ctx.reply(text, { reply_markup: adminMenuKeyboard() });
    await adminLogRepo.log("ADMIN_PANEL", "opened", getDbUser8(ctx).id);
  });
  bot.command("ban", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /ban <telegramId>");
      return;
    }
    try {
      await userService2.banUser(telegramId);
      await ctx.reply(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${telegramId} \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D.`);
      await adminLogRepo.log("BAN_USER", `telegramId:${telegramId}`, getDbUser8(ctx).id);
    } catch {
      await ctx.reply("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
  });
  bot.command("unban", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /unban <telegramId>");
      return;
    }
    try {
      await userService2.unbanUser(telegramId);
      await ctx.reply(`\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${telegramId} \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D.`);
      await adminLogRepo.log("UNBAN_USER", `telegramId:${telegramId}`, getDbUser8(ctx).id);
    } catch {
      await ctx.reply("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
  });
  bot.command("setplan", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const [telegramId, planStr] = args;
    const validPlans = ["FREE", "START", "PRO", "UNLIMITED"];
    if (!telegramId || !planStr || !validPlans.includes(planStr)) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /setplan <telegramId> <FREE|START|PRO|UNLIMITED>");
      return;
    }
    try {
      await subscriptionService.setPlanAdmin(telegramId, planStr);
      await ctx.reply(`\u0422\u0430\u0440\u0438\u0444 ${telegramId} \u0438\u0437\u043C\u0435\u043D\u0451\u043D \u043D\u0430 ${planStr}.`);
      await adminLogRepo.log("SET_PLAN", `telegramId:${telegramId} plan:${planStr}`, getDbUser8(ctx).id);
    } catch {
      await ctx.reply("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
  });
  bot.command("userinfo", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const telegramId = args[0];
    if (!telegramId) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /userinfo <telegramId>");
      return;
    }
    try {
      const user = await userRepo.findByTelegramId(telegramId);
      if (!user) throw new Error("not found");
      const [searchCount, totalNotifs] = await Promise.all([
        searchRepo.countByUser(user.id),
        notifRepo.countTotalByUser(user.id)
      ]);
      const text = [
        `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${formatUserMention(user)} (${user.telegramId})`,
        `\u0422\u0430\u0440\u0438\u0444: ${user.plan}`,
        `\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u0434\u043E: ${user.subscriptionUntil ? formatDate(user.subscriptionUntil) : "N/A"}`,
        `\u0417\u0430\u0431\u0430\u043D\u0435\u043D: ${user.isBanned ? `\u0434\u0430 (${user.banReason ?? ""})` : "\u043D\u0435\u0442"}`,
        `\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F: ${formatDate(user.createdAt)}`,
        `\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C: ${formatDate(user.lastActiveAt)}`,
        "",
        `\u041F\u043E\u0438\u0441\u043A\u043E\u0432: ${searchCount}`,
        `\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 \u0432\u0441\u0435\u0433\u043E: ${totalNotifs}`
      ].join("\n");
      await ctx.reply(text);
    } catch {
      await ctx.reply("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
  });
  bot.command("broadcast", adminGuard, async (ctx) => {
    const text = ctx.message?.text?.replace(/^\/broadcast\s*/, "").trim();
    if (!text) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /broadcast <\u0442\u0435\u043A\u0441\u0442>");
      return;
    }
    ctx.session.step = `broadcast:${text}`;
    await ctx.reply(
      `\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438:

${text}

\u041E\u0442\u0432\u0435\u0442\u044C\u0442\u0435 "\u0434\u0430" \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0438\u043B\u0438 "\u043D\u0435\u0442" \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B.`
    );
  });
  bot.on("message:text", async (ctx, next) => {
    const step = ctx.session.step;
    if (!step?.startsWith("broadcast:")) return next();
    const text = step.slice("broadcast:".length);
    const answer = ctx.message.text.trim().toLowerCase();
    ctx.session.step = void 0;
    if (answer !== "\u0434\u0430") {
      await ctx.reply("\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430.");
      return;
    }
    await ctx.reply("\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u0430...");
    const users = await userRepo.findAllActive();
    let sent = 0;
    let failed = 0;
    for (const user of users) {
      try {
        await bot.api.sendMessage(Number(user.telegramId), text);
        sent++;
        if (sent % 25 === 0) await new Promise((r) => setTimeout(r, 1e3));
      } catch {
        failed++;
      }
    }
    await ctx.reply(`\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430.
\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E: ${sent}
\u041E\u0448\u0438\u0431\u043E\u043A: ${failed}`);
    await adminLogRepo.log(
      "BROADCAST",
      `sent:${sent} failed:${failed} preview:${text.slice(0, 80)}`,
      getDbUser8(ctx).id
    );
  });
  bot.command("createpromo", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const [code, plan, daysStr, maxUsesStr] = args;
    const validPlans = ["FREE", "START", "PRO", "UNLIMITED"];
    if (!code || !plan || !daysStr || !validPlans.includes(plan)) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /createpromo <\u041A\u041E\u0414> <FREE|START|PRO|UNLIMITED> <\u0434\u043D\u0435\u0439> [maxUses]");
      return;
    }
    const days = parseInt(daysStr, 10);
    const maxUses = maxUsesStr ? parseInt(maxUsesStr, 10) : 100;
    try {
      const promo = await promoService.createPromo(code.toUpperCase(), plan, days, maxUses);
      await ctx.reply(
        `\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u0441\u043E\u0437\u0434\u0430\u043D:
\u041A\u043E\u0434: ${promo.code}
\u0422\u0430\u0440\u0438\u0444: ${promo.planGranted}
\u0414\u043D\u0435\u0439: ${promo.daysGranted}
\u041C\u0430\u043A\u0441. \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0439: ${promo.maxUses}`
      );
      await adminLogRepo.log("CREATE_PROMO", `code:${code} plan:${plan}`, getDbUser8(ctx).id);
    } catch (err) {
      await ctx.reply(`\u041E\u0448\u0438\u0431\u043A\u0430: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
  bot.command("deletepromo", adminGuard, async (ctx) => {
    const args = ctx.message?.text?.split(" ").slice(1) ?? [];
    const code = args[0]?.toUpperCase();
    if (!code) {
      await ctx.reply("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435: /deletepromo <\u041A\u041E\u0414>");
      return;
    }
    try {
      await promoService.deletePromo(code);
      await ctx.reply(`\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 ${code} \u0434\u0435\u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D.`);
      await adminLogRepo.log("DELETE_PROMO", `code:${code}`, getDbUser8(ctx).id);
    } catch (err) {
      await ctx.reply(`\u041E\u0448\u0438\u0431\u043A\u0430: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
  bot.command("listpromos", adminGuard, async (ctx) => {
    const promos = await promoService.listAll();
    if (promos.length === 0) {
      await ctx.reply("\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432.");
      return;
    }
    const lines = promos.map(
      (p) => `${p.code} \u2014 ${p.planGranted}, ${p.daysGranted}\u0434, ${p.usedCount}/${p.maxUses} \u0438\u0441\u043F\u043E\u043B\u044C\u0437.`
    );
    await ctx.reply(`\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u044B (${promos.length}):

${lines.join("\n")}`);
  });
  bot.command("globalstats", adminGuard, async (ctx) => {
    const [totalUsers, planCounts, totalSearches, activeToday] = await Promise.all([
      userRepo.countAll(),
      userRepo.countByPlan(),
      searchRepo.countAll(),
      userRepo.countActiveToday()
    ]);
    const text = [
      "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
      "",
      `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ${totalUsers}`,
      `\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: ${activeToday}`,
      "",
      `FREE: ${planCounts["FREE"] ?? 0}`,
      `START: ${planCounts["START"] ?? 0}`,
      `PRO: ${planCounts["PRO"] ?? 0}`,
      `UNLIMITED: ${planCounts["UNLIMITED"] ?? 0}`,
      "",
      `\u041F\u043E\u0438\u0441\u043A\u043E\u0432 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445: ${totalSearches}`
    ].join("\n");
    await ctx.reply(text);
  });
  bot.callbackQuery("admin:stats", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const stats = await userService2.getStats();
    await ctx.reply(
      `\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430

\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ${stats.total}
\u041D\u043E\u0432\u044B\u0445 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: ${stats.newToday}
\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445: ${stats.activeToday}
\u041F\u043B\u0430\u0442\u043D\u044B\u0445: ${stats.paid}
\u0417\u0430\u0431\u0430\u043D\u0435\u043D\u043D\u044B\u0445: ${stats.banned}`
    );
  });
  bot.callbackQuery("admin:payments", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 /globalstats");
  });
  bot.callbackQuery("admin:users", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 /userinfo <telegramId>");
  });
  bot.callbackQuery("admin:logs", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery();
    const logs = await adminLogRepo.findRecent(10);
    if (logs.length === 0) {
      await ctx.reply("\u041B\u043E\u0433\u0438 \u043F\u0443\u0441\u0442\u044B.");
      return;
    }
    const lines = logs.map((l) => `${formatDate(l.createdAt)} | ${l.action} | ${l.details ?? ""}`);
    await ctx.reply(`\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043B\u043E\u0433\u0438:

${lines.join("\n")}`);
  });
  bot.callbackQuery("admin:broadcast_hint", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery("\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 /broadcast <\u0442\u0435\u043A\u0441\u0442>");
  });
  bot.callbackQuery("admin:settings", adminGuard, async (ctx) => {
    await ctx.answerCallbackQuery("\u0420\u0430\u0437\u0434\u0435\u043B \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435");
  });
}

// src/cron/checker.cron.ts
var import_node_cron = __toESM(require("node-cron"));

// src/parsers/avito.parser.ts
var cheerio = __toESM(require("cheerio"));

// src/parsers/base.parser.ts
var import_axios = __toESM(require("axios"));

// src/utils/retry.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function withRetry(fn, maxAttempts = 3, delayMs = 1e3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await sleep(delayMs * attempt);
      }
    }
  }
  throw lastError;
}
async function withTimeout(fn, ms) {
  const timeout = new Promise(
    (_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([fn, timeout]);
}

// src/parsers/base.parser.ts
var BaseParser = class {
  http;
  timeoutMs = 15e3;
  constructor() {
    this.http = import_axios.default.create({
      timeout: this.timeoutMs,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Cache-Control": "no-cache"
      }
    });
  }
  async fetchHtml(url) {
    const response = await withTimeout(
      this.http.get(url),
      this.timeoutMs
    );
    return response.data;
  }
  safeLog(msg, err) {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
};

// src/utils/hash.ts
var import_crypto = require("crypto");
function hashListing(title, price, url) {
  const raw = `${title}|${price ?? ""}|${url}`;
  return (0, import_crypto.createHash)("sha256").update(raw).digest("hex").slice(0, 32);
}

// src/parsers/avito.parser.ts
var AvitoParser = class extends BaseParser {
  async parse(url) {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    const listings = [];
    $('[data-marker="item"]').each((_, el) => {
      try {
        const $el = $(el);
        const externalId = $el.attr("data-item-id") ?? $el.find("[data-item-id]").first().attr("data-item-id") ?? null;
        const titleEl = $el.find('[itemprop="name"], [data-marker="item-title"]').first();
        const title = titleEl.text().trim();
        if (!title) return;
        const priceEl = $el.find('[data-marker="item-price"] meta[itemprop="price"]');
        const price = priceEl.attr("content") ? `${priceEl.attr("content")} \u20BD` : $el.find('[data-marker="item-price"]').first().text().trim() || void 0;
        const locationEl = $el.find('[data-marker="item-address"] span, [class*="geo-address"]').first();
        const location = locationEl.text().trim() || void 0;
        const imageEl = $el.find('img[itemprop="image"], img[data-src]').first();
        const imageUrl = imageEl.attr("src") ?? imageEl.attr("data-src") ?? void 0;
        const linkEl = $el.find('a[itemprop="url"], a[data-marker="item-title"]').first();
        const href = linkEl.attr("href");
        if (!href) return;
        const fullUrl = href.startsWith("http") ? href : `https://www.avito.ru${href}`;
        const dateEl = $el.find('[data-marker="item-date"]').first();
        const dateStr = dateEl.attr("datetime") ?? dateEl.text().trim();
        const publishedAt = dateStr ? parseAvitoDate(dateStr) : void 0;
        const finalExternalId = externalId ?? hashListing(title, price, fullUrl);
        listings.push({
          externalId: finalExternalId,
          title,
          price,
          location,
          imageUrl: imageUrl && !imageUrl.includes("data:") ? imageUrl : void 0,
          url: fullUrl,
          publishedAt
        });
      } catch (err) {
        this.safeLog("Failed to parse Avito item", err);
      }
    });
    return listings;
  }
};
function parseAvitoDate(str) {
  try {
    const d = new Date(str);
    if (!isNaN(d.getTime())) return d;
    return void 0;
  } catch {
    return void 0;
  }
}

// src/parsers/cian.parser.ts
var cheerio2 = __toESM(require("cheerio"));
var CianParser = class extends BaseParser {
  async parse(url) {
    const html = await this.fetchHtml(url);
    const $ = cheerio2.load(html);
    const listings = [];
    const nextDataScript = $("#__NEXT_DATA__").html();
    if (nextDataScript) {
      try {
        const json = JSON.parse(nextDataScript);
        const offers = extractCianOffers(json);
        return offers;
      } catch {
        this.safeLog("Failed to parse Cian __NEXT_DATA__");
      }
    }
    $('[data-name="Offers"] article, [class*="offer-container"]').each((_, el) => {
      try {
        const $el = $(el);
        const externalId = $el.attr("data-id") ?? null;
        const title = $el.find('[data-name="TitleComponent"], h3').first().text().trim();
        if (!title) return;
        const price = $el.find('[data-name="PriceInfo"]').first().text().trim() || void 0;
        const location = $el.find('[data-name="AddressContainer"], [class*="address"]').first().text().trim() || void 0;
        const imageEl = $el.find("img").first();
        const imageUrl = imageEl.attr("src") ?? imageEl.attr("data-src") ?? void 0;
        const linkEl = $el.find("a").first();
        const href = linkEl.attr("href");
        if (!href) return;
        const fullUrl = href.startsWith("http") ? href : `https://cian.ru${href}`;
        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl,
          url: fullUrl
        });
      } catch (err) {
        this.safeLog("Failed to parse Cian item", err);
      }
    });
    return listings;
  }
};
function extractCianOffers(json) {
  const results = [];
  try {
    const props = json["props"];
    const pageProps = props?.["pageProps"];
    const initialState = pageProps?.["initialState"];
    const offers = initialState?.["results"]?.["offers"];
    if (!Array.isArray(offers)) return results;
    for (const offer of offers) {
      if (!offer.title || !offer.fullUrl) continue;
      results.push({
        externalId: offer.id ? String(offer.id) : hashListing(offer.title, String(offer.priceRur ?? ""), offer.fullUrl),
        title: offer.title,
        price: offer.priceRur ? `${offer.priceRur.toLocaleString("ru-RU")} \u20BD` : void 0,
        location: offer.address,
        imageUrl: offer.photos?.[0]?.thumbnailUrl,
        url: offer.fullUrl,
        publishedAt: offer.publishedUsermtime ? new Date(offer.publishedUsermtime) : void 0
      });
    }
  } catch {
  }
  return results;
}

// src/parsers/youla.parser.ts
var cheerio3 = __toESM(require("cheerio"));
var YoulaParser = class extends BaseParser {
  async parse(url) {
    const html = await this.fetchHtml(url);
    const $ = cheerio3.load(html);
    const listings = [];
    const stateScript = $("script").filter((_, el) => {
      return $(el).html()?.includes("__YOULA_STATE__") ?? false;
    }).first().html();
    if (stateScript) {
      try {
        const match = stateScript.match(/window\.__YOULA_STATE__\s*=\s*({.+?});?\s*<\/script>/s);
        if (match?.[1]) {
          const parsed = JSON.parse(match[1]);
          const items = extractYoulaItems(parsed);
          if (items.length > 0) return items;
        }
      } catch {
        this.safeLog("Failed to parse Youla state JSON");
      }
    }
    $('[class*="ProductCard"], [class*="product-card"], article').each((_, el) => {
      try {
        const $el = $(el);
        const linkEl = $el.find('a[href*="/product/"]').first();
        const href = linkEl.attr("href");
        if (!href) return;
        const fullUrl = href.startsWith("http") ? href : `https://youla.ru${href}`;
        const idMatch = href.match(/\/product\/([a-f0-9]+)/i);
        const externalId = idMatch?.[1] ?? null;
        const title = $el.find('[class*="title"], [class*="name"], h3').first().text().trim();
        if (!title) return;
        const price = $el.find('[class*="price"]').first().text().trim() || void 0;
        const location = $el.find('[class*="location"], [class*="city"]').first().text().trim() || void 0;
        const imageEl = $el.find("img").first();
        const imageUrl = imageEl.attr("src") ?? imageEl.attr("data-src") ?? void 0;
        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl,
          url: fullUrl
        });
      } catch (err) {
        this.safeLog("Failed to parse Youla item", err);
      }
    });
    return listings;
  }
};
function extractYoulaItems(state) {
  const results = [];
  try {
    const products = findDeepArray(state, "products");
    for (const p of products) {
      if (!p.name) continue;
      const url = p.url ? p.url.startsWith("http") ? p.url : `https://youla.ru${p.url}` : "";
      if (!url) continue;
      results.push({
        externalId: p.id ?? hashListing(p.name, String(p.price ?? ""), url),
        title: p.name,
        price: p.price ? `${p.price.toLocaleString("ru-RU")} \u20BD` : void 0,
        location: p.city?.name,
        imageUrl: p.images?.[0]?.url,
        url,
        publishedAt: p.dateCreated ? new Date(p.dateCreated) : void 0
      });
    }
  } catch {
  }
  return results;
}
function findDeepArray(obj, key) {
  if (Array.isArray(obj[key])) return obj[key];
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      const found = findDeepArray(val, key);
      if (found.length > 0) return found;
    }
  }
  return [];
}

// src/parsers/autoru.parser.ts
var cheerio4 = __toESM(require("cheerio"));
var AutoRuParser = class extends BaseParser {
  async parse(url) {
    const html = await this.fetchHtml(url);
    const $ = cheerio4.load(html);
    const listings = [];
    $("script").each((_, el) => {
      const content = $(el).html() ?? "";
      if (!content.includes("__INITIAL_STATE__")) return;
      const match = content.match(/window\.__INITIAL_STATE__\s*=\s*({[\s\S]+?});?\s*(?:window\.|<\/script>)/);
      if (!match?.[1]) return;
      try {
        const state = JSON.parse(match[1]);
        const items = extractAutoRuListings(state);
        listings.push(...items);
      } catch {
      }
    });
    if (listings.length > 0) return listings;
    $('[class*="ListingItem"], [class*="listing-item"]').each((_, el) => {
      try {
        const $el = $(el);
        const linkEl = $el.find('a[href*="auto.ru"]').first();
        const href = linkEl.attr("href");
        if (!href) return;
        const fullUrl = href.startsWith("http") ? href : `https://auto.ru${href}`;
        const idMatch = href.match(/\/(\d+)-/);
        const externalId = idMatch?.[1] ?? null;
        const title = $el.find('[class*="title"], [class*="name"], h3').first().text().trim();
        if (!title) return;
        const price = $el.find('[class*="price"]').first().text().trim() || void 0;
        const location = $el.find('[class*="location"]').first().text().trim() || void 0;
        const imageEl = $el.find("img").first();
        const imageUrl = imageEl.attr("src") ?? imageEl.attr("data-src") ?? void 0;
        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl: imageUrl && !imageUrl.includes("placeholder") ? imageUrl : void 0,
          url: fullUrl
        });
      } catch (err) {
        this.safeLog("Failed to parse Auto.ru item", err);
      }
    });
    return listings;
  }
};
function extractAutoRuListings(state) {
  const results = [];
  try {
    const listing = state["listing"] ?? state["search"];
    const listingData = listing?.["data"];
    const offers = listingData?.["offers"] ?? listing?.["offers"];
    if (!Array.isArray(offers)) return results;
    for (const offer of offers) {
      const mark = offer.vehicle_info?.mark_info?.name ?? "";
      const model = offer.vehicle_info?.model_info?.name ?? "";
      const year = offer.vehicle_info?.tech_param?.year;
      const title = [mark, model, year ? String(year) : ""].filter(Boolean).join(" ");
      if (!title) continue;
      const price = offer.price_info?.price ? `${offer.price_info.price.toLocaleString("ru-RU")} \u20BD` : void 0;
      const location = offer.seller?.location?.region_info?.name;
      const photo = offer.main_photo?.sizes?.["460x345"] ?? offer.main_photo?.sizes?.["small"];
      const url = offer.url ?? "";
      const publishedAt = offer.created ? new Date(offer.created * 1e3) : void 0;
      results.push({
        externalId: offer.id ?? hashListing(title, price, url),
        title,
        price,
        location,
        imageUrl: photo,
        url,
        publishedAt
      });
    }
  } catch {
  }
  return results;
}

// src/parsers/parser.factory.ts
var ParserFactory = class {
  static create(platform) {
    switch (platform) {
      case "AVITO":
        return new AvitoParser();
      case "CIAN":
        return new CianParser();
      case "YOULA":
        return new YoulaParser();
      case "AUTORU":
        return new AutoRuParser();
      default: {
        const _exhaustive = platform;
        throw new Error(`Unknown platform: ${String(_exhaustive)}`);
      }
    }
  }
};

// src/cron/checker.cron.ts
var CheckerCron = class {
  searchRepo;
  listingRepo;
  notifService;
  subService;
  adminNotifService;
  bot;
  isRunning = false;
  constructor(bot, adminNotifService2) {
    this.searchRepo = new SearchRepository();
    this.listingRepo = new ListingRepository();
    this.notifService = new NotificationService();
    this.subService = new SubscriptionService();
    this.adminNotifService = adminNotifService2;
    this.bot = bot;
    this.notifService.setBot(bot);
  }
  start() {
    import_node_cron.default.schedule("* * * * *", () => {
      if (this.isRunning) return;
      this.isRunning = true;
      this.run().catch((err) => {
        logger.error("Checker cron crashed", err);
        void this.adminNotifService.notifyCriticalCronError("checker", String(err));
      }).finally(() => {
        this.isRunning = false;
      });
    });
    logger.info("Checker cron started");
  }
  async run() {
    const now = /* @__PURE__ */ new Date();
    const rawSearches = await this.searchRepo.findAllActiveForCron();
    for (const raw of rawSearches) {
      const search = raw;
      const user = search.user;
      if (!user || user.isBanned) continue;
      const effectivePlan = this.subService.effectivePlan(user);
      const interval = PLAN_LIMITS[effectivePlan].checkIntervalMinutes;
      if (search.lastCheckedAt) {
        const diffMinutes = (now.getTime() - search.lastCheckedAt.getTime()) / 6e4;
        if (diffMinutes < interval) continue;
      }
      await this.processSearch(search, user);
    }
  }
  async processSearch(search, user) {
    const start = Date.now();
    try {
      const parser = ParserFactory.create(search.platform);
      const listings = await withRetry(() => parser.parse(search.url), 3, 2e3);
      await this.searchRepo.updateLastChecked(search.id);
      if (search.errorCount > 0) {
        await this.searchRepo.resetError(search.id);
      }
      let newCount = 0;
      for (const parsed of listings) {
        const { listing, isNew } = await this.listingRepo.upsert(
          search.id,
          parsed.externalId,
          {
            title: parsed.title,
            price: parsed.price ?? null,
            location: parsed.location ?? null,
            imageUrl: parsed.imageUrl ?? null,
            url: parsed.url,
            platform: search.platform,
            publishedAt: parsed.publishedAt ?? null
          }
        );
        if (!isNew) continue;
        newCount++;
        await this.searchRepo.update(search.id, { lastFoundAt: /* @__PURE__ */ new Date() });
        const settings = search.user.settings;
        await this.notifService.sendListingNotification(user, search, listing, settings);
      }
      await prisma.parserLog.create({
        data: {
          platform: search.platform,
          searchId: search.id,
          success: true,
          duration: Date.now() - start
        }
      });
      if (newCount > 0) {
        logger.debug(`Search ${search.id}: found ${newCount} new listings`);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const updated = await this.searchRepo.incrementError(search.id, errorMsg);
      await prisma.parserLog.create({
        data: {
          platform: search.platform,
          searchId: search.id,
          success: false,
          error: errorMsg,
          duration: Date.now() - start
        }
      });
      if (updated.errorCount >= 3) {
        await this.searchRepo.setStatus(search.id, "ERROR");
        try {
          await this.bot.api.sendMessage(Number(user.telegramId), "\u041F\u043E\u0438\u0441\u043A \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443.");
        } catch {
        }
        await this.adminNotifService.notifyParserError(
          search.platform,
          search.id,
          errorMsg
        );
      }
      logger.error(`Parser error for search ${search.id}: ${errorMsg}`);
    }
  }
};

// src/cron/subscription.cron.ts
var import_node_cron2 = __toESM(require("node-cron"));
var SubscriptionCron = class {
  subService;
  adminNotifService;
  bot;
  constructor(bot, adminNotifService2) {
    this.subService = new SubscriptionService();
    this.adminNotifService = adminNotifService2;
    this.bot = bot;
  }
  start() {
    import_node_cron2.default.schedule("0 * * * *", () => {
      this.subService.expireSubscriptions(async (telegramId, message) => {
        try {
          await this.bot.api.sendMessage(Number(telegramId), message);
        } catch (err) {
          logger.warn(`Could not notify user ${telegramId} about expiry`, err);
        }
      }).catch((err) => {
        logger.error("Subscription expiry cron error", err);
        void this.adminNotifService.notifyCriticalCronError("subscription_expiry", String(err));
      });
    });
    logger.info("Subscription cron started");
  }
};

// src/cron/daily-reset.cron.ts
var import_node_cron3 = __toESM(require("node-cron"));
var DailyResetCron = class {
  subService;
  userService;
  adminNotifService;
  bot;
  constructor(bot, adminNotifService2) {
    this.subService = new SubscriptionService();
    this.userService = new UserService();
    this.adminNotifService = adminNotifService2;
    this.bot = bot;
  }
  start() {
    import_node_cron3.default.schedule("0 21 * * *", () => {
      this.subService.resetDailyNotifications().catch((err) => {
        logger.error("Daily reset cron error", err);
        void this.adminNotifService.notifyCriticalCronError("daily_reset", String(err));
      });
    });
    import_node_cron3.default.schedule("0 20 * * *", () => {
      this.sendDailyDigests().catch((err) => {
        logger.error("Daily digest cron error", err);
      });
    });
    logger.info("Daily reset cron started");
  }
  async sendDailyDigests() {
    const users = await this.userService.getAllActive();
    for (const user of users) {
      try {
        const settings = await this.userService.getSettings(user.id);
        if (!settings.digestMode) continue;
        const summary = `\u0421\u0432\u043E\u0434\u043A\u0430 \u0437\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: \u043D\u043E\u0432\u044B\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043E \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0438\u0441\u043A\u0430\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 "\u041C\u043E\u0438 \u043F\u043E\u0438\u0441\u043A\u0438".`;
        await this.bot.api.sendMessage(Number(user.telegramId), summary);
      } catch {
      }
    }
  }
};

// src/cron/queue-flush.cron.ts
var import_node_cron4 = __toESM(require("node-cron"));
var QueueFlushCron = class {
  userService;
  notifService;
  adminNotifService;
  constructor(bot, adminNotifService2) {
    this.userService = new UserService();
    this.notifService = new NotificationService();
    this.adminNotifService = adminNotifService2;
    this.notifService.setBot(bot);
  }
  start() {
    import_node_cron4.default.schedule("*/5 * * * *", () => {
      this.flush().catch((err) => {
        logger.error("Queue flush cron error", err);
        void this.adminNotifService.notifyCriticalCronError("queue_flush", String(err));
      });
    });
    logger.info("Queue flush cron started");
  }
  async flush() {
    const users = await this.userService.getAllActive();
    for (const user of users) {
      try {
        const settings = await this.userService.getSettings(user.id);
        await this.notifService.flushQueue(user, settings);
      } catch {
      }
    }
  }
};

// src/index.ts
async function main() {
  logger.info("Starting SearchBot...");
  const bot = new import_grammy3.Bot(config.BOT_TOKEN);
  const adminNotif = new AdminNotificationService(bot);
  const userService2 = new UserService();
  const subscriptionService = new SubscriptionService();
  const notifService = new NotificationService();
  const paymentService = new PaymentService();
  const promoService = new PromoService();
  const referralService2 = new ReferralService();
  notifService.setBot(bot);
  adminNotif.setBot(bot);
  const userRepo = new UserRepository();
  const searchRepo = new SearchRepository();
  const listingRepo = new ListingRepository();
  const notifRepo = new NotificationRepository();
  const favoriteRepo = new FavoriteRepository();
  const adminLogRepo = new AdminLogRepository();
  bot.use(
    (0, import_grammy3.session)({
      initial: () => ({}),
      storage: new import_grammy3.MemorySessionStorage()
    })
  );
  bot.use(rateLimitMiddleware);
  bot.use(authMiddleware);
  registerStartController(bot);
  registerSearchController(bot);
  registerSubscriptionController(bot, subscriptionService, paymentService, promoService);
  registerSettingsController(bot, userService2);
  registerFavoritesController(bot, favoriteRepo, listingRepo);
  registerStatsController(bot, userRepo, searchRepo, notifRepo);
  registerSupportController(bot, adminNotif);
  registerReferralController(bot, referralService2);
  registerAdminController(
    bot,
    userService2,
    subscriptionService,
    promoService,
    userRepo,
    searchRepo,
    notifRepo,
    adminLogRepo
  );
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.step) return next();
    await ctx.reply("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 /start \u0434\u043B\u044F \u043F\u043E\u043C\u043E\u0449\u0438.");
  });
  bot.catch(async (err) => {
    const message = err.error instanceof Error ? err.error.message : String(err.error);
    logger.error("Unhandled bot error", { error: message });
    try {
      await err.ctx.reply(
        "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 /start."
      );
    } catch {
    }
  });
  new CheckerCron(bot, adminNotif).start();
  new SubscriptionCron(bot, adminNotif).start();
  new DailyResetCron(bot, adminNotif).start();
  new QueueFlushCron(bot, adminNotif).start();
  await bot.start({
    onStart: (info) => {
      logger.info(`Bot @${info.username} started`);
    }
  });
}
main().catch((err) => {
  logger.error("Fatal startup error", { err });
  process.exit(1);
});
