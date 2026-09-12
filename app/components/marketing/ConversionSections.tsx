import Button from "../ui/Button";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    n: "1",
    title: "Claim Your Shop Profile",
    body: "Sign up in 2 minutes. Enter your location, snap your inventory dashboard to customize your OjaTrack dashboard.",
  },
  {
    n: "2",
    title: "Agent Deployment",
    body: "A certified OjaTrack field agent visits your store to verify your current inventory and train your employees.",
  },
  {
    n: "3",
    title: "Start Scaling Profits",
    body: "Track sales automatically. Receive weekly audits, profit insights, and restock reports directly on your mobile phone.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-14">
      <SectionHeading
        overline="Seamless deployment"
        title="3 steps to complete store transformation."
      />
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-extrabold text-foundation-base">
              {s.n}
            </span>
            <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
              {s.title}
            </p>
            <p className="mt-1 text-[13px] leading-5 text-light-secondary">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const stats: Array<[string, string]> = [
  ["₦24B+", "Sales Tracked"],
  ["14,000+", "Active Shops"],
  ["98.4%", "System Uptime"],
  ["36", "States Covered"],
];

export function StatsBand() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-hover uppercase">
          Independently verified coverage
        </p>
        <h2 className="mx-auto mt-2 max-w-xl text-3xl font-bold text-balance text-white">
          The trusted ledger of Nigerian commerce.
        </h2>
        <dl className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(([v, k]) => (
            <div key={k}>
              <dt className="order-2 mt-1 block text-[13px] text-white/70">{k}</dt>
              <dd className="order-1 text-3xl font-extrabold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="Merchant stories"
        title="Endorsed by leading Nigerian business owners."
      />
      <figure className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-white p-6 text-center dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <blockquote className="text-[15px] leading-7 text-light-primary dark:text-ink-primary">
          “OjaTrack literally saved my business. Tunde, our assigned certified
          agent, helped upload over 300 cosmetic lines. Now I see exactly where
          money is happening, and our revenue has jumped by 30% in three
          months.”
        </blockquote>
        <figcaption className="mt-4 flex items-center justify-center gap-3">
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-deep text-xs font-bold text-white">
            CN
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">
              Mrs. Chioma Nwachukwu
            </span>
            <span className="block text-xs text-light-muted">
              CEO, Cosmetics, Balogun Market
            </span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

const tiers = [
  {
    name: "Starter",
    desc: "For single-counter kiosks & small retail shops.",
    price: "₦15,000",
    per: "/month",
    features: ["Daily User Seat", "Offline Ledger Sync", "Certified Agent Visit Assistance", "Monthly Inventory Audit"],
    featured: false,
  },
  {
    name: "Growth",
    desc: "For growing retail outlets with high volume.",
    price: "₦35,000",
    per: "/month",
    features: ["Real-time P&L Reporting", "Smart Reorder Alerts", "Dedicated Success Manager", "Custom Inventory API Routing"],
    featured: true,
  },
  {
    name: "Enterprise",
    desc: "Engineered for multi-branch wholesale and chains.",
    price: "Custom",
    per: "",
    features: ["Unlimited Seats", "Multi-warehouse Reconciliation", "Dedicated Onboarding Manager", "Custom API Integrations"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-14">
      <SectionHeading
        overline="Simple & predictable"
        title="Flexible pricing to support your scale."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              t.featured
                ? "border-brand-primary bg-brand-primary/5 shadow-[0_2px_12px_rgba(0,200,83,0.15)]"
                : "border-border bg-white dark:bg-foundation-secondary dark:border-[#1e3a2b]"
            }`}
          >
            <p className="text-sm font-bold text-light-primary dark:text-ink-primary">{t.name}</p>
            <p className="mt-1 min-h-10 text-[13px] text-light-secondary">{t.desc}</p>
            <p className="mt-3">
              <span className="text-3xl font-extrabold text-light-primary dark:text-ink-primary">
                {t.price}
              </span>
              {t.per && <span className="text-sm text-light-muted">{t.per}</span>}
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-light-secondary">
                  <span aria-hidden className="font-bold text-brand-primary">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={t.featured ? "primary" : "secondary"} className="mt-5 w-full min-w-0">
              Select Plan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-balance text-white">
          Ready to stop losing money to silent retail leakage?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          Claim your shop profile today and get matched with a certified field
          agent in your local area.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button className="min-w-0 px-8">Claim Free Trial</Button>
          <span className="rounded-lg border border-white/30 px-8 py-2 text-sm font-semibold text-white">
            Talk to Sales Representative
          </span>
        </div>
      </div>
    </section>
  );
}
