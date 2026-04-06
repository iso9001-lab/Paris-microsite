function VisualScene({ variant }) {
  if (variant === 'glass') {
    return (
      <>
        <div className="absolute inset-x-[10%] top-[16%] h-[48%] rotate-[-8deg] rounded-[28px] border border-white/75 bg-white/20" />
        <div className="absolute inset-x-[28%] top-[10%] h-[62%] rotate-[12deg] rounded-[28px] border border-white/75 bg-white/18" />
        <div className="absolute inset-x-[20%] bottom-[16%] h-[22%] rounded-[22px] border border-charcoal/8 bg-white/20" />
      </>
    );
  }

  if (variant === 'salon') {
    return (
      <>
        <div className="absolute inset-x-[12%] top-[18%] h-[50%] rounded-[30px] border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08))]" />
        <div className="absolute left-[18%] top-[24%] h-[38%] w-[24%] rounded-[20px] border border-charcoal/8 bg-white/18" />
        <div className="absolute right-[18%] top-[24%] h-[38%] w-[24%] rounded-[20px] border border-charcoal/8 bg-white/18" />
        <div className="absolute inset-x-[22%] bottom-[18%] h-[16%] rounded-full border border-white/70 bg-white/20" />
      </>
    );
  }

  if (variant === 'tower') {
    return (
      <>
        <div className="absolute left-1/2 top-[14%] h-[58%] w-[3px] -translate-x-1/2 rounded-full bg-white/70" />
        <div className="absolute left-1/2 top-[18%] h-[46%] w-[34%] -translate-x-1/2 border-x border-t border-white/75 bg-white/10 [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
        <div className="absolute inset-x-[28%] bottom-[18%] h-[8%] rounded-full border border-white/70 bg-white/15" />
      </>
    );
  }

  if (variant === 'street') {
    return (
      <>
        <div className="absolute inset-x-[12%] bottom-[16%] top-[20%] rounded-[26px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
        <div className="absolute left-[20%] top-[18%] h-[42%] w-[18%] rounded-[16px] border border-white/60 bg-white/12" />
        <div className="absolute right-[20%] top-[18%] h-[42%] w-[18%] rounded-[16px] border border-white/60 bg-white/12" />
        <div className="absolute inset-x-[24%] bottom-[22%] h-[2px] bg-white/70" />
      </>
    );
  }

  if (variant === 'cathedral') {
    return (
      <>
        <div className="absolute left-[20%] top-[18%] h-[48%] w-[20%] rounded-t-[18px] border border-white/72 bg-white/12" />
        <div className="absolute right-[20%] top-[18%] h-[48%] w-[20%] rounded-t-[18px] border border-white/72 bg-white/12" />
        <div className="absolute inset-x-[34%] top-[24%] h-[42%] rounded-t-[999px] border border-white/72 bg-white/14" />
        <div className="absolute inset-x-[28%] bottom-[16%] h-[12%] rounded-full border border-white/70 bg-white/10" />
      </>
    );
  }

  if (variant === 'dessert') {
    return (
      <>
        <div className="absolute inset-x-[20%] bottom-[18%] h-[20%] rounded-[20px] border border-white/75 bg-white/18" />
        <div className="absolute left-[28%] top-[28%] h-[24%] w-[20%] rounded-full border border-white/75 bg-white/18" />
        <div className="absolute right-[28%] top-[28%] h-[24%] w-[20%] rounded-full border border-white/75 bg-white/18" />
        <div className="absolute inset-x-[36%] top-[18%] h-[18%] rounded-full border border-white/75 bg-white/14" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-x-[18%] bottom-0 top-[14%] rounded-t-[999px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.14))] shadow-inner" />
      <div className="absolute inset-x-[24%] bottom-[14%] top-[22%] rounded-t-[999px] border border-charcoal/8 bg-white/15" />
    </>
  );
}

export default function PlaceholderVisual({
  label,
  description,
  toneClass,
  variant = 'arch',
  imageSrc,
  imagePosition = 'center center',
  fit = 'cover',
  className = ''
}) {
  const containImage = fit === 'contain';

  return (
    <div
      role="img"
      aria-label={description}
      className={`relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br ${toneClass} shadow-luxury ${className}`}
    >
      {imageSrc ? (
        <>
          {containImage ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <img
                src={imageSrc}
                alt={description}
                className="h-full w-full rounded-[22px] object-contain"
                style={{ objectPosition: imagePosition }}
              />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={description}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,25,0.02),rgba(15,18,25,0.18))]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.18),_transparent_55%)]" />
          <VisualScene variant={variant} />
        </>
      )}

      <div className="absolute left-6 top-6 rounded-full border border-charcoal/10 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-ink/70 backdrop-blur">
        {imageSrc ? 'Captured' : 'Visual study'}
      </div>
      <div className="absolute inset-x-8 bottom-8 rounded-[24px] border border-white/75 bg-white/65 p-5 backdrop-blur">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/65">
          {imageSrc ? 'Moment' : 'Scene'}
        </p>
        <p className="mt-2 text-lg leading-tight text-charcoal">{label}</p>
      </div>
    </div>
  );
}
