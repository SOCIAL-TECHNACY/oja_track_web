import { API_BASE, BACKEND_DIRECT_URL, ENDPOINTS, IS_API_CONFIGURED } from "./endpoints";

let inMemoryToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
let onUnauthorizedCallback: (() => void) | null = null;
let proactiveTimer: any = null;

export function decodeJwtExpiry(token: string): number | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);
    return typeof parsed.exp === "number" ? parsed.exp * 1000 : null;
  } catch {
    return null;
  }
}

function scheduleProactiveRefresh(token: string) {
  if (typeof window === "undefined") return;

  if (proactiveTimer) {
    clearTimeout(proactiveTimer);
    proactiveTimer = null;
  }

  const expMs = decodeJwtExpiry(token);
  if (!expMs) return;

  const now = Date.now();
  // Refresh 2 minutes (120,000ms) before token expiry, or in 15 seconds if close
  const triggerIn = Math.max(expMs - now - 120000, 15000);

  proactiveTimer = window.setTimeout(async () => {
    try {
      await refreshAccessToken();
    } catch {
      // Handled internally in refreshAccessToken
    }
  }, triggerIn);
}

export function setAccessToken(token: string | null) {
  inMemoryToken = token;

  if (typeof window !== "undefined") {
    if (proactiveTimer) {
      clearTimeout(proactiveTimer);
      proactiveTimer = null;
    }

    if (token) {
      localStorage.setItem("ojatrack_access_token", token);
      sessionStorage.setItem("ojatrack_at_active", "1");
      scheduleProactiveRefresh(token);
    } else {
      localStorage.removeItem("ojatrack_access_token");
      sessionStorage.removeItem("ojatrack_at_active");
    }
  }
}

export function getAccessToken(): string | null {
  if (!inMemoryToken && typeof window !== "undefined") {
    const stored = localStorage.getItem("ojatrack_access_token");
    if (stored) {
      inMemoryToken = stored;
      scheduleProactiveRefresh(stored);
    }
  }
  return inMemoryToken;
}

export function setOnUnauthorized(cb: () => void) {
  onUnauthorizedCallback = cb;
}

export interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export class ApiError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      // 1. Primary attempt: relative /api/v1/auth/refresh proxying through Next.js
      let res = await fetch(ENDPOINTS.AUTH.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // 2. Direct fallback attempt if relative route failed
      if (!res.ok && ENDPOINTS.AUTH.REFRESH.startsWith("/")) {
        try {
          const directRes = await fetch(`${BACKEND_DIRECT_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (directRes.ok) {
            res = directRes;
          }
        } catch {
          // Keep primary res
        }
      }

      if (!res.ok) {
        setAccessToken(null);
        return null;
      }

      const data = await res.json();
      if (data.success && data.accessToken) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      }

      setAccessToken(null);
      return null;
    } catch {
      setAccessToken(null);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiClient<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && !IS_API_CONFIGURED) {
    throw new ApiError(
      "Backend API URL is not configured. Please set NEXT_PUBLIC_API_URL in environment settings.",
      0,
      { unconfigured: true }
    );
  }

  const { skipAuth = false, headers = {}, ...rest } = options;

  let currentToken = getAccessToken();

  // If token is already known to be expired, refresh it before dispatching
  if (!skipAuth && currentToken) {
    const expMs = decodeJwtExpiry(currentToken);
    if (expMs && Date.now() >= expMs - 5000) {
      currentToken = await refreshAccessToken();
    }
  }

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (!skipAuth && currentToken) {
    requestHeaders["Authorization"] = `Bearer ${currentToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
      credentials: "include", // Always include cookies
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Network error. Please check your internet connection.";
    throw new ApiError(errorMsg, 0);
  }

  // Handle 401 Unauthorized - attempt silent token rotation once
  if (response.status === 401 && !skipAuth) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      requestHeaders["Authorization"] = `Bearer ${newToken}`;
      try {
        response = await fetch(url, {
          ...rest,
          headers: requestHeaders,
          credentials: "include",
        });
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "Network error after session refresh.";
        throw new ApiError(errorMsg, 0);
      }
    } else {
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
  }

  const contentType = response.headers.get("content-type");
  let responseData: unknown = null;
  if (contentType && contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    if (responseData && typeof responseData === "object") {
      const dataObj = responseData as Record<string, unknown>;
      if (typeof dataObj.message === "string") {
        errorMessage = dataObj.message;
      } else if (typeof dataObj.error === "string") {
        errorMessage = dataObj.error;
      }
    } else if (typeof responseData === "string" && responseData.trim().length > 0) {
      errorMessage = responseData;
    }

    if (response.status === 403) {
      errorMessage = errorMessage || "Access forbidden. Your account does not have permission for this resource.";
    } else if (response.status === 404) {
      errorMessage = errorMessage || "The requested endpoint or resource was not found on the server.";
    }

    throw new ApiError(errorMessage, response.status, responseData);
  }

  return responseData as T;
}
