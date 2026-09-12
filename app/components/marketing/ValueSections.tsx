import SectionHeading from "./SectionHeading";

function Card({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-base">
        {icon}
      </span>
      <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
        {title}
      </p>
      <p className="mt-1 text-[13px] leading-5 text-light-secondary">{body}</p>
    </div>
  );
}

export function PainPoints() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeading
        overline="The quiet crisis"
        title="Why traditional retail in Nigeria struggles to scale."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          icon="◉"
          title="Invisible Leakage"
          body="Silent losses from unbilled sales, freebies, and shrinkage eat revenue. Without real-time records, the money disappears unnoticed."
        />
        <Card
          icon="✎"
          title="Manual Bookkeeping Errors"
          body="Paper ledgers and mental math invite computational errors and stock mismatching during long hours."
        />
        <Card
          icon="⚠"
          title="Stock Discrepancies"
          body="What the shelf says and what the books say rarely agree, while overstocking blocks valuable capital that should be circulating."
        />
      </div>
    </section>
  );
}

const features = [
  {
    icon: "◈",
    title: "Real-time Tracking",
    body: "Log any sale, manage ledger entries, and watch profit from your phone.",
  },
  {
    icon: "▣",
    title: "Smart Inventory",
    body: "Automatic count updates with quick reorder alerts before you run out, on your mobile dashboard.",
  },
  {
    icon: "₦",
    title: "Daily Profit Reports",
    body: "Plain-English first-profit briefs delivered straight to WhatsApp every evening.",
  },
  {
    icon: "✦",
    title: "Agent Network",
    body: "Verified field agents visit your shop weekly to reconcile and train your staff.",
  },
];

export function Features() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <SectionHeading
          overline="Our platform: complete visibility"
          title="The robust features modern merchants deserve."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
            >
              <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-base font-bold text-brand-deep dark:text-brand-hover">
                {f.icon}
              </span>
              <p className="mt-3 text-[15px] font-bold text-light-primary dark:text-ink-primary">
                {f.title}
              </p>
              <p className="mt-1 text-[13px] leading-5 text-light-secondary">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
