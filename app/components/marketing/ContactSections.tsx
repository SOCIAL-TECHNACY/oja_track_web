"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import FaqAccordion from "./FaqAccordion";

export function ContactHero() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <span className="inline-block rounded-full border border-brand-primary/50 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-brand-deep uppercase dark:text-brand-hover">
          Support center
        </span>
        <h1 className="mt-4 text-4xl font-bold text-light-primary sm:text-5xl dark:text-ink-primary">
          Get In Touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-light-secondary">
          Have questions about offline ledger syncing, pricing, or the Agent
          program? We are here to help your shop succeed.
        </p>
      </div>
    </section>
  );
}

const subjects = [
  "General Inquiry",
  "Pricing & Plans",
  "Agent Program",
  "Technical Support",
  "Partnerships",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function ContactForm() {
  const [subject, setSubject] = useState(subjects[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email doesn't look right.";
    if (!message) next.message = "Please type your question or request.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const fieldErr = (k: keyof Errors) =>
    errors[k] && <p role="alert" className="mt-1 text-xs text-danger">{errors[k]}</p>;

  const label = "mb-1 block text-xs font-bold text-light-primary dark:text-ink-primary";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <p className="text-base font-bold text-light-primary dark:text-ink-primary">
        Send us a Message
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <Input name="name" placeholder="e.g. Babajide Alao" aria-invalid={!!errors.name} />
          {fieldErr("name")}
        </label>
        <label className="block">
          <span className={label}>Email Address</span>
          <Input name="email" type="email" placeholder="e.g. jide@shop.com" aria-invalid={!!errors.email} />
          {fieldErr("email")}
        </label>
        <label className="block">
          <span className={label}>Phone Number</span>
          <Input name="phone" type="tel" placeholder="e.g. +234 803 123 4567" />
        </label>
        <label className="block">
          <span className={label}>Subject</span>
          <span className="relative block">
            <select
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-[41px] w-full appearance-none rounded-lg border border-border bg-white pr-9 pl-3 text-sm text-light-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:bg-foundation-elevated dark:text-ink-primary"
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-muted">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </label>
      </div>
      <label className="mt-4 block">
        <span className={label}>Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Type your question or request here..."
          aria-invalid={!!errors.message}
          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-light-primary placeholder:text-light-muted outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 dark:bg-foundation-elevated dark:text-ink-primary"
        />
        {fieldErr("message")}
      </label>
      {submitted && (
        <p role="status" className="mt-4 rounded-xl bg-warning/15 px-4 py-3 text-[13px] leading-5 text-light-primary dark:text-ink-primary">
          Thanks — message delivery isn&apos;t connected yet. For an instant
          reply, chat with us on WhatsApp or email{" "}
          <span className="font-bold">support@ojatrack.ng</span>.
        </p>
      )}
      <button
        type="submit"
        className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-brand-primary px-8 text-[13px] font-bold text-foundation-base hover:bg-brand-hover"
      >
        Send Message
      </button>
    </form>
  );
}

const channels = [
  { icon: "✆", line: "+234 800 OJA TRACK", sub: "Toll-Free Support Line" },
  { icon: "✉", line: "support@ojatrack.ng", sub: "24hr Response Time" },
  { icon: "◍", line: "+234 812 345 6789", sub: "WhatsApp Instant Chat" },
];

export function ContactGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid items-start gap-4 lg:grid-cols-[1.6fr_1fr]">
        <ContactForm />
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand-primary uppercase">
              Direct channels
            </p>
            <ul className="mt-4 space-y-4">
              {channels.map((c) => (
                <li key={c.line} className="flex items-center gap-3">
                  <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-base text-brand-deep dark:text-brand-hover">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">
                      {c.line}
                    </span>
                    <span className="block text-xs text-light-muted">{c.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand-primary uppercase">
              Lagos office
            </p>
            <p className="mt-3 text-sm font-bold text-light-primary dark:text-ink-primary">
              14 Broad Street, Lagos Island
            </p>
            <p className="mt-1 text-[13px] text-light-secondary">
              Monday - Friday: 8am - 6pm
              <br />
              Saturday: 9am - 2pm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const quickAnswers = [
  {
    q: "How much does OjaTrack cost?",
    a: "Plans start at ₦3,000 per week, with monthly, quarterly, half-year, and yearly options up to ₦48,000 per year. See the pricing page for the full breakdown.",
  },
  {
    q: "Can I use OjaTrack offline?",
    a: "Yes! OjaTrack is built for Nigerian internet realities. It works completely offline, saving all daily sales and stock records locally on your device. Once you connect to the network, your data syncs securely to our servers.",
  },
  {
    q: "How do I become an agent?",
    a: "Apply through the agents page, complete the quick WhatsApp assessment, get certified within 24 hours, and receive your physical ID card.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers, cards, and POS payments for subscriptions. In-shop sales can be logged as cash, transfer, card, or credit.",
  },
  {
    q: "How does the agent commission work?",
    a: "Agents earn 40% upfront on every shop they onboard plus 20% recurring commission on renewals, paid out weekly.",
  },
  {
    q: "Is my store data secure?",
    a: "Yes. Every ledger entry is timestamped and stored securely, with cloud backup whenever you're online.",
  },
  {
    q: "Can I have multiple staff on one account?",
    a: "Yes — there are zero caps. Add sales assistants, delivery drivers, or store partners, each with their own PIN and permissions.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Contact support or your field agent any time. Your existing data stays safe and exportable after cancellation.",
  },
];

export function QuickAnswers() {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-4xl px-6 py-14">
        <h2 className="text-center text-3xl font-bold text-light-primary dark:text-ink-primary">
          Quick Answers
        </h2>
        <div className="mt-6">
          <FaqAccordion items={quickAnswers} defaultOpenIndex={1} />
        </div>
      </div>
    </section>
  );
}

export function WhatsAppBanner() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <div className="max-w-2xl">
          <p className="text-lg font-bold text-light-primary dark:text-ink-primary">
            Still have unanswered questions?
          </p>
          <p className="mt-1 text-[13px] leading-5 text-light-secondary">
            Join our active WhatsApp group with over 1,500+ active Nigerian
            retail shop owners. Get real-time updates and tips directly from
            other business managers.
          </p>
        </div>
        <span className="inline-flex h-9 cursor-default items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 text-[13px] font-bold text-foundation-base">
          <span aria-hidden>◍</span> Join WhatsApp Group
        </span>
      </div>
    </section>
  );
}
