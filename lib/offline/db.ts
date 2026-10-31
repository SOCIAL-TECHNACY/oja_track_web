import Dexie, { type Table } from "dexie";
import type { PaymentMethod, Product } from "@/types/retail";

export interface LocalProduct extends Product {
  localQuantity: number;
}

export interface OfflineQueuedSale {
  id: string; // Client UUID v4 (used as idempotency_key)
  receiptNumber: string; // e.g. "OJ-OFFLINE-YYYYMMDD-XXXX"
  organisationId?: string;
  branchId?: string;
  soldById?: string;
  customerName?: string;
  customerPhone?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  discount: number;
  tax: number;
  total: number;
  profit?: number;
  notes?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    unitCost?: number;
  }>;
  status: "pending" | "syncing" | "synced" | "conflict";
  createdAtISO: string;
  syncedAtISO?: string;
  retryCount: number;
  lastError?: string;
}

export class OjaTrackOfflineDB extends Dexie {
  products!: Table<LocalProduct, string>;
  salesQueue!: Table<OfflineQueuedSale, string>;

  constructor() {
    super("OjaTrackOfflineDB");
    this.version(1).stores({
      products: "id, sku, name, categoryId, isActive",
      salesQueue: "id, receiptNumber, status, createdAtISO",
    });
  }
}

export const offlineDb = typeof window !== "undefined" ? new OjaTrackOfflineDB() : (null as any);
