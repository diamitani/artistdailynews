-- ═══════════════════════════════════════════════════════════════
-- 002_reader_events.sql — Reader analytics events (Phase 1B)
-- Run this in the Supabase SQL editor (or via CLI) to enable analytics.
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS reader_events (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id    TEXT,
  article_slug  TEXT,
  event_type    TEXT        NOT NULL
                            CHECK (event_type IN ('page_view','engaged_read','source_click','signup','share','offer_click')),
  session_id    TEXT,
  anon_id       TEXT,
  referrer      TEXT,
  user_agent    TEXT,
  bot_flag      BOOLEAN     NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Query patterns used by the analytics helpers / dashboard
CREATE INDEX IF NOT EXISTS idx_reader_events_type_created
  ON reader_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reader_events_slug_created
  ON reader_events (article_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reader_events_anon_created
  ON reader_events (anon_id, created_at DESC);

-- ── Row Level Security ──────────────────────────────────────────
-- Anyone may INSERT events (the /api/events route writes them);
-- reads are server-side only via the service role, never public.
ALTER TABLE reader_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reader_events_insert_public" ON reader_events;
CREATE POLICY "reader_events_insert_public"
  ON reader_events
  FOR INSERT
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: public reads denied.
-- The dashboard + analytics helpers bypass RLS via SUPABASE_SERVICE_ROLE_KEY.
