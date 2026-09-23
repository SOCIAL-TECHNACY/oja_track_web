/*
 * Admin dashboard data contract.
 * Mock-first, mirroring the agent-dashboard module: replace the mock
 * imports with fetch calls later — types stay the same.
 */

import type { DashboardUser } from "@/app/components/dashboard/types";

export const mockAdminUser: DashboardUser = {
  name: "Adeola Balogun",
  code: "AD-ADMIN01",
  initials: "AB",
  role: "Managing Partner",
};

export type AdminLeaderboardPeriod = "monthly" | "quarterly" | "allTime";

export interface NetworkAgentEntry {
  rank: number;
  agentName: string;
  agentCode: string;
  region: string;
  onboarded: number;
  activeShops: number;
  renewalRatePct: number;
  cumulativeEarningsNGN: number;
}

export const mockAdminLeaderboard: Record<
  AdminLeaderboardPeriod,
  NetworkAgentEntry[]
> = {
  monthly: [
    { rank: 1, agentName: "Tunde Balogun", agentCode: "AG-LAG042", region: "Lagos", onboarded: 94, activeShops: 88, renewalRatePct: 98, cumulativeEarningsNGN: 1850000 },
    { rank: 2, agentName: "Emeka Okafor", agentCode: "AG-ONS017", region: "Onitsha", onboarded: 82, activeShops: 75, renewalRatePct: 92, cumulativeEarningsNGN: 1510000 },
    { rank: 3, agentName: "Funmi Adebayo", agentCode: "AG-IBA023", region: "Ibadan", onboarded: 76, activeShops: 68, renewalRatePct: 95, cumulativeEarningsNGN: 1320000 },
    { rank: 4, agentName: "Ibrahim Musa", agentCode: "AG-KAN011", region: "Kano", onboarded: 61, activeShops: 55, renewalRatePct: 91, cumulativeEarningsNGN: 1102000 },
    { rank: 5, agentName: "Chioma Chukwu", agentCode: "AG-ENU031", region: "Enugu", onboarded: 58, activeShops: 49, renewalRatePct: 89, cumulativeEarningsNGN: 995000 },
    { rank: 6, agentName: "Yusuf Haruna", agentCode: "AG-ABJ008", region: "Abuja", onboarded: 51, activeShops: 43, renewalRatePct: 94, cumulativeEarningsNGN: 912000 },
    { rank: 7, agentName: "Chinedu Okoro", agentCode: "AG-EME123", region: "Lagos", onboarded: 47, activeShops: 38, renewalRatePct: 86, cumulativeEarningsNGN: 876500 },
    { rank: 8, agentName: "Amara Nwosu", agentCode: "AG-PHC019", region: "Port Harcourt", onboarded: 42, activeShops: 35, renewalRatePct: 88, cumulativeEarningsNGN: 745000 },
  ],
  quarterly: [
    { rank: 1, agentName: "Funmi Adebayo", agentCode: "AG-IBA023", region: "Ibadan", onboarded: 148, activeShops: 132, renewalRatePct: 96, cumulativeEarningsNGN: 3420000 },
    { rank: 2, agentName: "Tunde Balogun", agentCode: "AG-LAG042", region: "Lagos", onboarded: 141, activeShops: 128, renewalRatePct: 95, cumulativeEarningsNGN: 3280000 },
    { rank: 3, agentName: "Emeka Okafor", agentCode: "AG-ONS017", region: "Onitsha", onboarded: 129, activeShops: 114, renewalRatePct: 93, cumulativeEarningsNGN: 2940000 },
    { rank: 4, agentName: "Ibrahim Musa", agentCode: "AG-KAN011", region: "Kano", onboarded: 104, activeShops: 92, renewalRatePct: 90, cumulativeEarningsNGN: 2310000 },
    { rank: 5, agentName: "Chinedu Okoro", agentCode: "AG-EME123", region: "Lagos", onboarded: 96, activeShops: 81, renewalRatePct: 88, cumulativeEarningsNGN: 2140000 },
    { rank: 6, agentName: "Chioma Chukwu", agentCode: "AG-ENU031", region: "Enugu", onboarded: 91, activeShops: 77, renewalRatePct: 87, cumulativeEarningsNGN: 1980000 },
    { rank: 7, agentName: "Yusuf Haruna", agentCode: "AG-ABJ008", region: "Abuja", onboarded: 84, activeShops: 70, renewalRatePct: 91, cumulativeEarningsNGN: 1820000 },
    { rank: 8, agentName: "Amara Nwosu", agentCode: "AG-PHC019", region: "Port Harcourt", onboarded: 73, activeShops: 61, renewalRatePct: 85, cumulativeEarningsNGN: 1560000 },
  ],
  allTime: [
    { rank: 1, agentName: "Tunde Balogun", agentCode: "AG-LAG042", region: "Lagos", onboarded: 312, activeShops: 268, renewalRatePct: 94, cumulativeEarningsNGN: 9850000 },
    { rank: 2, agentName: "Funmi Adebayo", agentCode: "AG-IBA023", region: "Ibadan", onboarded: 295, activeShops: 251, renewalRatePct: 95, cumulativeEarningsNGN: 9210000 },
    { rank: 3, agentName: "Emeka Okafor", agentCode: "AG-ONS017", region: "Onitsha", onboarded: 271, activeShops: 228, renewalRatePct: 91, cumulativeEarningsNGN: 8400000 },
    { rank: 4, agentName: "Chinedu Okoro", agentCode: "AG-EME123", region: "Lagos", onboarded: 238, activeShops: 196, renewalRatePct: 89, cumulativeEarningsNGN: 7120000 },
    { rank: 5, agentName: "Ibrahim Musa", agentCode: "AG-KAN011", region: "Kano", onboarded: 224, activeShops: 184, renewalRatePct: 88, cumulativeEarningsNGN: 6680000 },
    { rank: 6, agentName: "Chioma Chukwu", agentCode: "AG-ENU031", region: "Enugu", onboarded: 205, activeShops: 168, renewalRatePct: 86, cumulativeEarningsNGN: 5940000 },
    { rank: 7, agentName: "Yusuf Haruna", agentCode: "AG-ABJ008", region: "Abuja", onboarded: 189, activeShops: 152, renewalRatePct: 90, cumulativeEarningsNGN: 5410000 },
    { rank: 8, agentName: "Amara Nwosu", agentCode: "AG-PHC019", region: "Port Harcourt", onboarded: 166, activeShops: 134, renewalRatePct: 84, cumulativeEarningsNGN: 4620000 },
  ],
};

/* ------------------------------------------------------------------ */
/* Operational Command Center (admin home) mocks                       */
/* ------------------------------------------------------------------ */

export interface AdminPlatformStats {
  totalShops: number;
  totalShopsSub: string;
  activeShops: number;
  activeShopsSub: string;
  newThisMonth: number;
  newThisMonthSub: string;
  totalAgents: number;
  totalAgentsSub: string;
  activeAgents: number;
  activeAgentsSub: string;
  monthlyRevenueNGN: number;
  monthlyRevenueSub: string;
  subscriptionRevenueNGN: number;
  subscriptionRevenueSub: string;
  commissionLiabilityNGN: number;
  commissionLiabilitySub: string;
  pendingWithdrawalsNGN: number;
  pendingWithdrawalsSub: string;
  renewalsDue30d: number;
  renewalsDue30dSub: string;
}

export const mockAdminOverview: AdminPlatformStats = {
  totalShops: 10247,
  totalShopsSub: "Platform Lifetime cumulative",
  activeShops: 8891,
  activeShopsSub: "Last transaction within 72 hrs",
  newThisMonth: 342,
  newThisMonthSub: "+12.4% MoM trajectory",
  totalAgents: 1847,
  totalAgentsSub: "Verified field force",
  activeAgents: 1523,
  activeAgentsSub: "82.4% engagement velocity",
  monthlyRevenueNGN: 48_200_000,
  monthlyRevenueSub: "Gross Transaction Value basis",
  subscriptionRevenueNGN: 38_600_000,
  subscriptionRevenueSub: "Recurring annual & monthly packages",
  commissionLiabilityNGN: 12_400_000,
  commissionLiabilitySub: "Owed to onboarding agents",
  pendingWithdrawalsNGN: 3_200_000,
  pendingWithdrawalsSub: "Requires audit clearance",
  renewalsDue30d: 847,
  renewalsDue30dSub: "Subscription expiries looming",
};

/** 12-month shop growth series for the line chart. */
export const mockShopGrowth12m: number[] = [
  6200, 6600, 6400, 7100, 6900, 7500, 7900, 7800, 8100, 8600, 8400, 9100,
];

export interface MonthlyGrossRevenue {
  month: string;
  amountNGN: number;
}

/** 6-month gross revenue bars (M1–M6). */
export const mockGrossRevenue6m: MonthlyGrossRevenue[] = [
  { month: "M1", amountNGN: 21_000_000 },
  { month: "M2", amountNGN: 26_000_000 },
  { month: "M3", amountNGN: 32_000_000 },
  { month: "M4", amountNGN: 28_000_000 },
  { month: "M5", amountNGN: 35_000_000 },
  { month: "M6", amountNGN: 39_000_000 },
];

export const mockRenewalsSplit = {
  autoPct: 72,
  manualPct: 28,
  autoLabel: "Auto (72%)",
  manualLabel: "Manual (28%)",
};

export type NetworkEventStatus = "ACTIVE" | "PAID" | "PENDING";

export interface NetworkEvent {
  id: string;
  message: string;
  timeAgo: string;
  status: NetworkEventStatus;
}

export const mockNetworkEvents: NetworkEvent[] = [
  {
    id: "e1",
    message: "Agent AG-9902 onboarded 'Belvedere Supermarket'",
    timeAgo: "4 mins ago",
    status: "ACTIVE",
  },
  {
    id: "e2",
    message: "Withdrawal of ₦450,000 processed for Agent AG-1122",
    timeAgo: "12 mins ago",
    status: "PAID",
  },
  {
    id: "e3",
    message: "Shop subscription 'Hassan Provisions' expired",
    timeAgo: "25 mins ago",
    status: "PENDING",
  },
];

export type HealthStatus = "OPERATIONAL" | "DEGRADED" | "DOWN";

export interface OperationalService {
  id: string;
  name: string;
  latencyMs: number;
  status: HealthStatus;
}

export const mockOperationalHealth: OperationalService[] = [
  { id: "flutterwave", name: "Flutterwave Gateway", latencyMs: 142, status: "OPERATIONAL" },
  { id: "notify", name: "Notification Server", latencyMs: 24, status: "OPERATIONAL" },
  { id: "dbsync", name: "Database Sync Node", latencyMs: 420, status: "DEGRADED" },
];

/* ------------------------------------------------------------------ */
/* Agent Control Center (admin agents page) mocks                      */
/* ------------------------------------------------------------------ */

export type VerifiedAgentStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

export interface VerifiedAgent {
  id: string;
  name: string;
  initials: string;
  location: string;
  status: VerifiedAgentStatus;
  shopsTotal: number;
  shopsActive: number;
  totalEarnedNGN: number;
  joined: string;
  commissionBalanceNGN: number;
  onboardedRetailers: number;
  ratingOutOf5: number;
}

export const mockVerifiedAgents: VerifiedAgent[] = [
  {
    id: "AG-1102",
    name: "Chinedu Okafor",
    initials: "CO",
    location: "Lagos Mainland",
    status: "ACTIVE",
    shopsTotal: 42,
    shopsActive: 38,
    totalEarnedNGN: 1_245_000,
    joined: "Oct 2023",
    commissionBalanceNGN: 142_500,
    onboardedRetailers: 42,
    ratingOutOf5: 4.8,
  },
  {
    id: "AG-4402",
    name: "Bisi Adebayo",
    initials: "BA",
    location: "Ikeja",
    status: "ACTIVE",
    shopsTotal: 28,
    shopsActive: 22,
    totalEarnedNGN: 845_000,
    joined: "Jan 2024",
    commissionBalanceNGN: 96_000,
    onboardedRetailers: 28,
    ratingOutOf5: 4.6,
  },
  {
    id: "AG-0912",
    name: "Ibrahim Yusuf",
    initials: "IY",
    location: "Kano Central",
    status: "PENDING",
    shopsTotal: 4,
    shopsActive: 2,
    totalEarnedNGN: 95_000,
    joined: "Jun 2024",
    commissionBalanceNGN: 18_000,
    onboardedRetailers: 4,
    ratingOutOf5: 4.2,
  },
  {
    id: "AG-8821",
    name: "Fatima Bello",
    initials: "FB",
    location: "Abuja Garki",
    status: "SUSPENDED",
    shopsTotal: 19,
    shopsActive: 10,
    totalEarnedNGN: 340_000,
    joined: "Nov 2023",
    commissionBalanceNGN: 52_000,
    onboardedRetailers: 19,
    ratingOutOf5: 3.9,
  },
];

const compactNGN = new Intl.NumberFormat("en-NG", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Compact naira: 48_200_000 -> "₦48.2M". */
export function formatCompactNGN(amount: number): string {
  return `₦${compactNGN.format(amount)}`;
}

const fullNum = new Intl.NumberFormat("en-US");

export function formatCount(n: number): string {
  return fullNum.format(n);
}

/* ------------------------------------------------------------------ */
/* Supervised Retail Locations (admin shops page) mocks                */
/* ------------------------------------------------------------------ */

export type SupervisedShopStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

export interface SupervisedShop {
  id: string;
  shopName: string;
  owner: string;
  agentCode: string;
  location: string;
  status: SupervisedShopStatus;
  revenue30dNGN: number;
}

export const mockShopTabCounts = {
  all: 10247,
  active: 8891,
  expiringSoon: 412,
  expired: 1356,
};

export const mockSupervisedShops: SupervisedShop[] = [
  { id: "sh1", shopName: "Alhaji & Sons Groceries", owner: "Alhaji Musa", agentCode: "AG-1102", location: "Lekki Phase 1", status: "ACTIVE", revenue30dNGN: 4_850_000 },
  { id: "sh2", shopName: "Kemi Cosmetics", owner: "Kemi Adeyemi", agentCode: "AG-4402", location: "Ikeja", status: "PENDING", revenue30dNGN: 1_200_000 },
  { id: "sh3", shopName: "Standard Pharmacy Ltd", owner: "Dr. Dave", agentCode: "AG-8821", location: "Abuja Garki", status: "SUSPENDED", revenue30dNGN: 8_940_000 },
  { id: "sh4", shopName: "Alhaji Electronics", owner: "Alhaji Musa", agentCode: "AG-1102", location: "Kano", status: "ACTIVE", revenue30dNGN: 2_310_000 },
  { id: "sh5", shopName: "Grace Fabrics", owner: "Mrs. Adebayo", agentCode: "AG-4402", location: "Ibadan", status: "ACTIVE", revenue30dNGN: 980_000 },
  { id: "sh6", shopName: "Chidi Spares", owner: "Chidi Nnamdi", agentCode: "AG-0912", location: "Enugu", status: "PENDING", revenue30dNGN: 410_000 },
  { id: "sh7", shopName: "Obi Phones", owner: "Obinna Okafor", agentCode: "AG-1102", location: "Lagos", status: "ACTIVE", revenue30dNGN: 3_150_000 },
  { id: "sh8", shopName: "Yomi Groceries", owner: "Yomi Shonukan", agentCode: "AG-4402", location: "Lagos", status: "ACTIVE", revenue30dNGN: 760_000 },
  { id: "sh9", shopName: "Kaduna Agro Sales", owner: "Ibrahim Bello", agentCode: "AG-0912", location: "Kaduna", status: "SUSPENDED", revenue30dNGN: 0 },
  { id: "sh10", shopName: "Port Harcourt Retail", owner: "Patience Amadi", agentCode: "AG-8821", location: "PH", status: "ACTIVE", revenue30dNGN: 1_870_000 },
];

export interface ShopInventorySlice {
  label: string;
  pct: number;
  barClass: string;
}

export interface ShopInsight {
  shopName: string;
  location: string;
  subPack: string;
  avgTicketNGN: number;
  posTerminalsActive: number;
  stockItemsTracked: number;
  inventory: ShopInventorySlice[];
}

export const mockShopInsight: ShopInsight = {
  shopName: "Alhaji & Sons Groceries",
  location: "Lekki Phase 1, Lagos",
  subPack: "Enterprise Pro",
  avgTicketNGN: 12_400,
  posTerminalsActive: 3,
  stockItemsTracked: 1245,
  inventory: [
    { label: "FMCG Groceries (82%)", pct: 82, barClass: "bg-brand-primary" },
    { label: "Cosmetics & Toiletries (18%)", pct: 18, barClass: "bg-brand-gold" },
  ],
};

/** Hand-written insights for the featured shops; others use the fallback. */
export const mockShopInsights: Record<string, ShopInsight> = {
  sh1: mockShopInsight,
  sh2: {
    shopName: "Kemi Cosmetics",
    location: "Ikeja, Lagos",
    subPack: "Growth",
    avgTicketNGN: 8_900,
    posTerminalsActive: 2,
    stockItemsTracked: 640,
    inventory: [
      { label: "Beauty & Care (64%)", pct: 64, barClass: "bg-brand-primary" },
      { label: "Essentials (36%)", pct: 36, barClass: "bg-brand-gold" },
    ],
  },
  sh3: {
    shopName: "Standard Pharmacy Ltd",
    location: "Abuja Garki",
    subPack: "Enterprise Pro",
    avgTicketNGN: 21_300,
    posTerminalsActive: 5,
    stockItemsTracked: 2310,
    inventory: [
      { label: "Pharma (71%)", pct: 71, barClass: "bg-brand-primary" },
      { label: "FMCG (29%)", pct: 29, barClass: "bg-brand-gold" },
    ],
  },
};

/**
 * Insight for any supervised shop: hand-written when available,
 * otherwise derived deterministically from its 30d revenue.
 */
export function shopInsightFor(shop: SupervisedShop): ShopInsight {
  const direct = mockShopInsights[shop.id];
  if (direct) return direct;
  const avgTicketNGN =
    Math.max(50, Math.round(shop.revenue30dNGN / 300 / 50) * 50) || 5_000;
  return {
    shopName: shop.shopName,
    location: shop.location,
    subPack: shop.status === "ACTIVE" ? "Standard" : "Starter",
    avgTicketNGN,
    posTerminalsActive: Math.min(5, Math.max(1, Math.round(shop.revenue30dNGN / 800_000))),
    stockItemsTracked: Math.max(120, Math.round(shop.revenue30dNGN / 4_000)),
    inventory: [
      { label: "Core Stock (60%)", pct: 60, barClass: "bg-brand-primary" },
      { label: "Others (40%)", pct: 40, barClass: "bg-brand-gold" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Subscription Management (admin subscriptions page) mocks            */
/* ------------------------------------------------------------------ */

export type SubscriptionStatus = "ACTIVE" | "EXPIRING SOON" | "EXPIRED";

export interface SubscriptionRecord {
  id: string;
  shopName: string;
  owner: string;
  plan: string;
  amountNGN: number;
  startDateISO: string;
  renewalDateISO: string;
  status: SubscriptionStatus;
  agent: string;
}

export interface SubscriptionStat {
  label: string;
  value: string;
  trend: string;
  trendDown?: boolean;
  sub: string;
}

export const mockSubscriptionStats: SubscriptionStat[] = [
  { label: "Total Subscriptions", value: "10,247", trend: "+12.4%", sub: "All time registered shops" },
  { label: "Active Subscriptions", value: "8,891", trend: "+3.1%", sub: "Currently running plans" },
  { label: "Expired Subscriptions", value: "1,356", trend: "-4.2%", trendDown: true, sub: "Action required or renewal…" },
  { label: "Revenue This Month", value: "₦38,650,000", trend: "+18.7%", sub: "Net subscription collecti…" },
];

export const SUBSCRIPTION_TOTAL_COUNT = 10_247;

export const mockSubscriptions: SubscriptionRecord[] = [
  { id: "sub1", shopName: "Alaba Electronics Ltd", owner: "Chidi Okafor", plan: "Monthly", amountNGN: 5_000, startDateISO: "2023-10-01", renewalDateISO: "2023-11-01", status: "ACTIVE", agent: "Segun Arinze" },
  { id: "sub2", shopName: "Balogun Fabric Hub", owner: "Hadiza Bello", plan: "Yearly", amountNGN: 48_000, startDateISO: "2023-01-15", renewalDateISO: "2024-01-15", status: "ACTIVE", agent: "Ngozi Kem" },
  { id: "sub3", shopName: "Oshodi Provisions", owner: "Babatunde Cole", plan: "Weekly", amountNGN: 3_000, startDateISO: "2023-10-24", renewalDateISO: "2023-10-31", status: "ACTIVE", agent: "Deji Alabi" },
  { id: "sub4", shopName: "Yaba Tech Accessories", owner: "Amos Fortune", plan: "3 Months", amountNGN: 12_000, startDateISO: "2023-07-28", renewalDateISO: "2023-10-28", status: "EXPIRING SOON", agent: "Segun Arinze" },
  { id: "sub5", shopName: "Ikeja Mobile Plaza", owner: "Kelechi Nwosu", plan: "6 Months", amountNGN: 24_000, startDateISO: "2023-04-10", renewalDateISO: "2023-10-10", status: "EXPIRED", agent: "Chioma Obi" },
  { id: "sub6", shopName: "Lekki Organic Foods", owner: "Sade Ademola", plan: "Monthly", amountNGN: 5_000, startDateISO: "2023-09-05", renewalDateISO: "2023-10-05", status: "EXPIRED", agent: "Bisi Alao" },
  { id: "sub7", shopName: "Surulere Textiles", owner: "Bisi Ogunleye", plan: "Yearly", amountNGN: 48_000, startDateISO: "2023-02-01", renewalDateISO: "2024-02-01", status: "ACTIVE", agent: "Ngozi Kem" },
  { id: "sub8", shopName: "Makurdi Grains", owner: "Terna Aor", plan: "Monthly", amountNGN: 5_000, startDateISO: "2023-09-12", renewalDateISO: "2023-10-12", status: "EXPIRING SOON", agent: "Deji Alabi" },
  { id: "sub9", shopName: "Calabar Seafood", owner: "Eyo Ita", plan: "6 Months", amountNGN: 24_000, startDateISO: "2023-03-20", renewalDateISO: "2023-09-20", status: "EXPIRED", agent: "Chioma Obi" },
  { id: "sub10", shopName: "Ikeja Gadgets", owner: "Femi Alabi", plan: "Weekly", amountNGN: 3_000, startDateISO: "2023-10-02", renewalDateISO: "2023-10-09", status: "ACTIVE", agent: "Bisi Alao" },
];

/* ------------------------------------------------------------------ */
/* Field Force Comm Engine (admin commissions page) mocks              */
/* ------------------------------------------------------------------ */

export type CommissionLedgerStatus = "PAID" | "PROCESSING" | "PENDING";

export interface CommissionLedger {
  id: string;
  agentName: string;
  agentCode: string;
  type: string;
  merchant: string;
  payoutNGN: number;
  status: CommissionLedgerStatus;
}

export interface CommissionStat {
  label: string;
  valueNGN: number;
  valueClass: string;
  sub: string;
}

export const mockCommissionStats: CommissionStat[] = [
  { label: "Total Paid Commissions", valueNGN: 124_500_000, valueClass: "text-brand-primary", sub: "Disbursed since platform inception" },
  { label: "Pending Accruals", valueNGN: 8_700_000, valueClass: "text-brand-gold", sub: "Escrowed for active verification" },
  { label: "Disbursed This Month", valueNGN: 6_200_000, valueClass: "text-info", sub: "Calculated standard payout velocity" },
  { label: "Recurring Monthly Comm", valueNGN: 4_100_000, valueClass: "text-brand-primary", sub: "Subscription revenue split metric" },
];

export const mockCommissionLedgers: CommissionLedger[] = [
  { id: "cl1", agentName: "Chinedu Okafor", agentCode: "AG-1102", type: "Recurring Sub", merchant: "Belvedere Supermarket", payoutNGN: 12_500, status: "PAID" },
  { id: "cl2", agentName: "Bisi Adebayo", agentCode: "AG-4402", type: "Upfront Setup", merchant: "Adefemi Pharmacy", payoutNGN: 50_000, status: "PROCESSING" },
  { id: "cl3", agentName: "Fatima Bello", agentCode: "AG-8821", type: "Recurring Sub", merchant: "Bello Provisions", payoutNGN: 8_900, status: "PENDING" },
  { id: "cl4", agentName: "Tunde Balogun", agentCode: "AG-LAG042", type: "Upfront Setup", merchant: "Alhaji Electronics", payoutNGN: 50_000, status: "PAID" },
  { id: "cl5", agentName: "Emeka Okafor", agentCode: "AG-ONS017", type: "Recurring Sub", merchant: "Grace Fabrics", payoutNGN: 14_000, status: "PAID" },
  { id: "cl6", agentName: "Ibrahim Musa", agentCode: "AG-KAN011", type: "Upfront Setup", merchant: "Kano Supermarket", payoutNGN: 32_500, status: "PROCESSING" },
  { id: "cl7", agentName: "Chioma Chukwu", agentCode: "AG-ENU031", type: "Recurring Sub", merchant: "Enugu Provisions", payoutNGN: 6_500, status: "PENDING" },
  { id: "cl8", agentName: "Yusuf Haruna", agentCode: "AG-ABJ008", type: "Recurring Sub", merchant: "Abuja Provisions", payoutNGN: 6_500, status: "PAID" },
];

export interface CommissionRules {
  upfront: string;
  residual: string;
  minimum: string;
}

export const mockCommissionRules: CommissionRules = {
  upfront: "₦50,000 Flat rate per Retailer",
  residual: "10% of total Subscription Value",
  minimum: "₦5,000 threshold requirement",
};

/* ------------------------------------------------------------------ */
/* Withdrawal Clearance Terminal (admin withdrawals page) mocks        */
/* ------------------------------------------------------------------ */

export type WithdrawalStatus = "PENDING" | "PROCESSING" | "PAID" | "REJECTED";

export interface WithdrawalRequest {
  id: string;
  agentName: string;
  agentCode: string;
  initials: string;
  amountNGN: number;
  bank: string;
  accountNo: string;
  status: WithdrawalStatus;
}

export interface WithdrawalCompliance {
  riskTier: string;
  ledgerBalanceNGN: number;
  pendingReserveNGN: number;
  lifetimePayoutsNGN: number;
  auditedPass: number;
  auditedTotal: number;
}

export const mockWithdrawalRequests: WithdrawalRequest[] = [
  { id: "wd1", agentName: "Chinedu Okafor", agentCode: "AG-1102", initials: "CO", amountNGN: 250_000, bank: "Zenith Bank Plc", accountNo: "2081190422", status: "PENDING" },
  { id: "wd2", agentName: "Bisi Adebayo", agentCode: "AG-4402", initials: "BA", amountNGN: 85_000, bank: "GTBank", accountNo: "0112450912", status: "PROCESSING" },
  { id: "wd3", agentName: "Fatima Bello", agentCode: "AG-8821", initials: "FB", amountNGN: 420_000, bank: "Access Bank", accountNo: "1002450119", status: "PENDING" },
  { id: "wd4", agentName: "Tunde Balogun", agentCode: "AG-LAG042", initials: "TB", amountNGN: 120_000, bank: "FirstBank", accountNo: "3044556677", status: "PENDING" },
  { id: "wd5", agentName: "Emeka Okafor", agentCode: "AG-ONS017", initials: "EO", amountNGN: 64_000, bank: "UBA", accountNo: "1022334455", status: "PROCESSING" },
  { id: "wd6", agentName: "Ibrahim Musa", agentCode: "AG-KAN011", initials: "IM", amountNGN: 310_000, bank: "Zenith Bank Plc", accountNo: "5077889900", status: "PAID" },
  { id: "wd7", agentName: "Amara Nwosu", agentCode: "AG-PHC019", initials: "AN", amountNGN: 150_000, bank: "GTBank", accountNo: "0123456789", status: "PAID" },
];

/** Hand-written compliance for the featured agents; others use the fallback. */
export const mockWithdrawalCompliance: Record<string, WithdrawalCompliance> = {
  "AG-1102": { riskTier: "Standard Risk tier", ledgerBalanceNGN: 265_000, pendingReserveNGN: 15_000, lifetimePayoutsNGN: 4_850_000, auditedPass: 42, auditedTotal: 42 },
  "AG-4402": { riskTier: "Low Risk tier", ledgerBalanceNGN: 98_000, pendingReserveNGN: 9_500, lifetimePayoutsNGN: 2_140_000, auditedPass: 28, auditedTotal: 28 },
  "AG-8821": { riskTier: "Elevated Risk tier", ledgerBalanceNGN: 445_000, pendingReserveNGN: 32_000, lifetimePayoutsNGN: 1_920_000, auditedPass: 17, auditedTotal: 19 },
};

/**
 * Compliance snapshot for any withdrawal request: hand-written when
 * available, otherwise derived deterministically from the request.
 */
export function complianceFor(req: WithdrawalRequest): WithdrawalCompliance {
  const direct = mockWithdrawalCompliance[req.agentCode];
  if (direct) return direct;
  return {
    riskTier: "Standard Risk tier",
    ledgerBalanceNGN: req.amountNGN + 15_000,
    pendingReserveNGN: 10_000,
    lifetimePayoutsNGN: req.amountNGN * 8,
    auditedPass: 12,
    auditedTotal: 12,
  };
}

/* ------------------------------------------------------------------ */
/* Analytics & Reports Hub (admin reports page) mocks                  */
/* ------------------------------------------------------------------ */

export interface ReportStat {
  label: string;
  valueNGN: number;
  trend: string;
  sub: string;
}

export const mockReportStats: ReportStat[] = [
  { label: "Total Gross Revenue", valueNGN: 148_250_000, trend: "+15.3%", sub: "Combined across all streams" },
  { label: "Subscription Income", valueNGN: 124_500_000, trend: "+21.4%", sub: "Direct recurring platform income" },
  { label: "Commission Payouts", valueNGN: 42_820_000, trend: "+10.8%", sub: "Distributed to registered agents" },
  { label: "Net Platform Revenue", valueNGN: 81_730_000, trend: "+18.2%", sub: "OjaTrack share after commissions" },
];

export interface RegionalSplit {
  state: string;
  shops: number;
}

export const mockRegionalSplit: RegionalSplit[] = [
  { state: "Lagos", shops: 4850 },
  { state: "Oyo", shops: 2410 },
  { state: "Kano", shops: 1247 },
  { state: "Abuja (FCT)", shops: 980 },
  { state: "Rivers", shops: 760 },
];

export interface MonthlyGross {
  month: string;
  amountNGN: number;
}

export const mockMonthlyGross12m: MonthlyGross[] = [
  { month: "Jan", amountNGN: 18_000_000 },
  { month: "Feb", amountNGN: 21_000_000 },
  { month: "Mar", amountNGN: 19_500_000 },
  { month: "Apr", amountNGN: 24_000_000 },
  { month: "May", amountNGN: 26_500_000 },
  { month: "Jun", amountNGN: 25_000_000 },
  { month: "Jul", amountNGN: 29_000_000 },
  { month: "Aug", amountNGN: 31_500_000 },
  { month: "Sep", amountNGN: 30_000_000 },
  { month: "Oct", amountNGN: 34_000_000 },
  { month: "Nov", amountNGN: 36_500_000 },
  { month: "Dec", amountNGN: 39_000_000 },
];

export const mockReportRanges = [
  "Jan 01, 2023 - Dec 31, 2023",
  "Last Quarter",
  "Year to Date",
];

/* ------------------------------------------------------------------ */
/* System Diagnostics (admin system page) mocks                        */
/* ------------------------------------------------------------------ */

export interface SystemStat {
  label: string;
  value: string;
  valueClass: string;
  sub: string;
}

export const mockSystemStats: SystemStat[] = [
  { label: "Global API Response", value: "142 ms", valueClass: "text-brand-primary", sub: "p99 average over last 24 hrs" },
  { label: "Active Sessions", value: "24,891", valueClass: "text-light-primary dark:text-ink-primary", sub: "Concurrent authenticated links" },
  { label: "Offline Sync Queue", value: "12", valueClass: "text-light-primary dark:text-ink-primary", sub: "Jobs pending local replication" },
  { label: "Failover Redundancy", value: "99.99%", valueClass: "text-brand-primary", sub: "Distributed clusters operational" },
];

export type SystemServiceStatus = "OPERATIONAL" | "DEGRADED" | "DOWN";

export interface SystemService {
  id: string;
  name: string;
  status: SystemServiceStatus;
  uptimePct: number;
}

export const mockSystemServices: SystemService[] = [
  { id: "oauth", name: "OAuth 2.0 Auth Server", status: "OPERATIONAL", uptimePct: 99.98 },
  { id: "ledger", name: "Core Transaction Ledger", status: "OPERATIONAL", uptimePct: 100.0 },
  { id: "fwwh", name: "Flutterwave Webhook Node", status: "OPERATIONAL", uptimePct: 99.95 },
  { id: "push", name: "Notification Push Router", status: "OPERATIONAL", uptimePct: 99.99 },
  { id: "cache", name: "Local Cache Sync Broker", status: "DEGRADED", uptimePct: 98.42 },
  { id: "geo", name: "Agent Geolocation Engine", status: "DOWN", uptimePct: 94.2 },
];

export type SystemLogLevel = "CRIT" | "WARN" | "INFO";

export interface SystemLog {
  id: string;
  timeUTC: string;
  level: SystemLogLevel;
  message: string;
}

export const mockSystemLogs: SystemLog[] = [
  { id: "log1", timeUTC: "12:04:22 UTC", level: "CRIT", message: "Agent Geolocation Engine connection lost. Restarting cluster…" },
  { id: "log2", timeUTC: "11:59:10 UTC", level: "WARN", message: "High replication latency detected on node DB-SYNC-04. Health check triggered." },
  { id: "log3", timeUTC: "11:42:01 UTC", level: "INFO", message: "Batch settlement transaction completed for GTBank gateway interface." },
];

/* ------------------------------------------------------------------ */
/* System Configuration (admin settings page) mocks                    */
/* ------------------------------------------------------------------ */

export interface CommissionConfig {
  upfrontPct: number;
  recurringPct: number;
  minWithdrawalNGN: number;
}

export const mockCommissionConfig: CommissionConfig = {
  upfrontPct: 40,
  recurringPct: 20,
  minWithdrawalNGN: 10_000,
};

export interface PlanPrice {
  id: string;
  plan: string;
  amountNGN: number;
}

export const mockPlanPrices: PlanPrice[] = [
  { id: "pp1", plan: "Weekly", amountNGN: 3_000 },
  { id: "pp2", plan: "Monthly", amountNGN: 5_000 },
  { id: "pp3", plan: "3 Months", amountNGN: 12_000 },
  { id: "pp4", plan: "6 Months", amountNGN: 24_000 },
  { id: "pp5", plan: "Yearly", amountNGN: 48_000 },
];

export interface NotificationChannel {
  id: string;
  name: string;
  desc: string;
  enabled: boolean;
}

export const mockNotificationChannels: NotificationChannel[] = [
  { id: "nc1", name: "Email Notifications", desc: "Sends regular commission alerts & ledger logs.", enabled: true },
  { id: "nc2", name: "SMS Alerts", desc: "Urgent withdrawal status & agent onboarding.", enabled: true },
  { id: "nc3", name: "Push Notifications", desc: "Real-time updates on active system triggers.", enabled: false },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const mockAdminUsers: AdminUser[] = [
  { id: "au1", name: "Tunde Ojo", email: "tunde@ojatrack.com", role: "SUPER ADMIN" },
  { id: "au2", name: "Bisi Ademola", email: "bisi@ojatrack.com", role: "FINANCE" },
  { id: "au3", name: "Sani Yusuf", email: "sani@ojatrack.com", role: "OPERATIONS" },
  { id: "au4", name: "Chioma Obi", email: "chioma@ojatrack.com", role: "SUPPORT" },
];

export const mockGateway = {
  name: "Flutterwave Gateway",
  sub: "Production environment keys connected",
  status: "ACTIVE",
};
