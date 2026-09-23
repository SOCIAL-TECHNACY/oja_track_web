"use client";

import ThemeToggle from "../ui/ThemeToggle";

/*
 * Dashboard top bar: mobile menu + title on the left, theme toggle
 * centered (desktop), commission pill + notifications on the right.
 * variant="admin" renders the Operational Command Center chrome:
 * LIVE SYSTEM pill, system search, bell + modules buttons.
 */
export default function DashboardHeader({
  title = "Dashboard Overview",
  onMenuClick,
  variant = "agent",
}: {
  title?: string;
  onMenuClick: () => void;
  variant?: "agent" | "admin";
}) {
  const isAdmin = variant === "admin";

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
          {isAdmin ? (
            <span className="hidden items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 text-[11px] font-bold tracking-wide whitespace-nowrap text-brand-deep sm:inline-flex dark:bg-brand-primary/15 dark:text-brand-hover">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              LIVE SYSTEM
            </span>
          ) : null}
        </div>

        {isAdmin ? (
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <label className="relative hidden min-w-0 flex-1 md:block lg:w-[320px]">
              <span className="sr-only">Search systems, transactions, entities</span>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-light-muted"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="m11.5 11.5 2.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search systems, transactions, entities..."
                className="h-10 w-full rounded-xl border border-border bg-white pr-3 pl-9 text-sm text-light-primary outline-none placeholder:text-light-muted focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-primary"
              />
            </label>
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-light-primary transition-colors hover:bg-surface dark:text-ink-primary"
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
            <button
              type="button"
              aria-label="System modules"
              title="System modules"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-light-primary transition-colors hover:bg-surface sm:flex dark:text-ink-primary"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="12" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="12" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="12" y="12" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <span className="shrink-0">
              <ThemeToggle />
            </span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Mobile second row */}
      {isAdmin ? (
        <div className="border-t border-border px-4 py-2 md:hidden">
          <label className="relative block">
            <span className="sr-only">Search systems, transactions, entities</span>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-light-muted"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="m11.5 11.5 2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search systems, transactions, entities..."
              className="h-10 w-full rounded-xl border border-border bg-white pr-3 pl-9 text-sm outline-none placeholder:text-light-muted focus:border-brand-primary dark:bg-foundation-secondary"
            />
          </label>
        </div>
      ) : (
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
      )}
    </header>
  );
}
