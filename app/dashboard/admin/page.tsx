"use client";

import { useEffect, useState } from "react";
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
import {
  mockAdminOverview,
  mockShopGrowth12m,
  mockGrossRevenue6m,
  mockNetworkEvents,
  mockOperationalHealth,
  type AdminPlatformStats,
} from "@/lib/admin-dashboard";
import { getPlatformDashboardApi } from "@/lib/api/platform";

export default function AdminDashboardHomePage() {
  const [stats, setStats] = useState<AdminPlatformStats>(mockAdminOverview);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getPlatformDashboardApi();
        if (res.success && res.dashboard) {
          setIsLive(true);
          setStats((prev) => ({
            ...prev,
            totalShops: res.dashboard.organisations_count ?? prev.totalShops,
            activeShops: res.dashboard.active_organisations_count ?? prev.activeShops,
            totalAgents: res.dashboard.agents_count ?? prev.totalAgents,
            monthlyRevenueNGN: Number(res.dashboard.total_revenue_ngn) || prev.monthlyRevenueNGN,
            commissionLiabilityNGN: Number(res.dashboard.pending_commissions_ngn) || prev.commissionLiabilityNGN,
            pendingWithdrawalsNGN: (res.dashboard.pending_payouts_count * 25000) || prev.pendingWithdrawalsNGN,
          }));
        }
      } catch {
        // Fall back gracefully to mockAdminOverview
      }
    }
    loadStats();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between mb-4">
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
            {isLive ? "Live Network Node" : "Cached Network State"}
          </span>
        </div>
      </div>

      <AdminTopStats stats={stats} />

      <div className="mt-4">
        <AdminMoneyStats stats={stats} />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_1.2fr_0.9fr]">
        <ShopGrowthChart series={mockShopGrowth12m} />
        <GrossRevenueBarChart rows={mockGrossRevenue6m} />
        <RenewalsSplitDonut />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <NetworkEvents events={mockNetworkEvents} />
        <OperationalHealth services={mockOperationalHealth} />
      </div>
    </main>
  );
}
