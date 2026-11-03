"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function AdminLoginPage() {
  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!access.trim() || !password.trim()) {
      setError("Please enter your administrator email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(access.trim(), password);
      if (res.success) {
        if (res.role === "SUPER_ADMIN" || res.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          setError("Access denied. This account does not possess platform administrative privileges.");
        }
      }
    } catch (err: any) {
      setError(err?.message || "Invalid administrator credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-4">
        <Link href="/login" className="flex items-center gap-2 text-sm text-secondary-text hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span>Gateway choice</span>
        </Link>
        <BrandLogo size="sm" />
      </div>

      {/* Main Admin Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Platform Admin</h1>
              <p className="text-xs text-secondary-text">Authorized executive personnel only</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1.5">
                Admin Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@ojatrack.com"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-secondary-text uppercase">
                  Master Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-primary hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying Credentials..." : "Authenticate as Admin"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-secondary-text">
            All administrative sessions are logged and audited with IP tracking.
          </div>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto py-4 text-center text-xs text-secondary-text">
        &copy; {new Date().getFullYear()} OjaTrack Platform Security
      </div>
    </div>
  );
}
