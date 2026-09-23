import AgentControlCenter from "../../../components/dashboard/AgentControlCenter";
import { mockVerifiedAgents } from "@/lib/admin-dashboard";

export const metadata = {
  title: "Agent Control Center — OjaTrack Admin",
  description:
    "Verified agent directory and inspection: status, shops, earnings, and compliance actions.",
};

export default function AdminAgentsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <AgentControlCenter agents={mockVerifiedAgents} />
    </main>
  );
}
