import { WalletIcon, ReceiptIcon, TrendUpIcon, ChartLineUpIcon, HouseIcon, PiggyBankIcon } from "@phosphor-icons/react/ssr";
import { problems } from "@/lib/finance";
import BlurFade from "./BlurFade";

const bars = [26, 17, 14, 43];

const icons = {
  SPENDING: WalletIcon,
  TAX: ReceiptIcon,
  INVESTING: TrendUpIcon,
  MARKETS: ChartLineUpIcon,
  LOANS: HouseIcon,
  RETIREMENT: PiggyBankIcon,
} as const;

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 ledger-lines opacity-40 pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-32 min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted">The problem</p>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] mt-4 min-w-0">
          <div className="lg:sticky lg:top-28 self-start min-w-0">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight break-words text-balance">
              Guessing game, every month.
            </h2>
            <p className="text-muted mt-4 break-words">
              Rs 48,320 in, no clear split out.
            </p>
            <div className="mt-6 border border-border bg-surface p-4 min-w-0 overflow-hidden" aria-hidden="true">
              <div className="flex gap-1 h-8 items-end min-w-0">
                {bars.map((b, i) => (
                  <div key={i} className="bg-foreground/80" style={{ width: `${b}%`, height: `${30 + b}%` }} />
                ))}
              </div>
              <p className="text-xs font-mono tabular-nums text-muted mt-2 break-words">Food 26 · Shop 17 · Travel 14 · Other 43</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0 overflow-hidden">
            {problems.map((p, i) => {
              const Icon = icons[p.category as keyof typeof icons];
              return (
                <BlurFade key={p.q} delay={(i % 2) * 0.06} className={`min-w-0 ${i === 0 || i === 5 ? "sm:col-span-2" : ""}`}>
                  <div className="bg-surface border border-border p-5 hover:border-foreground transition-colors rounded-none h-full flex items-center gap-4 min-w-0 overflow-hidden">
                    <span className="w-10 h-10 shrink-0 border border-foreground inline-flex items-center justify-center" title={p.category}>
                      <span className="sr-only">{p.category}</span>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="text-base break-words">“{p.q}”</p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
