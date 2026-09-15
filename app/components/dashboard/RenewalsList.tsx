"use client";

import { useMemo, useState } from "react";
import RenewalCard from "./RenewalCard";
import {
  getRenewalStatus,
  type RenewalTab,
  type ShopRenewal,
} from "@/lib/agent-dashboard";

const tabs: Array<{ key: RenewalTab; label: (count: number) => string }> = [
  { key: "pending", label: (c) => `All Pending (${c})` },
  { key: "expiring", label: (c) => `Expiring Soon <30d (${c})` },
  { key: "expired", label: (c) => `Expired (${c})` },
];

/*
 * Client island for the Manage Renewals page: tab filters + card list.
 * "All Pending" covers every non-expired renewal (including the
 * expiring-soon subset), so tab counts always sum correctly.
 */
export default function RenewalsList({
  renewals,
}: {
  renewals: ShopRenewal[];
}) {
  const [tab, setTab] = useState<RenewalTab>("pending");

  const counts = useMemo(() => {
    let pending = 0;
    let expiring = 0;
    let expired = 0;
    for (const r of renewals) {
      const s = getRenewalStatus(r);
      if (s === "expired") expired += 1;
      else {
        pending += 1;
        if (s === "expiring") expiring += 1;
      }
    }
    return { pending, expiring, expired };
  }, [renewals]);

  const visible = useMemo(() => {
    if (tab === "expired")
      return renewals.filter((r) => getRenewalStatus(r) === "expired");
    if (tab === "expiring")
      return renewals.filter((r) => getRenewalStatus(r) === "expiring");
    return renewals.filter((r) => getRenewalStatus(r) !== "expired");
  }, [renewals, tab]);

  const tabClass = (isActive: boolean) =>
    `inline-flex h-10 items-center rounded-lg border px-4 text-sm whitespace-nowrap transition-colors ${
      isActive
        ? "border-border bg-surface font-semibold text-brand-primary dark:bg-foundation-elevated dark:text-brand-hover"
        : "border-border bg-white font-normal text-light-secondary hover:text-light-primary dark:bg-transparent dark:text-ink-secondary dark:hover:text-ink-primary"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filter renewals" className="flex flex-wrap gap-2 sm:gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={tabClass(tab === t.key)}
          >
            {t.label(counts[t.key])}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-border bg-white p-10 text-center text-sm text-light-secondary dark:bg-foundation-secondary dark:text-ink-secondary">
          No renewals in this category.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {visible.map((r) => (
            <RenewalCard key={r.id} renewal={r} />
          ))}
        </ul>
      )}
    </div>
  );
}
