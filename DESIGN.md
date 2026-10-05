# Fermor Homepage Design System

Visual Identity: The Ledger
Editorial and print inspired. Like a financial document that happens to be alive.
Sharp corners, hairline borders, ink on warm paper. No gradients, no glass on cards, no stock photos.

Colors
- Background #FAFAF7 warm off white
- Text #1A1A1A ink
- Muted #6B6B6B - body secondary only, never for small text on light bg below 4.5:1
- Accent #1B4332 forest green for CTAs and key numbers only
- Chart highlight #4ADE80 used only on dark ink section
- Border #E5E5E5 hairline 1px
- Surface #FFFFFF

Typography
- Display Instrument Serif (--font-instrument) for headlines and large numbers
- Body Inter (--font-inter) for readable text, 16 to 18px
- Data JetBrains Mono (--font-jetbrains) with tabular-nums for all numbers
- Scale: H1 40 mobile / 64 to 96 desktop, H2 40 to 48, body 16 to 18, caption 13 uppercase with tracking
- Captions use text-xs uppercase tracking-wider or .caption helper

Layout rhythm
- Container max 1200px, px-6
- Section padding py-16 mobile, py-32 desktop
- Order: Nav, Hero (3fr 2fr asymmetric) with SIP vs FD calc, Problem (2fr 3fr asymmetric sticky), Shift toggle, CalculatorIndex filter list, Forecast dark SVG, News 3 col, Footer
- Asymmetric grids required in Hero and Problem sections
- Borders 1px solid, radius 0 or 2px max. Nav backdrop blur allowed, cards never glass

Accessibility
- Single h1 in Hero, h2 per section in order, h3 for card titles
- Skip to content link to #main, scroll-margin 5rem for sticky nav anchors
- Focus-visible 2px forest outline, light thumb variant inside #forecast
- Chart has role img plus aria-label plus sr-only table backup
- Sliders are labelled, results use aria-live polite
- prefers-reduced-motion disables smooth scroll and transitions
- Keyboard: all interactive elements are native button, a, input. Min touch target 44px on toggle buttons

Performance
- Motion via LazyMotion domAnimation only in MotionProvider, m from motion/react
- No framer-motion full bundle, no heavy chart libs, forecast is hand SVG
- next/font with CSS variables, no external font requests at runtime

Rules
- No gradients, no glass on cards, no purple blue pink, no emoji, no rounded-full, no heavy shadows
- Use Rs symbol with en-IN grouping: Rs 53,00,000 and Rs 1,64,60,996
- Numbers via inr() from lib/finance.ts, en-IN Intl, 0 decimals
