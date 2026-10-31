# OjaTrack Web Application (`oja_track_web`)

Production-ready frontend for **OjaTrack** — a comprehensive retail operations, inventory control, and business management platform engineered specifically for Nigerian retailers, distributors, field onboarding agents, and platform administrators.

---

## 1. Project Overview

OjaTrack bridges the digital divide in Nigerian commerce by providing an offline-resilient, mobile-responsive management system that empowers shop owners ("Ogas"), cashiers, sales agents, and business executives.

### Primary Application Surfaces

1. **Public Marketing & Conversion Site (`/`, `/pricing`, `/how-it-works`, `/contact`)**:
   - High-converting landing pages communicating value proposition, local pricing tiers (₦15,000/mo Starter to ₦120,000/yr Annual Pro), and direct registration funnels.
2. **Unified Authentication Gateway (`/login`, `/shop/login`, `/agent/login`, `/admin/login`, `/shop/register`, `/agent/register`, `/verify-otp`, `/forgot-password`, `/reset-password`)**:
   - Role-specific login entry points with multi-factor OTP verification, session preservation, and role-based redirect routing.
3. **Shop Operations Surface (`/shop/*`)**:
   - **Oga Command Center (`/shop/dashboard`)**: Real-time sales metrics, gross margin tracking, active staff monitors, and critical low-stock alerts.
   - **Offline-First Point of Sale (`/shop/sales`)**: High-speed cashier checkout terminal with instant product search, barcode readiness, multi-payment options (Cash, POS Transfer, Split), and offline queuing.
   - **Inventory & Stock Management (`/shop/inventory`)**: Product catalog, SKU tracking, margin calculations, stock adjustment logs, and automated restock triggers.
   - **Staff & Permission Control (`/shop/staff`)**: Team directory, role delegations (`owner` vs `staff`), and phone-based invitation workflows.
   - **Offline Sync Queue (`/shop/offline-queue`)**: Live IndexedDB transaction ledger with sync health indicators and manual batch retry triggers.
   - **Store Subscription (`/shop/subscription`)**: Tier management, renewal countdowns, and paystack/card renewal handling.
   - **Field Agent Booking (`/shop/book-agent`)**: Direct dispatch requests for stock taking, staff training, and physical audits.
   - **Store Settings (`/shop/settings`)**: Multi-branch profile editor and custom receipt footer configuration.
4. **Agent Portal (`/dashboard/agent/*`)**:
   - Field force dashboard tracking retailer onboardings, referral links, tiered commission earnings, national leaderboard rankings, and direct Nigerian bank account payouts.
5. **Super Admin Platform (`/dashboard/admin/*`)**:
   - Executive operational command center overseeing network-wide store volume, agent compliance, commission liabilities, subscription expirations, and financial disbursal clearances.

---

## 2. Technology Stack

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19.2.8](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native design tokens and CSS variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Offline Storage**: [Dexie.js](https://dexie.org/) (Client-side IndexedDB with idempotent UUID transactions)
- **State & Context**: Native React 19 Context (`AuthProvider`, `ToastProvider`)
- **API Communication**: Native standard fetch client with silent JWT refresh, CORS credential passing, and unified error handling

---

## 3. Environment Variables

Create a `.env.local` file in the root of `oja_track_web` based on `.env.example`:

```env
# Backend REST API endpoint (Fastify server)
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
| `typecheck` | `tsc --noEmit` | Validates TypeScript types across all files without emitting output. |

---

## 6. Project Architecture & Directory Structure

```text
oja_track_web/
├── app/
│   ├── (auth)/                  # Auth screens: /login, /verify-otp, /forgot-password, /reset-password
│   │   ├── login/
│   │   ├── verify-otp/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── shop/                    # Shop Operations surface
│   │   ├── login/               # Dedicated Shop Owner login
│   │   ├── register/            # Self-service Shop Owner onboarding
│   │   ├── layout.tsx           # Shop application shell with sidebar, branches, offline pill
│   │   ├── dashboard/           # Oga Command Center
│   │   ├── sales/               # Offline-first POS Cashier register
│   │   ├── inventory/           # Product and inventory management
│   │   ├── staff/               # Team directory and role access
│   │   ├── offline-queue/       # Offline transaction queue monitor
│   │   ├── subscription/        # Plan status and upgrade flows
│   │   ├── book-agent/          # Field agent support requests
│   │   └── settings/            # Store profile and receipt configuration
│   ├── dashboard/               # Agent & Platform Admin surfaces
│   │   ├── agent/               # Field Agent Portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Agent overview
│   │   │   ├── earnings/        # Commission history and breakdown
│   │   │   ├── leaderboard/     # National rankings
│   │   │   ├── shops/           # Onboarded shop fleet
│   │   │   └── withdraw/        # NIP bank transfer payout requests
│   │   └── admin/               # Super Admin Command Center
│   │       ├── layout.tsx
│   │       ├── page.tsx         # Executive metrics & health
│   │       ├── agents/          # Agent verification and KYC
│   │       ├── shops/           # Network-wide store directory
│   │       └── withdrawals/     # Financial disbursal clearance
│   ├── components/              # Reusable UI & surface components
│   │   ├── ui/                  # Button, Input, Card, Badge, Modal, Toast
│   │   ├── marketing/           # Header, Hero, Features, Pricing, Footer
│   │   ├── dashboard/           # Shell, Charts, StatCards, Tables
│   │   └── theme/               # ThemeProvider, ThemeToggle
│   ├── layout.tsx               # Root layout (AuthProvider, ToastProvider)
│   ├── page.tsx                 # Public marketing homepage
│   ├── pricing/                 # Pricing page
│   ├── how-it-works/            # Explainer page
│   └── contact/                 # Support & inquiries page
├── lib/
│   ├── api/                     # Centralized API service layer
│   │   ├── client.ts            # Base fetch client with silent refresh
│   │   ├── endpoints.ts         # Central API route dictionary
│   │   ├── auth.ts              # Authentication API
│   │   ├── retail.ts            # Shop & POS operations API
│   │   ├── agent.ts             # Agent portal API
│   │   └── platform.ts          # Super admin platform API
│   ├── auth/                    # Authentication & routing security
│   │   ├── auth-context.tsx     # Session state & hooks
│   │   ├── permissions.ts       # RBAC helper functions
│   │   └── route-utils.ts       # Guard utilities & redirect resolvers
│   ├── offline/                 # Offline-first sync engine
│   │   ├── db.ts                # Dexie IndexedDB schemas
│   │   └── sync-manager.ts      # Queueing, local inventory decrement, FIFO sync
│   └── site.ts                  # Navigation configs & metadata constants
├── types/                       # TypeScript interfaces and domain models
│   ├── api.ts                   # Standard API response & error structures
│   ├── auth.ts                  # User, Session, Registration types
│   ├── retail.ts                # Products, Categories, Sales, Inventory
│   ├── agent.ts                 # Commissions, Referrals, Leaderboard, Payouts
│   └── platform.ts              # Platform metrics, System health, Subscriptions
├── .env.example                 # Environment variable template
├── package.json                 # Project dependencies and npm scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 7. Offline-First Resilience (POS & Sales)

1. **Storage Layer**: When an internet disconnection occurs or network latency spikes, sales transactions are securely written to an IndexedDB store (`OjaTrackOfflineDB`).
2. **Local Inventory Updates**: Local product quantities are decremented immediately in IndexedDB so cashiers always see accurate remaining stock during peak trading hours.
3. **Idempotency Guarantee**: Every transaction generates a client-side UUID `idempotency_key`. When reconnected, sales are submitted sequentially (FIFO). If a sale was already processed by the backend, the server returns the existing record without duplicate charges or stock deduction errors.
4. **Visual Indicators**: Cashiers can monitor sync health directly from the top navigation bar pill and manage unsynced transactions in `/shop/offline-queue`.

---

## 8. Deployment on Vercel

Refer to `project-docs/VERCEL-DEPLOYMENT.md` in the project root for complete step-by-step production deployment instructions, environment variable configurations, and custom domain setup.
