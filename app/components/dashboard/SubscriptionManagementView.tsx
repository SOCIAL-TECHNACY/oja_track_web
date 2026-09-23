"use client";

import { useMemo, useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  mockSubscriptions,
  mockSubscriptionStats,
  SUBSCRIPTION_TOTAL_COUNT,
  type SubscriptionRecord,
  type SubscriptionStatus,
} from "@/lib/admin-dashboard";

const PAGE_SIZE = 6;

type TabKey = "all" | "active" | "expiring" | "expired";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "expiring", label: "Expiring Soon" },
  { key: "expired", label: "Expired" },
];

function tabMatches(s: SubscriptionRecord, tab: TabKey): boolean {
  if (tab === "all") return true;
  if (tab === "active") return s.status === "ACTIVE";
  if (tab === "expiring") return s.status === "EXPIRING SOON";
  return s.status === "EXPIRED";
}

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

function TrendPill({ trend, down }: { trend: string; down?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-bold whitespace-nowrap tabular-nums ${
        down
          ? "bg-danger/10 text-danger dark:bg-danger/15"
          : "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      }`}
    >
      {trend}
    </span>
  );
}

function StatusPill({ status }: { status: SubscriptionStatus }) {
  const cls =
    status === "ACTIVE"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "EXPIRING SOON"
        ? "bg-surface-alt text-light-secondary dark:bg-foundation-elevated dark:text-ink-secondary"
        : "bg-danger/10 text-danger dark:bg-danger/15 dark:text-danger";
  const dot =
    status === "ACTIVE"
      ? "bg-brand-primary"
      : status === "EXPIRING SOON"
        ? "bg-light-muted dark:bg-ink-muted"
        : "bg-danger";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function LabeledSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-light-secondary uppercase dark:text-ink-secondary">
        {label}
      </span>
      <span className="relative block">
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-border bg-white pr-9 pl-3 text-sm text-light-primary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-primary"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
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
  );
}

/*
 * Subscription Management island: 4 stat cards + filter card (tabs,
 * collapsible plan/status/date dropdowns) + paginated records table.
 */
export default function SubscriptionManagementView() {
  const [tab, setTab] = useState<TabKey>("all");
  const [plan, setPlan] = useState("All Plans");
  const [status, setStatus] = useState("Active & Expiring");
  const [range, setRange] = useState("This Month");
  const [showFilters, setShowFilters] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      mockSubscriptions.filter(
        (s) =>
          tabMatches(s, tab) &&
          (plan === "All Plans" || s.plan === plan) &&
          (status === "All" ||
            (status === "Active & Expiring" &&
              (s.status === "ACTIVE" || s.status === "EXPIRING SOON")) ||
            (status === "Active" && s.status === "ACTIVE") ||
            (status === "Expiring Soon" && s.status === "EXPIRING SOON") ||
            (status === "Expired" && s.status === "EXPIRED")),
      ),
    [tab, plan, status],
  );

  const isUnfiltered =
    tab === "all" && plan === "All Plans" && status === "Active & Expiring";
  const totalLabel = isUnfiltered
    ? SUBSCRIPTION_TOTAL_COUNT.toLocaleString()
    : filtered.length.toLocaleString();

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const pageButton =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors";

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div
        aria-label="Subscription summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {mockSubscriptionStats.map((s) => (
          <div key={s.label} className={card}>
            <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-light-primary tabular-nums dark:text-ink-primary">
              {s.value}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-light-secondary dark:text-ink-secondary">
              <TrendPill trend={s.trend} down={s.trendDown} />
              <span className="truncate">{s.sub}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Filter card */}
      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Subscription status filter"
            className="flex flex-wrap items-center gap-2"
          >
            {tabs.map((t) => {
              const isActive = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setTab(t.key);
                    setPage(1);
                  }}
                  className={`inline-flex h-9 items-center rounded-xl px-4 text-[13px] whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-brand-primary font-semibold text-white"
                      : "border border-border font-normal text-light-secondary hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-border px-3.5 text-[13px] font-semibold text-light-primary transition-colors hover:border-brand-primary dark:text-ink-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M2 4.5h12M4 8h8M6 11.5h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Detailed Filters
          </button>
        </div>

        {showFilters ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <LabeledSelect
              label="Plan Type"
              value={plan}
              onChange={(v) => {
                setPlan(v);
                setPage(1);
              }}
              options={["All Plans", "Monthly", "Yearly", "Weekly", "3 Months", "6 Months"]}
            />
            <LabeledSelect
              label="Status"
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
              options={["Active & Expiring", "Active", "Expiring Soon", "Expired", "All"]}
            />
            <LabeledSelect
              label="Date Range"
              value={range}
              onChange={setRange}
              options={["This Month", "Last Quarter", "All Time"]}
            />
          </div>
        ) : null}

        {/* Records table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border dark:border-[#1e3a2b]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                  {[
                    "Shop Name",
                    "Owner",
                    "Plan",
                    "Amount",
                    "Start Date",
                    "Renewal Date",
                    "Status",
                    "Agent",
                  ].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-medium first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-border last:border-0 dark:border-[#1e3a2b]"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3.5 font-bold whitespace-nowrap text-light-primary first:pl-5 dark:text-ink-primary"
                    >
                      {s.shopName}
                    </th>
                    <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                      {s.owner}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-light-primary dark:text-ink-primary">
                      {s.plan}
                    </td>
                    <td className="px-4 py-3.5 font-bold whitespace-nowrap text-brand-primary tabular-nums">
                      {formatNGN(s.amountNGN)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                      {s.startDateISO}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                      {s.renewalDateISO}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusPill status={s.status} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary last:pr-5 dark:text-ink-secondary">
                      {s.agent}
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-10 text-center text-sm text-light-secondary dark:text-ink-secondary"
                    >
                      No subscriptions match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / pagination */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-light-secondary dark:text-ink-secondary">
            Showing {rangeStart}-{rangeEnd} of {totalLabel} items
          </p>
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`${pageButton} text-light-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-secondary`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const isCurrent = n === safePage;
              return (
                <button
                  key={n}
                  type="button"
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setPage(n)}
                  className={`${pageButton} ${
                    isCurrent
                      ? "border-brand-primary bg-brand-primary font-bold text-white"
                      : "text-light-secondary dark:text-ink-secondary"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`${pageButton} text-light-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-secondary`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
