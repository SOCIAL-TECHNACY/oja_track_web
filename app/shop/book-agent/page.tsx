"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

export default function ShopBookAgentPage() {
  const [serviceType, setServiceType] = useState("audit");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    {
      id: "setup",
      title: "Store Setup & Product Upload",
      description: "An agent visits to catalogue and barcode up to 500 items into your OjaTrack store.",
    },
    {
      id: "audit",
      title: "Weekly Physical Inventory Audit",
      description: "Independent audit reconciling counter POS recorded sales with actual physical warehouse stock.",
    },
    {
      id: "training",
      title: "Cashier & POS Staff Training",
      description: "Hands-on instruction for shop assistants on rapid barcode checkout and offline recording.",
    },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Book a Verified Field Agent
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Request an OjaTrack field agent to visit your market shop for setup, physical stock reconciliation, or staff training.
        </p>
      </div>

      {isBooked ? (
        <div className="bg-background border border-border rounded-3xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Agent Visit Requested!</h2>
          <p className="text-xs sm:text-sm text-secondary-text mt-2 max-w-md mx-auto">
            Your assigned market agent has been notified and will contact your store phone to confirm your on-site appointment.
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={() => setIsBooked(false)}>
              Book Another Visit
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-secondary-text uppercase mb-3">
                Select Service Required
              </label>
              <div className="space-y-3">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setServiceType(s.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      serviceType === s.id
                        ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                        : "border-border bg-surface-alt hover:border-brand-primary/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        serviceType === s.id
                          ? "border-brand-primary bg-brand-primary"
                          : "border-secondary-text"
                      }`}
                    >
                      {serviceType === s.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{s.title}</div>
                      <div className="text-xs text-secondary-text mt-0.5">{s.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary-text uppercase mb-1">
                  Preferred Visit Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary-text uppercase mb-1">
                  Shop Location / Market Line
                </label>
                <Input
                  placeholder="e.g. Alaba Int'l Market, Line 4, Shop 22"
                  defaultValue="Main Branch Store"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-text uppercase mb-1">
                Special Instructions / Inventory Focus (Optional)
              </label>
              <Input
                placeholder="e.g. Need help counting sugar & flour stocks before month end"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full font-bold">
                Confirm Agent Appointment
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
