export type PlatformRole = "SUPER_ADMIN" | "ADMIN";
export type MembershipRole = "owner" | "admin" | "manager" | "staff" | "viewer";
export type UserRole = PlatformRole | "ORG_ADMIN" | "SHOP_STAFF" | "AGENT";

export type UserStatus = "active" | "suspended" | "pending_verification" | "deactivated";

export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  status: UserStatus;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  emailVerifiedAt?: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextUser {
  id: string;
  email: string;
  role: UserRole;
  org_id: string | null;
  branch_id: string | null;
  membership_role: MembershipRole | null;
  is_active: boolean;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  user: SafeUser;
}

export interface RegisterOrgPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  city: string;
  state: string;
  country?: string;
  organisation: {
    name: string;
    city: string;
    state: string;
    billing_email?: string;
    billing_address?: string;
    country?: string;
    tax_id?: string;
    referred_by?: string;
  };
  branch?: {
    name?: string;
    code?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    timezone?: string;
  };
  referral_code?: string;
}

export interface RegisterAgentPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  referral_code?: string;
}

export interface VerifyOtpPayload {
  id: string;
  otp: string;
}
