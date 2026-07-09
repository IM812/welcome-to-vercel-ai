import { prisma } from '../database/client';
import { UserRepository } from '../repositories/user.repository';
import { logger } from '../utils/logger';

export class ReferralService {
  private userRepo: UserRepository;

  constructor(userRepo?: UserRepository) {
    this.userRepo = userRepo ?? new UserRepository();
  }

  async saveReferral(newUserId: number, referrerUserId: number): Promise<void> {
    try {
      await prisma.referral.upsert({
        where: { referredId: newUserId },
        create: { referrerId: referrerUserId, referredId: newUserId },
        update: {},
      });
    } catch (err) {
      logger.error('Failed to save referral', err);
    }
  }

  async handlePayment(payingUserId: number): Promise<void> {
    const referral = await prisma.referral.findUnique({
      where: { referredId: payingUserId },
    });

    if (!referral) return;

    await this.userRepo.setPlan(referral.referrerId, 'START', 7);

    logger.info(
      `Referral bonus: 7 days START granted to user ${referral.referrerId} for referring ${payingUserId}`,
    );
  }

  async countReferrals(userId: number): Promise<number> {
    return prisma.referral.count({ where: { referrerId: userId } });
  }

  async getStats(userId: number): Promise<{ total: number; bonusDaysEarned: number }> {
    const total = await prisma.referral.count({ where: { referrerId: userId } });
    const bonusDaysEarned = total * 7;
    return { total, bonusDaysEarned };
  }
}
