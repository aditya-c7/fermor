import { ArrowLeftIcon, ArrowLineDownIcon, ArrowLineUpIcon, DotsThreeIcon, InfoIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Market detail header for HDFC Bank. Mirrors the uimaxx asset-header
 * layout (back link, identity plus actions, hairline-split stats row)
 * with Fermor Indian stock details and Ledger light tokens.
 */
export function FermorAssetHeader() {
  const stats = [
    { label: "Price", value: "Rs 1,612.50" },
    { label: "Day Range", value: "1,598 - 1,621" },
    { label: "52W High / Low", value: "1,757 / 1,364" },
    { label: "P/E", value: "22.1x" },
    { label: "Div Yield", value: "1.21%" },
  ];

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden border border-border bg-surface p-4 sm:p-6 rounded-none">
      <a href="#calculators" aria-label="Back to Markets" className="inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
      </a>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-x-6 gap-y-4 min-w-0">
        <div className="flex flex-wrap items-center gap-3.5 min-w-0 basis-full xl:basis-auto">
          <span className="flex size-12 shrink-0 items-center justify-center border border-foreground bg-foreground font-mono text-lg text-background rounded-none" aria-hidden="true">
            H
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
              <h3 className="text-xl font-semibold leading-none tracking-tight sm:text-2xl break-words min-w-0">HDFC Bank</h3>
              <span className="text-xl leading-none tracking-tight text-muted sm:text-2xl break-words">HDFCBANK</span>
              <Badge variant="outline" className="text-primary border-primary">+1.56%</Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1 text-xs text-muted min-w-0">
              <span>NSE</span>
              <span aria-hidden="true">·</span>
              <span>Nifty 50</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 min-w-0 sm:w-auto sm:flex-nowrap">
          <Button size="sm" asChild>
            <a href="#hero-calc">
              <ArrowLineDownIcon className="size-4" />
              Start SIP
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#forecast">
              <ArrowLineUpIcon className="size-4" />
              Compare
            </a>
          </Button>
          <span className="flex size-10 items-center justify-center border border-border" aria-hidden="true">
            <DotsThreeIcon className="size-4" />
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-y-5 gap-x-4 min-[520px]:grid-cols-3 xl:grid-cols-5 xl:gap-y-0 xl:divide-x xl:divide-border min-w-0">
        {stats.map((s) => (
          <div key={s.label} className="pr-4 min-w-0 overflow-hidden xl:px-5 xl:first:pl-0">
            <div className="flex items-center gap-1 text-xs text-muted min-w-0">
              <span className="truncate min-w-0">{s.label}</span>
              <InfoIcon className="size-3 shrink-0" aria-hidden="true" />
            </div>
            <div className="mt-1.5 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl font-mono break-words break-all min-w-0">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
