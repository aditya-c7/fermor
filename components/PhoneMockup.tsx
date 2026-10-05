"use client";

import { m } from "motion/react";

const LINE = "M0,30 L20,28 L40,26 L60,27 L80,22 L100,20 L120,14 L140,12 L160,6";

export default function PhoneMockup() {
  return (
    <div className="border border-foreground bg-surface w-full max-w-[200px] min-w-0 shrink-0 mx-auto min-[500px]:mx-0 overflow-hidden" aria-label="Fermor app preview built with code">
      <div className="border-b border-border px-3 py-2 flex items-center justify-between">
        <span className="font-serif text-sm">Fermor</span>
        <span className="w-12 h-3 bg-foreground rounded-none" aria-hidden="true" />
      </div>
      <div className="p-3 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted">Nifty 50</p>
          <p className="font-mono text-lg tabular-nums">25,000</p>
          <svg viewBox="0 0 160 40" className="w-full h-8 mt-1" role="img" aria-label="Nifty 50 trend rising to 25,000">
            <m.path
              d={LINE}
              fill="none"
              stroke="#1B4332"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
        </div>
        <div className="border-t border-border pt-2 space-y-1.5 text-[11px] min-w-0">
          <div className="flex justify-between gap-2 font-mono tabular-nums min-w-0"><span className="min-w-0 truncate">HDFC Rs 1,612.50</span><span className="text-primary shrink-0 whitespace-nowrap">+1.56 pct</span></div>
          <div className="flex justify-between gap-2 font-mono tabular-nums min-w-0"><span className="min-w-0 truncate">SBI Rs 785.40</span><span className="text-primary shrink-0 whitespace-nowrap">+0.82 pct</span></div>
          <div className="flex justify-between gap-2 font-mono tabular-nums min-w-0"><span className="min-w-0 truncate">Maruti Rs 11,248.30</span><span className="text-muted shrink-0 whitespace-nowrap">-1.06 pct</span></div>
        </div>
        <div className="border border-border p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted">SIP 15k x 15y</p>
          <p className="font-mono text-sm tabular-nums text-primary">Rs 75.7L</p>
        </div>
      </div>
    </div>
  );
}
