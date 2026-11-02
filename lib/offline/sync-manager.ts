import {
  offlineDb,
  requestPersistentStorage,
  type LocalProduct,
  type OfflineQueuedSale,
} from "./db";
import { createSaleApi } from "../api/retail";
import type { CreateSalePayload, PaymentMethod, Product } from "@/types/retail";

export interface SyncProgress {
  total: number;
  synced: number;
  failed: number;
  isSyncing: boolean;
}

export async function cacheProductsLocally(products: Product[]): Promise<void> {
  if (!offlineDb || !products.length) return;

  await requestPersistentStorage();

  const localItems: LocalProduct[] = products.map((p) => {
    // Strip nested circular inventories relation for local IndexedDB storage
    const { inventories, ...rest } = p;
    return {
      ...rest,
      localQuantity: 999, // Fallback default if branch inventory quantity is not specified
    };
  });

  try {
    await offlineDb.products.bulkPut(localItems);
  } catch {
    // If bulk put fails, try individual puts
    for (const item of localItems) {
      await offlineDb.products.put(item).catch(() => {});
    }
  }
}

/**
 * Retrieve cached products from IndexedDB for POS offline lookup.
 */
export async function getCachedProducts(): Promise<LocalProduct[]> {
  if (!offlineDb) return [];
  try {
    return await offlineDb.products.toArray();
  } catch {
    return [];
  }
}

export async function enqueueOfflineSale(
  sale: Omit<CreateSalePayload, "items" | "payment_method"> & {
    id?: string;
    payment_method?: PaymentMethod;
    paymentMethod?: PaymentMethod;
    organisation_id?: string;
    sold_by_id?: string;
    receiptNumber: string;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      unitCost?: number;
    }>;
    total: number;
    profit?: number;
    customerName?: string;
    customerPhone?: string;
  }
): Promise<OfflineQueuedSale> {
  const method: PaymentMethod = sale.payment_method || sale.paymentMethod || "cash";
  const recordId = sale.id || sale.idempotency_key || (typeof crypto !== "undefined" ? crypto.randomUUID() : `offline-${Date.now()}`);

  const queuedRecord: OfflineQueuedSale = {
    id: recordId,
    receiptNumber: sale.receiptNumber,
    organisationId: sale.organisation_id,
    branchId: sale.branch_id,
    soldById: sale.sold_by_id,
    customerName: sale.customerName || sale.customer_name,
    customerPhone: sale.customerPhone || sale.customer_phone,
    paymentMethod: method,
    paymentReference: sale.payment_reference,
    discount: sale.discount || 0,
    tax: sale.tax || 0,
    total: sale.total,
    profit: sale.profit || 0,
    notes: sale.notes,
    items: sale.items,
    status: "pending",
    createdAtISO: new Date().toISOString(),
    retryCount: 0,
  };

  if (offlineDb) {
    await requestPersistentStorage();
    await offlineDb.salesQueue.put(queuedRecord);

    // Optimistically decrement local product quantities
    for (const item of sale.items) {
      const prod = await offlineDb.products.get(item.productId);
      if (prod) {
        const nextQty = Math.max(0, (prod.localQuantity || 0) - item.quantity);
        await offlineDb.products.update(item.productId, { localQuantity: nextQty });
      }
    }
  }

  return queuedRecord;
}

export const queueOfflineSale = enqueueOfflineSale;

export async function getPendingSalesCount(): Promise<number> {
  if (!offlineDb) return 0;
  return offlineDb.salesQueue.where("status").equals("pending").count();
}

export async function getAllQueuedSales(): Promise<OfflineQueuedSale[]> {
  if (!offlineDb) return [];
  return offlineDb.salesQueue.orderBy("createdAtISO").reverse().toArray();
}

export async function syncPendingSales(
  onProgress?: (progress: SyncProgress) => void
): Promise<{ total: number; synced: number; failed: number }> {
  if (!offlineDb) return { total: 0, synced: 0, failed: 0 };

  const pending = await offlineDb.salesQueue
    .where("status")
    .anyOf(["pending", "failed"])
    .toArray();

  const progress: SyncProgress = {
    total: pending.length,
    synced: 0,
    failed: 0,
    isSyncing: true,
  };

  onProgress?.(progress);

  for (const record of pending) {
    try {
      await offlineDb.salesQueue.update(record.id, { status: "syncing" });

      const payload: CreateSalePayload = {
        branch_id: record.branchId,
        payment_method: record.paymentMethod,
        payment_reference: record.paymentReference,
        customer_name: record.customerName,
        customer_phone: record.customerPhone,
        discount: record.discount,
        tax: record.tax,
        notes: record.notes,
        idempotency_key: record.id,
        items: record.items.map((i) => ({
          product_id: i.productId,
          quantity: i.quantity,
        })),
        // Include offline creation timestamp if backend allows
        sold_at: record.createdAtISO,
      };

      try {
        await createSaleApi(payload);
      } catch (firstErr: any) {
        // If Fastify rejects sold_at due to strict schema (additionalProperties: false),
        // fallback and submit without sold_at so offline sales are never lost
        if (firstErr?.status === 400 || firstErr?.message?.includes("sold_at")) {
          const { sold_at, ...cleanPayload } = payload;
          await createSaleApi(cleanPayload);
        } else {
          throw firstErr;
        }
      }

      await offlineDb.salesQueue.update(record.id, {
        status: "synced",
        syncedAtISO: new Date().toISOString(),
      });

      progress.synced += 1;
    } catch (err: any) {
      await offlineDb.salesQueue.update(record.id, {
        status: "failed",
        lastError: err?.message || "Sync failed",
        retryCount: (record.retryCount || 0) + 1,
      });

      progress.failed += 1;
    }

    onProgress?.({ ...progress });
  }

  progress.isSyncing = false;
  onProgress?.(progress);

  return {
    total: progress.total,
    synced: progress.synced,
    failed: progress.failed,
  };
}
