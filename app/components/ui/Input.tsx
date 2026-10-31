"use client";

import React, { useRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const base =
  "h-[41px] w-full rounded-lg border bg-white px-3 text-sm text-light-primary placeholder:text-light-muted outline-none transition-colors dark:bg-foundation-secondary dark:text-ink-primary dark:placeholder:text-ink-muted";

/*
 * Figma: section-inputs (10:3823)
 * Default white / radius 8 / 14px text, focused green caret + ring,
 * error red ring. Specialty: search, select, 56px PIN cells.
 */
export function Input({ error = false, className = "", ...props }: InputProps) {
  return (
    <input
      className={`${base} ${
        error
          ? "border-danger"
          : "border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 focus:caret-[#00c853]"
      } ${className}`}
      {...props}
    />
  );
}

export function SearchInput(props: InputProps) {
  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-light-muted"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m11 11 3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <Input className="pr-3 pl-9" {...props} />
    </div>
  );
}

export function SelectInput(props: InputProps) {
  return (
    <div className="relative w-full">
      <Input readOnly className="cursor-pointer pr-9" {...props} />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-muted"
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
    </div>
  );
}

export function PinInput({
  length = 4,
  value = "",
  values,
  onChange,
}: {
  length?: number;
  value?: string;
  values?: string[];
  onChange?: (val: string) => void;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Support either single string or array of digits
  const digits = value
    ? value.split("").concat(Array(Math.max(0, length - value.length)).fill(""))
    : values || Array(length).fill("");

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join("").slice(0, length);
    onChange?.(combined);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, length);
    if (pasted) {
      onChange?.(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          aria-label={`PIN digit ${i + 1}`}
          value={digits[i] ?? ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          maxLength={1}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-border bg-white text-center text-lg font-bold text-light-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:bg-foundation-secondary dark:text-ink-primary"
        />
      ))}
    </div>
  );
}
