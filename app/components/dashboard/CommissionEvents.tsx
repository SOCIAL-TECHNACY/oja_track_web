import {
  formatCommissionDate,
  formatNGN,
  getCommissionRateLabel,
  type CommissionItem,
} from "@/lib/agent-dashboard";

export default function CommissionEvents({
  items,
}: {
  items: CommissionItem[];
}) {
  return (
    <section
      aria-labelledby="commission-events"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="commission-events"
        className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
      >
        Recent Commission Events
      </h2>

      {items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-8 text-center dark:border-[#1e3a2b]">
          <p className="text-sm font-medium text-light-secondary dark:text-ink-secondary">
            No commission events logged yet.
          </p>
          <p className="mt-1 text-xs text-light-secondary/70 dark:text-ink-secondary/70">
            Commissions will appear here when your onboarded shops log sales or complete subscription renewals.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 dark:border-[#1e3a2b]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-light-primary sm:text-[15px] dark:text-ink-primary">
                  {item.shopName}
                </p>
                <p className="mt-0.5 text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
                  {formatCommissionDate(item.dateISO)}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-3">
                <p className="text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
                  {getCommissionRateLabel(item.type)}
                </p>
                <span className="inline-flex h-7 items-center rounded-full bg-[#e6f4ea] px-3 text-xs font-semibold whitespace-nowrap text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover">
                  Completed
                </span>
                <p className="text-sm font-bold whitespace-nowrap text-brand-primary tabular-nums sm:text-base">
                  +{formatNGN(item.amountNGN)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
