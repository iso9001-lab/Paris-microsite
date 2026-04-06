import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import FinalStampCTA from './components/FinalStampCTA';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import PassportStampGrid from './components/PassportStampGrid';
import PocketAgenda from './components/PocketAgenda';
import { finalGift, itineraryItems, photoSlots, tripMeta } from './data/trip';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Passport', href: '#passport' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Memory', href: '#memory' }
];

export default function App() {
  const [activeStampId, setActiveStampId] = useState('');
  const [openAgendaId, setOpenAgendaId] = useState(itineraryItems[0].id);

  const activeStampItem =
    itineraryItems.find((item) => item.id === activeStampId) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate overflow-x-hidden text-charcoal">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(210,191,155,0.45),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(231,215,216,0.4),_transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[32rem] -z-20 h-[40rem] bg-[radial-gradient(circle_at_20%_20%,_rgba(39,49,66,0.08),_transparent_26%),radial-gradient(circle_at_80%_10%,_rgba(210,191,155,0.22),_transparent_24%)]" />

        <FloatingNav links={navLinks} />

        <main>
          <HeroSection tripMeta={tripMeta} />
          <PassportStampGrid
            items={itineraryItems}
            activeItem={activeStampItem}
            onOpen={setActiveStampId}
            onClose={() => setActiveStampId('')}
            photoSlots={photoSlots}
          />
          <PocketAgenda
            items={itineraryItems}
            openId={openAgendaId}
            onToggle={(id) => setOpenAgendaId((current) => (current === id ? '' : id))}
          />
          <FinalStampCTA finalGift={finalGift} />
        </main>

        <Footer footerRange={tripMeta.footerRange} />
      </div>
    </MotionConfig>
  );
}
