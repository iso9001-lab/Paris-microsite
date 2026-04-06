import { motion, useReducedMotion } from 'framer-motion';

export default function StampCard({ item, selected, onSelect }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      aria-pressed={selected}
      aria-haspopup="dialog"
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.01 }}
      whileTap={reducedMotion ? undefined : { scale: 0.99 }}
      className={`passport-stamp group w-full rounded-[30px] p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
        selected
          ? 'border-charcoal/15 bg-white/90 shadow-luxury-lg'
          : 'border-charcoal/8 bg-white/70 shadow-luxury'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/55">
            {item.stampNumber}
          </p>
          <p className="mt-3 text-2xl">{item.icon}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/60">
            {item.period}
          </div>
          <div className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/60">
            {item.timeLabel}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="max-w-xs text-2xl leading-tight text-charcoal">{item.title}</h3>
        <p className="mt-3 text-sm uppercase tracking-[0.26em] text-ink/55">{item.location}</p>
        <p className="mt-5 text-sm leading-7 text-ink">{item.teaser}</p>
      </div>

      <div className="mt-6 flex items-center gap-3 text-sm text-ink/60">
        <span className="h-px flex-1 bg-charcoal/10" />
        <span>{selected ? 'Open now' : 'Open stamp'}</span>
      </div>
    </motion.button>
  );
}
