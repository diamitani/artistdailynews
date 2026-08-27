---
artifact_type: sitemap
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: design
reviewers: [eng, product]
well_architected_review: pass
confidence: 0.99
---

# 05. Sitemap Standard — ArtistDailyNews.com

| URL Path | Page Purpose | Auth Required | SEO Priority | Index Status |
|---|---|---|---|---|
| `/` | Master Media Homepage & Live Feed | Public | 1.0 (Daily) | `index, follow` |
| `/news/[slug]` | Deep-Dive Article View & JSON-LD | Public | 0.9 (Daily) | `index, follow` |
| `/topics/[category]` | 8 Dedicated Channel Hubs | Public | 0.8 (Weekly) | `index, follow` |
| `/tools` | Music Business Royalty & Multiplier Calculators | Public | 0.9 (Weekly) | `index, follow` |
| `/press-pass` | Press Accreditation & Media Kit | Public | 0.8 (Monthly) | `index, follow` |
| `/advertise` | Sponsor Rates & Stripe Checkout | Public | 0.7 (Monthly) | `index, follow` |
| `/podcasts` | Curated Music Business Podcasts | Public | 0.8 (Weekly) | `index, follow` |
| `/newsletters` | Daily Dispatch Newsletter Archive | Public | 0.8 (Daily) | `index, follow` |
| `/admin/newsdesk` | AI Newsdesk Agent Operator Studio | Operator Role | 0.1 | `noindex, nofollow` |
| `/ads.txt` | IAB Verified Google AdSense File | Public / Crawler | 0.5 | `index, follow` |
| `/api/news/feed` | JSON & XML Master RSS Feed | Public / Feed Readers | 0.8 | `index, follow` |
| `/api/news/sync` | Ingest Pipeline Trigger | Server Cron / Operator | N/A | `noindex` |
| `/api/checkout` | Stripe Commerce Checkout | Public | N/A | `noindex` |
