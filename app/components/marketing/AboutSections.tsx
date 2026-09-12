const crisisBullets = [
  "Unreconciled ledger entries leading to massive daily loss",
  "Zero trace on agent earnings and physical stock movement",
];

const blueprintBullets = [
  "Automated end-of-day reports pushed instantly to owners",
  "Agent tracking with verified commission ledgers",
];

export function AboutHero() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <span className="inline-block rounded-full bg-brand-primary/20 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
          Built for Nigerian retailers
        </span>
        <h1 className="mt-4 text-4xl font-bold text-balance text-white sm:text-5xl">
          Stewardship and clarity for Africa&apos;s most resilient markets
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75">
          Our mission is simple: to plug the silent leakages in Nigerian
          retail. We empower shop owners and agents across the nation with
          transparent, secure, and instant ledger tools that turn daily
          operations into structured growth.
        </p>
      </div>
    </section>
  );
}

export function CrisisBlueprint() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <h2 className="text-2xl font-bold text-light-primary dark:text-ink-primary">
            The Leakage Crisis
          </h2>
          <p className="mt-3 text-sm leading-6 text-light-secondary">
            In thousands of shops from Alaba to Sabon Gari, manual bookkeeping
            is failing. Inventory vanishes without explanation, ledgers are
            prone to error, and shop owners suffer from quiet, constant revenue
            leakage. Without real-time visibility, trust breaks down between
            owners, managers, and agents.
          </p>
          <ul className="mt-4 space-y-2">
            {crisisBullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] font-medium text-light-primary dark:text-ink-primary">
                <span aria-hidden className="font-bold text-danger">✕</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden className="hidden w-px bg-border md:block" />
        <div>
          <h2 className="text-2xl font-bold text-brand-deep dark:text-brand-hover">
            The OjaTrack Blueprint
          </h2>
          <p className="mt-3 text-sm leading-6 text-light-secondary">
            We built a localized digital ecosystem designed for
            low-connectivity and rapid scale. By combining an offline-first
            Agent logging architecture with an interactive Shop Owner
            dashboard, we create a bulletproof cycle of proof. Real-time
            updates, clear auditing, and complete operational transparency.
          </p>
          <ul className="mt-4 space-y-2">
            {blueprintBullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] font-medium text-light-primary dark:text-ink-primary">
                <span aria-hidden className="font-bold text-brand-primary">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const stats: Array<[string, string]> = [
  ["2,000+", "Verified Agents"],
  ["10,000+", "Active Shops Managed"],
  ["36 States", "National Coverage"],
  ["₦500M+", "Monthly Sales Tracked"],
];

export function AboutStats() {
  return (
    <section className="border-y border-border">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-6 py-10 text-center md:grid-cols-4">
        {stats.map(([v, k]) => (
          <div key={k}>
            <dd className="text-3xl font-extrabold text-brand-primary">{v}</dd>
            <dt className="mt-1 text-[13px] text-light-muted">{k}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

const values = [
  {
    icon: "◈",
    title: "Transparency",
    body: "No hidden math. Every ledger entry is immutable, timestamped, and instantly queryable.",
  },
  {
    icon: "◉",
    title: "Reliability",
    body: "Engineered for offline-first logging. We perform flawlessly even in low bandwidth corridors.",
  },
  {
    icon: "✦",
    title: "Simplicity",
    body: "Zero complex jargon. Our platforms are designed for instant adoption by local agents and shop staff.",
  },
  {
    icon: "⊕",
    title: "Scale",
    body: "Designed to support your expansion from a single stall to multi-branch enterprises across West Africa.",
  },
];

export function AboutValues() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <p className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
        Our foundation
      </p>
      <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
        Values we live by daily
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/40 text-base text-brand-deep dark:text-brand-hover">
              {v.icon}
            </span>
            <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
              {v.title}
            </p>
            <p className="mt-1 text-[13px] leading-5 text-light-secondary">{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const team = [
  {
    initials: "CE",
    name: "Chidi Egwu",
    role: "Chief Executive Officer",
    bio: "Former scaling lead at Paystack. Chidi spent a decade studying informal retail systems across Lagos state before establishing OjaTrack.",
  },
  {
    initials: "AO",
    name: "Amara Okafor",
    role: "Chief Technology Officer",
    bio: "Systems architect. Built offline-first transactional ledgers for agricultural supply chains. Passionate about highly resilient data systems.",
  },
  {
    initials: "TB",
    name: "Tunde Balogun",
    role: "Chief Operations Officer",
    bio: "Operations veteran. Managed complex retail distributor networks across Northern and Western Nigeria for multi-national consumer brands.",
  },
  {
    initials: "FB",
    name: "Fatima Bello",
    role: "Head of Growth",
    bio: "Growth and field expert. Orchestrated localized dealer networks in 12 states. Believes local agents are the ultimate key to retail trust.",
  },
];

export function AboutTeam() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <p className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
        The pioneers
      </p>
      <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
        The minds steering OjaTrack
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <article key={m.name} className="rounded-2xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <div aria-hidden className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-[#0e5a3c] text-3xl font-extrabold text-white">
              {m.initials}
            </div>
            <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
              {m.name}
            </p>
            <p className="text-[11px] font-bold tracking-[0.08em] text-brand-primary uppercase">
              {m.role}
            </p>
            <p className="mt-1 text-[13px] leading-5 text-light-secondary">{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-balance text-light-primary dark:text-ink-primary">
          Ready to plug your retail leakages?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-light-secondary">
          Join thousands of smart shop owners and certified agents. Our
          operations team is ready to set up your store and transition your
          legacy ledgers within 48 hours.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base">
            Get Started for Free
          </span>
          <span className="rounded-lg border border-border px-8 py-2 text-sm font-semibold text-light-primary dark:text-ink-primary">
            Talk to our Experts
          </span>
        </div>
      </div>
    </section>
  );
}
