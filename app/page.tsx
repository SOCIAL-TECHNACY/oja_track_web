import Footer from "./components/marketing/Footer";
import Navbar from "./components/marketing/Navbar";
import Hero from "./components/marketing/Hero";
import { Features, PainPoints } from "./components/marketing/ValueSections";
import { ProductSections } from "./components/marketing/ProductSections";
import {
  FinalCta,
  HowItWorks,
  Pricing,
  StatsBand,
  Testimonial,
} from "./components/marketing/ConversionSections";

export const metadata = {
  title: "OjaTrack — The operating system for Nigerian retail",
  description:
    "Eliminate inventory leaks, reconcile offline sales in real time, and scale profit with verified field agents.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <ProductSections />
        <HowItWorks />
        <StatsBand />
        <Testimonial />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
