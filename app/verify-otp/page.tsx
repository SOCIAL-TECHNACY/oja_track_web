"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Mail, RotateCw } from "lucide-react";
import { verifyOtpApi, resendOtpApi } from "@/lib/api/auth";
import { PinInput, Input } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userId, setUserId] = useState(searchParams.get("id") || "");
  const [email] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!userId.trim()) {
      setError("User verification ID is missing. Please restart registration.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyOtpApi({
        id: userId.trim(),
        otp: otp.trim(),
      });

      if (res.success) {
        setSuccessMsg("Account verified successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.message || "Invalid or expired verification code. 5 failed attempts will lock verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !userId.trim()) return;
    setError(null);
    try {
      const res = await resendOtpApi(userId.trim());
      if (res.success) {
        setSuccessMsg("A new verification code has been dispatched to your email.");
        setResendCooldown(60);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to resend verification code. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-4">
        <Link href="/login" className="flex items-center gap-2 text-sm text-secondary-text hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
        <BrandLogo size="sm" />
      </div>

      {/* Main OTP Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-foreground">Verify Your Email</h1>
          <p className="mt-2 text-xs sm:text-sm text-secondary-text">
            Enter the 6-digit confirmation code sent to{" "}
            <span className="font-semibold text-foreground">{email || "your email"}</span>.
          </p>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {!userId && (
              <div className="text-left">
                <label className="block text-xs font-semibold text-secondary-text uppercase mb-1">
                  User ID / Registration Reference
                </label>
                <Input
                  placeholder="Paste your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-3">
                6-Digit Verification Code
              </label>
              <div className="flex justify-center">
                <PinInput length={6} value={otp} onChange={setOtp} />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold"
              disabled={isSubmitting || otp.length < 6}
            >
              {isSubmitting ? "Verifying..." : "Confirm & Activate Account"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-xs text-secondary-text">
            <span>Didn&apos;t receive the code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className={`font-semibold flex items-center gap-1 ${
                resendCooldown > 0
                  ? "text-secondary-text cursor-not-allowed"
                  : "text-brand-primary hover:underline"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto py-4 text-center text-xs text-secondary-text">
        In local development, OTPs are printed directly to the backend API console.
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center p-4">Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
