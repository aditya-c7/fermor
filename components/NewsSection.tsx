import { news } from "@/lib/finance";
import { ArrowRightIcon, ClockIcon } from "@phosphor-icons/react/ssr";
import BlurFade from "./BlurFade";
import NewsCover from "./NewsCover";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function NewsSection() {
  return (
    <section id="news" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-32 min-w-0 overflow-hidden">
      <div className="flex items-end justify-between flex-wrap gap-4 min-w-0">
        <h2 className="font-serif text-4xl md:text-5xl max-w-[16ch] break-words text-balance min-w-0">News that impacts your wallet.</h2>
        <Button variant="secondary" size="sm" asChild className="shrink-0 max-w-full whitespace-nowrap">
          <a href="https://fermor.in/blogs">
            View all <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 min-w-0">
        {news.map((n, i) => (
          <BlurFade key={n.title} delay={i * 0.08} className="min-w-0">
            <Card className="overflow-hidden hover:border-foreground transition-colors h-full min-w-0">
              <NewsCover index={i} tag={n.category} />
              <CardContent className="pt-6 min-w-0">
                <h3 className="font-semibold text-lg leading-snug break-words text-balance min-w-0">{n.title}</h3>
                <p className="text-xs text-muted mt-3 tabular-nums flex flex-wrap items-center gap-1.5 min-w-0 break-words">
                  <ClockIcon className="size-3.5 shrink-0" aria-hidden="true" />
                  {n.time} · {n.read}
                </p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
