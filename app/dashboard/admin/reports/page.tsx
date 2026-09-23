import ReportsHubView from "../../../components/dashboard/ReportsHubView";

export const metadata = {
  title: "Analytics & Reports Hub — OjaTrack Admin",
  description:
    "Network revenue analytics, regional distribution, and report exports.",
};

export default function AdminReportsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <ReportsHubView />
    </main>
  );
}
