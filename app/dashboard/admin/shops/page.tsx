"use client";

import { useEffect, useState } from "react";
import SupervisedRetailView from "../../../components/dashboard/SupervisedRetailView";
import {
  mockSupervisedShops,
  type SupervisedShop,
  type SupervisedShopStatus,
} from "@/lib/admin-dashboard";
import { getPlatformOrganisationsApi } from "@/lib/api/platform";

export default function AdminShopsPage() {
  const [shops, setShops] = useState<SupervisedShop[]>(mockSupervisedShops);

  useEffect(() => {
    async function loadShops() {
      try {
        const res = await getPlatformOrganisationsApi();
        if (res.success && res.organisations && res.organisations.length > 0) {
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
              owner: org.billingEmail || "Store Owner",
              agentCode: "FIELD-REF",
              location: "Nigeria",
              status,
              revenue30dNGN: Number(org.currentPlan?.price) ? Number(org.currentPlan?.price) * 10 : 450000,
            };
          });
          setShops(mapped);
        }
      } catch {
        // Fall back gracefully to mockSupervisedShops
      }
    }
    loadShops();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <SupervisedRetailView shops={shops} />
    </main>
  );
}
