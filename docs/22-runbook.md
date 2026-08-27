---
artifact_type: runbook
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: ops
reviewers: [operator, eng]
well_architected_review: pass
confidence: 0.99
---

# 22. Operations & Incident Runbook — ArtistDailyNews.com

## 1. Local Development
```bash
# 1. Start development server
npm run dev

# 2. Run clean production build
npm run build
```

## 2. Triggering Manual Feed Sync & Newsletter Dispatch
```bash
# Ingest active feeds
curl -X POST http://localhost:3000/api/news/sync

# Compile daily newsletter
curl -X POST http://localhost:3000/api/newsletter/dispatch
```

## 3. Production Deployment Checklist
1. Connect GitHub repository to Vercel.
2. Configure Custom Domain: `artistdailynews.com` + `www.artistdailynews.com`.
3. Add Environment Variables (`STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`).
4. Submit Sitemap (`https://artistdailynews.com/sitemap.xml`) to Google Search Console.
5. Verify `/ads.txt` in Google AdSense Publisher portal.
