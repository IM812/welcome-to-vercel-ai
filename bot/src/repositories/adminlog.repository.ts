import type { AdminLog } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class AdminLogRepository {
  async log(action: string, details?: string, userId?: number): Promise<void> {
    await prisma.adminLog.create({
      data: { action, details, userId },
    });
  }

  async findRecent(limit: number = 20): Promise<AdminLog[]> {
    return prisma.adminLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: true },
    });
  }

  async countErrorsToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.adminLog.count({
      where: { action: 'PARSER_ERROR', createdAt: { gte: start } },
    });
  }
}
