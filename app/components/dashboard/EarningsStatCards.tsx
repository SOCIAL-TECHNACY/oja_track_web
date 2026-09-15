import { formatNGN, type EarningsSummary } from "@/lib/agent-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export default function EarningsStatCards({
  summary,
}: {
  summary: EarningsSummary;
}) {
  return (
    <div
      aria-label="Earnings summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Total Cumulative Earned
        </p>
        <p className="mt-2 text-3xl font-bold text-brand-primary">
          {formatNGN(summary.totalCumulativeNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Since onboarding
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          This Month Earnings
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(summary.thisMonthNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          {summary.thisMonthLabel}
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Recurring Income stream
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(summary.recurringAverageNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Monthly average
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Estimated Next Month
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(summary.nextMonthEstimateNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Scheduled renewals
        </p>
      </div>
    </div>
  );
}
