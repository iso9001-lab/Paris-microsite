import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { getParisAssetSrc } from '../data/trip';
import PlaceholderVisual from './PlaceholderVisual';
import SectionHeading from './SectionHeading';
import StampCard from './StampCard';

export default function PassportStampGrid({ items, activeItem, onOpen, onClose, photoSlots }) {
  const reducedMotion = useReducedMotion();
  const activeSlot = activeItem
    ? photoSlots.find((slot) => slot.id === activeItem.photoSlotId)
    : undefined;
  const activeImageSrc = activeSlot ? getParisAssetSrc(activeSlot.assetPath) : undefined;

  useEffect(() => {
    if (!activeItem) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, onClose]);

  return (
    <section id="passport" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="section-shell">
        <div className="mb-8 flex items-center gap-4 text-ink/70">
          <span className="h-px w-10 bg-charcoal/12" />
          <p className="font-serif text-[1.7rem] leading-none text-charcoal">
            Next stop: a few places worth feeling.
          </p>
        </div>

        <SectionHeading
          eyebrow="Passport Section"
          title="Paris Itinerary Passport"
          description="Stamped with a few places worth remembering."
        />

        <p className="mt-4 max-w-xl text-sm leading-7 text-ink/70">
          Tap any stamp and its details open directly, without sending you further down the page.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.55,
                delay: reducedMotion ? 0 : index * 0.05
              }}
            >
              <StampCard item={item} selected={activeItem?.id === item.id} onSelect={onOpen} />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeItem ? (
            <>
              <motion.button
                key="passport-backdrop"
                type="button"
                aria-label="Close passport detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.22 }}
                className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-[6px]"
                onClick={onClose}
              />

              <div className="fixed inset-0 z-50 p-4 sm:p-6 lg:p-10">
                <div className="flex h-full items-center justify-center">
                  <motion.article
                    key={activeItem.id}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`passport-${activeItem.id}-title`}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.985 }}
                    transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: 'easeOut' }}
                    className="glass-card relative max-h-full w-full max-w-5xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute right-4 top-4 z-10 rounded-full border border-charcoal/10 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/70 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                    >
                      Close
                    </button>

                    <div className="grid max-h-[calc(100vh-2rem)] overflow-y-auto lg:grid-cols-[0.92fr_1.08fr]">
                      <div className="border-b border-charcoal/8 bg-[#fdfbf8] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/60">
                          {activeItem.stampNumber}
                        </p>
                        <h3
                          id={`passport-${activeItem.id}-title`}
                          className="mt-4 text-4xl leading-none text-charcoal sm:text-[2.8rem]"
                        >
                          {activeItem.title}
                        </h3>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-ink">
                          <span className="rounded-full border border-charcoal/10 bg-white px-4 py-2">
                            {activeItem.dayLabel} — {activeItem.dayTitle}
                          </span>
                          <span className="rounded-full border border-charcoal/10 bg-white px-4 py-2">
                            {activeItem.period}
                          </span>
                          <span className="rounded-full border border-charcoal/10 bg-white px-4 py-2">
                            {activeItem.timeLabel}
                          </span>
                          <span className="rounded-full border border-charcoal/10 bg-white px-4 py-2">
                            {activeItem.location}
                          </span>
                        </div>

                        <p className="mt-5 text-sm uppercase tracking-[0.24em] text-ink/55">
                          {activeItem.dateLabel}
                        </p>
                        <p className="mt-7 text-base leading-8 text-ink">{activeItem.whySpecial}</p>

                        <div className="mt-8 rounded-[24px] border border-charcoal/8 bg-charcoal px-5 py-5 text-white shadow-luxury">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/55">
                            Tiny mission
                          </p>
                          <p className="mt-3 text-lg leading-7 text-white/92">
                            {activeItem.mission}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#fbf7f2] p-4 sm:p-6">
                        <PlaceholderVisual
                          label={activeItem.imageLabel}
                          description={activeItem.imageDescription}
                          toneClass={activeItem.imageClasses}
                          variant={activeItem.visualStyle}
                          imageSrc={activeImageSrc}
                          imagePosition={activeSlot?.imagePosition}
                          fit="contain"
                          className="h-[20rem] aspect-auto bg-[#f4ede4] sm:h-[24rem] lg:h-[34rem]"
                        />
                        <div className="mt-5 rounded-[24px] border border-charcoal/8 bg-white/75 px-5 py-4 text-sm text-ink">
                          <p className="font-medium text-charcoal">{activeItem.teaser}</p>
                          <p className="mt-2 text-ink/65">
                            One tap, one keepsake. Easy to open, easy to close.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              </div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
