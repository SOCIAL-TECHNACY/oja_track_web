import SystemConfigurationView from "../../../components/dashboard/SystemConfigurationView";

export const metadata = {
  title: "System Configuration — OjaTrack Admin",
  description:
    "Commission rules, subscription pricing, notifications, gateway, and admin users.",
};

export default function AdminSettingsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <SystemConfigurationView />
    </main>
  );
}
