import WithdrawalClearanceView from "../../../components/dashboard/WithdrawalClearanceView";

export const metadata = {
  title: "Withdrawal Clearance Terminal — OjaTrack Admin",
  description:
    "Outstanding agent disbursals, balance compliance, and batch clearance.",
};

export default function AdminWithdrawalsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <WithdrawalClearanceView />
    </main>
  );
}
