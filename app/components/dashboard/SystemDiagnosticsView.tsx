import {
  mockSystemLogs,
  mockSystemServices,
  mockSystemStats,
  type SystemLogLevel,
  type SystemServiceStatus,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

function ServicePill({ status }: { status: SystemServiceStatus }) {
  const cls =
    status === "OPERATIONAL"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "DEGRADED"
        ? "bg-surface-alt text-light-secondary dark:bg-foundation-elevated dark:text-ink-secondary"
        : "bg-danger/10 text-danger dark:bg-danger/15 dark:text-danger";
  const dot =
    status === "OPERATIONAL"
      ? "bg-brand-primary"
      : status === "DEGRADED"
        ? "bg-light-muted dark:bg-ink-muted"
        : "bg-danger";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function LevelPill({ level }: { level: SystemLogLevel }) {
  const cls =
    level === "CRIT"
      ? "bg-danger/10 text-danger dark:bg-danger/15 dark:text-danger"
      : level === "WARN"
        ? "bg-surface-alt text-light-secondary dark:bg-foundation-elevated dark:text-ink-secondary"
        : "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover";
  return (
    <span
      className={`inline-flex h-6 w-14 shrink-0 items-center justify-center rounded-md text-xs font-bold ${cls}`}
    >
      {level}
    </span>
  );
}

/*
 * System Diagnostics: platform stat cards, live microservices monitor,
 * and kernel log journal. Static mock-first; live polling wires up
 * to ops tooling later.
 */
export default function SystemDiagnosticsView() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div
        aria-label="Platform health summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {mockSystemStats.map((s) => (
          <div key={s.label} className={card}>
            <p className="text-xs font-semibold tracking-wider text-light-muted uppercase dark:text-ink-muted">
              {s.label}
            </p>
            <p className={`mt-2 text-3xl font-extrabold tabular-nums ${s.valueClass}`}>
              {s.value}
            </p>
            <p className="mt-2 text-[13px] text-light-secondary dark:text-ink-secondary">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Microservices */}
      <section aria-label="Live microservices monitor">
        <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
          Live Microservices Monitor
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mockSystemServices.map((s) => (
            <div key={s.id} className={card}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-bold text-light-primary dark:text-ink-primary">
                  {s.name}
                </p>
                <ServicePill status={s.status} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[13px] text-light-secondary dark:text-ink-secondary">
                  Reported Uptime
                </p>
                <p className="text-sm font-bold text-brand-primary tabular-nums">
                  {s.uptimePct.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kernel logs */}
      <div className={card}>
        <h2 className="text-lg font-bold text-light-primary dark:text-ink-primary">
          Kernel Logs & Incident Journal
        </h2>
        <ol role="log" aria-label="Kernel logs and incident journal" className="mt-4 space-y-3.5">
          {mockSystemLogs.map((log) => (
            <li key={log.id} className="flex items-start gap-3">
              <span className="w-24 shrink-0 pt-0.5 font-mono text-[13px] whitespace-nowrap text-light-muted tabular-nums">
                {log.timeUTC}
              </span>
              <LevelPill level={log.level} />
              <p className="min-w-0 text-sm text-light-primary dark:text-ink-primary">
                {log.message}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
