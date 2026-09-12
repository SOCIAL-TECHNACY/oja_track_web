/*
 * Shared legal-page primitives: centered hero + sticky-TOC policy layout.
 * Fully server-rendered; TOC entries are plain anchors (no scroll-spy).
 */
export function LegalHero({ title, updated }: { title: string; updated: string }) {
  return (
    <section className="bg-surface/60 dark:bg-transparent">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
        <h1 className="text-4xl font-bold text-light-primary sm:text-5xl dark:text-ink-primary">
          {title}
        </h1>
        <p className="mt-3 text-[13px] font-bold tracking-[0.08em] text-brand-primary uppercase">
          {updated}
        </p>
      </div>
    </section>
  );
}

export type PolicySection = { title: string; paras: string[] };

export function PolicyLayout({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid items-start gap-10 lg:grid-cols-[240px_1fr]">
        <nav
          aria-label="Table of contents"
          className="rounded-2xl border border-border bg-white p-5 lg:sticky lg:top-24 dark:bg-foundation-secondary dark:border-[#1e3a2b]"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] text-light-muted uppercase">
            Table of contents
          </p>
          <ol className="mt-3 space-y-2">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a
                  href={`#section-${i + 1}`}
                  className="text-[13px] text-light-secondary hover:text-brand-deep hover:font-semibold dark:hover:text-brand-hover"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <article key={s.title} id={`section-${i + 1}`} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-light-primary dark:text-ink-primary">
                {i + 1}. {s.title}
              </h2>
              {s.paras.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-6 text-light-secondary">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
