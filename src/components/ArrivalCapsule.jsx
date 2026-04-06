import { useEffect, useState } from 'react';

function getCountdownState(isoDateTime) {
  const diff = new Date(isoDateTime).getTime() - Date.now();

  if (diff <= 0) {
    return { arrived: true, value: 'Arrived in Paris' };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    arrived: false,
    value: `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
  };
}

export default function ArrivalCapsule({ arrival }) {
  const [countdown, setCountdown] = useState(() => getCountdownState(arrival.isoDateTime));

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownState(arrival.isoDateTime));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 60000);

    return () => window.clearInterval(intervalId);
  }, [arrival.isoDateTime]);

  return (
    <aside className="w-full max-w-[23rem] rounded-[28px] border border-white/70 bg-white/72 px-5 py-5 shadow-luxury backdrop-blur-xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-ink/60">
        {arrival.label}
      </p>
      <p className="mt-3 font-serif text-[1.75rem] leading-none text-charcoal">{arrival.title}</p>
      <p className="mt-4 text-sm text-ink">{arrival.shortDateLabel}</p>
      <p className="mt-1 text-sm text-ink">{arrival.location}</p>
      <div className="mt-5 flex items-center justify-between gap-4 rounded-[20px] border border-charcoal/8 bg-[#faf6f0] px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
          {countdown.arrived ? 'Arrived in Paris' : arrival.countdownLabel}
        </span>
        {!countdown.arrived ? (
          <span aria-live="polite" className="text-sm font-medium tracking-[0.22em] text-charcoal">
            {countdown.value}
          </span>
        ) : null}
      </div>
      <div className="mt-4 rounded-[22px] border border-charcoal/8 bg-white/72 px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
          {arrival.firstMoveLabel}
        </p>
        <p className="mt-2 text-sm leading-7 text-charcoal">{arrival.firstMoveText}</p>
      </div>
    </aside>
  );
}
