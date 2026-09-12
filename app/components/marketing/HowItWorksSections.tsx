import SectionHeading from "./SectionHeading";
import PhotoPlaceholder from "./PhotoPlaceholder";

export function HowHero() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 text-center">
        <span className="inline-block rounded-full border border-brand-hover/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-hover uppercase">
          Built for Nigerian retail
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-balance text-white sm:text-5xl">
          Track inventory, sales, and profits from anywhere.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          From setup to full business control in 5 minutes. Engineered
          specifically for busy shops in Balogun, Aba, and across Nigeria.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base">
            Set Up Your Shop Now
          </span>
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg border border-white/40 px-5 text-[13px] font-semibold text-white">
            Watch 2-Min Demo
          </span>
        </div>
        <div className="mx-auto mt-10 max-w-4xl text-left">
          <PhotoPlaceholder
            variant="dashboard"
            stat="₦1,250,890.50"
            label="Live sales visualization"
          />
        </div>
      </div>
    </section>
  );
}

const setupSteps = [
  { n: "01", t: "Easy Setup", d: "Create your shop profile in minutes. No tech skills needed — we guide you at every tap." },
  { n: "02", t: "Add Products", d: "Snap or type your stock in. Prices, quantities, and units saved instantly." },
  { n: "03", t: "Record Sales", d: "Log cash, transfer, card, or credit sales in seconds at the counter." },
  { n: "04", t: "Track Everything", d: "Inventory counts and profit update automatically in the background." },
  { n: "05", t: "Works Offline", d: "No network? Everything keeps working and syncs when you're back online." },
];

export function SetupStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 text-center">
      <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
        The 5-minute setup
      </p>
      <h2 className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
        Simple as sending a WhatsApp message
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-light-secondary">
        No complex computers or heavy accounting training required. Built to be
        fast, light, and reliable.
      </p>
      <ol className="mt-8 grid gap-4 text-left sm:grid-cols-3 lg:grid-cols-5">
        {setupSteps.map((s) => (
          <li key={s.n} className="rounded-2xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-sm font-extrabold text-brand-primary">{s.n}</p>
            <p className="mt-1 text-sm font-bold text-light-primary dark:text-ink-primary">{s.t}</p>
            <p className="mt-1 text-xs leading-5 text-light-secondary">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

type Feature = {
  overline: string;
  title: string;
  body: string;
  bullets: string[];
  visual: "aisle" | "storefront" | "dashboard";
};

const features: Feature[] = [
  {
    overline: "Inventory control",
    title: "Zero-stress stock management",
    body: "Stop counting inventory manually after a long day at the market. Know exactly what is on your shelves in one glance.",
    bullets: [
      "Low-stock alerts before popular items run out completely",
      "Batch uploads from Excel or WhatsApp lists",
      "Expiring-items tracker to prevent losses",
    ],
    visual: "aisle",
  },
  {
    overline: "Smart sales",
    title: "Speed up your checkout counter",
    body: "Serve each customer faster during rush hour without losing track of a single kobo.",
    bullets: [
      "WhatsApp receipts for every sale",
      "Debt & credit log with reminders",
      "Multi-payment support: cash, transfer, POS",
    ],
    visual: "storefront",
  },
  {
    overline: "Accurate profits",
    title: "See your real profit, not just revenue",
    body: "OjaTrack calculates your exact cost of goods sold (COGS) so you know if your business is genuinely growing.",
    bullets: [
      "Real margin calculator on every sale",
      "Expense ledger for transport and bills",
      "Weekly payout forecast from trends",
    ],
    visual: "dashboard",
  },
  {
    overline: "Staff control",
    title: "Manage your shop assistants remotely",
    body: "Reduce stock shortage and staff fraud. Track attendant sales from your own house or on the go.",
    bullets: [
      "Unique staff PINs for every attendant",
      "Restricted permissions per role",
      "Shift handovers with cash reconciliation",
    ],
    visual: "storefront",
  },
  {
    overline: "Business reports",
    title: "Understand your business like a pro",
    body: "Get detailed, easy-to-read reports delivered directly to your email and WhatsApp.",
    bullets: [
      "Fastest-moving items ranking",
      "Daily summary digest of profit and stock",
      "Tax & audit-ready exports",
    ],
    visual: "dashboard",
  },
];

export function FeatureSplits() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-16 px-6 py-6">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "[&>*:first-child]:md:order-2" : ""}`}
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-deep uppercase dark:text-brand-hover">
              {f.overline}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-light-primary dark:text-ink-primary">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-light-secondary">{f.body}</p>
            <ul className="mt-4 space-y-2">
              {f.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-light-secondary">
                  <span aria-hidden className="mt-0.5 font-bold text-brand-primary">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <PhotoPlaceholder variant={f.visual} />
        </div>
      ))}
    </section>
  );
}

const quotes = [
  {
    q: "Since I started using OjaTrack for my pharmacy, I track every drug sale. I see all sales on my phone from anywhere.",
    n: "Chidi K.",
    r: "XYZ Supermarket — Yaba, Lagos",
  },
  {
    q: "Before, we spent hours counting boutique stock manually. Now the barcode scanner on OjaTrack does everything in 5 minutes. Best app in Nigeria.",
    n: "Mrs. Toyin A.",
    r: "Toyin Foods — Balogun Market",
  },
  {
    q: "Even when network goes off in Aba, OjaTrack still operates offline. All my records sync back, nothing missing. Pure magic.",
    n: "Obinna N.",
    r: "Electronics Hub — Aba",
  },
];

export function HowTestimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="Merchant love"
        title="Trusted by 10,000+ Nigerian merchants"
      />
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-light-secondary">
        Real business owners are using OjaTrack to stop silent losses, prevent
        theft, and scale their businesses.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quotes.map((t) => (
          <figure key={t.n} className="flex flex-col rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <blockquote className="flex-1 text-[13px] leading-6 text-light-primary dark:text-ink-primary">
              “{t.q}”
            </blockquote>
            <figcaption className="mt-4">
              <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">
                {t.n}
              </span>
              <span className="block text-xs text-light-muted">{t.r}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function HowCta() {
  return (
    <section className="bg-brand-deep">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-balance text-white">
          Ready to take full control of your shop?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          Join thousands of smart retailers using OjaTrack to reduce leakages,
          track inventory, and accurately measure profit today.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base">
            Get Started For Free
          </span>
          <span className="rounded-lg border border-white/30 px-8 py-2 text-sm font-semibold text-white">
            Talk to a Retail Expert
          </span>
        </div>
        <p className="mt-4 text-xs text-white/60">
          No upfront payment. Setup in under 5 minutes.
        </p>
      </div>
    </section>
  );
}
