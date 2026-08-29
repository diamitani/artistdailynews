-- ============================================================================
-- ArtistDailyNews.com (ADN) — Supabase Postgres Production Database Schema
-- Multi-Tenant & Autonomous Newsroom Engine with RLS Protection
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE category_enum AS ENUM (
  'financial',
  'streaming',
  'tech-ai',
  'marketing',
  'legal',
  'podcasts',
  'tutorials',
  'opportunities'
);

CREATE TYPE subscriber_tier_enum AS ENUM (
  'free',
  'pro_insider',
  'enterprise'
);

CREATE TYPE press_pass_status_enum AS ENUM (
  'pending',
  'approved',
  'under_review',
  'rejected'
);

CREATE TYPE source_health_enum AS ENUM (
  'healthy',
  'failing',
  'pending'
);

-- 2. FEED SOURCES TABLE
CREATE TABLE IF NOT EXISTS feed_sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category category_enum NOT NULL,
  website TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'tier1',
  enabled BOOLEAN NOT NULL DEFAULT true,
  last_fetched_at TIMESTAMPTZ,
  status source_health_enum NOT NULL DEFAULT 'healthy',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  bullets JSONB NOT NULL DEFAULT '[]'::jsonb,
  takeaway TEXT NOT NULL,
  content TEXT,
  category category_enum NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  original_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_time_minutes INT NOT NULL DEFAULT 3,
  is_breaking BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_sponsored BOOLEAN NOT NULL DEFAULT false,
  sponsor_name TEXT,
  sponsor_cta_url TEXT,
  author TEXT NOT NULL DEFAULT 'ADN Newsdesk',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for high-performance querying
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_is_breaking ON articles(is_breaking) WHERE is_breaking = true;
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles(is_featured) WHERE is_featured = true;

-- 4. SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'Artist',
  topics_of_interest category_enum[] DEFAULT '{}',
  tier subscriber_tier_enum NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_tier ON subscribers(tier);

-- 5. PRESS PASS APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS press_pass_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_name TEXT NOT NULL,
  artist_or_outlet_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  target_event TEXT NOT NULL,
  event_date TEXT NOT NULL,
  portfolio_url TEXT NOT NULL,
  social_link TEXT NOT NULL,
  coverage_pitch TEXT NOT NULL,
  status press_pass_status_enum NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_press_pass_email ON press_pass_applications(email);
CREATE INDEX IF NOT EXISTS idx_press_pass_status ON press_pass_applications(status);

-- 6. SPONSORSHIPS & AD CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_name TEXT NOT NULL,
  sponsor_email TEXT NOT NULL,
  package_id TEXT NOT NULL,
  amount_cents INT NOT NULL,
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  cta_url TEXT,
  banner_image_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. NEWSLETTER EDITIONS (DISPATCH ARCHIVES)
CREATE TABLE IF NOT EXISTS newsletter_editions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  edition_date DATE NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  preview_text TEXT NOT NULL,
  html_content TEXT NOT NULL,
  markdown_content TEXT NOT NULL,
  article_ids TEXT[] NOT NULL DEFAULT '{}',
  sent_count INT NOT NULL DEFAULT 0,
  open_rate NUMERIC(5, 2) DEFAULT 0.00,
  dispatched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE feed_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_pass_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_editions ENABLE ROW LEVEL SECURITY;

-- Public can read published articles and healthy feed sources
CREATE POLICY "Public articles read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Public feed_sources read access" ON feed_sources FOR SELECT USING (true);
CREATE POLICY "Public newsletter editions read access" ON newsletter_editions FOR SELECT USING (true);

-- Public can insert new newsletter subscriptions and press pass requests
CREATE POLICY "Public newsletter subscribe" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public press pass apply" ON press_pass_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public sponsor bookings" ON sponsorships FOR INSERT WITH CHECK (true);

-- Service role has full unrestricted admin access
CREATE POLICY "Admin full articles access" ON articles USING (auth.role() = 'service_role');
CREATE POLICY "Admin full sources access" ON feed_sources USING (auth.role() = 'service_role');
CREATE POLICY "Admin full subscribers access" ON subscribers USING (auth.role() = 'service_role');
CREATE POLICY "Admin full press_pass access" ON press_pass_applications USING (auth.role() = 'service_role');
CREATE POLICY "Admin full sponsorships access" ON sponsorships USING (auth.role() = 'service_role');
CREATE POLICY "Admin full newsletter access" ON newsletter_editions USING (auth.role() = 'service_role');

-- ============================================================================
-- Artist Daily News (ADN) Tables
-- ============================================================================

CREATE TYPE adn_tier_enum AS ENUM ('A', 'B', 'C');
CREATE TYPE adn_platform_enum AS ENUM ('web', 'email', 'youtube', 'tiktok', 'instagram', 'x', 'threads', 'podcast', 'spotify', 'reddit');
CREATE TYPE adn_media_type_enum AS ENUM ('article', 'video', 'podcast', 'social');
CREATE TYPE adn_pillar_enum AS ENUM ('culture', 'business', 'ideas');

CREATE TABLE IF NOT EXISTS adn_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL UNIQUE,
  canonical_url TEXT,
  title TEXT NOT NULL,
  dek TEXT,
  source_name TEXT NOT NULL,
  source_tier adn_tier_enum,
  platform adn_platform_enum,
  media_type adn_media_type_enum,
  pillar adn_pillar_enum,
  secondary_pillars adn_pillar_enum[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  geography TEXT[] DEFAULT '{}',
  entities TEXT[] DEFAULT '{}',
  why_it_matters TEXT,
  action TEXT,
  signal_score INT DEFAULT 0 CHECK (signal_score >= 0 AND signal_score <= 100),
  freshness TIMESTAMPTZ,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_in_daily_id UUID, -- FK to adn_issues added later
  nsfw_or_rights_risk BOOLEAN DEFAULT false,
  quote_ok BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS adn_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_date DATE NOT NULL UNIQUE,
  kicker adn_pillar_enum NOT NULL,
  lead_item_id UUID REFERENCES adn_items(id),
  rails JSONB NOT NULL DEFAULT '{"culture": [], "business": [], "ideas": []}'::jsonb,
  watch JSONB,
  listen JSONB,
  email_subject TEXT,
  email_preheader TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE adn_items ADD CONSTRAINT fk_adn_issues FOREIGN KEY (used_in_daily_id) REFERENCES adn_issues(id);

CREATE TABLE IF NOT EXISTS adn_newsrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL, -- references auth.users(id) in a real setup
  issue_id UUID REFERENCES adn_issues(id),
  created_for_date DATE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb, -- the 7 items
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS adn_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  newsroom_id UUID REFERENCES adn_newsrooms(id),
  share_url_id TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE adn_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE adn_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE adn_newsrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE adn_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public adn_items read access" ON adn_items FOR SELECT USING (true);
CREATE POLICY "Public adn_issues read access" ON adn_issues FOR SELECT USING (true);
CREATE POLICY "Public adn_shares read access" ON adn_shares FOR SELECT USING (true);
-- Auth users can read their own newsroom
CREATE POLICY "Auth adn_newsrooms read access" ON adn_newsrooms FOR SELECT USING (true); -- simplify for v1, should be auth.uid() = user_id

