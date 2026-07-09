-- Migration: add freshness / baseline fields to Listing and Search
-- Apply with: psql $DATABASE_URL -f prisma/migrations/add_listing_freshness_fields.sql
-- Or run:     prisma db push   (if you manage schema via db push)

-- ──────────────────────────────────────────────────────────────────────────────
-- Listing: new columns
-- ──────────────────────────────────────────────────────────────────────────────

-- Raw date string as scraped from the page (e.g. "3 минуты назад")
ALTER TABLE "Listing"
  ADD COLUMN IF NOT EXISTS "rawPublishedAt" TEXT;

-- Timestamp when this record was first inserted (defaults to now for existing rows)
ALTER TABLE "Listing"
  ADD COLUMN IF NOT EXISTS "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Reason a notification was skipped: 'TOO_OLD' | 'UNKNOWN_DATE' | NULL
ALTER TABLE "Listing"
  ADD COLUMN IF NOT EXISTS "skippedReason" TEXT;

-- ──────────────────────────────────────────────────────────────────────────────
-- Listing: unique index on (searchId, externalId) — may already exist
-- ──────────────────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'Listing'
      AND indexname  = 'Listing_searchId_externalId_key'
  ) THEN
    CREATE UNIQUE INDEX "Listing_searchId_externalId_key"
      ON "Listing" ("searchId", "externalId");
  END IF;
END
$$;

-- ──────────────────────────────────────────────────────────────────────────────
-- Search: new timestamp columns
-- ──────────────────────────────────────────────────────────────────────────────

ALTER TABLE "Search"
  ADD COLUMN IF NOT EXISTS "baselineInitializedAt" TIMESTAMP(3);

ALTER TABLE "Search"
  ADD COLUMN IF NOT EXISTS "lastNewListingAt" TIMESTAMP(3);

-- lastCheckedAt may already exist — ADD COLUMN IF NOT EXISTS is safe
ALTER TABLE "Search"
  ADD COLUMN IF NOT EXISTS "lastCheckedAt" TIMESTAMP(3);
