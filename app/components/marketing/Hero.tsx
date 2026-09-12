import Button from "../ui/Button";

/* CSS-only dashboard mockup mirroring the hero specimen. */
function DashboardMockup() {
  const bars = [38, 55, 42, 68, 58, 82, 100];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_64px_rgba(7,16,12,0.12)] dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <div className="grid gap-px bg-border sm:grid-cols-3 dark:bg-[#1e3a2b]">
        {[
          { k: "Shop Operations", v: "₦420,500.00" },
          { k: "Active & Connected", v: "1,452 Items" },
          { k: "Agent Assigned", v: "100% Verified" },
        ].map((s) => (
          <div key={s.k} className="bg-white p-4 dark:bg-foundation-secondary">
            <p className="text-[11px] font-semibold text-light-muted">{s.k}</p>
            <p className="mt-1 text-lg font-bold text-brand-deep dark:text-brand-hover">
              {s.v}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl bg-surface p-4">
          <p className="text-xs font-bold text-light-primary dark:text-ink-primary">
            Weekly Sales Summary
          </p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-brand-primary" : "bg-brand-deep/80 dark:bg-brand-primary/40"}`}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <p className="text-xs font-bold text-light-primary dark:text-ink-primary">
            Quick Actions
          </p>
          <ul className="mt-3 space-y-2 text-[13px] text-light-secondary">
            {["Verify Daily Ledger", "Add Custom Reorder", "Request Agent Visit"].map((a) => (
              <li key={a} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-foundation-elevated">
                {a}
                <span aria-hidden className="text-light-muted">›</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const markets = [
  "Adedoyin Market",
  "Balogun Market",
  "Computer Village",
  "Ariaria Int'l",
  "Kano Farmers",
];

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-primary/10 to-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold text-balance text-light-primary sm:text-5xl dark:text-ink-primary">
          The operating system for Nigerian retail.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-light-secondary">
          OjaTrack helps you eliminate inventory leaks, reconcile offline sales
          in real time, and scale profit. Managed by a dedicated network of
          verified field agents.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button className="min-w-0 px-8">Get Started Free</Button>
          <Button variant="secondary" className="min-w-0 px-8">
            Watch Demo
          </Button>
        </div>
        <div className="mx-auto mt-10 max-w-4xl text-left">
          <DashboardMockup />
        </div>
        <p className="mt-8 text-[11px] font-bold tracking-[0.18em] text-light-muted uppercase">
          Trusted by 2,000+ merchants across Nigeria&apos;s biggest markets
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {markets.map((m) => (
            <li key={m} className="text-sm font-semibold text-light-muted">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
