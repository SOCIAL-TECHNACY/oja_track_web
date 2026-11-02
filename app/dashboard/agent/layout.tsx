"use client";

import DashboardShell from "../../components/dashboard/DashboardShell";
import {
  agentHomeHref,
  agentNavItems,
  agentTitles,
} from "../../components/dashboard/agentNav";
import { useAuth } from "@/lib/auth/auth-context";

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { safeUser } = useAuth();

  const name = safeUser
    ? `${safeUser.firstName} ${safeUser.lastName}`.trim()
    : "Operations Agent";
  const initials = safeUser
    ? `${safeUser.firstName?.[0] || ""}${safeUser.lastName?.[0] || ""}`.toUpperCase() || "AG"
    : "AG";
  const code = safeUser?.id
    ? `AG-${safeUser.id.slice(0, 6).toUpperCase()}`
    : "AG-ACTIVE";

  const user = {
    name,
    code,
    initials,
    role: "Field Operations Agent",
  };

  return (
    <DashboardShell
      navItems={agentNavItems}
      user={user}
      titles={agentTitles}
      defaultTitle="Dashboard Overview"
      homeHref={agentHomeHref}
      homeLabel="OjaTrack agent dashboard home"
      navAriaLabel="Agent"
    >
      {children}
    </DashboardShell>
  );
}
