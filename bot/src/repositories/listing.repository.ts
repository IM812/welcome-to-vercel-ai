import type { Listing, Platform, Prisma } from '../generated/prisma/index';
import { prisma } from '../database/client';

export class ListingRepository {
  async create(data: Prisma.ListingCreateInput): Promise<Listing> {
    return prisma.listing.create({ data });
  }

  async findById(id: number): Promise<Listing | null> {
    return prisma.listing.findUnique({ where: { id } });
  }

  async findByExternalId(searchId: number, externalId: string): Promise<Listing | null> {
    return prisma.listing.findUnique({
      where: { searchId_externalId: { searchId, externalId } },
    });
  }

  async findBySearchId(searchId: number, limit?: number): Promise<Listing[]> {
    return prisma.listing.findMany({
      where: { searchId },
      orderBy: { foundAt: 'desc' },
      take: limit,
    });
  }

  async countBySearchId(searchId: number): Promise<number> {
    return prisma.listing.count({ where: { searchId } });
  }

  async countFoundToday(): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return prisma.listing.count({ where: { foundAt: { gte: start } } });
  }

  async upsert(
    searchId: number,
    externalId: string,
    data: Omit<Prisma.ListingCreateInput, 'search' | 'externalId'>,
  ): Promise<{ listing: Listing; isNew: boolean }> {
    const existing = await this.findByExternalId(searchId, externalId);
    if (existing) return { listing: existing, isNew: false };

    const listing = await prisma.listing.create({
      data: {
        ...data,
        externalId,
        search: { connect: { id: searchId } },
      },
    });
    return { listing, isNew: true };
  }

  async markNotified(id: number): Promise<void> {
    await prisma.listing.update({ where: { id }, data: { notifiedAt: new Date() } });
  }

  async deleteBySearchId(searchId: number): Promise<number> {
    const result = await prisma.listing.deleteMany({ where: { searchId } });
    return result.count;
  }

  async findHistoryForUser(
    userId: number,
    limit: number,
    platform?: Platform,
  ): Promise<Listing[]> {
    return prisma.listing.findMany({
      where: {
        search: { userId },
        ...(platform ? { platform } : {}),
      },
      orderBy: { foundAt: 'desc' },
      take: limit,
      include: { search: true },
    });
  }
}
