"use client";

import { useCallback, useEffect, useState } from "react";
import CommissionEvents from "../../../components/dashboard/CommissionEvents";
import EarningsStatCards from "../../../components/dashboard/EarningsStatCards";
import RevenueChart from "../../../components/dashboard/RevenueChart";
import SplitBreakdown from "../../../components/dashboard/SplitBreakdown";
import type {
  CommissionItem,
  EarningSplit,
  EarningsSummary,
  MonthlyRevenue,
} from "@/lib/agent-dashboard";
import { getAgentDashboardApi, getAgentEarningsApi } from "@/lib/api/agent";

const initialSummary: EarningsSummary = {
  totalCumulativeNGN: 0,
  thisMonthNGN: 0,
  thisMonthLabel: "Current Month",
  recurringAverageNGN: 0,
  nextMonthEstimateNGN: 0,
};

export default function AgentEarningsPage() {
  const [summary, setSummary] = useState<EarningsSummary>(initialSummary);
  const [commissions, setCommissions] = useState<CommissionItem[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [splits, setSplits] = useState<EarningSplit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEarnings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, earnRes] = await Promise.allSettled([
        getAgentDashboardApi(),
        getAgentEarningsApi(),
      ]);

      if (dashRes.status === "rejected" && earnRes.status === "rejected") {
        throw new Error("Unable to fetch earnings data from server. Please verify network connectivity.");
      }

      let totalCumulative = 0;
      let thisMonth = 0;

      if (dashRes.status === "fulfilled" && dashRes.value?.success && dashRes.value.stats) {
        const stats = dashRes.value.stats;
        totalCumulative = Number(stats.total_earned) || 0;
        thisMonth = Number(stats.available_balance) || 0;
      }

      if (earnRes.status === "fulfilled" && earnRes.value?.success && Array.isArray(earnRes.value.earnings)) {
        const earningsList = earnRes.value.earnings;
        const mapped: CommissionItem[] = earningsList.map((e) => ({
          id: e.id,
          shopName: e.organisation?.name || "Partner Shop",
          dateISO: e.createdAt
            ? new Date(e.createdAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          amountNGN: Number(e.commissionAmount) || 0,
          type: e.transactionType?.includes("RENEWAL") ? "Recurring" : "First Sale",
        }));
        setCommissions(mapped);

        // Compute splits dynamically from real transactions
        let upfrontTotal = 0;
        let recurringTotal = 0;
        for (const item of mapped) {
          if (item.type === "First Sale") {
            upfrontTotal += item.amountNGN;
          } else {
            recurringTotal += item.amountNGN;
          }
        }
        const totalAmount = upfrontTotal + recurringTotal;
        if (totalAmount > 0) {
          const upfrontPct = Math.round((upfrontTotal / totalAmount) * 100);
          const recurringPct = 100 - upfrontPct;
          setSplits([
            {
              label: `Upfront Onboardings (${upfrontPct}%)`,
              percent: upfrontPct,
              barClass: "bg-brand-primary",
            },
            {
              label: `Recurring Renewals (${recurringPct}%)`,
              percent: recurringPct,
              barClass: "bg-brand-gold",
            },
          ]);
        } else {
          setSplits([]);
        }
      } else {
        setCommissions([]);
        setSplits([]);
      }

      setSummary({
        totalCumulativeNGN: totalCumulative,
        thisMonthNGN: thisMonth,
        thisMonthLabel: "Current Month",
        recurringAverageNGN: 0,
        nextMonthEstimateNGN: 0,
      });
      setMonthlyRevenue([]);
    } catch (err: any) {
      setError(err?.message || "Failed to load agent earnings records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEarnings();
  }, [loadEarnings]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
          Commission Earnings & Revenue
        </h1>
        <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
          Detailed audit trail of upfront onboarding bonuses and recurring renewal income.
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
                Earnings Synchronization Issue
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadEarnings}
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
          <EarningsStatCards summary={summary} />
        )}
      </div>

      {/* Charts / Splits */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        {loading ? (
          <div className="h-64 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <RevenueChart data={monthlyRevenue} />
        )}
        {loading ? (
          <div className="h-64 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <SplitBreakdown splits={splits} />
        )}
      </div>

      {/* Commission Event Log */}
      <div className="mt-6">
        {loading ? (
          <div className="h-44 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
        ) : (
          <CommissionEvents items={commissions} />
        )}
      </div>
    </main>
  );
}
