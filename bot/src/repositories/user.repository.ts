import type { Plan, Prisma, User, UserSettings } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class UserRepository {
  async findByTelegramId(telegramId: bigint | string): Promise<User | null> {
    return prisma.user.findUnique({ where: { telegramId: BigInt(telegramId) } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async upsert(telegramId: bigint, data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.upsert({
      where: { telegramId },
      create: data,
      update: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        lastActiveAt: new Date(),
      },
    });
  }

  async getSettings(userId: number): Promise<UserSettings | null> {
    return prisma.userSettings.findUnique({ where: { userId } });
  }

  async upsertSettings(
    userId: number,
    data: Prisma.UserSettingsUpdateInput,
  ): Promise<UserSettings> {
    return prisma.userSettings.upsert({
      where: { userId },
      create: {
        user: { connect: { id: userId } },
        ...(data as Omit<Prisma.UserSettingsCreateInput, 'user' | 'userId'>),
      },
      update: data,
    });
  }

  async countAll(): Promise<number> {
    return prisma.user.count();
  }

  /** Alias */
  async count(): Promise<number> {
    return prisma.user.count();
  }

  async countByPlan(): Promise<Record<string, number>> {
    const results = await prisma.user.groupBy({
      by: ['plan'],
      _count: { _all: true },
    });
    const map: Record<string, number> = {};
    for (const r of results) {
      map[r.plan] = r._count._all;
    }
    return map;
  }

  async countNewToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.user.count({ where: { createdAt: { gte: start } } });
  }

  async countActiveToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.user.count({ where: { lastActiveAt: { gte: start } } });
  }

  async countPaid(): Promise<number> {
    return prisma.user.count({ where: { plan: { not: 'FREE' } } });
  }

  async countBanned(): Promise<number> {
    return prisma.user.count({ where: { isBanned: true } });
  }

  async findAllActive(): Promise<User[]> {
    return prisma.user.findMany({ where: { isBanned: false } });
  }

  async findExpiredSubscriptions(): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        plan: { not: 'FREE' },
        subscriptionUntil: { lt: new Date() },
      },
    });
  }

  async resetDailyNotifications(): Promise<void> {
    await prisma.user.updateMany({
      data: {
        dailyNotificationCount: 0,
        dailyNotificationLimitResetAt: new Date(),
      },
    });
  }

  async incrementDailyNotification(id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { dailyNotificationCount: { increment: 1 } },
    });
  }

  async updateLimitNotifiedAt(id: number, at: Date): Promise<void> {
    await prisma.user.update({ where: { id }, data: { limitNotifiedAt: at } });
  }

  async setPlan(id: number, plan: Plan, days: number): Promise<User> {
    const now = new Date();
    let subscriptionUntil: Date | null = null;

    if (plan !== 'FREE') {
      const base = new Date();
      base.setDate(base.getDate() + days);
      subscriptionUntil = base;
    }

    return prisma.user.update({
      where: { id },
      data: { plan, subscriptionUntil, updatedAt: now },
    });
  }

  async findWithExpiredTrials(): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        plan: 'START',
        trialEndsAt: { lt: new Date() },
        trialUsed: true,
        subscriptionUntil: null,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
