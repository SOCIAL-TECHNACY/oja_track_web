/*
 * Front-page navigation contract.
 * `href: null` = target page doesn't exist yet → rendered non-navigating
 * (no 404s). Linking a page later = flip null to its path. No component edits.
 */
export type NavLink = { label: string; href: string | null };

export const mainNav: NavLink[] = [
  { label: "Product", href: null },
  { label: "For Shop Owners", href: "/for-shop-owners" },
  { label: "For Agents", href: "/agents" },
  { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
];

export const authNav: NavLink[] = [
  { label: "Login", href: null },
  { label: "Get Started", href: null },
];

export const footerCols: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Platform",
    links: [
      { label: "Inventory Watch", href: null },
      { label: "Point of Sale", href: null },
      { label: "Agent Network", href: null },
  { label: "Pricing", href: "/pricing" },
      { label: "Admin Login", href: null },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Become An Agent", href: null },
      { label: "FAQ", href: "/faq" },
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
