---
artifact_type: architecture
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [security, product]
well_architected_review: pass
confidence: 0.99
---

# 10. System Architecture — ArtistDailyNews.com

```mermaid
graph TD
    subgraph "Clients"
        Desktop["Desktop Readers (Chrome/Safari)"]
        Mobile["Mobile Readers (iOS/Android PWA)"]
        FeedReaders["RSS Feed Consumers / Aggregators"]
    end

    subgraph "Edge CDN & Presentation Layer"
        VercelCDN["Vercel Edge Network & Cloudflare DNS"]
        NextApp["Next.js 16 App Router (React 19 Server Components)"]
        ThemeEngine["Dark / Light Theme Engine"]
    end

    subgraph "API & Autonomous Agents"
        SyncAPI["/api/news/sync (RSS Ingestion Cron)"]
        FeedAPI["/api/news/feed (JSON & XML RSS)"]
        AIAgent["/api/agent/curate (LLM Newsdesk Agent)"]
        NewsletterAPI["/api/newsletter/dispatch (Resend / Mail Engine)"]
        PressPassAPI["/api/press-pass/apply (Accreditation)"]
        StripeAPI["/api/checkout & /api/webhook/stripe"]
    end

    subgraph "Storage & External Ecosystem"
        Postgres[("Supabase Postgres with RLS")]
        OpenAI["OpenAI / Gemini / Anthropic API"]
        StripeGateway["Stripe Checkout & Billing"]
        AdSense["Google AdSense Network"]
    end

    Desktop --> VercelCDN
    Mobile --> VercelCDN
    FeedReaders --> FeedAPI

    VercelCDN --> NextApp
    NextApp --> ThemeEngine
    NextApp --> SyncAPI
    NextApp --> FeedAPI
    NextApp --> AIAgent
    NextApp --> NewsletterAPI
    NextApp --> PressPassAPI
    NextApp --> StripeAPI

    SyncAPI --> Postgres
    AIAgent --> OpenAI
    StripeAPI --> StripeGateway
    NextApp --> AdSense
```

## AWS Well-Architected Gate Assessment
- **Operational Excellence**: Zero-touch hourly automated ingestion pipeline with comprehensive logging in `/admin/newsdesk`.
- **Security**: Strict Postgres RLS policies, zero client-side secret exposure, encrypted webhook signatures.
- **Reliability**: Dual-fallback architecture: if external LLM or RSS endpoints time out, heuristic parsers and cached articles prevent downtime.
- **Performance Efficiency**: Next.js App Router edge caching with sub-second FCP.
- **Cost Optimization**: Serverless edge compute with on-demand AI inference.
- **Sustainability**: Minimal CPU overhead with XML stream parsing.
