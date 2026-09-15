import type { DashboardNavItem } from "./types";

/*
 * Agent dashboard navigation + header titles.
 * Passed into the shared `DashboardShell` by `app/dashboard/agent/layout.tsx`.
 */

export function iconWrap(path: React.ReactNode) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {path}
    </svg>
  );
}

export const agentHomeHref = "/dashboard/agent";

export const agentNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/agent",
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
    label: "My Shops",
    href: "/dashboard/agent/shops",
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
    href: "/dashboard/agent/renewals",
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
    label: "Earnings",
    href: "/dashboard/agent/earnings",
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
    label: "Withdraw",
    href: "/dashboard/agent/withdraw",
    icon: iconWrap(
      <>
        <rect
          x="2.5"
          y="4.5"
          width="15"
          height="11"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 13.5h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>,
    ),
  },
  {
    label: "Leaderboard",
    href: "/dashboard/agent/leaderboard",
    icon: iconWrap(
      <>
        <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.5 11.5 7.5 17l2.5-1.2L12.5 17l-1-5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </>,
    ),
  },
];

export const agentTitles: Record<string, string> = {
  Dashboard: "Dashboard Overview",
  "My Shops": "My Onboarded Shops",
  Renewals: "Manage Renewals",
  Earnings: "My Earnings",
  Withdraw: "Withdraw Earnings",
  Leaderboard: "Agent Leaderboard",
};
