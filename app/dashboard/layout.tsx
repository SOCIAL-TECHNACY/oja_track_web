export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass-through for all dashboard types (agent, shop, admin…).
  // Auth guard / role redirect will live here later.
  return children;
}
