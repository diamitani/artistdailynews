# Artist Daily News - Feature Module

This folder contains all Artist Daily News-specific code, organized for maintainability and scalability within the shared Artispreneur Supabase infrastructure.

## Architecture

### Shared Infrastructure
- **Authentication**: Uses Artispreneur `auth.users` table
- **Profiles**: Uses Artispreneur `profiles` table  
- **Supabase Project**: Connects to the same Artispreneur Supabase

### Namespaced Tables
All ADN tables use the `adn_` prefix:
- `adn_items` - News articles and content
- `adn_sources` - RSS feed sources
- `adn_user_bookmarks` - User-saved articles
- `adn_user_reading_history` - Reading tracking
- `adn_newsletter_subscriptions` - Newsletter preferences

## Folder Structure

```
src/features/daily-news/
├── components/          # React components
│   ├── ArticleCard/
│   ├── NewsGrid/
│   └── [future components]
├── hooks/               # Custom React hooks
│   ├── useArticles.ts
│   ├── useBookmarks.ts
│   └── useReadingHistory.ts
├── services/            # Business logic & API calls
│   ├── articles.ts
│   ├── rss-parser.ts
│   └── newsletter.ts
├── types/               # TypeScript definitions
│   └── index.ts
└── utils/               # Helper functions
    └── index.ts
```

## Usage Examples

### Fetching Articles (Server Component)

```typescript
import { getLatestArticles, getArticlesByPillar } from '@/features/daily-news/services/articles';

export default async function NewsPage() {
  const articles = await getLatestArticles(50);
  const businessNews = await getArticlesByPillar('business', 20);

  return <NewsGrid articles={articles} />;
}
```

### Managing Bookmarks (Client Component)

```typescript
'use client';

import { useBookmarks } from '@/features/daily-news/hooks/useBookmarks';

export function BookmarkButton({ itemId }: { itemId: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <button onClick={() => toggleBookmark(itemId)}>
      {isBookmarked(itemId) ? 'Saved' : 'Save'}
    </button>
  );
}
```

### Fetching Articles (Client Component)

```typescript
'use client';

import { useArticles } from '@/features/daily-news/hooks/useArticles';

export function LiveNewsFeed() {
  const { articles, isLoading, error } = useArticles('business', 20);

  if (isLoading) return <Skeleton />;
  if (error) return <Error message={error} />;

  return <NewsGrid articles={articles} />;
}
```

## Database Migrations

Run these in your Artispreneur Supabase SQL Editor:

1. **001_adn_tables.sql** - Creates all `adn_*` tables with RLS policies
2. **Verify**: Run `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'adn_%';`

## Benefits of This Structure

✅ **Clear Ownership**: All ADN code is in one place  
✅ **Shared Auth**: Users log in once for all Artispreneur products  
✅ **Type Safety**: Centralized TypeScript types  
✅ **Testability**: Easy to mock services and hooks  
✅ **Scalability**: Add new features without affecting other code

## Adding New Features

1. **Types**: Add interfaces to `types/index.ts`
2. **Service**: Add business logic to `services/`
3. **Hook**: Create React hook in `hooks/`
4. **Component**: Build UI in `components/`
5. **Test**: Ensure types, services, and hooks are tested

---

**Last Updated:** August 30, 2026  
**Maintainer:** Artist Daily News Team
