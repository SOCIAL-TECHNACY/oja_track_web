import {
  formatNGN,
  getRenewalUrgency,
  type RenewalItem,
} from "@/lib/agent-dashboard";

function DaysLeftPill({ daysLeft }: { daysLeft: number }) {
  const urgency = getRenewalUrgency(daysLeft);
  const cls =
    urgency === "critical"
      ? "bg-danger/10 text-danger dark:bg-danger/15"
      : "bg-[#fdf0d0] text-[#8a5a00] dark:bg-warning/15 dark:text-warning";
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${cls}`}
    >
      {daysLeft} Days Left
    </span>
  );
}

export default function CriticalRenewals({
  items,
}: {
  items: RenewalItem[];
}) {
  return (
    <section
      aria-labelledby="critical-renewals"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="critical-renewals"
        className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
      >
        Critical Renewals
      </h2>

      {items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-6 text-center dark:border-[#1e3a2b]">
          <p className="text-sm font-medium text-light-secondary dark:text-ink-secondary">
            No urgent renewals pending.
          </p>
          <p className="mt-1 text-xs text-light-secondary/70 dark:text-ink-secondary/70">
            Shops nearing subscription expiry will be highlighted here.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border p-4 dark:border-[#1e3a2b]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-bold text-light-primary sm:text-[15px] dark:text-ink-primary">
                  {item.shopName}
                </p>
                <DaysLeftPill daysLeft={item.daysLeft} />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <p className="text-light-secondary dark:text-ink-secondary">
                  Worth: {formatNGN(item.worthNGN)}
                </p>
                <p className="font-bold whitespace-nowrap text-light-primary tabular-nums dark:text-ink-primary">
                  Comm: {formatNGN(item.commissionNGN)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
