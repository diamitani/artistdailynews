-- ============================================================
-- ARTIST DAILY NEWS TABLES FOR ARTISPRENEUR SUPABASE
-- Namespace: adn_* (Artist Daily News)
--
-- IMPORTANT: This assumes you already have:
-- - auth.users (from Artispreneur)
-- - public.profiles (from Artispreneur)
--
-- Run this in your Artispreneur Supabase SQL Editor
-- ============================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ADN_ITEMS TABLE
-- Stores news articles, podcasts, and content items
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  dek TEXT,
  url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  pillar TEXT CHECK (pillar IN ('business', 'culture', 'ideas')),
  freshness TIMESTAMPTZ NOT NULL,
  snippet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_adn_items_pillar ON adn_items(pillar);
CREATE INDEX IF NOT EXISTS idx_adn_items_freshness ON adn_items(freshness DESC);
CREATE INDEX IF NOT EXISTS idx_adn_items_source ON adn_items(source_name);

-- No RLS needed - public read access
ALTER TABLE adn_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published items" ON adn_items
  FOR SELECT USING (true);

-- ============================================================
-- ADN_SOURCES TABLE
-- Stores RSS feed sources and configuration
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  feed_url TEXT NOT NULL UNIQUE,
  pillar TEXT CHECK (pillar IN ('business', 'culture', 'ideas')),
  is_active BOOLEAN DEFAULT true,
  last_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_adn_sources_active ON adn_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_adn_sources_pillar ON adn_sources(pillar);

-- No RLS needed - public read access
ALTER TABLE adn_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active sources" ON adn_sources
  FOR SELECT USING (true);

-- ============================================================
-- ADN_USER_BOOKMARKS TABLE
-- User-saved articles (replaces user_saved_articles)
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id TEXT REFERENCES adn_items(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_adn_bookmarks_user ON adn_user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_adn_bookmarks_item ON adn_user_bookmarks(item_id);
CREATE INDEX IF NOT EXISTS idx_adn_bookmarks_saved_at ON adn_user_bookmarks(saved_at DESC);

-- RLS Policies
ALTER TABLE adn_user_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookmarks" ON adn_user_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON adn_user_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks" ON adn_user_bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON adn_user_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- ADN_USER_READING_HISTORY TABLE
-- Tracks articles read by users with completion percentage
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_user_reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id TEXT REFERENCES adn_items(id) ON DELETE CASCADE NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  read_percentage INT DEFAULT 0 CHECK (read_percentage >= 0 AND read_percentage <= 100),
  time_spent_seconds INT DEFAULT 0,
  UNIQUE(user_id, item_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_adn_reading_user ON adn_user_reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_adn_reading_item ON adn_user_reading_history(item_id);
CREATE INDEX IF NOT EXISTS idx_adn_reading_read_at ON adn_user_reading_history(read_at DESC);

-- RLS Policies
ALTER TABLE adn_user_reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history" ON adn_user_reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON adn_user_reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON adn_user_reading_history
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- ADN_NEWSLETTER_SUBSCRIPTIONS TABLE
-- Newsletter preferences and subscription status
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  is_subscribed BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'none')),
  preferred_time TIME DEFAULT '06:00:00',
  pillars TEXT[] DEFAULT ARRAY['business', 'culture', 'ideas']::TEXT[],
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_adn_newsletter_user ON adn_newsletter_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_adn_newsletter_active ON adn_newsletter_subscriptions(is_subscribed) WHERE is_subscribed = true;
CREATE INDEX IF NOT EXISTS idx_adn_newsletter_frequency ON adn_newsletter_subscriptions(frequency);

-- RLS Policies
ALTER TABLE adn_newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own newsletter subscription" ON adn_newsletter_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own newsletter subscription" ON adn_newsletter_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own newsletter subscription" ON adn_newsletter_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION adn_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_adn_items_updated_at ON adn_items;
CREATE TRIGGER update_adn_items_updated_at
  BEFORE UPDATE ON adn_items
  FOR EACH ROW EXECUTE FUNCTION adn_update_updated_at_column();

DROP TRIGGER IF EXISTS update_adn_sources_updated_at ON adn_sources;
CREATE TRIGGER update_adn_sources_updated_at
  BEFORE UPDATE ON adn_sources
  FOR EACH ROW EXECUTE FUNCTION adn_update_updated_at_column();

DROP TRIGGER IF EXISTS update_adn_newsletter_updated_at ON adn_newsletter_subscriptions;
CREATE TRIGGER update_adn_newsletter_updated_at
  BEFORE UPDATE ON adn_newsletter_subscriptions
  FOR EACH ROW EXECUTE FUNCTION adn_update_updated_at_column();

-- ============================================================
-- VERIFICATION QUERIES
-- Run these to verify your setup
-- ============================================================

-- Check ADN tables were created
-- SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'adn_%';

-- Check RLS policies
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE tablename LIKE 'adn_%';

-- Verify shared auth works
-- SELECT COUNT(*) FROM auth.users;
-- SELECT COUNT(*) FROM profiles;
