import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import { LegalHero, PolicyLayout } from "../components/marketing/LegalSections";
import type { PolicySection } from "../components/marketing/LegalSections";

export const metadata = {
  title: "Terms of Service — OjaTrack",
  description:
    "The terms governing OjaTrack accounts, subscriptions, the agent program, and platform use.",
};

const sections: PolicySection[] = [
  {
    title: "Acceptance of Terms",
    paras: [
      "By registering an account with OjaTrack, you agree to comply with and be bound by these comprehensive Terms of Service. If you are registering on behalf of a retail business or shop, you confirm that you have the authority to act as the primary account owner (Oga).",
    ],
  },
  {
    title: "Account Registration",
    paras: [
      "You must provide accurate, active details during registration. You are strictly responsible for maintaining login confidentiality and security, especially when creating supplementary restricted credentials for shop boys, operators, or supervisors.",
    ],
  },
  {
    title: "Subscription Plans & Billing",
    paras: [
      "OjaTrack operates a transparent, tiered subscription fee cycle. Current pricing lists at: Weekly plan (₦3,000), Monthly plan (₦10,000), and Yearly plan (₦48,000).",
      "Subscription renewals are processed automatically unless cancelled or paused before your current cycle concludes. Vouchers purchased physically through accredited OjaTrack Field Agents are non-refundable.",
    ],
  },
  {
    title: "Agent Program Terms",
    paras: [
      "Field agents are independent contractors. Our commission payout structure is strictly 40% on first-time subscription setup, and a recurring 20% on future renewals.",
      "Agent withdrawal requests must meet our minimum payout trigger of ₦10,000. Verified commissions are paid out every Friday into registered Nigerian commercial bank accounts.",
    ],
  },
  {
    title: "Acceptable Use Policy",
    paras: [
      "You agree not to use the OjaTrack ledger to process illicit transactions, record sales of banned imports, or spoof financial records to evade regulatory compliance. Violation triggers immediate account suspension.",
    ],
  },
  {
    title: "Intellectual Property",
    paras: [
      "The layout, digital calculator, offline-sync protocols, logo, and product name OjaTrack are proprietary intellectual properties owned solely by Levelset Technologies Ltd.",
    ],
  },
  {
    title: "Limitation of Liability",
    paras: [
      "OjaTrack provides inventory assistance. While we secure back-up clusters rigorously, we are not liable for direct lost profits resulting from staff theft, physical hardware damage, or localized internet blockages.",
    ],
  },
  {
    title: "Service Interruption",
    paras: [
      "Temporary maintenance windows may occur. However, offline tracking ensures your storefront records continue running smoothly without disruption.",
    ],
  },
  {
    title: "Governing Law",
    paras: [
      "These terms are governed by, and interpreted strictly under, the laws of the Federal Republic of Nigeria.",
    ],
  },
  {
    title: "Dispute Resolution",
    paras: [
      "Any dispute arising directly from the ledger platform usage must first be referred to arbitration in Lagos, Nigeria, before seeking standard legal court remedies.",
    ],
  },
  {
    title: "Contact & Notices",
    paras: [
      "Send formal legal or billing dispute notices to legal@ojatrack.ng or hand-deliver directly to our Broad Street office, Lagos Island.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalHero title="Terms of Service" updated="Effective date: August 1, 2024" />
        <PolicyLayout sections={sections} />
      </main>
      <Footer />
    </>
  );
}
