import Badge from "../ui/Badge";

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

function Split({
  overline,
  title,
  body,
  bullets,
  children,
  flip = false,
}: {
  overline: string;
  title: string;
  body: string;
  bullets: string[];
  children: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className={`grid items-center gap-8 md:grid-cols-2 ${flip ? "[&>*:first-child]:md:order-2" : ""}`}>
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
          {overline}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-light-primary dark:text-ink-primary">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-light-secondary">{body}</p>
        <Bullets items={bullets} />
      </div>
      <div>{children}</div>
    </div>
  );
}

/* Phone mockup for the offline section. */
function PhoneMockup() {
  const rows = [
    ["Indomie Hungry Man ( carton )", "₦12,400"],
    ["Golden Penny Flour", "₦48,000"],
    ["Milo Refill 800g", "₦9,300"],
  ];
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[28px] border border-border bg-foundation-base p-3 shadow-[0_24px_64px_rgba(7,16,12,0.25)]">
      <div className="rounded-[20px] bg-foundation-elevated p-4">
        <p className="text-[11px] text-ink-secondary">Today&apos;s Sales</p>
        <p className="text-2xl font-bold text-white">₦184,300</p>
        <span className="mt-1 inline-block rounded-full bg-brand-primary/20 px-2 py-0.5 text-[10px] font-bold text-brand-hover">
          Synced
        </span>
        <ul className="mt-3 space-y-2">
          {rows.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[11px]">
              <span className="text-ink-secondary">{k}</span>
              <span className="font-bold text-white">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const trackerRows: Array<{ name: string; status: "active" | "expiring" | "pending" | "processing" | "expired"; note: string }> = [
  { name: "Executive Office Chairs", status: "expired", note: "Critical" },
  { name: "Heavy Duty Generator 5.5kVA", status: "expired", note: "Critical" },
  { name: "Super Premium Hair Polish", status: "expiring", note: "Low Stock" },
  { name: "Ankara Aso-Ebi Lace", status: "active", note: "Healthy" },
];

export function ProductSections() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-16 px-6 py-14">
      <Split
        overline="Offline-first technology"
        title="Track every sale, even when the network drops."
        body="No internet? No problem. OjaTrack stores all transaction logs safely on your device. Shop network blackouts are automatically backed up to the cloud instantly."
        bullets={[
          "Works fully offline with on-device ledger",
          "Instant synchronisation upon signal recovery",
          "Zero battery-draining impact",
        ]}
      >
        <PhoneMockup />
      </Split>

      <Split
        flip
        overline="Automated stock worth"
        title="Know your inventory value in real time."
        body="Never guess what is in your store or warehouse. We categorise your products dynamically, showing total stock value and warning you when unusual inventory gets low."
        bullets={[
          "Real-time valuation of total store assets",
          "Automatic low-stock warnings",
          "Direct restock SMS / WhatsApp notifications",
        ]}
      >
        <div className="rounded-2xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
              Active Inventory Tracker
            </p>
            <span className="text-[11px] text-light-muted">Updated 2m ago</span>
          </div>
          <ul className="mt-3 space-y-2">
            {trackerRows.map((r) => (
              <li key={r.name} className="flex items-center justify-between rounded-xl bg-surface px-3 py-2.5 dark:bg-foundation-elevated">
                <span>
                  <span className="block text-[13px] font-semibold text-light-primary dark:text-ink-primary">
                    {r.name}
                  </span>
                  <span className="block text-[11px] text-light-muted">{r.note}</span>
                </span>
                <Badge status={r.status}>{r.note}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Split>

      <Split
        overline="Financial integrity"
        title="Get plain English and Naira profit reports."
        body="OjaTrack translates complex accounting data into a simple daily report on your phone. Daily P&L summaries show what you earned after accounting for cost of goods, taxes, and operations."
        bullets={[
          "Daily P&L summaries direct to WhatsApp",
          "Simple metrics anyone on your team can grasp",
          "Download tax-ready PDF reports anytime",
        ]}
      >
        <div className="rounded-2xl bg-brand-deep p-5 text-white">
          <p className="text-[11px] font-semibold text-white/70">Today&apos;s P&L</p>
          <p className="mt-1 text-2xl font-bold">₦96,200.00 Net Profit</p>
          {[
            ["Cost of Turnover", "₦420,500.00"],
            ["Gross Earnings", "₦516,700.00"],
            ["Operating Expenses", "₦24,300.00"],
          ].map(([k, v]) => (
            <div key={k} className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[13px]">
              <span className="text-white/70">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
          <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[11px] text-white/80">
            Margin held steady at 18.6% — top 20% of shops in your category.
          </p>
        </div>
      </Split>
    </section>
  );
}
