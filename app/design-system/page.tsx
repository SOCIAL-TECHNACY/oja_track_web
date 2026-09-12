import {
  ActionCard,
  Badge,
  BottomNav,
  Button,
  DataCard,
  Input,
  MetricCard,
  PinInput,
  SearchInput,
  SegmentedTabs,
  SelectInput,
  SidebarItem,
  ThemeToggle,
} from "../components/ui";
import type { ButtonVariant } from "../components/ui";
import ExtendedDemos from "./extended-demos";

export const metadata = {
  title: "Design System — OjaTrack",
  description:
    "OjaTrack foundation guidelines: colors, typography, spacing, components.",
};

const swatches: Array<{
  group: string;
  items: Array<{ name: string; hex: string; desc: string }>;
}> = [
  {
    group: "Brand Accent",
    items: [
      {
        name: "Primary Green",
        hex: "#00C853",
        desc: "Primary actions, active states, positive metrics",
      },
      {
        name: "Soft Green",
        hex: "#B8F7D2",
        desc: "Muted alerts, positive tags, backdrops",
      },
      {
        name: "Gold Accent",
        hex: "#D6A84F",
        desc: "Earnings, premium tiers, highlighted states",
      },
    ],
  },
  {
    group: "Foundation Surface",
    items: [
      {
        name: "Dark Foundation",
        hex: "#07100C",
        desc: "Main canvas dark background tone",
      },
      {
        name: "Secondary Surface",
        hex: "#0D1712",
        desc: "Cards, navigation backdrops, content containers",
      },
      {
        name: "Elevated Surface",
        hex: "#132019",
        desc: "Dropdowns, popups, elevated panels",
      },
    ],
  },
  {
    group: "Typography Palette",
    items: [
      {
        name: "Text Primary",
        hex: "#F5F7F6",
        desc: "Primary titles, high emphasis, labels",
      },
      {
        name: "Text Secondary",
        hex: "#9AA7A0",
        desc: "Body text, medium emphasis details",
      },
      {
        name: "Text Muted",
        hex: "#6F7B74",
        desc: "Captions, borders, inactive indicators",
      },
    ],
  },
  {
    group: "Semantic Triggers",
    items: [
      {
        name: "Success Green",
        hex: "#00C853",
        desc: "Successful transaction, positive trend",
      },
      {
        name: "Warning Yellow",
        hex: "#F5B942",
        desc: "Pending steps, delayed shipment",
      },
      {
        name: "Danger Red",
        hex: "#EF4444",
        desc: "Cancelled order, system failure, expired",
      },
    ],
  },
];

const typeScale: Array<{
  token: string;
  spec: string;
  className: string;
  text: string;
}> = [
  {
    token: "Display",
    spec: "64px / Bold",
    className: "text-[64px] leading-[1.21] font-bold",
    text: "The quick brown fox",
  },
  {
    token: "H1",
    spec: "48px / Bold",
    className: "text-5xl font-bold",
    text: "The quick brown fox",
  },
  {
    token: "H2",
    spec: "32px / Semi-Bold",
    className: "text-[32px] leading-[1.21] font-semibold",
    text: "The quick brown fox",
  },
  {
    token: "H3",
    spec: "24px / Semi-Bold",
    className: "text-2xl font-semibold",
    text: "The quick brown fox",
  },
  {
    token: "H4",
    spec: "20px / Medium",
    className: "text-xl font-medium",
    text: "The quick brown fox",
  },
  {
    token: "Body Large",
    spec: "18px / Regular",
    className: "text-lg font-normal",
    text: "The quick brown fox",
  },
  {
    token: "Body",
    spec: "16px / Regular",
    className: "text-base font-normal",
    text: "The quick brown fox",
  },
  {
    token: "Body Small",
    spec: "14px / Regular",
    className: "text-sm font-normal text-light-secondary",
    text: "The quick brown fox",
  },
  {
    token: "Caption",
    spec: "12px / Medium",
    className: "text-xs font-medium text-light-muted",
    text: "The quick brown fox",
  },
  {
    token: "Overline",
    spec: "11px / Semi-Bold",
    className:
      "text-[11px] font-semibold tracking-[0.08em] text-brand-primary uppercase",
    text: "The quick brown fox",
  },
];

const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "danger",
  "tertiary",
  "success",
  "warning",
];

const themeTokens: Array<{ name: string; light: string; dark: string }> = [
  { name: "Background", light: "#FFFFFF", dark: "#07100C" },
  { name: "Surface", light: "#F8FAFB", dark: "#0D1712" },
  { name: "Surface Alt", light: "#F5F7F5", dark: "#132019" },
  { name: "Primary Text", light: "#1A1A1A", dark: "#F5F7F5" },
  { name: "Secondary Text", light: "#6B7280", dark: "#9CA3AF" },
  { name: "Border", light: "#E5E7EB", dark: "#1E3A2B" },
  { name: "Brand Green", light: "#00C853", dark: "#00C853" },
  { name: "Deep Emerald", light: "#0A3D2A", dark: "#0A3D2A" },
];

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 rounded-2xl border border-border bg-white p-6 dark:bg-foundation-secondary dark:border-[#1e3a2b]">
      <h2 className="text-2xl font-bold text-light-primary dark:text-ink-primary">
        {title}
      </h2>
      <p className="mt-1 text-sm text-light-secondary">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-primary uppercase">
        v1.0.0 Foundation
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-light-primary dark:text-ink-primary">
            OjaTrack Design System
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-light-secondary">
            Welcome to the OjaTrack foundation guidelines. Use this catalog of
            colors, typography, spacing, and components. Light is default; dark
            is optional via the header toggle.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Section
        title="Color Tokens"
        desc="Deliberate palette for data-dense tracking; pristine indicators on dark interfaces."
      >
        <div className="space-y-8">
          {swatches.map((g) => (
            <div key={g.group}>
              <h3 className="text-xs font-bold text-light-muted uppercase">
                {g.group}
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {g.items.map((s) => (
                  <div
                    key={s.name}
                    className="overflow-hidden rounded-xl border border-border"
                  >
                    <div
                      className="h-24"
                      style={{ backgroundColor: s.hex }}
                    />
                    <div className="p-3">
                      <p className="text-[13px] font-semibold text-light-primary dark:text-ink-primary">
                        {s.name}
                      </p>
                      <p className="text-xs font-medium text-brand-primary">
                        {s.hex}
                      </p>
                      <p className="mt-1 text-[11px] text-light-muted">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography Scale"
        desc="Rendered exclusively in Inter. Numbers and key metrics emphasized."
      >
        <div className="overflow-hidden rounded-xl border border-border">
          {typeScale.map((t, i) => (
            <div
              key={t.token}
              className={`grid gap-2 p-4 sm:grid-cols-[140px_140px_1fr] sm:items-center ${i % 2 === 0 ? "bg-surface" : "bg-white dark:bg-transparent"}`}
            >
              <p className="text-sm font-semibold text-light-primary dark:text-ink-primary">
                {t.token}
              </p>
              <p className="text-[13px] text-ink-secondary">{t.spec}</p>
              <p
                className={`${t.className} truncate text-light-primary dark:text-ink-primary`}
              >
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Spacing & Radius Scale"
        desc="Predictable increments for grid alignment across screen heights."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h3 className="text-sm font-bold text-light-muted">
              Spacing Steps
            </h3>
            <div className="mt-3 flex flex-wrap items-end gap-2">
              {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80].map((s) => (
                <div
                  key={s}
                  className="flex flex-col items-center gap-1 rounded-lg bg-surface p-2"
                >
                  <span
                    className="bg-brand-primary"
                    style={{ width: s, height: s }}
                  />
                  <span className="text-xs font-semibold">{s}px</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-light-muted">
              Border Radius
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "0px", radius: 0 },
                { label: "4px", radius: 4 },
                { label: "6px", radius: 6 },
                { label: "8px", radius: 8 },
                { label: "12px", radius: 12 },
                { label: "16px", radius: 16 },
                { label: "Pill", radius: 9999 },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex flex-col items-center gap-1 rounded-xl bg-surface p-2"
                >
                  <span
                    className="h-8 w-8 bg-foundation-elevated"
                    style={{ borderRadius: r.radius }}
                  />
                  <span className="text-[11px] font-semibold">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Buttons"
        desc="Complete variant matrix across key tracking actions."
      >
        <div className="space-y-3">
          {buttonVariants.map((v) => (
            <div
              key={v}
              className="flex flex-wrap items-center gap-3 border-b border-border pb-3 last:border-0"
            >
              <p className="w-24 text-[13px] font-semibold capitalize">{v}</p>
              <Button variant={v} className="min-w-0 flex-1 sm:flex-none">
                {v} action
              </Button>
              <Button variant={v} disabled className="min-w-0 flex-1 sm:flex-none">
                Disabled
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Form Inputs"
        desc="Strict form states for tracking parameters and PIN entries."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Default Text Input
              </p>
              <Input placeholder="Enter tracking number..." />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Focused State
              </p>
              <Input defaultValue="OJA-7832-X7" autoFocus />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Error State
              </p>
              <Input defaultValue="Invalid code" error />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Search Interface
              </p>
              <SearchInput defaultValue="Lagos Hub Dispatch" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Select Dropdown
              </p>
              <SelectInput defaultValue="Express Delivery (24 Hours)" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-light-secondary">
                Security PIN Gate
              </p>
              <PinInput />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Status Badges"
        desc="Micro-alerts for high-velocity logistical states."
      >
        <div className="flex flex-wrap gap-3">
          <Badge status="active" />
          <Badge status="expired" />
          <Badge status="expiring" />
          <Badge status="pending" />
          <Badge status="processing" />
        </div>
      </Section>

      <Section
        title="Cards"
        desc="Data encapsulation for metrics, records, and focused actions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard />
          <DataCard />
          <ActionCard />
        </div>
      </Section>

      <Section
        title="Navigation Elements"
        desc="Side rail, segment tabs, and mobile bottom navigation."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <SidebarItem label="Dashboard" />
            <SidebarItem label="Dashboard" active />
          </div>
          <SegmentedTabs />
          <BottomNav />
        </div>
      </Section>

      <Section
        title="Extended Components"
        desc="Dark-first, high-density playground for retail inventory and logistics tracking. Live demos."
      >
        <ExtendedDemos />
      </Section>

      <Section
        title="Light & Dark Theme Tokens"
        desc="Light is primary; dark is optional via the header toggle."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {themeTokens.map((t) => (
            <div
              key={t.name}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex h-16">
                <span className="flex-1" style={{ background: t.light }} />
                <span className="flex-1" style={{ background: t.dark }} />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium">{t.name}</p>
                <p className="text-[11px] text-light-muted">
                  {t.light} / {t.dark}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
