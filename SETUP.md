# Artist Daily News - Setup Guide

## Quick Start: Phase 1.1 Complete ✅

This guide walks you through setting up Supabase Auth for production-ready authentication.

---

## 1. Create Supabase Project

### Step 1: Sign up at Supabase
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (recommended)

### Step 2: Create New Project
1. Click "New Project"
2. **Organization:** Select or create one
3. **Name:** `artistdailynews`
4. **Database Password:** Generate a strong password (save this!)
5. **Region:** Choose closest to your users (e.g., `us-east-1`)
6. Click "Create new project"

⏳ **Wait 2-3 minutes** for project to provision.

---

## 2. Configure Database Schema

### Step 1: Open SQL Editor
1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### Step 2: Run Schema Migration
1. Open the file: `/supabase-schema.sql`
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **"Run"** (bottom right)

✅ You should see: `Success. No rows returned`

### Step 3: Verify Tables Created
1. Click **"Table Editor"** in left sidebar
2. You should see these tables:
   - `profiles`
   - `user_saved_articles`
   - `user_reading_history`

---

## 3. Enable OAuth Providers

### Google OAuth

1. Go to **Authentication → Providers** in Supabase dashboard
2. Find **Google** and click to expand
3. Toggle **"Enable Sign in with Google"**
4. You'll need:
   - **Authorized Client IDs:** (optional for development)
   - Leave default for now

5. Note the callback URL: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`

### Spotify OAuth

1. Go to https://developer.spotify.com/dashboard
2. Click **"Create app"**
3. Fill in:
   - **App name:** Artist Daily News
   - **App description:** Music business intelligence platform
   - **Redirect URI:** `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - **Web API:** Yes

4. Copy your **Client ID** and **Client Secret**

5. Back in Supabase:
   - Go to **Authentication → Providers**
   - Find **Spotify** and click to expand
   - Toggle **"Enable Sign in with Spotify"**
   - Paste **Client ID** and **Client Secret**
   - Click **"Save"**

---

## 4. Get Your Environment Variables

### In Supabase Dashboard

1. Go to **Settings → API** (left sidebar, bottom)
2. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon public: eyJhbGc... (long string)
service_role: eyJhbGc... (long string - keep secret!)
```

---

## 5. Configure Local Environment

### Create `.env.local` file

```bash
cd "/Users/patmini/Desktop/Agent PAL - artistdailynews"
touch .env.local
```

### Add Environment Variables

Open `.env.local` and paste:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key

# Email Provider (Resend) - Coming in Phase 1.2
# RESEND_API_KEY=re_your_api_key_here

# AI Provider (OpenAI)
# OPENAI_API_KEY=sk-your-key-here

# Analytics (PostHog) - Coming in Week 3
# NEXT_PUBLIC_POSTHOG_KEY=phc_your_key
# NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Payments (Stripe) - Already configured
STRIPE_SECRET_KEY=your_existing_key
STRIPE_WEBHOOK_SECRET=your_existing_key
```

⚠️ **NEVER commit `.env.local` to git!** It's already in `.gitignore`.

---

## 6. Test Authentication

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Test Signup Flow

1. Go to `/auth/signup`
2. Enter email and password
3. Click "Sign Up"
4. Check Supabase dashboard → Authentication → Users
5. You should see your new user!

### Test Login Flow

1. Go to `/auth/login`
2. Enter your credentials
3. You should be redirected to `/dashboard`

### Test OAuth (if configured)

1. Click "Sign in with Google" or "Sign in with Spotify"
2. Complete OAuth flow
3. Check Supabase dashboard → you'll see the user with provider info

---

## 7. Verify Everything Works

### Checklist

- [ ] Supabase project created
- [ ] Database schema migrated (tables visible in Table Editor)
- [ ] OAuth providers enabled (at least one)
- [ ] Environment variables added to `.env.local`
- [ ] Dev server starts without errors
- [ ] Can create account (email/password)
- [ ] Can log in
- [ ] Can log out
- [ ] User appears in Supabase Authentication tab
- [ ] Profile auto-created in `profiles` table

---

## 8. Deploy to Vercel

### Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: `artistdailynews`
3. Go to **Settings → Environment Variables**
4. Add the same variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. Click **"Save"**

### Redeploy

```bash
git add .
git commit -m "feat: activate Supabase Auth"
git push origin main
```

Vercel will auto-deploy. Wait ~1 minute, then test on production URL.

---

## Troubleshooting

### "Invalid API key" error
- Double-check you copied the correct keys from Supabase
- Make sure you're using `anon` key (not `service_role`) for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### OAuth callback error
- Verify redirect URI matches exactly: `https://[PROJECT].supabase.co/auth/v1/callback`
- For Spotify, make sure app is not in "Development Mode"

### User not appearing in database
- Check Supabase logs: **Logs → Postgres Logs**
- Verify trigger is created: Run `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`

### Session not persisting
- Clear browser cookies and try again
- Check middleware is working: Add `console.log` in `/src/middleware.ts`

---

## Next Steps

✅ **Phase 1.1 Complete!**

**Phase 1.2: Email Infrastructure** (2-3 days)
- Set up Resend account
- Create newsletter templates
- Implement double opt-in
- Build daily dispatch system

**Week 2: Component Enhancement**
- Add loading skeletons to all pages
- Enhance auth pages with better UX
- Add error toasts

**Full Plan:** See `/Users/patmini/.claude/plans/how-much-in-order-cozy-anchor.md`

---

## Support

- **Supabase Docs:** https://supabase.com/docs
- **Next.js + Supabase Guide:** https://supabase.com/docs/guides/auth/server-side/nextjs
- **Discord:** Join Supabase Discord for help

---

**Last Updated:** August 30, 2026  
**Status:** Phase 1.1 (Supabase Auth) - Ready for Testing
