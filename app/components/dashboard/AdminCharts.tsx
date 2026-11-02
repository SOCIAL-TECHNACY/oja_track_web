import type { MonthlyGrossRevenue } from "@/lib/admin-dashboard";
import { mockRenewalsSplit } from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

const titleCls =
  "text-base font-bold text-light-primary dark:text-ink-primary";

/*
 * Lightweight SVG charts for the command center — no chart dependency,
 * matching the existing CSS/SVG-only dashboard pattern.
 */

export function ShopGrowthChart({ series }: { series: number[] }) {
  if (!series || series.length < 2) {
    return (
      <div className={card}>
        <h2 className={titleCls}>Shop Growth (12 Months)</h2>
        <div className="mt-4 flex h-44 items-center justify-center rounded-xl border border-dashed border-border dark:border-[#1e3a2b]">
          <p className="text-xs text-light-secondary dark:text-ink-secondary">
            Insufficient historical points to project network trajectory.
          </p>
        </div>
      </div>
    );
  }

  const w = 320;
  const h = 160;
  const pad = 12;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = Math.max(1, max - min);
  const pts = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <div className={card}>
      <h2 className={titleCls}>Shop Growth (12 Months)</h2>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`Shop growth trending from ${series[0]} to ${series[series.length - 1]}`}
        className="mt-4 h-44 w-full"
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={h * f}
            y2={h * f}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="#00C853"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function GrossRevenueBarChart({ rows }: { rows: MonthlyGrossRevenue[] }) {
  if (!rows || rows.length === 0) {
    return (
      <div className={card}>
        <h2 className={titleCls}>Gross Revenue Bar Chart (6m)</h2>
        <div className="mt-4 flex h-44 items-center justify-center rounded-xl border border-dashed border-border dark:border-[#1e3a2b]">
          <p className="text-xs text-light-secondary dark:text-ink-secondary">
            No 6-month gross revenue data recorded.
          </p>
        </div>
      </div>
    );
  }

  const max = Math.max(...rows.map((r) => r.amountNGN), 1);
  return (
    <div className={card}>
      <h2 className={titleCls}>Gross Revenue Bar Chart (6m)</h2>
      <div
        className="mt-4 flex h-44 items-end gap-3"
        role="img"
        aria-label="Gross revenue rising from M1 to M6"
      >
        {rows.map((r) => (
          <div key={r.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-brand-gold"
              style={{ height: `${Math.max(12, (r.amountNGN / max) * 140)}px` }}
              title={`${r.month}`}
            />
            <span className="text-xs text-light-muted">{r.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RenewalsSplitDonut() {
  const { autoPct, manualPct, autoLabel, manualLabel } = mockRenewalsSplit;
  // Donut via stroke-dasharray on a circle.
  const r = 54;
  const c = 2 * Math.PI * r;
  const autoLen = (autoPct / 100) * c;

  return (
    <div className={card}>
      <h2 className={titleCls}>Renewals Split</h2>
      <div className="mt-4 flex flex-col items-center">
        <svg
          viewBox="0 0 140 140"
          role="img"
          aria-label={`Renewals split ${autoLabel} versus ${manualLabel}`}
          className="h-44 w-44 -rotate-90"
        >
          <circle cx="70" cy="70" r={r} fill="none" stroke="#D6A84F" strokeWidth="18" />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="#00C853"
            strokeWidth="18"
            strokeDasharray={`${autoLen} ${c}`}
            strokeLinecap="butt"
          />
        </svg>
        <div className="mt-4 flex items-center gap-4 text-[13px] text-light-secondary dark:text-ink-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand-primary" />
            {autoLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand-gold" />
            {manualLabel}
          </span>
        </div>
        <span className="sr-only">
          Auto {autoPct} percent, manual {manualPct} percent
        </span>
      </div>
    </div>
  );
}
