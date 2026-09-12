"use client";

import { useCallback, useState } from "react";

/*
 * Figma: theme-documentation (39:3409)
 * Pill toggle 56x26, radius 13, in app headers.
 * Light is default; toggling adds/removes .dark on <html>.
 */
export default function ThemeToggle() {
  // Light is the default per Figma; no effect needed — initial
  // render already matches `html` without `.dark`.
  const [dark, setDark] = useState(false);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, [dark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark theme"
      onClick={toggle}
      className="flex h-[26px] w-14 items-center rounded-[13px] border border-border bg-surface px-1 transition-colors"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform ${
          dark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        <span
          aria-hidden
          className={`h-2 w-2 rounded-full ${dark ? "bg-brand-deep" : "bg-warning-strong"}`}
        />
      </span>
    </button>
  );
}
