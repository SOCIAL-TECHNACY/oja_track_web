"use client";

import { useEffect, useRef, useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  formatCount,
  mockMonthlyGross12m,
  mockRegionalSplit,
  mockReportRanges,
  mockReportStats,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

/*
 * Analytics & Reports Hub island: date-range toolbar with export
 * actions (toast feedback, mock), revenue stat cards, regional
 * distribution bars, and a 12-month gross revenue chart.
 */
export default function ReportsHubView() {
  const [range, setRange] = useState(mockReportRanges[0]);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function flash(message: string) {
    if (timer.current) window.clearTimeout(timer.current);
    setToast(message);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }

  const maxRegional = Math.max(...mockRegionalSplit.map((r) => r.shops));
  const maxMonthly = Math.max(...mockMonthlyGross12m.map((m) => m.amountNGN));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="text-light-muted">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2.5 7h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <label className="flex items-center gap-2.5">
            <span className="text-sm font-bold whitespace-nowrap text-light-primary dark:text-ink-primary">
              Custom Date Range:
            </span>
            <span className="relative inline-flex">
              <select
                aria-label="Custom date range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="h-10 cursor-pointer appearance-none rounded-xl border border-border bg-white pr-9 pl-3.5 text-[13px] text-light-primary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-primary"
              >
                {mockReportRanges.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-muted"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="m4 6 4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => flash("CSV export started — your download will begin shortly.")}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-[13px] font-semibold text-light-primary transition-colors hover:border-brand-primary dark:text-ink-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 2v8m0 0 3-3M8 10 5 7M2.5 12.5h11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => flash("PDF export started — your download will begin shortly.")}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand-primary bg-brand-primary/10 px-4 text-[13px] font-semibold text-brand-deep transition-colors hover:bg-brand-primary/15 dark:text-brand-hover"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M4 1.5h5.5L12.5 5v9.5h-8.5v-13Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M9.5 1.5V5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div
        aria-label="Revenue summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {mockReportStats.map((s) => (
          <div key={s.label} className={card}>
            <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-light-primary tabular-nums dark:text-ink-primary">
              {formatNGN(s.valueNGN)}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-light-secondary dark:text-ink-secondary">
              <span className="inline-flex h-6 items-center rounded-md bg-brand-primary/10 px-2 text-xs font-bold whitespace-nowrap text-brand-deep tabular-nums dark:bg-brand-primary/15 dark:text-brand-hover">
                {s.trend}
              </span>
              <span className="truncate">{s.sub}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Regional distribution */}
      <div className={card}>
        <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
          Regional Distribution by State
        </h2>
        <div
          className="mt-4 space-y-3.5"
          role="img"
          aria-label={`Shops by state: ${mockRegionalSplit.map((r) => `${r.state} ${formatCount(r.shops)}`).join(", ")}`}
        >
          {mockRegionalSplit.map((r) => (
            <div key={r.state} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm font-semibold text-light-primary dark:text-ink-primary">
                {r.state}
              </span>
              <div
                className="h-4 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-alt"
                role="progressbar"
                aria-valuenow={Math.round((r.shops / maxRegional) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${r.state} shops`}
              >
                <div
                  className="h-full rounded-full bg-brand-primary"
                  style={{ width: `${(r.shops / maxRegional) * 100}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-[13px] whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                {formatCount(r.shops)} shops
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly gross revenue */}
      <div className={card}>
        <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
          Gross Revenue by Month (12m)
        </h2>
        <div
          className="mt-4 flex h-48 items-end gap-2 sm:gap-3"
          role="img"
          aria-label="Gross revenue rising from January to December"
        >
          {mockMonthlyGross12m.map((m) => (
            <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-brand-primary"
                style={{ height: `${Math.max(10, (m.amountNGN / maxMonthly) * 150)}px` }}
                title={`${m.month}: ${formatNGN(m.amountNGN)}`}
              />
              <span className="text-[11px] text-light-muted">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[60] w-full max-w-sm -translate-x-1/2 px-4"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-light-primary shadow-[0_8px_24px_rgba(7,16,12,0.16)] dark:bg-foundation-elevated dark:text-ink-primary dark:border-[#1e3a2b]">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-success" />
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
