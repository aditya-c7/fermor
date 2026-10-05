/**
 * Full-width CTA band. Mirrors the uimaxx exchange-cta layout
 * (one big centered button) with Fermor SIP details and
 * Ledger sharp tokens.
 */
export function FermorExchangeCta() {
  return (
    <section aria-label="Calculate your SIP" className="border-y border-border bg-surface overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 text-center min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted break-words">EXCHANGE CONFUSION FOR MATH</p>
        <h2 className="font-serif text-3xl md:text-4xl mt-3 break-words text-balance">Rs 15,000 a month can do the talking.</h2>
        <div className="flex w-full min-w-0 items-center justify-center mt-8">
          <a
            href="#hero-calc"
            className="inline-flex min-h-[56px] min-w-[44px] w-full max-w-[484px] items-center justify-center bg-foreground px-6 text-[17px] sm:text-[19px] font-semibold text-background rounded-none hover:bg-primary transition-colors text-center break-words"
          >
            Calculate your SIP
          </a>
        </div>
      </div>
    </section>
  );
}
