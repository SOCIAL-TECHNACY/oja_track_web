import Button from "./Button";

/*
 * Figma: extended-components > Section 8 — Empty States (15:3278)
 * No-shops, offline, and reconnecting presets. Server-safe.
 */
const shell =
  "flex w-full flex-col items-center rounded-2xl border border-border bg-white px-6 py-10 text-center dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export function NoResultsState({ onClear }: { onClear?: () => void }) {
  return (
    <div className={shell}>
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#9AA7A0" strokeWidth="1.5" />
          <path
            d="m13.5 13.5 3 3"
            stroke="#9AA7A0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="mt-3 text-base font-semibold text-light-primary dark:text-ink-primary">
        No shops found
      </p>
      <p className="mt-1 max-w-xs text-[13px] text-light-secondary">
        Try adjusting your search or filters to locate a specific shop profile.
      </p>
      <Button variant="secondary" className="mt-4 min-w-0" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
}

export function OfflineState() {
  return (
    <div className={shell}>
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 3l14 14M9.5 5.5A6 6 0 0 1 15 8M6 8a6 6 0 0 1 2-1.2M10 12.5h.01"
            stroke="#9AA7A0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="mt-3 text-base font-semibold text-light-primary dark:text-ink-primary">
        You are offline
      </p>
      <p className="mt-1 max-w-xs text-[13px] text-light-secondary">
        Changes will sync when connection is restored. Offline actions are saved
        locally.
      </p>
    </div>
  );
}

export function ReconnectingState() {
  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-light-secondary">
      <span
        aria-hidden
        className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-brand-primary"
      />
      Reconnecting...
    </div>
  );
}
