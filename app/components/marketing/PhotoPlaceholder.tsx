/*
 * Branded stand-in for marketing photography (no assets yet).
 * Swap inner content for next/image later — same aspect box, no layout edits.
 */
export default function PhotoPlaceholder({
  variant,
  stat,
  label,
}: {
  variant: "storefront" | "aisle" | "dashboard";
  stat?: string;
  label?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative flex min-h-64 items-end overflow-hidden rounded-2xl p-5 ${
        variant === "storefront"
          ? "bg-gradient-to-br from-brand-deep via-[#0e5a3c] to-brand-primary"
          : variant === "dashboard"
            ? "bg-gradient-to-br from-foundation-base via-foundation-elevated to-brand-deep"
            : "bg-gradient-to-br from-foundation-elevated via-brand-deep to-[#0e5a3c]"
      }`}
    >
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute top-16 right-16 h-16 w-16 rounded-full bg-white/10" />
      <span className="absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl text-white">
        {variant === "storefront" ? "◈" : "▣"}
      </span>
      {(stat || label) && (
        <div className="relative rounded-xl bg-foundation-base/80 px-4 py-3 backdrop-blur">
          {stat && <p className="text-xl font-extrabold text-brand-hover">{stat}</p>}
          {label && <p className="text-xs font-medium text-white">{label}</p>}
        </div>
      )}
    </div>
  );
}
