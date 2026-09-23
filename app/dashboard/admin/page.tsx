import { AdminTopStats, AdminMoneyStats } from "../../components/dashboard/AdminStatCards";
import {
  ShopGrowthChart,
  GrossRevenueBarChart,
  RenewalsSplitDonut,
} from "../../components/dashboard/AdminCharts";
import {
  NetworkEvents,
  OperationalHealth,
} from "../../components/dashboard/AdminPanels";
import {
  mockAdminOverview,
  mockShopGrowth12m,
  mockGrossRevenue6m,
  mockNetworkEvents,
  mockOperationalHealth,
} from "@/lib/admin-dashboard";

export const metadata = {
  title: "Operational Command Center — OjaTrack Admin",
  description:
    "Network-wide shops, agents, revenue, renewals, and system health.",
};

export default function AdminDashboardHomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="sr-only">
        <h2>Operational Command Center</h2>
      </div>

      <AdminTopStats stats={mockAdminOverview} />

      <div className="mt-4">
        <AdminMoneyStats stats={mockAdminOverview} />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_1.2fr_0.9fr]">
        <ShopGrowthChart series={mockShopGrowth12m} />
        <GrossRevenueBarChart rows={mockGrossRevenue6m} />
        <RenewalsSplitDonut />
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <NetworkEvents events={mockNetworkEvents} />
        <OperationalHealth services={mockOperationalHealth} />
      </div>
    </main>
  );
}
