import Button from "../ui/Button";
import SectionHeading from "./SectionHeading";
import PhotoPlaceholder from "./PhotoPlaceholder";

function DeadPrimary({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base opacity-90">
      {children}
    </span>
  );
}

export function AgentHero() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-brand-hover/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
            Now recruiting across Nigeria
          </span>
          <h1 className="mt-4 text-4xl font-bold text-balance text-white sm:text-5xl">
            Earn Real Income Helping Nigerian Businesses Grow
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-6 text-white/80">
            Become an OjaTrack Certified Field Agent. Introduce local retail
            shop owners to the easiest sales &amp; inventory tracking app, help
            them digitize their operations, and earn generous commissions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <DeadPrimary>Apply Now</DeadPrimary>
            <span className="inline-flex h-9 cursor-default items-center justify-center gap-2 rounded-lg border border-white/40 px-5 text-[13px] font-semibold text-white">
              <span aria-hidden>◍</span> Chat on WhatsApp
            </span>
          </div>
        </div>
        <PhotoPlaceholder variant="storefront" stat="₦150,000" label="Illustrative monthly earnings" />
      </div>
    </section>
  );
}

export function AgentMission() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2">
      <PhotoPlaceholder variant="aisle" stat="2,000+" label="Shops digitized by agents" />
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          The mission
        </p>
        <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          What is OjaTrack?
        </h2>
        <p className="mt-3 text-sm leading-6 text-light-secondary">
          OjaTrack is a specialized, easy-to-use mobile bookkeeping and
          inventory platform designed specifically for Nigerian micro and small
          merchants. Shop owners can seamlessly track stock counts, record raw
          cash POS sales, monitor what “sales boys” or staff are doing, and
          instantly see their daily, weekly, and monthly profits — even entirely
          offline.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { t: "Offline Tracker", d: "No internet needed for daily store bookkeeping." },
            { t: "Staff Audit", d: "Keep track of sales rep activity & prevent theft." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
              <p className="text-sm font-bold text-light-primary dark:text-ink-primary">{f.t}</p>
              <p className="mt-1 text-[13px] text-light-secondary">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pains = [
  {
    title: "Revenue Leakage & Theft",
    body: "Sales go unrecorded and raw cash disappears from registers when owners aren't looking. You introduce a tool that forces full accountability.",
  },
  {
    title: "Stock & Inventory Loss",
    body: "Merchants have no idea which items are missing or expired without heavy manual audits. You show them automated low-stock warnings.",
  },
  {
    title: "Zero Profit Clarity",
    body: "At the end of the month, retailers can't calculate net profit due to paper ledger errors. You give them a clear automated dashboard.",
  },
];

export function AgentPain() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="The urgent need"
        title="The Pain Points You Help Shop Owners Solve"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pains.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-base font-bold text-brand-deep dark:text-brand-hover">
              ◉
            </span>
            <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
              {p.title}
            </p>
            <p className="mt-1 text-[13px] leading-5 text-light-secondary">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const roleSteps = [
  {
    n: "01",
    title: "Visit Local Retailers",
    body: "Step into provision stores, supermarkets, pharmacies, or wholesalers in your local market area.",
  },
  {
    n: "02",
    title: "Demonstrate OjaTrack",
    body: "Show them the app on your phone. Let them see how they can record a sale and track profit in just 30 seconds.",
  },
  {
    n: "03",
    title: "5-Minute Easy Setup",
    body: "Download the app on their Android phone, add their first 5 high-selling products, and help them get comfortable.",
  },
  {
    n: "04",
    title: "Keep Earning Monthly",
    body: "Train them on adding staff and recording sales. You get paid high commissions on signup and every subscription renewal.",
  },
];

export function AgentRole() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
            Your Daily Role as an OjaTrack Field Agent
          </h2>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleSteps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
              <p className="text-lg font-extrabold text-brand-primary">{s.n}</p>
              <p className="mt-2 text-[15px] font-bold text-light-primary dark:text-ink-primary">
                {s.title}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-light-secondary">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AgentEarnings() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="Highly rewarding compensation"
        title="How You Earn as an OjaTrack Agent"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand-primary uppercase">
              Instant income
            </p>
            <p className="mt-1 text-2xl font-extrabold text-light-primary dark:text-ink-primary">
              40% Upfront
            </p>
            <p className="mt-1 text-[13px] text-light-secondary">
              Earn 40% of the very first subscription payment made by a store
              owner you onboard onto OjaTrack. Paid out weekly.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand-primary uppercase">
              Passive income
            </p>
            <p className="mt-1 text-2xl font-extrabold text-light-primary dark:text-ink-primary">
              20% Recurring
            </p>
            <p className="mt-1 text-[13px] text-light-secondary">
              Earn 20% recurring commission on all subscription renewals made by
              your onboarded shops month after month.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
          <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
            Earnings Calculator Example
          </p>
          <p className="mt-1 text-xs text-light-muted">
            Onboarding and retaining just 50 active shops on a standard monthly plan:
          </p>
          <dl className="mt-4 space-y-2 text-[13px]">
            {[
              ["Active Onboarded Shops", "50 Shops"],
              ["Monthly Standard Subscription", "₦6,000 / shop"],
              ["40% Upfront Setup Commission", "₦2,000 per shop (₦100,000 / total)"],
              ["20% Monthly Recurring Commission", "₦1,000 per shop (₦50,000 / month)"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 border-b border-border pb-2">
                <dt className="text-light-secondary">{k}</dt>
                <dd className="text-right font-semibold text-light-primary dark:text-ink-primary">{v}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 rounded-xl bg-brand-primary/10 px-3 py-2.5">
              <dt className="font-bold text-light-primary dark:text-ink-primary">
                Total Illustrative Income
              </dt>
              <dd className="font-extrabold text-brand-deep dark:text-brand-hover">₦150,000</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] text-light-muted">
            *Example — actual earnings depend on performance, area coverage, and local conversion rate.
          </p>
        </div>
      </div>
    </section>
  );
}

const perks = [
  "Comprehensive Training",
  "Digital Agent Sales Kit",
  "Official Field ID Card",
  "High-Quality Flyers",
  "Field Selling Script",
  "Personalized Agent Dashboard",
  "Weekly Direct Bank Payouts",
  "WhatsApp Support Group",
];

export function AgentSupport() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          Agent support
        </p>
        <h2 className="mt-2 max-w-xl text-3xl font-bold text-light-primary dark:text-ink-primary">
          What OjaTrack Provides You For Success
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-[13px] font-semibold text-light-primary dark:bg-foundation-secondary dark:border-[#1e3a2b] dark:text-ink-primary">
              <span aria-hidden className="font-bold text-brand-primary">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const audiences = [
  {
    t: "Students & Corps Members (NYSC)",
    d: "Earn a high income alongside your studies or primary assignment.",
  },
  {
    t: "Traders & Existing POS Agents",
    d: "Leverage your footprint in the local market to cross-sell OjaTrack.",
  },
  {
    t: "Field Sales Representatives",
    d: "Already meeting retailers? Add OjaTrack to maximize your commission portfolio.",
  },
];

const requirements = [
  "An Android Smartphone (v7.0 or higher)",
  "Active internet connection / data plan",
  "Willingness to visit local physical retail markets",
  "Strong communication skills & professional behavior",
];

export function AgentFit() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          Candidate profile
        </p>
        <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          Who Fits Perfectly as an OjaTrack Agent?
        </h2>
        <p className="mt-2 text-sm text-light-secondary">
          You don&apos;t need a formal accounting degree. We look for proactive,
          self-motivated people who enjoy talking to business owners.
        </p>
        <ul className="mt-5 space-y-4">
          {audiences.map((a) => (
            <li key={a.t} className="flex gap-3">
              <span aria-hidden className="mt-0.5 font-bold text-brand-primary">✓</span>
              <span>
                <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">
                  {a.t}
                </span>
                <span className="block text-[13px] text-light-secondary">{a.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
          Basic Requirements
        </p>
        <ol className="mt-4 space-y-3">
          {requirements.map((r, i) => (
            <li key={r} className="flex items-center gap-3 text-[13px] text-light-secondary">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-[11px] font-extrabold text-brand-deep dark:text-brand-hover">
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

export function AgentCta() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-hover uppercase">
          Start your journey today
        </p>
        <h2 className="mt-2 text-3xl font-bold text-balance text-white">
          Apply Now &amp; Get Certified In 24 Hours
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          Join our next cohort of market agents. Complete the quick assessment
          on WhatsApp, receive your physical ID Card, and start earning
          commission immediately.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button className="min-w-0 px-8">Start WhatsApp Application</Button>
          <span className="rounded-lg border border-white/30 px-8 py-2 text-sm font-semibold text-white">
            Fill Web Form
          </span>
        </div>
      </div>
    </section>
  );
}
