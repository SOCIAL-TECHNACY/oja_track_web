import type { AuthContextUser } from "@/types/auth";

export function getDashboardRouteForRole(user: AuthContextUser | null): string {
  if (!user) return "/login";

  switch (user.role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/dashboard/admin";
    case "AGENT":
      return "/dashboard/agent";
    case "ORG_ADMIN":
      return "/shop/dashboard";
    case "SHOP_STAFF":
      return "/shop/sales";
    default:
      return "/login";
  }
}

export function isRouteAllowed(pathname: string, user: AuthContextUser | null): boolean {
  if (!user) {
    // Public routes are always allowed
    return (
      pathname === "/" ||
      pathname === "/login" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/agent/login") ||
      pathname.startsWith("/shop/login") ||
      pathname.startsWith("/admin/login") ||
      pathname.startsWith("/shop/register") ||
      pathname.startsWith("/agent/register") ||
      pathname.startsWith("/verify-otp") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/reset-password") ||
      pathname === "/about" ||
      pathname === "/agents" ||
      pathname === "/for-shop-owners" ||
      pathname === "/how-it-works" ||
      pathname === "/pricing" ||
      pathname === "/contact" ||
      pathname === "/faq" ||
      pathname === "/privacy-policy" ||
      pathname === "/terms-of-service" ||
      pathname === "/design-system"
    );
  }

  // Super Admin routes
  if (pathname.startsWith("/dashboard/admin")) {
    return user.role === "SUPER_ADMIN" || user.role === "ADMIN";
  }

  // Agent routes
  if (pathname.startsWith("/dashboard/agent")) {
    return user.role === "AGENT";
  }

  // Shop routes
  if (pathname.startsWith("/shop")) {
    // Both ORG_ADMIN and SHOP_STAFF can access shop, but staff is restricted to /shop/sales and /shop/offline-queue
    if (user.role === "SHOP_STAFF") {
      return (
        pathname === "/shop/sales" ||
        pathname.startsWith("/shop/sales") ||
        pathname === "/shop/offline-queue"
      );
    }
    return user.role === "ORG_ADMIN";
  }

  return true;
}
