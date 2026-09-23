import {
  formatCompactNGN,
  formatCount,
  type AdminPlatformStats,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

function Stat({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub: string;
  valueClass: string;
}) {
  return (
    <div className={card}>
      <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-extrabold tabular-nums ${valueClass}`}>
        {value}
      </p>
      <p className="mt-2 text-[13px] text-light-secondary dark:text-ink-secondary">
        {sub}
      </p>
    </div>
  );
}

/*
 * Operational Command Center stat grids. Two rows to mirror Figma:
 * 6 platform cards + 4 money/liability cards. Server-safe.
 */
export function AdminTopStats({ stats }: { stats: AdminPlatformStats }) {
  return (
    <div
      aria-label="Platform summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
    >
      <Stat
        label="Total Shops"
        value={formatCount(stats.totalShops)}
        sub={stats.totalShopsSub}
        valueClass="text-brand-gold"
      />
      <Stat
        label="Active Shops"
        value={formatCount(stats.activeShops)}
        sub={stats.activeShopsSub}
        valueClass="text-brand-primary"
      />
      <Stat
        label="New This Month"
        value={formatCount(stats.newThisMonth)}
        sub={stats.newThisMonthSub}
        valueClass="text-info"
      />
      <Stat
        label="Total Agents"
        value={formatCount(stats.totalAgents)}
        sub={stats.totalAgentsSub}
        valueClass="text-light-primary dark:text-ink-primary"
      />
      <Stat
        label="Active Agents"
        value={formatCount(stats.activeAgents)}
        sub={stats.activeAgentsSub}
        valueClass="text-light-primary dark:text-ink-primary"
      />
      <Stat
        label="Monthly Revenue"
        value={formatCompactNGN(stats.monthlyRevenueNGN)}
        sub={stats.monthlyRevenueSub}
        valueClass="text-brand-primary"
      />
    </div>
  );
}

export function AdminMoneyStats({ stats }: { stats: AdminPlatformStats }) {
  return (
    <div
      aria-label="Revenue and liability summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <Stat
        label="Subscription Revenue"
        value={formatCompactNGN(stats.subscriptionRevenueNGN)}
        sub={stats.subscriptionRevenueSub}
        valueClass="text-info"
      />
      <Stat
        label="Commission Liability"
        value={formatCompactNGN(stats.commissionLiabilityNGN)}
        sub={stats.commissionLiabilitySub}
        valueClass="text-brand-gold"
      />
      <Stat
        label="Pending Withdrawals"
        value={formatCompactNGN(stats.pendingWithdrawalsNGN)}
        sub={stats.pendingWithdrawalsSub}
        valueClass="text-light-primary dark:text-ink-primary"
      />
      <Stat
        label="Renewals Due (30D)"
        value={formatCount(stats.renewalsDue30d)}
        sub={stats.renewalsDue30dSub}
        valueClass="text-brand-gold"
      />
    </div>
  );
}
