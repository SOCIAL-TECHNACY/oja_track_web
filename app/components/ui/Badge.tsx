export type BadgeStatus =
  | "active"
  | "expired"
  | "expiring"
  | "pending"
  | "processing"
  | "success"
  | "warning";

/*
 * Figma: section-badges (10:3872) — pill (9999), 27px high, 12px bold.
 * Pattern (per design review): light tint pill + solid dot matching
 * the text color, as in the Pending specimen.
 */
const styles: Record<BadgeStatus, { pill: string; dot: string }> = {
  active: {
    pill: "bg-brand-primary/10 text-success-strong dark:bg-brand-primary/15 dark:text-brand-hover",
    dot: "bg-success-strong dark:bg-brand-hover",
  },
  success: {
    pill: "bg-brand-primary/10 text-success-strong dark:bg-brand-primary/15 dark:text-brand-hover",
    dot: "bg-success-strong dark:bg-brand-hover",
  },
  expired: {
    pill: "bg-danger/10 text-danger dark:bg-danger/15",
    dot: "bg-danger",
  },
  expiring: {
    pill: "bg-warning/15 text-light-primary dark:text-warning",
    dot: "bg-light-primary dark:bg-warning",
  },
  warning: {
    pill: "bg-warning/15 text-light-primary dark:text-warning",
    dot: "bg-light-primary dark:bg-warning",
  },
  pending: {
    pill: "bg-surface text-light-secondary",
    dot: "bg-light-secondary",
  },
  processing: {
    pill: "bg-info/10 text-info dark:bg-info/15",
    dot: "bg-info",
  },
};

const labels: Record<BadgeStatus, string> = {
  active: "Active",
  success: "Completed",
  expired: "Expired",
  expiring: "Expiring",
  warning: "Warning",
  pending: "Pending",
  processing: "Processing",
};

export default function Badge({
  status,
  children,
}: {
  status: BadgeStatus;
  children?: React.ReactNode;
}) {
  const current = styles[status] || styles.pending;
  return (
    <span
      className={`inline-flex h-[27px] items-center gap-1.5 rounded-full px-3 text-xs font-bold leading-none ${current.pill}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      <span>{children ?? labels[status] ?? "Status"}</span>
    </span>
  );
}
