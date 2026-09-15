/*
 * Admin dashboard data contract.
 * Mock-first, mirroring the agent-dashboard module: replace the mock
 * imports with fetch calls later — types stay the same.
 */

import type { DashboardUser } from "@/app/components/dashboard/types";

export const mockAdminUser: DashboardUser = {
  name: "OjaTrack Admin",
  code: "AD-ADMIN01",
  initials: "OA",
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
