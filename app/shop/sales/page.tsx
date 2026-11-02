"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Minus,
  Package,
  Plus,
  Printer,
  RefreshCw,
  Search,
  ShoppingBag,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { createSaleApi, getCategoriesApi, getProductsApi } from "@/lib/api/retail";
import {
  cacheProductsLocally,
  getCachedProducts,
  queueOfflineSale,
} from "@/lib/offline/sync-manager";
import { Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import type { PaymentMethod, Product, ProductCategory } from "@/types/retail";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ShopSalesPosPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedSale, setCompletedSale] = useState<any | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function loadPosData() {
    setIsLoading(true);
    const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
    setIsOfflineMode(!isOnline);

    // 1. Immediately load genuine cached items from IndexedDB
    try {
      const localCached = await getCachedProducts();
      if (localCached.length > 0) {
        setProducts(localCached);
      }
    } catch {
      // IndexedDB initialization error handled
    }

    // 2. If online, fetch fresh catalog from backend and update cache
    if (isOnline) {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          getCategoriesApi().catch(() => ({ success: false, categories: [] })),
          getProductsApi().catch(() => ({ success: false, products: [] })),
        ]);

        if (catsRes.success && catsRes.categories?.length) {
          setCategories(catsRes.categories);
        }
        if (prodsRes.success && prodsRes.products?.length) {
          setProducts(prodsRes.products);
          await cacheProductsLocally(prodsRes.products);
        }
      } catch {
        setStatusMessage("Operating in offline catalog mode.");
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadPosData();

    const handleOnline = () => {
      setIsOfflineMode(false);
      loadPosData();
    };
    const handleOffline = () => setIsOfflineMode(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.product.sellingPrice) * item.quantity,
    0
  );
  const total = Math.max(0, subtotal - (Number(discount) || 0));

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    const clientTxId = crypto.randomUUID();
    const localReceipt = `OJ-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${clientTxId.slice(0, 8).toUpperCase()}`;

    const salePayload = {
      idempotency_key: clientTxId,
      customer_name: customerName.trim() || undefined,
      customer_phone: customerPhone.trim() || undefined,
      payment_method: paymentMethod,
      discount: Number(discount) || 0,
      tax: 0,
      items: cart.map((i) => ({
        product_id: i.product.id,
        quantity: i.quantity,
      })),
    };

    try {
      // If browser is online, attempt live submission to backend
      if (typeof navigator !== "undefined" && navigator.onLine) {
        try {
          const res = await createSaleApi({
            ...salePayload,
            sold_at: new Date().toISOString(),
          });
          if (res.success) {
            setCompletedSale({
              id: res.data?.sale?.id || res.sale?.id || clientTxId,
              receiptNumber: res.data?.sale?.receiptNumber || res.sale?.receiptNumber || localReceipt,
              total,
              discount,
              paymentMethod,
              customerName,
              soldAt: new Date().toISOString(),
              items: cart.map((i) => ({
                productId: i.product.id,
                productName: i.product.name,
                quantity: i.quantity,
                unitPrice: Number(i.product.sellingPrice),
                lineTotal: Number(i.product.sellingPrice) * i.quantity,
              })),
              isOffline: false,
            });
            setCart([]);
            return;
          }
        } catch {
          // Live call failed -> seamlessly fall through to local queue
        }
      }

      // Offline Fallback: Save transaction locally in IndexedDB
      await queueOfflineSale({
        id: clientTxId,
        receiptNumber: localReceipt,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        paymentMethod,
        discount: Number(discount) || 0,
        tax: 0,
        total,
        items: cart.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          unitPrice: Number(i.product.sellingPrice),
          unitCost: Number(i.product.costPrice),
        })),
      });

      setCompletedSale({
        id: clientTxId,
        receiptNumber: localReceipt,
        total,
        discount,
        paymentMethod,
        customerName,
        soldAt: new Date().toISOString(),
        items: cart.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          unitPrice: Number(i.product.sellingPrice),
          lineTotal: Number(i.product.sellingPrice) * i.quantity,
        })),
        isOffline: true,
      });

      setCart([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatNGN = (num: number | string) =>
    `₦${(Number(num) || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Product Catalog Section (Left / 7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Search & Category Filter */}
        <div className="bg-background border border-border p-4 rounded-3xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-text" />
              <input
                type="text"
                placeholder="Scan barcode, enter SKU or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-surface-alt text-sm font-medium outline-none focus:border-brand-primary"
              />
            </div>
            <button
              onClick={() => loadPosData()}
              title="Refresh catalog"
              className="w-11 h-11 rounded-xl border border-border bg-surface-alt flex items-center justify-center text-secondary-text hover:text-foreground"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-brand-primary text-black"
                  : "bg-surface-alt text-secondary-text hover:text-foreground"
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === c.id
                    ? "bg-brand-primary text-black"
                    : "bg-surface-alt text-secondary-text hover:text-foreground"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Status notice */}
        {isOfflineMode && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 shrink-0" />
              <span>Offline Terminal Mode. Sales will queue locally and sync automatically when reconnected.</span>
            </div>
            <Link href="/shop/offline-queue" className="underline font-bold shrink-0">
              View Queue
            </Link>
          </div>
        )}

        {/* Product Cards Grid or Skeletons / Empty State */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-surface-alt border border-border rounded-2xl p-4" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-border rounded-3xl bg-background">
            <Package className="w-12 h-12 mx-auto text-secondary-text opacity-40 mb-3" />
            <h3 className="font-bold text-base text-foreground">No Products in Catalog</h3>
            <p className="text-xs text-secondary-text mt-1 max-w-sm mx-auto">
              Your store catalog is currently empty. Add products in the Inventory section or sync with your store backend to start selling.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link href="/shop/inventory">
                <Button variant="primary" size="md" className="font-bold">
                  Add Products in Inventory
                </Button>
              </Link>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-border rounded-3xl bg-background">
            <Search className="w-8 h-8 mx-auto text-secondary-text opacity-40 mb-2" />
            <p className="text-sm font-semibold text-foreground">No matching products found</p>
            <p className="text-xs text-secondary-text mt-1">
              Try adjusting your search query or select another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredProducts.map((p) => {
              const inCart = cart.find((i) => i.product.id === p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="bg-background border border-border rounded-2xl p-4 flex flex-col justify-between hover:border-brand-primary/60 hover:shadow-md cursor-pointer transition-all group relative select-none"
                >
                  {inCart && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-primary text-black font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {inCart.quantity}
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-mono text-secondary-text uppercase">
                      {p.sku}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-foreground mt-1 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-2 border-t border-border flex items-center justify-between">
                    <span className="font-extrabold text-xs sm:text-sm text-foreground">
                      {formatNGN(p.sellingPrice)}
                    </span>
                    <span className="text-[10px] text-secondary-text uppercase font-semibold">
                      /{p.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart & Checkout Panel (Right / 5 cols) */}
      <div className="lg:col-span-5 bg-background border border-border rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full min-h-[580px]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              <h2 className="font-bold text-base text-foreground">Active Order</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-text font-semibold">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-xs text-danger hover:underline font-semibold ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="py-3 max-h-[300px] overflow-y-auto space-y-2.5">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-secondary-text">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30 mb-2" />
                <p className="text-sm font-semibold">Cart is empty</p>
                <p className="text-xs mt-0.5">Click or scan products to add them to this order.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-surface-alt border border-border"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-secondary-text">
                      {formatNGN(item.product.sellingPrice)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-7 h-7 rounded-lg border border-border bg-background flex items-center justify-center text-foreground hover:bg-surface-alt"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-7 h-7 rounded-lg border border-border bg-background flex items-center justify-center text-foreground hover:bg-surface-alt"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right shrink-0 min-w-16">
                    <div className="font-extrabold text-xs text-foreground">
                      {formatNGN(Number(item.product.sellingPrice) * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] text-danger hover:underline mt-0.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Calculations, Payment Method, and Checkout Action */}
        <div className="pt-4 border-t border-border space-y-3">
          {/* Customer Info (Optional) */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              placeholder="Customer Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="h-9 px-3 rounded-xl border border-border bg-surface-alt text-xs outline-none focus:border-brand-primary"
            />
            <input
              placeholder="Phone (for SMS receipt)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="h-9 px-3 rounded-xl border border-border bg-surface-alt text-xs outline-none focus:border-brand-primary"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[10px] font-bold text-secondary-text uppercase mb-1.5">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {(["cash", "pos", "transfer"] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`h-9 rounded-xl font-bold uppercase transition-colors ${
                    paymentMethod === method
                      ? "bg-brand-primary text-black"
                      : "bg-surface-alt border border-border text-secondary-text hover:text-foreground"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Subtotal, Discount, and Total */}
          <div className="space-y-1.5 text-xs text-secondary-text pt-2 border-t border-border">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-foreground">{formatNGN(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Discount (₦)</span>
              <input
                type="number"
                min="0"
                value={discount || ""}
                onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className="w-24 h-7 text-right px-2 rounded-lg border border-border bg-surface-alt text-xs font-bold text-foreground outline-none focus:border-brand-primary"
              />
            </div>
            <div className="flex justify-between text-base font-extrabold text-foreground pt-1.5 border-t border-border">
              <span>Total Payable</span>
              <span className="text-brand-primary">{formatNGN(total)}</span>
            </div>
          </div>

          {/* Pay Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleCheckout}
            disabled={cart.length === 0 || isSubmitting}
            className="w-full font-extrabold flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>Finalizing Order...</span>
            ) : (
              <span>Complete Sale · {formatNGN(total)}</span>
            )}
          </Button>
        </div>
      </div>

      {/* Sale Confirmation Modal / Receipt */}
      {completedSale && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">Sale Completed!</h3>
              <p className="text-xs text-secondary-text mt-0.5">
                Receipt: <span className="font-mono font-bold text-foreground">{completedSale.receiptNumber}</span>
              </p>
              {completedSale.isOffline && (
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning/15 text-warning text-xs font-bold">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Saved to Offline Queue</span>
                </div>
              )}
            </div>

            <div className="bg-surface-alt rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary-text">Payment Method:</span>
                <span className="font-bold text-foreground uppercase">{completedSale.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Total Amount:</span>
                <span className="font-extrabold text-brand-primary">{formatNGN(completedSale.total)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.print()}
                className="flex-1 font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setCompletedSale(null)}
                className="flex-1 font-bold"
              >
                New Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
