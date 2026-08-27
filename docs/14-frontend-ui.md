---
artifact_type: frontend-ui
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: design
reviewers: [eng, product]
well_architected_review: pass
confidence: 0.99
---

# 14. Frontend UI Specification — ArtistDailyNews.com

## 1. Key Component Layouts

### 1.1 Live Masthead & Header (`Header.tsx`)
- Top edition bar displaying current live timestamp (`Thursday, Aug 27, 2026`) and animated red pulsing dot.
- Logo lockup with glowing volt badge.
- Topic channel dropdown links and search modal trigger.
- Direct CTA: "Apply for Press Pass" and "Join Daily Briefing".

### 1.2 Breaking News Marquee (`BreakingTicker.tsx`)
- Infinite linear marquee scrolling latest breaking stories with live flash indicator.
- CSS hover pause state for interactive scanning.

### 1.3 Hero Story Showcase (`HeroHeadline.tsx`)
- 7-column lead story card with high-res cover, 30s executive summary, and "Why It Matters For DIY" highlight.
- 5-column secondary trending stories list with fast-track press pass card.

### 1.4 News Feed Grid (`NewsGrid.tsx`)
- 8 category pills with count badges (`Royalties & Catalogues`, `Streaming & Playlists`, `AI & Tech`, etc.).
- Client-side search input filtering titles, sources, and tags.
- In-feed native sponsor ad units injected seamlessly.

### 1.5 Interactive Financial Suite (`FinancialCalculator.tsx`)
- Two tabs: **Streaming Payouts** (Spotify, Apple Music, Tidal, YouTube) and **Catalogue Valuation Multiplier (NPS)**.
- Real-time calculations with visual breakdown of master recording vs songwriting publishing splits.

### 1.6 30-Second Executive Summary Drawer (`SummaryDrawer.tsx`)
- Slide-in side panel allowing readers to consume key takeaways in under 30 seconds.
