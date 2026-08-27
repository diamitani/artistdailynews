# Skill: premium-site-build-os

Use this skill whenever the operator wants a website, web app, SaaS, marketplace, landing page, or agent console that is premium, payable, and scalable.

## Trigger
User asks to build, redesign, or specify any site, including information architecture, system architecture, user stories, sitemap, PRD, specifications, tech stack, roadmap, frontend UI (marketing, OAuth, landing, pricing, checkout, chat), or backend (storage, database, secrets, instance, server, hosting, deployment, versioning).

## Inputs
- Product idea and audience
- Brand constraints and references (Taste Skill, 21st.dev, Framer as visual reference only)
- Whether payments are in v1
- Known stack overrides
- Deadline and scale stage (0–6)

## Steps
1. Run PAL. Ask at most one material clarifying question if blocked.
2. Draft artifacts 01–25 from the Site Empire OS catalog. Mark status and confidence.
3. Apply Taste Skill (`design-taste-frontend`) before UI code. Dual theme, no placeholders, no AI-slop layouts.
4. Answer AWS Well-Architected questions in the architecture doc before infra code.
5. Implement the critical path: landing, OAuth, pricing, checkout, core job, then chat if in scope.
6. Wire secrets server-side only. Postgres RLS on day one. Stripe webhooks as billing source of truth.
7. Fill the quality scorecard. Do not claim done below 4/5 without a written waiver.
8. Hand back docs, code, env checklist, and Now/Next/Later mapped to scale stages.

## Outputs
- `docs/*` artifacts (intent through evidence)
- `apps/web` production code with no placeholders
- Infra/env matrix and secret list (names only)
- Roadmap stages 0–6 (1 user → billions)
- Quality scorecard and WAF gate answers

## Default stack
Next.js App Router · TypeScript · Tailwind · shadcn/ui · Radix · Taste Skill · Supabase Auth/Postgres/Storage/RLS · Vercel · Stripe Checkout + Customer Portal · Resend · Inngest · Sentry · PostHog · Playwright · OpenTelemetry.

## Scale rule
Change capacity and topology as usage grows. Do not change the product object model (org, user, membership, project, entitlement, artifact, event) without an ADR.

## Denied
Secrets in git or client bundles. Trusting `/checkout/success` without webhook verification. Skipping mobile, a11y, or empty states. One global writable database as the billions plan.

## Reference
Read `premium-site-build-os.md` as the full operating system. Copy `soul.md` into agent identity. Use prompts P1–P5 from the OS for new product, docs-only, UI-only, infra-only, and scale review.
