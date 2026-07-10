/**
 * reset_db.ts
 *
 * Clears all operational data so the bot starts fresh:
 *   - Deletes all Listings (cascades to Notifications, Favorites)
 *   - Deletes all Notifications (orphan cleanup in case cascade missed any)
 *   - Deletes ParserLog entries
 *   - Resets all Searches: status → ACTIVE, errorCount → 0, baseline cleared
 *
 * Users, subscriptions, payments, blocked sellers, promo codes are preserved.
 *
 * Run on VPS:
 *   cd /opt/avito-bot/bot && npx tsx scripts/reset_db.ts
 */

import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting database...');

  const [notifications, listings, parserLogs] = await Promise.all([
    prisma.notification.deleteMany({}),
    prisma.listing.deleteMany({}),
    prisma.parserLog.deleteMany({}),
  ]);

  console.log(`Deleted: ${notifications.count} notifications, ${listings.count} listings, ${parserLogs.count} parser logs`);

  const searches = await prisma.search.updateMany({
    data: {
      status: 'ACTIVE',
      isActive: true,
      errorCount: 0,
      lastError: null,
      lastCheckedAt: null,
      lastFoundAt: null,
      baselineInitializedAt: null,
      baselineMaxId: null,
      lastNewListingAt: null,
    },
  });

  console.log(`Reset ${searches.count} searches to ACTIVE with clean baseline`);
  console.log('Done. Restart the bot: npx tsx src/index.ts');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
