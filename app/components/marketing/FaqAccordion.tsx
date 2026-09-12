"use client";

import { useState } from "react";

/*
 * Shared FAQ accordion (circled +/- icons). Used by /pricing and /contact.
 * `defaultOpenIndex`: which item starts expanded (null = all closed).
 */
export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: Array<{ q: string; a: string }>;
  defaultOpenIndex?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpenIndex);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className="rounded-2xl border border-border bg-white dark:bg-foundation-secondary dark:border-[#1e3a2b]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-bold text-light-primary dark:text-ink-primary">
                {f.q}
              </span>
              <span
                aria-hidden
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  isOpen
                    ? "bg-brand-primary/15 text-brand-deep dark:text-brand-hover"
                    : "bg-foundation-base text-light-primary dark:bg-foundation-elevated dark:text-ink-primary"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-[13px] leading-6 text-light-secondary">{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
