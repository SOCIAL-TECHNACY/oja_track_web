"use client";

import { useEffect, useState } from "react";
import CommissionEvents from "../../../components/dashboard/CommissionEvents";
import EarningsStatCards from "../../../components/dashboard/EarningsStatCards";
import RevenueChart from "../../../components/dashboard/RevenueChart";
import SplitBreakdown from "../../../components/dashboard/SplitBreakdown";
import {
  mockAgentOverview,
  mockEarningSplit,
  mockEarningsSummary,
  mockMonthlyRevenue,
  type EarningsSummary,
  type CommissionItem,
} from "@/lib/agent-dashboard";
import { getAgentDashboardApi, getAgentEarningsApi } from "@/lib/api/agent";

export default function AgentEarningsPage() {
  const [summary, setSummary] = useState<EarningsSummary>(mockEarningsSummary);
  const [commissions, setCommissions] = useState<CommissionItem[]>(mockAgentOverview.commissions);

  useEffect(() => {
    async function loadEarnings() {
      try {
        const [dashRes, earnRes] = await Promise.allSettled([
          getAgentDashboardApi(),
          getAgentEarningsApi(),
        ]);

        if (dashRes.status === "fulfilled" && dashRes.value.success && dashRes.value.stats) {
          const stats = dashRes.value.stats;
          setSummary((prev) => ({
            ...prev,
            totalCumulativeNGN: Number(stats.total_earned) || prev.totalCumulativeNGN,
            thisMonthNGN: Number(stats.available_balance) || prev.thisMonthNGN,
          }));
        }

        if (earnRes.status === "fulfilled" && earnRes.value.success && earnRes.value.earnings.length > 0) {
          const mapped: CommissionItem[] = earnRes.value.earnings.map((e) => ({
            id: e.id,
            shopName: e.organisation?.name || "Partner Shop",
            dateISO: new Date(e.createdAt).toISOString().split("T")[0],
            amountNGN: Number(e.commissionAmount) || 0,
            type: e.transactionType.includes("RENEWAL") ? "Recurring" : "First Sale",
          }));
          setCommissions(mapped);
        }
      } catch {
        // Fall back gracefully to mock values
      }
    }
    loadEarnings();
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <EarningsStatCards summary={summary} />

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <RevenueChart data={mockMonthlyRevenue} />
        <SplitBreakdown splits={mockEarningSplit} />
      </div>

      <div className="mt-6">
        <CommissionEvents items={commissions} />
      </div>
    </main>
  );
}
