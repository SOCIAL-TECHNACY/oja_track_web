"use client";

import { useCallback, useEffect, useState } from "react";
import ShopsTable from "../../../components/dashboard/ShopsTable";
import type {
  OnboardedShop,
  ShopStatus,
  SubscriptionPlan,
} from "@/lib/agent-dashboard";
import { getAgentReferralsApi } from "@/lib/api/agent";

export default function AgentShopsPage() {
  const [shops, setShops] = useState<OnboardedShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAgentReferralsApi();
      if (res && res.success && Array.isArray(res.referrals)) {
        const mapped: OnboardedShop[] = res.referrals.map((r, idx) => {
          const org = r.organisation;
          const status: ShopStatus = org?.status === "INACTIVE" ? "Expired" : "Active";
          const sub: SubscriptionPlan = "Monthly";

          return {
            id: r.id || `s-${idx}`,
            shopName: org?.name || "Retail Shop",
            owner: "Store Merchant",
            location: "Nigeria",
            status,
            subscription: sub,
            renewalDate: org?.subscriptionStatus === "ACTIVE" ? "Active" : "Pending",
            commissionNGN: Number(r.totalCommissionEarned) || 0,
            lastActive: "Recent",
          };
        });
        setShops(mapped);
      } else {
        setShops([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load agent referral directory.");
      setShops([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-light-primary sm:text-2xl dark:text-ink-primary">
          Onboarded Retail Fleet
        </h1>
        <p className="mt-1 text-sm text-light-secondary sm:text-[15px] dark:text-ink-secondary">
          Directory of all retail stores registered under your agent referral accreditation.
        </p>
      </div>

      {/* Error Alert */}
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
                Fleet Sync Notice
              </p>
              <p className="text-xs text-light-secondary dark:text-ink-secondary">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadShops}
            className="self-start sm:self-auto inline-flex h-8 items-center rounded-lg bg-white px-3 text-xs font-semibold text-light-primary border border-border shadow-xs hover:bg-surface dark:bg-foundation-secondary dark:text-ink-primary dark:border-[#1e3a2b]"
          >
            Retry Connection
          </button>
        </div>
      )}

      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl border border-border bg-neutral-100 dark:bg-foundation-secondary dark:border-[#1e3a2b]" />
      ) : (
        <ShopsTable shops={shops} />
      )}
    </main>
  );
}
