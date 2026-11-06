const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const isProd = process.env.NODE_ENV === "production";

/**
 * Validates whether a valid public API URL is configured.
 * In production environments, OjaTrack will NEVER silently fall back to localhost.
 */
export const IS_API_CONFIGURED = Boolean(rawApiUrl && rawApiUrl.length > 0);

export const BACKEND_DIRECT_URL = IS_API_CONFIGURED
  ? (rawApiUrl as string).replace(/\/+$/, "")
  : "https://oja-track-server.onrender.com/api/v1";

/**
 * In browser environments, API_BASE routes through "/api/v1" via Next.js proxy rewrites.
 * This guarantees that session cookies (httpOnly refreshToken with SameSite=Lax) are treated
 * as same-origin by the browser, preventing cookie blocking on silent token rotation.
 * In server-side SSR contexts, it falls back to the backend direct URL.
 */
export const API_BASE =
  typeof window !== "undefined"
    ? "/api/v1"
    : BACKEND_DIRECT_URL;

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER_ORG: `${API_BASE}/auth/register-org`,
    REGISTER_AGENT: `${API_BASE}/auth/register-agent`,
    REGISTER_STAFF: `${API_BASE}/auth/register-staff`,
    VERIFY_OTP: `${API_BASE}/auth/verify-otp`,
    RESEND_OTP: `${API_BASE}/auth/resend-otp`,
    REFRESH: `${API_BASE}/auth/refresh`,
    LOGOUT: `${API_BASE}/auth/logout`,
    LOGOUT_ALL: `${API_BASE}/auth/logout-all`,
    ME: `${API_BASE}/auth/me`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    ACCEPT_INVITATION: `${API_BASE}/auth/accept-invitation`,
  },

  // Retail / Shop Operations (Mounted under /organisation)
  RETAIL: {
    DASHBOARD: `${API_BASE}/organisation/dashboard`,
    CATEGORIES: `${API_BASE}/organisation/categories`,
    PRODUCTS: `${API_BASE}/organisation/products`,
    INVENTORY: `${API_BASE}/organisation/inventory`,
    INVENTORY_ADJUST: `${API_BASE}/organisation/inventory/adjust`,
    INVENTORY_MOVEMENTS: `${API_BASE}/organisation/inventory/movements`,
    SALES: `${API_BASE}/organisation/sales`,
    VOID_SALE: (id: string) => `${API_BASE}/organisation/sales/${id}/void`,
    REPORTS: `${API_BASE}/organisation/reports`,
  },

  // Organisation / Tenancy
  ORGANISATION: {
    PROFILE: `${API_BASE}/organisation/profile`,
    BRANCHES: `${API_BASE}/organisation/branches`,
    BRANCH_DETAILS: (id: string) => `${API_BASE}/organisation/branches/${id}`,
    BRANCH_STATUS: (id: string) => `${API_BASE}/organisation/branches/${id}/status`,
    STAFF: `${API_BASE}/organisation/staff`,
    STAFF_DETAILS: (userId: string) => `${API_BASE}/organisation/staff/${userId}`,
    INVITATIONS: `${API_BASE}/organisation/invitations`,
    REVOKE_INVITATION: (id: string) => `${API_BASE}/organisation/invitations/${id}/revoke`,
    SUBSCRIPTION: `${API_BASE}/organisation/subscription`,
  },

  // Agent Portal
  AGENT: {
    DASHBOARD: `${API_BASE}/agent/dashboard`,
    REFERRALS: `${API_BASE}/agent/referrals`,
    EARNINGS: `${API_BASE}/agent/earnings`,
    LEADERBOARD: `${API_BASE}/agent/leaderboard`,
    ORGANISATIONS: `${API_BASE}/agent/organisations`,
    WITHDRAWALS: `${API_BASE}/agent/withdrawals`,
  },

  // Platform / Super Admin
  PLATFORM: {
    DASHBOARD: `${API_BASE}/platform/dashboard`,
    ANALYTICS: `${API_BASE}/platform/analytics`,
    SETTINGS: `${API_BASE}/platform/settings`,
    UPDATE_SETTING: (key: string) => `${API_BASE}/platform/settings/${key}`,
    AGENTS: `${API_BASE}/platform/agents`,
    AGENT_COMMISSION_RATE: (id: string) => `${API_BASE}/platform/agents/${id}/commission-rate`,
    ORGANISATIONS: `${API_BASE}/platform/organisations`,
    ADMINS: `${API_BASE}/platform/admins`,
    ADMIN_PERMISSIONS: (id: string) => `${API_BASE}/platform/admins/${id}/permissions`,
    SUBSCRIPTION_PLANS: `${API_BASE}/platform/subscription-plans`,
    SUBSCRIPTION_PLAN_DETAILS: (id: string) => `${API_BASE}/platform/subscription-plans/${id}`,
    INVOICES: (orgId: string) => `${API_BASE}/platform/subscriptions/${orgId}/invoices`,
    CREATE_INVOICE: `${API_BASE}/platform/subscriptions/invoices`,
    RECORD_PAYMENT: `${API_BASE}/platform/subscriptions/payments`,
    COMMISSIONS: `${API_BASE}/platform/commissions`,
    SETTLE_COMMISSIONS: `${API_BASE}/platform/commissions/settle`,
    APPROVE_COMMISSION: (id: string) => `${API_BASE}/platform/commissions/${id}/approve`,
    WITHDRAWALS: `${API_BASE}/platform/withdrawals`,
    PROCESS_WITHDRAWAL: (id: string, action: "approve" | "reject" | "pay") =>
      `${API_BASE}/platform/withdrawals/${id}/${action}`,
  },
};
