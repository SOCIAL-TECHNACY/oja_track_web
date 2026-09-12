import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import {
  ShopCta,
  ShopFeatures,
  ShopHero,
  ShopPain,
  ShopPricingTeaser,
  ShopSteps,
  ShopTestimonials,
} from "../components/marketing/ShopOwnerSections";

export const metadata = {
  title: "For Shop Owners — OjaTrack",
  description:
    "Take control of your shop and stop losing money. POS, inventory alerts, staff control, offline mode, and real profit reports.",
};

export default function ShopOwnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <ShopHero />
        <ShopPain />
        <ShopFeatures />
        <ShopPricingTeaser />
        <ShopTestimonials />
        <ShopSteps />
        <ShopCta />
      </main>
      <Footer />
    </>
  );
}
