import type { PromoCode, PromoCodeUse } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class PromoRepository {
  async findByCode(code: string): Promise<PromoCode | null> {
    return prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
  }

  async create(data: {
    code: string;
    plan: PromoCode['plan'];
    days: number;
    maxUses: number;
    expiresAt?: Date;
  }): Promise<PromoCode> {
    return prisma.promoCode.create({
      data: { ...data, code: data.code.toUpperCase() },
    });
  }

  async incrementUsed(id: number): Promise<void> {
    await prisma.promoCode.update({
      where: { id },
      data: { usedCount: { increment: 1 } },
    });
  }

  async recordUse(promoCodeId: number, userId: number): Promise<PromoCodeUse> {
    return prisma.promoCodeUse.create({
      data: { promoCodeId, userId },
    });
  }

  async hasUserUsed(promoCodeId: number, userId: number): Promise<boolean> {
    const use = await prisma.promoCodeUse.findUnique({
      where: { promoCodeId_userId: { promoCodeId, userId } },
    });
    return !!use;
  }

  async deactivate(code: string): Promise<void> {
    await prisma.promoCode.updateMany({
      where: { code: code.toUpperCase() },
      data: { isActive: false },
    });
  }

  async findAll(): Promise<Array<{ code: string; planGranted: PromoCode['plan']; daysGranted: number; maxUses: number; usedCount: number }>> {
    const promos = await prisma.promoCode.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return promos.map((p) => ({
      code: p.code,
      planGranted: p.plan,
      daysGranted: p.days,
      maxUses: p.maxUses,
      usedCount: p.usedCount,
    }));
  }
}
