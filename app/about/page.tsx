import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import {
  AboutCta,
  AboutHero,
  AboutStats,
  AboutTeam,
  AboutValues,
  CrisisBlueprint,
} from "../components/marketing/AboutSections";

export const metadata = {
  title: "About Us — OjaTrack",
  description:
    "Stewardship and clarity for Africa's most resilient markets. The mission, values, and team behind OjaTrack.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <CrisisBlueprint />
        <AboutStats />
        <AboutValues />
        <AboutTeam />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
