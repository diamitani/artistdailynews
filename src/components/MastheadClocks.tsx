"use client";

import { useEffect, useState } from "react";

/**
 * Live masthead clocks. Times are computed in the browser at render time
 * and tick every minute — never frozen at build time.
 */
const ZONES: { label: string; timeZone: string }[] = [
  { label: "NYC", timeZone: "America/New_York" },
  { label: "LDN", timeZone: "Europe/London" },
  { label: "LA", timeZone: "America/Los_Angeles" },
  { label: "TYO", timeZone: "Asia/Tokyo" },
];

function nowIn(zone: string): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: zone,
  });
}

export function MastheadClocks() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  void tick;

  return (
    <div className="flex items-center space-x-4" aria-label="Current time in bureau cities">
      {ZONES.map((z) => (
        <span key={z.label}>
          {z.label}{" "}
          <strong className="text-[var(--text-primary)]" suppressHydrationWarning>
            {nowIn(z.timeZone)}
          </strong>
        </span>
      ))}
    </div>
  );
}
