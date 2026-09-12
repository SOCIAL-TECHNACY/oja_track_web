"use client";

import { useEffect } from "react";

/*
 * Figma: extended-components > Section 4 — Drawer / Side Panel (15:3083)
 * Standard mobile drawer, 260px wide. Active fill #00E676 at 10%,
 * blur-16 25% elevation shadow, 12px Inter medium list items.
 * Controlled: `open` + `onOpenChange`. Escape + backdrop close.
 */
const navItems = [
  "Dashboard",
  "My Shops",
  "Renewals",
  "Earnings",
  "Withdraw",
  "Leaderboard",
  "Settings",
  "Logout",
];

export function AgentNavContent({ active = "Dashboard" }: { active?: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-deep text-xs font-bold text-white">
          CE
        </span>
        <div>
          <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
            Chidi Eze
          </p>
          <p className="text-[11px] text-light-muted">AG-EME123</p>
        </div>
      </div>
      <nav aria-label="Agent" className="mt-5 flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = item === active;
          return (
            <span
              key={item}
              className={`flex h-9 items-center rounded-lg px-3 text-xs font-medium ${
                isActive
                  ? "bg-brand-primary/10 text-brand-deep dark:text-brand-hover"
                  : "text-light-secondary hover:bg-surface"
              }`}
            >
              {item}
            </span>
          );
        })}
      </nav>
    </div>
  );
}

export default function Drawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-foundation-base/60"
      onClick={() => onOpenChange(false)}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Agent navigation"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-[260px] bg-white pb-6 shadow-[0_0_16px_rgba(7,16,12,0.25)] dark:bg-foundation-secondary"
      >
        <AgentNavContent />
      </aside>
    </div>
  );
}
