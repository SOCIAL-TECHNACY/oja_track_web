"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  ShoppingBag,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  getAllQueuedSales,
  syncPendingSales,
  type SyncProgress,
} from "@/lib/offline/sync-manager";
import type { OfflineQueuedSale } from "@/lib/offline/db";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";

export default function ShopOfflineQueuePage() {
  const [sales, setSales] = useState<OfflineQueuedSale[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function loadQueue() {
    const list = await getAllQueuedSales();
    setSales(list);
  }

  const handleSync = async () => {
    setStatusMessage(null);
    const result = await syncPendingSales((progress) => {
      setSyncProgress(progress);
    });

    if (result.total === 0) {
      setStatusMessage("All transactions are already synchronized with central servers.");
    } else if (result.synced > 0) {
      setStatusMessage(`Successfully synchronized ${result.synced} of ${result.total} transactions.`);
    } else if (result.failed > 0) {
      setStatusMessage(`Sync attempted. ${result.failed} transactions failed to synchronize.`);
    }

    await loadQueue();
  };

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

    const handleOnline = () => {
      setIsOnline(true);
      handleSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    loadQueue();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const pendingSales = sales.filter((s) => s.status === "pending" || s.status === "syncing");
  const syncedSales = sales.filter((s) => s.status === "synced");

  const formatNGN = (num: number | string) =>
    `₦${(Number(num) || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Offline Sales Queue
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Zero-data-loss architecture: sales recorded without internet remain immutable until synchronized.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/shop/sales">
            <Button variant="secondary" className="font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Counter POS</span>
            </Button>
          </Link>
          <Button
            onClick={handleSync}
            disabled={syncProgress?.isSyncing || pendingSales.length === 0}
            variant="primary"
            className="font-bold flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${syncProgress?.isSyncing ? "animate-spin" : ""}`} />
            <span>
              {syncProgress?.isSyncing ? "Syncing..." : `Sync Now (${pendingSales.length})`}
            </span>
          </Button>
        </div>
      </div>

      {/* Connectivity & Operational Banner */}
      <div
        className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
          !isOnline
            ? "bg-warning/10 border-warning/30 text-warning"
            : pendingSales.length > 0
            ? "bg-blue-500/10 border-blue-500/20 text-blue-500"
            : "bg-success/10 border-success/20 text-success"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              !isOnline
                ? "bg-warning/20 text-warning"
                : pendingSales.length > 0
                ? "bg-blue-500/20 text-blue-500"
                : "bg-success/20 text-success"
            }`}
          >
            {!isOnline ? (
              <WifiOff className="w-6 h-6" />
            ) : pendingSales.length > 0 ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Wifi className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-foreground">
              {!isOnline
                ? "Offline Mode Active"
                : pendingSales.length > 0
                ? "Pending Transactions Awaiting Sync"
                : "Central Connection Stable"}
            </div>
            <div className="text-xs text-secondary-text mt-0.5">
              {!isOnline
                ? "No internet connection detected. Point of Sale is writing directly to local device IndexedDB."
                : pendingSales.length > 0
                ? `${pendingSales.length} counter sales queued. Click Sync Now or automatic background sync will flush the queue.`
                : "All sales are fully synchronized with Daniel's backend. Ledger is 100% up to date."}
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs font-semibold text-secondary-text">Pending Value</div>
          <div className="text-base font-extrabold text-foreground">
            {formatNGN(pendingSales.reduce((sum, s) => sum + s.total, 0))}
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-surface-alt border border-border text-xs font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-primary" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Queued Sales Table */}
      <div className="bg-background border border-border rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">Transaction Queue Ledger</h2>
            <p className="text-xs text-secondary-text">
              Track synchronization lifecycle and cryptographic client receipt references
            </p>
          </div>
          <span className="text-xs text-secondary-text font-semibold">
            {sales.length} Total Local Records
          </span>
        </div>

        {sales.length === 0 ? (
          <div className="text-center py-12 text-secondary-text">
            <CheckCircle2 className="w-10 h-10 mx-auto text-success/50 mb-2" />
            <p className="text-sm font-semibold text-foreground">Queue is clear</p>
            <p className="text-xs mt-1">
              Sales made while offline will appear here until synchronized.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-secondary-text font-semibold uppercase tracking-wider">
                  <th className="pb-3">Client Receipt</th>
                  <th className="pb-3">Recorded At</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Total (₦)</th>
                  <th className="pb-3">Sync Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-surface-alt/50 transition-colors">
                    <td className="py-3.5 font-bold font-mono text-brand-primary">
                      {sale.receiptNumber}
                    </td>
                    <td className="py-3.5 text-secondary-text">
                      {new Date(sale.createdAtISO).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5">{sale.customerName || "Walk-in"}</td>
                    <td className="py-3.5 font-semibold">
                      {sale.items.reduce((s, i) => s + i.quantity, 0)} units
                    </td>
                    <td className="py-3.5 capitalize font-medium">{sale.paymentMethod}</td>
                    <td className="py-3.5 font-bold">{formatNGN(sale.total)}</td>
                    <td className="py-3.5">
                      {sale.status === "synced" ? (
                        <Badge status="success">Synced</Badge>
                      ) : sale.status === "syncing" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 animate-pulse">
                          Syncing...
                        </span>
                      ) : (
                        <Badge status="warning">Pending Sync</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
