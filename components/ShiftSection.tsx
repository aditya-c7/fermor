"use client";

import { useState } from "react";
import { m } from "motion/react";
import { CheckIcon, XIcon } from "@phosphor-icons/react/ssr";

const before = ["Rs 48,320, no split", "Regime? No answer", "SIP, no end date"];
const after = ["Rs 48,320 split in seconds", "Regimes compared, FY26-27", "SIP with a date + number"];

export default function ShiftSection() {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <section className="border-t border-b border-border overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-32 text-center min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted">The shift</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-4 break-words text-balance">
          {isAfter ? "Money makes sense." : "Money happens to you."}
        </h2>

        <div className="mt-8 inline-flex w-full max-w-xs sm:w-auto sm:max-w-full border border-foreground rounded-none overflow-hidden">
          <button
            onClick={() => setIsAfter(false)}
            className={`px-6 min-h-[44px] min-w-[44px] inline-flex flex-1 items-center justify-center text-sm rounded-none whitespace-nowrap ${!isAfter ? "bg-foreground text-background" : "hover:bg-surface"}`}
            aria-pressed={!isAfter}
          >
            Before
          </button>
          <button
            onClick={() => setIsAfter(true)}
            className={`px-6 min-h-[44px] min-w-[44px] inline-flex flex-1 items-center justify-center text-sm rounded-none whitespace-nowrap ${isAfter ? "bg-foreground text-background" : "hover:bg-surface"}`}
            aria-pressed={isAfter}
          >
            After
          </button>
        </div>

        <m.ul
          key={isAfter ? "after" : "before"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
          className="mt-8 max-w-md mx-auto text-left space-y-3 min-w-0 w-full px-0"
        >
          {(isAfter ? after : before).map((t) => (
            <li key={t} className="border border-border rounded-none bg-surface p-4 flex gap-3 items-center min-w-0 overflow-hidden">
              <span className={`w-8 h-8 shrink-0 inline-flex items-center justify-center border ${isAfter ? "border-primary text-primary" : "border-border text-muted"}`}>
                {isAfter ? <CheckIcon className="size-4" aria-hidden="true" /> : <XIcon className="size-4" aria-hidden="true" />}
              </span>
              <span className="text-sm break-words min-w-0 flex-1">{t}</span>
            </li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
