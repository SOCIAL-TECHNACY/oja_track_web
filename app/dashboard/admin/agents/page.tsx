"use client";

import { useCallback, useEffect, useState } from "react";
import AgentControlCenter from "../../../components/dashboard/AgentControlCenter";
import type { VerifiedAgent } from "@/lib/admin-dashboard";
import { getPlatformAgentsApi } from "@/lib/api/platform";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<VerifiedAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPlatformAgentsApi();
      if (res && res.success && Array.isArray(res.agents)) {
        const mapped: VerifiedAgent[] = res.agents.map((a) => {
          const firstName = a.user?.firstName || "Agent";
          const lastName = a.user?.lastName || "";
          const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AG";
          return {
            id: a.agentCode || a.id,
            name: `${firstName} ${lastName}`.trim(),
            initials,
            location: "Nigeria",
            status: a.user?.status === "ACTIVE" ? "ACTIVE" : a.user?.status === "SUSPENDED" ? "SUSPENDED" : "PENDING",
            shopsTotal: a._count?.referrals || 0,
            shopsActive: a._count?.referrals || 0,
            totalEarnedNGN: Number(a.wallet?.lifetimeEarned) || 0,
            joined: a.createdAt
              ? new Date(a.createdAt).toLocaleDateString("en-NG", { month: "short", year: "numeric" })
              : "Recent",
            commissionBalanceNGN: Number(a.wallet?.availableBalance) || 0,
            onboardedRetailers: a._count?.referrals || 0,
            ratingOutOf5: 5.0,
          };
        });
        setAgents(mapped);
      } else {
        setAgents([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load agent directory from platform server.");
      setAgents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
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
                Agent Directory Sync Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadAgents}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
      ) : (
        <AgentControlCenter agents={agents} />
      )}
    </main>
  );
}
