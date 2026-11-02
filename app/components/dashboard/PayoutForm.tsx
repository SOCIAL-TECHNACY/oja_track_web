"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import {
  formatNGN,
  MIN_PAYOUT_NGN,
  parsePayoutAmount,
} from "@/lib/agent-dashboard";
import { requestPayoutApi } from "@/lib/api/agent";
import { useAuth } from "@/lib/auth/auth-context";
import { CheckCircle2, AlertCircle } from "lucide-react";

const labelClass =
  "mb-1.5 block text-sm text-light-secondary dark:text-ink-secondary";

export default function PayoutForm({ balanceNGN }: { balanceNGN: number }) {
  const { safeUser } = useAuth();
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const parsedAmount = parsePayoutAmount(amount);
  const accountError =
    touched && !/^\d{10}$/.test(accountNumber.trim())
      ? "Enter a valid 10-digit account number."
      : null;
  const amountError = (() => {
    if (!touched || amount.trim() === "") return null;
    if (Number.isNaN(parsedAmount)) return "Enter a valid amount.";
    if (parsedAmount < MIN_PAYOUT_NGN)
      return `Minimum payout is ${formatNGN(MIN_PAYOUT_NGN)}.`;
    if (parsedAmount > balanceNGN)
      return `Amount exceeds your ${formatNGN(balanceNGN)} available balance.`;
    return null;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    if (accountError || amountError || Number.isNaN(parsedAmount) || parsedAmount <= 0) return;

    const verifiedName = safeUser
      ? `${safeUser.firstName} ${safeUser.lastName}`.trim()
      : "Operations Agent";

    setIsSubmitting(true);
    try {
      const res = await requestPayoutApi({
        amount: parsedAmount,
        payout_method: "bank_transfer",
        payout_details: {
          bank: bank.trim(),
          account_number: accountNumber.trim(),
          verified_name: verifiedName,
        },
      });

      if (res && res.success) {
        setSuccessMsg(`Withdrawal request of ${formatNGN(parsedAmount)} submitted to clearance queue.`);
        setAmount("");
        setTouched(false);
      } else {
        throw new Error(res?.message || "Failed to submit payout request to central clearance.");
      }
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
          "Could not transmit withdrawal request to clearance queue. Please check connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="request-payout"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="request-payout"
        className="text-base font-bold text-light-primary sm:text-lg dark:text-ink-primary"
      >
        Request Payout
      </h2>
      <p className="mt-1 text-xs text-light-secondary dark:text-ink-secondary">
        Direct settlement to your verified Nigerian commercial bank account.
      </p>

      {successMsg && (
        <div className="mt-4 p-3 rounded-xl bg-success/10 border border-success/20 text-success text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label htmlFor="payout-bank" className={labelClass}>
            Destination Bank
          </label>
          <Input
            id="payout-bank"
            placeholder="e.g. GTBank, Access Bank, Zenith Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="payout-account" className={labelClass}>
            Account Number (NUBAN)
          </label>
          <Input
            id="payout-account"
            placeholder="10-digit NUBAN account number"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            error={accountError !== null}
            onChange={(e) => setAccountNumber(e.target.value)}
            onBlur={() => setTouched(true)}
            required
          />
          {accountError && (
            <p className="mt-1.5 text-xs text-danger">{accountError}</p>
          )}
        </div>

        <div>
          <label htmlFor="payout-amount" className={labelClass}>
            Withdrawal Amount
          </label>
          <div className="relative">
            <Input
              id="payout-amount"
              placeholder={`Min ${formatNGN(MIN_PAYOUT_NGN)}`}
              inputMode="decimal"
              value={amount}
              error={amountError !== null}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setTouched(true)}
              className="pr-16"
              required
            />
            {balanceNGN > 0 && (
              <button
                type="button"
                onClick={() => {
                  setAmount(String(balanceNGN));
                  setTouched(true);
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded px-1.5 py-0.5 text-xs font-bold text-brand-primary hover:underline"
              >
                Max
              </button>
            )}
          </div>
          {amountError && (
            <p className="mt-1.5 text-xs text-danger">{amountError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!accountError || !!amountError || !bank.trim() || balanceNGN < MIN_PAYOUT_NGN}
          className="inline-flex h-[50px] w-full items-center justify-center rounded-xl bg-brand-primary px-5 text-sm font-bold text-black transition-all hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          {isSubmitting
            ? "Submitting Request..."
            : bank.trim()
              ? `Withdraw to ${bank.trim()}`
              : "Submit Withdrawal Request"}
        </button>
      </form>
    </section>
  );
}
