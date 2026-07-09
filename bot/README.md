# SearchBot

Telegram bot for automatic listing monitoring on Avito, Cian, Youla, and Auto.ru. Built with TypeScript, grammY, Prisma, and node-cron.

## Setup

### 1. Clone and install dependencies

```bash
pnpm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable              | Description                                      |
|-----------------------|--------------------------------------------------|
| `BOT_TOKEN`           | Telegram bot token from @BotFather               |
| `BOT_USERNAME`        | Bot username without `@`                         |
| `DATABASE_URL`        | PostgreSQL connection string (Supabase/Neon/etc) |
| `ADMIN_TELEGRAM_ID`   | Comma-separated admin Telegram IDs               |
| `NODE_ENV`            | `development` or `production`                    |
| `LOG_LEVEL`           | `debug`, `info`, `warn`, `error`                 |

### 3. Run database migrations

```bash
pnpm db:push        # push schema to DB (dev)
# or
pnpm db:migrate     # run pending migrations (prod)
```

### 4. Start the bot

```bash
pnpm dev            # development (ts-node)
pnpm build && pnpm start  # production (compiled JS)
```

---

## Architecture

```
src/
  config/           # environment config
  controllers/      # grammY command & callback handlers
  cron/             # scheduled jobs (checker, subscription, reset, queue)
  database/         # Prisma client singleton
  generated/        # auto-generated Prisma client (do not edit)
  keyboards/        # inline and reply keyboards
  middlewares/      # auth, rate-limit, admin guard
  parsers/          # site-specific listing parsers (Avito, Cian, Youla, Auto.ru)
  repositories/     # database access layer
  services/         # business logic layer
  types/            # shared TypeScript types, constants, plan limits
  utils/            # logger, format helpers, retry utility
  index.ts          # entry point — wires everything and starts polling
prisma/
  schema.prisma     # database schema
prisma.config.ts    # Prisma v7 datasource configuration
```

## Plans

| Plan      | Searches | Notifications/day | Check interval |
|-----------|----------|-------------------|----------------|
| FREE      | 1        | 5                 | 60 min         |
| START     | 3        | 20                | 15 min         |
| PRO       | 10       | 100               | 5 min          |
| UNLIMITED | 30       | unlimited         | 1 min          |

## Admin Commands

| Command                          | Description                        |
|----------------------------------|------------------------------------|
| `/admin`                         | Admin panel stats                  |
| `/ban <id> [reason]`             | Ban a user                         |
| `/unban <id>`                    | Unban a user                       |
| `/setplan <id> <plan> [days]`    | Set user plan                      |
| `/broadcast <text>`              | Message all users                  |
| `/promo_create <code> <plan> <days> <maxUses>` | Create promo code   |
| `/promo_delete <code>`           | Deactivate promo code              |
| `/promo_list`                    | List all active promo codes        |
| `/stats`                         | Bot statistics                     |

## Payments

All payments are processed via Telegram Stars (`XTR` currency). The bot creates an invoice via `ctx.replyWithInvoice`, and the `pre_checkout_query` / `successful_payment` flow is handled in `subscription.controller.ts`. Duplicate payment protection is enforced by checking `telegramChargeId` uniqueness before granting plan access.
