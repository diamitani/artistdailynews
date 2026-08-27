---
artifact_type: payments
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [operator, product]
well_architected_review: pass
confidence: 0.99
---

# 16. Monetization & Payments Specification — ArtistDailyNews.com

## 1. Revenue Streams

### 1.1 Programmatic Display Ads (Google AdSense / Prebid)
- **Top Leaderboard (728x90 desktop / 320x50 mobile)**: CPM benchmark: $4.50–$8.00.
- **In-Feed Native Cards**: High-engagement native sponsored blocks ($6.00–$12.00 CPM).
- **Sidebar Medium Rectangle (300x250)**: Sticky unit for creator tools ($5.00 CPM).

### 1.2 Self-Serve Direct Sponsorship Packages
- **$149 — Newsletter Primary Banner**: Top hero image + 75-word sponsor copy sent to 35,000+ verified email subscribers.
- **$299 — Sponsored Artist / Brand Spotlight**: Dedicated permanent editorial feature, homepage pinned placement for 7 days, social blast, and newsletter inclusion.
- **$799/mo — Monthly Site Takeover**: Comprehensive category dominance with banner exclusivity and weekly newsletter slots.

### 1.3 VIP Insider Membership Tier ($19/month)
- Ad-free reading experience.
- Full access to historical catalogue sale transaction databases.
- Priority processing for Festival Press Pass accreditation.
- Early grant application alerts (48 hours before public posting).

## 2. Webhook Event Handling
- `checkout.session.completed`: Provisions sponsor placement or upgrades subscriber tier to `pro_insider`.
- `customer.subscription.deleted`: Reverts subscriber tier to `free`.
