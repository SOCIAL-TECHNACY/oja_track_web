import SubscriptionManagementView from "../../../components/dashboard/SubscriptionManagementView";

export const metadata = {
  title: "Subscription Management — OjaTrack Admin",
  description:
    "Subscription plans, renewals, revenue, and status across the network.",
};

export default function AdminSubscriptionsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <SubscriptionManagementView />
    </main>
  );
}
