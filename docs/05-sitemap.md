---
artifact_type: sitemap
project_id: artistdailynews-os
version: v2.0.0
status: approved
owner: design
reviewers: [eng, product, editorial]
well_architected_review: pass
confidence: 0.99
---

# 05. Comprehensive Sitemap Standard — ArtistDailyNews.com

| URL Path | Page Purpose | Auth Required | SEO Priority | Change Frequency | Index Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Master Media Homepage, Broadsheet Layout & Live Feed | Public | 1.0 | Hourly | `index, follow` |
| `/news` | Daily Post Editorial Digest & Live 3-Pillar Wire | Public | 1.0 | Hourly | `index, follow` |
| `/news/[slug]` | Deep-Dive Article Detail View & JSON-LD NewsArticle Schema | Public | 0.95 | Daily | `index, follow` |
| `/topics/financial` | Royalties, Catalogue M&A & Valuation Desk | Public | 0.90 | Hourly | `index, follow` |
| `/topics/streaming` | DSP Market Share & Playlist Velocity Desk | Public | 0.90 | Hourly | `index, follow` |
| `/topics/tech-ai` | AI Music Production & Algorithmic Discovery Desk | Public | 0.90 | Hourly | `index, follow` |
| `/topics/legal-royalties` | Copyright, Mechanicals & PRO Split Agreements | Public | 0.85 | Daily | `index, follow` |
| `/topics/marketing` | Direct-to-Fan, Pre-Save & Bio-Link Funnels | Public | 0.85 | Daily | `index, follow` |
| `/topics/gear-production` | Audio Engineering, Plugins & Studio Hardware | Public | 0.85 | Daily | `index, follow` |
| `/topics/a2im-indie` | Indie Label News, A2IM & Trade Associations | Public | 0.85 | Daily | `index, follow` |
| `/topics/sync-licensing` | Film, TV, Gaming & Commercial Sync Opportunities | Public | 0.85 | Daily | `index, follow` |
| `/tools` | Interactive Streaming Royalty, NPS Multiplier & Release Blueprint Suite | Public | 0.90 | Weekly | `index, follow` |
| `/podcasts` | Curated Music Business Masterclasses & Audio Network | Public | 0.85 | Daily | `index, follow` |
| `/newsletters` | Morning Dispatch Daily Newsletter Archive | Public | 0.85 | Daily | `index, follow` |
| `/pricing` | VIP Pro Insider & Enterprise Label Tier Pricing Matrix | Public | 0.90 | Weekly | `index, follow` |
| `/press-pass` | Festival, Summit & Tour Press Pass Accreditation Hub | Public | 0.90 | Weekly | `index, follow` |
| `/network` | Artispreneur Partner Perks, DistroKid, LANDR & Songtrust Discounts | Public | 0.85 | Weekly | `index, follow` |
| `/advertise` | 2026 Media Kit, Rate Card & Official Artispreneur Brand Guidelines Kit | Public | 0.80 | Monthly | `index, follow` |
| `/chat` | ADN AI Music Business Copilot Assistant | Public / Pro | 0.80 | Weekly | `index, follow` |
| `/dashboard` | User Portal, Saved Articles, Badges & Release Roadmaps | Authenticated | 0.50 | Weekly | `noindex, follow` |
| `/billing` | Stripe Customer Portal, Subscription Management & Invoices | Authenticated | 0.40 | Monthly | `noindex, nofollow` |
| `/admin/newsdesk` | AI Newsdesk RSS Operator Dashboard & Sync Studio | Operator Role | 0.10 | Daily | `noindex, nofollow` |
| `/ads.txt` | IAB Verified Google AdSense File | Public Crawler | 0.50 | Monthly | `index, follow` |
| `/sitemap.xml` | Auto-generated Dynamic Next.js XML Sitemap | Search Engines | 1.0 | Daily | `index, follow` |
| `/api/news/feed` | Dynamic RSS 2.0 & JSON Feed Endpoint | Public Readers | 0.85 | Hourly | `index, follow` |
| `/api/news/sync` | RSS Ingest & AI Synthesis Pipeline | Internal Trigger | N/A | Hourly | `noindex` |
| `/api/checkout` | Stripe Commerce Checkout Handler | Public Form | N/A | N/A | `noindex` |
