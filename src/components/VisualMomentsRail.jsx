import { getParisAssetSrc } from '../data/trip';

export default function VisualMomentsRail({ slots, selectedSlotId }) {
  return (
    <div className="mt-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/60">
          Photo reel
        </p>
        <p className="text-xs text-ink/60">A small roll of moments from the trip.</p>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {slots.map((slot) => {
          const assetSrc = getParisAssetSrc(slot.assetPath);
          const selected = slot.id === selectedSlotId;

          return (
            <div
              key={slot.id}
              className={`w-[10rem] shrink-0 overflow-hidden rounded-[20px] border p-3 shadow-sm transition ${
                selected
                  ? 'border-charcoal/12 bg-white/88 shadow-luxury'
                  : 'border-charcoal/6 bg-white/55'
              }`}
            >
              <div
                className={`relative h-24 overflow-hidden rounded-[16px] bg-gradient-to-br ${slot.toneClass}`}
              >
                {assetSrc ? (
                  <img
                    src={assetSrc}
                    alt={slot.alt}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: slot.imagePosition ?? 'center center' }}
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_transparent_42%)]" />
                    <div className="absolute inset-x-[18%] bottom-0 top-[18%] rounded-t-[999px] border border-white/60 bg-white/15" />
                  </>
                )}
              </div>
              <p className="mt-3 text-sm font-medium text-charcoal">{slot.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                {slot.note}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
