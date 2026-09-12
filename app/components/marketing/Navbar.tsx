"use client";

import { useState } from "react";
import Link from "next/link";
import { authNav, mainNav } from "@/lib/site";
import type { NavLink } from "@/lib/site";

function NavItem({ link, onNavigate }: { link: NavLink; onNavigate?: () => void }) {
  const cls =
    "rounded-lg px-3 py-2 text-sm font-medium text-light-secondary hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary";
  if (!link.href) {
    return (
      <span aria-disabled="true" title="Coming soon" className={`${cls} cursor-default opacity-80`}>
        {link.label}
      </span>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={cls}>
      {link.label}
    </Link>
  );
}

/* Sticky marketing navbar. Dead links (href null) render non-navigating. */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="OjaTrack home" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg">
          <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary text-sm font-extrabold text-foundation-base">
            O
          </span>
          <span className="text-base font-extrabold text-light-primary dark:text-ink-primary">
            OjaTrack
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((l) => (
            <NavItem key={l.label} link={l} />
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <NavItem link={authNav[0]} />
          {authNav[1].href ? (
            <Link
              href={authNav[1].href}
              className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-foundation-base hover:bg-brand-hover"
            >
              {authNav[1].label}
            </Link>
          ) : (
            <span
              aria-disabled="true"
              title="Coming soon"
              className="cursor-default rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-foundation-base opacity-90"
            >
              {authNav[1].label}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-border p-2 text-light-primary lg:hidden dark:text-ink-primary"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border px-6 py-3 lg:hidden">
          <div className="flex flex-col">
            {[...mainNav, ...authNav].map((l) => (
              <NavItem key={l.label} link={l} onNavigate={() => setOpen(false)} />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
