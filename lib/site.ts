/*
 * Front-page navigation contract.
 * All destinations now link to active, fully implemented routes across
 * the four OjaTrack platform surfaces.
 */
export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "For Shop Owners", href: "/for-shop-owners" },
  { label: "For Agents", href: "/agents" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export const authNav: NavLink[] = [
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "/shop/register" },
];

export const footerCols: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Platform",
    links: [
      { label: "Point of Sale (POS)", href: "/shop/sales" },
      { label: "Inventory Watch", href: "/shop/inventory" },
      { label: "Agent Portal", href: "/dashboard/agent" },
      { label: "Pricing & Plans", href: "/pricing" },
      { label: "Admin Gateway", href: "/admin/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OjaTrack", href: "/about" },
      { label: "Contact & Support", href: "/contact" },
      { label: "Become An Agent", href: "/agent/register" },
      { label: "Frequently Asked Questions", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];
