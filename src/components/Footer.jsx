export default function Footer({ footerRange }) {
  return (
    <footer className="px-4 pb-10 sm:px-6">
      <div className="section-shell border-t border-charcoal/8 pt-6 text-sm text-ink/65">
        {footerRange}
      </div>
    </footer>
  );
}
