/*
 * Agent dashboard data contract.
 * Mock-first: `mockAgentOverview` mirrors the Figma screenshot so the
 * overview page can ship without a backend. Replace the mock import
 * with a fetch call later — types stay the same.
 */

export type CommissionType = "First Sale" | "Recurring";

export interface AgentProfile {
  name: string;
  firstName: string;
  code: string;
  initials: string;
  referralCode: string;
}

export interface AgentStats {
  totalShops: number;
  activeShops: number;
  expiredShops: number;
  totalEarningsNGN: number;
  availableBalanceNGN: number;
  pendingCommissionNGN: number;
}

export interface CommissionItem {
  id: string;
  shopName: string;
  /** ISO date string, e.g. "2024-10-24" */
  dateISO: string;
  type: CommissionType;
  amountNGN: number;
}

export interface RenewalItem {
  id: string;
  shopName: string;
  daysLeft: number;
  worthNGN: number;
  commissionNGN: number;
}

export interface AgentOverview {
  profile: AgentProfile;
  stats: AgentStats;
  commissions: CommissionItem[];
  renewals: RenewalItem[];
}

export const mockAgentOverview: AgentOverview = {
  profile: {
    name: "Chinedu Okoro",
    firstName: "Chinedu",
    code: "AG-EME123",
    initials: "CO",
    referralCode: "OJA-EME-REF",
  },
  stats: {
    totalShops: 47,
    activeShops: 38,
    expiredShops: 9,
    totalEarningsNGN: 876500,
    availableBalanceNGN: 124000,
    pendingCommissionNGN: 45000,
  },
  commissions: [
    {
      id: "c1",
      shopName: "Alhaji Electronics",
      dateISO: "2024-10-24",
      type: "First Sale",
      amountNGN: 28000,
    },
    {
      id: "c2",
      shopName: "Grace Fabrics",
      dateISO: "2024-10-22",
      type: "First Sale",
      amountNGN: 14000,
    },
    {
      id: "c3",
      shopName: "Chidi Spares",
      dateISO: "2024-10-19",
      type: "Recurring",
      amountNGN: 6500,
    },
    {
      id: "c4",
      shopName: "Obi Phones",
      dateISO: "2024-10-15",
      type: "Recurring",
      amountNGN: 6500,
    },
    {
      id: "c5",
      shopName: "Yomi Groceries",
      dateISO: "2024-10-12",
      type: "First Sale",
      amountNGN: 28000,
    },
  ],
  renewals: [
    {
      id: "r1",
      shopName: "Kano Supermarket",
      daysLeft: 3,
      worthNGN: 32500,
      commissionNGN: 6500,
    },
    {
      id: "r2",
      shopName: "Ibadan Auto Parts",
      daysLeft: 9,
      worthNGN: 14000,
      commissionNGN: 2800,
    },
    {
      id: "r3",
      shopName: "Lagos Boutique",
      daysLeft: 14,
      worthNGN: 28000,
      commissionNGN: 5600,
    },
  ],
};

const ngnFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatNGN(amount: number): string {
  // Intl renders "NGN 123" in some environments — normalize to ₦.
  return ngnFormatter.format(amount).replace(/^NGN\s?/, "₦");
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatCommissionDate(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00`);
  return dateFormatter.format(d);
}

export type RenewalUrgency = "critical" | "warning";

export function getRenewalUrgency(daysLeft: number): RenewalUrgency {
  return daysLeft <= 3 ? "critical" : "warning";
}

export type ShopStatus = "Active" | "Expired";
export type SubscriptionPlan = "Monthly" | "Annual";

export interface OnboardedShop {
  id: string;
  shopName: string;
  owner: string;
  location: string;
  status: ShopStatus;
  subscription: SubscriptionPlan;
  /** Display string, e.g. "Oct 2025" or "Expired" */
  renewalDate: string;
  commissionNGN: number;
  /** Display string, e.g. "Today" or "Expired Oct 10" */
  lastActive: string;
}

/** Total fleet size shown in the footer label ("Showing 1–8 of 47 shops"). */
export const TOTAL_SHOPS_COUNT = 47;

export const mockOnboardedShops: OnboardedShop[] = [
  {
    id: "s1",
    shopName: "Alhaji Electronics",
    owner: "Alhaji Musa",
    location: "Kano",
    status: "Active",
    subscription: "Annual",
    renewalDate: "Oct 2025",
    commissionNGN: 56000,
    lastActive: "Today",
  },
  {
    id: "s2",
    shopName: "Grace Fabrics",
    owner: "Mrs. Adebayo",
    location: "Ibadan",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Nov 2024",
    commissionNGN: 14000,
    lastActive: "Yesterday",
  },
  {
    id: "s3",
    shopName: "Chidi Spares",
    owner: "Chidi Nnamdi",
    location: "Enugu",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Nov 2024",
    commissionNGN: 6500,
    lastActive: "2 days ago",
  },
  {
    id: "s4",
    shopName: "Obi Phones",
    owner: "Obinna Okafor",
    location: "Lagos",
    status: "Active",
    subscription: "Annual",
    renewalDate: "Sep 2025",
    commissionNGN: 56000,
    lastActive: "4 days ago",
  },
  {
    id: "s5",
    shopName: "Yomi Groceries",
    owner: "Yomi Shonukan",
    location: "Lagos",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Nov 2024",
    commissionNGN: 6500,
    lastActive: "1 week ago",
  },
  {
    id: "s6",
    shopName: "Kaduna Agro Sales",
    owner: "Ibrahim Bello",
    location: "Kaduna",
    status: "Expired",
    subscription: "Monthly",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Oct 10",
  },
  {
    id: "s7",
    shopName: "Kwara Medicals",
    owner: "Dr. Jimoh",
    location: "Ilorin",
    status: "Expired",
    subscription: "Annual",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Oct 15",
  },
  {
    id: "s8",
    shopName: "Port Harcourt Retail",
    owner: "Patience Amadi",
    location: "PH",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Dec 2024",
    commissionNGN: 6500,
    lastActive: "2 weeks ago",
  },
  {
    id: "s9",
    shopName: "Abuja Provisions",
    owner: "Emeka Eze",
    location: "Abuja",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Jan 2025",
    commissionNGN: 6500,
    lastActive: "2 weeks ago",
  },
  {
    id: "s10",
    shopName: "Onitsha Plastics",
    owner: "Ngozi Umeh",
    location: "Onitsha",
    status: "Active",
    subscription: "Annual",
    renewalDate: "Feb 2025",
    commissionNGN: 56000,
    lastActive: "3 weeks ago",
  },
  {
    id: "s11",
    shopName: "Aba Fashion Hub",
    owner: "Tunde Bakare",
    location: "Aba",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Dec 2024",
    commissionNGN: 6500,
    lastActive: "3 weeks ago",
  },
  {
    id: "s12",
    shopName: "Jos Frozen Foods",
    owner: "Hauwa Sani",
    location: "Jos",
    status: "Expired",
    subscription: "Monthly",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Sep 28",
  },
  {
    id: "s13",
    shopName: "Benin Bookshop",
    owner: "Osas Ighodaro",
    location: "Benin",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Jan 2025",
    commissionNGN: 14000,
    lastActive: "1 month ago",
  },
  {
    id: "s14",
    shopName: "Warri Auto Care",
    owner: "Efe Oghene",
    location: "Warri",
    status: "Active",
    subscription: "Annual",
    renewalDate: "Mar 2025",
    commissionNGN: 56000,
    lastActive: "1 month ago",
  },
  {
    id: "s15",
    shopName: "Owerri Cosmetics",
    owner: "Adaeze Mba",
    location: "Owerri",
    status: "Expired",
    subscription: "Annual",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Sep 12",
  },
  {
    id: "s16",
    shopName: "Ikeja Gadgets",
    owner: "Femi Alabi",
    location: "Lagos",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Feb 2025",
    commissionNGN: 14000,
    lastActive: "1 month ago",
  },
  {
    id: "s17",
    shopName: "Surulere Textiles",
    owner: "Bisi Ogunleye",
    location: "Lagos",
    status: "Active",
    subscription: "Annual",
    renewalDate: "Apr 2025",
    commissionNGN: 56000,
    lastActive: "1 month ago",
  },
  {
    id: "s18",
    shopName: "Makurdi Grains",
    owner: "Terna Aor",
    location: "Makurdi",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Jan 2025",
    commissionNGN: 6500,
    lastActive: "1 month ago",
  },
  {
    id: "s19",
    shopName: "Enugu Provisions",
    owner: "Uche Nwosu",
    location: "Enugu",
    status: "Expired",
    subscription: "Monthly",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Aug 30",
  },
  {
    id: "s20",
    shopName: "Calabar Seafood",
    owner: "Eyo Ita",
    location: "Calabar",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Mar 2025",
    commissionNGN: 14000,
    lastActive: "2 months ago",
  },
  {
    id: "s21",
    shopName: "Sokoto Leather",
    owner: "Aliyu Danbaba",
    location: "Sokoto",
    status: "Active",
    subscription: "Annual",
    renewalDate: "May 2025",
    commissionNGN: 56000,
    lastActive: "2 months ago",
  },
  {
    id: "s22",
    shopName: "Awka Stationery",
    owner: "Ify Obidike",
    location: "Awka",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Feb 2025",
    commissionNGN: 6500,
    lastActive: "2 months ago",
  },
  {
    id: "s23",
    shopName: "Ilorin Beverages",
    owner: "Suleiman Ade",
    location: "Ilorin",
    status: "Expired",
    subscription: "Annual",
    renewalDate: "Expired",
    commissionNGN: 0,
    lastActive: "Expired Aug 15",
  },
  {
    id: "s24",
    shopName: "Lekki Organics",
    owner: "Kemi Adeleke",
    location: "Lagos",
    status: "Active",
    subscription: "Monthly",
    renewalDate: "Mar 2025",
    commissionNGN: 14000,
    lastActive: "2 months ago",
  },
];

export function shopMatchesQuery(shop: OnboardedShop, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    shop.shopName.toLowerCase().includes(q) ||
    shop.owner.toLowerCase().includes(q)
  );
}

export interface ShopRenewal {
  id: string;
  shopName: string;
  owner: string;
  dueDateISO: string;
  /** Days until expiry. <= 0 means expired. */
  daysLeft: number;
  subscriptionCostNGN: number;
}

export type RenewalTab = "pending" | "expiring" | "expired";

export type RenewalStatus = "pending" | "expiring" | "expired";

export function getRenewalStatus(r: Pick<ShopRenewal, "daysLeft">): RenewalStatus {
  if (r.daysLeft <= 0) return "expired";
  if (r.daysLeft < 30) return "expiring";
  return "pending";
}

/** Agent's cut of a renewal: 20% of the subscription cost. */
export function getRenewalCommission(costNGN: number): number {
  return Math.round(costNGN * 0.2);
}

export interface EarningsSummary {
  totalCumulativeNGN: number;
  thisMonthNGN: number;
  thisMonthLabel: string;
  recurringAverageNGN: number;
  nextMonthEstimateNGN: number;
}

export interface MonthlyRevenue {
  month: string;
  amountNGN: number;
}

export interface EarningSplit {
  label: string;
  percent: number;
  /** Fill bar classes (track is shared). */
  barClass: string;
}

export const mockEarningsSummary: EarningsSummary = {
  totalCumulativeNGN: 876500,
  thisMonthNGN: 67000,
  thisMonthLabel: "October revenue",
  recurringAverageNGN: 145200,
  nextMonthEstimateNGN: 95000,
};

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: "May", amountNGN: 18000 },
  { month: "Jun", amountNGN: 42000 },
  { month: "Jul", amountNGN: 28000 },
  { month: "Aug", amountNGN: 62000 },
  { month: "Sep", amountNGN: 40000 },
  { month: "Oct", amountNGN: 72000 },
];

export const mockEarningSplit: EarningSplit[] = [
  {
    label: "Upfront Onboardings (40%)",
    percent: 70,
    barClass: "bg-brand-primary",
  },
  {
    label: "Recurring Renewals (20%)",
    percent: 30,
    barClass: "bg-brand-gold",
  },
];

/** Display label for a commission event, e.g. "First Sale (40%)". */
export function getCommissionRateLabel(type: CommissionType): string {
  return type === "First Sale" ? "First Sale (40%)" : "Recurring (20%)";
}

export interface PayoutRecord {
  id: string;
  amountNGN: number;
  dateISO: string;
  ref: string;
  bankLabel: string;
  status: "Completed";
}

export const MIN_PAYOUT_NGN = 10_000;

export const mockPayoutDestination = {
  bank: "GTBank PLC",
  shortName: "GTBank",
  accountNumber: "0123456789",
  verifiedName: "CHINEDU OKORO",
};

export const mockPayoutHistory: PayoutRecord[] = [
  {
    id: "p1",
    amountNGN: 40000,
    dateISO: "2024-10-20",
    ref: "TXN-88219",
    bankLabel: "GTBank (***124)",
    status: "Completed",
  },
  {
    id: "p2",
    amountNGN: 15000,
    dateISO: "2024-10-05",
    ref: "TXN-87114",
    bankLabel: "GTBank (***124)",
    status: "Completed",
  },
  {
    id: "p3",
    amountNGN: 50000,
    dateISO: "2024-09-28",
    ref: "TXN-85002",
    bankLabel: "GTBank (***124)",
    status: "Completed",
  },
];

/** Parse a user-typed naira amount ("₦50,000" / "50000") into a number. */
export function parsePayoutAmount(raw: string): number {
  const cleaned = raw.replace(/[₦,\s]/g, "");
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return NaN;
  return Number(cleaned);
}

export type LeaderboardPeriod = "monthly" | "quarterly" | "allTime";

export interface LeaderboardEntry {
  rank: number;
  agentName: string;
  isCurrentUser: boolean;
  onboarded: number;
  activeShops: number;
  renewalRatePct: number;
  cumulativeEarningsNGN: number;
}

export const mockLeaderboard: Record<LeaderboardPeriod, LeaderboardEntry[]> = {
  monthly: [
    { rank: 1, agentName: "Tunde Balogun", isCurrentUser: false, onboarded: 94, activeShops: 88, renewalRatePct: 98, cumulativeEarningsNGN: 1850000 },
    { rank: 2, agentName: "Emeka Okafor", isCurrentUser: false, onboarded: 82, activeShops: 75, renewalRatePct: 92, cumulativeEarningsNGN: 1510000 },
    { rank: 3, agentName: "Funmi Adebayo", isCurrentUser: false, onboarded: 76, activeShops: 68, renewalRatePct: 95, cumulativeEarningsNGN: 1320000 },
    { rank: 4, agentName: "Ibrahim Musa", isCurrentUser: false, onboarded: 61, activeShops: 55, renewalRatePct: 91, cumulativeEarningsNGN: 1102000 },
    { rank: 5, agentName: "Chioma Chukwu", isCurrentUser: false, onboarded: 58, activeShops: 49, renewalRatePct: 89, cumulativeEarningsNGN: 995000 },
    { rank: 6, agentName: "Yusuf Haruna", isCurrentUser: false, onboarded: 51, activeShops: 43, renewalRatePct: 94, cumulativeEarningsNGN: 912000 },
    { rank: 7, agentName: "Chinedu Okoro", isCurrentUser: true, onboarded: 47, activeShops: 38, renewalRatePct: 86, cumulativeEarningsNGN: 876500 },
    { rank: 8, agentName: "Amara Nwosu", isCurrentUser: false, onboarded: 42, activeShops: 35, renewalRatePct: 88, cumulativeEarningsNGN: 745000 },
  ],
  quarterly: [
    { rank: 1, agentName: "Funmi Adebayo", isCurrentUser: false, onboarded: 148, activeShops: 132, renewalRatePct: 96, cumulativeEarningsNGN: 3420000 },
    { rank: 2, agentName: "Tunde Balogun", isCurrentUser: false, onboarded: 141, activeShops: 128, renewalRatePct: 95, cumulativeEarningsNGN: 3280000 },
    { rank: 3, agentName: "Emeka Okafor", isCurrentUser: false, onboarded: 129, activeShops: 114, renewalRatePct: 93, cumulativeEarningsNGN: 2940000 },
    { rank: 4, agentName: "Ibrahim Musa", isCurrentUser: false, onboarded: 104, activeShops: 92, renewalRatePct: 90, cumulativeEarningsNGN: 2310000 },
    { rank: 5, agentName: "Chinedu Okoro", isCurrentUser: true, onboarded: 96, activeShops: 81, renewalRatePct: 88, cumulativeEarningsNGN: 2140000 },
    { rank: 6, agentName: "Chioma Chukwu", isCurrentUser: false, onboarded: 91, activeShops: 77, renewalRatePct: 87, cumulativeEarningsNGN: 1980000 },
    { rank: 7, agentName: "Yusuf Haruna", isCurrentUser: false, onboarded: 84, activeShops: 70, renewalRatePct: 91, cumulativeEarningsNGN: 1820000 },
    { rank: 8, agentName: "Amara Nwosu", isCurrentUser: false, onboarded: 73, activeShops: 61, renewalRatePct: 85, cumulativeEarningsNGN: 1560000 },
  ],
  allTime: [
    { rank: 1, agentName: "Tunde Balogun", isCurrentUser: false, onboarded: 312, activeShops: 268, renewalRatePct: 94, cumulativeEarningsNGN: 9850000 },
    { rank: 2, agentName: "Funmi Adebayo", isCurrentUser: false, onboarded: 295, activeShops: 251, renewalRatePct: 95, cumulativeEarningsNGN: 9210000 },
    { rank: 3, agentName: "Emeka Okafor", isCurrentUser: false, onboarded: 271, activeShops: 228, renewalRatePct: 91, cumulativeEarningsNGN: 8400000 },
    { rank: 4, agentName: "Chinedu Okoro", isCurrentUser: true, onboarded: 238, activeShops: 196, renewalRatePct: 89, cumulativeEarningsNGN: 7120000 },
    { rank: 5, agentName: "Ibrahim Musa", isCurrentUser: false, onboarded: 224, activeShops: 184, renewalRatePct: 88, cumulativeEarningsNGN: 6680000 },
    { rank: 6, agentName: "Chioma Chukwu", isCurrentUser: false, onboarded: 205, activeShops: 168, renewalRatePct: 86, cumulativeEarningsNGN: 5940000 },
    { rank: 7, agentName: "Yusuf Haruna", isCurrentUser: false, onboarded: 189, activeShops: 152, renewalRatePct: 90, cumulativeEarningsNGN: 5410000 },
    { rank: 8, agentName: "Amara Nwosu", isCurrentUser: false, onboarded: 166, activeShops: 134, renewalRatePct: 84, cumulativeEarningsNGN: 4620000 },
  ],
};

export const mockShopRenewals: ShopRenewal[] = [
  {
    id: "rn1",
    shopName: "Ikeja Mobile",
    owner: "Segun Craig",
    dueDateISO: "2024-12-20",
    daysLeft: 50,
    subscriptionCostNGN: 70000,
  },
  {
    id: "rn2",
    shopName: "Kano Supermarket",
    owner: "Alhaji Musa",
    dueDateISO: "2024-11-02",
    daysLeft: 3,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn3",
    shopName: "Ibadan Auto Parts",
    owner: "Mrs. Adebayo",
    dueDateISO: "2024-11-08",
    daysLeft: 9,
    subscriptionCostNGN: 14000,
  },
  {
    id: "rn4",
    shopName: "Lagos Boutique",
    owner: "Yomi Shonukan",
    dueDateISO: "2024-11-13",
    daysLeft: 14,
    subscriptionCostNGN: 28000,
  },
  {
    id: "rn5",
    shopName: "Grace Fabrics",
    owner: "Mrs. Adebayo",
    dueDateISO: "2024-11-21",
    daysLeft: 22,
    subscriptionCostNGN: 70000,
  },
  {
    id: "rn6",
    shopName: "Alhaji Electronics",
    owner: "Alhaji Musa",
    dueDateISO: "2025-01-05",
    daysLeft: 66,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn7",
    shopName: "Obi Phones",
    owner: "Obinna Okafor",
    dueDateISO: "2025-01-12",
    daysLeft: 73,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn8",
    shopName: "Chidi Spares",
    owner: "Chidi Nnamdi",
    dueDateISO: "2024-12-02",
    daysLeft: 32,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn9",
    shopName: "Yomi Groceries",
    owner: "Yomi Shonukan",
    dueDateISO: "2024-12-10",
    daysLeft: 40,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn10",
    shopName: "Port Harcourt Retail",
    owner: "Patience Amadi",
    dueDateISO: "2024-12-18",
    daysLeft: 48,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn11",
    shopName: "Abuja Provisions",
    owner: "Emeka Eze",
    dueDateISO: "2025-01-20",
    daysLeft: 81,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn12",
    shopName: "Onitsha Plastics",
    owner: "Ngozi Umeh",
    dueDateISO: "2025-02-02",
    daysLeft: 94,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn13",
    shopName: "Aba Fashion Hub",
    owner: "Tunde Bakare",
    dueDateISO: "2024-12-25",
    daysLeft: 55,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn14",
    shopName: "Benin Bookshop",
    owner: "Osas Ighodaro",
    dueDateISO: "2025-01-08",
    daysLeft: 69,
    subscriptionCostNGN: 70000,
  },
  {
    id: "rn15",
    shopName: "Kaduna Agro Sales",
    owner: "Ibrahim Bello",
    dueDateISO: "2024-10-10",
    daysLeft: 0,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn16",
    shopName: "Kwara Medicals",
    owner: "Dr. Jimoh",
    dueDateISO: "2024-10-15",
    daysLeft: 0,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn17",
    shopName: "Jos Frozen Foods",
    owner: "Hauwa Sani",
    dueDateISO: "2024-09-28",
    daysLeft: 0,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn18",
    shopName: "Owerri Cosmetics",
    owner: "Adaeze Mba",
    dueDateISO: "2024-09-12",
    daysLeft: 0,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn19",
    shopName: "Enugu Provisions",
    owner: "Uche Nwosu",
    dueDateISO: "2024-08-30",
    daysLeft: 0,
    subscriptionCostNGN: 32500,
  },
  {
    id: "rn20",
    shopName: "Ilorin Beverages",
    owner: "Suleiman Ade",
    dueDateISO: "2024-08-15",
    daysLeft: 0,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn21",
    shopName: "Calabar Seafood",
    owner: "Eyo Ita",
    dueDateISO: "2024-10-02",
    daysLeft: 0,
    subscriptionCostNGN: 70000,
  },
  {
    id: "rn22",
    shopName: "Sokoto Leather",
    owner: "Aliyu Danbaba",
    dueDateISO: "2024-09-20",
    daysLeft: 0,
    subscriptionCostNGN: 280000,
  },
  {
    id: "rn23",
    shopName: "Awka Stationery",
    owner: "Ify Obidike",
    dueDateISO: "2024-10-05",
    daysLeft: 0,
    subscriptionCostNGN: 32500,
  },
];
