import { API_BASE, ENDPOINTS, IS_API_CONFIGURED } from "./endpoints";

let inMemoryToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
let onUnauthorizedCallback: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  inMemoryToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      sessionStorage.setItem("ojatrack_at_active", "1");
    } else {
      sessionStorage.removeItem("ojatrack_at_active");
    }
  }
}

export function getAccessToken(): string | null {
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

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  if (process.env.NODE_ENV === "production" && !IS_API_CONFIGURED) {
    setAccessToken(null);
    return null;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(ENDPOINTS.AUTH.REFRESH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Transmits httpOnly refreshToken cookie
      });

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

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (!skipAuth && inMemoryToken) {
    requestHeaders["Authorization"] = `Bearer ${inMemoryToken}`;
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
