"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import {
  formatNGN,
  MIN_PAYOUT_NGN,
  mockPayoutDestination,
  parsePayoutAmount,
} from "@/lib/agent-dashboard";

const labelClass =
  "mb-1.5 block text-sm text-light-secondary dark:text-ink-secondary";

/*
 * Request Payout form. Fully interactive validation (min payout,
 * balance cap, account number) but the submit action is an inert
 * placeholder until the NIP payout call is wired.
 */
export default function PayoutForm({ balanceNGN }: { balanceNGN: number }) {
  const [bank, setBank] = useState(mockPayoutDestination.bank);
  const [accountNumber, setAccountNumber] = useState(
    mockPayoutDestination.accountNumber,
  );
  const [amount, setAmount] = useState("₦50,000");
  const [touched, setTouched] = useState(false);

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
      return `Amount exceeds your ${formatNGN(balanceNGN)} balance.`;
    return null;
  })();

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

      <form
        className="mt-4 space-y-4"
        noValidate
        onSubmit={(e) => {
          // Placeholder: wire the NIP payout call here later.
          e.preventDefault();
          setTouched(true);
        }}
      >
        <div>
          <label htmlFor="payout-bank" className={labelClass}>
            Destination Bank
          </label>
          <div className="relative">
            <select
              id="payout-bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="h-[41px] w-full cursor-pointer appearance-none rounded-lg border border-border bg-white pr-9 pl-3 text-sm text-light-primary outline-none transition-colors focus:border-brand-primary dark:bg-foundation-secondary dark:text-ink-primary"
            >
              <option value={mockPayoutDestination.bank}>
                {mockPayoutDestination.bank}
              </option>
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-light-muted"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="payout-account" className={labelClass}>
            Account Number
          </label>
          <Input
            id="payout-account"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            error={accountError !== null}
            aria-invalid={accountError !== null}
            aria-describedby={accountError ? "payout-account-error" : undefined}
            onChange={(e) => setAccountNumber(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {accountError && (
            <p id="payout-account-error" role="alert" className="mt-1.5 text-xs text-danger">
              {accountError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="payout-name" className={labelClass}>
            Verified Name
          </label>
          <Input
            id="payout-name"
            readOnly
            value={mockPayoutDestination.verifiedName}
            aria-readonly="true"
            className="text-light-secondary dark:text-ink-secondary"
          />
        </div>

        <div>
          <label htmlFor="payout-amount" className={labelClass}>
            Withdrawal Amount
          </label>
          <div className="relative">
            <Input
              id="payout-amount"
              inputMode="decimal"
              value={amount}
              error={amountError !== null}
              aria-invalid={amountError !== null}
              aria-describedby={amountError ? "payout-amount-error" : undefined}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setTouched(true)}
              className="pr-16"
            />
            <button
              type="button"
              onClick={() => {
                setAmount(formatNGN(balanceNGN));
                setTouched(true);
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded px-1 py-0.5 text-sm font-medium text-light-secondary transition-colors hover:text-light-primary dark:text-ink-secondary dark:hover:text-ink-primary"
            >
              Max
            </button>
          </div>
          {amountError && (
            <p id="payout-amount-error" role="alert" className="mt-1.5 text-xs text-danger">
              {amountError}
            </p>
          )}
        </div>

        <button
          type="submit"
          aria-disabled="true"
          title="Coming soon"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-lg bg-brand-primary px-5 text-[15px] font-semibold text-white transition-colors hover:brightness-95"
        >
          Withdraw to {mockPayoutDestination.shortName}
        </button>
      </form>
    </section>
  );
}
