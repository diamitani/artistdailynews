import fs from "fs";
import path from "path";
import { TOP_100_PLATFORMS } from "../src/lib/top100-platforms";
import { DAILY_ARTICLES_SHEET } from "../src/lib/daily-articles-sheet";
import { DAILY_VIDEOS_SHEET } from "../src/lib/daily-videos-sheet";
import { platformsToCsv, dailyArticlesToCsv, dailyVideosToCsv } from "../src/lib/resources-schema";

const srcDataDir = path.join(process.cwd(), "src", "data");
const publicExportsDir = path.join(process.cwd(), "public", "exports");

if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

if (!fs.existsSync(publicExportsDir)) {
  fs.mkdirSync(publicExportsDir, { recursive: true });
}

// 1. Top 100 Platforms
const top100Json = JSON.stringify(TOP_100_PLATFORMS, null, 2);
const top100Csv = platformsToCsv(TOP_100_PLATFORMS);

fs.writeFileSync(path.join(srcDataDir, "top100_platforms.json"), top100Json, "utf8");
fs.writeFileSync(path.join(srcDataDir, "top100_platforms.csv"), top100Csv, "utf8");
fs.writeFileSync(path.join(publicExportsDir, "top100_platforms.csv"), top100Csv, "utf8");
console.log("✓ Exported Top 100 Platforms (JSON & CSV)");

// 2. Daily Articles Sheet
const articlesJson = JSON.stringify(DAILY_ARTICLES_SHEET, null, 2);
const articlesCsv = dailyArticlesToCsv(DAILY_ARTICLES_SHEET);

fs.writeFileSync(path.join(srcDataDir, "daily_articles_sheet.json"), articlesJson, "utf8");
fs.writeFileSync(path.join(srcDataDir, "daily_articles_sheet.csv"), articlesCsv, "utf8");
fs.writeFileSync(path.join(publicExportsDir, "daily_articles_sheet.csv"), articlesCsv, "utf8");
console.log("✓ Exported Daily Articles Sheet (JSON & CSV)");

// 3. Daily Videos Sheet
const videosJson = JSON.stringify(DAILY_VIDEOS_SHEET, null, 2);
const videosCsv = dailyVideosToCsv(DAILY_VIDEOS_SHEET);

fs.writeFileSync(path.join(srcDataDir, "daily_videos_sheet.json"), videosJson, "utf8");
fs.writeFileSync(path.join(srcDataDir, "daily_videos_sheet.csv"), videosCsv, "utf8");
fs.writeFileSync(path.join(publicExportsDir, "daily_videos_sheet.csv"), videosCsv, "utf8");
console.log("✓ Exported Daily YouTube Videos Sheet (JSON & CSV)");
