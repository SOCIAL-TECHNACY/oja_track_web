"use client";

import { useMemo, useState } from "react";
import FaqAccordion from "./FaqAccordion";
import { NoResultsState } from "../ui/EmptyState";

type Faq = { q: string; a: string };
type Group = { id: string; label: string; items: Faq[] };

const groups: Group[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: "What is OjaTrack?",
        a: "OjaTrack is an inventory and credit ledger system designed specifically for Nigerian retailers. It replaces traditional paper books with a simple digital assistant.",
      },
      {
        q: "Does it work without internet?",
        a: "Yes. OjaTrack runs fully offline for daily sales and stock logging, then syncs securely to the cloud whenever you reconnect.",
      },
      {
        q: "Can my staff steal my records?",
        a: "No. Every entry is timestamped and tied to a staff PIN, so you see exactly who recorded what, and nothing can be silently altered.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        q: "Is there a free trial?",
        a: "We offer a 14-day premium trial upon registration. No payment method required.",
      },
      {
        q: "What are the pricing plans?",
        a: "Plans run from ₦3,000 weekly to ₦48,000 yearly, with monthly, quarterly, and half-year options in between. See the pricing page for details.",
      },
      {
        q: "Can I pay in cash?",
        a: "Yes. Your field agent can collect cash payments and activate your subscription on the spot, alongside transfers and cards.",
      },
    ],
  },
  {
    id: "agent-program",
    label: "Agent Program",
    items: [
      {
        q: "How much commission do agents make?",
        a: "You make a 40% commission on the customer's first purchase, and a 20% recurring monthly commission for their subscription lifetime.",
      },
      {
        q: "What is the minimum withdrawal amount?",
        a: "Commissions are paid out weekly straight to your bank account once your balance crosses the minimum payout threshold set in your agent dashboard.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    items: [
      {
        q: "Which phones does OjaTrack support?",
        a: "Any Android smartphone running version 7.0 or higher. The app is lightweight and works smoothly on entry-level devices.",
      },
      {
        q: "How much data does syncing use?",
        a: "Very little. Daily ledger syncs are small text payloads, typically under a few megabytes per month.",
      },
      {
        q: "What happens if I lose my phone?",
        a: "Your records are backed up to the cloud on every sync. Sign in on a new device and your shop data is restored.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      {
        q: "How do I reset my password or PIN?",
        a: "Use the reset option on the login screen with your registered phone number, or ask your field agent to verify and reset it for you.",
      },
      {
        q: "Can I transfer my shop to a new owner?",
        a: "Yes. Contact support and we'll migrate your full ledger history to the new owner's account after verification.",
      },
      {
        q: "How do I delete my account?",
        a: "Write to support@ojatrack.ng from your registered email. We'll export your records first, then close the account.",
      },
    ],
  },
];

export function FaqHero({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <span className="inline-block rounded-full border border-brand-primary/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-deep uppercase dark:text-brand-hover">
          Knowledge base
        </span>
        <h1 className="mt-4 text-4xl font-bold text-light-primary sm:text-5xl dark:text-ink-primary">
          Frequently Asked Questions
        </h1>
        <div className="relative mx-auto mt-6 max-w-xl">
          <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-light-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search questions about OjaTrack..."
            aria-label="Search questions"
            className="h-12 w-full rounded-full border border-border bg-white pr-4 pl-11 text-sm text-light-primary placeholder:text-light-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:bg-foundation-secondary dark:text-ink-primary"
          />
        </div>
      </div>
    </section>
  );
}

/* FAQ explorer island: search filters across groups, pills scroll to groups. */
export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("general");

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  return (
    <>
      <FaqHero query={query} onQuery={setQuery} />
      <section className="mx-auto w-full max-w-4xl px-6 pt-8">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Categories">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#faq-${g.id}`}
              onClick={() => setActive(g.id)}
              aria-current={active === g.id ? "true" : undefined}
              className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                active === g.id
                  ? "bg-brand-primary text-foundation-base"
                  : "border border-border text-light-secondary hover:text-light-primary dark:text-ink-secondary"
              }`}
            >
              {g.label}
            </a>
          ))}
        </div>
      </section>
      <section className="mx-auto w-full max-w-4xl space-y-10 px-6 py-10">
        {visible.length === 0 ? (
          <NoResultsState onClear={() => setQuery("")} />
        ) : (
          visible.map((g) => (
            <div key={g.id} id={`faq-${g.id}`} className="scroll-mt-24">
              <p className="text-[13px] font-extrabold tracking-[0.08em] text-brand-primary uppercase">
                {g.label}
              </p>
              <div className="mt-3">
                <FaqAccordion items={g.items} defaultOpenIndex={0} />
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export function FaqSupportCard() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-14">
      <div className="rounded-2xl border border-border bg-white p-8 text-center dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <p className="text-lg font-bold text-light-primary dark:text-ink-primary">
          Couldn&apos;t find what you need?
        </p>
        <p className="mx-auto mt-2 max-w-xl text-[13px] text-light-secondary">
          Our Lagos-based customer support specialists can walk you through
          setup directly over a call or WhatsApp.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-lg border border-border px-6 py-2 text-sm font-semibold text-light-primary dark:text-ink-primary">
            Call 0800-OJA-TRACK
          </span>
          <span className="inline-flex h-9 cursor-default items-center justify-center rounded-lg bg-brand-primary px-6 text-[13px] font-bold text-foundation-base">
            Open Live Chat
          </span>
        </div>
      </div>
    </section>
  );
}
