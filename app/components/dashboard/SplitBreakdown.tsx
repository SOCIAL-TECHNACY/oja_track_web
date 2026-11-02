import type { EarningSplit } from "@/lib/agent-dashboard";

export default function SplitBreakdown({ splits }: { splits: EarningSplit[] }) {
  return (
    <section
      aria-labelledby="split-breakdown"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="split-breakdown"
        className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
      >
        Split Breakdown
      </h2>

      {splits.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-8 text-center dark:border-[#1e3a2b]">
          <p className="text-sm text-light-secondary dark:text-ink-secondary">
            No commission split data recorded yet.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {splits.map((s) => (
            <div key={s.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <p className="text-light-secondary dark:text-ink-secondary">
                  {s.label}
                </p>
                <p className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {s.percent}%
                </p>
              </div>
              <div
                role="progressbar"
                aria-label={s.label}
                aria-valuenow={s.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface dark:bg-foundation-elevated"
              >
                <div
                  className={`h-full rounded-full ${s.barClass}`}
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
