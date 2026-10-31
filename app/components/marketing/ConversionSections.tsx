import Link from "next/link";
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
    <section className="border-y border-border bg-surface-alt dark:border-[#1e3a2b]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-y divide-border sm:grid-cols-4 sm:divide-x sm:divide-y-0 dark:divide-[#1e3a2b]">
        {stats.map(([val, label]) => (
          <div key={label} className="p-6 text-center">
            <p className="text-3xl font-extrabold text-brand-deep dark:text-brand-hover">
              {val}
            </p>
            <p className="mt-1 text-xs font-semibold text-light-muted uppercase tracking-wider">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
      <blockquote className="text-xl font-medium text-light-primary italic sm:text-2xl dark:text-ink-primary">
        &ldquo;Before OjaTrack, my store was losing upwards of ₦350,000 every
        month to silent inventory leakage. Within two weeks of using the POS
        offline queue and working with our assigned field agent, our net profit
        jumped 32%.&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="font-bold text-light-primary dark:text-ink-primary">
          Chief Alhaji B. Danjuma
        </p>
        <p className="text-xs text-light-secondary">
          Managing Director, Danjuma Wholesale Provisions (Kano & Lagos)
        </p>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Starter Trader",
    desc: "For small market stores with a single cashier counter.",
    price: "₦5,000",
    per: "/month",
    features: ["1 Active Branch", "Offline-First POS Checkout", "Daily Profit Tracking", "Basic Stock Alerts"],
    featured: false,
  },
  {
    name: "Growth Merchant",
    desc: "Designed for scaling retail businesses across multiple stalls.",
    price: "₦12,000",
    per: "/month",
    features: ["Up to 3 Branches", "Unlimited Store Cashiers", "Dedicated Assigned Field Agent", "Weekly Inventory Audits", "Custom Restock Recommendations"],
    featured: true,
  },
  {
    name: "Super Market / Chain",
    desc: "Engineered for wholesale distribution and supermarket chains.",
    price: "₦30,000",
    per: "/month",
    features: ["Unlimited Warehouses", "Multi-warehouse Reconciliation", "Priority Field Agent On-Site", "Custom Barcode Hardware Integration", "Direct Bank Payment Settlement"],
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
            <Link href="/shop/register" className="mt-5 w-full">
              <Button variant={t.featured ? "primary" : "secondary"} className="w-full min-w-0 font-bold">
                Select Plan
              </Button>
            </Link>
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
          <Link href="/shop/register">
            <Button className="min-w-0 px-8 font-bold">Claim Free Trial</Button>
          </Link>
          <Link href="/contact" className="rounded-lg border border-white/30 px-8 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
            Talk to Sales Representative
          </Link>
        </div>
      </div>
    </section>
  );
}
