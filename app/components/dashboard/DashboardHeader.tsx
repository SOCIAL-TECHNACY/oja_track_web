"use client";

import ThemeToggle from "../ui/ThemeToggle";

/*
 * Dashboard top bar: mobile menu + title on the left, theme toggle
 * centered (desktop), commission pill + notifications on the right.
 */
export default function DashboardHeader({
  title = "Dashboard Overview",
  onMenuClick,
}: {
  title?: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            className="rounded-lg border border-border p-2 text-light-primary lg:hidden dark:text-ink-primary"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="truncate text-lg font-bold text-light-primary sm:text-xl dark:text-ink-primary">
            {title}
          </h1>
        </div>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-2 rounded-lg bg-[#e6f4ea] px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-light-primary sm:inline-flex dark:bg-brand-primary/15 dark:text-brand-hover">
            40% Upfront
            <span aria-hidden className="font-normal opacity-60">
              |
            </span>
            20% Recurring
          </span>
          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-light-primary transition-colors hover:bg-surface dark:text-ink-primary"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M10 2.5a5 5 0 0 0-5 5v2.6L3.6 12a.6.6 0 0 0 .5.9h11.8a.6.6 0 0 0 .5-.9L15 10.1V7.5a5 5 0 0 0-5-5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M8 15.5a2 2 0 0 0 4 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile second row: theme toggle + commission pill */}
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 md:hidden">
        <ThemeToggle />
        <span className="inline-flex items-center gap-2 rounded-lg bg-[#e6f4ea] px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover">
          40% Upfront
          <span aria-hidden className="font-normal opacity-60">
            |
          </span>
          20% Recurring
        </span>
      </div>
    </header>
  );
}
