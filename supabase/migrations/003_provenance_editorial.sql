-- ============================================================
-- Phase 1 (Trust & Instrumentation): provenance + editorial contract
-- for adn_items. Run in the Supabase SQL editor. Safe to re-run.
-- ============================================================

-- 1. Provenance columns: the publisher's date vs. our ingestion date.
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS source_published_at TIMESTAMPTZ;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS ingested_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Editorial status gate. Only 'published' rows are publicly readable.
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS editorial_status TEXT NOT NULL DEFAULT 'published';
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'adn_items_editorial_status_check'
  ) THEN
    ALTER TABLE adn_items
      ADD CONSTRAINT adn_items_editorial_status_check
      CHECK (editorial_status IN ('published', 'quarantined', 'draft'));
  END IF;
END $$;
ALTER TABLE adn_items ADD COLUMN IF NOT EXISTS quarantine_reason TEXT;

-- 3. Canonical-URL hygiene: drop rows with no usable canonical URL.
-- (Run as a one-time cleanup; new ingestions enforce this in code.)
DELETE FROM adn_items
WHERE url IS NULL OR url = '' OR url NOT ILIKE 'http%';

-- 4. Backfill provenance from existing columns where possible.
UPDATE adn_items
SET source_published_at = freshness
WHERE source_published_at IS NULL AND freshness IS NOT NULL;

UPDATE adn_items
SET ingested_at = COALESCE(created_at, NOW())
WHERE ingested_at IS NULL;

-- 5. Quarantine policy: suspect death-claim records stay out of public reads.
-- (IDs mirror src/data/quarantine.json; keep in sync with the app layer.)
UPDATE adn_items
SET editorial_status = 'quarantined',
    quarantine_reason = 'Unverified death claim — held for human editorial review (Phase 1 trust gate)'
WHERE id IN (
  'art-dj-mag-1788253583302-y05l',
  'art-pitchfork-news-1788253578052-cyfq',
  'art-rolling-stone-music-1788253578002-xdk9',
  'art-stereogum-1788253578341-i8o9',
  'art-no-depression-1788253596896-6cfp',
  'art-pitchfork-news-1788253578052-e2eu',
  'art-loudwire-1788253598086-mq3h',
  'art-xxl-magazine-1788253581819-pcs1',
  'art-musicradar-1788253610378-afii',
  'art-pitchfork-news-1788253578052-3jar',
  'art-saving-country-music-1788253596090-9uq9',
  'art-the-guardian-music-1788253580773-vi5u',
  'art-the-guardian-music-1788253580773-nas4'
)
AND editorial_status = 'published';

-- 6. Indexes for the trust + analytics queries.
CREATE INDEX IF NOT EXISTS idx_adn_items_editorial_status
  ON adn_items(editorial_status);
CREATE INDEX IF NOT EXISTS idx_adn_items_source_published
  ON adn_items(source_published_at DESC NULLS LAST);

-- 7. Tighten the public read policy: only published rows are publicly visible.
DROP POLICY IF EXISTS "Anyone can view published items" ON adn_items;
CREATE POLICY "Anyone can view published items" ON adn_items
  FOR SELECT USING (editorial_status = 'published');

-- 8. Same contract for a plain `articles` table, if the project uses one.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'articles') THEN
    ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS source_published_at TIMESTAMPTZ;
    ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS ingested_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS editorial_status TEXT NOT NULL DEFAULT 'published';
    ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS quarantine_reason TEXT;
  END IF;
END $$;
