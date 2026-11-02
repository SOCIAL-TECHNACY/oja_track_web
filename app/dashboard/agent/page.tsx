"use client";

import { useCallback, useEffect, useState } from "react";
import CriticalRenewals from "../../components/dashboard/CriticalRenewals";
import RecentCommissions from "../../components/dashboard/RecentCommissions";
import ReferAgentCard from "../../components/dashboard/ReferAgentCard";
import StatCards from "../../components/dashboard/StatCards";
import type {
  AgentStats,
  CommissionItem,
  RenewalItem,
} from "@/lib/agent-dashboard";
import { getAgentDashboardApi } from "@/lib/api/agent";
import { useAuth } from "@/lib/auth/auth-context";

const initialStats: AgentStats = {
  totalShops: 0,
  activeShops: 0,
  expiredShops: 0,
  totalEarningsNGN: 0,
  availableBalanceNGN: 0,
  pendingCommissionNGN: 0,
};

export default function AgentDashboardOverviewPage() {
  const { safeUser } = useAuth();
  const [stats, setStats] = useState<AgentStats>(initialStats);
  const [commissions, setCommissions] = useState<CommissionItem[]>([]);
  const [renewals, setRenewals] = useState<RenewalItem[]>([]);
  const [referralCode, setReferralCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const loadAgentData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAgentDashboardApi();
      if (res && res.success && res.stats) {
        setIsLive(true);
        const registered = Number(res.stats.organisations_registered) || 0;
        setStats({
          totalShops: registered,
          activeShops: registered,
          expiredShops: 0,
          totalEarningsNGN: Number(res.stats.total_earned) || 0,
          availableBalanceNGN: Number(res.stats.available_balance) || 0,
          pendingCommissionNGN: Number(res.stats.pending_commission) || 0,
        });
        if (res.stats.referral_code) {
          setReferralCode(res.stats.referral_code);
        } else if (safeUser?.id) {
          setReferralCode(`OJA-${safeUser.id.slice(0, 6).toUpperCase()}`);
        }

        if (Array.isArray(res.recent) && res.recent.length > 0) {
          const mapped: CommissionItem[] = res.recent.map((item: any, idx: number) => ({
            id: item.id || `c-${idx}`,
            shopName: item.organisation?.name || item.shopName || "Retail Shop",
            dateISO: item.createdAt
              ? new Date(item.createdAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            type: item.transactionType?.includes("RENEWAL") ? "Recurring" : "First Sale",
            amountNGN: Number(item.commissionAmount || item.amount) || 0,
          }));
          setCommissions(mapped);
        } else {
          setCommissions([]);
        }
        setRenewals([]);
      } else {
        throw new Error("Unable to read agent dashboard response from server");
      }
    } catch (err: any) {
      setIsLive(false);
      setError(
        err?.message ||
          "Could not establish connection with OjaTrack Agent API. Verify server configuration."
      );
    } finally {
      setLoading(false);
    }
  }, [safeUser]);

  useEffect(() => {
    loadAgentData();
  }, [loadAgentData]);

  const firstName = safeUser?.firstName || "Agent";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
            Track your onboarding progress, active fleet performance, and commission stream.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/20">
              Live Central Sync Active
            </span>
          ) : (
            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-foundation-secondary dark:text-ink-muted dark:border-[#1e3a2b]">
              Central Node Standby
            </span>
          )}
        </div>
      </div>

      {/* Error / Offline Alert */}
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
                Agent Sync Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadAgentData}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="mt-6">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
              />
            ))}
          </div>
        ) : (
          <StatCards stats={stats} />
        )}
      </div>

      {/* Operational Grids */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        {loading ? (
          <div className="h-64 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <RecentCommissions items={commissions} />
        )}

        <div className="space-y-4 lg:space-y-6">
          {loading ? (
            <div className="h-44 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
          ) : (
            <CriticalRenewals items={renewals} />
          )}

          <ReferAgentCard referralCode={referralCode || "OJA-PENDING"} />
        </div>
      </div>
    </main>
  );
}
