---
artifact_type: observability
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [operator, product]
well_architected_review: pass
confidence: 0.98
---

# 18. Observability & Telemetry — ArtistDailyNews.com

## 1. Metrics & Logs
- **Feed Ingestion Health**: Track success/failure rates per source domain in `/admin/newsdesk`.
- **Newsletter Delivery Rate**: Monitored via Resend webhook tracking open rates and bounce metrics.
- **Traffic & Readership**: Google Analytics 4 / PostHog tracking pageviews, quick-read drawer interactions, and tool calculations.

## 2. Alerts & Incident Escalation
- **Sev-1 (Critical)**: Site down or checkout failure -> Operator SMS & Slack notification.
- **Sev-2 (Major)**: >50% RSS feed crawling failures -> Automated log flag in newsroom console.
