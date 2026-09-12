"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Figma: extended-components > Section 7 — Dropdown / Select (15:3248)
 * Closed state mirrors SelectInput; open state shows the option list.
 * Controlled `value`/`onChange`, self-managed open state.
 */
const categories = [
  "Beverages",
  "Grains & Flour",
  "Dairy",
  "Snacks",
  "Household",
];

export default function Dropdown({
  value = "",
  onChange,
  placeholder = "Select Category",
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[41px] w-full items-center justify-between rounded-lg border bg-white px-3 text-sm outline-none transition-colors dark:bg-foundation-secondary ${
          open
            ? "border-brand-primary ring-2 ring-brand-primary/30"
            : "border-border"
        } ${value ? "text-light-primary dark:text-ink-primary" : "text-light-muted"}`}
      >
        {value || placeholder}
        <span
          aria-hidden
          className={`text-light-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Categories"
          className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-border bg-white p-1 shadow-[0_16px_48px_rgba(7,16,12,0.18)] dark:bg-foundation-elevated dark:border-[#1e3a2b]"
        >
          {categories.map((c) => (
            <li key={c}>
              <button
                type="button"
                role="option"
                aria-selected={c === value}
                onClick={() => {
                  onChange?.(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm ${
                  c === value
                    ? "bg-brand-primary/10 font-semibold text-brand-deep dark:text-brand-hover"
                    : "text-light-primary hover:bg-surface dark:text-ink-primary"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
