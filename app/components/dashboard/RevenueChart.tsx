import { formatNGN, type MonthlyRevenue } from "@/lib/agent-dashboard";

/*
 * Static CSS bar chart — no chart library needed for six bars.
 * Values are exposed via role="img" labels so they don't rely
 * on color/height alone.
 */
export default function RevenueChart({ data }: { data: MonthlyRevenue[] }) {
  const max = Math.max(...data.map((d) => d.amountNGN));

  return (
    <section
      aria-labelledby="revenue-growth"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="revenue-growth"
          className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
        >
          Monthly Revenue Growth
        </h2>
        <p className="shrink-0 text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
          Last 6 Months (₦ &apos;000)
        </p>
      </div>

      <div className="mt-6 flex h-48 items-end gap-3 sm:h-56 sm:gap-4">
        {data.map((d) => (
          <div key={d.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              role="img"
              aria-label={`${d.month}: ${formatNGN(d.amountNGN)}`}
              title={formatNGN(d.amountNGN)}
              className="w-full max-w-12 rounded-t-md bg-brand-primary"
              style={{ height: `${Math.round((d.amountNGN / max) * 100)}%` }}
            />
            <span className="text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
              {d.month}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
