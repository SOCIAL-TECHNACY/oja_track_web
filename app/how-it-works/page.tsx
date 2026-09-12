import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import {
  FeatureSplits,
  HowCta,
  HowHero,
  HowTestimonials,
  SetupStrip,
} from "../components/marketing/HowItWorksSections";

export const metadata = {
  title: "How It Works — OjaTrack",
  description:
    "From setup to full business control in 5 minutes. Inventory, sales, profits, staff, and reports.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        <HowHero />
        <SetupStrip />
        <FeatureSplits />
        <HowTestimonials />
        <HowCta />
      </main>
      <Footer />
    </>
  );
}
