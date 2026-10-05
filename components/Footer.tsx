import GiantFooter from "./GiantFooter";

export default function Footer() {
  return (
    <>
      <footer id="about" className="w-full max-w-full overflow-x-clip border-t border-border bg-background">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8">
          <div className="min-w-0">
            <p className="font-serif text-2xl tracking-tight">Fermor</p>
            <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-muted">Free calculators for India. No sales pitch.</p>
          </div>
          <nav aria-label="Product" className="min-w-0 text-sm">
            <p className="text-xs uppercase tracking-wider text-muted">Product</p>
            <ul className="mt-1">
              <li>
                <a href="https://fermor.in/calculators" className="line-link flex min-h-[44px] w-fit items-center">All 158 calculators</a>
              </li>
              <li>
                <a href="https://fermor.in/tax" className="line-link flex min-h-[44px] w-fit items-center">Tax hub - FY 2026-27</a>
              </li>
              <li>
                <a href="https://fermor.in/blogs" className="line-link flex min-h-[44px] w-fit items-center">Blogs</a>
              </li>
            </ul>
          </nav>
          <div className="min-w-0 text-sm">
            <p className="text-xs uppercase tracking-wider text-muted">Note</p>
            <p className="mt-3 max-w-[38ch] text-xs leading-relaxed text-muted">
              Fermor Technologies Pvt. Ltd. Education only. Not SEBI registered.
            </p>
          </div>
        </div>
      </footer>
      <GiantFooter />
    </>
  );
}
