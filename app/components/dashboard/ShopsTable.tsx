"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "../ui/Input";
import {
  formatNGN,
  shopMatchesQuery,
  TOTAL_SHOPS_COUNT,
  type OnboardedShop,
  type ShopStatus,
} from "@/lib/agent-dashboard";

const PAGE_SIZE = 8;

function StatusPill({ status }: { status: ShopStatus }) {
  const cls =
    status === "Active"
      ? "bg-[#e6f4ea] text-light-primary dark:bg-brand-primary/15 dark:text-brand-hover"
      : "bg-danger/10 text-danger dark:bg-danger/15";
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold whitespace-nowrap ${cls}`}
    >
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
        className="h-[41px] cursor-pointer appearance-none rounded-lg border border-border bg-white pr-9 pl-3 text-sm text-light-secondary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-secondary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label}: {opt}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-muted"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="m4 6 4 4 4-4"
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
 * Client island for the My Shops page: search + status/location
 * filters + paginated table. The page itself stays server-rendered;
 * all interactive state lives here.
 */
export default function ShopsTable({ shops }: { shops: OnboardedShop[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("Nigeria");
  const [page, setPage] = useState(1);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(shops.map((s) => s.location))).sort();
    return ["Nigeria", ...unique];
  }, [shops]);

  const filtered = useMemo(
    () =>
      shops.filter(
        (s) =>
          (status === "All" || s.status === status) &&
          (location === "Nigeria" || s.location === location) &&
          shopMatchesQuery(s, query),
      ),
    [shops, status, location, query],
  );

  const isUnfiltered =
    status === "All" && location === "Nigeria" && query.trim() === "";
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);
  const totalLabel = isUnfiltered ? TOTAL_SHOPS_COUNT : filtered.length;

  const pageButton =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors";

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchInput
            aria-label="Search shop or owner"
            placeholder="Search shop or owner..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={["All", "Active", "Expired"]}
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
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex h-[41px] cursor-not-allowed items-center rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white opacity-90"
          >
            + Onboard New Shop
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[13px] text-light-secondary dark:text-ink-secondary">
                {[
                  "Shop Name",
                  "Owner",
                  "Location",
                  "Status",
                  "Subscription",
                  "Renewal Date",
                  "Commission",
                  "Last Active",
                ].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium first:pl-6 last:pr-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((shop) => (
                <tr
                  key={shop.id}
                  className="border-b border-border last:border-0 dark:border-[#1e3a2b]"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 font-bold whitespace-nowrap text-light-primary first:pl-6 dark:text-ink-primary"
                  >
                    {shop.shopName}
                  </th>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {shop.owner}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {shop.location}
                  </td>
                  <td className="px-4 py-4">
                    <StatusPill status={shop.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {shop.subscription}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary dark:text-ink-secondary">
                    {shop.renewalDate}
                  </td>
                  <td
                    className={`px-4 py-4 font-bold whitespace-nowrap tabular-nums ${
                      shop.commissionNGN > 0
                        ? "text-brand-primary"
                        : "text-light-secondary dark:text-ink-secondary"
                    }`}
                  >
                    {formatNGN(shop.commissionNGN)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-light-secondary last:pr-6 dark:text-ink-secondary">
                    {shop.lastActive}
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-light-secondary dark:text-ink-secondary"
                  >
                    No shops match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-light-secondary dark:text-ink-secondary">
            Showing {rangeStart}-{rangeEnd} of {totalLabel} shops
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
  );
}
