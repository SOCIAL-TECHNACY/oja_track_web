import SectionHeading from "./SectionHeading";

function DeadCta({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return outline ? (
    <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg border border-white/40 px-5 text-[13px] font-semibold text-white">
      {children}
    </span>
  ) : (
    <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base opacity-90">
      {children}
    </span>
  );
}

const tabs = ["Overview", "Record Sale", "Inventory", "Staff Registry", "Reports"];

export function ShopHero() {
  const bars = [42, 58, 48, 72, 60, 86, 100];
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 text-center">
        <span className="inline-block rounded-full border border-brand-hover/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
          Works 100% offline — no internet needed
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          Take Control of Your Shop, Stop Losing Money
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75">
          Track daily sales, count inventory, and monitor your shop securely
          directly from your phone — even when there&apos;s no network. Built
          for hardworking Nigerian shop owners.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <DeadCta>Start Free 14-Day Trial</DeadCta>
          <DeadCta outline>Watch Live Demo</DeadCta>
        </div>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-[0_24px_64px_rgba(0,0,0,0.3)] dark:bg-foundation-secondary">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <p className="text-xs font-bold text-light-primary dark:text-ink-primary">
              OjaTrack Dashboard — Grace Branch 1
            </p>
            <span className="rounded-full bg-brand-primary/15 px-2 py-0.5 text-[10px] font-bold text-brand-deep dark:text-brand-hover">
              Live
            </span>
          </div>
          <div className="grid sm:grid-cols-[140px_1fr_1fr]">
            <ul className="hidden border-r border-border p-2 sm:block">
              {tabs.map((t, i) => (
                <li
                  key={t}
                  className={`rounded-lg px-3 py-2 text-xs ${i === 0 ? "bg-brand-primary/10 font-bold text-brand-deep dark:text-brand-hover" : "text-light-secondary"}`}
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="p-4">
              <p className="text-[11px] font-semibold text-light-muted">Today&apos;s Total</p>
              <p className="text-2xl font-extrabold text-light-primary dark:text-ink-primary">
                ₦485,250
              </p>
              <p className="mt-1 text-[11px] text-light-muted">Weekly Profit Curve</p>
              <div className="mt-2 flex h-20 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t ${i === bars.length - 2 ? "bg-brand-primary" : "bg-brand-deep/70 dark:bg-brand-primary/40"}`}
                  />
                ))}
              </div>
            </div>
            <div className="border-t border-border p-4 sm:border-t-0 sm:border-l">
              <p className="text-[11px] font-bold text-danger">3 Items Left!</p>
              <p className="text-[11px] text-light-muted">Low stock alerts</p>
              <ul className="mt-2 space-y-1.5">
                {["Milo Refill 800g", "Golden Penny Flour", "Indomie Carton"].map((s) => (
                  <li key={s} className="rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-light-primary dark:bg-foundation-elevated dark:text-ink-primary">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const pains = [
  { title: "Unrecorded Sales", body: "Cash sales vanish when no one writes them down. Every unbilled item is profit gone.", tag: "₦40k+ lost monthly" },
  { title: "Unknown Stock", body: "You reorder blindly because nobody knows what's actually on the shelves.", tag: "Stock blind spots" },
  { title: "Invisible Profit", body: "Without books, you can't tell a good month from a bad one until it's too late.", tag: "Zero financial growth" },
  { title: "Staff Leakage", body: "Untracked handling and unlogged discounts quietly drain your margins daily.", tag: "Constant pilferage" },
];

export function ShopPain() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="The cost of disorganization"
        title="Are You Running a Shop, or Losing Money?"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pains.map((p) => (
          <div key={p.title} className="flex flex-col rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-base">
              ✕
            </span>
            <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
              {p.title}
            </p>
            <p className="mt-1 flex-1 text-[13px] leading-5 text-light-secondary">{p.body}</p>
            <p className="mt-3 inline-block w-fit rounded-full bg-danger/10 px-2.5 py-1 text-[11px] font-bold text-danger">
              {p.tag}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-light-secondary">
          <span aria-hidden className="mt-0.5 font-bold text-brand-primary">✓</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

function SplitHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <p className="inline-block rounded-md bg-brand-primary/10 px-2 py-0.5 text-[11px] font-bold tracking-[0.12em] text-brand-deep uppercase dark:text-brand-hover">
        {kicker}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-light-primary dark:text-ink-primary">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-light-secondary">{body}</p>
    </div>
  );
}

const mockCard =
  "rounded-2xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export function ShopFeatures() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-16 px-6 py-6">
      <div className="pt-8 text-center">
        <SectionHeading
          overline="Platform features"
          title="Everything You Need to Run Your Shop Securely"
        />
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <SplitHead
            kicker="Point of sale"
            title="Record Every Single Sale in 2 Seconds"
            body="Tap, confirm, done. Each sale updates stock and profit instantly, with inventory reduced automatically. No manual calculations required."
          />
          <Bullets items={["Quick touch menu for popular items", "Auto-calculates exact change for customers"]} />
        </div>
        <div className={mockCard}>
          <p className="text-xs font-bold text-light-muted uppercase">Receipt #1042</p>
          {[
            ["Titilope Milk 12g × 4", "₦3,200"],
            ["Golden Penny Flour", "₦48,000"],
            ["Milo Refill 800g × 2", "₦18,600"],
          ].map(([k, v]) => (
            <div key={k} className="mt-2 flex items-center justify-between border-b border-border pb-2 text-[13px]">
              <span className="text-light-secondary">{k}</span>
              <span className="font-bold text-light-primary dark:text-ink-primary">{v}</span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between text-sm font-extrabold">
            <span className="text-light-primary dark:text-ink-primary">Total</span>
            <span className="text-brand-deep dark:text-brand-hover">₦69,800</span>
          </div>
        </div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2 [&>*:first-child]:md:order-2">
        <div>
          <SplitHead
            kicker="Inventory alerts"
            title="Track Inventory Live & Get Low-Stock Alerts"
            body="Stop guessing your stock levels. Every time a sale is made, the stock updates automatically and instant phone notifications warn you when fast-selling goods run low."
            />
          <Bullets items={["Get custom re-order warnings for each product", "Easy stock count with quick generate"]} />
        </div>
        <div className={mockCard}>
          <ul className="space-y-2">
            {[
              ["Milo Refill Pack", "3 Packs Left", "expiring" as const],
              ["Golden Penny Flour", "5 Pieces Left", "expiring" as const],
              ["Pure Life 75cl", "Out of Stock", "expired" as const],
            ].map(([k, v]) => (
              <li key={k as string} className="flex items-center justify-between rounded-xl bg-surface px-3 py-2.5 dark:bg-foundation-elevated">
                <span className="text-[13px] font-semibold text-light-primary dark:text-ink-primary">{k}</span>
                <span className="text-[11px] font-bold text-danger">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <SplitHead
            kicker="Staff security"
            title="Monitor Your Staff Without Being Physically Present"
            body="Each attendant has a separate login with limited permissions. They cannot edit prices or delete sales — and you see every action from anywhere."
          />
          <Bullets items={["Prevent manual editing of prices or refusal sales", "See each push event of every log-in and cash change"]} />
        </div>
        <div className={mockCard}>
          <p className="text-xs font-bold text-light-muted uppercase">Shift Activity</p>
          <ul className="mt-3 space-y-2">
            {[
              ["Gift Okafor (Morning)", "₦84,200 logged", true],
              ["John Musa (Afternoon)", "₦61,750 logged", true],
              ["Adaeze N. (Evening)", "Shift pending", false],
            ].map(([k, v, ok]) => (
              <li key={k as string} className="flex items-center justify-between rounded-xl bg-surface px-3 py-2.5 text-[13px] dark:bg-foundation-elevated">
                <span className="font-semibold text-light-primary dark:text-ink-primary">{k}</span>
                <span className={`text-[11px] font-bold ${ok ? "text-brand-deep dark:text-brand-hover" : "text-light-muted"}`}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2 [&>*:first-child]:md:order-2">
        <div>
          <SplitHead
            kicker="Data information"
            title="Works Without Internet, Syncs Automatically Later"
            body="Completely offline-first: run your entire business from your phone in a basement market or remote area. It automatically backs everything up once you're online."
          />
          <Bullets items={["Smooth operation in low-network and remote regions", "Cloud backup protects your metrics even if you lose your phone"]} />
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-brand-deep p-10 text-center">
          <div>
            <p className="text-4xl font-extrabold text-white">100%</p>
            <p className="mt-1 text-sm font-bold text-brand-hover">Offline Resilience</p>
            <p className="mx-auto mt-2 max-w-55 text-xs text-white/70">
              Sales keep recording with zero network — syncs the second you&apos;re back.
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <SplitHead
            kicker="Financial intelligence"
            title="Real Business Reports That Make Sense"
            body="No accounting degree needed. Plain-English entries generate clean reports on daily sales, gross margins, actual profits, and your single performing levels at a glance."
          />
          <Bullets items={["Daily summary reports delivered straight to your WhatsApp", "Instant visibility into your best and worst selling items"]} />
        </div>
        <div className={mockCard}>
          <p className="text-xs font-bold text-light-muted uppercase">Profitability Analytics</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-surface p-3 dark:bg-foundation-elevated">
              <p className="text-[11px] text-light-muted">Total Revenue</p>
              <p className="text-lg font-extrabold text-light-primary dark:text-ink-primary">₦1.24M</p>
            </div>
            <div className="rounded-xl bg-brand-primary/10 p-3">
              <p className="text-[11px] text-light-muted">Net Profit</p>
              <p className="text-lg font-extrabold text-brand-deep dark:text-brand-hover">₦480,300</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-surface px-3 py-2.5 text-[13px] dark:bg-foundation-elevated">
            <span className="text-light-secondary">Top seller this week</span>
            <span className="font-bold text-light-primary dark:text-ink-primary">Golden Penny Flour × 40kg</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const miniTiers = [
  { name: "Weekly Tier", price: "₦3,000", per: "/week", features: ["1 Active Shop", "Offline Ledger", "Basic Reports", "WhatsApp Alerts"], featured: false, cta: "Choose Weekly" },
  { name: "Monthly Plan", price: "₦5,000", per: "/month", features: ["1 Active Shop", "Advanced Analytics", "Offline Ledger", "Dedicated Support + Phone Call"], featured: true, cta: "Get Started Now" },
  { name: "Yearly Committed", price: "₦48,000", per: "/year", features: ["1 Active Shop Outlet", "Unlimited Histories", "Cloud Data Backup", "247 Priority Support Line"], featured: false, cta: "Choose Yearly" },
];

export function ShopPricingTeaser() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
            Transparent pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
            Simple, Flat Pricing Packages
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {miniTiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                t.featured
                  ? "border-brand-primary bg-brand-primary/5 shadow-[0_2px_12px_rgba(0,200,83,0.15)]"
                  : "border-border bg-white dark:bg-foundation-secondary dark:border-[#1e3a2b]"
              }`}
            >
              <p className="text-[11px] font-bold tracking-[0.14em] text-light-muted uppercase">{t.name}</p>
              <p className="mt-2">
                <span className="text-3xl font-extrabold text-light-primary dark:text-ink-primary">{t.price}</span>{" "}
                <span className="text-sm text-light-muted">{t.per}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-light-secondary">
                    <span aria-hidden className="font-bold text-brand-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className={`mt-5 inline-flex h-9 w-full cursor-default items-center justify-center rounded-lg text-[13px] font-bold ${t.featured ? "bg-brand-primary text-foundation-base" : "border border-border text-light-primary dark:text-ink-primary"}`}>
                {t.cta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShopTestimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          Success stories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          Loved by Real Retailers Across Nigeria
        </h2>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { q: "Since I started using OjaTrack at my Balogun boutique, I'm no longer scared to leave the shop. I can see every sale from my phone. No more missing items.", n: "Mrs. Chioma Nwachukwu", r: "Boutique Owner — Balogun Market" },
          { q: "Our market in Onitsha has terrible network. OjaTrack works offline all day and syncs everything at night. Brilliant app.", n: "Ibrahim Musa", r: "Provisions Store — Onitsha Main Market" },
        ].map((t) => (
          <figure key={t.n} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <blockquote className="text-[13px] leading-6 text-light-primary dark:text-ink-primary">
              “{t.q}”
            </blockquote>
            <figcaption className="mt-4">
              <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">{t.n}</span>
              <span className="block text-xs text-light-muted">{t.r}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Download & Register", d: "Get the app on any Android or iOS device and create your account in minutes." },
  { n: "02", t: "Add Stock & Products", d: "Snap your shelves or upload a list once. You appear on track for sales." },
  { n: "03", t: "Add Staff & Sell", d: "Give each attendant a PIN and start recording transactions securely." },
];

export function ShopSteps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-14">
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          Onboarding steps
        </p>
        <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          Get Started in 3 Simple Steps
        </h2>
      </div>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-lg font-extrabold text-brand-primary">{s.n}</p>
            <p className="mt-2 text-[15px] font-bold text-light-primary dark:text-ink-primary">{s.t}</p>
            <p className="mt-1 text-[13px] leading-5 text-light-secondary">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ShopCta() {
  return (
    <section className="bg-brand-primary/10 dark:bg-transparent">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-balance text-light-primary dark:text-ink-primary">
          Secure Your Hard-Earned Profit Today
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-light-secondary">
          Join thousands of smart retailers using OjaTrack to plug leakages and
          track profit daily. Setup takes less than 5 minutes.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base">
            Start My Free Trial
          </span>
          <span className="rounded-lg border border-border px-8 py-2 text-sm font-semibold text-light-primary dark:text-ink-primary">
            Speak to an Expert
          </span>
        </div>
      </div>
    </section>
  );
}
