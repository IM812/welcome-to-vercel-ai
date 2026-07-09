import type { User, UserSettings } from '../generated/prisma/index';
import type { User as TelegramUser } from 'grammy/types';
import { UserRepository } from '../repositories/user.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { logger } from '../utils/logger';

export class UserService {
  private userRepo: UserRepository;
  private adminLogRepo: AdminLogRepository;

  constructor(userRepo?: UserRepository, adminLogRepo?: AdminLogRepository) {
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }

  async getOrCreate(
    telegramUser: TelegramUser,
    referredByTelegramId?: bigint,
  ): Promise<{ user: User; isNew: boolean }> {
    const telegramId = BigInt(telegramUser.id);
    const existing = await this.userRepo.findByTelegramId(telegramId);

    if (existing) {
      await this.userRepo.update(existing.id, { lastActiveAt: new Date() });
      return { user: existing, isNew: false };
    }

    let referredByUserId: number | undefined;
    if (referredByTelegramId) {
      const referrer = await this.userRepo.findByTelegramId(referredByTelegramId);
      if (referrer) referredByUserId = referrer.id;
    }

    const trialStart = new Date();
    const trialEnd = new Date(trialStart.getTime() + 24 * 60 * 60 * 1000);

    const user = await this.userRepo.create({
      telegramId,
      username: telegramUser.username ?? null,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name ?? null,
      plan: 'START',
      subscriptionUntil: trialEnd,
      trialStartedAt: trialStart,
      trialEndsAt: trialEnd,
      trialUsed: true,
      ...(referredByUserId !== undefined
        ? { referredBy: { connect: { id: referredByUserId } } }
        : {}),
    });

    await this.userRepo.upsertSettings(user.id, {});

    logger.info(`New user registered: ${telegramUser.id} (@${telegramUser.username ?? 'none'})`);
    await this.adminLogRepo.log('NEW_USER', `TgID:${telegramUser.id}`, user.id);

    return { user, isNew: true };
  }

  async findByTelegramId(telegramId: bigint): Promise<User | null> {
    return this.userRepo.findByTelegramId(telegramId);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async getSettings(userId: number): Promise<UserSettings> {
    const settings = await this.userRepo.getSettings(userId);
    if (settings) return settings;
    return this.userRepo.upsertSettings(userId, {});
  }

  async updateSettings(
    userId: number,
    data: Partial<{
      silentMode: boolean;
      photoMode: boolean;
      digestMode: boolean;
      workingHoursEnabled: boolean;
      workingHoursFrom: number;
      workingHoursTo: number;
      timezone: string;
      language: string;
    }>,
  ): Promise<UserSettings> {
    return this.userRepo.upsertSettings(userId, data);
  }

  async count(): Promise<number> {
    return this.userRepo.countAll();
  }

  async countActiveToday(): Promise<number> {
    return this.userRepo.countActiveToday();
  }

  async countByPlan(): Promise<Record<string, number>> {
    const [total, newToday, activeToday, paid, banned] = await Promise.all([
      this.userRepo.countAll(),
      this.userRepo.countNewToday(),
      this.userRepo.countActiveToday(),
      this.userRepo.countPaid(),
      this.userRepo.countBanned(),
    ]);
    // Return plan distribution (requires raw query or separate counting)
    return { total, newToday, activeToday, paid, banned };
  }

  async ban(userId: number, reason: string, adminId: number): Promise<void> {
    await this.userRepo.update(userId, { isBanned: true, banReason: reason });
    await this.adminLogRepo.log('BAN', `reason:${reason}`, userId);
    logger.info(`User ${userId} banned by admin ${adminId}: ${reason}`);
  }

  async unban(userId: number, adminId: number): Promise<void> {
    await this.userRepo.update(userId, { isBanned: false, banReason: null });
    await this.adminLogRepo.log('UNBAN', undefined, userId);
    logger.info(`User ${userId} unbanned by admin ${adminId}`);
  }

  /** Alias used by admin controller (takes string telegramId) */
  async banUser(telegramId: string): Promise<void> {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error('User not found');
    await this.ban(user.id, 'admin action', 0);
  }

  async unbanUser(telegramId: string): Promise<void> {
    const user = await this.userRepo.findByTelegramId(BigInt(telegramId));
    if (!user) throw new Error('User not found');
    await this.unban(user.id, 0);
  }

  async getStats(): Promise<{
    total: number;
    newToday: number;
    activeToday: number;
    paid: number;
    banned: number;
  }> {
    const [total, newToday, activeToday, paid, banned] = await Promise.all([
      this.userRepo.countAll(),
      this.userRepo.countNewToday(),
      this.userRepo.countActiveToday(),
      this.userRepo.countPaid(),
      this.userRepo.countBanned(),
    ]);
    return { total, newToday, activeToday, paid, banned };
  }

  async getAllActive(): Promise<User[]> {
    return this.userRepo.findAllActive();
  }

  async getAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
