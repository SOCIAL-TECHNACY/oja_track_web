import {
  formatCommissionDate,
  formatNGN,
  type PayoutRecord,
} from "@/lib/agent-dashboard";

export default function PayoutHistory({ items }: { items: PayoutRecord[] }) {
  return (
    <section
      aria-labelledby="payout-history"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="payout-history"
        className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
      >
        Recent Payout History
      </h2>

      {items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-8 text-center dark:border-[#1e3a2b]">
          <p className="text-sm font-medium text-light-secondary dark:text-ink-secondary">
            No payout requests recorded.
          </p>
          <p className="mt-1 text-xs text-light-secondary/70 dark:text-ink-secondary/70">
            Cleared commission withdrawals and disbursals will be recorded here.
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
                <p className="text-sm font-bold text-light-primary tabular-nums sm:text-[15px] dark:text-ink-primary">
                  {formatNGN(item.amountNGN)}
                </p>
                <p className="mt-0.5 text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
                  {formatCommissionDate(item.dateISO)} · Ref: {item.ref}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4 sm:gap-3">
                <p className="text-xs text-light-secondary sm:text-sm dark:text-ink-secondary">
                  {item.bankLabel}
                </p>
                <span className="inline-flex h-7 items-center rounded-full bg-[#e6f4ea] px-3 text-xs font-semibold whitespace-nowrap text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover">
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
