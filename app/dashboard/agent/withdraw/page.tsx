import BalanceWallet from "../../../components/dashboard/BalanceWallet";
import PayoutForm from "../../../components/dashboard/PayoutForm";
import PayoutHistory from "../../../components/dashboard/PayoutHistory";
import {
  mockAgentOverview,
  mockPayoutHistory,
} from "@/lib/agent-dashboard";

export const metadata = {
  title: "Withdraw Earnings — OjaTrack",
  description:
    "Request payouts of your agent earnings directly to your bank via Nigerian Instant Payment.",
};

export default function AgentWithdrawPage() {
  const balanceNGN = mockAgentOverview.stats.availableBalanceNGN;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <PayoutForm balanceNGN={balanceNGN} />
        <BalanceWallet balanceNGN={balanceNGN} />
      </div>

      <div className="mt-6">
        <PayoutHistory items={mockPayoutHistory} />
      </div>
    </main>
  );
}
