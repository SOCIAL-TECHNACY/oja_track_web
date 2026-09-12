import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import PricingSections from "../components/marketing/PricingSections";

export const metadata = {
  title: "Pricing — OjaTrack",
  description:
    "Simple, transparent pricing. Weekly, monthly, quarterly, half-year, and yearly plans with no hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingSections />
      </main>
      <Footer />
    </>
  );
}
