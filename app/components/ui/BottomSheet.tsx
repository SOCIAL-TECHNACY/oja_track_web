"use client";

import { useEffect } from "react";
import Button from "./Button";

/*
 * Figma: extended-components > Section 2 — Bottom Sheets (15:3017)
 * Mobile bottom-anchored sheet: action list + filter variants.
 * Controlled: `open` + `onOpenChange`. Escape + backdrop close.
 */
export function BottomSheet({
  open,
  onOpenChange,
  label,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foundation-base/60"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl border-x border-t border-border bg-white p-5 pb-8 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
      >
        <span
          aria-hidden
          className="mx-auto mb-4 block h-1 w-10 rounded-full bg-border"
        />
        {children}
      </div>
    </div>
  );
}

const actionRows = ["Edit Product", "Duplicate Item", "Delete Record"];

export function ActionSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} label="Product actions">
      <ul className="divide-y divide-border">
        {actionRows.map((row, i) => (
          <li key={row}>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={`flex w-full items-center px-2 py-3 text-sm font-medium ${
                i === actionRows.length - 1
                  ? "text-danger"
                  : "text-light-primary dark:text-ink-primary"
              }`}
            >
              {row}
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}

export function FilterSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} label="Filter">
      <p className="text-base font-semibold text-light-primary dark:text-ink-primary">
        Filter
      </p>
      <p className="mt-3 text-xs font-semibold text-light-secondary">
        Date Range
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <span className="rounded-lg border border-border px-3 py-2 text-sm text-light-muted">
          Start date
        </span>
        <span className="rounded-lg border border-border px-3 py-2 text-sm text-light-muted">
          End date
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="ghost"
          className="min-w-0 flex-1"
          onClick={() => onOpenChange(false)}
        >
          Reset
        </Button>
        <Button
          className="min-w-0 flex-1"
          onClick={() => onOpenChange(false)}
        >
          Apply
        </Button>
      </div>
    </BottomSheet>
  );
}
