"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { forgotPasswordApi } from "@/lib/api/auth";
import { Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your account email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPasswordApi(email.trim());
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email.trim())}`);
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Failed to process password reset request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-4">
        <Link href="/login" className="flex items-center gap-2 text-sm text-secondary-text hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
        <Link href="/" className="font-extrabold text-lg text-foreground">
          Oja<span className="text-brand-primary">Track</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
              <p className="text-xs text-secondary-text">Recover access to your OjaTrack account</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Password reset instructions dispatched. Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1.5">
                Registered Email Address
              </label>
              <Input
                type="email"
                placeholder="name@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Reset Code..." : "Send Reset Code"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-secondary-text">
            Remembered your credentials?{" "}
            <Link href="/login" className="text-brand-primary font-semibold hover:underline">
              Sign in now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto py-4 text-center text-xs text-secondary-text">
        Password resets are verified with a one-time cryptographic code.
      </div>
    </div>
  );
}
