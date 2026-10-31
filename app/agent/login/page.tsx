"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

function AgentLoginForm() {
  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!access.trim() || !password.trim()) {
      setError("Please enter your email or phone number and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(access.trim(), password);
      if (res.success) {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push(res.destination);
        }
      }
    } catch (err: any) {
      setError(err?.message || "Invalid agent credentials. Please check and try again.");
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
        <Link href="/" className="font-extrabold text-lg text-foreground">
          Oja<span className="text-brand-primary">Track</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agent Login</h1>
              <p className="text-xs text-secondary-text">Sign in to your field agent portal</p>
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
                Email or Phone Number
              </label>
              <Input
                placeholder="agent@ojatrack.ng or 08012345678"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-secondary-text uppercase">
                  Password
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
                {isSubmitting ? "Authenticating..." : "Sign In to Agent Portal"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-secondary-text">
            Not a registered OjaTrack agent yet?{" "}
            <Link href="/agent/register" className="text-brand-primary font-semibold hover:underline">
              Apply to become an agent
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto py-4 text-center text-xs text-secondary-text">
        Track shop on-boarding, renewals, and weekly commission payouts.
      </div>
    </div>
  );
}

export default function AgentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center p-4">Loading...</div>}>
      <AgentLoginForm />
    </Suspense>
  );
}
