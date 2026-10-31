import Badge from "./Badge";
import Button from "./Button";

/*
 * Figma: section-cards (10:3893) — 328px, radius 16, white.
 * Three patterns: metric, data (record), action.
 */
const shell =
  "w-full rounded-2xl border border-border bg-white p-5 dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export function MetricCard({
  label = "Weekly Fleet Earnings",
  value = "₦12,845.00",
  change = "+14.2% vs last week",
  positive = true,
}: {
  label?: string;
  value?: string;
  change?: string;
  positive?: boolean;
}) {
  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-light-secondary dark:text-ink-secondary">
          {label}
        </p>
        <span aria-hidden className={positive ? "text-brand-primary" : "text-danger"}>
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
      <p className="mt-3 text-2xl sm:text-[28px] leading-tight font-extrabold text-light-primary dark:text-ink-primary">
        {value}
      </p>
      {change && (
        <p className="mt-2 text-xs">
          <span className={`font-semibold ${positive ? "text-brand-primary" : "text-danger"}`}>
            {change}
          </span>
        </p>
      )}
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
          Dispatch Route 04
        </p>
        <Badge status="active" />
      </div>
      <div className="mt-3 divide-y divide-border text-xs dark:divide-[#1e3a2b]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between py-2">
            <span className="text-light-muted">{label}</span>
            <span className="font-semibold text-light-primary dark:text-ink-primary">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActionCard() {
  return (
    <div className={shell}>
      <p className="text-sm font-bold text-light-primary dark:text-ink-primary">
        Daily Reconciliation Required
      </p>
      <p className="mt-2 text-xs leading-relaxed text-light-secondary dark:text-ink-secondary">
        3 pending cash handovers need manager confirmation before close of
        business.
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="primary">Review now</Button>
        <Button variant="ghost">Dismiss</Button>
      </div>
    </div>
  );
}
