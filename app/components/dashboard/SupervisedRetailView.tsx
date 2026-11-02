"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "../ui/Input";
import ShopInsightCard from "./ShopInsightCard";
import { formatNGN } from "@/lib/agent-dashboard";
import {
  formatCount,
  shopInsightFor,
  type SupervisedShop,
  type SupervisedShopStatus,
} from "@/lib/admin-dashboard";

const PAGE_SIZE = 8;

type TabKey = "all" | "active" | "expiring" | "expired";

interface TabCounts {
  all: number;
  active: number;
  expiringSoon: number;
  expired: number;
}

const tabs: Array<{ key: TabKey; label: (counts: TabCounts) => string }> = [
  { key: "all", label: (c) => `All Shops (${formatCount(c.all)})` },
  { key: "active", label: (c) => `Active (${formatCount(c.active)})` },
  { key: "expiring", label: (c) => `Expiring Soon (${formatCount(c.expiringSoon)})` },
  { key: "expired", label: (c) => `Expired (${formatCount(c.expired)})` },
];

function tabMatches(shop: SupervisedShop, tab: TabKey): boolean {
  if (tab === "all") return true;
  if (tab === "active") return shop.status === "ACTIVE";
  if (tab === "expiring") return shop.status === "PENDING";
  return shop.status === "SUSPENDED";
}

function SubscriptionPill({ status }: { status: SupervisedShopStatus }) {
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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-xl border border-border bg-white pr-8 pl-3 text-[13px] text-light-secondary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-secondary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label}: {opt}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-light-muted"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
}

/*
 * Supervised Retail Operations island: status tabs + search/filters +
 * interactive shop directory. Clicking any row binds the right-hand
 * ShopInsightCard to that shop.
 */
export default function SupervisedRetailView({
  shops,
}: {
  shops: SupervisedShop[];
}) {
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(shops[0]?.id ?? "");

  const counts: TabCounts = useMemo(() => {
    let active = 0;
    let expiringSoon = 0;
    let expired = 0;
    for (const s of shops) {
      if (s.status === "ACTIVE") active++;
      else if (s.status === "PENDING") expiringSoon++;
      else if (s.status === "SUSPENDED") expired++;
    }
    return { all: shops.length, active, expiringSoon, expired };
  }, [shops]);

  const selected = shops.find((s) => s.id === selectedId) ?? shops[0];
  const insight = selected ? shopInsightFor(selected) : null;

  const locations = useMemo(() => {
    const unique = Array.from(new Set(shops.map((s) => s.location))).sort();
    return ["All", ...unique];
  }, [shops]);

  const filtered = useMemo(
    () =>
      shops.filter((s) => {
        if (!tabMatches(s, tab)) return false;
        if (status !== "All") {
          if (status === "Active" && s.status !== "ACTIVE") return false;
          if (status === "Expiring" && s.status !== "PENDING") return false;
          if (status === "Expired" && s.status !== "SUSPENDED") return false;
        }
        if (location !== "All" && s.location !== location) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          return (
            s.shopName.toLowerCase().includes(q) ||
            s.owner.toLowerCase().includes(q) ||
            s.agentCode.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [shops, tab, status, location, query],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const pageButton =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-border px-2.5 text-xs font-medium transition-colors";

  return (
    <div className="space-y-4">
      {/* Top row: Tab strip */}
      <div
        role="tablist"
        aria-label="Filter shops by status"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((t) => {
          const isActive = t.key === tab;
          return (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => {
                setTab(t.key);
                setPage(1);
              }}
              className={`inline-flex h-9 items-center rounded-xl border px-3.5 text-[13px] whitespace-nowrap transition-colors ${
                isActive
                  ? "border-brand-primary font-semibold text-brand-primary"
                  : "border-border font-normal text-light-secondary hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary"
              }`}
            >
              {t.label(counts)}
            </button>
          );
        })}
      </div>

    <div className="grid items-start gap-4 xl:grid-cols-[1.7fr_0.9fr]">
      <div className="min-w-0 space-y-4">
      {/* Toolbar — insight starts level with this row */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-nowrap sm:items-center">
        <div className="w-full sm:min-w-0 sm:flex-1 [&_input]:h-9 [&_input]:text-[13px]">
          <SearchInput
            aria-label="Search shop, owner, or agent"
            placeholder="Search shop, owner, or agent..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={["All", "Active", "Expiring", "Expired"]}
          />
          <FilterSelect
            label="Location"
            value={location}
            onChange={(v) => {
              setLocation(v);
              setPage(1);
            }}
            options={locations}
          />
        </div>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                {[
                  "Shop Name",
                  "Owner",
                  "Agent",
                  "Location",
                  "Subscription",
                  "Revenue (30d)",
                ].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium first:pl-6 last:pr-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((shop) => {
                const isSelected = shop.id === selected?.id;
                return (
                  <tr
                    key={shop.id}
                    onClick={() => setSelectedId(shop.id)}
                    className={`cursor-pointer border-b border-border transition-colors last:border-0 dark:border-[#1e3a2b] ${
                      isSelected
                        ? "bg-surface dark:bg-foundation-elevated"
                        : "hover:bg-surface/60 dark:hover:bg-foundation-elevated/50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-bold whitespace-nowrap text-light-primary first:pl-6 dark:text-ink-primary"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(shop.id)}
                        className="text-left font-bold text-light-primary hover:text-brand-primary dark:text-ink-primary"
                      >
                        {shop.shopName}
                      </button>
                    </th>
                    <td className="px-4 py-3 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                      {shop.owner}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-brand-gold tabular-nums">
                      {shop.agentCode}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                      {shop.location}
                    </td>
                    <td className="px-4 py-3">
                      <SubscriptionPill status={shop.status} />
                    </td>
                    <td className="px-4 py-3 font-bold whitespace-nowrap text-brand-primary tabular-nums last:pr-6">
                      {formatNGN(shop.revenue30dNGN)}
                    </td>
                  </tr>
                );
              })}
              {pageItems.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-light-secondary dark:text-ink-secondary"
                  >
                    {shops.length === 0
                      ? "No supervised retail shops registered on platform yet."
                      : "No shops match your search criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-light-secondary dark:text-ink-secondary">
            Showing {rangeStart}-{rangeEnd} of {filtered.length} shops
          </p>
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`${pageButton} text-light-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-secondary`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const isCurrent = n === safePage;
              return (
                <button
                  key={n}
                  type="button"
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setPage(n)}
                  className={`${pageButton} ${
                    isCurrent
                      ? "border-light-primary font-bold text-light-primary dark:border-ink-primary dark:text-ink-primary"
                      : "text-light-secondary dark:text-ink-secondary"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`${pageButton} text-light-secondary disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-secondary`}
            >
              Next
            </button>
          </nav>
        </div>
      </div>

      </div>

      {/* Right column: starts level with the toolbar row */}
      <div
        aria-live="polite"
        className="min-w-0 xl:sticky xl:top-20"
      >
        {insight ? <ShopInsightCard insight={insight} /> : null}
      </div>
    </div>
    </div>
  );
}
