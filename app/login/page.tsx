"use client";

import Link from "next/link";
import { ArrowRight, Shield, Store, Users } from "lucide-react";
import Button from "@/app/components/ui/Button";

export default function LoginGatewayPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center font-black text-black text-xl shadow-md group-hover:scale-105 transition-transform">
            O
          </div>
          <span className="font-extrabold text-xl tracking-tight text-foreground">
            Oja<span className="text-brand-primary">Track</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-secondary-text hover:text-foreground transition-colors"
        >
          &larr; Back to website
        </Link>
      </div>

      {/* Main Gateway Choices */}
      <div className="max-w-4xl w-full mx-auto my-auto py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            Unified Access Gateway
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Choose your gateway
          </h1>
          <p className="mt-3 text-secondary-text text-base">
            Select your destination to access your specialized OjaTrack operational environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Shop Operations Card */}
          <div className="relative rounded-3xl border border-border bg-background p-8 flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-2">
                For Retailers & Staff
              </div>
              <h2 className="text-2xl font-bold text-foreground">Shop Operations</h2>
              <p className="mt-3 text-sm text-secondary-text leading-relaxed">
                Log into your shop to record sales at counter POS, monitor real-time inventory, inspect daily profit, and reconcile offline transactions.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-secondary-text">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>Oga / Owner daily business control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>Fast Point of Sale (POS) cashier checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>Works seamlessly without internet</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
              <Link href="/shop/login" className="w-full">
                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>Enter Shop Operations</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="text-center text-xs text-secondary-text">
                New shop owner?{" "}
                <Link href="/shop/register" className="text-brand-primary font-semibold hover:underline">
                  Register your shop
                </Link>
              </div>
            </div>
          </div>

          {/* Agent Portal Card */}
          <div className="relative rounded-3xl border border-border bg-background p-8 flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">
                For Verified Field Agents
              </div>
              <h2 className="text-2xl font-bold text-foreground">Agent Portal</h2>
              <p className="mt-3 text-sm text-secondary-text leading-relaxed">
                Track your onboarded shops across local markets, monitor monthly subscription renewals, view earned commissions, and request wallet payouts.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-secondary-text">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Real-time commission ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Weekly direct bank withdrawals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>National agent performance leaderboard</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
              <Link href="/agent/login" className="w-full">
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>Enter Agent Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="text-center text-xs text-secondary-text">
                Want to become an agent?{" "}
                <Link href="/agent/register" className="text-brand-primary font-semibold hover:underline">
                  Apply to join
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Super Admin Link */}
        <div className="mt-12 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-secondary-text hover:text-foreground transition-colors p-2 rounded-lg hover:bg-surface-alt"
          >
            <Shield className="w-3.5 h-3.5 text-secondary-text" />
            <span>Platform Administration Gateway &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto py-4 text-center text-xs text-secondary-text">
        &copy; {new Date().getFullYear()} OjaTrack Technologies Ltd. All rights reserved.
      </div>
    </div>
  );
}
