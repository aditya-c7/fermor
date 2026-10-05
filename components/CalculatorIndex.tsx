"use client";

import { useState } from "react";
import { calculators } from "@/lib/finance";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "./ui/badge";
import BlurFade from "./BlurFade";

const icons: Record<string, string> = {
  All: "#",
  Investing: "Rs",
  Tax: "%",
  Loans: "=",
  Retirement: "+",
};

const categories = ["All", "Investing", "Tax", "Loans", "Retirement"];

function countFor(cat: string) {
  if (cat === "All") return calculators.length;
  return calculators.filter((c) => c.category === cat).length;
}

export default function CalculatorIndex() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? calculators : calculators.filter((c) => c.category === active);

  return (
    <section id="calculators" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-32 min-w-0 overflow-hidden">
      <Badge variant="default" className="mb-4 max-w-full">BROWSE BY GOAL</Badge>
      <h2 className="font-serif text-4xl md:text-5xl break-words text-balance">158 calculators. One place.</h2>
      <p className="text-muted mt-3 break-words">SIP, tax, EMI, FIRE. No login wall.</p>

      <nav aria-label="Category" className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4 min-w-0">
        {categories.map((f) => {
          const isActive = active === f;
          const count = countFor(f);
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              aria-label={`${f} ${count}`}
              className={`inline-flex min-h-[44px] max-w-full items-center gap-2 px-4 py-2 text-sm border transition-colors rounded-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isActive ? "bg-foreground text-background border-foreground" : "border-border bg-background hover:border-foreground"
              }`}
            >
              <span aria-hidden="true" className={`font-mono text-xs w-6 h-6 shrink-0 inline-flex items-center justify-center border ${isActive ? "border-background" : "border-border"}`}>
                {icons[f] ?? "#"}
              </span>
              {f}
              <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "border-background" : ""}>
                {count}
              </Badge>
            </button>
          );
        })}
      </nav>
      <p aria-live="polite" className="sr-only">Showing {list.length} calculators in {active}</p>

      <div className="mt-4 border-t border-border min-w-0">
        {list.map((c, i) => (
          <BlurFade key={c.name} delay={Math.min(i * 0.03, 0.2)} className="min-w-0">
            <a
              href="#calculators"
              className="group flex items-center justify-between gap-4 py-4 border-b border-border px-2 min-h-[44px] hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            >
              <div className="flex gap-4 items-center min-w-0">
                <span aria-hidden="true" className="font-mono text-sm border border-foreground w-10 h-10 shrink-0 inline-flex items-center justify-center bg-background">
                  {icons[c.category] ?? "#"}
                </span>
                <div className="min-w-0">
                  <p className="font-medium break-words">{c.name}</p>
                  <p className="sr-only">{c.desc}</p>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <span className="sr-only">{c.category}</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </BlurFade>
        ))}
      </div>
      <a href="https://fermor.in/calculators" className="inline-flex min-h-[44px] items-center mt-6 text-sm line-link whitespace-nowrap">
        View all 158 -&gt;
      </a>
    </section>
  );
}
