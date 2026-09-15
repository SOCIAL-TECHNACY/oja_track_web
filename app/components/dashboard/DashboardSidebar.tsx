import Link from "next/link";
import type { DashboardNavItem, DashboardUser } from "./types";

/*
 * Shared sidebar content for every dashboard type. Server-safe:
 * `active` is passed in from the shell (which derives it from
 * usePathname). Each dashboard type supplies its own nav items,
 * user, and home href.
 */
export default function DashboardSidebar({
  navItems,
  user,
  homeHref,
  homeLabel = "OjaTrack dashboard home",
  navAriaLabel = "Dashboard",
  active,
  onNavigate,
}: {
  navItems: DashboardNavItem[];
  user: DashboardUser;
  homeHref: string;
  homeLabel?: string;
  navAriaLabel?: string;
  active?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-6">
        <Link
          href={homeHref}
          aria-label={homeLabel}
          className="flex items-center gap-2 rounded-lg"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary text-base font-extrabold text-foundation-base"
          >
            O
          </span>
          <span className="text-lg font-extrabold tracking-tight text-light-primary dark:text-ink-primary">
            OjaTrack
          </span>
        </Link>
      </div>

      <nav aria-label={navAriaLabel} className="mt-6 flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = item.label === active;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
              className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                isActive
                  ? "bg-[#e6f4ea] font-semibold text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover"
                  : "font-normal text-light-secondary hover:bg-surface hover:text-light-primary dark:text-ink-secondary dark:hover:bg-foundation-elevated dark:hover:text-ink-primary"
              }`}
            >
              <span aria-hidden className={isActive ? "" : "opacity-80"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-1">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-deep text-xs font-bold text-white"
          >
            {user.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-light-primary dark:text-ink-primary">
              {user.name}
            </p>
            <p className="text-xs text-light-muted">{user.code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
