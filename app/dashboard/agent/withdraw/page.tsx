"use client";

import { useEffect, useState } from "react";
import BalanceWallet from "../../../components/dashboard/BalanceWallet";
import PayoutForm from "../../../components/dashboard/PayoutForm";
import PayoutHistory from "../../../components/dashboard/PayoutHistory";
import {
  mockAgentOverview,
  mockPayoutHistory,
  type PayoutRecord,
} from "@/lib/agent-dashboard";
import { getAgentDashboardApi, getAgentPayoutsApi } from "@/lib/api/agent";

export default function AgentWithdrawPage() {
  const [balanceNGN, setBalanceNGN] = useState<number>(mockAgentOverview.stats.availableBalanceNGN);
  const [payouts, setPayouts] = useState<PayoutRecord[]>(mockPayoutHistory);

  useEffect(() => {
    async function loadWithdrawalData() {
      try {
        const [dashRes, payoutsRes] = await Promise.allSettled([
          getAgentDashboardApi(),
          getAgentPayoutsApi(),
        ]);

        if (dashRes.status === "fulfilled" && dashRes.value.success && dashRes.value.stats) {
          setBalanceNGN(Number(dashRes.value.stats.available_balance) || mockAgentOverview.stats.availableBalanceNGN);
        }

        if (payoutsRes.status === "fulfilled" && payoutsRes.value.success && payoutsRes.value.payouts.length > 0) {
          const mapped: PayoutRecord[] = payoutsRes.value.payouts.map((p, idx) => ({
            id: p.id || `p-${idx}`,
            amountNGN: Number(p.amount),
            dateISO: new Date(p.requestedAt || Date.now()).toISOString().split("T")[0],
            ref: p.id ? `PAY-${p.id.slice(0, 8).toUpperCase()}` : "PAY-REF",
            bankLabel: p.payoutMethod || "Nigerian Commercial Bank",
            status: "Completed",
          }));
          setPayouts(mapped);
        }
      } catch {
        // Fall back gracefully to mockPayoutHistory
      }
    }

    loadWithdrawalData();
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <PayoutForm balanceNGN={balanceNGN} />
        <BalanceWallet balanceNGN={balanceNGN} />
      </div>

      <div className="mt-6">
        <PayoutHistory items={payouts} />
      </div>
    </main>
  );
}
