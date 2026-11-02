"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  complianceFor,
  type WithdrawalRequest,
  type WithdrawalStatus,
} from "@/lib/admin-dashboard";
import { getPlatformWithdrawalsApi, processWithdrawalApi } from "@/lib/api/platform";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

function DisbursalPill({ status }: { status: WithdrawalStatus }) {
  const cls =
    status === "PAID"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "PROCESSING"
        ? "bg-info/10 text-info dark:bg-info/15"
        : status === "PENDING"
          ? "bg-brand-gold/15 text-light-primary dark:text-brand-gold"
          : "bg-danger/10 text-danger dark:bg-danger/15 dark:text-danger";
  const dot =
    status === "PAID"
      ? "bg-brand-primary"
      : status === "PROCESSING"
        ? "bg-info"
        : status === "PENDING"
          ? "bg-brand-gold"
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

/*
 * Withdrawal Clearance Terminal island: outstanding disbursals with
 * live API synchronization + selectable rows driving the balance
 * compliance panel.
 */
export default function WithdrawalClearanceView() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const loadWithdrawals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPlatformWithdrawalsApi();
      if (res && res.success && Array.isArray((res as any).withdrawals)) {
        const rawList = (res as any).withdrawals;
        const mapped: WithdrawalRequest[] = rawList.map((w: any, idx: number) => {
          let status: WithdrawalStatus = "PENDING";
          if (w.status === "paid") status = "PAID";
          else if (w.status === "processing") status = "PROCESSING";
          else if (w.status === "rejected" || w.status === "cancelled") status = "REJECTED";

          const agentName = w.agent?.user
            ? `${w.agent.user.firstName || ""} ${w.agent.user.lastName || ""}`.trim()
            : w.agentName || "Agent";
          const initials = agentName.split(" ").map((s: string) => s[0]).join("").toUpperCase().slice(0, 2) || "AG";

          return {
            id: w.id || `w-${idx}`,
            agentName,
            agentCode: w.agent?.agentCode || `AG-${String(idx + 1).padStart(3, "0")}`,
            initials,
            amountNGN: Number(w.amount) || 0,
            bank: w.payoutDetails?.bank || w.bank || "Nigerian Commercial Bank",
            accountNo: w.payoutDetails?.account_number || w.accountNo || "NUBAN-PENDING",
            dateISO: w.requestedAt
              ? new Date(w.requestedAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            status,
          };
        });
        setRequests(mapped);
        if (mapped.length > 0) {
          setSelectedId(mapped[0].id);
        }
      } else {
        setRequests([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load withdrawal clearance queue from central server.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWithdrawals();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [loadWithdrawals]);

  const actionable = useMemo(
    () => requests.filter((r) => r.status === "PENDING" || r.status === "PROCESSING"),
    [requests],
  );

  const selected = requests.find((r) => r.id === selectedId) ?? requests[0];
  const compliance = selected ? complianceFor(selected) : null;

  function flash(message: string) {
    if (timer.current) window.clearTimeout(timer.current);
    setToast(message);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }

  async function batchApprove() {
    const n = actionable.length;
    if (n === 0) return;
    try {
      await Promise.allSettled(
        actionable.map((r) => processWithdrawalApi(r.id, "approve"))
      );
      setRequests((prev) =>
        prev.map((r) =>
          r.status === "PENDING" || r.status === "PROCESSING"
            ? { ...r, status: "PAID" as const }
            : r,
        ),
      );
      flash(`${n} disbursal${n === 1 ? "" : "s"} cleared for payout.`);
    } catch {
      flash("Batch approval partially processed. Refreshing clearance queue.");
      loadWithdrawals();
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-warning/20 dark:bg-warning/5"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 text-warning font-bold">
              ⚠
            </span>
            <div>
              <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
                Clearance Terminal Sync Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadWithdrawals}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      <div className="grid items-start gap-4 xl:grid-cols-[1.6fr_1fr]">
        {/* Outstanding disbursals */}
        <div className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
              Outstanding Disbursals
            </h2>
            <button
              type="button"
              disabled={loading || actionable.length === 0}
              title={actionable.length === 0 ? "Nothing to clear" : `Approve ${actionable.length} disbursals`}
              onClick={batchApprove}
              className="inline-flex h-10 items-center rounded-xl bg-brand-primary px-4 text-sm font-bold text-white transition-colors hover:bg-success-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batch Approve ({actionable.length})
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border dark:border-[#1e3a2b]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                    {[
                      "Agent Identity",
                      "Amount Requested",
                      "Bank Institution",
                      "Account ID",
                      "Status",
                    ].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-medium first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center">
                        <div className="h-20 animate-pulse rounded-lg bg-neutral-100 dark:bg-foundation-secondary" />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {requests.map((r) => {
                        const isSelected = r.id === selected?.id;
                        return (
                          <tr
                            key={r.id}
                            onClick={() => setSelectedId(r.id)}
                            className={`cursor-pointer border-b border-border transition-colors last:border-0 dark:border-[#1e3a2b] ${
                              isSelected
                                ? "bg-surface dark:bg-foundation-elevated"
                                : "hover:bg-surface/60 dark:hover:bg-foundation-elevated/50"
                            }`}
                          >
                            <th
                              scope="row"
                              className="px-4 py-3.5 font-bold whitespace-nowrap text-light-primary first:pl-5 dark:text-ink-primary"
                            >
                              <button
                                type="button"
                                onClick={() => setSelectedId(r.id)}
                                aria-pressed={isSelected}
                                aria-label={`Inspect ${r.agentName} withdrawal`}
                                className="hover:underline"
                              >
                                {r.agentName}
                              </button>
                            </th>
                            <td className="px-4 py-3.5 font-bold whitespace-nowrap text-brand-primary tabular-nums">
                              {formatNGN(r.amountNGN)}
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                              {r.bank}
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                              {r.accountNo}
                            </td>
                            <td className="px-4 py-3.5 last:pr-5">
                              <DisbursalPill status={r.status} />
                            </td>
                          </tr>
                        );
                      })}
                      {requests.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-sm text-light-secondary dark:text-ink-secondary"
                          >
                            No withdrawal requests currently pending clearance.
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Compliance verification */}
        {selected && compliance ? (
          <div className={card} aria-live="polite">
            <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
              Balance Compliance Verification
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-deep text-sm font-bold text-white"
              >
                {selected.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-extrabold text-light-primary dark:text-ink-primary">
                  {selected.agentName}
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-light-secondary dark:text-ink-secondary">
                  {selected.agentCode} • {compliance.riskTier}
                </span>
              </span>
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm dark:border-[#1e3a2b]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Ledger Balance
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {formatNGN(compliance.ledgerBalanceNGN)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Pending Reserve
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {formatNGN(compliance.pendingReserveNGN)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Total Lifetime Payouts
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {formatNGN(compliance.lifetimePayoutsNGN)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Audited Onboardings
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  Pass ({compliance.auditedPass}/{compliance.auditedTotal})
                </dd>
              </div>
            </dl>

            <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-border pt-4 dark:border-[#1e3a2b]">
              <button
                type="button"
                disabled
                title="Coming soon"
                aria-disabled="true"
                className="flex h-11 cursor-not-allowed items-center justify-center rounded-xl border border-danger/60 bg-danger/10 px-3 text-sm font-bold text-light-primary opacity-90 dark:text-ink-primary"
              >
                Reject Request
              </button>
              <button
                type="button"
                disabled
                title="Coming soon"
                aria-disabled="true"
                className="flex h-11 cursor-not-allowed items-center justify-center rounded-xl bg-brand-primary px-3 text-sm font-bold text-white opacity-90"
              >
                Clear Funds
              </button>
            </div>
          </div>
        ) : (
          <div className={card} aria-live="polite">
            <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
              Balance Compliance Verification
            </h2>
            <div className="py-12 text-center text-sm text-light-secondary dark:text-ink-secondary">
              Select an outstanding disbursal from the clearance table to inspect compliance metrics.
            </div>
          </div>
        )}
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
