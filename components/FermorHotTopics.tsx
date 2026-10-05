import { CaretRightIcon, FireIcon } from "@phosphor-icons/react/ssr";

const TOPICS = [
  { rank: 1, name: "Nifty 25,000 record", volume: "82K" },
  { rank: 2, name: "New tax regime FY26-27", volume: "64K" },
  { rank: 3, name: "SIP inflows at record", volume: "41K" },
  { rank: 4, name: "UPI MDR rule change", volume: "27K" },
  { rank: 5, name: "Gold at all-time high", volume: "19K" },
];

/**
 * Ranked list of the topics pulling the most reads today.
 * Mirrors the uimaxx hot-topics layout with Fermor Indian topics
 * and Ledger light tokens.
 */
export function FermorHotTopics() {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden border border-border bg-surface p-4 rounded-none">
      <div className="flex items-center justify-between gap-2 min-w-0">
        <h3 className="text-base font-semibold truncate">Hot topics</h3>
        <a
          href="#news"
          aria-label="See all hot topics"
          className="grid size-11 place-items-center text-muted hover:text-foreground min-h-[44px] min-w-[44px]"
        >
          <CaretRightIcon className="size-4" />
        </a>
      </div>

      <ul className="mt-3 min-w-0">
        {TOPICS.map((topic) => (
          <li key={topic.rank}>
            <a
              href="#news"
              className="group -mx-2 flex min-h-[44px] w-full items-center gap-2 sm:gap-3 rounded-none px-2 text-left text-sm hover:bg-background"
            >
              <span className="w-4 shrink-0 tabular-nums text-muted font-mono group-hover:text-foreground">
                {topic.rank}
              </span>
              <span className="font-medium min-w-0 flex-1 break-words">{topic.name}</span>
              <span className="ml-auto shrink-0 text-xs tabular-nums text-muted font-mono whitespace-nowrap">
                {topic.volume}
              </span>
              <FireIcon className="size-3.5 shrink-0 text-primary group-hover:scale-125 transition-transform" aria-hidden="true" />
              <CaretRightIcon className="size-3.5 shrink-0 text-muted group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
