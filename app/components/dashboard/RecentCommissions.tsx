import Link from "next/link";
import {
  formatCommissionDate,
  formatNGN,
  type CommissionItem,
} from "@/lib/agent-dashboard";

function TypePill({ type }: { type: CommissionItem["type"] }) {
  const cls =
    type === "First Sale"
      ? "bg-[#e6f4ea] text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover"
      : "bg-[#fdf0d0] text-[#8a5a00] dark:bg-warning/15 dark:text-warning";
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${cls}`}
    >
      {type}
    </span>
  );
}

export default function RecentCommissions({
  items,
}: {
  items: CommissionItem[];
}) {
  return (
    <section
      aria-labelledby="recent-commissions"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-commissions"
          className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
        >
          Recent Commission Income
        </h2>
        <Link
          href="/dashboard/agent/earnings"
          className="rounded text-sm font-semibold text-brand-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 dark:border-[#1e3a2b]"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-light-primary sm:text-[15px] dark:text-ink-primary">
                {item.shopName}
              </p>
              <p className="mt-0.5 text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
                {formatCommissionDate(item.dateISO)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <TypePill type={item.type} />
              <p className="text-sm font-bold whitespace-nowrap text-light-primary tabular-nums sm:text-base dark:text-ink-primary">
                {formatNGN(item.amountNGN)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
