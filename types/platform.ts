export interface PlatformDashboardStats {
  organisations_count: number;
  active_organisations_count: number;
  agents_count: number;
  total_revenue_ngn: number | string;
  pending_commissions_ngn: number | string;
  pending_payouts_count: number;
}

export interface PlatformAgent {
  id: string;
  userId: string;
  agentCode: string;
  defaultCommissionRateBps: number;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    status: string;
  };
  wallet?: {
    availableBalance: number | string;
    lifetimeEarned: number | string;
  };
  _count?: {
    referrals: number;
  };
}

export interface PlatformOrganisation {
  id: string;
  name: string;
  slug: string;
  status: string;
  billingEmail?: string | null;
  registrationSource: string;
  subscriptionStatus?: string | null;
  trialEndsAt?: string | null;
  createdAt: string;
  currentPlan?: {
    id: string;
    name: string;
    price: number | string;
  } | null;
  _count?: {
    branches: number;
    memberships: number;
    sales: number;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number | string;
  currency: string;
  billingInterval: "monthly" | "quarterly" | "yearly";
  commissionEligible: boolean;
  isActive: boolean;
}
