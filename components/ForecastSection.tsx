"use client";

import { useMemo, useState } from "react";
import { m } from "motion/react";
import { inr, sipFV } from "@/lib/finance";
import AnimatedCounter from "./ui/animated-counter";
import BlurFade from "./BlurFade";
import GlideField from "./GlideField";

export default function ForecastSection() {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(10);

  const points = useMemo(() => {
    return [0, 5, 10, 15, 20].map((y) => sipFV(monthly, 0.12, Math.max(y, 0.1)));
  }, [monthly]);

  const total = useMemo(() => sipFV(monthly, 0.12, years), [monthly, years]);

  const max = Math.max(...points, total, 1);
  const W = 600;
  const H = 280;
  const coords = [0, 5, 10, 15, 20].map((y, i) => {
    const x = (i / 4) * (W - 70) + 50;
    const v = points[i];
    const yy = H - 30 - (v / max) * (H - 60);
    return { x, y: yy, label: y === 0 ? "Today" : `${y}Y`, value: v };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const fmtLakh = (v: number) => `Rs ${(v / 100000).toFixed(1)}L`;

  return (
    <section id="forecast" className="relative bg-foreground text-background overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 dot-grid-light opacity-[0.12]" />
      <GlideField />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-32 min-w-0">
        <p className="text-xs uppercase tracking-wider opacity-70">The forecast</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-4 break-words text-balance">See your future. In numbers.</h2>
        <p className="mt-3 opacity-70 break-words">Rs 53L → Rs 1.64Cr in 10y. +211%.</p>

        <BlurFade>
          <div className="mt-6 flex flex-wrap items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-2 bg-[#4ADE80] text-black font-mono text-sm font-bold tracking-wider px-4 py-2 tabular-nums">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-black animate-pulse" />
              LIVE CHART
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-[2fr_1fr] mt-6 min-w-0">
            <div className="border-2 border-[#4ADE80]/60 p-3 sm:p-4 bg-background/5 min-w-0 overflow-hidden">
              <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto min-h-[240px] sm:min-h-[280px] max-w-full" role="img" aria-label="Wealth projection chart growing over 20 years, Y axis in Rs lakhs">
                {[0.25, 0.5, 0.75, 1].map((f) => (
                  <g key={f}>
                    <line
                      x1={50}
                      y1={H - 30 - f * (H - 60)}
                      x2={W - 20}
                      y2={H - 30 - f * (H - 60)}
                      stroke="#FFFFFF"
                      strokeOpacity={0.1}
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                    <text
                      x={2}
                      y={H - 26 - f * (H - 60)}
                      fill="#FAFAF7"
                      fillOpacity={0.9}
                      fontSize={11}
                      fontFamily="monospace"
                      aria-hidden="true"
                    >
                      {fmtLakh(max * f)}
                    </text>
                  </g>
                ))}
                {[0, 1, 2, 3, 4].map((i) => {
                  const x = (i / 4) * (W - 70) + 50;
                  return (
                    <line key={i} x1={x} y1={20} x2={x} y2={H - 30} stroke="#FFFFFF" strokeOpacity={0.1} strokeWidth={1} aria-hidden="true" />
                  );
                })}
                <m.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth={2.5}
                  style={{ filter: "drop-shadow(0 0 10px rgba(74,222,128,0.7))" }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                {coords.map((c) => (
                  <g key={c.label}>
                    <circle cx={c.x} cy={c.y} r={6} fill="#4ADE80" fillOpacity={0.25} aria-hidden="true" />
                    <circle cx={c.x} cy={c.y} r={4} fill="#4ADE80" stroke="#FFFFFF" strokeWidth={1.5} aria-hidden="true" />
                    <text x={c.x} y={c.y - 12} fill="#4ADE80" fontSize={11} textAnchor="middle" fontFamily="monospace" aria-hidden="true">
                      {fmtLakh(c.value)}
                    </text>
                    <text x={c.x} y={H - 10} fill="#FAFAF7" fontSize={12} textAnchor="middle" fontFamily="monospace" aria-hidden="true">
                      {c.label}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="sr-only">
                <table>
                  <tbody>
                    {coords.map((c) => (
                      <tr key={c.label}>
                        <td>{c.label}</td>
                        <td>{inr(c.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="min-w-0 overflow-hidden">
              <div className="space-y-5 min-w-0">
                <div className="min-w-0">
                  <label htmlFor="fc-amt" className="text-sm flex justify-between gap-2 min-w-0">
                    <span className="min-w-0 truncate">Monthly SIP</span>
                    <span className="font-mono tabular-nums shrink-0 text-right">{inr(monthly)}</span>
                  </label>
                  <input id="fc-amt" type="range" min={5000} max={100000} step={5000} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="mt-2 w-full min-h-[44px] max-w-full" aria-valuetext={inr(monthly)} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="fc-yrs" className="text-sm flex justify-between gap-2 min-w-0">
                    <span className="min-w-0 truncate">Years</span>
                    <span className="font-mono tabular-nums shrink-0">{years}</span>
                  </label>
                  <input id="fc-yrs" type="range" min={5} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2 w-full min-h-[44px] max-w-full" aria-valuetext={`${years} years`} />
                </div>
              </div>
              <div aria-live="polite" aria-atomic="true" className="mt-6 min-w-0 overflow-hidden">
                <p className="text-xs uppercase tracking-wider opacity-70">Projected</p>
                <p className="font-mono text-2xl sm:text-3xl lg:text-4xl text-[#4ADE80] tabular-nums mt-1 break-all max-w-full overflow-hidden"><AnimatedCounter value={Math.round(total)} prefix="Rs " separator="," grouping="indian" duration={0.9} /></p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
