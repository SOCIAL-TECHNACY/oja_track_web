"use client";

import { useState } from "react";
import { Check, CreditCard, Sparkles, ShieldCheck } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";

export default function ShopSubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [upgraded, setUpgraded] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Trader",
      description: "Essential inventory and sales recording for single-counter shops.",
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      features: [
        "1 Branch & Counter",
        "Up to 2 Store Assistants",
        "Full Offline POS & Local Sync",
        "Daily Profit Tracking",
        "Basic Stock Alert Notifications",
      ],
      isCurrent: true,
    },
    {
      id: "growth",
      name: "Growth Merchant",
      description: "For scaling retailers needing multiple counter terminals and assigned field agents.",
      monthlyPrice: 12000,
      yearlyPrice: 120000,
      features: [
        "Up to 3 Branches",
        "Unlimited Store Cashiers",
        "Assigned Dedicated Field Agent",
        "Weekly Physical Stock Audit Support",
        "Granular Cashier Permissions",
        "Advanced Profit Margin Analytics",
      ],
      isPopular: true,
      isCurrent: false,
    },
    {
      id: "enterprise",
      name: "Super Market / Wholesale",
      description: "Complete retail operations suite for multi-branch wholesale distributors.",
      monthlyPrice: 30000,
      yearlyPrice: 300000,
      features: [
        "Unlimited Branches & Warehouses",
        "Multi-branch Stock Transfers",
        "Priority 24/7 Agent Dispatch",
        "Custom Barcode Scanning & POS",
        "Direct Bank Transfer Reconciliations",
      ],
      isCurrent: false,
    },
  ];

  const formatNGN = (num: number) =>
    `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Subscription & Plans
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Manage your store plan tier, renewal schedules, and agent verification benefits.
          </p>
        </div>

        {/* Monthly vs Yearly Toggle */}
        <div className="flex items-center gap-1 p-1 bg-background border border-border rounded-xl text-xs font-bold">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              billingCycle === "monthly" ? "bg-brand-primary text-black" : "text-secondary-text"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              billingCycle === "yearly" ? "bg-brand-primary text-black" : "text-secondary-text"
            }`}
          >
            Yearly (Save 17%)
          </button>
        </div>
      </div>

      {/* Current Subscription Status Card */}
      <div className="p-6 rounded-3xl bg-background border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Active Store Tier
            </span>
            <Badge status="success">Active</Badge>
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-1">Starter Trader Plan</h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Your billing cycle renews in <span className="font-bold text-foreground">18 days</span> (24th November).
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-secondary-text">Active Rate</div>
          <div className="text-xl font-extrabold text-foreground">₦5,000 / month</div>
        </div>
      </div>

      {upgraded && (
        <div className="p-4 rounded-2xl bg-success/10 border border-success/20 text-success text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Plan change request initiated. Your dedicated agent will confirm your upgrade invoice.</span>
        </div>
      )}

      {/* Plans Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const price = billingCycle === "monthly" ? p.monthlyPrice : p.yearlyPrice;
          return (
            <div
              key={p.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                p.isPopular
                  ? "bg-background border-brand-primary shadow-lg ring-1 ring-brand-primary"
                  : "bg-background border-border shadow-sm"
              }`}
            >
              <div>
                {p.isPopular && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>Recommended for Nigerian Retail</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-6 mb-6">
                  <span className="text-3xl font-extrabold text-foreground">
                    {formatNGN(price)}
                  </span>
                  <span className="text-xs text-secondary-text">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-secondary-text border-t border-border pt-4">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border">
                {p.isCurrent ? (
                  <Button variant="secondary" className="w-full font-bold" disabled>
                    Current Active Plan
                  </Button>
                ) : (
                  <Button
                    variant={p.isPopular ? "primary" : "secondary"}
                    onClick={() => setUpgraded(p.id)}
                    className="w-full font-bold"
                  >
                    Upgrade to {p.name}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
