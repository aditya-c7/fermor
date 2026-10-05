"use client";

import { useMemo, useState } from "react";
import { inr, sipFV, fdLumpSum } from "@/lib/finance";
import AnimatedCounter from "./ui/animated-counter";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import RatesBars from "./RatesBars";

export default function SipVsFdCalculator() {
  const [monthly, setMonthly] = useState(15000);
  const [years, setYears] = useState(15);
  const [sipRate, setSipRate] = useState(12);
  const [fdRate, setFdRate] = useState(6.5);

  const { sipValue, fdValue, invested } = useMemo(() => {
    const total = monthly * 12 * years;
    const sip = sipFV(monthly, sipRate / 100, years);
    const fd = fdLumpSum(total, fdRate / 100, years);
    return { sipValue: sip, fdValue: fd, invested: total };
  }, [monthly, years, sipRate, fdRate]);

  const diff = sipValue - fdValue;

  return (
    <Card id="hero-calc" className="w-full min-w-0 overflow-hidden">
      <CardContent className="pt-6 min-w-0">
        <Badge variant="outline">Live</Badge>
        <CardTitle className="mt-3 break-words">See the difference</CardTitle>
        <CardDescription className="mt-1 break-words">Same money. Different outcomes.</CardDescription>

        <div className="mt-6 space-y-2 min-w-0">
          <div className="min-w-0">
            <label htmlFor="sip-amt" className="text-sm flex justify-between gap-2 min-w-0">
              <span className="min-w-0 truncate">Monthly SIP</span>
              <span className="font-mono tabular-nums shrink-0">{inr(monthly)}</span>
            </label>
            <input id="sip-amt" type="range" min={5000} max={50000} step={1000} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="slider" aria-valuetext={inr(monthly)} />
          </div>
          <div className="min-w-0">
            <label htmlFor="sip-yrs" className="text-sm flex justify-between gap-2 min-w-0">
              <span className="min-w-0 truncate">Time period</span>
              <span className="font-mono tabular-nums shrink-0">{years} yrs</span>
            </label>
            <input id="sip-yrs" type="range" min={5} max={25} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="slider" aria-valuetext={`${years} years`} />
          </div>
          <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 min-[420px]:gap-4">
            <div className="min-w-0">
              <label htmlFor="sip-ret" className="text-sm flex justify-between gap-2 min-w-0">
                <span className="min-w-0 truncate">SIP return</span>
                <span className="font-mono tabular-nums shrink-0">{sipRate}%</span>
              </label>
              <input id="sip-ret" type="range" min={8} max={18} step={0.5} value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="slider" aria-valuetext={`${sipRate} percent`} />
            </div>
            <div className="min-w-0">
              <label htmlFor="fd-ret" className="text-sm flex justify-between gap-2 min-w-0">
                <span className="min-w-0 truncate">FD rate</span>
                <span className="font-mono tabular-nums shrink-0">{fdRate}%</span>
              </label>
              <input id="fd-ret" type="range" min={5} max={9} step={0.1} value={fdRate} onChange={(e) => setFdRate(Number(e.target.value))} className="slider" aria-valuetext={`${fdRate} percent`} />
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        <div aria-live="polite" aria-atomic="true" className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="min-w-0 overflow-hidden">
              <p className="text-xs uppercase tracking-wider text-muted truncate">SIP value</p>
              <p className="font-mono text-lg tabular-nums mt-1 text-primary break-words sm:text-xl xl:text-2xl"><AnimatedCounter value={Math.round(sipValue)} prefix="Rs " separator="," grouping="indian" duration={0.9} /></p>
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="text-xs uppercase tracking-wider text-muted truncate">FD value</p>
              <p className="font-mono text-lg tabular-nums mt-1 text-muted break-words sm:text-xl xl:text-2xl"><AnimatedCounter value={Math.round(fdValue)} prefix="Rs " separator="," grouping="indian" duration={0.9} /></p>
            </div>
          </div>
          <p className="mt-3 text-sm font-mono tabular-nums text-primary break-words max-w-full">+<AnimatedCounter value={Math.round(diff)} prefix="Rs " separator="," grouping="indian" duration={0.9} className="inline-flex" /> with SIP</p>
          <p className="mt-1 text-xs text-muted break-words">Invested {inr(invested)} over {years} years</p>
          <RatesBars sipRate={sipRate} fdRate={fdRate} sipValue={sipValue} fdValue={fdValue} invested={invested} />
        </div>
      </CardContent>
    </Card>
  );
}
