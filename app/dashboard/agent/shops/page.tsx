"use client";

import { useEffect, useState } from "react";
import ShopsTable from "../../../components/dashboard/ShopsTable";
import {
  mockOnboardedShops,
  type OnboardedShop,
  type ShopStatus,
  type SubscriptionPlan,
} from "@/lib/agent-dashboard";
import { getAgentReferralsApi } from "@/lib/api/agent";

export default function AgentShopsPage() {
  const [shops, setShops] = useState<OnboardedShop[]>(mockOnboardedShops);

  useEffect(() => {
    async function loadShops() {
      try {
        const res = await getAgentReferralsApi();
        if (res.success && res.referrals && res.referrals.length > 0) {
          const mapped: OnboardedShop[] = res.referrals.map((r, idx) => {
            const org = r.organisation;
            const status: ShopStatus = org?.status === "INACTIVE" ? "Expired" : "Active";
            const sub: SubscriptionPlan = "Monthly";

            return {
              id: r.id || `s-${idx}`,
              shopName: org?.name || "Retail Shop",
              owner: "Store Owner",
              location: "Nigeria",
              status,
              subscription: sub,
              renewalDate: org?.subscriptionStatus === "ACTIVE" ? "Active" : "Pending",
              commissionNGN: Number(r.totalCommissionEarned) || 6500,
              lastActive: "Today",
            };
          });
          setShops(mapped);
        }
      } catch {
        // Fall back gracefully to mockOnboardedShops
      }
    }
    loadShops();
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <ShopsTable shops={shops} />
    </main>
  );
}
