import { apiClient, setAccessToken } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  AuthContextUser,
  LoginResponse,
  RegisterAgentPayload,
  RegisterOrgPayload,
  SafeUser,
  VerifyOtpPayload,
} from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export async function loginApi(access: string, password: string): Promise<LoginResponse> {
  const data = await apiClient<LoginResponse>(ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify({ access, password }),
    skipAuth: true,
  });

  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
}

export async function registerOrgApi(payload: RegisterOrgPayload): Promise<ApiResponse<{ user: SafeUser }>> {
  return apiClient(ENDPOINTS.AUTH.REGISTER_ORG, {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

export async function registerAgentApi(payload: RegisterAgentPayload): Promise<ApiResponse<{ user: SafeUser }>> {
  return apiClient(ENDPOINTS.AUTH.REGISTER_AGENT, {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

export async function verifyOtpApi(payload: VerifyOtpPayload): Promise<ApiResponse<{ user_id: string }>> {
  return apiClient(ENDPOINTS.AUTH.VERIFY_OTP, {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

export async function resendOtpApi(id: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.AUTH.RESEND_OTP, {
    method: "POST",
    body: JSON.stringify({ id }),
    skipAuth: true,
  });
}

export async function getMeApi(): Promise<{ success: boolean; user: AuthContextUser }> {
  return apiClient(ENDPOINTS.AUTH.ME, {
    method: "GET",
  });
}

export async function logoutApi(): Promise<ApiResponse> {
  try {
    return await apiClient(ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  } finally {
    setAccessToken(null);
  }
}

export async function forgotPasswordApi(email: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    method: "POST",
    body: JSON.stringify({ email }),
    skipAuth: true,
  });
}

export async function resetPasswordApi(email: string, otp: string, password: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.AUTH.RESET_PASSWORD, {
    method: "POST",
    body: JSON.stringify({ email, otp, password }),
    skipAuth: true,
  });
}
