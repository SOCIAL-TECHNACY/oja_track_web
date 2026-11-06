import type { NextConfig } from "next";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const backendTarget =
  rawApiUrl && rawApiUrl.startsWith("http")
    ? rawApiUrl.replace(/\/api\/v1\/?$/, "")
    : "https://oja-track-server.onrender.com";

/**
 * OjaTrack Web Application
 * Production configuration for Vercel & Fastify REST API.
 * Proxies /api/v1 calls to the backend so cookies (refreshToken) remain same-origin,
 * preventing cross-site SameSite=Lax cookie blocks on token refresh.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendTarget}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
