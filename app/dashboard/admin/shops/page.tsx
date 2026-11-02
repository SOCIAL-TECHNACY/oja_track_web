"use client";

import { useCallback, useEffect, useState } from "react";
import SupervisedRetailView from "../../../components/dashboard/SupervisedRetailView";
import type {
  SupervisedShop,
  SupervisedShopStatus,
} from "@/lib/admin-dashboard";
import { getPlatformOrganisationsApi } from "@/lib/api/platform";

export default function AdminShopsPage() {
  const [shops, setShops] = useState<SupervisedShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPlatformOrganisationsApi();
      if (res && res.success && Array.isArray(res.organisations)) {
        const mapped: SupervisedShop[] = res.organisations.map((org) => {
          let status: SupervisedShopStatus = "ACTIVE";
          if (org.status === "INACTIVE") {
            status = "SUSPENDED";
          } else if (org.status === "PENDING") {
            status = "PENDING";
          }
          return {
            id: org.id,
            shopName: org.name,
            owner: org.billingEmail || "Store Merchant",
            agentCode: "FIELD-REF",
            location: "Nigeria",
            status,
            revenue30dNGN: Number(org.currentPlan?.price) ? Number(org.currentPlan?.price) * 10 : 0,
          };
        });
        setShops(mapped);
      } else {
        setShops([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load supervised retail organizations.");
      setShops([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
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
                Retail Organizations Sync Notice
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
        <SupervisedRetailView shops={shops} />
      )}
    </main>
  );
}
