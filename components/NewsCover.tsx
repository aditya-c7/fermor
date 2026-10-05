export default function NewsCover({ index, tag }: { index: number; tag: string }) {
  const big = ["25k", "FY27", "UPI"][index % 3];
  return (
    <div className="relative h-40 border-b border-border bg-background overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 dot-grid opacity-[0.08]" />
      <div className="absolute inset-0 ledger-lines opacity-30" />
      <span className="absolute bottom-2 left-4 font-serif text-6xl sm:text-7xl leading-none text-foreground/10 select-none">{big}</span>
      <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate text-xs px-2 py-1 bg-foreground text-background uppercase tracking-wider min-h-[44px] inline-flex items-center">{tag}</span>
      <span className="absolute bottom-3 right-4 font-mono text-xs text-muted tabular-nums">Rs · % · yrs</span>
    </div>
  );
}
