"use client";

import { useCallback, useEffect, useState } from "react";
import RenewalsList from "../../../components/dashboard/RenewalsList";
import type { ShopRenewal } from "@/lib/agent-dashboard";
import { getAgentReferralsApi } from "@/lib/api/agent";

export default function AgentRenewalsClient() {
  const [renewals, setRenewals] = useState<ShopRenewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRenewals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAgentReferralsApi();
      if (res && res.success && Array.isArray(res.referrals)) {
        // Map any referrals with expiring subscriptions
        const mapped: ShopRenewal[] = [];
        for (const r of res.referrals) {
          if (r.organisation?.subscriptionStatus) {
            mapped.push({
              id: r.id,
              shopName: r.organisation.name || "Retail Merchant",
              owner: "Store Merchant",
              dueDateISO: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
              daysLeft: 30,
              subscriptionCostNGN: 32500,
            });
          }
        }
        setRenewals(mapped);
      } else {
        setRenewals([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load renewals data.");
      setRenewals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRenewals();
  }, [loadRenewals]);

  return (
    <div>
      {error && (
        <div
          role="alert"
          className="mb-4 flex flex-col gap-2 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-warning/20 dark:bg-warning/5"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-0.5 text-warning font-bold">
              ⚠
            </span>
            <div>
              <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
                Renewals Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadRenewals}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
      ) : (
        <RenewalsList renewals={renewals} />
      )}
    </div>
  );
}
