import LeaderboardTable from "../../../components/dashboard/LeaderboardTable";
import { mockLeaderboard } from "@/lib/agent-dashboard";

export const metadata = {
  title: "Agent Leaderboard — OjaTrack",
  description:
    "See how you rank against other OjaTrack field agents across the country.",
};

export default function AgentLeaderboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <LeaderboardTable standings={mockLeaderboard} />
    </main>
  );
}
