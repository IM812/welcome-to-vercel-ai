import type { BlockedSeller } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class BlockedSellerRepository {
  async block(userId: number, sellerKey: string, sellerName?: string | null): Promise<BlockedSeller> {
    return prisma.blockedSeller.upsert({
      where: { userId_sellerKey: { userId, sellerKey } },
      update: { sellerName: sellerName ?? undefined },
      create: { userId, sellerKey, sellerName: sellerName ?? null },
    });
  }

  async unblock(userId: number, sellerKey: string): Promise<void> {
    await prisma.blockedSeller.deleteMany({ where: { userId, sellerKey } });
  }

  async findByUser(userId: number): Promise<BlockedSeller[]> {
    return prisma.blockedSeller.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Set of blocked seller keys for fast per-tick filtering. */
  async keysForUser(userId: number): Promise<Set<string>> {
    const rows = await prisma.blockedSeller.findMany({
      where: { userId },
      select: { sellerKey: true },
    });
    return new Set(rows.map((r) => r.sellerKey));
  }
}
