// ENV values hardcoded for reliability — no external .env required at runtime
const BOT_TOKEN = process.env['BOT_TOKEN'] ?? '8680600257:AAGaKmnOaXhzw-VuNFvvb947scAN97wYAFU';
const ADMIN_TELEGRAM_ID = process.env['ADMIN_TELEGRAM_ID'] ?? '987405159';
const ADMIN_PASSWORD = process.env['ADMIN_PASSWORD'] ?? 'parseravito123';
const DATABASE_URL = process.env['DATABASE_URL'] ?? 'postgresql://neondb_owner:npg_AFSK8zispT2j@ep-morning-frog-at4f2s5v-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';

// Inject DATABASE_URL early so Prisma picks it up before the client is initialised
if (!process.env['DATABASE_URL']) {
  process.env['DATABASE_URL'] = DATABASE_URL;
}

export const config = {
  BOT_TOKEN,
  BOT_USERNAME: process.env['BOT_USERNAME'] ?? 'avito_parser_test_bot',
  ADMIN_IDS: ADMIN_TELEGRAM_ID.split(',').map((id) => BigInt(id.trim())),
  ADMIN_PASSWORD,
  DATABASE_URL,

  bot: {
    token: BOT_TOKEN,
  },
  admin: {
    telegramId: BigInt(ADMIN_TELEGRAM_ID.split(',')[0]!.trim()),
    password: ADMIN_PASSWORD,
  },
  env: (process.env['NODE_ENV'] ?? 'production') as 'development' | 'production',
  logLevel: (process.env['LOG_LEVEL'] ?? 'info') as string,
} as const;
