"use client";

const items = [
  "Nifty 25,000",
  "SIP Rs 15,000 for 15y",
  "Tax FY 2026-27",
  "FD 6.5 percent",
  "Rs 48,320 spend",
  "Rs 53L to Rs 1.64Cr",
  "PPF 7.1 percent",
  "UPI over Rs 2,000",
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-surface" aria-label="Market highlights">
      <div className="marquee flex gap-8 whitespace-nowrap py-2 px-4 w-max max-w-none">
        {row.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="shrink-0 text-xs font-mono uppercase tracking-wider text-muted tabular-nums whitespace-nowrap"
          >
            {t} <span className="text-border ml-8" aria-hidden="true">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
