import Link from "next/link";
import { footerCols } from "@/lib/site";

/* Dark marketing footer. Dead links render as plain text (no 404s). */
export default function Footer() {
  return (
    <footer className="bg-foundation-base text-ink-secondary">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="OjaTrack home" className="flex w-fit items-center gap-2 rounded-lg">
            <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary text-sm font-extrabold text-foundation-base">
              O
            </span>
            <span className="text-base font-extrabold text-white">OjaTrack</span>
          </Link>
          <p className="mt-3 max-w-xs text-[13px] leading-5">
            Nigeria&apos;s retail operations platform. Track sales, inventory,
            and profit in real time.
          </p>
        </div>
        {footerCols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-bold text-white">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) =>
                l.href ? (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13px] hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <span aria-disabled="true" className="cursor-default text-[13px]">
                      {l.label}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs">
          <p>© 2025 OjaTrack Technologies Ltd. All rights reserved.</p>
          <div className="flex gap-3" aria-label="Social links">
            {["X", "IG", "FB", "LI"].map((s) => (
              <span key={s} aria-disabled="true" title="Coming soon" className="flex h-7 w-7 cursor-default items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
