# Artist Daily News - Simple Sitemap

**Core Focus:** News aggregation from music industry (Business, Culture, Ideas) + user article submissions. Keep it simple and profitable.

---

## Site Structure

### 1. Homepage `/`
- Hero with brand positioning
- Latest articles from 3 pillars
- Newsletter signup
- Quick stats (50+ feeds, weekly audio, AI copilot)

### 2. News Feed `/news`
- All articles chronologically
- Filter by pillar (Business, Culture, Ideas)
- Filter by source
- Search functionality

### 3. News Home (Cinematic) `/news-home`
- Full-screen hero
- The Wire (latest 8 articles)
- Three pillar columns
- Newsletter CTA
- Premium branded experience

### 4. Newsroom `/news/newsroom`
- User-submitted articles
- Personal article dashboard
- Submit new article form
- Edit/delete your articles
- Admin approval queue (backend)

### 5. Pricing `/pricing`
- Free tier: Read articles, submit 1 article/month
- Pro tier: Submit unlimited, priority approval, ad-free
- VIP tier: Verified press pass, newsletter sponsorships, analytics

### 6. Admin `/admin` (protected)
- Approve/reject user submissions
- Moderate articles
- View analytics
- Manage RSS feeds

---

## What We DON'T Need (Keep Simple!)

❌ Complex data systems  
❌ Separate features section  
❌ Reviews/ratings  
❌ Podcasts (yet)  
❌ Community forums  
❌ Advanced social features

---

## Implementation Priority

**Phase 1 (30 min):** Clean up nav, remove unused routes  
**Phase 2 (2 hrs):** Build user submission form  
**Phase 3 (1 hr):** Add filtering to /news  
**Phase 4 (30 min):** Update navigation

**Total time:** ~4 hours to have a working, profitable site

---

## Monetization Integration Points

1. **Newsletter Signup** - Every page footer
2. **Premium CTA** - Homepage hero, /news sidebar
3. **Ad Slots** - Between articles (Google AdSense ready)
4. **Affiliate Links** - Embedded in business articles
5. **Sponsored Content** - Special "Partner" badge on articles

---

## Database Schema (Already Exists)

```sql
-- Articles from RSS feeds (already working)
adn_items (id, title, dek, url, pillar, source_name, freshness)

-- User submissions (needs to be added)
adn_user_articles (
  id, user_id, title, dek, body, url, 
  pillar, status, created_at, approved_at
)

-- User profiles (Supabase Auth)
users (id, email, tier, press_pass_verified)
```

---

## Next Steps

1. ✅ Cinematic homepage created at `/news-home`
2. ⏳ Add user submission form
3. ⏳ Add admin approval queue
4. ⏳ Integrate Stripe for premium tiers
5. ⏳ Add Google AdSense slots
6. ⏳ Build newsletter automation
