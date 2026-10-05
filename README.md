# Fermor

[![Live](https://img.shields.io/badge/Live-fermor--theta--nine.vercel.app-0F5132?style=for-the-badge&logo=vercel&logoColor=white)](https://fermor-theta-nine.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

Fermor is a homepage for an Indian personal-finance calculator product, built for the Frontend Developer Assignment. It presents a working calculator above the fold, a ledger-inspired interface, and a focused set of calculators from a larger planned catalogue.

## Quick start

Requires Node.js 20 or later.

```bash
git clone https://github.com/aditya-c7/fermor.git
cd fermor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The project requires no environment variables, API keys, or database. It builds as a fully static Next.js application.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Deploying

Deploy with the Vercel CLI:

```bash
npx vercel
```

Accept the defaults. Vercel detects the Next.js preset automatically.

Alternatively, import the repository at [vercel.com/new](https://vercel.com/new).

## Important decisions

### Calculator first

For a product with 158 calculators, the homepage’s only job is to get a visitor to a real number. A working calculator is placed above the fold rather than a screenshot or promotional section.

### The Ledger as the visual reference

Money looks like a ledger: columns, hairline rules, tabular figures, and ink on paper. This single reference resolved most interface and typography decisions.

### No template finance aesthetic

The design avoids gradients, glass effects, rounded cards, and stock photography. Indian finance content already uses these patterns heavily; avoiding them keeps the interface from reading as template filler.

### No countdown timer

Countdown timers are the category’s loudest conversion tactic. Fermor deliberately omits one.

### Three typefaces, one job each

A serif face handles display type, Inter handles body copy, and a monospace face with `tabular-nums` handles every number.

### One accent colour

Forest green is reserved for calls to action and the two figures that matter. Everything else remains greyscale so the data carries the emphasis.

### Zero image files

The phone mockup, donut chart, news covers, and sparklines are generated SVG rather than image assets. This keeps the repository small, scales cleanly, and avoids a stock-asset appearance.

### Finance logic is isolated

All calculations, including `sipFV`, `fdLumpSum`, and `inr`, live in `lib/finance.ts` rather than inside JSX. This keeps formulas readable and testable.

### Indian number formatting

Numbers use `en-IN` grouping throughout: `Rs 1,64,60,996`, not `Rs 16,460,996`. The formatting signals that the product is built for India rather than translated into it.

### Lenis owns scrolling

Lenis controls wheel scrolling and CSS `scroll-behavior` is removed. Running both causes competing scroll behaviour and stutter near the top of the page.

### Canvas performance is capped

Canvas backgrounds are frame-capped at 12fps or 30fps and pause when offscreen. Rendering at full device pixel ratio on every frame was visibly janky against the sticky header; the capped approach preserves the visual effect at a fraction of the cost.

## Trade-offs

- **Eight of 158 calculators are shown.** The homepage demonstrates the product’s direction rather than attempting to ship the full catalogue.
- **No calculator detail routes.** The assignment focuses on the homepage experience, so calculators are presented inline instead of through separate pages.
- **Rates are illustrative.** The interface demonstrates realistic financial calculations without depending on live market data.
- **No persistence.** Inputs and results are intentionally ephemeral; the homepage is a demonstration surface, not an account-based product.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

Built with AI tooling as the brief permits.
