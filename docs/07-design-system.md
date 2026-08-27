---
artifact_type: design-system
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: design
reviewers: [eng, product]
well_architected_review: pass
confidence: 0.99
---

# 07. Design System & Taste Standard — ArtistDailyNews.com

## 1. Visual Philosophy: "Bloomberg meets Pitchfork for Independent Creators"
- Authoritative, high-density music journalism.
- Luxury obsidian background with high-voltage neon yellow accents (`#D4FF00`) and live pulsing status elements.
- Zero AI-slop layouts: intentional typographic scales, structured grids, and subtle micro-interactions.

## 2. Color Tokens

| Token | Hex Value | Semantic Usage |
|---|---|---|
| `--bg-primary` | `#090A0F` | Main editorial background |
| `--bg-secondary` | `#12131A` | Card containers & header bar |
| `--accent-volt` | `#D4FF00` | Primary brand accent, breaking highlights, buttons |
| `--accent-crimson` | `#FF3366` | Live alerts, breaking news badge |
| `--accent-emerald` | `#10B981` | Financial & catalogue valuation figures |
| `--text-primary` | `#F4F4F6` | High-contrast display headlines |
| `--text-secondary` | `#94A3B8` | Body copy and summaries |
| `--text-muted` | `#64748B` | Timestamps, read times, and tags |

## 3. Typography Hierarchy
- **Masthead & Hero Headlines**: `Inter` / `Outfit` 900 weight, tight tracking (-0.03em), line-height 1.15.
- **Section Headers**: 800 weight, uppercase tracking (0.05em).
- **Body & Longform**: 400–500 weight, line-height 1.6, anti-aliased.
- **Financial Figures & Metrics**: `JetBrains Mono` / monospace font for dense data tables.

## 4. Key Interactive Elements
1. **Live Pulsing Newsdesk Dot**: Continuous CSS ring animation signaling real-time ingestion.
2. **Infinite Breaking Marquee**: 35-second linear loop that pauses on hover.
3. **30-Second Quick-Read Drawer**: Smooth right-to-left slide animation with dark backdrop blur.
4. **Theme Switcher**: Instant transition between luxury dark mode and high-contrast light mode.
