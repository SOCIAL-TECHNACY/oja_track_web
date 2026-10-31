"use client";

import { useState } from "react";
import { CheckCircle2, Save, Store } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

export default function ShopSettingsPage() {
  const [shopName, setShopName] = useState("Okonkwo Electronics & Gadgets");
  const [phone, setPhone] = useState("+2348012345678");
  const [address, setAddress] = useState("Shop 14, Line 3, Alaba International Market");
  const [city, setCity] = useState("Ojo, Lagos");
  const [receiptFooter, setReceiptFooter] = useState("Thank you for your patronage! Goods sold in good condition cannot be returned.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Shop Settings & Receipts
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Configure store profile information, physical branch locations, and counter POS receipt headers.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-success/10 border border-success/20 text-success text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Shop settings updated successfully.</span>
        </div>
      )}

      <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
              Store / Business Name
            </label>
            <Input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                Store Phone
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                City / Market Location
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
              Store Physical Address
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="pt-3 border-t border-border">
            <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
              Counter Receipt Footer Disclaimer
            </label>
            <textarea
              rows={3}
              value={receiptFooter}
              onChange={(e) => setReceiptFooter(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-surface-alt text-xs font-medium outline-none focus:border-brand-primary"
            />
            <p className="text-[11px] text-secondary-text mt-1">
              This text is automatically printed at the bottom of customer sale receipts.
            </p>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" className="font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
