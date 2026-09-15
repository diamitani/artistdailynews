-- ============================================================
-- 004_daily_sync_columns.sql — columns for the daily cron sync
-- Run in the Supabase SQL editor (service role). Safe to re-run.
-- Required by /api/cron/rss-ingest (Vercel Cron, daily 06:00 UTC),
-- which upserts feed items into adn_items with onConflict on url.
-- ============================================================

-- 1. Columns the sync writes (shape getArticles() expects).
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS platform TEXT;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS why_it_matters TEXT;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS bullets JSONB;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS takeaway TEXT;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS is_breaking BOOLEAN DEFAULT false;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS source_url TEXT;

-- 2. Pillar contract fix: 001 allowed ('business','culture','ideas') but the
-- app has always written 'social' for features/community/tutorials.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'adn_items_pillar_check') THEN
    ALTER TABLE adn_items DROP CONSTRAINT adn_items_pillar_check;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'adn_items_pillar_check_v2') THEN
    ALTER TABLE adn_items
      ADD CONSTRAINT adn_items_pillar_check_v2
      CHECK (pillar IN ('business', 'culture', 'social'));
  END IF;
END $$;

-- 3. Honest dates: the sync never fabricates a publisher date, so items with
-- no parseable publisher date store NULL freshness (they stay drafts).
ALTER TABLE adn_items ALTER COLUMN freshness DROP NOT NULL;

-- 4. Canonical-URL dedupe for upserts (the sync uses onConflict: 'url').
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'adn_items_url_unique') THEN
    ALTER TABLE adn_items ADD CONSTRAINT adn_items_url_unique UNIQUE (url);
  END IF;
END $$;

-- 5. Index the new read patterns.
CREATE INDEX IF NOT EXISTS idx_adn_items_platform ON adn_items(platform);
CREATE INDEX IF NOT EXISTS idx_adn_items_category ON adn_items(category);
