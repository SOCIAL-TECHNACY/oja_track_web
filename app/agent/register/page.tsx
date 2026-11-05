"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Users } from "lucide-react";
import { registerAgentApi } from "@/lib/api/auth";
import { Input, PasswordInput } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function AgentRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "Lagos",
    state: "Lagos",
    referralCode: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerAgentApi({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        state: formData.state.trim() || undefined,
        country: "Nigeria",
        referral_code: formData.referralCode.trim() || undefined,
      });

      if (res.success && res.data?.user?.id) {
        router.push(
          `/verify-otp?id=${res.data.user.id}&email=${encodeURIComponent(
            formData.email.trim()
          )}`
        );
      } else if (res.user?.id) {
        router.push(
          `/verify-otp?id=${res.user.id}&email=${encodeURIComponent(
            formData.email.trim()
          )}`
        );
      } else {
        router.push(
          `/verify-otp?email=${encodeURIComponent(formData.email.trim())}`
        );
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/agent/login" className="flex items-center gap-2 text-sm text-secondary-text hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Agent Login</span>
        </Link>
        <BrandLogo size="sm" />
      </div>

      {/* Main Registration Form */}
      <div className="max-w-xl w-full mx-auto my-auto py-8">
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Join the Agent Network
              </h1>
              <p className="text-xs sm:text-sm text-secondary-text">
                Earn real upfront and recurring income helping Nigerian retailers digitize.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  First Name
                </label>
                <Input
                  name="firstName"
                  placeholder="Tunde"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  placeholder="Balogun"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="tunde@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="08099887766"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  Password
                </label>
                <PasswordInput
                  name="password"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  Confirm Password
                </label>
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                Residential / Operating Address
              </label>
              <Input
                name="address"
                placeholder="Street address / Market coverage area"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  City
                </label>
                <Input
                  name="city"
                  placeholder="Lagos"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  State
                </label>
                <Input
                  name="state"
                  placeholder="Lagos State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                Referral Code (Optional)
              </label>
              <Input
                name="referralCode"
                placeholder="Referred by another agent? (e.g. AGT-REF123)"
                value={formData.referralCode}
                onChange={handleChange}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting application..."
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Create Agent Account</span>
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-secondary-text">
            Already an agent?{" "}
            <Link href="/agent/login" className="text-brand-primary font-semibold hover:underline">
              Log in to Agent Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
