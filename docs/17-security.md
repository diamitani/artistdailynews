---
artifact_type: security
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [operator, security]
well_architected_review: pass
confidence: 0.99
---

# 17. Security & Privacy Specification — ArtistDailyNews.com

## 1. Threat Model & Mitigations
- **DDoS & Scraping Abuse**: Cloudflare Rate Limiting + Vercel Edge Protection.
- **SQL Injection**: Complete parameterization via Supabase Postgres ORM and RLS.
- **Cross-Site Scripting (XSS)**: Strict HTML sanitization in RSS ingestion parsing (`cleanHtml`) removing all `<script>` tags, event handlers, and iframe embeds.
- **Secret Leaks**: Zero API keys bundled in client code. Server-side API route handlers for all OpenAI, Stripe, and Resend calls.

## 2. Privacy & Compliance
- **GDPR / CCPA Compliant**: 1-click unsubscribe links in all email dispatches.
- **Payment Privacy**: PCI DSS compliance maintained via Stripe Hosted Checkout (no credit card data touches our servers).
