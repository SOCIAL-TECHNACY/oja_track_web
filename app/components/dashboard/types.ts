/*
 * Shared dashboard chrome contract.
 * Every dashboard type (agent, admin, …) renders the same sidebar +
 * header through `DashboardShell`, differing only in the nav items,
 * user, titles, and home href it passes in. Page content stays
 * fully per-type.
 */

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface DashboardUser {
  name: string;
  code: string;
  initials: string;
}
