"use client";

import { useEffect, useState } from "react";
import AgentControlCenter from "../../../components/dashboard/AgentControlCenter";
import { mockVerifiedAgents, type VerifiedAgent } from "@/lib/admin-dashboard";
import { getPlatformAgentsApi } from "@/lib/api/platform";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<VerifiedAgent[]>(mockVerifiedAgents);

  useEffect(() => {
    async function loadAgents() {
      try {
        const res = await getPlatformAgentsApi();
        if (res.success && res.agents && res.agents.length > 0) {
          const mapped: VerifiedAgent[] = res.agents.map((a) => {
            const firstName = a.user?.firstName || "Agent";
            const lastName = a.user?.lastName || "";
            const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AG";
            return {
              id: a.agentCode || a.id,
              name: `${firstName} ${lastName}`.trim(),
              initials,
              location: "Nigeria",
              status: a.user?.status === "ACTIVE" ? "ACTIVE" : a.user?.status === "SUSPENDED" ? "SUSPENDED" : "PENDING",
              shopsTotal: a._count?.referrals || 0,
              shopsActive: a._count?.referrals || 0,
              totalEarnedNGN: Number(a.wallet?.lifetimeEarned) || 0,
              joined: new Date(a.createdAt).toLocaleDateString("en-NG", { month: "short", year: "numeric" }),
              commissionBalanceNGN: Number(a.wallet?.availableBalance) || 0,
              onboardedRetailers: a._count?.referrals || 0,
              ratingOutOf5: 4.8,
            };
          });
          setAgents(mapped);
        }
      } catch {
        // Fall back gracefully to mockVerifiedAgents
      }
    }
    loadAgents();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <AgentControlCenter agents={agents} />
    </main>
  );
}
