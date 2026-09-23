import { iconWrap } from "./agentNav";
import type { DashboardNavItem } from "./types";

/*
 * Admin dashboard navigation + header titles.
 * Passed into the shared `DashboardShell` by `app/dashboard/admin/layout.tsx`.
 * Super-admin IA (Operational Command Center) — intentionally distinct
 * from the agent IA. Do not mirror agentNav here.
 */

export const adminHomeHref = "/dashboard/admin";

export const adminNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: iconWrap(
      <path
        d="M3 3.5h4.5v4.5H3v-4.5ZM12.5 3.5H17V8h-4.5V3.5ZM3 12.5h4.5V17H3v-4.5ZM12.5 12.5H17V17h-4.5v-4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />,
    ),
  },
  {
    label: "Agents",
    href: "/dashboard/admin/agents",
    icon: iconWrap(
      <>
        <circle cx="7.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2.5 16.5c.6-3 2.7-4.5 5-4.5s4.4 1.5 5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="14.5" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14.5 12.2c2 .2 3.4 1.5 3.9 3.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "Shops",
    href: "/dashboard/admin/shops",
    icon: iconWrap(
      <>
        <path
          d="M3.5 7.5 4.8 3.8c.1-.3.4-.5.7-.5h9c.3 0 .6.2.7.5l1.3 3.7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3.5 7.5h13V9a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-3-2.4V7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M5 11v5.5h10V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </>,
    ),
  },
  {
    label: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: iconWrap(
      <>
        <rect
          x="2.5"
          y="3.5"
          width="15"
          height="13"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2.5 7.5h15M7 11h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "Commissions",
    href: "/dashboard/admin/commissions",
    icon: iconWrap(
      <>
        <circle cx="7" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13.5" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 9.5h.01M12.5 15.5h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "Withdrawals",
    href: "/dashboard/admin/withdrawals",
    icon: iconWrap(
      <>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6.5v7M7.5 10h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: iconWrap(
      <>
        <path
          d="M5 3.5h7l3 3v10H5v-13Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.5v3h3M8 11.5h4M8 14h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "System",
    href: "/dashboard/admin/system",
    icon: iconWrap(
      <path
        d="M10 2.5 3 5.5v5c0 4 3 6.8 7 7.5 4-.7 7-3.5 7-7.5v-5l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />,
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon: iconWrap(
      <>
        <path
          d="M3 6.5h6M13 6.5h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="11" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 13.5h2M9 13.5h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="7" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      </>,
    ),
  },
];

export const adminTitles: Record<string, string> = {
  Dashboard: "Operational Command Center",
  Agents: "Agent Control Center",
  Shops: "Supervised Retail Locations",
  Subscriptions: "Subscription Management",
  Commissions: "Field Force Comm Engine",
  Withdrawals: "Withdrawal Clearance Terminal",
  Reports: "Analytics & Reports Hub",
  System: "System Diagnostics",
  Settings: "System Configuration",
};
