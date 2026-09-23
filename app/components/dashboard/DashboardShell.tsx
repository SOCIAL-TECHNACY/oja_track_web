"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import type { DashboardNavItem, DashboardUser } from "./types";

function activeFromPath(
  navItems: DashboardNavItem[],
  pathname: string,
): string | undefined {
  const sorted = [...navItems].sort((a, b) => b.href.length - a.href.length);
  const match = sorted.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label;
}

/*
 * Shared responsive shell for every dashboard type (agent, admin, …).
 * Desktop: fixed sidebar. Mobile: hamburger opens a 260px drawer
 * (Escape + backdrop close). Each dashboard type's layout passes its
 * own nav items, user, titles, and home href; page content stays
 * fully per-type.
 *
 * Example (future type):
 *   <DashboardShell navItems={shopNavItems} user={shopUser}
 *     titles={shopTitles} defaultTitle="Shop Overview" homeHref="/dashboard/shop">
 */
export default function DashboardShell({
  navItems,
  user,
  titles,
  defaultTitle,
  homeHref,
  homeLabel,
  navAriaLabel,
  title,
  variant = "agent",
  eyebrow,
  children,
}: {
  navItems: DashboardNavItem[];
  user: DashboardUser;
  titles: Record<string, string>;
  defaultTitle: string;
  homeHref: string;
  homeLabel?: string;
  navAriaLabel?: string;
  /** Explicit override — otherwise resolved from the active nav item. */
  title?: string;
  variant?: "agent" | "admin";
  eyebrow?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = activeFromPath(navItems, pathname ?? homeHref);
  const resolvedTitle = title ?? (active ? titles[active] : undefined) ?? defaultTitle;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <div className="flex min-h-screen bg-[#fbfcfc] dark:bg-foundation-base">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-border bg-white lg:block dark:bg-foundation-secondary">
        <DashboardSidebar
          navItems={navItems}
          user={user}
          homeHref={homeHref}
          homeLabel={homeLabel}
          navAriaLabel={navAriaLabel}
          active={active}
          eyebrow={eyebrow}
        />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-foundation-base/60 lg:hidden"
          onClick={close}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={navAriaLabel ?? "Dashboard navigation"}
            onClick={(e) => e.stopPropagation()}
            className="h-full w-[260px] bg-white shadow-[0_0_16px_rgba(7,16,12,0.25)] dark:bg-foundation-secondary"
          >
            <DashboardSidebar
              navItems={navItems}
              user={user}
              homeHref={homeHref}
              homeLabel={homeLabel}
              navAriaLabel={navAriaLabel}
              active={active}
              onNavigate={close}
              eyebrow={eyebrow}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          title={resolvedTitle}
          onMenuClick={() => setOpen(true)}
          variant={variant}
        />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
