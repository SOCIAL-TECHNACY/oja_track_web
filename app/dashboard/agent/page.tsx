import CriticalRenewals from "../../components/dashboard/CriticalRenewals";
import RecentCommissions from "../../components/dashboard/RecentCommissions";
import ReferAgentCard from "../../components/dashboard/ReferAgentCard";
import StatCards from "../../components/dashboard/StatCards";
import { mockAgentOverview } from "@/lib/agent-dashboard";

export const metadata = {
  title: "Agent Dashboard — OjaTrack",
  description:
    "Track your onboarding progress, active fleet performance, and commission stream.",
};

export default function AgentDashboardOverviewPage() {
  const { profile, stats, commissions, renewals } = mockAgentOverview;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <p className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
        Welcome back, {profile.firstName}!
      </p>
      <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
        Track your onboarding progress, active fleet performance, and commission
        stream.
      </p>

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
