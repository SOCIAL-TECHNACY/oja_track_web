import ShopsTable from "../../../components/dashboard/ShopsTable";
import { mockOnboardedShops } from "@/lib/agent-dashboard";

export const metadata = {
  title: "My Shops — OjaTrack",
  description:
    "View and manage all shops you have onboarded onto OjaTrack.",
};

export default function AgentShopsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <ShopsTable shops={mockOnboardedShops} />
    </main>
  );
}
