import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import {
  ContactGrid,
  ContactHero,
  QuickAnswers,
  WhatsAppBanner,
} from "../components/marketing/ContactSections";

export const metadata = {
  title: "Contact Us — OjaTrack",
  description:
    "Get in touch about offline ledger syncing, pricing, or the Agent program. Direct channels and Lagos office hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactGrid />
        <QuickAnswers />
        <WhatsAppBanner />
      </main>
      <Footer />
    </>
  );
}
