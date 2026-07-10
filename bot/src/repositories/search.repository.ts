import type { Prisma, Search, SearchStatus } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class SearchRepository {
  async create(data: Prisma.SearchCreateInput): Promise<Search> {
    return prisma.search.create({ data });
  }

  async findById(id: number): Promise<Search | null> {
    return prisma.search.findUnique({ where: { id } });
  }

  async findByUserId(userId: number): Promise<Search[]> {
    return prisma.search.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActiveByUserId(userId: number): Promise<Search[]> {
    return prisma.search.findMany({
      where: { userId, isActive: true, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async countActiveByUserId(userId: number): Promise<number> {
    return prisma.search.count({ where: { userId, isActive: true } });
  }

  async update(id: number, data: Prisma.SearchUpdateInput): Promise<Search> {
    return prisma.search.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.search.delete({ where: { id } });
  }

  async setStatus(id: number, status: SearchStatus): Promise<Search> {
    return prisma.search.update({ where: { id }, data: { status } });
  }

  async setActive(id: number, isActive: boolean): Promise<Search> {
    const status: SearchStatus = isActive ? 'ACTIVE' : 'PAUSED';
    return prisma.search.update({ where: { id }, data: { isActive, status } });
  }

  async incrementError(id: number, error: string): Promise<Search | null> {
    // Only increment the counter and store the message.
    // The caller (CheckerCron) decides when to flip status to ERROR
    // (after MAX_ERRORS consecutive failures) to avoid premature lockout.
    // Use updateMany to avoid throwing if the record was deleted concurrently.
    await prisma.search.updateMany({
      where: { id },
      data: {
        errorCount: { increment: 1 },
        lastError: error,
      },
    });
    return prisma.search.findUnique({ where: { id } });
  }

  async resetError(id: number): Promise<Search | null> {
    await prisma.search.updateMany({
      where: { id },
      data: { errorCount: 0, lastError: null, status: 'ACTIVE' },
    });
    return prisma.search.findUnique({ where: { id } });
  }

  async updateLastChecked(id: number): Promise<void> {
    await prisma.search.updateMany({
      where: { id },
      data: { lastCheckedAt: new Date() },
    });
  }

  async findAllActiveForCron(): Promise<Search[]> {
    // Include ERROR searches so they can auto-recover after a successful parse.
    // PAUSED searches are never included.
    return prisma.search.findMany({
      where: { isActive: true, status: { in: ['ACTIVE', 'LIMITED', 'ERROR'] } },
      include: { user: { include: { settings: true } } },
      orderBy: [
        { user: { plan: 'desc' } },
        { lastCheckedAt: 'asc' },
      ],
    });
  }

  async countActiveTotal(): Promise<number> {
    return prisma.search.count({ where: { isActive: true } });
  }

  /** Alias used by admin stats */
  async countAll(): Promise<number> {
    return prisma.search.count({ where: { isActive: true } });
  }

  async countByStatus(status: SearchStatus): Promise<number> {
    return prisma.search.count({ where: { status } });
  }

  async countByUser(userId: number): Promise<number> {
    return prisma.search.count({ where: { userId } });
  }

  /** Alias used by SearchService and StatsController */
  async findActiveByUser(userId: number): Promise<Search[]> {
    return this.findActiveByUserId(userId);
  }

  async deactivateExcessForUser(userId: number, keepCount: number): Promise<void> {
    const searches = await prisma.search.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    const toDeactivate = searches.slice(keepCount);
    if (toDeactivate.length === 0) return;

    await prisma.search.updateMany({
      where: { id: { in: toDeactivate.map((s) => s.id) } },
      data: { isActive: false, status: 'LIMITED' },
    });
  }
}
