import { iconWrap } from "./agentNav";
import type { DashboardNavItem } from "./types";

/*
 * Admin dashboard navigation + header titles.
 * Passed into the shared `DashboardShell` by `app/dashboard/admin/layout.tsx`.
 * Home is the network-wide agents leaderboard, so there is no separate
 * Leaderboard item — Overview points at it.
 */

export const adminHomeHref = "/dashboard/admin";

export const adminNavItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: iconWrap(
      <path
        d="M3 10.5 10 3.5l7 7V16a1 1 0 0 1-1 1h-4.5v-4.5h-3V17H4a1 1 0 0 1-1-1v-5.5Z"
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
    label: "Renewals",
    href: "/dashboard/admin/renewals",
    icon: iconWrap(
      <path
        d="M16.5 10a6.5 6.5 0 1 1-1.9-4.6M16.5 3.5v3h-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />,
    ),
  },
  {
    label: "Payouts",
    href: "/dashboard/admin/payouts",
    icon: iconWrap(
      <>
        <rect
          x="2.5"
          y="5.5"
          width="15"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 8.5h.01M14 12.5h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>,
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
  Overview: "Agent Leaderboard",
  Agents: "Agents",
  Shops: "Shops",
  Renewals: "Renewals",
  Payouts: "Payouts",
  Settings: "Settings",
};
