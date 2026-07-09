import type { Notification, NotificationStatus, Prisma } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class NotificationRepository {
  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async markSent(id: number): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { status: 'SENT', sentAt: new Date() },
    });
  }

  async markFailed(id: number, reason: string): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { status: 'FAILED', failReason: reason },
    });
  }

  async findQueued(userId: number): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId, status: 'QUEUED' },
      orderBy: { createdAt: 'asc' },
      include: { listing: true, search: true },
    });
  }

  async countSentToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.notification.count({
      where: { status: 'SENT', sentAt: { gte: start } },
    });
  }

  async updateStatus(id: number, status: NotificationStatus): Promise<void> {
    await prisma.notification.update({ where: { id }, data: { status } });
  }

  async countTodayByUser(userId: number): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.notification.count({
      where: { userId, status: 'SENT', sentAt: { gte: start } },
    });
  }

  async countTotalByUser(userId: number): Promise<number> {
    return prisma.notification.count({ where: { userId, status: 'SENT' } });
  }

  async findByListingAndUser(listingId: number, userId: number): Promise<Notification | null> {
    return prisma.notification.findFirst({
      where: { listingId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
