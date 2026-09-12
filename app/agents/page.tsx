import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import {
  AgentCta,
  AgentEarnings,
  AgentFit,
  AgentHero,
  AgentMission,
  AgentPain,
  AgentRole,
  AgentSupport,
} from "../components/marketing/AgentSections";

export const metadata = {
  title: "For Agents — Earn with OjaTrack",
  description:
    "Become an OjaTrack Certified Field Agent. Onboard shops, earn 40% upfront and 20% recurring commissions.",
};

export default function AgentsPage() {
  return (
    <>
      <Navbar />
      <main>
        <AgentHero />
        <AgentMission />
        <AgentPain />
        <AgentRole />
        <AgentEarnings />
        <AgentSupport />
        <AgentFit />
        <AgentCta />
      </main>
      <Footer />
    </>
  );
}
