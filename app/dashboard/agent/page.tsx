"use client";

import { useEffect, useState } from "react";
import CriticalRenewals from "../../components/dashboard/CriticalRenewals";
import RecentCommissions from "../../components/dashboard/RecentCommissions";
import ReferAgentCard from "../../components/dashboard/ReferAgentCard";
import StatCards from "../../components/dashboard/StatCards";
import { mockAgentOverview } from "@/lib/agent-dashboard";
import { getAgentDashboardApi } from "@/lib/api/agent";
import { useAuth } from "@/lib/auth/auth-context";

export default function AgentDashboardOverviewPage() {
  const { safeUser } = useAuth();
  const [overview, setOverview] = useState(mockAgentOverview);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadAgentData() {
      try {
        const res = await getAgentDashboardApi();
        if (res.success && res.stats) {
          setIsLive(true);
          setOverview((prev) => ({
            ...prev,
            stats: {
              totalShops: res.stats.organisations_registered || prev.stats.totalShops,
              activeShops: res.stats.organisations_registered || prev.stats.activeShops,
              expiredShops: prev.stats.expiredShops,
              totalEarningsNGN: Number(res.stats.total_earned) || prev.stats.totalEarningsNGN,
              availableBalanceNGN: Number(res.stats.available_balance) || prev.stats.availableBalanceNGN,
              pendingCommissionNGN: Number(res.stats.pending_commission) || prev.stats.pendingCommissionNGN,
            },
            profile: {
              ...prev.profile,
              referralCode: res.stats.referral_code || prev.profile.referralCode,
              firstName: safeUser?.firstName || prev.profile.firstName,
            },
          }));
        }
      } catch {
        // Fall back to baseline mockup if agent session is local
      }
    }

    loadAgentData();
  }, [safeUser]);

  const { profile, stats, commissions, renewals } = overview;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
            Welcome back, {safeUser?.firstName || profile.firstName}!
          </h1>
          <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
            Track your onboarding progress, active fleet performance, and commission stream.
          </p>
        </div>
        {isLive && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/20">
            Live Central Sync Active
          </span>
        )}
      </div>

      <div className="mt-6">
        <StatCards stats={stats} />
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <RecentCommissions items={commissions} />
        <div className="space-y-4 lg:space-y-6">
          <CriticalRenewals items={renewals} />
          <ReferAgentCard referralCode={profile.referralCode} />
        </div>
      </div>
    </main>
  );
}
