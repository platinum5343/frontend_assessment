# Branda V2 — Multi-Market Frontend

A production-grade, multi-market e-commerce frontend for Branda's integrated branding ecosystem. Built on the **Next.js 16.4 App Router** with **React 19**, **TypeScript (strict)**, **Tailwind CSS v4 (via Turbopack)**, **Zustand 5** for state management, and **Framer Motion 14** for animations.

---

## Tech Stack

| Layer             | Technology                                                |
|-------------------|-----------------------------------------------------------|
| Framework         | Next.js 16.4 (App Router, Turbopack, Cache Components)    |
| Runtime           | React 19.3 (Server + Client Components, Streaming SSR)    |
| Language          | TypeScript 5 (strict mode, `@/*` path alias)                |
| Styling           | Tailwind CSS v4 via `@tailwindcss/turbopack`               |
| State Management  | Zustand 5 (selector-based cart store)                     |
| Animations        | Framer Motion 14 (`motion`, `useInView`, `animate`, `useSpring`) |
| Image Optimization| `next/image` with WebP/AVIF formats                          |
| Build Tooling     | Turbopack (dev + prod), SWC compiler                        |

---

## Key Architectural Decisions

### 1. Multi-Market Subfolder Routing (`/[market]`)

All market-specific pages live under `app/[market]/`, where `[market]` is a dynamic segment validated against the supported set: `ng`, `us`, `uk`, `ca`. This strategy was chosen over locale-based routing (`en-NG`, `en-US`) because:

- **SEO-friendly URLs**: `branda.com.ng/ng/services/logo-design` is more readable than `branda.com/services/logo-design?hl=en-NG`
- **Static generation**: All 36 service pages (4 markets × 9 services) are pre-rendered at build time via `generateStaticParams`, with Cache Components enabled
- **Edge redirect**: `src/middleware.ts` inspects `Accept-Language` headers on first request and issues a 307 redirect to the appropriate market path — executing at <5ms edge latency

### 2. Server-Rendered URL Search Parameters for Maximum SEO Indexing

Search, category filters, use-case filters, industry filters, and sorting state are all encoded in URL query parameters (e.g., `/ng/services?search=logo&category=digital&sortBy=price&page=2`). This was chosen because:

- **Shareable results**: Every filtered view has a unique, shareable URL
- **Search engine indexing**: Crawlers can discover every filtered combination without executing JavaScript
- **Server-side rendering**: All filtering and sorting logic executes in Server Components — no client-side data processing
- **No client-state duplication**: Filters don't exist in React state, eliminating hydration mismatches

### 3. Separation of Server State from Client Cart State

The architecture enforces a strict boundary between server-resolvable data and client-resolvable state:

| Layer               | What                              | Where                | Shipped to Client |
|---------------------|-----------------------------------|----------------------|-------------------|
| **Server State**    | `SERVICES`, `MarketConfig`, pricing | `core/data.ts`       | No                |
| **Client State**    | Cart items, selected options       | `core/store.ts`      | Yes (~5KB)        |
| **Market Context**  | Current market + config            | `context.tsx`        | Yes (~2KB)        |
| **UI State**        | Search input, dropdown open         | Local `useState`     | Yes (bundled)     |

This separation ensures the 605-line `SERVICES` data array (containing all service definitions, pricing, options, and filter metadata) stays entirely on the server — never entering the client bundle.

---

## Project Structure

```
branda-v2/
├── src/
│   ├── app/
│   │   ├── [market]/
│   │   │   ├── about/
│   │   │   │   ├── components/
│   │   │   │   │   └── stats-counter.tsx    # Client — count-up animations
│   │   │   │   └── page.tsx                  # Server — company story
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx                  # Client — cart, tax, checkout
│   │   │   ├── components/
│   │   │   │   └── header.tsx               # Client — switcher, nav
│   │   │   ├── context.tsx                  # Client — MarketProvider
│   │   │   ├── error.tsx                    # Client — error boundary
│   │   │   ├── layout.tsx                   # Server — validation, SSG
│   │   │   ├── loading.tsx                  # Server — skeleton
│   │   │   ├── not-found.tsx                # Server — 404
│   │   │   ├── page.tsx                     # Server — landing
│   │   │   └── services/
│   │   │       ├── [slug]/
│   │   │       │   └── page.tsx             # Server — detail + hreflang
│   │   │       ├── components/
│   │   │       │   ├── categories.ts        # Shared — category definitions
│   │   │       │   ├── service-form.tsx     # Client — options, qty, cart
│   │   │       │   └── services-grid.tsx    # Client — grid, search, filters, pagination
│   │   │       └── page.tsx                 # Server — listing with SSR filters
│   │   ├── layout.tsx                       # Server — root layout, fonts
│   │   ├── not-found.tsx                    # Server — global 404
│   │   ├── page.tsx                         # Server — redirect via middleware
│   │   └── globals.css                      # Tailwind v4 entry
│   ├── core/
│   │   ├── data.ts                          # Pure — SERVICES, types, filters
│   │   └── store.ts                         # Zustand — cart store
│   └── middleware.ts                        # Edge — geolocation redirect
├── public/
├── next.config.ts                           # Cache Components + Turbopack + image config
├── tsconfig.json                            # Strict mode + @/* alias
├── package.json
└── AGENTS.md
```

---

## Getting Started

### Prerequisites

| Tool    | Minimum Version |
|---------|-----------------|
| Node.js | 20.x or 22.x    |
| npm     | 10.x or 12.x    |

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

## Supported Markets

| Market Code | Country         | Currency Code | Symbol | Default |
|-------------|-----------------|---------------|--------|---------|
| `ng`        | Nigeria         | NGN           | ₦      | Yes     |
| `us`        | United States   | USD           | $      |         |
| `uk`        | United Kingdom  | GBP           | £      |         |
| `ca`        | Canada          | CAD           | $      |         |

### Geolocation Detection

The middleware (`src/middleware.ts`) automatically detects the user's market from `Accept-Language` headers:

| Accept-Language Pattern | Market |
|-------------------------|--------|
| `en-NG,en;q=0.9`         | `ng`   |
| `en-US,en;q=0.9`         | `us`   |
| `en-GB,en;q=0.9`         | `uk`   |
| `en-CA,en;q=0.9`         | `ca`   |
| *(any other)*            | `ng`   |

---

## Features

### Services Listing Page

- **Modern grid layout** with service images, names, pricing, and featured badges
- **Smart search** — filters services by name and description via URL parameters
- **Category filter** — Digital, Gifts, Create, Studio, Prints
- **Additional filters** — Use Case (corporate, events, startup, personal) and Industry (tech, hospitality, education, entertainment)
- **Sorting** — by popularity (default) or price (low to high)
- **Price display** — shows original price (strikethrough) when discounts apply
- **Pagination** — 9 items per page with Previous/Next controls

### Service Detail Page

- Server-rendered with `generateStaticParams` for all 36 pages
- Hreflang metadata for international SEO
- Interactive options picker using Framer Motion
- Quantity selector with Zustand cart integration
- Discounted price display with strikethrough on original

### Checkout

- Real-time cart summary with itemized pricing
- 7.5% tax calculation
- Total with currency-appropriate symbol
- Empty state with browse CTA

### Animations (Framer Motion)

- Header: staggered nav link reveal, dropdown animations, button hover states
- Services Grid: entry animations with stagger, category button scale, featured badge spring
- About Stats: count-up from zero, staggered card entry
- Checkout: confirmation screen spring-in, staggered item reveal
- Search/Filter controls: fade-in with delay

---

## License

Private — Branda V2 Frontend Assessment.
