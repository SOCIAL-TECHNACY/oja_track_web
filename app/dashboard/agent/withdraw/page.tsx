"use client";

import { useCallback, useEffect, useState } from "react";
import BalanceWallet from "../../../components/dashboard/BalanceWallet";
import PayoutForm from "../../../components/dashboard/PayoutForm";
import PayoutHistory from "../../../components/dashboard/PayoutHistory";
import type { PayoutRecord } from "@/lib/agent-dashboard";
import { getAgentDashboardApi, getAgentPayoutsApi } from "@/lib/api/agent";

export default function AgentWithdrawPage() {
  const [balanceNGN, setBalanceNGN] = useState<number>(0);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWithdrawalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, payoutsRes] = await Promise.allSettled([
        getAgentDashboardApi(),
        getAgentPayoutsApi(),
      ]);

      if (dashRes.status === "rejected" && payoutsRes.status === "rejected") {
        throw new Error("Unable to connect to agent payouts service.");
      }

      if (dashRes.status === "fulfilled" && dashRes.value?.success && dashRes.value.stats) {
        setBalanceNGN(Number(dashRes.value.stats.available_balance) || 0);
      } else {
        setBalanceNGN(0);
      }

      if (payoutsRes.status === "fulfilled" && payoutsRes.value?.success && Array.isArray(payoutsRes.value.payouts)) {
        const mapped: PayoutRecord[] = payoutsRes.value.payouts.map((p, idx) => ({
          id: p.id || `p-${idx}`,
          amountNGN: Number(p.amount) || 0,
          dateISO: p.requestedAt
            ? new Date(p.requestedAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          ref: p.id ? `PAY-${p.id.slice(0, 8).toUpperCase()}` : "PAY-REF",
          bankLabel: p.payoutMethod || "Nigerian Commercial Bank",
          status: "Completed",
        }));
        setPayouts(mapped);
      } else {
        setPayouts([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load withdrawal wallet information.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWithdrawalData();
  }, [loadWithdrawalData]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
          Commission Disbursals & Wallet
        </h1>
        <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
          Request instantaneous payouts to your verified Nigerian commercial bank account.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex flex-col gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-warning/20 dark:bg-warning/5"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 text-warning font-bold">
              ⚠
            </span>
            <div>
              <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
                Disbursal Service Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadWithdrawalData}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Forms & Wallet */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        {loading ? (
          <div className="h-80 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <PayoutForm balanceNGN={balanceNGN} />
        )}
        {loading ? (
          <div className="h-44 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <BalanceWallet balanceNGN={balanceNGN} />
        )}
      </div>

      {/* Payout History */}
      <div className="mt-6">
        {loading ? (
          <div className="h-44 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <PayoutHistory items={payouts} />
        )}
      </div>
    </main>
  );
}
