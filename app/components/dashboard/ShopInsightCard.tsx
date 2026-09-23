import { formatNGN } from "@/lib/agent-dashboard";
import type { ShopInsight } from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

/*
 * Expanded insight for the supervised shops page. Presentational —
 * `SupervisedRetailView` feeds it the currently selected shop's insight.
 */
export default function ShopInsightCard({ insight }: { insight: ShopInsight }) {
  return (
    <div className={card}>
      <h2 className="text-base font-bold text-light-primary dark:text-ink-primary">
        Expanded Insight
      </h2>

      <p className="mt-3 text-lg font-extrabold text-brand-primary">
        {insight.shopName}
      </p>
      <p className="mt-0.5 text-sm text-light-secondary dark:text-ink-secondary">
        {insight.location}
      </p>

      <div className="mt-4 border-t border-border pt-4 dark:border-[#1e3a2b]">
        <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
          Monthly Diagnostic
        </p>
        <dl className="mt-2 space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-light-secondary dark:text-ink-secondary">
              Active Sub Pack
            </dt>
            <dd className="font-bold text-light-primary dark:text-ink-primary">
              {insight.subPack}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-light-secondary dark:text-ink-secondary">
              Avg Ticket Size
            </dt>
            <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
              {formatNGN(insight.avgTicketNGN)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-light-secondary dark:text-ink-secondary">
              POS Terminals
            </dt>
            <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
              {insight.posTerminalsActive} Active
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-light-secondary dark:text-ink-secondary">
              Stock Items Tracked
            </dt>
            <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
              {insight.stockItemsTracked.toLocaleString()} Units
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 border-t border-border pt-4 dark:border-[#1e3a2b]">
        <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
          Inventory Status
        </p>
        <div
          className="mt-3 space-y-3"
          role="img"
          aria-label={`Inventory: ${insight.inventory.map((s) => s.label).join(", ")}`}
        >
          {insight.inventory.map((slice) => (
            <div key={slice.label}>
              <p className="text-[13px] text-light-secondary dark:text-ink-secondary">
                {slice.label}
              </p>
              <div
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-alt"
                role="progressbar"
                aria-valuenow={slice.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={slice.label}
              >
                <div
                  className={`h-full rounded-full ${slice.barClass}`}
                  style={{ width: `${slice.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
