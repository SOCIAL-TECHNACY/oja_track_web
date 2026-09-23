import CommissionEngineView from "../../../components/dashboard/CommissionEngineView";

export const metadata = {
  title: "Field Force Comm Engine — OjaTrack Admin",
  description:
    "Commission accruals, payouts, and rule matrix across the field force.",
};

export default function AdminCommissionsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <CommissionEngineView />
    </main>
  );
}
