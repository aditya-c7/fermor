"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedCounterGrouping = "indian" | "international" | "none";

export type AnimatedCounterProps = {
  value: number;
  separator?: string;
  grouping?: AnimatedCounterGrouping;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

function groupIntegerPart(intPart: string, grouping: AnimatedCounterGrouping, separator: string): string {
  if (grouping === "none" || separator === "") return intPart;
  if (intPart.length <= 3) return intPart;
  if (grouping === "international") {
    const groups: string[] = [];
    let rest = intPart;
    while (rest.length > 3) {
      groups.unshift(rest.slice(-3));
      rest = rest.slice(0, -3);
    }
    if (rest) groups.unshift(rest);
    return groups.join(separator);
  }
  // indian: last 3 digits, then groups of 2
  const last3 = intPart.slice(-3);
  let rest = intPart.slice(0, -3);
  const groups: string[] = [];
  while (rest.length > 2) {
    groups.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) groups.unshift(rest);
  return groups.join(separator) + separator + last3;
}

export function formatCounterValue(
  value: number,
  grouping: AnimatedCounterGrouping = "indian",
  separator = ",",
  decimals = 0,
): string {
  const safe = Number.isFinite(value) ? value : 0;
  const negative = safe < 0;
  const abs = Math.abs(safe);
  const fixed = abs.toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const grouped = groupIntegerPart(intPart, grouping, separator);
  const withFrac = decimals > 0 ? `${grouped}.${fracPart ?? "0".repeat(decimals)}` : grouped;
  return `${negative ? "-" : ""}${withFrac}`;
}

function RollingDigit({ digit, duration }: { digit: number; duration: number }) {
  return (
    <span aria-hidden="true" className="inline-flex h-[1em] w-[1ch] overflow-hidden leading-none">
      <m.span
        initial={false}
        animate={{ y: `-${digit}em` }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col leading-none"
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex h-[1em] w-[1ch] items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </m.span>
    </span>
  );
}

export default function AnimatedCounter({
  value,
  separator = ",",
  grouping = "indian",
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 0.6,
  className,
}: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion();
  const rounded = decimals === 0 ? Math.round(value) : value;
  const formatted = formatCounterValue(rounded, grouping, separator, decimals);
  const fullText = `${prefix}${formatted}${suffix}`;

  if (reduceMotion) {
    return <span className={cn("inline-flex tabular-nums", className)}>{fullText}</span>;
  }

  const chars = formatted.split("");

  return (
    <span className={cn("inline-flex items-baseline tabular-nums", className)}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {prefix ? <span className="inline-flex leading-none">{prefix}</span> : null}
        {chars.map((ch, i) => {
          if (ch >= "0" && ch <= "9") {
            return <RollingDigit key={`${i}-${ch}`} digit={Number(ch)} duration={duration} />;
          }
          return (
            <span key={`${i}-${ch}`} className="inline-flex leading-none">
              {ch}
            </span>
          );
        })}
        {suffix ? <span className="inline-flex leading-none">{suffix}</span> : null}
      </span>
    </span>
  );
}
