"use client";

import { periodicSeries, toPoints } from "@/lib/series";

const price2 = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const int0 = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

type Asset = {
  name: string;
  code: string;
  symbol: string;
  price: number;
  priceText: string;
  changePct: number;
  down?: boolean;
  seed: number;
  stroke: string;
};

const ASSETS: Asset[] = [
  { name: "HDFC BANK", code: "HDFC", symbol: "H", price: 1612.5, priceText: `Rs ${price2.format(1612.5)}`, changePct: 1.56, seed: 0.5, stroke: "#4ADE80" },
  { name: "SBI", code: "SBI", symbol: "S", price: 785.4, priceText: `Rs ${price2.format(785.4)}`, changePct: 0.82, seed: 2.1, stroke: "#4ADE80" },
  { name: "MARUTI", code: "MARUTI", symbol: "M", price: 11248.3, priceText: `Rs ${price2.format(11248.3)}`, changePct: -1.06, down: true, seed: 4.2, stroke: "#F87171" },
];

const W = 220;
const H = 64;
const PAD = 6;

function spark(seed: number, down?: boolean) {
  return periodicSeries({
    n: 48,
    base: 0.55,
    harmonics: [
      { cycles: 1, amp: down ? -0.14 : 0.16, phase: seed },
      { cycles: 3, amp: 0.06, phase: seed + 1.4 },
      { cycles: 8, amp: 0.025, phase: seed + 0.6 },
    ],
  });
}

function NiftySpark() {
  const data = spark(1.2).map((v) => Math.min(1, Math.max(0, v)));
  const pts = (x0: number) => toPoints(data, { width: W, height: H, x0, pad: PAD });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16 mt-2 border border-border bg-surface" aria-hidden="true" focusable="false">
      <clipPath id="ms-NIFTY">
        <rect x="0" y="0" width={W} height={H} />
      </clipPath>
      <g clipPath="url(#ms-NIFTY)">
        <g className="ledger-stream" style={{ "--stream-w": W, "--stream-dur": "8s" } as React.CSSProperties}>
          {[0, W].map((x0) => (
            <polyline key={x0} points={pts(x0)} fill="none" stroke="#4ADE80" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * MarketStrip - detailed live ticker with asset-header style rows.
 * Big visible cards, green and red sparklines, streaming animation.
 */
export default function MarketStrip() {
  return (
    <div className="border-b border-border bg-surface" role="img" aria-label="Live Indian market snapshot: HDFC Bank Rs 1,612.50 up 1.56 percent, SBI Rs 785.40 up 0.82 percent, Maruti Rs 11,248.30 down 1.06 percent, Nifty 50 at 25,000">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-2 pb-6 min-w-0">
        <div className="flex flex-wrap items-center gap-3 py-4 min-w-0">
          <span aria-hidden="true" className="inline-block size-3 shrink-0 bg-primary ledger-marker-pulse" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight tabular-nums break-words min-w-0">INDIAN STOCKS LIVE</h2>
          <span className="font-mono text-xs tabular-nums text-surface bg-primary px-3 py-1.5 font-bold min-h-[44px] inline-flex items-center whitespace-nowrap">STREAMING</span>
        </div>
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-4 min-w-0">
          {ASSETS.map((a) => {
            const data = spark(a.seed, a.down).map((v) => Math.min(1, Math.max(0, v)));
            const pts = (x0: number) => toPoints(data, { width: W, height: H, x0, pad: PAD });
            return (
              <div key={a.code} className="border-2 border-border bg-background p-4 min-w-0 overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 min-w-0">
                  <span aria-hidden="true" className={`flex size-12 shrink-0 items-center justify-center font-mono text-xl font-bold ${a.down ? "bg-[#F87171] text-black" : "bg-[#4ADE80] text-black"}`}>
                    {a.symbol}
                  </span>
                  <div className="min-w-0 flex-1 basis-24 overflow-hidden">
                    <p className="font-mono text-sm font-bold tracking-wide truncate">{a.name}</p>
                    <p className="font-mono text-xs tabular-nums text-muted truncate">{a.code} - NSE</p>
                  </div>
                  <span className={`shrink-0 whitespace-nowrap font-mono text-sm font-bold tabular-nums px-3 py-1 min-h-[44px] inline-flex items-center ${a.down ? "bg-[#F87171]/15 text-[#F87171] border border-[#F87171]" : "bg-[#4ADE80]/15 text-primary border border-primary"}`}>
                    {a.down ? "-" : "+"}{Math.abs(a.changePct).toFixed(2)} pct
                  </span>
                </div>
                <p className="font-mono text-2xl font-bold tabular-nums mt-3 truncate">{a.priceText}</p>
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16 mt-2 border border-border bg-surface" aria-hidden="true" focusable="false">
                  <clipPath id={`ms-${a.code}`}>
                    <rect x="0" y="0" width={W} height={H} />
                  </clipPath>
                  <g clipPath={`url(#ms-${a.code})`}>
                    <g className="ledger-stream" style={{ "--stream-w": W, "--stream-dur": "8s" } as React.CSSProperties}>
                      {[0, W].map((x0) => (
                        <polyline key={x0} points={pts(x0)} fill="none" stroke={a.stroke} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
                      ))}
                    </g>
                  </g>
                </svg>
              </div>
            );
          })}
          <div className="border-2 border-primary bg-background p-4 min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 min-w-0">
              <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center font-mono text-xl font-bold bg-primary text-surface">N</span>
              <div className="min-w-0 flex-1 basis-24 overflow-hidden">
                <p className="font-mono text-sm font-bold tracking-wide truncate">NIFTY 50</p>
                <p className="font-mono text-xs tabular-nums text-muted truncate">INDEX - NSE</p>
              </div>
              <span className="shrink-0 whitespace-nowrap font-mono text-sm font-bold tabular-nums px-3 py-1 min-h-[44px] inline-flex items-center bg-primary text-surface">live</span>
            </div>
            <p className="font-mono text-2xl font-bold tabular-nums mt-3 truncate">{int0.format(25000)}</p>
            <NiftySpark />
          </div>
        </div>
      </div>
      <div className="sr-only">
        <table>
          <tbody>
            <tr><td>HDFC Bank</td><td>Rs 1,612.50</td><td>up 1.56 pct</td></tr>
            <tr><td>SBI</td><td>Rs 785.40</td><td>up 0.82 pct</td></tr>
            <tr><td>Maruti</td><td>Rs 11,248.30</td><td>down 1.06 pct</td></tr>
            <tr><td>Nifty 50</td><td>25,000</td><td>record level</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
