import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  CreateSalePayload,
  InventoryMovement,
  Product,
  ProductCategory,
  Sale,
  ShopDashboardResponse,
} from "@/types/retail";
import type { ApiResponse } from "@/types/api";

export async function getShopDashboardApi(): Promise<ShopDashboardResponse> {
  return apiClient<ShopDashboardResponse>(ENDPOINTS.RETAIL.DASHBOARD);
}

export async function getCategoriesApi(): Promise<{ success: boolean; categories: ProductCategory[] }> {
  return apiClient(ENDPOINTS.RETAIL.CATEGORIES);
}

export async function createCategoryApi(name: string, description?: string): Promise<ApiResponse<{ category: ProductCategory }>> {
  return apiClient(ENDPOINTS.RETAIL.CATEGORIES, {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });
}

export async function getProductsApi(search?: string, branchId?: string): Promise<{ success: boolean; products: Product[] }> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (branchId) params.set("branchId", branchId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient(`${ENDPOINTS.RETAIL.PRODUCTS}${query}`);
}

export async function createProductApi(data: Partial<Product>): Promise<ApiResponse<{ product: Product }>> {
  return apiClient(ENDPOINTS.RETAIL.PRODUCTS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProductApi(id: string, data: Partial<Product>): Promise<ApiResponse<{ product: Product }>> {
  return apiClient(`${ENDPOINTS.RETAIL.PRODUCTS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getInventoryApi(branchId?: string, productId?: string): Promise<{ success: boolean; inventory: any[] }> {
  const params = new URLSearchParams();
  if (branchId) params.set("branchId", branchId);
  if (productId) params.set("productId", productId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient(`${ENDPOINTS.RETAIL.INVENTORY}${query}`);
}

export async function adjustInventoryApi(data: {
  branch_id: string;
  product_id: string;
  movement_type: string;
  quantity: number;
  unit_cost?: number;
  note?: string;
}): Promise<ApiResponse<{ quantity: any; movement: InventoryMovement }>> {
  return apiClient(ENDPOINTS.RETAIL.INVENTORY_ADJUST, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getInventoryMovementsApi(branchId?: string, productId?: string): Promise<{ success: boolean; movements: InventoryMovement[] }> {
  const params = new URLSearchParams();
  if (branchId) params.set("branchId", branchId);
  if (productId) params.set("productId", productId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient(`${ENDPOINTS.RETAIL.INVENTORY_MOVEMENTS}${query}`);
}

export async function createSaleApi(payload: CreateSalePayload): Promise<ApiResponse<{ duplicate?: boolean; sale: Sale }>> {
  return apiClient(ENDPOINTS.RETAIL.SALES, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSalesApi(from?: string, to?: string, branchId?: string): Promise<{ success: boolean; sales: Sale[] }> {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (branchId) params.set("branchId", branchId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient(`${ENDPOINTS.RETAIL.SALES}${query}`);
}

export async function voidSaleApi(id: string): Promise<ApiResponse<{ sale: Sale }>> {
  return apiClient(ENDPOINTS.RETAIL.VOID_SALE(id), {
    method: "POST",
  });
}

export async function getReportsApi(from?: string, to?: string): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient(`${ENDPOINTS.RETAIL.REPORTS}${query}`);
}

// Staff management
export async function getStaffApi(): Promise<{ success: boolean; staff: any[] }> {
  return apiClient(ENDPOINTS.ORGANISATION.STAFF);
}

export async function inviteStaffApi(data: {
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  branch_id?: string;
}): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.ORGANISATION.INVITATIONS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function revokeStaffInvitationApi(id: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.ORGANISATION.REVOKE_INVITATION(id), {
    method: "POST",
  });
}

// Branches
export async function getBranchesApi(): Promise<{ success: boolean; branches: any[] }> {
  return apiClient(ENDPOINTS.ORGANISATION.BRANCHES);
}

// Subscription
export async function getShopSubscriptionApi(): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.ORGANISATION.SUBSCRIPTION);
}

export async function upgradeShopSubscriptionApi(planId: string): Promise<ApiResponse> {
  return apiClient(ENDPOINTS.ORGANISATION.SUBSCRIPTION, {
    method: "POST",
    body: JSON.stringify({ plan_id: planId }),
  });
}
