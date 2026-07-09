import type { Plan } from '../generated/prisma/index';
import type { SuccessfulPayment } from 'grammy/types';
import { PaymentRepository } from '../repositories/payment.repository';
import { UserRepository } from '../repositories/user.repository';
import { AdminLogRepository } from '../repositories/adminlog.repository';
import { ReferralService } from './referral.service';
import { PLAN_PRICES, PLAN_NAMES } from '../types/index';
import { formatDate } from '../utils/format';
import { logger } from '../utils/logger';

export class PaymentService {
  private paymentRepo: PaymentRepository;
  private userRepo: UserRepository;
  private adminLogRepo: AdminLogRepository;
  private referralService: ReferralService;

  constructor(
    paymentRepo?: PaymentRepository,
    userRepo?: UserRepository,
    adminLogRepo?: AdminLogRepository,
    referralService?: ReferralService,
  ) {
    this.paymentRepo = paymentRepo ?? new PaymentRepository();
    this.userRepo = userRepo ?? new UserRepository();
    this.adminLogRepo = adminLogRepo ?? new AdminLogRepository();
    this.referralService = referralService ?? new ReferralService();
  }

  getPlanFromStars(stars: number): Plan | null {
    for (const [plan, price] of Object.entries(PLAN_PRICES)) {
      if (price === stars) return plan as Plan;
    }
    return null;
  }

  buildInvoicePayload(plan: Plan): string {
    return `subscribe_${plan}`;
  }

  parsePlanFromPayload(payload: string): Plan | null {
    const match = payload.match(/^subscribe_(\w+)$/);
    if (!match) return null;
    const plan = match[1] as Plan;
    if (!Object.keys(PLAN_PRICES).includes(plan)) return null;
    return plan;
  }

  async processSuccessfulPayment(
    userId: number,
    payment: SuccessfulPayment,
    notifyUserFn: (msg: string) => Promise<void>,
    notifyAdminFn: (msg: string) => Promise<void>,
  ): Promise<void> {
    const existing = await this.paymentRepo.findByChargeId(
      payment.telegram_payment_charge_id,
    );
    if (existing) {
      logger.warn(`Duplicate payment attempt: ${payment.telegram_payment_charge_id}`);
      return;
    }

    const plan = this.parsePlanFromPayload(payment.invoice_payload);
    if (!plan) {
      logger.error(`Unknown plan payload: ${payment.invoice_payload}`);
      return;
    }

    const days = 30;
    const user = await this.userRepo.setPlan(userId, plan, days);

    await this.paymentRepo.create({
      user: { connect: { id: userId } },
      telegramPaymentChargeId: payment.telegram_payment_charge_id,
      plan,
      stars: payment.total_amount,
      days,
    });

    await this.adminLogRepo.log(
      'PAYMENT',
      `plan:${plan} stars:${payment.total_amount}`,
      userId,
    );

    const subUntil = user.subscriptionUntil ? formatDate(user.subscriptionUntil) : 'N/A';
    await notifyUserFn(`Подписка активирована: ${PLAN_NAMES[plan]} на 30 дней.`);

    const mention = user.username ? `@${user.username}` : `ID:${user.telegramId}`;
    await notifyAdminFn(
      `Новая оплата\n\nПользователь: ${mention}\nTelegram ID: ${user.telegramId}\nТариф: ${PLAN_NAMES[plan]}\nСумма: ${payment.total_amount} Stars\nДо: ${subUntil}`,
    );

    await this.referralService.handlePayment(userId);
    logger.info(`Payment processed for user ${userId}: ${plan} / ${payment.total_amount} stars`);
  }

  async getStats(): Promise<{ countToday: number; starsToday: number }> {
    const [countToday, starsToday] = await Promise.all([
      this.paymentRepo.countToday(),
      this.paymentRepo.sumStarsToday(),
    ]);
    return { countToday, starsToday };
  }

  async getRecent(limit: number = 20): Promise<ReturnType<PaymentRepository['findRecent']>> {
    return this.paymentRepo.findRecent(limit);
  }
}
