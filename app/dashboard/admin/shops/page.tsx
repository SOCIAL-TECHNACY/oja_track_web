import SupervisedRetailView from "../../../components/dashboard/SupervisedRetailView";
import { mockSupervisedShops } from "@/lib/admin-dashboard";

export const metadata = {
  title: "Supervised Retail Locations — OjaTrack Admin",
  description:
    "Supervised retail locations: status tabs, network-wide shops, revenue, and expanded insight.",
};

export default function AdminShopsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <SupervisedRetailView shops={mockSupervisedShops} />
    </main>
  );
}
