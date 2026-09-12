"use client";

import { useState } from "react";

type Cycle = "weekly" | "monthly" | "quarterly" | "half" | "yearly";

type Plan = {
  cycle: Cycle;
  label: string;
  price: string;
  per: string;
  blurb: string;
  cta: string;
  featured?: boolean;
  wide?: boolean;
};

const plans: Plan[] = [
  {
    cycle: "weekly",
    label: "Weekly",
    price: "₦3,000",
    per: "/week",
    blurb: "Great for quick tracking, pop-up markets, or trying OjaTrack.",
    cta: "Choose Plan",
  },
  {
    cycle: "monthly",
    label: "Monthly",
    price: "₦5,000",
    per: "/month",
    blurb: "Standard tier ideal for single-location retail provision stores.",
    cta: "Choose Plan",
  },
  {
    cycle: "quarterly",
    label: "3 Months",
    price: "₦12,000",
    per: "/quarter",
    blurb: "Save 20% off standard monthly rates. Built for regular traders.",
    cta: "Choose Plan",
  },
  {
    cycle: "half",
    label: "6 Months",
    price: "₦24,000",
    per: "/half-year",
    blurb:
      "Ideal for established shops with steady operations looking to avoid constant payment setups.",
    cta: "Choose 6",
    wide: true,
  },
  {
    cycle: "yearly",
    label: "Yearly (Best Value)",
    price: "₦48,000",
    per: "/year",
    blurb:
      "Full comprehensive business digitization. Includes customized agent training for staff setup.",
    cta: "Choose Yearly",
    featured: true,
    wide: true,
  },
];

const included = [
  { t: "Unlimited Products", d: "No caps on your store inventory catalog" },
  { t: "Unlimited Sales", d: "Log as many transactions as you make daily" },
  { t: "Staff Management", d: "Add sales reps & monitor activity" },
  { t: "Reports & Analytics", d: "Instant calculation of exact net profit" },
  { t: "Offline Mode", d: "Run your entire business without data" },
  { t: "Priority Support", d: "Dedicated WhatsApp & field agent help" },
];

const faqs = [
  {
    q: "Can I try before I buy?",
    a: "Absolutely. When you set up with a field agent, we configure your shop with a complimentary trial period so you can test sales logging and profit reports first.",
  },
  {
    q: "What happens when my plan expires?",
    a: "Your existing data is kept completely safe. You will simply be prompted to renew to continue logging new sales and updating inventory counts.",
  },
  {
    q: "Do I need internet connection to use OjaTrack?",
    a: "No. The OjaTrack mobile application runs fully offline. You only need network connection occasionally to back up your metrics safely to the cloud.",
  },
  {
    q: "How many staff members can I add?",
    a: "There are zero caps. You can add as many sales assistants, delivery drivers, or store partners as your retail business requires.",
  },
];

function DeadButton({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      aria-disabled="true"
      title="Coming soon"
      className={`inline-flex h-9 w-full cursor-default items-center justify-center rounded-lg text-[13px] font-bold ${
        light
          ? "bg-brand-primary text-foundation-base"
          : "border border-border text-light-primary dark:text-ink-primary"
      }`}
    >
      {children}
    </span>
  );
}

function PlanCard({ plan, highlight }: { plan: Plan; highlight: boolean }) {
  if (plan.featured) {
    return (
      <div
        className={`flex flex-col rounded-2xl border-2 bg-foundation-base p-6 text-white ${
          highlight ? "border-brand-primary shadow-[0_2px_12px_rgba(0,200,83,0.18)]" : "border-brand-primary/60"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
            {plan.label}
          </p>
          <span className="rounded-full bg-brand-primary/20 px-2 py-0.5 text-[10px] font-bold text-brand-hover">
            BEST VALUE
          </span>
        </div>
        <p className="mt-2">
          <span className="text-3xl font-extrabold">{plan.price}</span>{" "}
          <span className="text-sm text-white/60">{plan.per}</span>
        </p>
        <p className="mt-2 min-h-10 flex-1 text-[13px] leading-5 text-white/75">{plan.blurb}</p>
        <div className="mt-4">
          <DeadButton light>{plan.cta}</DeadButton>
        </div>
      </div>
    );
  }
  return (
    <div
        className={`flex flex-col rounded-2xl border bg-white p-6 transition-shadow dark:bg-foundation-secondary ${
        highlight
          ? "border-brand-primary shadow-[0_2px_12px_rgba(0,200,83,0.15)]"
          : "border-border dark:border-[#1e3a2b]"
      }`}
    >
      <p className="text-[11px] font-bold tracking-[0.14em] text-light-muted uppercase">
        {plan.label}
      </p>
      <p className="mt-2">
        <span className="text-3xl font-extrabold text-light-primary dark:text-ink-primary">
          {plan.price}
        </span>{" "}
        <span className="text-sm text-light-muted">{plan.per}</span>
      </p>
      <p className="mt-2 min-h-10 flex-1 text-[13px] leading-5 text-light-secondary">{plan.blurb}</p>
      <div className="mt-4">
        <DeadButton>{plan.cta}</DeadButton>
      </div>
    </div>
  );
}

import FaqAccordion from "./FaqAccordion";

/* Pricing page interactive island: billing toggle highlight + FAQ accordion. */
export default function PricingSections() {
  const [mode, setMode] = useState<"monthly" | "yearly">("monthly");

  const highlighted = (cycle: Cycle) =>
    mode === "monthly" ? cycle === "monthly" : cycle === "quarterly" || cycle === "half" || cycle === "yearly";

  return (
    <>
      <section className="bg-brand-deep">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
          <span className="inline-block rounded-full border border-brand-hover/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
            Predictable plans
          </span>
          <h1 className="mt-4 text-4xl font-bold text-balance text-white sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
            Choose the plan that works for your business. No hidden setup fees
            or unexpected hardware lock-ins.
          </p>
          <div
            role="group"
            aria-label="Billing period"
            className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full bg-foundation-base/80 p-1"
          >
            {(["monthly", "yearly"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-bold capitalize transition-colors ${
                  mode === m ? "bg-brand-primary text-foundation-base" : "text-white/70 hover:text-white"
                }`}
              >
                {m === "monthly" ? "Monthly Bill" : "Yearly Bill"}
              </button>
            ))}
            <span className="mr-2 rounded-full bg-brand-primary/20 px-2 py-0.5 text-[11px] font-bold text-brand-hover">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {plans.slice(0, 3).map((p) => (
            <PlanCard key={p.cycle} plan={p} highlight={highlighted(p.cycle)} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {plans.slice(3).map((p) => (
            <PlanCard key={p.cycle} plan={p} highlight={highlighted(p.cycle)} />
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-surface p-6 dark:bg-foundation-secondary">
          <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
            Included in Every Plan
          </p>
          <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((f) => (
              <li key={f.t} className="flex gap-2">
                <span aria-hidden className="font-bold text-brand-primary">✓</span>
                <span>
                  <span className="block text-[13px] font-bold text-light-primary dark:text-ink-primary">
                    {f.t}
                  </span>
                  <span className="block text-xs text-light-muted">{f.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-4xl px-6 py-14">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
            Got questions?
          </p>
          <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      <section className="bg-brand-deep">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-hover uppercase">
            Immediate deployment
          </p>
          <h2 className="mt-2 text-3xl font-bold text-balance text-white">
            Digitize Your Retail Store Today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
            Get clear, comprehensive profit metrics. Request a field agent to
            visit your store location and assist with inventory setup, or
            download directly from Google Play.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base">
              Get Started Now
            </span>
            <span className="rounded-lg border border-white/30 px-8 py-2 text-sm font-semibold text-white">
              Request Field Agent
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
