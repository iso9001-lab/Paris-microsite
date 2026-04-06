import { motion, useReducedMotion } from 'framer-motion';
import { getParisAssetSrc } from '../data/trip';
import ArrivalCapsule from './ArrivalCapsule';

const riseIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function HeroSection({ tripMeta }) {
  const reducedMotion = useReducedMotion();
  const [titleLead, titleTail] = tripMeta.title.split(' — ');
  const emotionalPillText = tripMeta.emotionalPill.replace(/^Next stop:\s*/, '');
  const heroImageSrc = getParisAssetSrc('arrival-gare-est');

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:pb-28 lg:pt-36"
    >
      <div className="section-shell">
        <div className="mb-8 flex justify-start lg:mb-10 lg:justify-end">
          <ArrivalCapsule arrival={tripMeta.arrival} />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseIn}
            transition={{ duration: reducedMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-ink/70">
              {tripMeta.eyebrow}
            </p>
            <h1 className="max-w-3xl text-6xl leading-[0.94] text-charcoal sm:text-7xl lg:text-[5.7rem]">
              {titleLead} — <br />
              <span className="text-[0.86em]">{titleTail}</span>
            </h1>
            <p className="mt-6 max-w-xl text-2xl leading-tight text-charcoal sm:text-[1.9rem]">
              {tripMeta.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink sm:text-lg">
              {tripMeta.supportingLine}
            </p>

            <div className="mt-7 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-charcoal/10 bg-white/70 px-4 py-3 shadow-luxury backdrop-blur">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/55">
                Next stop
              </span>
              <span className="font-serif text-xl leading-none text-charcoal sm:text-2xl">
                {emotionalPillText}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#passport"
                className="rounded-full border border-charcoal/10 bg-charcoal px-6 py-3 text-sm font-medium text-white shadow-luxury transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                Open the passport
              </a>
              <a
                href="#agenda"
                className="rounded-full border border-charcoal/10 bg-white/75 px-6 py-3 text-sm font-medium text-charcoal shadow-luxury transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                See the agenda
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.9,
              delay: reducedMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative"
          >
            <div
              role="img"
              aria-label="Arrival photo at Gare de l’Est with a warm Paris atmosphere."
              className="glass-card relative overflow-hidden p-4 sm:p-5"
            >
              {heroImageSrc ? (
                <>
                  <img
                    src={heroImageSrc}
                    alt="Arrival photo at Gare de l’Est"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: 'center 44%' }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,245,240,0.2),rgba(248,245,240,0.82))]" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_35%),linear-gradient(145deg,_rgba(210,191,155,0.42),_rgba(39,49,66,0.12)_65%,_rgba(255,255,255,0.72))]" />
              )}
              <div className="relative grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[23rem] overflow-hidden rounded-[30px] border border-white/60 bg-[linear-gradient(180deg,_rgba(255,255,255,0.72),_rgba(255,255,255,0.2))] shadow-innerGlow">
                  {heroImageSrc ? (
                    <>
                      <img
                        src={heroImageSrc}
                        alt="Arrival detail at Gare de l’Est"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: 'center 48%' }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(33,29,27,0.22))]" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-x-[14%] bottom-0 top-[10%] rounded-t-[999px] border border-white/75 bg-[linear-gradient(180deg,_rgba(255,255,255,0.65),_rgba(255,255,255,0.12))]" />
                      <div className="absolute inset-x-[22%] bottom-[8%] top-[18%] rounded-t-[999px] border border-charcoal/8 bg-white/18" />
                    </>
                  )}
                  <div className="absolute left-5 top-5 rounded-full border border-white/65 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/65 backdrop-blur">
                    First arrival
                  </div>
                  <div className="absolute inset-x-5 bottom-5 rounded-[26px] border border-white/75 bg-white/60 p-5 backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/60">
                      Moment
                    </p>
                    <p className="mt-2 text-xl leading-tight text-charcoal">
                      The part where Paris becomes real.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[26px] border border-white/70 bg-white/65 p-5 shadow-luxury backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/60">
                      Trip note
                    </p>
                    <p className="mt-3 text-2xl leading-tight text-charcoal">{tripMeta.noteTitle}</p>
                    <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-ink">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                          From
                        </p>
                        <p className="mt-2">22 Apr</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                          To
                        </p>
                        <p className="mt-2">26 Apr</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                          Mood
                        </p>
                        <p className="mt-2">Warm</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-charcoal/10 bg-charcoal px-5 py-6 text-white shadow-luxury-lg">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                      Pocket line
                    </p>
                    <p className="mt-3 text-lg leading-7 text-white/90">{tripMeta.pocketLine}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 text-sm text-ink/65">
          <span className="h-px w-10 bg-charcoal/15" />
          <span className="font-serif text-xl text-charcoal/90">{tripMeta.transitionLine}</span>
          <span className="h-px w-10 bg-charcoal/15" />
          <a
            href="#passport"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            Scroll for the itinerary
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
