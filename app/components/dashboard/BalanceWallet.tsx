import { formatNGN, MIN_PAYOUT_NGN } from "@/lib/agent-dashboard";

export default function BalanceWallet({ balanceNGN }: { balanceNGN: number }) {
  return (
    <section
      aria-labelledby="balance-wallet"
      className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] sm:p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
    >
      <h2
        id="balance-wallet"
        className="text-sm font-normal text-light-secondary dark:text-ink-secondary"
      >
        Your Balance Wallet
      </h2>
      <p className="mt-2 text-4xl font-bold text-brand-primary">
        {formatNGN(balanceNGN)}
      </p>
      <div className="mt-4 border-t border-border pt-4 dark:border-[#1e3a2b]">
        <p className="text-sm leading-6 text-light-secondary dark:text-ink-secondary">
          Minimum payout is {formatNGN(MIN_PAYOUT_NGN)}. Settlements processed
          directly via Nigerian Instant Payment gateway.
        </p>
      </div>
    </section>
  );
}
