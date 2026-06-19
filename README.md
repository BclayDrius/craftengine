# CRAFTENGINE — Corporate Website

Static marketing site for CRAFTENGINE, a B2B industrial predictive maintenance platform. Built on Next.js 16 App Router with full static prerendering across all routes. No server runtime, no database, deploys as pure CDN output to Vercel.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Language | TypeScript | 5.x (strict mode) |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.40.0 |
| Runtime | React | 19.2.4 |
| Node | LTS | >=20 |
| Deployment | Vercel | — |

Tailwind v4 is a breaking change from v3. There is no `tailwind.config.js`. Design tokens are declared in `@theme` blocks inside `globals.css` and compile directly to CSS custom properties. Do not reach for a config file — it does not exist in this version.

Framer Motion v12 changed how TypeScript handles `ease` arrays. Bezier curves must be typed as `[number, number, number, number]` or narrowed with `as const`. Passing a plain `number[]` will fail the type checker. Every component in this repo uses the pattern `const E = [0.16, 1, 0.3, 1] as const` at the module level.

---

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout, font loading, global metadata, JSON-LD
    page.tsx              # Homepage — composes all section components in order
    globals.css           # Tailwind v4 import + @theme tokens + global rules
    industrias/
      page.tsx            # /industrias — industry verticals, tab-based UI
    dispositivos/
      page.tsx            # /dispositivos — IoT hardware product pages
  components/
    Navbar.tsx            # Fixed header, scroll detection, mobile menu
    Hero.tsx              # Above-fold section with live telemetry chart
    TelemetryChart.tsx    # SVG path animation, pre-computed signal data
    CostOfFailure.tsx     # Stat cards — cost framing for the problem
    MaturityModel.tsx     # 3-stage maturity grid (Reactive / Preventive / Predictive)
    PlatformPipeline.tsx  # 6-node end-to-end pipeline diagram
    Capabilities.tsx      # Asymmetric bento grid of platform capabilities
    HowItWorks.tsx        # 5-step engagement timeline with sticky column
    Roadmap.tsx           # 4-phase project roadmap, pilot phase highlighted
    Dashboard.tsx         # Simulated product dashboard with XAI panel
    Integrations.tsx      # Integration categories + enterprise reliability cards
    KPIs.tsx              # Animated metric band with CountUp
    TechStack.tsx         # Technology categories with monospace badge tags
    ReadinessScore.tsx    # Interactive 5-question Data Readiness Score quiz
    LeadForm.tsx          # Lead capture form with validation
    Footer.tsx            # Site footer with navigation columns
public/
  favicon.png             # Square icon — used in Navbar and browser tab
  logo.jpg                # Full brand lockup — used in Footer
vercel.json               # Deployment configuration, security headers, cache rules
next.config.ts            # Next.js config — compression, image formats
```

The three sub-pages (`/industrias`, `/dispositivos`) are full `"use client"` pages with their own Navbar and Footer imports. They are not nested under a shared layout because each needs its own animated entry state. All routes compile to static HTML at build time — there is no server-side rendering happening at request time.

---

## Design System

Defined entirely in `src/app/globals.css` under `@theme`. The token names drive Tailwind utility generation automatically.

```css
--color-surface: #0A0B0D
--color-surface-elevated: #131519
--color-surface-subtle: #1A1D23
--color-border: #23262D
--color-border-strong: #333740
--color-foreground: #F4F5F7
--color-muted: #9BA1AB
--color-gold: #C8A968
--color-teal: #4FD1C5
--color-warn: #E8B04B
--color-danger: #E5564B
--color-success: #4CAF82

--font-display: Space Grotesk
--font-body: Inter
--font-mono: JetBrains Mono
```

Opacity modifiers (`bg-surface/90`, `text-gold/40`) work out of the box because Tailwind v4 uses CSS `color-mix()` under the hood rather than the old `rgba` approach.

---

## Local Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000` via Turbopack. Hot module replacement is fast — expect sub-100ms updates on component edits.

```bash
npm run build
```

Full production build. All routes prerender as static HTML. The build output goes to `.next/`. Expected output:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /dispositivos
└ ○ /industrias

○  (Static)  prerendered as static content
```

```bash
npx tsc --noEmit
```

Type-checks without emitting files. Run this before pushing. The project uses `strict: true` so implicit `any`, unchecked nullable access, and loose function signatures are all errors.

---

## Deployment

The project deploys to Vercel. `vercel.json` handles everything at the CDN layer so no configuration is needed in the Vercel dashboard beyond connecting the repository.

**Security headers** applied globally:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Cache headers** applied to static assets (`js`, `css`, `woff2`, `png`, `jpg`, etc.):
- `Cache-Control: public, max-age=31536000, immutable`

Primary region is `iad1` (US East). This is intentional — lowest latency to Latin America compared to European regions.

To deploy manually:

```bash
npx vercel
```

To deploy from CI, push to the branch connected in the Vercel dashboard. The build command, output directory, and install command are all declared in `vercel.json` so Vercel will not guess.

---

## Forms and API Stubs

Two components collect user data but do not yet POST anywhere. Both have a clearly marked `TODO` comment at the submission handler:

**`src/components/LeadForm.tsx`** — collects `nombre`, `empresa`, `cargo`, `email`, `industria`, `reto`, and `interes`. Validates client-side before submission. Intended target: `/api/leads`.

**`src/components/ReadinessScore.tsx`** — 5-question quiz that produces a score 0–10. Collects `email` and POSTs `{ email, answers, score }`. Intended target: `/api/readiness-score`.

When implementing these endpoints, add them as Route Handlers under `src/app/api/`. Both should be `POST`-only, validate the body shape, and return a typed response. Connecting to HubSpot, Notion, or a custom CRM is left to the implementor.

---

## Accessibility

- WCAG 2.2 AA compliance is the target throughout
- All interactive elements have `aria-label` or visible text
- Form fields use `htmlFor` / `id` pairing and `aria-invalid` on error state
- The quiz result panel uses `role="alert"` and `aria-live="polite"`
- Navigation uses `aria-label` on the `<nav>` element and `role="tablist"` / `role="tab"` on the industry selector
- `prefers-reduced-motion` is respected globally via CSS and per-component via `useReducedMotion()` in the telemetry chart

---

## Known Leftovers

`Solutions.tsx`, `WhyUs.tsx`, and `Showcase.tsx` exist in `src/components/` but are not imported anywhere. They are superseded by the v3 component set and can be deleted without consequence.

The `new Date().getFullYear()` call in `Footer.tsx` will hydrate correctly because the footer is not animated — it renders the same value on server and client. Do not add `Math.random()` or `Date.now()` to components that use Framer Motion or pre-computed data arrays, as this causes hydration mismatches in the static output.

---

## Engineering

Designed and built by **Barclay Leach** — full-stack engineer responsible for the architecture, design system, component library, animation layer, and deployment pipeline of this project. Every decision in this codebase, from the Tailwind v4 token structure to the Framer Motion type patterns, reflects deliberate engineering choices made with production quality and long-term maintainability in mind.

---

## License

Private. All rights reserved. CRAFTENGINE.
