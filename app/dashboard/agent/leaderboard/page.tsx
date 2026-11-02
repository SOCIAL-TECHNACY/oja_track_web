"use client";

import { useCallback, useEffect, useState } from "react";
import LeaderboardTable from "../../../components/dashboard/LeaderboardTable";
import type {
  LeaderboardEntry,
  LeaderboardPeriod,
} from "@/lib/agent-dashboard";
import { getAgentLeaderboardApi } from "@/lib/api/agent";
import { useAuth } from "@/lib/auth/auth-context";

export default function AgentLeaderboardPage() {
  const { safeUser } = useAuth();
  const [standings, setStandings] = useState<Record<LeaderboardPeriod, LeaderboardEntry[]>>({
    monthly: [],
    quarterly: [],
    allTime: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAgentLeaderboardApi();
      if (res && res.success && Array.isArray(res.leaderboard)) {
        const mapped: LeaderboardEntry[] = res.leaderboard.map((item, idx) => ({
          rank: idx + 1,
          agentName: item.agent_name || `Agent ${item.agent_code || idx + 1}`,
          isCurrentUser: Boolean(
            safeUser?.firstName &&
              item.agent_name?.toLowerCase().includes(safeUser.firstName.toLowerCase())
          ),
          onboarded: Number(item.onboarded) || 0,
          activeShops: Number(item.active_shops) || 0,
          renewalRatePct: 0,
          cumulativeEarningsNGN: Number(item.cumulative_earnings) || 0,
        }));

        setStandings({
          monthly: mapped,
          quarterly: mapped,
          allTime: mapped,
        });
      } else {
        setStandings({
          monthly: [],
          quarterly: [],
          allTime: [],
        });
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load national agent standings.");
      setStandings({
        monthly: [],
        quarterly: [],
        allTime: [],
      });
    } finally {
      setLoading(false);
    }
  }, [safeUser]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Error Alert */}
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
                Leaderboard Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadLeaderboard}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
      ) : (
        <LeaderboardTable standings={standings} />
      )}
    </main>
  );
}
