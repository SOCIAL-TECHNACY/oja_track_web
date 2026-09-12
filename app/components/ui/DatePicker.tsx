"use client";

import { useState } from "react";

/*
 * Figma: extended-components > Section 6 — Date Picker (15:3150)
 * October 2024 specimen, 7x5 matrix. Start date = brand green,
 * in-range = 12% brand fill, past/disabled = muted.
 * Controlled `value`/`onChange`; month nav is presentational
 * (specimen shows a single month).
 */
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// October 2024: Oct 1 is a Tuesday. null = leading blank cell.
const CELLS: Array<number | null> = [
  null,
  null,
  1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, null, null,
];

export default function DatePicker({
  value,
  onChange,
}: {
  value?: number;
  onChange?: (day: number) => void;
}) {
  const [selected, setSelected] = useState<number | undefined>(value ?? 10);

  const pick = (day: number) => {
    setSelected(day);
    onChange?.(day);
  };

  return (
    <div className="w-full max-w-[320px] rounded-2xl border border-border bg-white p-4 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
        October 2024
      </p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="py-1 text-[11px] font-semibold text-light-muted"
          >
            {d}
          </span>
        ))}
        {CELLS.map((day, i) => {
          if (day === null) return <span key={`blank-${i}`} />;
          const isStart = day === selected;
          const inRange =
            selected !== undefined && day > selected && day <= selected + 4;
          const disabled = day < 6;
          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => pick(day)}
              aria-pressed={isStart}
              className={`flex h-8 items-center justify-center rounded-lg text-[13px] ${
                isStart
                  ? "bg-brand-primary font-bold text-white"
                  : inRange
                    ? "bg-brand-primary/10 font-medium text-brand-deep dark:text-brand-hover"
                    : disabled
                      ? "cursor-not-allowed text-ink-muted"
                      : "text-light-primary hover:bg-surface dark:text-ink-primary"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
