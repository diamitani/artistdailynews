# Artist Daily News - Artispreneur Supabase Integration

## Overview

This project uses the **existing Artispreneur Supabase project** with shared authentication. Artist Daily News tables are organized with an `adn_` prefix to namespace them within the Artispreneur database.

---

## Database Architecture

### Shared Resources (Artispreneur)
- `auth.users` - Shared user authentication
- `public.profiles` - User profiles (shared across all Artispreneur products)

### Artist Daily News Tables (Namespaced)
- `adn_platforms` - Top 100 Platforms & Resource Directory (Categories, Tiers, RSS & YouTube URLs, Frequencies)
- `adn_daily_articles` - Daily Article Ingestion Table (Ready for automated daily uploads with summary deks & 3 key bullets)
- `adn_daily_videos` - Daily YouTube Video Ingestion Table (100% verified real YouTube IDs mapped to query categories)
- `adn_items` - News articles/content items
- `adn_sources` - RSS feed sources
- `adn_user_bookmarks` - User-saved articles
- `adn_user_reading_history` - Reading tracking
- `adn_newsletter_subscriptions` - Newsletter preferences

### Daily Ingestion & Export Endpoints
- **Top 100 Platforms Export**: `/api/resources?type=platforms&format=csv` (or `.json`)
- **Daily Articles Sheet Export**: `/api/resources?type=articles&format=csv` (or `.json`)
- **Daily Videos Sheet Export**: `/api/resources?type=videos&format=csv` (or `.json`)
- **Live Interactive Dashboard**: `/resources`

---

## Setup Instructions

### 1. Connect to Your Artispreneur Supabase

Update `.env.local` with your Artispreneur Supabase credentials:

```bash
# Use your existing Artispreneur Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://[your-artispreneur-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-artispreneur-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-artispreneur-service-role-key]
```

### 2. Run Database Migrations

In your Supabase dashboard SQL Editor, run these migrations in order:

#### Step 1: Verify Shared Auth (should already exist)
```sql
-- Check that profiles table exists from Artispreneur
SELECT COUNT(*) FROM profiles;
```

#### Step 2: Create ADN Tables
```sql
-- Run the migration from: supabase/migrations/001_adn_tables.sql
-- This creates all `adn_*` prefixed tables
```

#### Step 3: Enable Row Level Security
```sql
-- Run the RLS policies from: supabase/migrations/002_adn_rls.sql
-- This secures ADN tables with proper access controls
```

---

## Folder Structure

```
src/
├── features/
│   └── daily-news/
│       ├── components/          # ADN-specific UI components
│       │   ├── ArticleCard/
│       │   ├── NewsGrid/
│       │   ├── SourceFilter/
│       │   └── ReadingTracker/
│       ├── hooks/               # ADN-specific React hooks
│       │   ├── useArticles.ts
│       │   ├── useBookmarks.ts
│       │   └── useReadingHistory.ts
│       ├── services/            # ADN business logic
│       │   ├── articles.ts
│       │   ├── rss-parser.ts
│       │   └── newsletter.ts
│       ├── types/               # ADN TypeScript types
│       │   └── index.ts
│       └── utils/               # ADN utilities
│           └── index.ts
├── lib/
│   └── supabase/                # Shared Supabase clients
│       ├── client.ts            # Browser client
│       ├── server.ts            # Server client
│       └── middleware.ts        # Auth middleware
└── app/
    └── (daily-news)/            # Route group for ADN pages
        ├── news/
        ├── topics/
        └── dashboard/
```

---

## Shared Authentication Flow

1. **User signs up/logs in** → Creates record in `auth.users` (Artispreneur)
2. **Profile created** → Triggers creation in `profiles` table (shared)
3. **ADN-specific data** → Stored in `adn_*` tables, linked by `user_id`

### Example: User Bookmarks Article

```typescript
// User authenticated via Artispreneur Supabase Auth
const { data: { user } } = await supabase.auth.getUser();

// Save to ADN-namespaced table
await supabase
  .from('adn_user_bookmarks')
  .insert({
    user_id: user.id,  // Links to shared auth.users
    article_id: 'article-123'
  });
```

---

## Benefits of This Architecture

✅ **Shared Authentication**: Users log in once for all Artispreneur products  
✅ **Clean Separation**: `adn_` prefix keeps Artist Daily News data organized  
✅ **Unified Billing**: One Supabase project for all services  
✅ **Cross-Product Features**: Easy to build features that span products  
✅ **Single Source of Truth**: User profiles, permissions, and billing in one place

---

## Environment Variables

```bash
# Artispreneur Supabase (SHARED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Artist Daily News Specific
RESEND_API_KEY=re_your_newsletter_key
OPENAI_API_KEY=sk-your_summarization_key

# Shared Services
STRIPE_SECRET_KEY=sk_your_shared_stripe_key
```

---

## Next Steps

1. ✅ Connect to Artispreneur Supabase (update `.env.local`)
2. ✅ Run database migrations (`supabase/migrations/`)
3. ✅ Verify RLS policies are active
4. ✅ Test authentication flow
5. ✅ Deploy updated environment variables to Vercel

---

**Last Updated:** August 30, 2026  
**Status:** Ready for Migration
