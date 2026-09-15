"use client";

import { useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import type {
  AdminLeaderboardPeriod,
  NetworkAgentEntry,
} from "@/lib/admin-dashboard";

const periods: Array<{ key: AdminLeaderboardPeriod; label: string }> = [
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "allTime", label: "All Time" },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <span className="inline-flex h-7 min-w-9 items-center justify-center rounded-full bg-[#faf3e3] px-2.5 text-xs font-bold whitespace-nowrap text-light-primary dark:bg-warning/15 dark:text-warning">
        #{rank}
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 min-w-9 items-center justify-center px-2.5 text-sm whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
      #{rank}
    </span>
  );
}

/*
 * Client island for the admin home page: network-wide agent rankings
 * with a period segmented control. Unlike the agent leaderboard there
 * is no current-user row — the admin oversees the whole network.
 */
export default function AdminLeaderboardTable({
  standings,
}: {
  standings: Record<AdminLeaderboardPeriod, NetworkAgentEntry[]>;
}) {
  const [period, setPeriod] = useState<AdminLeaderboardPeriod>("monthly");
  const rows = standings[period];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary">
            Top Performing Agents
          </h2>
          <p className="mt-1 text-sm text-light-secondary dark:text-ink-secondary">
            Monitor field performance across the country.
          </p>
        </div>
        <div
          role="group"
          aria-label="Leaderboard period"
          className="flex w-fit items-center gap-1 rounded-xl bg-foundation-base p-1"
        >
          {periods.map((p) => {
            const isActive = p.key === period;
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setPeriod(p.key)}
                className={`inline-flex h-9 items-center rounded-lg px-4 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-brand-deep font-semibold text-white dark:bg-brand-primary dark:text-foundation-base"
                    : "font-normal text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                {[
                  "Rank",
                  "Agent Name",
                  "Region",
                  "Onboarded",
                  "Active Shops",
                  "Renewal Rate",
                  "Cumulative Earnings",
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 font-medium first:pl-6 last:pr-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={`${period}-${row.rank}`}
                  className="border-b border-border last:border-0 dark:border-[#1e3a2b]"
                >
                  <td className="px-4 py-4 first:pl-6">
                    <RankBadge rank={row.rank} />
                  </td>
                  <th
                    scope="row"
                    className="px-4 py-4 whitespace-nowrap text-light-primary dark:text-ink-primary"
                  >
                    <span className="block font-bold">{row.agentName}</span>
                    <span className="mt-0.5 block text-xs font-normal text-light-muted">
                      {row.agentCode}
                    </span>
                  </th>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {row.region}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                    {row.onboarded}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                    {row.activeShops}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary tabular-nums dark:text-ink-secondary">
                    {row.renewalRatePct}%
                  </td>
                  <td className="px-4 py-4 font-bold whitespace-nowrap text-brand-primary tabular-nums last:pr-6">
                    {formatNGN(row.cumulativeEarningsNGN)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
