import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tertiary"
  | "success"
  | "warning"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/*
 * Figma: section-buttons (10:3771) — 160x36, radius 8, 13px.
 * Hover/pressed fills from the variant matrix are mapped to
 * hover: / active: so one component covers all four states.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-foundation-base font-bold hover:bg-brand-soft active:bg-brand-hover disabled:bg-[#f3f4f6] disabled:text-ink-muted",
  secondary:
    "bg-transparent text-brand-primary border border-brand-primary/60 font-semibold hover:bg-brand-primary hover:text-[#edf2f0] hover:border-transparent active:bg-brand-hover active:text-light-primary active:border-transparent disabled:text-ink-muted disabled:border-transparent disabled:bg-transparent",
  outline:
    "bg-transparent text-brand-primary border border-brand-primary/60 font-semibold hover:bg-brand-primary hover:text-[#edf2f0] hover:border-transparent active:bg-brand-hover active:text-light-primary active:border-transparent disabled:text-ink-muted disabled:border-transparent disabled:bg-transparent",
  ghost:
    "bg-white text-light-secondary font-semibold border border-border hover:bg-surface hover:text-light-primary active:bg-foundation-elevated active:text-ink-primary active:border-transparent disabled:bg-transparent disabled:text-ink-muted disabled:border-transparent dark:bg-transparent",
  danger:
    "bg-danger text-ink-primary font-bold hover:bg-danger-hover active:bg-danger disabled:bg-[#f3f4f6] disabled:text-ink-muted",
  tertiary:
    "bg-white text-brand-deep font-semibold border border-border hover:bg-surface-alt active:bg-[#edf0ed] disabled:bg-[#f5f5f5] disabled:text-[#bfbfbf] disabled:border-transparent dark:bg-transparent",
  success:
    "bg-success-strong text-white font-semibold hover:bg-success-hover active:bg-success-pressed disabled:bg-success-disabled-bg disabled:text-success-disabled-text",
  warning:
    "bg-warning-strong text-light-primary font-semibold hover:bg-warning-hover active:bg-warning-pressed disabled:bg-warning-disabled-bg disabled:text-warning-disabled-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-5 text-[13px]",
  lg: "h-11 px-6 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg leading-none transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
