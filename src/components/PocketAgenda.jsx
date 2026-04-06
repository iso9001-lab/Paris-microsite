import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';

function groupItemsByDay(items) {
  const groups = items.reduce((accumulator, item) => {
    const existingGroup = accumulator.find((group) => group.dayId === item.dayId);

    if (existingGroup) {
      existingGroup.items.push(item);
      return accumulator;
    }

    return [
      ...accumulator,
      {
        dayId: item.dayId,
        dayLabel: item.dayLabel,
        dayTitle: item.dayTitle,
        dateLabel: item.dateLabel,
        items: [item]
      }
    ];
  }, []);

  return groups.map((group) => ({
    ...group,
    items: group.items.sort((left, right) => left.order - right.order)
  }));
}

function AgendaAccordionItem({ item, isOpen, onToggle }) {
  const reducedMotion = useReducedMotion();
  const panelId = `${item.id}-panel`;

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/65 bg-white/70 shadow-luxury backdrop-blur-xl">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne sm:px-6 sm:py-6"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
            <span>{item.dayLabel}</span>
            <span className="rounded-full border border-charcoal/10 bg-white px-3 py-2 tracking-[0.22em] text-ink/60">
              {item.period}
            </span>
          </div>
          <h3 className="mt-4 flex items-center gap-3 text-2xl leading-tight text-charcoal sm:text-[1.85rem]">
            <span aria-hidden="true" className="text-2xl">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="mt-3 text-sm text-ink">
            {item.timeLabel} · {item.location}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/10 bg-white/80 text-xl text-charcoal transition ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            key={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-charcoal/8 px-5 pb-6 pt-5 sm:px-6">
              <p className="max-w-2xl text-base leading-8 text-ink">{item.agendaText}</p>

              {item.agendaMicroMissions.length > 0 ? (
                <div className="mt-5 rounded-[22px] border border-charcoal/8 bg-[#f9f5ef] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-ink/60">
                    Micro-missions
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-charcoal">
                    {item.agendaMicroMissions.map((mission) => (
                      <li key={mission} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-champagne"
                        />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function PocketAgenda({ items, openId, onToggle }) {
  const reducedMotion = useReducedMotion();
  const dayGroups = groupItemsByDay(items);

  return (
    <section id="agenda" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Agenda Section"
          title="Paris Pocket Agenda"
          description="A calmer view of the same plan, now arranged like a real trip: by day first, then by mood and timing."
        />

        <div className="mt-12 space-y-10">
          {dayGroups.map((group, index) => (
            <motion.section
              key={group.dayId}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.55,
                delay: reducedMotion ? 0 : index * 0.06
              }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-charcoal/8 pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-ink/60">
                    {group.dayLabel}
                  </p>
                  <h3 className="mt-3 text-4xl leading-none text-charcoal sm:text-[2.7rem]">
                    {group.dayTitle}
                  </h3>
                </div>
                <p className="text-sm text-ink">{group.dateLabel}</p>
              </div>

              {group.items.map((item) => (
                <AgendaAccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={onToggle}
                />
              ))}
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}
