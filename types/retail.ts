export type ProductUnit =
  | "piece"
  | "kg"
  | "g"
  | "litre"
  | "ml"
  | "box"
  | "pack"
  | "set"
  | "service";

export type PaymentMethod = "cash" | "card" | "transfer" | "pos" | "wallet" | "other";

export type InventoryMovementType =
  | "opening"
  | "purchase"
  | "sale"
  | "sale_reversal"
  | "adjustment_in"
  | "adjustment_out"
  | "transfer_in"
  | "transfer_out"
  | "damaged"
  | "returned";

export interface ProductCategory {
  id: string;
  organisationId: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BranchInventory {
  branchId: string;
  productId: string;
  quantity: string | number;
  updatedAt: string;
  branch?: ShopBranch;
  product?: Product;
}

export interface Product {
  id: string;
  organisationId: string;
  categoryId?: string | null;
  name: string;
  sku: string;
  description?: string | null;
  unit: ProductUnit;
  sellingPrice: string | number;
  costPrice: string | number;
  reorderLevel: string | number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: ProductCategory | null;
  inventories?: BranchInventory[];
}

export interface ShopBranch {
  id: string;
  organisationId: string;
  name: string;
  code: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  timezone: string;
  isPrimary: boolean;
  status: string;
  createdAt: string;
}

export interface SaleItem {
  id?: string;
  productId: string;
  quantity: string | number;
  unitPrice: string | number;
  unitCost: string | number;
  lineTotal: string | number;
  lineProfit?: string | number;
  product?: Product;
}

export interface Sale {
  id: string;
  organisationId: string;
  branchId: string;
  soldById: string;
  receiptNumber: string;
  subtotal: string | number;
  discount: string | number;
  tax: string | number;
  total: string | number;
  profit: string | number;
  paymentMethod: PaymentMethod;
  paymentReference?: string | null;
  status: "completed" | "voided";
  idempotencyKey?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  notes?: string | null;
  soldAt: string;
  voidedAt?: string | null;
  createdAt: string;
  branch?: ShopBranch;
  soldBy?: {
    id?: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
  items: SaleItem[];
}

export interface CreateSaleItemPayload {
  product_id: string;
  quantity: number;
}

export interface CreateSalePayload {
  branch_id?: string;
  idempotency_key?: string;
  customer_name?: string;
  customer_phone?: string;
  payment_method: PaymentMethod;
  payment_reference?: string;
  discount?: number;
  tax?: number;
  notes?: string;
  sold_at?: string; // Optional client-side original timestamp
  items: CreateSaleItemPayload[];
}

export interface InventoryMovement {
  id: string;
  organisationId: string;
  branchId: string;
  productId: string;
  movementType: InventoryMovementType;
  quantity: string | number;
  unitCost?: string | number | null;
  referenceType?: string | null;
  referenceId?: string | null;
  note?: string | null;
  createdAt: string;
  product?: Product;
  branch?: ShopBranch;
  createdBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ShopDashboardSummary {
  today_sales: number;
  today_profit: number;
  today_transactions: number;
  products: number;
  staff: number;
}

export interface ShopDashboardResponse {
  success: boolean;
  summary: ShopDashboardSummary;
  low_stock: Array<{
    branchId: string;
    productId: string;
    quantity: number | string;
    product: Product;
    branch: ShopBranch;
  }>;
  recent_sales: Sale[];
}
