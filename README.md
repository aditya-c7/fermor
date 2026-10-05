<div align="center">

# Fermor Homepage

### Financial clarity for India

**158 free calculators for SIP, tax, loans and retirement.**
Built for the Frontend Developer Assignment.

<br>

[![Live](https://img.shields.io/badge/Live-fermor.in-2EA043?style=for-the-badge&logo=vercel&logoColor=white)](https://fermor-homepage.vercel.app)
[![Status](https://img.shields.io/badge/Status-Project%20complete-2EA043?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/aditya-c7/fermor)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087EA4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-LazyMotion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev)

<br>

[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA%20oriented-1F6FEB?style=for-the-badge&logo=w3c&logoColor=white)](#accessibility)
[![Responsive](https://img.shields.io/badge/Responsive-375%E2%86%921440%20px-1F6FEB?style=for-the-badge&logo=googlechrome&logoColor=white)](#responsive-behaviour)
[![Zero config](https://img.shields.io/badge/Zero-config-no%20env%20vars-8250DF?style=for-the-badge&logo=lock&logoColor=white)](#quick-start)
[![Type safe](https://img.shields.io/badge/Type%20safe-strict-8250DF?style=for-the-badge&logo=typescript&logoColor=white)](#project-structure)
[![License: MIT](https://img.shields.io/badge/License-MIT-8250DF?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

</div>

---

---

<div align="center">

## Contents

`[ Quick start](#quick-start) &nbsp;&nbsp;` `[ Deploying](#deploying) &nbsp;&nbsp;` `[ Design](#design-direction-the-ledger) &nbsp;&nbsp;` `[ Structure](#page-structure-and-why) &nbsp;&nbsp;` `[ What works](#what-actually-works) &nbsp;&nbsp;` `[ Decisions](#decisions-worth-explaining) &nbsp;&nbsp;` `[ A11y](#accessibility) &nbsp;&nbsp;` `[ Responsive](#responsive-behaviour) &nbsp;&nbsp;` `[ Code](#project-structure) &nbsp;&nbsp;` `[ Trade-offs](#trade-offs-and-what-i-would-do-next)`

</div>

---

## Quick start

Requires Node.js 20 or newer.

```bash
git clone https://github.com/aditya-c7/fermor.git
cd fermor
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint across the repo |
| `npm run typecheck` | `tsc --noEmit` |

**There are no environment variables, no API keys, and no database.** Every
figure on the page is either computed in the browser or drawn from Fermor's
public product data. The build is fully static, so it deploys anywhere with
zero configuration and cannot break at runtime.

## Deploying

The quickest path:

```bash
npx vercel
```

Accept the defaults. Or push to GitHub and import the repo at
[vercel.com/new](https://vercel.com/new); the framework preset is detected as
Next.js automatically.

---

## The brief, and my answer to it

The brief asked for a homepage that explains what Fermor is and who it is for,
and gave complete freedom over layout, sections and visual direction. Three
questions shaped everything below.

**1. What is a homepage actually for?** For a product with 158 calculators,
the homepage is not the product. It has one job: get a first-time visitor from
"I do not understand my own money" to "this thing can tell me the number". So
I put a working calculator above the fold rather than a screenshot of one, and
made the second most prominent section another working calculator. Proof beats
promotion.

**2. Who trusts this?** Indian finance content is saturated with advice
screenshots, referral-link listicles and loan offers. The category has spent
years training people to be sceptical, so the visual language has to earn
attention without borrowing the visual language of the thing it is replacing.
That ruled out gradients, glass cards, rounded pills and stock photography. It
also ruled out the loudest conversion trick on the web, the countdown timer.
There is none.

**3. What does money actually look like?** It looks like a ledger. Columns,
hairline rules, tabular figures, small caps labels, ink on paper. That single
reference resolved nearly every design question without needing to ask it again.

## Design direction: The Ledger

<div align="center">

[![Style](https://img.shields.io/badge/Style-The%20Ledger-1A1A1A?style=for-the-badge&logo=readthedocs&logoColor=white)](#design-direction-the-ledger)
[![Palette](https://img.shields.io/badge/Palette-forest%20%231B4332-2EA043?style=for-the-badge&logo=simpleicons&logoColor=white)](#design-direction-the-ledger)
[![Gradients](https://img.shields.io/badge/Gradients-none-8250DF?style=for-the-badge&logo=image&logoColor=white)](https://github.com/aditya-c7/fermor)
[![Photography](https://img.shields.io/badge/Stock%20photos-zero-8250DF?style=for-the-badge&logo=camera&logoColor=white)](https://github.com/aditya-c7/fermor)

</div>

An editorial financial document that happens to be alive. Ink on warm paper,
1px hairline borders, square corners, no gradients, no glass, no stock photos.

| Token | Value | Role |
| --- | --- | --- |
| Background | `#FAFAF7` | warm off white page |
| Foreground | `#1A1A1A` | ink, primary text |
| Muted | `#6B6B6B` | secondary text only |
| Primary | `#1B4332` | forest green, CTAs and key figures |
| Border | `#E5E5E5` | 1px hairlines, used as structure not decoration |
| Surface | `#FFFFFF` | raised cards |
| Highlight | `#4ADE80` | chart lines, dark sections only |

Three typefaces, each with exactly one job:

- **Instrument Serif** for display. High contrast, editorial, reads like a
  financial broadsheet rather than a SaaS landing page.
- **Inter** for body copy. Boring on purpose. Nobody should notice the body
  typeface.
- **JetBrains Mono with `tabular-nums`** for every number on the site. Figures
  that change in place must not shift horizontally while animating, and mono
  digits make a column of numbers align the way it does in a real statement.

**Green is the only accent.** It appears on primary buttons and the two figures
that matter most. Everything else is greyscale, which is what stops the page
looking like a generic dashboard and lets the data carry the emphasis. Contrast
on muted text stays at or above 4.5:1 against the paper background.

## Page structure and why

`app/page.tsx` is the entire composition, nine sections, in this order:

| # | Section | Why it sits here |
| --- | --- | --- |
| 1 | **Nav** | Sticky. Brand and section strip stack on mobile, collapse to one row from `md` up. |
| 2 | **Hero** | The claim plus the proof: headline, and an interactive SIP vs FD calculator above the fold. |
| 3 | **Problem** | Six questions in the reader's own words, framed as shared anxieties, not as a product pitch. |
| 4 | **Shift** | Before/after toggle between two states of financial life. Shows the delta rather than describing it. |
| 5 | **Calculator index** | Filterable by goal. A representative slice of the 158, with real category counts. |
| 6 | **Forecast** | The dark section, and the page's second calculator. Sliders in, corpus out, chart redraws live. |
| 7 | **CTA band** | One action, repeated once, at the natural exit point of the calculators. |
| 8 | **News** | Three cards, generated cover art. Signals the product has a point of view beyond calculators. |
| 9 | **Footer** | Link columns, then a full-bleed dark block with a giant cropped `fermor` wordmark as the closing note. |

The rhythm alternates deliberately: light section, light section, light section,
**dark** forecast, then light again. The forecast is the one place the palette
inverts, and it is the section that earns the inversion because it is where the
user produces their own number. The dark band is the visual full stop before the
footer.

## What actually works

<div align="center">

[![Math](https://img.shields.io/badge/Math-live%20in%20browser-2EA043?style=for-the-badge&logo=javascript&logoColor=white)](#what-actually-works)
[![Interactive](https://img.shields.io/badge/Interactive-3%20calculators-1F6FEB?style=for-the-badge&logo=sliders&logoColor=white)](#what-actually-works)
[![Assets](https://img.shields.io/badge/Assets-0%20image%20files-8250DF?style=for-the-badge&logo=image&logoColor=white)](https://github.com/aditya-c7/fermor)

</div>

Nothing on this page is a screenshot of the product. Three things genuinely
compute, in the browser, from real formulas.

**SIP vs FD calculator.** `components/SipVsFdCalculator.tsx`. Four sliders:
monthly amount, years, SIP return, FD return. It compares the future value of
a monthly SIP against the maturity value of a lump sum invested at the FD rate,
and states the difference in rupees. This is the most common question an Indian
saver asks, and answering it in ten seconds is the whole pitch.

**Forecast chart.** `components/ForecastSection.tsx`. Monthly SIP and tenure in,
projected corpus out, drawn as a live-updating SVG path. The chart geometry is
recomputed on every slider change rather than being a static asset.

**Market strip.** `components/MarketStrip.tsx`. HDFC Bank, SBI and Maruti with
deterministic streaming sparklines and percentage moves.

Plus two interactive controls: `CalculatorIndex.tsx` filters the calculator list
by category on click, and `ShiftSection.tsx` toggles state on click.

The financial math is deliberately kept out of the components. `lib/finance.ts`
owns `sipFV`, `fdLumpSum` and `inr`, so the formulas are readable and testable
in one file instead of being scattered through JSX.

**Indian number formatting** goes through `inr()` on `Intl.NumberFormat("en-IN")`,
which produces the 3-2-2 lakh and crore grouping Indian readers expect:
`Rs 1,64,60,996`, never `Rs 16,460,996`. This is a small detail that
immediately signals whether the product was built for India or translated into
it.

**Imagery** is generated in code. The phone preview, spending donut, news covers
and market sparklines are all SVG or styled divs. No image files ship in this
repository. Everything scales cleanly at any size, the bundle stays small, and
the page avoids the generic stock-photo look that reads as template filler.

## Decisions worth explaining

**Numbers animate without causing layout shift.**
`components/ui/animated-counter.tsx` counts values up on load and on change. It
renders a vertical digit strip inside a fixed `1ch`-wide, `1em`-tall window per
digit, so a figure growing from `Rs 8,40,000` to `Rs 1,64,60,996` does not
reflow anything around it. Each counter carries an `sr-only` node with the final
value while the visible digits are `aria-hidden`, so a screen reader announces
one clean number instead of a stream of digit fragments.

**Motion stays cheap.** `components/MotionProvider.tsx` wraps the app in
`LazyMotion` with `domAnimation` only. Every animated component imports `m`
from `motion/react` rather than the full `motion` object, so the heavier
animation features are never pulled into the bundle. The constraint is
deliberate and self-enforcing: the whole codebase uses `m.span` and `m.div` and
nothing else.

**The canvas backgrounds are frame-capped.**
`components/ui/flickering-grid.tsx` runs at 12fps and `components/GlideField.tsx`
at 30fps, and both pause via `IntersectionObserver` when scrolled out of view.
The grid originally painted at full `devicePixelRatio` on every frame, which was
visibly janky against the sticky header. Same visual result, a fraction of the
cost.

**Smooth scrolling does not fight the browser.** `components/SmoothScroll.tsx`
instantiates Lenis directly and feeds it a `requestAnimationFrame` loop, with a
1.1s easing duration. I deliberately did not set `scroll-behavior: smooth` in
CSS. Having both active makes wheel input fight itself at the top of the page
and produces visible stutter, so Lenis owns the wheel outright. Anchor offsets
are handled with `scroll-padding-top` and `scroll-margin-top` instead, tuned per
breakpoint for the two-row mobile header. The effect bails out entirely under
`prefers-reduced-motion` and destroys the instance on unmount.

**Reduced motion is not an afterthought.** `prefers-reduced-motion` disables
smooth scroll, collapses transition durations, and swaps both canvas layers for
static CSS backgrounds rather than merely hiding them.

## Accessibility

<div align="center">

[![A11y](https://img.shields.io/badge/A11y-WCAG%20AA%20oriented-2EA043?style=for-the-badge&logo=w3c&logoColor=white)](#accessibility)
[![ARIA](https://img.shields.io/badge/ARIA-live%20regions-1F6FEB?style=for-the-badge&logo=accessibility&logoColor=white)](#accessibility)
[![Touch](https://img.shields.io/badge/Touch-44px%20minimum-8250DF?style=for-the-badge&logo=smartphone&logoColor=white)](#accessibility)

</div>

- Skip-to-content link to `#main` as the first focusable element.
- One `h1`, one `h2` per section in document order, `h3` for card titles.
- Every slider has a real `<label>` bound by id, plus `aria-valuetext` in
  Indian format, so the announced value is `Rs 25,000` and not `25000`.
- Calculator outputs sit in `aria-live="polite"` regions with `aria-atomic`, so
  a screen reader hears the updated figure after a slider move.
- Charts are `role="img"` with descriptive labels; the forecast also ships an
  `sr-only` table of the same values as a text fallback.
- Visible descriptions on calculator rows are available to screen readers but
  not painted on screen, which keeps the visual density down without losing the
  information.
- Focus rings are a 2px forest outline via `focus-visible`, with a lighter
  variant inside the dark forecast section.
- Every interactive element is a native `button`, `a` or `input`, so keyboard
  and assistive technology behaviour is correct by default. Minimum touch target
  is 44px.

## Responsive behaviour

<div align="center">

[![Breakpoints](https://img.shields.io/badge/Verified-375%20%2F%20768%20%2F%201024%20%2F%201440-1F6FEB?style=for-the-badge&logo=tailwindcss&logoColor=white)](#responsive-behaviour)
[![Overflow](https://img.shields.io/badge/H-overflow-none-2EA043?style=for-the-badge&logo=css3&logoColor=white)](#responsive-behaviour)

</div>

Verified at 375, 768, 1024 and 1440px.

The recurring failure mode on a page this dense is horizontal overflow from long
monospace figures, so `min-w-0` and `overflow-hidden` sit at every flex and grid
boundary, numbers get `break-words`, and multi-column grids collapse to a single
column as the base case rather than being retrofitted after the fact. The hero
calculator, phone preview and donut stack below 500px. `body` carries
`overflow-x: hidden` as a backstop.

The giant footer wordmark is sized in `vw` units inside an `overflow-hidden`
container and centred with a negative half-viewport margin, so it crops
proportionally at every width and never produces a sideways scrollbar.

## Project structure

```
app/
  layout.tsx              fonts, metadata, providers, skip link
  page.tsx                section composition
  globals.css             design tokens, base styles, utilities
components/
  Hero.tsx                headline, proof card, market strip
  SipVsFdCalculator.tsx   the interactive comparison
  ForecastSection.tsx     live SVG projection
  CalculatorIndex.tsx     filterable calculator list
  ProblemSection.tsx      the six questions
  ShiftSection.tsx        before/after toggle
  MarketStrip.tsx         price cards with sparklines
  Nav.tsx  Footer.tsx  GiantFooter.tsx
  HeroBackdrop.tsx  GlideField.tsx   canvas backgrounds
  PhoneMockup.tsx  SpendDonut.tsx  NewsCover.tsx   generated visuals
  BlurFade.tsx  TiltCard.tsx  Ticker.tsx  RatesBars.tsx
  FermorAssetHeader.tsx  FermorHotTopics.tsx  FermorExchangeCta.tsx
  ui/                     button, card, badge, separator,
                          animated-counter, flip-fade-text, flickering-grid
lib/
  finance.ts              SIP and FD math, INR formatting, content data
  series.ts               deterministic sparkline series
  utils.ts                class merge helper
DESIGN.md                 full design system reference
```

## Trade-offs and what I would do next

<div align="center">

[![Scope](https://img.shields.io/badge/Scope-Homepage%20assignment-1F6FEB?style=for-the-badge&logo=target&logoColor=white)](#trade-offs-and-what-i-would-do-next)
[![Status](https://img.shields.io/badge/Status-Submission%20ready-2EA043?style=for-the-badge&logo=checkcircle&logoColor=white)](https://github.com/aditya-c7/fermor)

</div>

**The calculator list is a slice, not the full 158.** Eight representative
calculators are rendered. Listing all 158 on a homepage turns it into a
directory page and buries the sections that actually explain the product. The
filter is already wired to real categories, so pointing it at the full set is a
data change in `lib/finance.ts`, not a component change.

**No calculator detail routes.** Every calculator currently links out to
`fermor.in`. Building `/calculators/[slug]` on top of the existing
`lib/finance.ts` is the obvious next step and the piece that would make this a
real product surface rather than a landing page.

**Rates are illustrative.** SIP and FD defaults are realistic for India but are
not fetched live. Wiring them to a rates feed is the difference between a demo
and a product, and it is also the piece most likely to need a backend.

**No persistence.** Slider state is component state, so it resets on reload. A
saved-calculations feature needs accounts and storage, which is beyond a
homepage assignment.

**Content is written from the product's perspective.** The headlines assume a
reader who already distrusts finance-marketing language. That was a deliberate
call for this audience rather than an accident of tone.

---

Built with AI tooling as the brief permits. The product direction, layout
decisions, visual system, copy and implementation are my own.

## License

MIT