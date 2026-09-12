import Footer from "../components/marketing/Footer";
import Navbar from "../components/marketing/Navbar";
import { LegalHero, PolicyLayout } from "../components/marketing/LegalSections";
import type { PolicySection } from "../components/marketing/LegalSections";

export const metadata = {
  title: "Privacy Policy — OjaTrack",
  description:
    "How OjaTrack collects, uses, stores, and protects retailer, store, and device data.",
};

const sections: PolicySection[] = [
  {
    title: "Information We Collect",
    paras: [
      "We collect various information to serve our retailers. This includes Personal Information like your full name, business name, phone number, email address, and physical business location in Nigeria.",
      "We collect Store Business Data such as inventory stock levels, unit costs, daily transaction volume, credit ledger records, and customer phone logs to enable the ledger calculator feature.",
      "We also capture Device Information, including your phone brand, OS version, and network carrier, to troubleshoot offline storage and sync processes.",
    ],
  },
  {
    title: "How We Use Your Information",
    paras: [
      "OjaTrack uses your database logs to calculate accurate daily store profits, alert you when specific inventory items are running low, send automatic WhatsApp payment reminders to credit customers, and secure backups against device loss.",
    ],
  },
  {
    title: "Data Storage & Security",
    paras: [
      "Our servers are encrypted using industry-standard TLS protocols. No one, including OjaTrack personnel, can inspect your raw product margins or specific customer debt balances unless requested specifically for support.",
    ],
  },
  {
    title: "Offline Data Handling",
    paras: [
      "To support Nigerian retail network conditions, transaction logs are written directly to your phone's SQLite sandbox. This local cache is protected from other applications and only transfers to secure clouds once you are online.",
    ],
  },
  {
    title: "Third-Party Services",
    paras: [
      "We partner with local payment gateways (such as Paystack and Monnify) to process subscription renewals securely. These providers operate under independent, strict PCI-DSS policies.",
    ],
  },
  {
    title: "Your Rights",
    paras: [
      "Under Nigerian Data Protection Regulations (NDPR), you retain absolute rights to request a complete inventory ledger export, restrict employee accounts from viewing profit analytics, or request total account termination.",
    ],
  },
  {
    title: "Data Retention",
    paras: [
      "If your store goes inactive or subscription expires, we retain your ledger record history for exactly 180 days so you don't lose progress. After this grace period, records are permanently deleted.",
    ],
  },
  {
    title: "Changes to Policy",
    paras: [
      "We may adjust this policy occasionally as we release new accounting updates. Any critical changes will be communicated via your registered WhatsApp phone number or in-app popups.",
    ],
  },
  {
    title: "Contact Us",
    paras: [
      "For privacy-related inquiries or data export assistance under NDPR guidelines, contact our designated privacy officer at privacy@ojatrack.ng.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <LegalHero title="Privacy Policy" updated="Last updated: August 2024" />
        <PolicyLayout sections={sections} />
      </main>
      <Footer />
    </>
  );
}
