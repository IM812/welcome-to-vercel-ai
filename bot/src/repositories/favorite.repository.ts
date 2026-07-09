import type { Favorite, Listing } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class FavoriteRepository {
  async add(userId: number, listingId: number): Promise<Favorite> {
    return prisma.favorite.create({ data: { userId, listingId } });
  }

  async remove(userId: number, listingId: number): Promise<void> {
    await prisma.favorite.deleteMany({ where: { userId, listingId } });
  }

  async exists(userId: number, listingId: number): Promise<boolean> {
    const f = await prisma.favorite.findUnique({
      where: { userId_listingId: { userId, listingId } },
    });
    return !!f;
  }

  async findByUserId(userId: number): Promise<(Favorite & { listing: Listing })[]> {
    return prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { listing: true },
    }) as Promise<(Favorite & { listing: Listing })[]>;
  }

  async countByUserId(userId: number): Promise<number> {
    return prisma.favorite.count({ where: { userId } });
  }

  /** Alias used by favorites controller */
  async findByUser(userId: number): Promise<(Favorite & { listing: Listing })[]> {
    return this.findByUserId(userId);
  }

  async clearByUser(userId: number): Promise<void> {
    await prisma.favorite.deleteMany({ where: { userId } });
  }
}
