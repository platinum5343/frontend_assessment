# Branda V2 — Multi-Market Frontend

A production-grade, multi-market e-commerce frontend for Branda's integrated branding ecosystem. Built on the **Next.js 16.4 App Router** with **React 19**, **TypeScript (strict)**, **Tailwind CSS v4**, **Zustand 5**, and **Framer Motion 14**.

---

## Tech Stack

| Layer              | Technology                                             |
|--------------------|--------------------------------------------------------|
| Framework          | Next.js 16.4 (App Router, Turbopack, Cache Components) |
| Language           | TypeScript 5 (strict mode)                             |
| Runtime            | React 19.3 (Server + Client Components)                |
| Styling            | Tailwind CSS v4 via `@tailwindcss/turbopack`           |
| State Management   | Zustand 5 (selector-based cart store)                  |
| Animations         | Framer Motion 14 (`motion`, `useInView`, `animate`)    |
| Icons              | Lucide React                                           |
| Path Aliases       | `@/*` → `./src/*` (tsconfig + module resolution)       |

---

## Architectural Decisions

### 1. Multi-Market Subfolder Routing (`/[market]`)

All market-specific pages live under `app/[market]/`, where `[market]` is a dynamic segment validated against the supported set: `ng`, `us`, `uk`, `ca`.

- **Middleware-based geolocation**: `src/middleware.ts` inspects `Accept-Language` headers and redirects to the appropriate market on first request (NG→`ng`, US→`us`, GB→`uk`, CA→`ca`, fallback→`ng`).
- **Static generation**: `generateStaticParams` in `[market]/layout.tsx` pre-renders all 4 markets at build time. With Cache Components enabled, all 36 service pages (4 markets × 9 services) are generated statically.
- **Server-side validation**: The layout performs a defense-in-depth check — if a user manually types an unsupported market, `notFound()` triggers the 404 fallback.
- **Hreflang SEO**: Each service detail page auto-generates `alternates.languages` metadata mapping markets to locale tags (`en-NG`, `en-US`, `en-GB`, `en-CA`).

### 2. Server-Rendered URL Search Parameters for SEO

All service data, market config, and metadata are resolved **server-side** in Server Components:

- `page.tsx` (Server Component) fetches `SERVICES` from `@core/data.ts` and computes market-specific pricing inline.
- `generateMetadata` in service detail pages reads `params` as a `Promise<{ market, slug }>` (React 19 pattern) to produce dynamic, SEO-friendly metadata.
- No client-side data fetching — the initial HTML is fully rendered with content, enabling search engine indexing without JavaScript execution.

### 3. Separation of Server State and Client Cart State

| Concern              | Strategy                                              |
|----------------------|-------------------------------------------------------|
| **Server State**     | `SERVICES` array, `MarketConfig`, pricing — pure data accessed directly in Server Components with zero client bundle impact |
| **Client Cart State**| Zustand store (`@core/store.ts`) — only loaded by Client Components that need interactivity (service form, checkout) |
| **Market Context**   | `context.tsx` (Client Component boundary) — provides market config to interactive UI via React Context |
| **Navigation State** | Next.js `useRouter` for client-side transitions — no full page reloads |

This boundary ensures that the ~12KB of data/constants never enters the client bundle, while only the ~5KB Zustand store is shipped for cart interactions.

---

## Project Structure

```
branda-v2/
├── src/
│   ├── app/
│   │   ├── [market]/                        # Dynamic market segment
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx                 # Client — cart, tax, checkout flow
│   │   │   ├── components/
│   │   │   │   └── header.tsx               # Client — market switcher, nav
│   │   │   ├── context.tsx                  # Client — MarketProvider + useMarket
│   │   │   ├── error.tsx                    # Client — error boundary
│   │   │   ├── layout.tsx                   # Server — validation, generateStaticParams
│   │   │   ├── loading.tsx                  # Server — skeleton loader
│   │   │   ├── not-found.tsx                # Server — 404
│   │   │   ├── page.tsx                     # Server — market landing
│   │   │   └── services/
│   │   │       ├── [slug]/
│   │   │       │   └── page.tsx             # Server — service detail + hreflang
│   │   │       └── components/
│   │   │           ├── service-form.tsx     # Client — options, qty, add-to-cart
│   │   │           └── services-grid.tsx    # Client — animated service grid
│   │   │       └── components/
│   │   │           └── stats-counter.tsx    # Client — count-up metrics
│   │   ├── layout.tsx                       # Server — root layout, fonts
│   │   ├── not-found.tsx                    # Server — global 404
│   │   ├── page.tsx                         # Server — home (redirects)
│   │   └── globals.css                      # Tailwind v4 entry
│   ├── core/
│   │   ├── data.ts                          # Pure — SERVICES, getMarketConfig
│   │   └── store.ts                         # Zustand cart store
│   └── middleware.ts                        # Edge — geolocation redirect
├── public/                                  # Static assets
├── next.config.ts                           # Cache Components + Turbopack
├── tsconfig.json                            # Strict + @/* path alias
├── package.json
└── AGENTS.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or 22.x
- **npm** 10.x or 12.x

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/platinum5343/frontend_assessment.git
cd branda-v2

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build

# 5. Start the production server
npm run start
```

### Available Scripts

| Command         | Description                                         |
|-----------------|-----------------------------------------------------|
| `npm run dev`   | Starts the Next.js dev server with Turbopack        |
| `npm run build` | Compiles production build with static generation    |
| `npm run start` | Serves the production build locally                 |
| `npm run lint`  | Runs ESLint on `src/` with `.ts, .tsx` extensions  |

---

## Performance

- **70 static pages** generated at build time (4 markets × 9 services + shared pages)
- **Cache Components enabled** — automatic request-level caching
- **TypeScript strict** — zero type errors
- **ESLint clean** — zero warnings
- **Framer Motion** animations — count-up metrics, staggered card reveals, interactive button states

---

## License

Private — Branda V2 Frontend Assessment.
