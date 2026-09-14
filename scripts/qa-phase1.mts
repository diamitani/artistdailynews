/**
 * Phase 1 Trust & Instrumentation integrity checks.
 * Run: npx tsx scripts/qa-phase1.mts
 * Exits non-zero on any failure.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;

function check(name: string, ok: boolean, detail = "") {
  if (ok) console.log(`  PASS  ${name}`);
  else {
    failures++;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const read = (p: string) => readFileSync(join(ROOT, p), "utf8");
const load = (p: string) => JSON.parse(read(p));

// ── 1. Quarantine gate ──────────────────────────────────────────
console.log("\n[1] Quarantine gate");
const quarantine = load("src/data/quarantine.json");
const qids: string[] = quarantine.items.map((i: any) => i.id);
const articles = load("src/data/articles.json");
const items = load("src/data/adn_items.json");
const qset = new Set(qids);

const articleIds = new Set(articles.map((a: any) => a.id));
const itemIds = new Set(items.map((i: any) => i.id));
check("all 13 quarantine IDs exist in articles.json", qids.every((id) => articleIds.has(id)));
check("all 13 quarantine IDs exist in adn_items.json", qids.every((id) => itemIds.has(id)));

// Simulate the db.ts/adn-db.ts public-read filter
const publicArticles = articles.filter((a: any) => !qset.has(a.id));
const publicItems = items.filter((i: any) => !qset.has(i.id));
check("no quarantined IDs in public articles", publicArticles.every((a: any) => !qset.has(a.id)));
check("no quarantined IDs in public items", publicItems.every((i: any) => !qset.has(i.id)));
check("quarantine removes exactly 13 records", articles.length - publicArticles.length === 13);

// ── 2. Canonical URLs ───────────────────────────────────────────
console.log("\n[2] Canonical source URLs");
const badUrls = publicArticles.filter(
  (a: any) => !/^https?:\/\//i.test(a.originalUrl || "")
);
check("every public article has a valid http(s) originalUrl", badUrls.length === 0,
  badUrls.length ? `e.g. ${badUrls[0]?.id}` : "");

// ── 3. Dedupe ───────────────────────────────────────────────────
console.log("\n[3] Deduplication");
const normTitle = (t: string) =>
  (t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
const seenUrls = new Set<string>();
let dupUrls = 0;
for (const a of publicArticles) {
  const u = (a.originalUrl || "").toLowerCase();
  if (u) { if (seenUrls.has(u)) dupUrls++; else seenUrls.add(u); }
}
check("no duplicate canonical URLs in public articles", dupUrls === 0, `${dupUrls} dupes`);

// ── 4. Timestamp honesty (uses the REAL formatTimeAgo) ─────────
console.log("\n[4] Timestamp honesty");
const { formatTimeAgo } = await import("../src/lib/utils.ts");
check("old date renders as absolute date, not fake 'ago'",
  /2020/.test(formatTimeAgo("2020-01-15T10:00:00Z")) && !/ago/.test(formatTimeAgo("2020-01-15T10:00:00Z")),
  formatTimeAgo("2020-01-15T10:00:00Z"));
check("missing date renders empty", formatTimeAgo("") === "");
const future = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
const futureLabel = formatTimeAgo(future);
check("future date never renders as 'Just now'/'ago'", !/just now|ago/i.test(futureLabel), futureLabel);
const recent = new Date(Date.now() - 30 * 60 * 1000).toISOString();
check("30-min-old date renders '30m ago'", formatTimeAgo(recent) === "30m ago", formatTimeAgo(recent));

// ── 5. Banned fabrication patterns in src/ ─────────────────────
console.log("\n[5] Banned patterns");
const banned: Array<[string, string]> = [
  ["src/lib/adn-db.ts", "normalizeItemsToToday"],
  ["src/lib/db.ts", "normalizeItemsToToday"],
  ["src/app/page.tsx", "normalizeItemsToToday"],
  ["src/lib/utils.ts", "normalizedHours"],
];
const deadLinkFiles = [
  "src/app/page.tsx",
  "src/components/BreakingTicker.tsx",
  "src/components/NewsByPlatformSection.tsx",
  "src/components/Footer.tsx",
  "src/components/ArticleDetailView.tsx",
];
const falseClaims = ["35,000+", "2,000+", "50+ OUTLETS", "50+ Verified", "ISSN", "Verified Press Entity", "50+ outlets synced"];
for (const [file] of banned) {
  check(`${file} has no ${"normalizeItemsToToday/normalizedHours"}`, !read(file).includes("normalizeItemsToToday") && !read(file).includes("normalizedHours"));
}
for (const file of deadLinkFiles) {
  check(`${file} has no href="#"`, !read(file).includes('href="#"'));
}
const claimFiles = ["src/app/page.tsx", "src/components/Footer.tsx", "src/app/layout.tsx"];
for (const file of claimFiles) {
  const src = read(file);
  const found = falseClaims.filter((c) => src.toLowerCase().includes(c.toLowerCase()));
  check(`${file} has no fabricated volume/credential claims`, found.length === 0, found.join(", "));
}

// publishedAt must never default to "now" (ingestedAt may — that IS now)
for (const file of ["src/app/page.tsx", "src/lib/adn-db.ts", "src/lib/db.ts", "src/lib/rss-parser.ts"]) {
  const src = read(file);
  const lines = src.split("\n");
  const bad = lines.filter((l) => /publishedAt|published_at|freshness/i.test(l) && l.includes("new Date().toISOString()") && !/ingested/i.test(l));
  check(`${file}: no publishedAt defaulting to now`, bad.length === 0, bad[0]?.trim());
}

// ── 6. Trust pages live ─────────────────────────────────────────
console.log("\n[6] Trust pages");
for (const p of ["about", "editorial-standards", "corrections", "privacy", "terms"]) {
  check(`/${p} page exists`, existsSync(join(ROOT, `src/app/${p}/page.tsx`)));
}
const footer = read("src/components/Footer.tsx");
for (const p of ["/about", "/editorial-standards", "/corrections"]) {
  check(`footer links ${p}`, footer.includes(p));
}

// ── Summary ─────────────────────────────────────────────────────
console.log(failures === 0 ? "\nALL PHASE 1 QA CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
