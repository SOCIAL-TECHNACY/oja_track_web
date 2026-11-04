"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  Store,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
  X,
  Settings,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { getPendingSalesCount } from "@/lib/offline/sync-manager";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import Badge from "@/app/components/ui/Badge";
import BrandLogo from "@/app/components/ui/BrandLogo";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, safeUser, logout } = useAuth();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check offline pending queue count periodically
    const checkQueue = async () => {
      const count = await getPendingSalesCount();
      setPendingCount(count);
    };

    checkQueue();
    const interval = setInterval(checkQueue, 5000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const isStaffOnly = user?.role === "SHOP_STAFF" || user?.membership_role === "staff";

  const navItems = [
    {
      label: "Oga Dashboard",
      href: "/shop/dashboard",
      icon: LayoutDashboard,
      hideForStaff: true,
    },
    {
      label: "Point of Sale",
      href: "/shop/sales",
      icon: ShoppingBag,
      hideForStaff: false,
    },
    {
      label: "Inventory Watch",
      href: "/shop/inventory",
      icon: Boxes,
      hideForStaff: true,
    },
    {
      label: "Staff Roster",
      href: "/shop/staff",
      icon: Users,
      hideForStaff: true,
    },
    {
      label: "Offline Queue",
      href: "/shop/offline-queue",
      icon: isOnline ? Wifi : WifiOff,
      badge: pendingCount > 0 ? `${pendingCount}` : undefined,
      hideForStaff: false,
    },
    {
      label: "Subscriptions",
      href: "/shop/subscription",
      icon: CreditCard,
      hideForStaff: true,
    },
    {
      label: "Book Field Agent",
      href: "/shop/book-agent",
      icon: UserCheck,
      hideForStaff: true,
    },
    {
      label: "Shop Settings",
      href: "/shop/settings",
      icon: Settings,
      hideForStaff: true,
    },
  ];

  const visibleNav = navItems.filter((item) => !(isStaffOnly && item.hideForStaff));

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-background p-5 justify-between shrink-0">
        <div>
          {/* Shop Brand Header */}
          <div className="pb-6 border-b border-border">
            <BrandLogo size="md" eyebrow="Shop Operations" href="/shop/dashboard" />
          </div>

          {/* Current Shop & Branch Pill */}
          <div className="mt-4 p-3 rounded-xl bg-surface-alt border border-border">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground truncate">
              <Store className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span className="truncate">Active Shop Branch</span>
            </div>
            <div className="text-[11px] text-secondary-text mt-1 flex items-center justify-between">
              <span>Main Branch</span>
              <span className="w-2 h-2 rounded-full bg-success" title="Branch Online" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {visibleNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-brand-primary text-foundation-base shadow-sm font-bold"
                      : "text-secondary-text hover:text-foreground hover:bg-surface-alt"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-warning text-black animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User & Logout */}
        <div className="pt-6 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-brand-primary/20 text-brand-primary font-bold flex items-center justify-center text-xs shrink-0">
                {safeUser?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground truncate">
                  {safeUser ? `${safeUser.firstName} ${safeUser.lastName}` : user?.email || "Shop User"}
                </div>
                <div className="text-[10px] text-secondary-text capitalize">
                  {user?.membership_role || "Retail Staff"}
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-secondary-text hover:bg-surface-alt"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-bold text-foreground truncate">
              {visibleNav.find((n) => n.href === pathname)?.label || "Shop Operations"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Sync & Connectivity Status Indicator */}
            <Link
              href="/shop/offline-queue"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                !isOnline
                  ? "bg-warning/20 text-warning border border-warning/30"
                  : pendingCount > 0
                  ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                  : "bg-success/10 text-success border border-success/20"
              }`}
            >
              {!isOnline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-warning shrink-0" />
                  <span className="hidden sm:inline">Offline Mode</span>
                  {pendingCount > 0 && <span className="underline">({pendingCount} queued)</span>}
                </>
              ) : pendingCount > 0 ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Syncing ({pendingCount})</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-success shrink-0" />
                  <span className="hidden sm:inline">Connected</span>
                </>
              )}
            </Link>

            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border p-4 space-y-1 animate-in slide-in-from-top-2">
            <div className="pb-3 mb-2 border-b border-border">
              <BrandLogo size="sm" eyebrow="Shop Operations" href="/shop/dashboard" onClick={() => setMobileMenuOpen(false)} />
            </div>
            {visibleNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                    active
                      ? "bg-brand-primary text-foundation-base font-bold"
                      : "text-secondary-text hover:bg-surface-alt"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-warning text-black">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full mt-3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-danger hover:bg-danger/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
