import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  PlatformAgent,
  PlatformDashboardStats,
  PlatformOrganisation,
  SubscriptionPlan,
} from "@/types/platform";
import type { ApiResponse } from "@/types/api";

export async function getPlatformDashboardApi(): Promise<{
  success: boolean;
  dashboard: PlatformDashboardStats;
}> {
  return apiClient(ENDPOINTS.PLATFORM.DASHBOARD);
}

export async function getPlatformAnalyticsApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.ANALYTICS);
}

export async function getPlatformSettingsApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.SETTINGS);
}

export async function updatePlatformSettingApi(key: string, value: any): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.UPDATE_SETTING(key), {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
}

export async function getPlatformAgentsApi(): Promise<{
  success: boolean;
  agents: PlatformAgent[];
}> {
  return apiClient(ENDPOINTS.PLATFORM.AGENTS);
}

export async function setAgentCommissionRateApi(agentId: string, bps: number): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.AGENT_COMMISSION_RATE(agentId), {
    method: "PATCH",
    body: JSON.stringify({ commission_rate_bps: bps }),
  });
}

export async function getPlatformOrganisationsApi(): Promise<{
  success: boolean;
  organisations: PlatformOrganisation[];
}> {
  return apiClient(ENDPOINTS.PLATFORM.ORGANISATIONS);
}

export async function getSubscriptionPlansApi(): Promise<{
  success: boolean;
  plans: SubscriptionPlan[];
}> {
  return apiClient(ENDPOINTS.PLATFORM.SUBSCRIPTION_PLANS);
}

export async function createSubscriptionPlanApi(data: Partial<SubscriptionPlan>): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.SUBSCRIPTION_PLANS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getPlatformCommissionsApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.COMMISSIONS);
}

export async function settleCommissionsApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.SETTLE_COMMISSIONS, {
    method: "POST",
  });
}

export async function approveCommissionApi(id: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.APPROVE_COMMISSION(id), {
    method: "POST",
  });
}

export async function getPlatformWithdrawalsApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.WITHDRAWALS);
}

export async function processWithdrawalApi(
  id: string,
  action: "approve" | "reject" | "pay",
  details?: any
): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.PLATFORM.PROCESS_WITHDRAWAL(id, action), {
    method: "POST",
    body: JSON.stringify(details || {}),
  });
}
