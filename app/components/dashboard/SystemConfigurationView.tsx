"use client";

import { useEffect, useRef, useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  mockAdminUsers,
  mockCommissionConfig,
  mockGateway,
  mockNotificationChannels,
  mockPlanPrices,
  type AdminUser,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-light-primary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-elevated dark:text-ink-primary";

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-brand-primary" : "bg-border dark:bg-foundation-elevated"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

/*
 * System Configuration island: commission sliders, notification
 * switches, gateway status, inline-editable plan pricing, and admin
 * user management. All local state; Save confirms via toast.
 */
export default function SystemConfigurationView() {
  const [upfront, setUpfront] = useState(mockCommissionConfig.upfrontPct);
  const [recurring, setRecurring] = useState(mockCommissionConfig.recurringPct);
  const [threshold, setThreshold] = useState(String(mockCommissionConfig.minWithdrawalNGN));
  const [channels, setChannels] = useState(mockNotificationChannels);
  const [plans, setPlans] = useState(mockPlanPrices);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdminUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("SUPPORT");
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function flash(message: string) {
    if (timer.current) window.clearTimeout(timer.current);
    setToast(message);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }

  function startEdit(planId: string, amount: number) {
    setEditingPlan(planId);
    setEditAmount(String(amount));
  }

  function savePlan(planId: string) {
    const parsed = Number(editAmount.replace(/[,₦\s]/g, ""));
    if (!Number.isFinite(parsed) || parsed <= 0) {
      flash("Enter a valid amount greater than zero.");
      return;
    }
    setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, amountNGN: parsed } : p)));
    setEditingPlan(null);
    flash("Plan price updated.");
  }

  function addAdmin() {
    if (newName.trim() === "" || newEmail.trim() === "") {
      flash("Name and email are required to add an admin.");
      return;
    }
    setAdmins((prev) => [
      ...prev,
      { id: `au-${Date.now()}`, name: newName.trim(), email: newEmail.trim(), role: newRole },
    ]);
    setNewName("");
    setNewEmail("");
    setNewRole("SUPPORT");
    setShowAdd(false);
    flash("Admin user added.");
  }

  const sliderCls =
    "w-full accent-brand-primary";

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
            OjaTrack Rules & Config
          </h2>
          <p className="mt-1 text-sm text-light-secondary dark:text-ink-secondary">
            Manage sliding commissions, standard subscription plans, gate statuses and users
          </p>
        </div>
        <button
          type="button"
          onClick={() => flash("Configuration saved — applies across the portal.")}
          className="inline-flex h-11 items-center rounded-xl bg-brand-primary px-6 text-sm font-bold text-white transition-colors hover:bg-success-hover"
        >
          Save Changes
        </button>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-2">
        {/* Left column */}
        <div className="min-w-0 space-y-4">
          {/* Commission rules */}
          <div className={card}>
            <h3 className="text-base font-bold text-light-primary dark:text-ink-primary">
              Commission Rules
            </h3>
            <div className="mt-4 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="upfront-pct" className="text-sm text-light-secondary dark:text-ink-secondary">
                    Upfront Recruitment Percentage
                  </label>
                  <span className="text-sm font-bold text-brand-primary tabular-nums">
                    {upfront}%
                  </span>
                </div>
                <input
                  id="upfront-pct"
                  type="range"
                  min={0}
                  max={100}
                  value={upfront}
                  onChange={(e) => setUpfront(Number(e.target.value))}
                  className={`mt-2 ${sliderCls}`}
                />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="recurring-pct" className="text-sm text-light-secondary dark:text-ink-secondary">
                    Recurring Subscription Percentage
                  </label>
                  <span className="text-sm font-bold text-brand-primary tabular-nums">
                    {recurring}%
                  </span>
                </div>
                <input
                  id="recurring-pct"
                  type="range"
                  min={0}
                  max={100}
                  value={recurring}
                  onChange={(e) => setRecurring(Number(e.target.value))}
                  className={`mt-2 ${sliderCls}`}
                />
              </div>
              <div>
                <label htmlFor="min-threshold" className="block text-sm text-light-secondary dark:text-ink-secondary">
                  Minimum Withdrawal Threshold
                </label>
                <div className="relative mt-2">
                  <span aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm text-light-muted">
                    ₦
                  </span>
                  <input
                    id="min-threshold"
                    inputMode="numeric"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className={`${inputCls} pl-8 font-semibold tabular-nums`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification channels */}
          <div className={card}>
            <h3 className="text-base font-bold text-light-primary dark:text-ink-primary">
              Notification Channels
            </h3>
            <ul className="mt-4 space-y-4">
              {channels.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-light-primary dark:text-ink-primary">
                      {c.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-light-secondary dark:text-ink-secondary">
                      {c.desc}
                    </span>
                  </span>
                  <Switch
                    checked={c.enabled}
                    label={c.name}
                    onChange={(next) =>
                      setChannels((prev) =>
                        prev.map((ch) => (ch.id === c.id ? { ...ch, enabled: next } : ch)),
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Payment gateway */}
          <div className={card}>
            <h3 className="text-base font-bold text-light-primary dark:text-ink-primary">
              Payment Gateway Integration
            </h3>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-4 dark:border-[#1e3a2b]">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-base font-extrabold text-brand-gold"
              >
                F
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-light-primary dark:text-ink-primary">
                  {mockGateway.name}
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-light-secondary dark:text-ink-secondary">
                  {mockGateway.sub}
                </span>
              </span>
              <span className="inline-flex h-7 shrink-0 items-center rounded-lg bg-surface-alt px-3 text-xs font-bold text-light-secondary dark:bg-foundation-elevated dark:text-ink-secondary">
                {mockGateway.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-4">
          {/* Pricing plans */}
          <div className={card}>
            <h3 className="text-base font-bold text-light-primary dark:text-ink-primary">
              Subscription Pricing Plans
            </h3>
            <ul className="mt-4 overflow-hidden rounded-xl border border-border dark:border-[#1e3a2b]">
              {plans.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-0 dark:border-[#1e3a2b]"
                >
                  <span className="text-sm font-bold text-light-primary dark:text-ink-primary">
                    {p.plan}
                  </span>
                  {editingPlan === p.id ? (
                    <span className="flex items-center gap-2">
                      <input
                        aria-label={`${p.plan} price in naira`}
                        inputMode="numeric"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="h-9 w-32 rounded-lg border border-brand-primary bg-white px-2.5 text-sm font-semibold tabular-nums outline-none dark:bg-foundation-elevated dark:text-ink-primary"
                      />
                      <button
                        type="button"
                        onClick={() => savePlan(p.id)}
                        className="inline-flex h-9 items-center rounded-lg bg-brand-primary px-3 text-[13px] font-bold text-white"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPlan(null)}
                        className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-[13px] font-semibold text-light-secondary dark:text-ink-secondary"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span className="text-sm font-bold text-brand-primary tabular-nums">
                        {formatNGN(p.amountNGN)}
                      </span>
                      <button
                        type="button"
                        onClick={() => startEdit(p.id, p.amountNGN)}
                        className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-[13px] font-semibold text-light-secondary transition-colors hover:border-brand-primary hover:text-light-primary dark:text-ink-secondary"
                      >
                        Edit
                      </button>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Admin users */}
          <div className={card}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-light-primary dark:text-ink-primary">
                Authorized Admin Users
              </h3>
              <button
                type="button"
                aria-expanded={showAdd}
                onClick={() => setShowAdd((v) => !v)}
                className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-[13px] font-semibold text-light-primary transition-colors hover:border-brand-primary dark:text-ink-primary"
              >
                + Add Admin
              </button>
            </div>

            {showAdd ? (
              <div className="mt-4 space-y-2.5 rounded-xl border border-brand-primary/40 p-3.5">
                <input
                  aria-label="New admin name"
                  placeholder="Full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={inputCls}
                />
                <input
                  aria-label="New admin email"
                  placeholder="Email address"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={inputCls}
                />
                <div className="flex items-center gap-2">
                  <select
                    aria-label="New admin role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className={`${inputCls} cursor-pointer`}
                  >
                    {["SUPER ADMIN", "FINANCE", "OPERATIONS", "SUPPORT"].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addAdmin}
                    className="inline-flex h-11 shrink-0 items-center rounded-xl bg-brand-primary px-4 text-sm font-bold text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null}

            <ul className="mt-4 space-y-2.5">
              {admins.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 dark:border-[#1e3a2b]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-light-primary dark:text-ink-primary">
                      {a.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-light-secondary dark:text-ink-secondary">
                      {a.email}
                    </span>
                  </span>
                  <span className="inline-flex h-7 shrink-0 items-center rounded-lg border border-border px-2.5 text-xs font-bold whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {a.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[60] w-full max-w-sm -translate-x-1/2 px-4"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-light-primary shadow-[0_8px_24px_rgba(7,16,12,0.16)] dark:bg-foundation-elevated dark:text-ink-primary dark:border-[#1e3a2b]">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-success" />
            {toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
