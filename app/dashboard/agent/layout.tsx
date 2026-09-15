import DashboardShell from "../../components/dashboard/DashboardShell";
import {
  agentHomeHref,
  agentNavItems,
  agentTitles,
} from "../../components/dashboard/agentNav";
import { mockAgentOverview } from "@/lib/agent-dashboard";

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={agentNavItems}
      user={mockAgentOverview.profile}
      titles={agentTitles}
      defaultTitle="Dashboard Overview"
      homeHref={agentHomeHref}
      homeLabel="OjaTrack agent dashboard home"
      navAriaLabel="Agent"
    >
      {children}
    </DashboardShell>
  );
}
