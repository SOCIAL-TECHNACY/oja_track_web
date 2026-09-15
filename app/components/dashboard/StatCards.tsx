import { formatNGN, type AgentStats } from "@/lib/agent-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

export default function StatCards({ stats }: { stats: AgentStats }) {
  return (
    <div
      aria-label="Performance summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Total Shops Onboarded
        </p>
        <p className="mt-2 text-3xl font-bold text-brand-primary">
          {stats.totalShops}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          {stats.activeShops} Active, {stats.expiredShops} Expired
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Total Earnings
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(stats.totalEarningsNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Upfront + Recurring
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Available Balance
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(stats.availableBalanceNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Withdrawable instantly
        </p>
      </div>

      <div className={card}>
        <p className="text-sm text-light-secondary dark:text-ink-secondary">
          Pending Comm.
        </p>
        <p className="mt-2 text-3xl font-bold text-light-primary dark:text-ink-primary">
          {formatNGN(stats.pendingCommissionNGN)}
        </p>
        <p className="mt-2 text-sm text-light-secondary dark:text-ink-secondary">
          Onboard clearance
        </p>
      </div>
    </div>
  );
}
