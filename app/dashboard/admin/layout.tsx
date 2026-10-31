import DashboardShell from "../../components/dashboard/DashboardShell";
import {
  adminHomeHref,
  adminNavItems,
  adminTitles,
} from "../../components/dashboard/adminNav";
import { mockAdminUser } from "@/lib/admin-dashboard";

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
  return (
    <DashboardShell
      navItems={adminNavItems}
      user={mockAdminUser}
      titles={adminTitles}
      defaultTitle="Operational Command Center"
      homeHref={adminHomeHref}
      homeLabel="OjaTrack admin dashboard home"
      navAriaLabel="Admin"
      variant="admin"
      eyebrow="Super Admin"
    >
      {children}
    </DashboardShell>
  );
}
