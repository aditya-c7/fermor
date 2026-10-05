# Fermor Homepage

A homepage for Fermor, built for the Frontend Developer Assignment.

**Live:** https://fermor-homepage.vercel.app
**Stack:** Next.js 16 (App Router) - React 19 - TypeScript - Tailwind CSS v4

---

## Setup

```bash
git clone <repo-url>
cd fermor-homepage
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

No environment variables, no API keys, no database. Every number on the page is
computed in the browser or hardcoded from Fermor's public product data, so the
build is fully static and deploys to any host with zero configuration.

### Deploying to Vercel

```bash
npx vercel
```

Accept the defaults. Or push to GitHub and import the repo at
vercel.com/new. The framework preset is detected as Next.js automatically.

---

## What I built and why

The brief left layout, sections and visual direction open to me. The three
things I optimised for were: say what Fermor is within one scroll, prove it
works rather than claim it works, and look like a product rather than a template.

### The design direction: The Ledger

The visual idea is an editorial financial document that happens to be alive.
Ink on warm paper, hairline borders, sharp corners, no rounded cards, no
gradients, no glassmorphism, no stock photography.

| Token | Value | Use |
| --- | --- | --- |
| Background | `#FAFAF7` | warm off white page |
| Foreground | `#1A1A1A` | ink, primary text |
| Muted | `#6B6B6B` | secondary body text only |
| Primary | `#1B4332` | forest green, CTAs and key figures |
| Border | `#E5E5E5` | 1px hairlines everywhere |
| Surface | `#FFFFFF` | raised cards |
| Highlight | `#4ADE80` | chart lines on the dark section only |

Three typefaces, each with a job:

- **Instrument Serif** for headlines. High contrast, editorial, feels like a
  financial broadsheet rather than a SaaS landing page.
- **Inter** for body copy.
- **JetBrains Mono with `tabular-nums`** for every number on the site. Figures
  that change in place must not shift horizontally while animating, and mono
  digits make column alignment read like a statement.

Forest green is the only accent. It appears on primary buttons and the two
numbers that matter most. Everything else is greyscale, which keeps the page
from looking like a generic dashboard and lets the data carry the emphasis.

### Page structure

`app/page.tsx` is the whole composition. Order is deliberate:

1. **Nav** - sticky, brand plus section strip on mobile.
2. **Hero** - headline, and above the fold an interactive SIP vs FD calculator.
   This is the product thesis: not "we have calculators", but one running.
3. **Problem** - the six questions an Indian household actually asks, in the
   user's own words, framed as shared anxieties rather than marketing claims.
4. **Shift** - a before/after toggle contrasting two states of financial life.
5. **Calculator index** - filterable by goal (Investing, Tax, Loans,
   Retirement). Shows a representative slice of the 158 calculators.
6. **Forecast** - the dark section. A second calculator: SIP amount and tenure
   in, projected corpus out, drawn as a live-updating SVG chart.
7. **CTA band** - one action, repeated.
8. **News** - three article cards with generated cover art.
9. **Footer** - link columns, then a full-bleed dark block with a giant
   cropped `fermor` wordmark as the closing note.

### Working, not decorative

Three things on the page genuinely compute:

- **SIP vs FD calculator** (`components/SipVsFdCalculator.tsx`). Four sliders:
  monthly amount, years, SIP rate, FD rate. Future value of a monthly SIP
  compared against a lump sum at the FD rate, with the difference called out.
  Math lives in `lib/finance.ts` as `sipFV` and `fdLumpSum`, so it is
  testable and separate from the view.
- **Forecast chart** (`components/ForecastSection.tsx`). Recomputes the
  projection path and redraws the SVG as the sliders move.
- **Market strip** (`components/MarketStrip.tsx`). HDFC, SBI and Maruti with
  streaming sparklines.

`components/CalculatorIndex.tsx` filters the calculator list by category on
click. `components/ShiftSection.tsx` toggles state on click.

All Indian number formatting goes through `inr()` in `lib/finance.ts`, which
uses `Intl.NumberFormat("en-IN")` for the 3-2-2 lakh and crore grouping that
Indian readers expect: `Rs 1,64,60,996`, not `Rs 16,460,996`.

### Imagery

There are no photographs and no illustration files in this repo. The phone
preview, the spending donut, the news covers and the market sparklines are all
generated in code as SVG or styled divs. That keeps the repository small, makes
everything scale cleanly, and avoids the generic stock-image look that reads as
template filler.

---

## Notable implementation decisions

### Numbers animate without layout shift

`components/ui/animated-counter.tsx` counts values up on load and on change. It
renders a vertical digit strip inside a fixed-height, `1ch`-wide window per
digit, so a number growing from `Rs 8,40,000` to `Rs 1,64,60,996` does not
reflow the layout around it. Each counter carries an `sr-only` text node with
the final value, and the visible digits are `aria-hidden`, so screen readers get
a clean number instead of a stream of digit fragments.

### Motion stays cheap

`components/MotionProvider.tsx` wraps the app in `LazyMotion` with
`domAnimation` only. Every animated component imports `m` from `motion/react`
rather than the full `motion` object, so the heavier animation features are
never pulled into the bundle. This is a deliberate constraint: the whole motion
system uses `m.span` / `m.div` and nothing else.

The two canvas backgrounds (`components/ui/flickering-grid.tsx`,
`components/GlideField.tsx`) run at capped frame rates, 12fps and 30fps
respectively, and pause via `IntersectionObserver` when scrolled out of view.
The grid originally painted at full `devicePixelRatio` every frame, which was
visibly janky against the sticky header. Same effect, a fraction of the cost.

### Smooth scrolling does not fight the browser

`components/SmoothScroll.tsx` drives Lenis from `useLenis`. I deliberately did
not set `scroll-behavior: smooth` in CSS. Having both active makes wheel input
fight itself at the top of the page and produces visible stutter, so Lenis owns
the wheel outright.

### Accessibility

- Skip-to-content link to `#main` as the first focusable element.
- One `h1`, `h2` per section in document order, `h3` for card titles.
- Every slider has a real `<label>` bound by id, plus `aria-valuetext` in
  Indian format so the announced value is `Rs 25,000`, not `25000`.
- Calculator outputs sit in `aria-live="polite"` regions with `aria-atomic`, so
  a screen reader hears the new figure after a slider move.
- Charts are `role="img"` with a descriptive `aria-label`, and the forecast
  ships an `sr-only` table of the same values as a text fallback.
- `prefers-reduced-motion` is respected everywhere: smooth scroll off,
  transitions collapsed, canvas fields replaced by static backgrounds.
- Focus rings are a 2px forest outline via `focus-visible`, with a lighter
  variant inside the dark forecast section.
- Minimum 44px touch targets on all interactive elements.

### Responsive behaviour

Verified at 375, 768, 1024 and 1440px. The recurring failure mode on a page
this dense is horizontal overflow from long mono numbers, so `min-w-0` and
`overflow-hidden` are applied at each flex and grid boundary, numbers get
`break-words`, and multi-column grids collapse to a single column as the base
case rather than being retrofitted. The hero calculator, phone preview and
donut stack below 500px. The giant footer wordmark is sized in `vw` units
inside an `overflow-hidden` container, so it crops proportionally at any width
and never creates a sideways scrollbar.

---

## Project structure

```
app/
  layout.tsx          fonts, metadata, providers
  page.tsx            section composition
  globals.css         design tokens, base styles, utilities
components/
  Hero.tsx            headline, proof card, market strip
  SipVsFdCalculator.tsx
  ForecastSection.tsx live SVG projection
  CalculatorIndex.tsx filterable calculator list
  ProblemSection.tsx  ShiftSection.tsx
  MarketStrip.tsx     Nav.tsx
  Footer.tsx          GiantFooter.tsx
  HeroBackdrop.tsx    GlideField.tsx   canvas backgrounds
  ui/                 button, card, badge, separator,
                      animated-counter, flip-fade-text, flickering-grid
lib/
  finance.ts          SIP and FD math, INR formatting, content data
  series.ts           deterministic sparkline series
DESIGN.md             full design system reference
```

---

## Trade-offs and what I would do next

**The calculator list is a slice.** Eight representative calculators are
rendered rather than all 158, because 158 rows on a homepage is a directory
page, not a homepage. The filter is wired to real categories, so pointing it at
the full set is a data change in `lib/finance.ts`, not a component change.

**No calculator detail routes.** Every calculator currently links out to
`fermor.in`. Building `/calculators/[slug]` on top of `lib/finance.ts` is the
obvious next step and the piece that would make this a real product surface
rather than a landing page.

**Rates are illustrative.** SIP and FD rates are realistic defaults for India
but are not fetched live. Wiring them to a rates feed would be the difference
between a demo and a product.

**No persistence.** Slider state is component state, so it resets on reload. A
saved-calculations feature needs accounts and storage, which is beyond a
homepage assignment.

**Content is written from the product's perspective.** The headlines assume a
reader who already distrusts finance-marketing language. That was a deliberate
choice for an Indian audience, where the category is saturated with advice
content and trust is the scarce resource.

---

Built with AI assistance as part of the assignment brief. The product
direction, layout decisions, visual system and copy are my own.