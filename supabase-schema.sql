-- ============================================================
-- SUPABASE SCHEMA FOR ARTIST DAILY NEWS
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES TABLE
-- Stores user profile information linked to auth.users
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'Artist' CHECK (role IN ('Artist', 'Manager', 'Producer', 'Label', 'Press')),
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro_insider', 'enterprise')),
  avatar_url TEXT,
  topics_of_interest TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create profile automatically when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- SAVED ARTICLES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_saved_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_articles_user ON user_saved_articles(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_articles_article ON user_saved_articles(article_id);

ALTER TABLE user_saved_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved articles" ON user_saved_articles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved articles" ON user_saved_articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved articles" ON user_saved_articles
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- READING HISTORY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id TEXT NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  read_percentage INT DEFAULT 0 CHECK (read_percentage >= 0 AND read_percentage <= 100),
  UNIQUE(user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_reading_history_user ON user_reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_article ON user_reading_history(article_id);

ALTER TABLE user_reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history" ON user_reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON user_reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON user_reading_history
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- TOP 100 PLATFORMS & RESOURCE DIRECTORY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  pillar TEXT NOT NULL CHECK (pillar IN (
    'Trade & Business Journalism',
    'Indie Strategy & D2C',
    'Streaming, Metadata & Rights',
    'Audio Engineering & Production',
    'Culture, Editorial & Discovery',
    'Podcasts & Video Channels'
  )),
  category TEXT NOT NULL CHECK (category IN (
    'financial', 'streaming', 'tech-ai', 'marketing', 'legal', 'podcasts', 'tutorials', 'opportunities', 'social'
  )),
  tier TEXT NOT NULL CHECK (tier IN ('tier1', 'tier2', 'tier3')),
  website_url TEXT NOT NULL,
  rss_feed_url TEXT,
  youtube_channel_url TEXT,
  youtube_channel_id TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('Articles', 'Podcasts', 'Videos', 'Multi-Format', 'Research & Data')),
  daily_post_frequency INT DEFAULT 1,
  scrape_status TEXT DEFAULT 'active' CHECK (scrape_status IN ('active', 'manual', 'partner', 'paused')),
  priority_rank INT NOT NULL,
  description TEXT NOT NULL,
  editorial_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_adn_platforms_pillar ON adn_platforms(pillar);
CREATE INDEX IF NOT EXISTS idx_adn_platforms_category ON adn_platforms(category);
CREATE INDEX IF NOT EXISTS idx_adn_platforms_tier ON adn_platforms(tier);
CREATE INDEX IF NOT EXISTS idx_adn_platforms_priority ON adn_platforms(priority_rank);

ALTER TABLE adn_platforms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read adn_platforms" ON adn_platforms FOR SELECT USING (true);
CREATE POLICY "Admin write adn_platforms" ON adn_platforms FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- DAILY ARTICLES INGESTION TABLE (READY FOR DAILY UPLOAD)
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_daily_articles (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  platform_id TEXT REFERENCES adn_platforms(id) ON DELETE SET NULL,
  platform_name TEXT NOT NULL,
  article_title TEXT NOT NULL,
  slug TEXT NOT NULL,
  original_url TEXT NOT NULL UNIQUE,
  author TEXT DEFAULT 'Staff Reporter',
  summary_dek TEXT NOT NULL,
  takeaway_bullets TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL CHECK (category IN (
    'financial', 'streaming', 'tech-ai', 'marketing', 'legal', 'podcasts', 'tutorials', 'opportunities', 'social'
  )),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  read_time_minutes INT DEFAULT 3,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'staged', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_daily_articles_date ON adn_daily_articles(date_ingested);
CREATE INDEX IF NOT EXISTS idx_daily_articles_platform ON adn_daily_articles(platform_id);
CREATE INDEX IF NOT EXISTS idx_daily_articles_category ON adn_daily_articles(category);
CREATE INDEX IF NOT EXISTS idx_daily_articles_status ON adn_daily_articles(status);

ALTER TABLE adn_daily_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read adn_daily_articles" ON adn_daily_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Admin write adn_daily_articles" ON adn_daily_articles FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- DAILY YOUTUBE VIDEOS INGESTION TABLE (100% VERIFIED)
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_daily_videos (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  youtube_video_id TEXT NOT NULL UNIQUE, -- 11 character exact verified ID
  title TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  channel_handle TEXT,
  channel_url TEXT NOT NULL,
  search_query_category TEXT NOT NULL CHECK (search_query_category IN (
    'music_business_news',
    'music_industry_news',
    'music_podcasts',
    'music_production_masterclasses',
    'artist_interviews',
    'streaming_analytics'
  )),
  duration TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  published_date TIMESTAMPTZ NOT NULL,
  key_takeaway TEXT NOT NULL,
  views_estimate TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'staged', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_daily_videos_date ON adn_daily_videos(date_ingested);
CREATE INDEX IF NOT EXISTS idx_daily_videos_query ON adn_daily_videos(search_query_category);
CREATE INDEX IF NOT EXISTS idx_daily_videos_yt_id ON adn_daily_videos(youtube_video_id);

ALTER TABLE adn_daily_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read adn_daily_videos" ON adn_daily_videos FOR SELECT USING (status = 'published');
CREATE POLICY "Admin write adn_daily_videos" ON adn_daily_videos FOR ALL USING (auth.jwt()->>'role' = 'service_role');
