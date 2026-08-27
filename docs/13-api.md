---
artifact_type: api
project_id: artistdailynews-os
version: v1.0.0
status: approved
owner: eng
reviewers: [security, product]
well_architected_review: pass
confidence: 0.99
---

# 13. API Contracts — ArtistDailyNews.com

### 1. Ingestion Pipeline: `POST /api/news/sync`
- **Description**: Triggers concurrent crawling of active RSS feeds.
- **Request**: Empty body or `{ force: true }`.
- **Response**:
```json
{
  "success": true,
  "ingestedCount": 14,
  "feedsAttempted": 18,
  "timestamp": "2026-08-27T07:20:00.000Z"
}
```

### 2. Public Intelligence Feed: `GET /api/news/feed`
- **Query Params**: `category`, `limit`, `format` (json | rss).
- **Response (JSON)**:
```json
{
  "title": "Artist Daily News Intelligence Feed",
  "total": 20,
  "articles": [ ... ]
}
```

### 3. AI Newsdesk Curate: `POST /api/agent/curate`
- **Request**:
```json
{
  "title": "Federal Court AI Training Ruling",
  "rawText": "Full text snippet...",
  "sourceName": "Digital Music News",
  "category": "legal"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "summary": "2-sentence executive summary...",
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "takeaway": "Actionable DIY strategy...",
    "suggestedTags": ["AI", "Copyright", "Legal"]
  }
}
```

### 4. Newsletter Subscribe: `POST /api/newsletter/subscribe`
- **Request**: `{ "email": "artist@domain.com", "role": "Independent Artist", "topics": ["financial", "streaming"] }`
- **Response**: `{ "success": true, "message": "Subscribed to ADN Daily Dispatch." }`

### 5. Press Pass Accreditation: `POST /api/press-pass/apply`
- **Request**: `{ "applicantName": "Jordan", "email": "jordan@photo.com", "role": "photographer", "targetEvent": "SXSW" }`
- **Response**: `{ "success": true, "applicationId": "ADN-PRESS-892147", "status": "pending" }`

### 6. Stripe Checkout Session: `POST /api/checkout`
- **Request**: `{ "packageId": "artist-spotlight", "sponsorEmail": "brand@music.com" }`
- **Response**: `{ "url": "https://checkout.stripe.com/c/pay/cs_live_..." }`
