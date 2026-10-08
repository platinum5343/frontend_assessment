# Branda V2 — Multi-Market Branding Service Platform

An enterprise-grade, high-performance frontend implementation of the **Branda V2 Ecosystem**, engineered using the Next.js App Router to deliver seamless multi-market support, clean state isolation, and maximum SEO discoverability across **Nigeria, USA, UK, and Canada**.

##  Technology Stack & Justification

*   **Framework:** Next.js (App Router) & React — Mandatory setup for native Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), static generation optimization, and progressive layout streaming.
*   **Styling:** Tailwind CSS — Mandatory for optimized utility-first layout styling with zero runtime bundle overhead.
*   **State Management:** Zustand — Chosen over React Context to implement completely isolated, selector-based client state tracking for the shopping cart. This ensures that mutating cart items does not trigger top-level app re-renders, protecting performance.
*   **Animations:** Framer Motion — Integrated using structural layout tags and spring mechanics (`stiffness`, `damping`) to mirror the fluid scroll reveals and active capsule animations found on the live platform.

---

##  Core Architectural Decisions

1. **Subfolder International Routing Engine (`/[market]`)**
   To maximize international SEO authority and prevent subdomain indexing fragmentation, multi-market validation is enforced inside subfolders (`/ng`, `/us`, `/uk`, `/ca`). A custom Edge Middleware handles geographic traffic routing before rendering layouts.

2. **Server-Rendered Search Parameterization (`searchParams`)**
   The main Service Listing page relies entirely on Next.js Server Components. Filtering (Categories, Use Case, Industry) and sorting parameters are extracted straight from the URL query string. This guarantees that all catalog states remain indexable by search crawlers and are shareable by users.

3. **Strict Client-Server Architectural Boundaries**
   The immutable service catalog database operates as a pure TypeScript module without React dependencies, keeping it 100% tree-shakable. Interactivity is pushed entirely to the leaf components (e.g., quantity selectors, search inputs) to ship minimal JavaScript bundles to the browser.

---

##  Step-by-Step Local Setup

Ensure you have **Node.js 18.x / 20.x / 22.x** or higher installed.

```bash
# 1. Clone the repository
git clone https://github.com[YOUR-USERNAME]/branda-v2.git
cd branda-v2

# 2. Install production dependencies
npm install

# 3. Spin up the development server with Turbopack acceleration
npm run dev
# → Open your browser and navigate to http://localhost:3000

# 4. Execute a production-ready compilation check
npm run build

# 5. Serve the production compilation locally
npm run start
```
