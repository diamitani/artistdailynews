---
artifact_type: backend-infra
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [security, operator]
well_architected_review: pass
confidence: 0.99
---

# 15. Backend & Infrastructure Specification — ArtistDailyNews.com

## 1. Hosting & Compute Topology
- **Hosting Provider**: Vercel Serverless Edge Network with Global CDN distribution.
- **DNS & WAF**: Cloudflare with DDoS protection, automatic SSL, and HTTP/3 support.
- **Database**: Supabase Postgres (Managed PostgreSQL 15) with connection pooling and automated daily point-in-time recovery (PITR).

## 2. Ingestion Engine & Schedulers
- **Cron Trigger**: Vercel Cron / Inngest triggering `POST /api/news/sync` at `0 * * * *` (every 60 minutes).
- **Resilience**: Feeds with HTTP errors are automatically marked `status: failing` in the database and skipped on subsequent runs after 3 consecutive failures.

## 3. Environment Secrets Matrix (Names Only)

| Variable Name | Environment | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production / Staging | Supabase API endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production / Staging | Public client RLS access key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production / Secret | Server-side database administrator key |
| `OPENAI_API_KEY` | Production / Secret | GPT-4o-mini newsdesk summarization |
| `STRIPE_SECRET_KEY` | Production / Secret | Stripe Checkout & billing backend |
| `STRIPE_WEBHOOK_SECRET` | Production / Secret | Stripe webhook signature verification |
| `RESEND_API_KEY` | Production / Secret | Daily newsletter dispatch API |
