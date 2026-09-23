"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  formatCompactNGN,
  mockCommissionLedgers,
  mockCommissionRules,
  mockCommissionStats,
  type CommissionLedger,
  type CommissionLedgerStatus,
} from "@/lib/admin-dashboard";

const PAGE_SIZE = 6;

type TabKey = "all" | "paid" | "processing" | "pending";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "processing", label: "Processing" },
  { key: "pending", label: "Pending" },
];

function tabMatches(c: CommissionLedger, tab: TabKey): boolean {
  if (tab === "all") return true;
  if (tab === "paid") return c.status === "PAID";
  if (tab === "processing") return c.status === "PROCESSING";
  return c.status === "PENDING";
}

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

function LedgerPill({ status }: { status: CommissionLedgerStatus }) {
  const cls =
    status === "PAID"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "PROCESSING"
        ? "bg-info/10 text-info dark:bg-info/15"
        : "bg-brand-gold/15 text-light-primary dark:text-brand-gold";
  const dot =
    status === "PAID"
      ? "bg-brand-primary"
      : status === "PROCESSING"
        ? "bg-info"
        : "bg-brand-gold";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

/*
 * Field Force Comm Engine island: stat cards + accrual ledgers with
 * status tabs + editable rule matrix. Apply persists to local state
 * and confirms via toast; backend wiring comes later.
 */
export default function CommissionEngineView() {
  const [tab, setTab] = useState<TabKey>("all");
  const [page, setPage] = useState(1);
  const [upfront, setUpfront] = useState(mockCommissionRules.upfront);
  const [residual, setResidual] = useState(mockCommissionRules.residual);
  const [minimum, setMinimum] = useState(mockCommissionRules.minimum);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const filtered = useMemo(
    () => mockCommissionLedgers.filter((c) => tabMatches(c, tab)),
    [tab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const pageButton =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors";

  function applyRules() {
    if (timer.current) window.clearTimeout(timer.current);
    setToast("Commission rules updated — applies to the next accrual cycle.");
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }

  const ruleInput =
    "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-light-primary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-elevated dark:text-ink-primary";
  const ruleLabel =
    "mb-1.5 block text-[13px] font-medium text-light-secondary dark:text-ink-secondary";

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div
        aria-label="Commission summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {mockCommissionStats.map((s) => (
          <div key={s.label} className={card}>
            <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
              {s.label}
            </p>
            <p className={`mt-2 text-3xl font-extrabold tabular-nums ${s.valueClass}`}>
              {formatCompactNGN(s.valueNGN)}
            </p>
            <p className="mt-2 text-[13px] text-light-secondary dark:text-ink-secondary">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[1.6fr_1fr]">
        {/* Accrual ledgers */}
        <div className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
              Accrual Ledgers
            </h2>
            <div
              role="group"
              aria-label="Ledger status filter"
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
                    className={`inline-flex h-9 items-center rounded-xl border px-3.5 text-[13px] whitespace-nowrap transition-colors ${
                      isActive
                        ? "border-brand-primary font-semibold text-brand-primary"
                        : "border-border font-normal text-light-secondary hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border dark:border-[#1e3a2b]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                    {["Agent", "Type", "Merchant Partner", "Payout", "Status"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-medium first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border last:border-0 dark:border-[#1e3a2b]"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3.5 font-bold whitespace-nowrap text-light-primary first:pl-5 dark:text-ink-primary"
                      >
                        {c.agentName}
                      </th>
                      <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                        {c.type}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-light-primary dark:text-ink-primary">
                        {c.merchant}
                      </td>
                      <td className="px-4 py-3.5 font-bold whitespace-nowrap text-brand-primary tabular-nums">
                        {formatNGN(c.payoutNGN)}
                      </td>
                      <td className="px-4 py-3.5 last:pr-5">
                        <LedgerPill status={c.status} />
                      </td>
                    </tr>
                  ))}
                  {pageItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm text-light-secondary dark:text-ink-secondary"
                      >
                        No ledger entries match this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-light-secondary dark:text-ink-secondary">
              Showing {pageItems.length} of {filtered.length} entries
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

        {/* Rule matrix */}
        <div className={card}>
          <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
            Rule Matrix Configuration
          </h2>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className={ruleLabel}>Upfront Onboarding Split</span>
              <input
                value={upfront}
                onChange={(e) => setUpfront(e.target.value)}
                className={ruleInput}
              />
            </label>
            <label className="block">
              <span className={ruleLabel}>Monthly Residual Split</span>
              <input
                value={residual}
                onChange={(e) => setResidual(e.target.value)}
                className={ruleInput}
              />
            </label>
            <label className="block">
              <span className={ruleLabel}>Minimum Disbursable Accrual</span>
              <input
                value={minimum}
                onChange={(e) => setMinimum(e.target.value)}
                className={ruleInput}
              />
            </label>
            <button
              type="button"
              onClick={applyRules}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-brand-primary px-4 text-sm font-bold text-white transition-colors hover:bg-success-hover"
            >
              Apply Global Rules
            </button>
          </div>
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
