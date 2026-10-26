# LATTICE

An independent intelligence atlas for frontier AI. LATTICE brings model quality, lab economics, infrastructure spend, token pricing and market momentum into one editorial, data-dense experience.

Built with React 19, TypeScript, Vite and Three.js.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript project build first, then creates the static bundle in `dist/`.

The Three.js scene is emitted as a separate chunk. Vite may warn that this chunk is larger than 500 kB; it does not affect the build or runtime. The scene is decorative, so the warning is accepted rather than forcing the renderer into the main application chunk.

## Experience overview

- Full-screen 3D intelligence field with projected model labels and pointer parallax.
- Ticker of market and release signals.
- Model leaderboard with sortable capability dimensions and a live signal rail.
- Twenty model dossiers with benchmark shape, pricing, context, speed, modalities and best-fit guidance.
- Thirteen lab dossiers with revenue mix, funding history, backers and risk notes.
- Economy section covering inference cost decline, capital concentration, capex, valuation multiples and market conditions.
- API cost estimator, capability-per-dollar ranking and consumer subscription comparison.
- Chronological wire with release, capital and pricing filters.
- Comparison desk, command palette, model/lab drawers and a mobile menu.

Keyboard and pointer interactions:

- `Cmd+K` or `Ctrl+K` opens search.
- `Escape` closes the active overlay.
- Comparison accepts up to four models; attempting a fifth triggers a toast.
- The command palette and drawers restore body scrolling and focus appropriately on close.

## Project structure

```text
src/
  App.tsx                 page composition and overlay/selection state
  data.ts                 models, labs, pricing, funding, capex, updates and chart data
  index.css               design tokens, components, responsive rules and motion
  main.tsx                React entry point
  components/
    Scene.tsx             Three.js hero field and projected labels
    Charts.tsx            SVG area, scatter and gauge charts
    ui.tsx                reveal, section header, count-up, tilt and shared UI
    Brand.tsx             wordmark and social marks
    Nav.tsx, Hero.tsx, Ticker.tsx
    Leaderboard.tsx, ModelExplorer.tsx, Labs.tsx
    Economy.tsx, Pricing.tsx, Updates.tsx, Footer.tsx
    Overlay.tsx           portal, focus, scroll lock and escape handling
    ModelDrawer.tsx, LabDrawer.tsx
    CommandPalette.tsx, CompareModal.tsx
    Toast.tsx
index.html
package.json
vite.config.ts
```

All datasets and derived display values live in `src/data.ts`. There is no backend, database, analytics or form submission. The newsletter field is an interface demo and does not store or transmit an address.

## Data and content

- The visible snapshot date is **October 21, 2026**.
- Benchmarks, private valuations, funding and capex are illustrative research data compiled from public disclosures and secondary sources.
- The interface describes the content as an independent research demo and includes a not-investment-advice disclaimer.
- Funding totals, comparison winners, pricing bands and capex/equity ratios are derived from the local datasets where practical.
- When updating the snapshot, also update `DATA_NOTES.updated` and any narrative figures that reference the old date. The hero funding total is derived from `FUNDING_DATA`.
- Keep the source labels in `src/data.ts` and the footer disclaimer intact if adapting the project.

## Accessibility and motion

- Landmarks, labelled sections and keyboard-operable cards and overlays.
- Visible focus states for interactive controls.
- `prefers-reduced-motion` disables the 3D animation loop and reveal transitions.
- Mobile hides projected scene labels to keep the hero copy and calls to action clear.
- Decorative scene content is hidden from assistive technology.
- Colour is reinforced with text, labels and shape rather than used alone.

## Reusable build prompt

The following brief can be used to recreate the direction with a coding agent. Replace the subject and data while preserving the editorial and interaction standards.

```text
Design and build a production-quality single-page data-intelligence site called LATTICE for people who need to understand the frontier AI market quickly.

PRODUCT GOAL
Turn a fragmented set of model benchmarks, lab economics, infrastructure spend and pricing into one connected, trustworthy research surface. The reader should be able to answer: who leads, what it costs, who is funding the build-out, and what changed recently.

AUDIENCE
Technical leaders, product teams, investors and operators who are comfortable with dense information but expect excellent hierarchy and fast scanning.

ART DIRECTION
Create an original visual language: a scientific atlas crossed with a financial terminal and an editorial magazine. Avoid generic SaaS dashboards, glassmorphism, neon cyberpunk clichés and stock AI imagery. Use near-black layered surfaces, hairline borders, precise monospace metadata and one acid-lime accent. Make the 3D hero feel like an instrument, not a screensaver.

SYSTEM
- Background: #05070a, with raised surfaces from #080c11 to #121a23.
- Text: #f1f4ea; muted #98a2b1; dim #667085.
- Accent: lime #c9ff4d. Supporting cyan #67e8f9, violet #a78bfa, orange #ff9a62.
- Headings: Space Grotesk. Body: Inter. Editorial italic: Instrument Serif. Data and labels: JetBrains Mono.
- Container: 1240px. Desktop nav: 74px. Corners: 2–6px. Borders: 1px low-opacity white.
- Use generous editorial section headers, small uppercase kickers, numbered sections and restrained grain.

PAGE ARCHITECTURE
1. Hero: giant three-line headline, live snapshot metadata, concise research positioning, two CTAs, 3D node field with a few projected model labels and four headline stats.
2. Signal ticker: release, capital and pricing signals.
3. Leaderboard: ranked model table, capability tabs, evidence badges and a sticky insight rail.
4. Model atlas: filter/search/sort, twenty model cards with capability bars, price, context, speed and best-fit line; drawer for detail.
5. Labs and capital: lab cards with revenue, valuation, funding and risk; full dossier drawer.
6. Machine economy: inference cost index, funding concentration, capex vs equity, revenue/valuation scatter and a five-gauge conditions board.
7. Pricing intelligence: interactive monthly cost estimator, capability-per-dollar ranking and subscription comparison.
8. The wire: chronological update ledger with type filters and a data-ledger aside.
9. Footer: comparison CTA, sitemap, sources, snapshot date, social links and a clear research-demo disclaimer.

INTERACTIONS
- Cmd/Ctrl+K command palette across models and labs.
- Comparison desk supporting two to four models, with derived winners and a toast at capacity.
- Accessible modal/drawer shell: portal, body scroll lock, Escape to close, focus restoration and data-autofocus.
- Mobile navigation with full-height menu.
- Subtle reveal-on-scroll, count-up statistics, card tilt and a lightweight canvas field. All motion must respect prefers-reduced-motion.

DATA
Use local typed data only. Include 20 models, 13 labs, 16 updates, funding, capex and pricing datasets. Derive totals and ratios rather than duplicating them. Label the snapshot date and describe figures as illustrative public-source research, not investment advice. Do not imply live data, real form submissions or financial advice.

RESPONSIVE AND ACCESSIBILITY
Design first for 1440px, then verify 1180px, 1020px, 780px and 390px. No horizontal overflow. Cards must reflow cleanly to one column. Hide nonessential 3D labels on small screens. Support keyboard focus, semantic landmarks, readable contrast, reduced motion and meaningful alternative text for charts.

TECHNICAL
React 19 + TypeScript + Vite. Use Three.js only for the hero. Prefer custom SVG for charts and CSS for layout. Keep dependencies minimal. Avoid Tailwind unless the project already uses it. Organize reusable primitives, page sections and overlays separately. Run `npm run build` before finishing.

ACCEPTANCE CRITERIA
- The first viewport feels distinctive and immediately explains the product.
- Every section has a clear narrative purpose and a consistent data language.
- No clipped labels, overlapping chart annotations, empty oversized panels or accidental whitespace.
- All overlays and keyboard paths work at desktop and mobile widths.
- The production build passes with no runtime exceptions.
- Copy is specific, concise and free of generic marketing filler.
```
