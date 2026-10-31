import type { AuthContextUser, MembershipRole, UserRole } from "@/types/auth";

export function isPlatformAdmin(user: AuthContextUser | null): boolean {
  return user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";
}

export function isSuperAdmin(user: AuthContextUser | null): boolean {
  return user?.role === "SUPER_ADMIN";
}

export function isAgent(user: AuthContextUser | null): boolean {
  return user?.role === "AGENT";
}

export function isShopUser(user: AuthContextUser | null): boolean {
  return user?.role === "ORG_ADMIN" || user?.role === "SHOP_STAFF";
}

export function isOwner(user: AuthContextUser | null): boolean {
  return user?.membership_role === "owner";
}

export function isManagerOrOwner(user: AuthContextUser | null): boolean {
  const role = user?.membership_role;
  return role === "owner" || role === "admin" || role === "manager";
}

export function isStaff(user: AuthContextUser | null): boolean {
  return user?.membership_role === "staff";
}

export function canVoidSale(user: AuthContextUser | null): boolean {
  return isManagerOrOwner(user);
}

export function canManageStaff(user: AuthContextUser | null): boolean {
  return user?.membership_role === "owner" || user?.membership_role === "admin";
}

export function canAdjustInventory(user: AuthContextUser | null): boolean {
  return isManagerOrOwner(user);
}

export function canRecordSale(user: AuthContextUser | null): boolean {
  return isShopUser(user);
}
