"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMeApi, loginApi, logoutApi } from "@/lib/api/auth";
import { setAccessToken, setOnUnauthorized } from "@/lib/api/client";
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
      // If we previously had an active session flag, try silent restore
      const hasActiveSession = typeof window !== "undefined" && sessionStorage.getItem("ojatrack_at_active");
      if (hasActiveSession) {
        try {
          const res = await getMeApi();
          if (res.success && res.user) {
            setUser(res.user);
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

  const role = user?.role ?? null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        safeUser,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout: handleLogout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
