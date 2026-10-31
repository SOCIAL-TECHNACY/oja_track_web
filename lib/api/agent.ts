import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  AgentDashboardStats,
  AgentEarningItem,
  AgentLeaderboardEntry,
  AgentPayoutItem,
  AgentReferralItem,
} from "@/types/agent";
import type { ApiResponse } from "@/types/api";

export async function getAgentDashboardApi(): Promise<{
  success: boolean;
  stats: AgentDashboardStats;
  recent: any[];
}> {
  return apiClient(ENDPOINTS.AGENT.DASHBOARD);
}

export async function getAgentReferralsApi(): Promise<{
  success: boolean;
  referrals: AgentReferralItem[];
}> {
  return apiClient(ENDPOINTS.AGENT.REFERRALS);
}

export async function getAgentEarningsApi(): Promise<{
  success: boolean;
  earnings: AgentEarningItem[];
}> {
  return apiClient(ENDPOINTS.AGENT.EARNINGS);
}

export async function getAgentLeaderboardApi(): Promise<{
  success: boolean;
  leaderboard: AgentLeaderboardEntry[];
}> {
  return apiClient(ENDPOINTS.AGENT.LEADERBOARD);
}

export async function agentRegisterOrgApi(payload: any): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.AGENT.ORGANISATIONS, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function requestPayoutApi(data: {
  amount: number;
  payout_method: string;
  payout_details: any;
}): Promise<ApiResponse<{ payout_request: AgentPayoutItem }>> {
  return apiClient(ENDPOINTS.AGENT.WITHDRAWALS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAgentPayoutsApi(): Promise<{
  success: boolean;
  payouts: AgentPayoutItem[];
}> {
  return apiClient(ENDPOINTS.AGENT.WITHDRAWALS);
}
