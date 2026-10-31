"use client";

import { useEffect, useState } from "react";
import LeaderboardTable from "../../../components/dashboard/LeaderboardTable";
import {
  mockLeaderboard,
  type LeaderboardEntry,
  type LeaderboardPeriod,
} from "@/lib/agent-dashboard";
import { getAgentLeaderboardApi } from "@/lib/api/agent";
import { useAuth } from "@/lib/auth/auth-context";

export default function AgentLeaderboardPage() {
  const { safeUser } = useAuth();
  const [standings, setStandings] = useState<Record<LeaderboardPeriod, LeaderboardEntry[]>>(mockLeaderboard);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await getAgentLeaderboardApi();
        if (res.success && res.leaderboard && res.leaderboard.length > 0) {
          const mapped: LeaderboardEntry[] = res.leaderboard.map((item, idx) => ({
            rank: idx + 1,
            agentName: item.agent_name || `Agent ${item.agent_code}`,
            isCurrentUser: Boolean(
              safeUser?.firstName &&
                item.agent_name?.toLowerCase().includes(safeUser.firstName.toLowerCase())
            ),
            onboarded: item.onboarded || 10,
            activeShops: item.active_shops || 8,
            renewalRatePct: 94,
            cumulativeEarningsNGN: Number(item.cumulative_earnings) || 150000,
          }));

          setStandings({
            monthly: mapped,
            quarterly: mapped,
            allTime: mapped,
          });
        }
      } catch {
        // Fall back gracefully to mockLeaderboard
      }
    }
    loadLeaderboard();
  }, [safeUser]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <LeaderboardTable standings={standings} />
    </main>
  );
}
