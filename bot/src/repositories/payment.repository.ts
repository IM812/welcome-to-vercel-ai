import type { Payment, Prisma } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class PaymentRepository {
  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return prisma.payment.create({ data });
  }

  async findByChargeId(telegramPaymentChargeId: string): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { telegramPaymentChargeId } });
  }

  async findByUserId(userId: number, limit: number = 20): Promise<Payment[]> {
    return prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async findRecent(limit: number = 20): Promise<Payment[]> {
    return prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true },
    });
  }

  async countToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.payment.count({ where: { createdAt: { gte: start } } });
  }

  async sumStarsToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const result = await prisma.payment.aggregate({
      where: { createdAt: { gte: start } },
      _sum: { stars: true },
    });
    return result._sum.stars ?? 0;
  }
}
