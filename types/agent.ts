export interface AgentDashboardStats {
  organisations_registered: number;
  total_earned: number | string;
  pending_commission: number | string;
  available_balance: number | string;
  referral_code: string | null;
}

export interface AgentReferralItem {
  id: string;
  organisationId: string;
  convertedAt: string;
  firstSubscriptionAt?: string | null;
  lifetimeValue: number | string;
  totalCommissionEarned: number | string;
  status: string;
  organisation: {
    id: string;
    name: string;
    slug: string;
    status: string;
    createdAt: string;
    subscriptionStatus?: string | null;
  };
}

export interface AgentEarningItem {
  id: string;
  agentId: string;
  organisationId: string;
  transactionType: string;
  baseAmount: number | string;
  commissionRateBps: number;
  commissionAmount: number | string;
  status: "pending" | "ready_for_payout" | "paid" | "cancelled";
  createdAt: string;
  organisation?: {
    name: string;
  };
}

export interface AgentLeaderboardEntry {
  agent_code: string;
  agent_name: string;
  onboarded: number;
  active_shops: number;
  cumulative_earnings: number | string;
}

export interface AgentPayoutItem {
  id: string;
  amount: number | string;
  currency: string;
  status: "requested" | "approved" | "processing" | "paid" | "rejected" | "cancelled";
  payoutMethod: string;
  payoutDetails: any;
  requestedAt: string;
  processedAt?: string | null;
  rejectionReason?: string | null;
  payoutReference?: string | null;
}
