import type { Plan, User } from '../generated/prisma/index';
import { UserRepository } from '../repositories/user.repository';
import { SearchRepository } from '../repositories/search.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { PLAN_LIMITS } from '../types/index';
import { config } from '../config/index';
import { logger } from '../utils/logger';

export class SubscriptionService {
  private userRepo: UserRepository;
  private searchRepo: SearchRepository;
  private adminLogRepo: AdminLogRepository;

  constructor(
    userRepo?: UserRepository,
    searchRepo?: SearchRepository,
    adminLogRepo?: AdminLogRepository,
  ) {
    this.userRepo = userRepo ?? new UserRepository();
    this.searchRepo = searchRepo ?? new SearchRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }

  /** Returns true if this user is a configured bot administrator — no limits apply. */
  isAdmin(user: User): boolean {
    return config.ADMIN_IDS.includes(user.telegramId);
  }

  isActive(user: User): boolean {
    if (user.plan === 'FREE') return true;
    if (!user.subscriptionUntil) return false;
    return user.subscriptionUntil > new Date();
  }

  effectivePlan(user: User): Plan {
    if (this.isAdmin(user)) return 'UNLIMITED';
    if (user.plan === 'FREE') return 'FREE';
    if (!this.isActive(user)) return 'FREE';
    return user.plan;
  }

  canAddSearch(user: User, currentCount: number): boolean {
    if (this.isAdmin(user)) return true;
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.maxSearches === null) return true;
    return currentCount < limits.maxSearches;
  }

  canUsePlatform(user: User, platformIndex: number): boolean {
    if (this.isAdmin(user)) return true;
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.allPlatforms || limits.maxPlatforms === null) return true;
    return platformIndex < limits.maxPlatforms;
  }

  canSendNotification(user: User): boolean {
    if (user.isBanned) return false;
    if (this.isAdmin(user)) return true;
    const plan = this.effectivePlan(user);
    const limits = PLAN_LIMITS[plan];
    if (limits.maxDailyNotifications === null) return true;

    const now = new Date();
    const resetAt = user.dailyNotificationLimitResetAt;
    const isNewDay = now.toDateString() !== resetAt.toDateString();

    const count = isNewDay ? 0 : user.dailyNotificationCount;
    return count < limits.maxDailyNotifications;
  }

  isWithinWorkingHours(
    settings: { workingHoursEnabled: boolean; workingHoursFrom: number; workingHoursTo: number; timezone: string } | null,
  ): boolean {
    if (!settings || !settings.workingHoursEnabled) return true;
    const now = new Date();
    const hour = new Date(
      now.toLocaleString('en-US', { timeZone: settings.timezone }),
    ).getHours();
    return hour >= settings.workingHoursFrom && hour < settings.workingHoursTo;
  }

  async expireSubscriptions(
    notifyFn: (telegramId: bigint, message: string) => Promise<void>,
  ): Promise<void> {
    const expired = await this.userRepo.findExpiredSubscriptions();
    for (const user of expired) {
      try {
        await this.userRepo.setPlan(user.id, 'FREE', 0);
        await this.searchRepo.deactivateExcessForUser(user.id, 1);
        await this.adminLogRepo.log('SUBSCRIPTION_EXPIRED', `plan:${user.plan}`, user.id);

        await notifyFn(
          user.telegramId,
          'Ваша подписка закончилась. Активным оставлен только 1 поиск Free.',
        );
        logger.info(`Subscription expired for user ${user.id}`);
      } catch (err) {
        logger.error(`Failed to expire subscription for user ${user.id}`, err);
      }
    }
  }

  async grantPlan(
    userId: number,
    plan: Plan,
    days: number,
    adminTelegramId?: bigint,
  ): Promise<User> {
    const user = await this.userRepo.setPlan(userId, plan, days);
    await this.adminLogRepo.log(
      'MANUAL_PLAN',
      `plan:${plan} days:${days} by:${adminTelegramId ?? 'system'}`,
      userId,
    );
    return user;
  }

  async resetDailyNotifications(): Promise<void> {
    await this.userRepo.resetDailyNotifications();
    logger.info('Daily notification counts reset');
  }

  /** Admin override: set plan by string telegramId */
  async setPlanAdmin(telegramId: string, plan: Plan): Promise<void> {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error('User not found');
    await this.grantPlan(user.id, plan, plan === 'FREE' ? 0 : 30);
  }
}
