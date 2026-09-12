/* Centered overline + title block shared by homepage sections. */
export default function SectionHeading({
  overline,
  title,
  dark = false,
}: {
  overline: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase">
        {overline}
      </p>
      <h2
        className={`mt-2 text-3xl font-bold text-balance ${
          dark ? "text-white" : "text-light-primary dark:text-ink-primary"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
