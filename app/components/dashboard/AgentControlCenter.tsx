"use client";

import { useState } from "react";
import { formatNGN } from "@/lib/agent-dashboard";
import type {
  VerifiedAgent,
  VerifiedAgentStatus,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

const titleCls = "text-base font-bold text-light-primary dark:text-ink-primary";

function AgentStatusPill({ status }: { status: VerifiedAgentStatus }) {
  const cls =
    status === "ACTIVE"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "PENDING"
        ? "bg-brand-gold/15 text-light-primary dark:text-brand-gold"
        : "bg-danger/10 text-danger dark:bg-danger/15 dark:text-danger";
  const dot =
    status === "ACTIVE"
      ? "bg-brand-primary"
      : status === "PENDING"
        ? "bg-brand-gold"
        : "bg-danger";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

/*
 * Agent Control Center island: verified directory (selectable rows) +
 * inspection panel bound to the selected agent.
 */
export default function AgentControlCenter({
  agents,
}: {
  agents: VerifiedAgent[];
}) {
  const [selectedId, setSelectedId] = useState(agents[0]?.id ?? "");
  const selected = agents.find((a) => a.id === selectedId) ?? agents[0];

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[1.6fr_1fr]">
      {/* Verified Agent Directory */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
            Verified Agent Directory
          </h2>
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex h-9 cursor-not-allowed items-center rounded-lg border border-brand-primary px-3 text-sm font-semibold text-light-primary opacity-80 dark:text-ink-primary"
          >
            Export Batch
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[13px] text-light-muted dark:text-ink-muted">
                {["Agent ID", "Name", "Location", "Status", "Shops", "Total Earned"].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-border px-3 py-3 font-medium first:pl-1 last:pr-1 dark:border-[#1e3a2b]"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => {
                const isSelected = a.id === selected?.id;
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    className={`cursor-pointer border-b border-border transition-colors last:border-0 dark:border-[#1e3a2b] ${
                      isSelected
                        ? "bg-surface dark:bg-foundation-elevated"
                        : "hover:bg-surface/60 dark:hover:bg-foundation-elevated/50"
                    }`}
                  >
                    <td className="px-3 py-4 first:pl-1">
                      <button
                        type="button"
                        onClick={() => setSelectedId(a.id)}
                        className="font-semibold whitespace-nowrap text-brand-gold tabular-nums hover:underline"
                      >
                        {a.id}
                      </button>
                    </td>
                    <th
                      scope="row"
                      className="px-3 py-4 font-bold whitespace-nowrap text-light-primary dark:text-ink-primary"
                    >
                      {a.name}
                    </th>
                    <td className="px-3 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                      {a.location}
                    </td>
                    <td className="px-3 py-4">
                      <AgentStatusPill status={a.status} />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-light-primary tabular-nums dark:text-ink-primary">
                      {a.shopsTotal} ({a.shopsActive} Active)
                    </td>
                    <td className="px-3 py-4 font-bold whitespace-nowrap text-brand-primary tabular-nums last:pr-1">
                      {formatNGN(a.totalEarnedNGN)}
                    </td>
                  </tr>
                );
              })}
              {agents.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-light-secondary dark:text-ink-secondary"
                  >
                    No verified agents registered on the platform yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Inspection */}
      {selected ? (
        <div className={card} aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <h2 className={titleCls}>Agent Inspection</h2>
            <AgentStatusPill status={selected.status} />
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <span
              aria-hidden
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-deep text-lg font-bold text-white"
            >
              {selected.initials}
            </span>
            <p className="mt-3 text-lg font-extrabold text-light-primary dark:text-ink-primary">
              {selected.name}
            </p>
            <p className="mt-1 text-[13px] text-light-secondary dark:text-ink-secondary">
              ID: {selected.id} • Joined {selected.joined}
            </p>
          </div>

          <div className="mt-4 border-t border-border pt-4 dark:border-[#1e3a2b]">
            <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
              Core Metrics
            </p>
            <dl className="mt-2 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Active Shops
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {selected.shopsActive} of {selected.shopsTotal}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Commission Balance
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {formatNGN(selected.commissionBalanceNGN)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Lifetime Earned
                </dt>
                <dd className="font-bold text-brand-primary tabular-nums">
                  {formatNGN(selected.totalEarnedNGN)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-light-secondary dark:text-ink-secondary">
                  Field Rating
                </dt>
                <dd className="font-bold text-light-primary tabular-nums dark:text-ink-primary">
                  {selected.ratingOutOf5.toFixed(1)} / 5.0
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 space-y-2.5 border-t border-border pt-4 dark:border-[#1e3a2b]">
            <button
              type="button"
              disabled
              title="Coming soon"
              aria-disabled="true"
              className="flex h-11 w-full cursor-not-allowed items-center justify-center rounded-xl border border-danger/60 bg-danger/10 px-4 text-sm font-bold text-light-primary opacity-90 dark:text-ink-primary"
            >
              Suspend Account
            </button>
            <button
              type="button"
              disabled
              title="Coming soon"
              aria-disabled="true"
              className="flex h-11 w-full cursor-not-allowed items-center justify-center rounded-xl border border-brand-primary bg-brand-primary/10 px-4 text-sm font-bold text-light-primary opacity-90 dark:text-ink-primary"
            >
              Force Re-verify ID
            </button>
          </div>
        </div>
      ) : (
        <div className={card} aria-live="polite">
          <h2 className={titleCls}>Agent Inspection</h2>
          <div className="py-12 text-center text-sm text-light-secondary dark:text-ink-secondary">
            Select an agent from the directory to inspect field credentials and performance metrics.
          </div>
        </div>
      )}
    </div>
  );
}
