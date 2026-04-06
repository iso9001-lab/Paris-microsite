const defaultLinks = [];

export default function FloatingNav({ links = defaultLinks }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-white/60 bg-white/70 px-2 py-2 shadow-luxury backdrop-blur-xl sm:px-3">
        <a
          href="#home"
          className="shrink-0 rounded-full px-3 py-2 text-sm font-medium tracking-[0.18em] text-charcoal transition hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        >
          <span className="sm:hidden">F ✕ P</span>
          <span className="hidden sm:inline">FABIAN ✕ POOKIE</span>
        </a>
        <div className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition hover:bg-charcoal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne sm:px-3 sm:text-sm sm:tracking-[0.22em]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
