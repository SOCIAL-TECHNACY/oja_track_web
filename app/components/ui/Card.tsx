import Badge from "./Badge";
import Button from "./Button";

/*
 * Figma: section-cards (10:3893) — 328px, radius 16, white.
 * Three patterns: metric, data (record), action.
 */
const shell =
  "w-full max-w-[328px] rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export function MetricCard() {
  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-light-secondary">
          Weekly Fleet Earnings
        </p>
        <span aria-hidden className="text-brand-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 12.5 6 8.5l3 3 5-6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <p className="mt-3 text-[32px] leading-none font-bold text-light-primary dark:text-ink-primary">
        $12,845.00
      </p>
      <p className="mt-2 text-xs">
        <span className="font-semibold text-brand-primary">+14.2%</span>{" "}
        <span className="text-light-muted">vs last week</span>
      </p>
    </div>
  );
}

export function DataCard() {
  const rows: Array<[string, string]> = [
    ["Route Operator", "Chinedu Okafor"],
    ["Active Deliveries", "14 Transits"],
    ["Average Dispatch Time", "18 mins"],
  ];
  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
          Lagos Hub Dispatch
        </p>
        <Badge status="active" />
      </div>
      <dl className="mt-4 space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-xs">
            <dt className="text-light-secondary">{k}</dt>
            <dd className="font-semibold text-light-primary dark:text-ink-primary">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ActionCard() {
  return (
    <div className={shell}>
      <p className="text-base font-bold text-light-primary dark:text-ink-primary">
        Route Optimization Tool
      </p>
      <p className="mt-1 text-[13px] leading-5 text-light-secondary">
        Recalculate route coordinates to save estimated time of arrival (ETA) on
        deliveries.
      </p>
      <Button className="mt-4 w-full min-w-0">Launch Optimizer</Button>
    </div>
  );
}
