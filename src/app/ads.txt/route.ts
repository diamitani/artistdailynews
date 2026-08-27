import { NextResponse } from "next/server";

export async function GET() {
  // Standard Google AdSense and IAB verified ads.txt format
  const adsTxtContent = `# ArtistDailyNews.com (ADN) Verified Ads.txt
# Google AdSense Publisher Entry
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0

# Header Bidding Partners
appnexus.com, 12345, DIRECT, f5ab79116a65279b
rubiconproject.com, 67890, DIRECT, 0bfd66d529a55803
`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
