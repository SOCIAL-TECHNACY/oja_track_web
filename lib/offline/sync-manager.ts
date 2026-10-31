import { offlineDb, type OfflineQueuedSale } from "./db";
import { createSaleApi } from "@/lib/api/retail";

export interface SyncProgress {
  total: number;
  synced: number;
  failed: number;
  isSyncing: boolean;
}

export async function queueOfflineSale(
  sale: Omit<OfflineQueuedSale, "status" | "retryCount" | "createdAtISO">
): Promise<OfflineQueuedSale> {
  const queuedRecord: OfflineQueuedSale = {
    ...sale,
    status: "pending",
    retryCount: 0,
    createdAtISO: new Date().toISOString(),
  };

  if (offlineDb) {
    await offlineDb.salesQueue.put(queuedRecord);

    // Decrement local product quantities
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
): Promise<SyncProgress> {
  if (!offlineDb) {
    return { total: 0, synced: 0, failed: 0, isSyncing: false };
  }

  const pending = await offlineDb.salesQueue.where("status").equals("pending").toArray();
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

      const res = await createSaleApi({
        branch_id: record.branchId,
        idempotency_key: record.id,
        customer_name: record.customerName,
        customer_phone: record.customerPhone,
        payment_method: record.paymentMethod,
        payment_reference: record.paymentReference,
        discount: record.discount,
        tax: record.tax,
        notes: record.notes,
        sold_at: record.createdAtISO,
        items: record.items.map((i: { productId: string; quantity: number }) => ({
          product_id: i.productId,
          quantity: i.quantity,
        })),
      });

      if (res.success) {
        await offlineDb.salesQueue.update(record.id, {
          status: "synced",
          syncedAtISO: new Date().toISOString(),
          receiptNumber: res.data?.sale?.receiptNumber || res.sale?.receiptNumber || record.receiptNumber,
        });
        progress.synced++;
      } else {
        throw new Error(res.message || "Failed to synchronize sale");
      }
    } catch (err: any) {
      progress.failed++;
      await offlineDb.salesQueue.update(record.id, {
        status: "pending",
        retryCount: (record.retryCount || 0) + 1,
        lastError: err?.message || "Sync failed",
      });
    }

    onProgress?.({ ...progress });
  }

  progress.isSyncing = false;
  onProgress?.(progress);
  return progress;
}
