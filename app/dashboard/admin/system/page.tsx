import SystemDiagnosticsView from "../../../components/dashboard/SystemDiagnosticsView";

export const metadata = {
  title: "System Diagnostics — OjaTrack Admin",
  description:
    "Platform health, live microservices monitor, and kernel log journal.",
};

export default function AdminSystemPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <SystemDiagnosticsView />
    </main>
  );
}
