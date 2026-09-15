import CommissionEvents from "../../../components/dashboard/CommissionEvents";
import EarningsStatCards from "../../../components/dashboard/EarningsStatCards";
import RevenueChart from "../../../components/dashboard/RevenueChart";
import SplitBreakdown from "../../../components/dashboard/SplitBreakdown";
import {
  mockAgentOverview,
  mockEarningSplit,
  mockEarningsSummary,
  mockMonthlyRevenue,
} from "@/lib/agent-dashboard";

export const metadata = {
  title: "My Earnings — OjaTrack",
  description:
    "Track your cumulative earnings, monthly revenue growth, and commission breakdown.",
};

export default function AgentEarningsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <EarningsStatCards summary={mockEarningsSummary} />

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <RevenueChart data={mockMonthlyRevenue} />
        <SplitBreakdown splits={mockEarningSplit} />
      </div>

      <div className="mt-6">
        <CommissionEvents items={mockAgentOverview.commissions} />
      </div>
    </main>
  );
}
