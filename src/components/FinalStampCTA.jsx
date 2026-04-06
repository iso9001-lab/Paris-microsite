import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const confettiPieces = [
  { id: 1, x: -90, y: -120, rotate: -18, color: 'bg-champagne' },
  { id: 2, x: -62, y: -96, rotate: 24, color: 'bg-blush' },
  { id: 3, x: -38, y: -130, rotate: -28, color: 'bg-navy' },
  { id: 4, x: -8, y: -112, rotate: 20, color: 'bg-white' },
  { id: 5, x: 22, y: -138, rotate: -16, color: 'bg-champagne' },
  { id: 6, x: 54, y: -102, rotate: 26, color: 'bg-blush' },
  { id: 7, x: 86, y: -124, rotate: -20, color: 'bg-navy' },
  { id: 8, x: 112, y: -90, rotate: 30, color: 'bg-white' },
  { id: 9, x: -108, y: -68, rotate: -12, color: 'bg-white' },
  { id: 10, x: 104, y: -62, rotate: 14, color: 'bg-champagne' }
];

export default function FinalStampCTA({ finalGift }) {
  const [stamped, setStamped] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const reducedMotion = useReducedMotion();

  const handleStamp = () => {
    setStamped(true);
    setBurstKey((key) => key + 1);
  };

  return (
    <section id="memory" className="px-4 pb-24 pt-20 sm:px-6 lg:pb-28 lg:pt-28">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.78),_rgba(250,247,242,0.92))] px-6 py-12 shadow-luxury-lg backdrop-blur-xl sm:px-8 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(210,191,155,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(39,49,66,0.12),_transparent_26%)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink/65">
              {finalGift.eyebrow}
            </p>
            <h2 className="mt-4 text-5xl leading-none text-charcoal sm:text-[3.6rem]">
              {finalGift.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-ink">{finalGift.body}</p>

            <div className="relative mt-10">
              <button
                type="button"
                onClick={handleStamp}
                className="relative inline-flex items-center justify-center rounded-full border border-charcoal/10 bg-charcoal px-8 py-4 text-sm font-medium text-white shadow-luxury transition hover:-translate-y-0.5 hover:shadow-luxury-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                {finalGift.buttonLabel}
              </button>

              <AnimatePresence>
                {stamped && !reducedMotion ? (
                  <div key={burstKey} className="pointer-events-none absolute inset-0">
                    {confettiPieces.map((piece) => (
                      <motion.span
                        key={`${burstKey}-${piece.id}`}
                        initial={{ opacity: 0, scale: 0.6, x: 0, y: 0, rotate: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0.6, 1, 0.8],
                          x: piece.x,
                          y: piece.y,
                          rotate: piece.rotate
                        }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-sm shadow-sm ${piece.color}`}
                      />
                    ))}
                  </div>
                ) : null}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {stamped ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: reducedMotion ? 0.01 : 0.38, ease: 'easeOut' }}
                  className="mx-auto mt-8 space-y-4"
                >
                  <div className="inline-flex rounded-full border border-charcoal/10 bg-white/75 px-5 py-3 text-sm font-medium tracking-[0.16em] text-charcoal shadow-luxury backdrop-blur">
                    {finalGift.stampedLabel}
                  </div>

                  <div className="mx-auto max-w-lg rounded-[28px] border border-white/70 bg-white/75 px-6 py-6 shadow-luxury backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ink/60">
                      {finalGift.label}
                    </p>
                    <p className="mt-3 text-2xl leading-tight text-charcoal">
                      {finalGift.giftTitle}
                    </p>
                    <p className="mt-4 text-base leading-8 text-ink">{finalGift.giftBody}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <p className="mt-10 text-lg leading-8 text-charcoal">{finalGift.closingLine}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
