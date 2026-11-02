# OjaTrack Web Application (`oja_track_web`)

Production-ready, hardened frontend for **OjaTrack** — a comprehensive retail operations, inventory control, and business management platform engineered specifically for Nigerian retailers, distributors, field onboarding agents, and platform administrators.

**Production Deployment:** [https://oja-track-web.vercel.app/](https://oja-track-web.vercel.app/)  
**Hardened Working Branch:** `frontend/production-hardening`  
**Frontend Repository:** [https://github.com/SOCIAL-TECHNACY/oja_track_web.git](https://github.com/SOCIAL-TECHNACY/oja_track_web.git)  

---

## 1. Project Overview

OjaTrack bridges the digital divide in Nigerian commerce by providing an offline-resilient, mobile-responsive management system that empowers shop owners ("Ogas"), cashiers, sales agents, and business executives.

### Primary Application Surfaces

1. **Public Marketing & Conversion Site (`/`, `/pricing`, `/how-it-works`, `/contact`)**:
   - High-converting landing pages communicating value proposition, local pricing tiers (₦15,000/mo Starter to ₦120,000/yr Annual Pro), and direct registration funnels.
2. **Unified Authentication Gateway (`/login`, `/shop/login`, `/agent/login`, `/admin/login`, `/shop/register`, `/agent/register`, `/verify-otp`, `/forgot-password`, `/reset-password`)**:
   - Role-specific login entry points with multi-factor OTP verification, session preservation, and role-based redirect routing.
3. **Shop Operations Surface (`/shop/*`)**:
   - **Oga Command Center (`/shop/dashboard`)**: Genuine metrics derived from local cache or central server with loading skeletons and empty states. No fabricated business metrics.
   - **Offline-First Point of Sale (`/shop/sales`)**: High-speed cashier checkout terminal with instant product search, barcode readiness, multi-payment options (Cash, POS Transfer, Split), local IndexedDB product catalog pre-caching, and offline queuing.
   - **Inventory & Stock Management (`/shop/inventory`)**: Product catalog, SKU tracking, margin calculations, stock adjustment logs, and automated restock triggers.
   - **Staff & Permission Control (`/shop/staff`)**: Team directory, role delegations (`owner` vs `staff`), and phone-based invitation workflows with clean empty states.
   - **Offline Sync Queue (`/shop/offline-queue`)**: Live IndexedDB transaction ledger with sync health indicators and manual batch retry triggers.
   - **Store Subscription (`/shop/subscription`)**: Tier management, renewal countdowns, and paystack/card renewal handling.
   - **Field Agent Booking (`/shop/book-agent`)**: Direct dispatch requests for stock taking, staff training, and physical audits.
   - **Store Settings (`/shop/settings`)**: Multi-branch profile editor and custom receipt footer configuration.
4. **Agent Portal (`/dashboard/agent/*`)**:
   - Field force dashboard tracking retailer onboardings, referral links, tiered commission earnings, national leaderboard rankings, and direct Nigerian bank account payouts. Initialized with real empty states and skeletons instead of mock fixtures.
5. **Super Admin Platform (`/dashboard/admin/*`)**:
   - Executive operational command center overseeing network-wide store volume, agent compliance, commission liabilities, subscription expirations, and financial disbursal clearances.

---

## 2. Technology Stack

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19.2.8](https://react.dev/)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/) (Strict mode enabled, 0 compiler errors)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native design tokens and CSS variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Offline Storage**: [Dexie.js 4.0](https://dexie.org/) (Client-side IndexedDB with persistent storage and idempotent UUID transactions)
- **State & Context**: Native React 19 Context (`AuthProvider`, `ToastProvider`)
- **API Communication**: Native standard fetch client with silent JWT refresh, CORS credential passing, and unified error handling

---

## 3. Environment Variables

Create a `.env.local` file in the root of `oja_track_web` based on `.env.example`:

```env
# Backend REST API endpoint (Fastify server)
# In development: defaults to http://localhost:3300/api/v1 if not configured
# In production: MUST be provided (e.g. on Vercel); never defaults to localhost
NEXT_PUBLIC_API_URL=http://localhost:3300/api/v1
```

For production deployment on Vercel:
```env
NEXT_PUBLIC_API_URL=https://api.ojatrack.com/api/v1
```

---

## 4. Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/SOCIAL-TECHNACY/oja_track_web.git
cd oja_track_web

# Install dependencies
npm install

# Set up local environment
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to interact with the application.

---

## 5. Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts local Next.js development server with Hot Module Replacement (HMR). |
| `build` | `next build` | Runs full TypeScript validation and creates an optimized production build. |
| `start` | `next start` | Runs the production build locally. |
| `lint` | `next lint` | Executes ESLint to verify code quality and style compliance. |
| `typecheck` | `tsc --noEmit` | Validates TypeScript types across all files without emitting output (0 errors). |

---

## 6. Offline-First Resilience (POS & Sales)

1. **Storage Layer**: When an internet disconnection occurs or network latency spikes, sales transactions are securely written to an IndexedDB store (`OjaTrackOfflineDB`).
2. **Persistent Storage**: Utilizes `navigator.storage.persist()` to protect counter transactions from aggressive mobile browser eviction.
3. **Catalog Pre-Caching**: Real inventory fetched from the central server is automatically saved into local IndexedDB (`offlineDb.products`), allowing the POS terminal to function fully without internet.
4. **Idempotency Guarantee**: Every transaction generates a client-side UUID `idempotency_key`. When reconnected, sales are submitted sequentially (FIFO).
5. **Backend Schema Resilience**: The sync engine automatically submits sales with `sold_at` original creation timestamps; if Daniel's Fastify schema rejects it due to strict payload validation (`additionalProperties: false`), the engine transparently retries without `sold_at`, ensuring sales are never stranded in the offline queue.
6. **Visual Indicators**: Cashiers can monitor sync health directly from the top navigation bar pill and manage unsynced transactions in `/shop/offline-queue`.

---

## 7. Known Backend Integration Requirements (For Daniel)

The frontend is fully compatible with Daniel's backend (`oja_track_server`), with the following four alignment notes documented:

1. **Active Route Registration**: In `oja_track_server/src/app.ts`, ensure `orgRoutes` and `retailRoutes` are registered and not commented out.
2. **Sale Schema `sold_at`**: In `oja_track_server/src/modules/retail/schema/retail.schema.ts`, allow `sold_at?: string` in `saleSchema` so the server preserves the actual client transaction timestamp when an offline queue flushes.
3. **Password Reset Schema**: In `oja_track_server/src/modules/auth/schema/auth.schema.ts`, allow `email` in `passwordResetSchema` to match the controller and service requirements.
4. **CORS & Cookies**: Configure `@fastify/cors` with `credentials: true` for `https://oja-track-web.vercel.app`, and set `@fastify/cookie` with `SameSite: "none"` and `Secure: true` for cross-origin preview deployments.

---

## 8. Deployment & Operational Checklist

Refer to `project-docs/FRONTEND-PRODUCTION-CHECKLIST.md` for complete post-deployment smoke tests, mobile offline testing protocols, and rollback procedures.
