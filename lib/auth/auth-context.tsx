"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMeApi, loginApi, logoutApi } from "@/lib/api/auth";
import {
  decodeJwtExpiry,
  getAccessToken,
  refreshAccessToken,
  setAccessToken,
  setOnUnauthorized,
} from "@/lib/api/client";
import { getDashboardRouteForRole, isRouteAllowed } from "./route-utils";
import type { AuthContextUser, SafeUser, UserRole } from "@/types/auth";

interface AuthContextType {
  user: AuthContextUser | null;
  safeUser: SafeUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access: string, pass: string) => Promise<{ success: boolean; role: UserRole; destination: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [safeUser, setSafeUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setSafeUser(null);
      setAccessToken(null);
      router.push("/login");
    }
  }, [router]);

  const refreshSession = useCallback(async () => {
    try {
      const res = await getMeApi();
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  // Initialize session on mount
  useEffect(() => {
    setOnUnauthorized(() => {
      setUser(null);
      setSafeUser(null);
    });

    async function initSession() {
      const hasStoredToken =
        typeof window !== "undefined" && localStorage.getItem("ojatrack_access_token");
      const hasActiveSession =
        typeof window !== "undefined" && sessionStorage.getItem("ojatrack_at_active");

      if (hasStoredToken || hasActiveSession) {
        try {
          const token = getAccessToken();
          if (token) {
            const expMs = decodeJwtExpiry(token);
            // If token has already expired while inactive, silently rotate it
            if (expMs && Date.now() >= expMs - 5000) {
              await refreshAccessToken();
            }
          }

          const res = await getMeApi();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            setUser(null);
            setAccessToken(null);
          }
        } catch {
          // Session expired or unauthenticated
          setUser(null);
          setAccessToken(null);
        }
      }
      setIsLoading(false);
    }

    initSession();

    // Browser debugging helper for Martins / Daniel to verify silent refresh on demand
    if (typeof window !== "undefined") {
      (window as any).__ojatrack_test_expiry = async () => {
        console.log(
          "%c[OjaTrack Test] Testing Token Expiration & Silent Refresh...",
          "color: #00c853; font-weight: bold;"
        );
        console.log("[1] Invalidating access token in memory with expired timestamp...");
        setAccessToken(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtZXhwaXJlZCIsImV4cCI6MTcwMDAwMDAwMH0.test_signature"
        );
        console.log("[2] Calling /api/v1/auth/me to trigger 401 interception...");
        try {
          const res = await getMeApi();
          console.log(
            "%c[3] SUCCESS! Token was silently refreshed in the background without logging you out:",
            "color: #00c853; font-weight: bold;",
            res
          );
          return {
            success: true,
            message: "Token refreshed silently! User stayed logged in.",
            user: res.user,
          };
        } catch (err: any) {
          console.error("[OjaTrack Test] Refresh failed:", err);
          return { success: false, error: err };
        }
      };
    }
  }, []);

  // Route protection gate
  useEffect(() => {
    if (isLoading) return;

    if (!isRouteAllowed(pathname, user)) {
      if (!user) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        // Redirect to their assigned dashboard if accessing an unauthorized surface
        const dest = getDashboardRouteForRole(user);
        router.push(dest);
      }
    }
  }, [pathname, user, isLoading, router]);

  const login = async (access: string, pass: string) => {
    setIsLoading(true);
    try {
      const loginRes = await loginApi(access, pass);
      setSafeUser(loginRes.user);

      // Fetch active role & organization context
      const meRes = await getMeApi();
      if (meRes.success && meRes.user) {
        setUser(meRes.user);
        const destination = getDashboardRouteForRole(meRes.user);
        return {
          success: true,
          role: meRes.user.role,
          destination,
        };
      } else {
        throw new Error("Unable to resolve user role. Please contact support.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await handleLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        safeUser,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
