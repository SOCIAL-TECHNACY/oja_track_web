"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Plus,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { getShopDashboardApi } from "@/lib/api/retail";
import { getAllQueuedSales, getCachedProducts } from "@/lib/offline/sync-manager";
import { MetricCard } from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import type { ShopDashboardResponse } from "@/types/retail";

export default function ShopOgaDashboardPage() {
  const [data, setData] = useState<ShopDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isOfflineData, setIsOfflineData] = useState<boolean>(false);

  async function loadDashboard() {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await getShopDashboardApi();
      if (res.success) {
        setData(res);
        setIsOfflineData(false);
      } else {
        throw new Error("Unable to retrieve dashboard metrics from server.");
      }
    } catch (err: unknown) {
      // Calculate genuine local metrics from IndexedDB if server is offline or route unmounted
      try {
        const queuedSales = await getAllQueuedSales();
        const cachedProducts = await getCachedProducts();

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todaySales = queuedSales.filter((s) => {
          const d = new Date(s.createdAtISO);
          return d >= todayStart;
        });

        const totalSalesAmount = todaySales.reduce((sum, s) => sum + (s.total || 0), 0);
        const totalProfitAmount = todaySales.reduce((sum, s) => sum + (s.profit || 0), 0);

        setData({
          success: true,
          summary: {
            today_sales: totalSalesAmount,
            today_profit: totalProfitAmount,
            today_transactions: todaySales.length,
            products: cachedProducts.length,
            staff: 1,
          },
          low_stock: [],
          recent_sales: queuedSales.slice(0, 5).map((qs) => ({
            id: qs.id,
            receiptNumber: qs.receiptNumber,
            subtotal: qs.total,
            discount: qs.discount,
            tax: qs.tax,
            total: qs.total,
            profit: qs.profit || 0,
            paymentMethod: qs.paymentMethod,
            status: "completed" as const,
            customerName: qs.customerName || "Walk-in Customer",
            soldAt: qs.createdAtISO,
            organisationId: qs.organisationId || "",
            branchId: qs.branchId || "",
            soldById: qs.soldById || "",
            createdAt: qs.createdAtISO,
            soldBy: { firstName: "Local", lastName: "Register" },
            items: qs.items.map((it) => ({
              id: it.productId,
              saleId: qs.id,
              productId: it.productId,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
              unitCost: it.unitCost || 0,
              lineTotal: it.unitPrice * it.quantity,
              lineProfit: 0,
              product: {
                id: it.productId,
                organisationId: "",
                name: it.productName,
                sku: "",
                sellingPrice: it.unitPrice,
                costPrice: it.unitCost || 0,
                reorderLevel: 0,
                unit: "piece" as const,
                isActive: true,
                createdAt: "",
                updatedAt: "",
              },
            })),
          })),
        });
        setIsOfflineData(true);
      } catch {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Failed to communicate with retail services. Please verify your connection.";
        setApiError(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatNGN = (amount: number | string) => {
    const num = Number(amount) || 0;
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Offline / Backend Gap Banner */}
      {isOfflineData && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>
              Server connection unavailable. Displaying genuine local store records and offline sales queue.
            </span>
          </div>
          <button
            onClick={() => loadDashboard()}
            className="flex items-center gap-1 font-bold underline hover:opacity-80 shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      )}

      {/* API Error Alert */}
      {apiError && !data && (
        <div className="p-4 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-between gap-3 text-sm text-danger">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{apiError}</span>
          </div>
          <button
            onClick={() => loadDashboard()}
            className="px-3 py-1.5 rounded-xl bg-danger text-white text-xs font-bold hover:bg-danger/90"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Greeting & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Oga Command Center
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-0.5">
            Real-time daily operations, sales performance, and branch inventory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/shop/sales">
            <Button variant="primary" size="md" className="font-bold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Open POS Register</span>
            </Button>
          </Link>
          <Link href="/shop/inventory">
            <Button variant="secondary" size="md" className="font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-surface-alt border border-border rounded-2xl p-4" />
          ))}
        </div>
      ) : (
        /* Metric Summary Cards */
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Today's Sales"
            value={formatNGN(data?.summary?.today_sales ?? 0)}
            change={data?.summary?.today_transactions ? `${data.summary.today_transactions} sales` : "0 sales"}
            positive={Boolean(data?.summary?.today_sales && data.summary.today_sales > 0)}
          />
          <MetricCard
            label="Estimated Gross Profit"
            value={formatNGN(data?.summary?.today_profit ?? 0)}
            change={data?.summary?.today_profit ? "Net margin" : "0% margin"}
            positive={Boolean(data?.summary?.today_profit && data.summary.today_profit > 0)}
          />
          <MetricCard
            label="Active Products"
            value={String(data?.summary?.products ?? 0)}
            change="In Catalog"
            positive={Boolean(data?.summary?.products && data.summary.products > 0)}
          />
          <MetricCard
            label="Branch Staff"
            value={String(data?.summary?.staff ?? 1)}
            change="Active cashiers"
            positive={true}
          />
        </div>
      )}

      {/* Main Content Grid: Recent Sales & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Transactions Ledger (8 cols) */}
        <div className="lg:col-span-8 bg-background border border-border rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Today&apos;s Sales Ledger</h2>
              <p className="text-xs text-secondary-text">Completed customer receipts</p>
            </div>
            <Link
              href="/shop/sales"
              className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
            >
              <span>View POS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-surface-alt rounded-2xl" />
              ))}
            </div>
          ) : !data?.recent_sales?.length ? (
            <div className="p-8 text-center border border-dashed border-border rounded-2xl">
              <ShoppingBag className="w-8 h-8 mx-auto text-secondary-text opacity-40 mb-2" />
              <p className="text-sm font-semibold text-foreground">No sales recorded today</p>
              <p className="text-xs text-secondary-text mt-1 max-w-sm mx-auto">
                Transactions processed through the POS register will appear in this ledger in real-time.
              </p>
              <Link href="/shop/sales" className="mt-4 inline-block">
                <Button variant="secondary" size="sm">
                  Record First Sale
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recent_sales.map((sale) => (
                <div
                  key={sale.id}
                  className="p-3.5 rounded-2xl border border-border bg-surface-alt flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-primary/40 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {sale.receiptNumber}
                      </span>
                      <Badge status={sale.status === "completed" ? "success" : "warning"}>
                        {sale.status === "completed" ? "Paid" : "Pending Sync"}
                      </Badge>
                    </div>
                    <p className="text-xs text-secondary-text mt-1">
                      {sale.customerName || "Walk-in Customer"} · {sale.paymentMethod.toUpperCase()}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-sm sm:text-base font-extrabold text-foreground">
                      {formatNGN(sale.total)}
                    </div>
                    <p className="text-[11px] text-secondary-text">
                      {new Date(sale.soldAt).toLocaleTimeString("en-NG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts (4 cols) */}
        <div className="lg:col-span-4 bg-background border border-border rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">Stock Alerts</h2>
                <p className="text-xs text-secondary-text">Items below reorder threshold</p>
              </div>
              <Boxes className="w-4 h-4 text-warning" />
            </div>

            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="h-14 bg-surface-alt rounded-2xl" />
                ))}
              </div>
            ) : !data?.low_stock?.length ? (
              <div className="p-6 text-center border border-dashed border-border rounded-2xl my-auto">
                <Boxes className="w-7 h-7 mx-auto text-success opacity-70 mb-2" />
                <p className="text-xs font-bold text-foreground">Inventory Levels Healthy</p>
                <p className="text-[11px] text-secondary-text mt-0.5">
                  No products have fallen below their reorder limits.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.low_stock.map((item) => (
                  <div
                    key={`${item.branchId}-${item.productId}`}
                    className="p-3 rounded-2xl border border-warning/20 bg-warning/5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-secondary-text">
                        SKU: {item.product.sku} · Reorder at {item.product.reorderLevel}
                      </p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-full bg-danger/10 text-danger text-xs font-bold">
                      {item.quantity} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Link href="/shop/inventory" className="block">
              <Button variant="secondary" size="md" className="w-full font-bold">
                Manage Inventory &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
