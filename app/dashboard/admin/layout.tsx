import AdminShellWrapper from "./AdminShellWrapper";

export const metadata = {
  title: "Operational Command Center — OjaTrack Admin",
  description:
    "Network-wide shops, agents, revenue, renewals, and system health.",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShellWrapper>{children}</AdminShellWrapper>;
}
