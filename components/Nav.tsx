"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const menuItems = [
  { label: "Dashboard", href: "#calculators" },
  { label: "Saved calculators", href: "#calculators" },
  { label: "Sign out", href: "#about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-0 shrink-0 font-serif text-2xl tracking-tight">
          <span aria-hidden="true" className="w-6 h-6 border border-foreground inline-flex items-center justify-center font-mono text-xs shrink-0">F</span>
          Fermor
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-4 lg:gap-8 text-sm">
          <a href="#calculators" className="line-link inline-flex items-center min-h-[44px] px-1 whitespace-nowrap">Calculators</a>
          <a href="#forecast" className="line-link inline-flex items-center min-h-[44px] px-1 whitespace-nowrap">Forecast</a>
          <a href="#news" className="line-link inline-flex items-center min-h-[44px] px-1 whitespace-nowrap">Insights</a>
          <a href="#about" className="line-link inline-flex items-center min-h-[44px] px-1 whitespace-nowrap">About</a>
        </nav>
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <span className="inline-flex items-center gap-2 min-w-0">
            <Button variant="outline" size="sm" asChild>
              <a href="#hero-calc" className="max-w-[9.5rem] truncate">Get started</a>
            </Button>
            <span aria-hidden="true" className="hidden sm:inline-flex items-center bg-foreground text-background text-xs font-mono px-2 py-1 leading-none shrink-0">NEW</span>
          </span>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Investor profile menu"
              className="inline-flex min-h-[44px] items-center gap-2 border border-border px-2 py-1 text-sm hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 rounded-none bg-background"
            >
              <span aria-hidden="true" className="w-8 h-8 rounded-full border border-foreground bg-foreground text-background inline-flex items-center justify-center font-mono text-sm">F</span>
              <span className="hidden sm:block font-medium">Investor</span>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className={open ? "rotate-180 transition-transform" : "transition-transform"}>
                <polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {open && (
              <div role="menu" aria-label="Profile" className="absolute right-0 top-full mt-1 w-52 border border-border bg-surface shadow-none rounded-none">
                <p className="px-4 pt-3 pb-2 text-xs uppercase tracking-wider text-muted">Investor - FY 2026-27</p>
                <Separator />
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    role="menuitem"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center px-4 text-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav aria-label="Sections" className="md:hidden flex gap-6 overflow-x-auto overscroll-x-contain px-4 sm:px-6 pb-3 text-sm -mx-px">
        <a href="#calculators" className="shrink-0 min-h-[44px] inline-flex items-center">Calculators</a>
        <a href="#forecast" className="shrink-0 min-h-[44px] inline-flex items-center">Forecast</a>
        <a href="#news" className="shrink-0 min-h-[44px] inline-flex items-center">Insights</a>
        <a href="#about" className="shrink-0 min-h-[44px] inline-flex items-center">About</a>
      </nav>
    </header>
  );
}
