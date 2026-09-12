/*
 * Figma: section-navigation (10:3930)
 * Sidebar states (180x41, r8), segment tabs, mobile bottom nav.
 * Server-rendered with `active` props so the preview page stays
 * a Server Component; interactive routes can lift state up.
 */

export function SidebarItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-[41px] w-[180px] items-center gap-2 rounded-lg px-3 text-sm ${
        active
          ? "bg-brand-primary font-semibold text-foundation-base"
          : "bg-white font-normal text-light-secondary hover:bg-surface hover:text-light-primary dark:bg-transparent"
      }`}
    >
      <span aria-hidden className="inline-block h-4 w-4 rounded-sm bg-current opacity-40" />
      {label}
    </span>
  );
}

const tabs = ["Overview", "Shipment Analytics", "Dispatch Operators", "Settings"];

export function SegmentedTabs({ active = 0 }: { active?: number }) {
  return (
    <div className="flex w-full gap-1 rounded-xl bg-surface p-1">
      {tabs.map((t, i) => (
        <span
          key={t}
          className={`flex h-9 flex-1 items-center justify-center rounded-lg px-2 text-[13px] font-semibold whitespace-nowrap ${
            i === active
              ? "bg-brand-primary text-foundation-base"
              : "bg-white text-light-secondary dark:bg-transparent"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const bottomItems: Array<{ label: string; active?: boolean }> = [
  { label: "Home", active: true },
  { label: "Map" },
  { label: "Earnings" },
  { label: "Alerts" },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile"
      className="flex w-full items-center justify-around rounded-xl bg-surface px-4 py-2"
    >
      {bottomItems.map((item) => (
        <span key={item.label} className="flex flex-col items-center gap-1 py-1">
          <span
            aria-hidden
            className={`h-5 w-5 rounded-md ${item.active ? "bg-brand-primary" : "bg-light-muted opacity-50"}`}
          />
          <span
            className={`text-[10px] font-semibold ${item.active ? "text-brand-primary" : "text-light-muted"}`}
          >
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
