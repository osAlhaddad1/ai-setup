# IRONNODE — Enterprise AI Infrastructure, Entirely On-Premise

Marketing site for an on-premise AI hardware company. Multi-page Vue 3 app with a
plain-language savings (TCO) calculator, hardware fleet specifications, deployment
pipeline, and technical FAQ.

## Stack

- [Vue 3](https://vuejs.org/) + [Vue Router](https://router.vuejs.org/) (multi-page SPA)
- [Vite](https://vite.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)-style components on [reka-ui](https://reka-ui.com/) primitives (`src/components/ui/`)
- [Vitest](https://vitest.dev/) + Vue Test Utils

## Development

```sh
npm install
npm run dev        # dev server on http://localhost:5173
npm test           # unit + component tests
npm run typecheck  # vue-tsc
npm run build      # production build to dist/
```

## Pages

| Route         | Purpose                                                          |
| ------------- | ---------------------------------------------------------------- |
| `/`           | Hero, value propositions, cloud-vs-on-premise comparison          |
| `/calculator` | Savings calculator — monthly AI bill, team size, usage level     |
| `/fleet`      | Three hardware tiers with full specification table               |
| `/deployment` | Four-step deployment pipeline and the open-source software stack |
| `/faq`        | Technical FAQ and site-audit CTA                                 |

## TCO model

The calculator maps three business-friendly inputs (monthly AI spend, team size,
usage level) onto the engineering formulas in `src/lib/tco.ts`:

- Monthly local cost = CapEx / 36 + power draw (kW) × 730 h × €/kWh
- Break-even months = CapEx / (monthly cloud spend − monthly power cost)

Tier recommendation converts team size × usage weight into concurrent-user
equivalents and picks the smallest tier that serves the load.

## CI/CD

- **CI** (`.github/workflows/ci.yml`): typecheck, tests, and build on every push and PR.
- **CD** (`.github/workflows/deploy.yml`): builds and deploys to GitHub Pages on every
  push to `main` (requires Pages to be enabled with "GitHub Actions" as the source in
  the repository settings).
