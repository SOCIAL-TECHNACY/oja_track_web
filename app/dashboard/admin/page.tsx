import AdminLeaderboardTable from "../../components/dashboard/AdminLeaderboardTable";
import { mockAdminLeaderboard } from "@/lib/admin-dashboard";

export const metadata = {
  title: "Agent Leaderboard — OjaTrack Admin",
  description:
    "Monitor agent performance across the country: onboardings, active shops, renewal rates, and earnings.",
};

export default function AdminDashboardHomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <AdminLeaderboardTable standings={mockAdminLeaderboard} />
    </main>
  );
}
