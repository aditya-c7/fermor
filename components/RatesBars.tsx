"use client";

import { m } from "motion/react";
import { inr } from "@/lib/finance";

type Props = {
  sipRate?: number;
  fdRate?: number;
  sipValue?: number;
  fdValue?: number;
  invested?: number;
};

/**
 * RatesBars - detailed SIP vs FD comparison with invested vs gains split.
 * Big visible bars, widths proportional, labels in Rs.
 */
export default function RatesBars({ sipRate = 12, fdRate = 6.5, sipValue = 0, fdValue = 0, invested = 0 }: Props) {
  const maxRate = Math.max(sipRate, fdRate, 1);
  const maxValue = Math.max(sipValue, fdValue, 1);
  const sipGains = Math.max(sipValue - invested, 0);
  const fdGains = Math.max(fdValue - invested, 0);
  const rows = [
    { label: "SIP", value: sipRate, text: `${sipRate} pct`, dark: true },
    { label: "FD", value: fdRate, text: `${fdRate} pct`, dark: false },
  ];
  return (
    <div className="mt-4 border-2 border-border p-4 min-w-0 overflow-hidden" role="img" aria-label={`Rate comparison: SIP ${sipRate} percent versus FD ${fdRate} percent`}>
      <p className="font-mono text-base sm:text-lg font-bold tabular-nums break-words">SIP {sipRate} pct vs FD {fdRate} pct</p>
      <p className="sr-only">SIP 12 pct default benchmark</p>
      <p className="text-xs text-muted mt-1 break-words">Same money. Different outcomes. Bars scale with value.</p>
      <div className="mt-4 space-y-4 min-w-0">
        {rows.map((r) => (
          <div key={r.label} className="min-w-0">
            <div className="flex justify-between text-sm gap-2 min-w-0">
              <span className="uppercase tracking-wider text-muted font-bold truncate">{r.label}</span>
              <span className="font-mono tabular-nums font-bold shrink-0">{r.text}</span>
            </div>
            <div className="mt-1 h-4 border border-border bg-background" aria-hidden="true">
              <m.div
                className={`h-full ${r.dark ? "bg-primary" : "bg-muted"}`}
                initial={false}
                animate={{ width: `${(r.value / maxRate) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        ))}
      </div>
      {sipValue > 0 && (
        <div className="mt-4 space-y-4 border-t border-border pt-4 min-w-0">
          <div className="min-w-0">
            <div className="flex justify-between text-sm gap-2 min-w-0">
              <span className="font-bold truncate">SIP total</span>
              <span className="font-mono tabular-nums font-bold text-primary shrink-0">{inr(sipValue)}</span>
            </div>
            <div className="mt-1 h-6 border border-border bg-background flex" aria-hidden="true">
              <m.div
                className="h-full bg-muted"
                initial={false}
                animate={{ width: `${(invested / maxValue) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
              <m.div
                className="h-full bg-primary"
                initial={false}
                animate={{ width: `${(sipGains / maxValue) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <p className="mt-1 font-mono text-xs tabular-nums text-muted break-all">Invested {inr(invested)} + Gains {inr(sipGains)} = {inr(sipValue)}</p>
          </div>
          <div className="min-w-0">
            <div className="flex justify-between text-sm gap-2 min-w-0">
              <span className="font-bold truncate">FD total</span>
              <span className="font-mono tabular-nums font-bold shrink-0">{inr(fdValue)}</span>
            </div>
            <div className="mt-1 h-6 border border-border bg-background flex" aria-hidden="true">
              <m.div
                className="h-full bg-muted"
                initial={false}
                animate={{ width: `${(invested / maxValue) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
              <m.div
                className="h-full bg-foreground"
                initial={false}
                animate={{ width: `${(fdGains / maxValue) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <p className="mt-1 font-mono text-xs tabular-nums text-muted break-all">Invested {inr(invested)} + Gains {inr(fdGains)} = {inr(fdValue)}</p>
          </div>
        </div>
      )}
      <div className="sr-only">
        <table>
          <tbody>
            <tr><td>SIP</td><td>{sipRate} pct</td></tr>
            <tr><td>FD</td><td>{fdRate} pct</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
