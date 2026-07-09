import type { Plan } from '../generated/prisma/index';
import { PromoRepository } from '../repositories/promo.repository';
import { UserRepository } from '../repositories/user.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { PLAN_NAMES } from '../types/index';
import { logger } from '../utils/logger';

export interface PromoResult {
  success: boolean;
  message: string;
  plan?: Plan;
  days?: number;
}

export class PromoService {
  private promoRepo: PromoRepository;
  private userRepo: UserRepository;
  private adminLogRepo: AdminLogRepository;

  constructor(
    promoRepo?: PromoRepository,
    userRepo?: UserRepository,
    adminLogRepo?: AdminLogRepository,
  ) {
    this.promoRepo = promoRepo ?? new PromoRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
  }

  async redeem(userId: number, code: string): Promise<PromoResult> {
    const promo = await this.promoRepo.findByCode(code);

    if (!promo || !promo.isActive) {
      return { success: false, message: 'Промокод не найден или недействителен.' };
    }

    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return { success: false, message: 'Срок действия промокода истёк.' };
    }

    if (promo.usedCount >= promo.maxUses) {
      return { success: false, message: 'Промокод уже использован максимальное количество раз.' };
    }

    const alreadyUsed = await this.promoRepo.hasUserUsed(promo.id, userId);
    if (alreadyUsed) {
      return { success: false, message: 'Вы уже использовали этот промокод.' };
    }

    await this.userRepo.setPlan(userId, promo.plan, promo.days);
    await this.promoRepo.recordUse(promo.id, userId);
    await this.promoRepo.incrementUsed(promo.id);
    await this.adminLogRepo.log('PROMO_USED', `code:${code} plan:${promo.plan}`, userId);

    logger.info(`User ${userId} redeemed promo code ${code}: ${promo.plan} for ${promo.days} days`);

    return {
      success: true,
      message: `Промокод активирован: ${PLAN_NAMES[promo.plan]} на ${promo.days} дней.`,
      plan: promo.plan,
      days: promo.days,
    };
  }

  async create(data: {
    code: string;
    plan: Plan;
    days: number;
    maxUses: number;
    expiresAt?: Date;
  }): Promise<string> {
    const promo = await this.promoRepo.create(data);
    return promo.code;
  }

  /** Alias used by admin controller */
  async createPromo(
    code: string,
    plan: Plan,
    days: number,
    maxUses: number,
  ): Promise<{ code: string; planGranted: Plan; daysGranted: number; maxUses: number }> {
    const existing = await this.promoRepo.findByCode(code);
    if (existing) throw new Error(`Promo code ${code} already exists`);
    const createdCode = await this.create({ code, plan, days, maxUses });
    return { code: createdCode, planGranted: plan, daysGranted: days, maxUses };
  }

  async deletePromo(code: string): Promise<void> {
    await this.promoRepo.deactivate(code);
  }

  async listAll(): Promise<Array<{ code: string; planGranted: Plan; daysGranted: number; maxUses: number; usedCount: number }>> {
    return this.promoRepo.findAll();
  }

  /** Alias used by subscription controller */
  async applyPromo(
    userId: number,
    code: string,
  ): Promise<{ success: boolean; reason?: string; planGranted?: Plan; daysGranted?: number; discountPercent?: number }> {
    const result = await this.redeem(userId, code);
    if (!result.success) return { success: false, reason: result.message };
    return { success: true, planGranted: result.plan, daysGranted: result.days };
  }
}
