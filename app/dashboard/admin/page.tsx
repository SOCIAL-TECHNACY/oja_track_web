"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminTopStats, AdminMoneyStats } from "../../components/dashboard/AdminStatCards";
import {
  ShopGrowthChart,
  GrossRevenueBarChart,
  RenewalsSplitDonut,
} from "../../components/dashboard/AdminCharts";
import {
  NetworkEvents,
  OperationalHealth,
} from "../../components/dashboard/AdminPanels";
import type { AdminPlatformStats } from "@/lib/admin-dashboard";
import { getPlatformDashboardApi } from "@/lib/api/platform";

const initialPlatformStats: AdminPlatformStats = {
  totalShops: 0,
  totalShopsSub: "Platform lifetime cumulative",
  activeShops: 0,
  activeShopsSub: "Last transaction within 72 hrs",
  newThisMonth: 0,
  newThisMonthSub: "Onboarded this month",
  totalAgents: 0,
  totalAgentsSub: "Accredited field force",
  activeAgents: 0,
  activeAgentsSub: "Active field agents",
  monthlyRevenueNGN: 0,
  monthlyRevenueSub: "Gross transaction volume basis",
  subscriptionRevenueNGN: 0,
  subscriptionRevenueSub: "Recurring platform plans",
  commissionLiabilityNGN: 0,
  commissionLiabilitySub: "Owed to field agents",
  pendingWithdrawalsNGN: 0,
  pendingWithdrawalsSub: "Pending clearance audit",
  renewalsDue30d: 0,
  renewalsDue30dSub: "Expiring within next 30 days",
};

export default function AdminDashboardHomePage() {
  const [stats, setStats] = useState<AdminPlatformStats>(initialPlatformStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPlatformDashboardApi();
      if (res && res.success && res.dashboard) {
        setIsLive(true);
        setStats({
          totalShops: res.dashboard.organisations_count || 0,
          totalShopsSub: "Platform lifetime cumulative",
          activeShops: res.dashboard.active_organisations_count || 0,
          activeShopsSub: "Last transaction within 72 hrs",
          newThisMonth: 0,
          newThisMonthSub: "Onboarded this month",
          totalAgents: res.dashboard.agents_count || 0,
          totalAgentsSub: "Accredited field force",
          activeAgents: res.dashboard.agents_count || 0,
          activeAgentsSub: "Active field agents",
          monthlyRevenueNGN: Number(res.dashboard.total_revenue_ngn) || 0,
          monthlyRevenueSub: "Gross transaction volume basis",
          subscriptionRevenueNGN: 0,
          subscriptionRevenueSub: "Recurring platform plans",
          commissionLiabilityNGN: Number(res.dashboard.pending_commissions_ngn) || 0,
          commissionLiabilitySub: "Owed to field agents",
          pendingWithdrawalsNGN: (res.dashboard.pending_payouts_count || 0) * 25000,
          pendingWithdrawalsSub: "Pending clearance audit",
          renewalsDue30d: 0,
          renewalsDue30dSub: "Expiring within next 30 days",
        });
      } else {
        throw new Error("Unable to read platform metrics from central API.");
      }
    } catch (err: any) {
      setIsLive(false);
      setError(
        err?.message ||
          "Could not establish connection with OjaTrack Platform API. Verify backend server status."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-light-primary dark:text-ink-primary">
            Operational Command Center
          </h2>
          <p className="text-sm text-light-secondary dark:text-ink-secondary">
            Network-wide shops, agents, revenue, renewals, and system health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isLive
                ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/20 dark:text-brand-hover"
                : "bg-surface-secondary text-light-muted dark:bg-[#1a2f23] dark:text-ink-muted"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLive ? "bg-brand-primary animate-pulse" : "bg-neutral-400"
              }`}
            />
            {isLive ? "Live Central Node Active" : "Server Disconnected"}
          </span>
        </div>
      </div>

      {/* Error / Alert notice */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex flex-col gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-warning/20 dark:bg-warning/5"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 text-warning font-bold">
              ⚠
            </span>
            <div>
              <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
                Command Center Connection Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadStats}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Top Stats */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
            />
          ))}
        </div>
      ) : (
        <AdminTopStats stats={stats} />
      )}

      {/* Money Stats */}
      <div className="mt-4">
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
          <AdminMoneyStats stats={stats} />
        )}
      </div>

      {/* Charts */}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_1.2fr_0.9fr]">
        <ShopGrowthChart series={[]} />
        <GrossRevenueBarChart rows={[]} />
        <RenewalsSplitDonut />
      </div>

      {/* Network Panels */}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <NetworkEvents events={[]} />
        <OperationalHealth services={[]} />
      </div>
    </main>
  );
}
