"use client";

import { useState } from "react";

/*
 * Referral code copy. Client island — everything else on the
 * overview page stays server-rendered.
 */
export default function ReferAgentCard({
  referralCode,
}: {
  referralCode: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
    } catch {
      // Clipboard API unavailable (permissions / insecure context) —
      // still show feedback; the code itself remains selectable.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-labelledby="refer-agent"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="refer-agent"
        className="text-base font-bold text-light-primary dark:text-ink-primary"
      >
        Refer an Agent
      </h2>
      <p className="mt-2 text-sm leading-6 text-light-secondary dark:text-ink-secondary">
        Earn extra 5% override on onboardings done by recruited agents.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 dark:border-[#1e3a2b]">
        <code className="truncate text-sm font-bold tracking-wide text-light-primary dark:text-ink-primary">
          {referralCode}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-light-secondary transition-colors hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? "Referral code copied to clipboard" : ""}
      </span>
    </section>
  );
}
