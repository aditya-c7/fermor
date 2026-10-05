const linkClass =
  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-none px-4 text-[13px] font-sans tracking-tight text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function GiantFooter() {
  return (
    <section
      aria-label="Fermor footer"
      className="w-full max-w-full overflow-hidden overflow-x-clip rounded-none bg-black font-sans text-white"
    >
      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 pt-7 sm:px-6 sm:pt-8"
      >
        <a href="https://fermor.in/privacy" className={linkClass}>
          Privacy Policy
        </a>
        <a href="https://fermor.in/terms" className={linkClass}>
          Terms
        </a>
        <a href="https://fermor.in/contact" className={linkClass}>
          Contact
        </a>
      </nav>

      {/*
        Giant wordmark — pixel-matched to reference:
        pure black field, lowercase sans extrabold, cropped left/right/bottom,
        light-to-dark fade (#F4F4F4 -> #232323). 200vw box centred by -ml-[50vw]
        guarantees symmetrical crop on every viewport (text-align:center alone
        overflows right only). leading 0.75 + translate-y crops the baseline.
        vw sizing = inherently responsive, no breakpoints needed, no x-scroll.
      */}
      <div aria-hidden="true" className="relative mt-2 w-full max-w-full select-none overflow-hidden rounded-none sm:mt-4">
        <p className="-ml-[50vw] w-[200vw] translate-y-[14%] whitespace-nowrap bg-gradient-to-b from-[#F4F4F4] via-[#9C9C9C] to-[#232323] bg-clip-text text-center font-sans text-[41vw] font-extrabold leading-[0.75] tracking-[-0.045em] text-transparent">
          fermor
        </p>
      </div>
      <span className="sr-only">Fermor</span>

      <div className="relative rounded-none border-t border-white/10 bg-black">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-y-1 px-4 py-4 text-center sm:flex-row sm:justify-between sm:gap-x-6 sm:px-6 sm:text-left">
          <p className="text-xs leading-relaxed tracking-tight text-white/50">
            Fermor Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="text-xs leading-relaxed tracking-tight text-white/50">
            Education only. Not SEBI registered.
          </p>
        </div>
      </div>
    </section>
  );
}