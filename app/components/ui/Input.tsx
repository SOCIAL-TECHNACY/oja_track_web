import type { InputHTMLAttributes } from "react";

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
  values = ["", "", "", ""],
}: {
  length?: number;
  values?: string[];
}) {
  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          aria-label={`PIN digit ${i + 1}`}
          defaultValue={values[i] ?? ""}
          inputMode="numeric"
          maxLength={1}
          className="h-14 w-14 rounded-lg border border-border bg-white text-center text-lg font-semibold text-light-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:bg-foundation-secondary dark:text-ink-primary"
        />
      ))}
    </div>
  );
}
