import RenewalsList from "../../../components/dashboard/RenewalsList";
import { mockShopRenewals } from "@/lib/agent-dashboard";

export const metadata = {
  title: "Manage Renewals — OjaTrack",
  description:
    "Follow up on shop subscriptions due for renewal and protect your recurring commission.",
};

export default function AgentRenewalsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <RenewalsList renewals={mockShopRenewals} />
    </main>
  );
}
