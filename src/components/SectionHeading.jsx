export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-ink/70">
        {eyebrow}
      </p>
      <h2 className="text-4xl leading-none text-charcoal sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-ink sm:text-base">{description}</p>
    </div>
  );
}
