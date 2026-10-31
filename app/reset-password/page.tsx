"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { resetPasswordApi } from "@/lib/api/auth";
import { Input, PinInput } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit reset code.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain uppercase, lowercase, and a number (min 8 chars).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetPasswordApi(email.trim(), otp.trim(), password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?reset=true");
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. Please check the code and try again.");
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
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Set New Password</h1>
              <p className="text-xs text-secondary-text">Enter the reset code and create a new password</p>
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
              <span>Password updated successfully! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-2">
                6-Digit Reset Code
              </label>
              <div className="flex justify-center">
                <PinInput length={6} value={otp} onChange={setOtp} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Uppercase, lowercase, number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto py-4 text-center text-xs text-secondary-text">
        All existing active sessions will be terminated upon password reset.
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center p-4">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
