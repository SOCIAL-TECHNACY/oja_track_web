import {
  formatCommissionDate,
  formatNGN,
  getRenewalCommission,
  getRenewalStatus,
  type ShopRenewal,
} from "@/lib/agent-dashboard";

function DaysLeftPill({ renewal }: { renewal: ShopRenewal }) {
  const status = getRenewalStatus(renewal);
  if (status === "expired") {
    return (
      <span className="inline-flex h-7 items-center rounded-full bg-danger/10 px-3 text-xs font-semibold whitespace-nowrap text-danger dark:bg-danger/15">
        Expired
      </span>
    );
  }
  const cls =
    status === "expiring"
      ? "bg-[#fdf0d0] text-[#8a5a00] dark:bg-warning/15 dark:text-warning"
      : "bg-[#e6f4ea] text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover";
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${cls}`}
    >
      {renewal.daysLeft} Days Left
    </span>
  );
}

/*
 * Single renewal card matching the Manage Renewals screenshot:
 * shop + owner, due date + days-left pill, cost/commission rows,
 * Call Owner (outline) + Send Alert (green) actions.
 * Buttons are inert placeholders (title="Coming soon") until the
 * call/alert flows are built.
 */
export default function RenewalCard({ renewal }: { renewal: ShopRenewal }) {
  return (
    <li className="rounded-2xl border border-border bg-white p-5 shadow-[0_2px_12px_rgba(16,24,20,0.08)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <p className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary">
        {renewal.shopName}
      </p>
      <p className="mt-1 text-sm text-light-secondary dark:text-ink-secondary">
        Owner: {renewal.owner}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          {getRenewalStatus(renewal) === "expired" ? (
            <>Expired {formatCommissionDate(renewal.dueDateISO)}</>
          ) : (
            <>Due {formatCommissionDate(renewal.dueDateISO)}</>
          )}
        </p>
        <DaysLeftPill renewal={renewal} />
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm dark:border-[#1e3a2b]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-light-secondary dark:text-ink-secondary">
            Subscription Cost
          </p>
          <p className="font-bold whitespace-nowrap text-light-primary tabular-nums dark:text-ink-primary">
            {formatNGN(renewal.subscriptionCostNGN)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-light-secondary dark:text-ink-secondary">
            Your Commission (20%)
          </p>
          <p className="font-bold whitespace-nowrap text-brand-primary tabular-nums">
            {formatNGN(getRenewalCommission(renewal.subscriptionCostNGN))}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row dark:border-[#1e3a2b]">
        <button
          type="button"
          aria-disabled="true"
          title="Coming soon"
          className="inline-flex h-12 flex-[3] items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-light-primary transition-colors hover:bg-surface sm:h-[52px] dark:bg-transparent dark:text-ink-primary dark:hover:bg-foundation-elevated"
        >
          Call Owner
        </button>
        <button
          type="button"
          aria-disabled="true"
          title="Coming soon"
          className="inline-flex h-12 flex-[2] items-center justify-center rounded-lg bg-brand-primary px-5 text-sm font-semibold text-white transition-colors hover:brightness-95 sm:h-[52px]"
        >
          Send Alert
        </button>
      </div>
    </li>
  );
}
