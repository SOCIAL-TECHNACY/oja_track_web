import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import { FaqExplorer, FaqSupportCard } from "../components/marketing/FaqSections";

export const metadata = {
  title: "FAQ — OjaTrack",
  description:
    "Answers about OjaTrack pricing, offline mode, the agent program, technical requirements, and accounts.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <FaqExplorer />
        <FaqSupportCard />
      </main>
      <Footer />
    </>
  );
}
