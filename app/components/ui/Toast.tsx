"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

/*
 * Figma: extended-components > Section 3 — Toast Notifications (15:3063)
 * success / error / warning / info. Working toaster: wrap the app
 * (or demo section) in <ToastProvider> and call toast() via useToast().
 */
export type ToastStatus = "success" | "error" | "warning" | "info";

type ToastItem = { id: number; status: ToastStatus; message: string };

const copy: Record<ToastStatus, string> = {
  success: "Product added successfully",
  error: "Failed to sync. Try again.",
  warning: "3 items pending sync",
  info: "New update available",
};

const dot: Record<ToastStatus, string> = {
  success: "bg-success",
  error: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
};

const ToastContext = createContext<{
  toast: (status: ToastStatus, message?: string) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function Toast({
  status,
  message,
}: {
  status: ToastStatus;
  message?: string;
}) {
  return (
    <div
      role="status"
      className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-light-primary shadow-[0_8px_24px_rgba(7,16,12,0.16)] dark:bg-foundation-elevated dark:text-ink-primary dark:border-[#1e3a2b]"
    >
      <span aria-hidden className={`h-2 w-2 rounded-full ${dot[status]}`} />
      {message ?? copy[status]}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((status: ToastStatus, message?: string) => {
    const id = ++idRef.current;
    setItems((prev) => [...prev, { id, status, message: message ?? copy[status] }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4"
      >
        {items.map((t) => (
          <Toast key={t.id} status={t.status} message={t.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
