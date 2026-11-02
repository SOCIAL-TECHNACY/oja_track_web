"use client";

import DashboardShell from "../../components/dashboard/DashboardShell";
import {
  adminHomeHref,
  adminNavItems,
  adminTitles,
} from "../../components/dashboard/adminNav";
import { useAuth } from "@/lib/auth/auth-context";

export default function AdminShellWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { safeUser } = useAuth();

  const name = safeUser
    ? `${safeUser.firstName} ${safeUser.lastName}`.trim()
    : "Platform Administrator";
  const initials = safeUser
    ? `${safeUser.firstName?.[0] || ""}${safeUser.lastName?.[0] || ""}`.toUpperCase() || "SA"
    : "SA";
  const code = "SUPER-ADMIN";

  const user = {
    name,
    code,
    initials,
    role: "Platform Super Admin",
  };

  return (
    <DashboardShell
      navItems={adminNavItems}
      user={user}
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
