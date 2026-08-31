# Daily 6am RSS Automation

## ✅ Option 1: Vercel Cron (ACTIVE)

Already configured in `vercel.json` - runs at 6am UTC daily.

**Setup:**
1. Add to Vercel environment variables:
   ```
   CRON_SECRET=7vvugPBh63NmZfixGAEsc1f/ikWf1uroGor7jVmELhE=
   ```

2. Deploy: `vercel --prod`

3. Test:
   ```bash
   curl -X POST https://news.artispreneur.com/api/cron/rss-ingest \
     -H "Authorization: Bearer 7vvugPBh63NmZfixGAEsc1f/ikWf1uroGor7jVmELhE="
   ```

## 🤖 Option 2: GitHub Actions

File: `.github/workflows/daily-news-ingest.yml`

1. Add GitHub secret: `CRON_SECRET`
2. Push to GitHub
3. Check Actions tab

## 🔄 Option 3: n8n

File: `docs/n8n/adn-daily-6am.json`

1. Import into n8n
2. Set env: `CRON_SECRET`
3. Activate

## 🧪 Test Locally

```bash
npm run ingest
```

## ⏰ Timezone

- 6am UTC = 2am EST / 11pm PST
- Change in `vercel.json`: `"schedule": "0 11 * * *"` for 6am EST
