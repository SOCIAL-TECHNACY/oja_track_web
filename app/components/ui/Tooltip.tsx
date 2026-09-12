/*
 * Figma: extended-components > Section 5 — Tooltips (15:3134)
 * CSS-only (group-hover), three placements. Server-safe.
 */
export default function Tooltip({
  text,
  side = "top",
  children,
}: {
  text: string;
  side?: "top" | "right" | "bottom";
  children: React.ReactNode;
}) {
  const pos =
    side === "top"
      ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
      : side === "right"
        ? "top-1/2 left-full ml-2 -translate-y-1/2"
        : "top-full left-1/2 mt-2 -translate-x-1/2";
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 rounded-lg bg-foundation-elevated px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-ink-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${pos}`}
      >
        {text}
      </span>
    </span>
  );
}
