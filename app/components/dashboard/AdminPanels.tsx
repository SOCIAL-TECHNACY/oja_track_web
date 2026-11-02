import type {
  HealthStatus,
  NetworkEvent,
  NetworkEventStatus,
  OperationalService,
} from "@/lib/admin-dashboard";

const card =
  "rounded-2xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(16,24,20,0.04)] dark:bg-foundation-secondary dark:border-[#1e3a2b]";

const titleCls = "text-base font-bold text-light-primary dark:text-ink-primary";

function EventPill({ status }: { status: NetworkEventStatus }) {
  const cls =
    status === "ACTIVE"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "PAID"
        ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
        : "bg-brand-gold/15 text-light-primary dark:text-brand-gold";
  const dot = status === "PENDING" ? "bg-brand-gold" : "bg-brand-primary";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function HealthPill({ status }: { status: HealthStatus }) {
  const cls =
    status === "OPERATIONAL"
      ? "bg-brand-primary/10 text-brand-deep dark:bg-brand-primary/15 dark:text-brand-hover"
      : status === "DEGRADED"
        ? "bg-brand-gold/15 text-light-primary dark:text-brand-gold"
        : "bg-danger/10 text-danger";
  const dot = status === "OPERATIONAL" ? "bg-brand-primary" : status === "DEGRADED" ? "bg-brand-gold" : "bg-danger";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${cls}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

/*
 * Command-center lower panels: real-time events + operational health.
 */

export function NetworkEvents({ events }: { events: NetworkEvent[] }) {
  return (
    <div className={card}>
      <h2 className={titleCls}>Real-time Network Events</h2>
      {events.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-8 text-center dark:border-[#1e3a2b]">
          <p className="text-xs text-light-secondary dark:text-ink-secondary">
            No real-time network transactions or security alerts recorded.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {events.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3">
              <span className="flex min-w-0 items-start gap-2.5">
                <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />
                <span className="truncate text-sm text-light-primary sm:whitespace-normal dark:text-ink-primary">
                  {e.message}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden text-[13px] whitespace-nowrap text-light-secondary sm:inline dark:text-ink-secondary">
                  {e.timeAgo}
                </span>
                <EventPill status={e.status} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function OperationalHealth({ services }: { services: OperationalService[] }) {
  return (
    <div className={card}>
      <h2 className={titleCls}>Operational Health</h2>
      {services.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border py-8 text-center dark:border-[#1e3a2b]">
          <p className="text-xs text-light-secondary dark:text-ink-secondary">
            Service telemetry awaiting cluster diagnostics feed.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {services.map((s) => (
            <li key={s.id} className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-light-primary dark:text-ink-primary">
                  {s.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-light-muted">
                  Latency: {s.latencyMs}ms
                </span>
              </span>
              <HealthPill status={s.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
