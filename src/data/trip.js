const parisAssetModules = import.meta.glob('../assets/paris/*', {
  eager: true,
  import: 'default'
});

const imageExtensionPattern = /\.[^.]+$/;

const parisAssetEntries = Object.entries(parisAssetModules).map(([path, src]) => {
  const filename = path.split('/').pop() ?? '';
  const stem = filename.replace(imageExtensionPattern, '').toLowerCase();

  return { path, src, stem };
});

function normalizeAssetKey(assetPath) {
  return String(assetPath ?? '')
    .replace(imageExtensionPattern, '')
    .trim()
    .toLowerCase();
}

export const tripMeta = {
  title: 'Fabian ✕ Pookie — Paris 22–26 April',
  eyebrow: 'Paris, 22–26 April 2026',
  subtitle: 'A small plan for us.',
  supportingLine: 'A few places, a few moments, and a little Paris. The rest can stay ours.',
  emotionalPill: 'Next stop: you and me in Paris.',
  transitionLine: 'First arrival, then the rest.',
  noteTitle: 'Quiet luxury, with us in it.',
  pocketLine: 'Nine thoughtful stops. Enough room for whatever the city adds on its own.',
  arrival: {
    label: 'Arrival capsule',
    title: 'Arrival in Paris',
    countdownLabel: 'Until we arrive',
    dateLabel: 'Wednesday, 22 April 2026 · 20:42',
    shortDateLabel: '22 Apr 2026 · 20:42',
    location: 'Gare de l’Est',
    isoDateTime: '2026-04-22T20:42:00+02:00',
    firstMoveLabel: 'First move after arrival',
    firstMoveText: 'A short walk. No plan. Just Paris at night.'
  },
  footerRange: 'Paris, 22–26 April 2026'
};

export const finalGift = {
  eyebrow: 'Final Stamp',
  title: 'One last little keepsake.',
  body: 'A quiet ending for the page, and a better beginning for the trip itself.',
  buttonLabel: 'Get your stamp',
  stampedLabel: 'Stamped — Paris, April 2026',
  label: 'Private gift',
  giftTitle: 'One small surprise stays off the itinerary.',
  giftBody: 'It is not in the plan on purpose. It is waiting for us in Paris.',
  closingLine: 'A few places in Paris. My favorite part is still you.'
};

export const photoSlots = [
  {
    id: 'arrival-gare-est',
    title: 'Gare de l’Est',
    note: 'first hello',
    alt: 'Arrival photo at Gare de l’Est.',
    assetPath: 'arrival-gare-est',
    toneClass: 'from-zinc-100 via-white to-neutral-100',
    imagePosition: 'center 46%'
  },
  {
    id: 'eiffel-night',
    title: 'Eiffel night',
    note: 'not going up',
    alt: 'A playful Eiffel Tower moment together.',
    assetPath: 'eiffel-night',
    toneClass: 'from-slate-200 via-slate-100 to-stone-100',
    imagePosition: 'center 22%'
  },
  {
    id: 'no-plan-night',
    title: 'No plan night',
    note: 'pookie mode',
    alt: 'A playful no-plan-night mood image.',
    assetPath: 'no-plan-night',
    toneClass: 'from-slate-300 via-slate-100 to-zinc-100',
    imagePosition: 'center center'
  },
  {
    id: 'lvmh-carrousel',
    title: 'Carrousel mood',
    note: 'serious, allegedly',
    alt: 'A dressed-up luxury-business image for the Carrousel du Louvre stop.',
    assetPath: 'lvmh-carrousel-1',
    toneClass: 'from-stone-200 via-zinc-50 to-amber-100',
    imagePosition: 'center 20%'
  },
  {
    id: 'cedric-grolet',
    title: 'Cedric Grolet',
    note: 'too pretty to eat',
    alt: 'Cedric Grolet pastry display.',
    assetPath: 'cedric-grolet',
    toneClass: 'from-amber-50 via-white to-orange-100',
    imagePosition: 'center center'
  },
  {
    id: 'galeries-champs',
    title: 'Luxury run',
    note: 'shopping damage',
    alt: 'Luxury shopping image in Paris.',
    assetPath: 'galeries-champs',
    toneClass: 'from-stone-100 via-white to-amber-50',
    imagePosition: 'center 24%'
  },
  {
    id: 'fondation-louis-vuitton',
    title: 'Fondation light',
    note: 'glass calm',
    alt: 'Fondation Louis Vuitton exterior.',
    assetPath: 'fondation-louis-vuitton',
    toneClass: 'from-slate-100 via-white to-sky-100',
    imagePosition: 'center center'
  },
  {
    id: 'louvre-slow-walk',
    title: 'Louvre walk',
    note: 'skip the obvious',
    alt: 'A playful Louvre image.',
    assetPath: 'louvre-slow-walk',
    toneClass: 'from-stone-100 via-white to-amber-50',
    imagePosition: 'center 20%'
  },
  {
    id: 'notre-dame',
    title: 'Notre-Dame',
    note: 'still dramatic',
    alt: 'A dramatic Notre-Dame image referencing the fire and what came after.',
    assetPath: 'notre-dame',
    toneClass: 'from-stone-200 via-white to-slate-100',
    imagePosition: 'center 18%'
  },
  {
    id: 'restaurant-night',
    title: 'Restaurant night',
    note: 'somewhere good',
    alt: 'Dinner mood for a Paris restaurant night.',
    assetPath: 'restaurant-night',
    toneClass: 'from-amber-100 via-stone-50 to-rose-100',
    imagePosition: 'center 26%'
  }
];

export function getParisAssetSrc(assetPath) {
  if (!assetPath) {
    return undefined;
  }

  const key = normalizeAssetKey(assetPath);

  const exactMatch = parisAssetEntries.find((entry) => entry.stem === key);
  if (exactMatch) {
    return exactMatch.src;
  }

  const prefixedMatch = parisAssetEntries.find((entry) => entry.stem.startsWith(`${key}-`));
  return prefixedMatch?.src;
}

export const itineraryItems = [
  {
    id: 'eiffel-tower-night',
    order: 1,
    stampNumber: 'Stamp 01',
    icon: '🗼',
    title: 'Eiffel Tower — Night View',
    location: 'Champ de Mars',
    dateLabel: 'Wednesday, 22 April 2026',
    timeLabel: 'After dark',
    period: 'Evening',
    dayId: 'day-1',
    dayLabel: 'Day 1',
    dayTitle: 'Arrival & Night',
    teaser: 'The city, all at once.',
    whySpecial:
      'Not really the tower itself, but the moment when everything briefly goes still and the lights begin to shimmer.',
    mission: 'Say nothing for 30 seconds. Just look.',
    agendaText:
      'A first proper pause in Paris. No rush, no photos first, just the skyline and the quiet before it starts to sparkle.',
    agendaMicroMissions: [],
    imageLabel: 'Eiffel night',
    imageDescription: 'A refined placeholder for the Eiffel Tower at night.',
    imageClasses: 'from-slate-200 via-slate-100 to-stone-100',
    visualStyle: 'tower',
    photoSlotId: 'eiffel-night'
  },
  {
    id: 'no-plan-night',
    order: 2,
    stampNumber: 'Stamp 02',
    icon: '🍸',
    title: 'Night Out — No Plan Night',
    location: 'Wherever the night feels right',
    dateLabel: 'Wednesday, 22 April 2026',
    timeLabel: 'Open ending',
    period: 'Late',
    dayId: 'day-1',
    dayLabel: 'Day 1',
    dayTitle: 'Arrival & Night',
    teaser: 'No structure. Just us.',
    whySpecial:
      'Everything else has a shape. This is the part that stays open on purpose.',
    mission: 'Stay out longer than planned.',
    agendaText:
      'No reservation energy. No checklist energy. Just keep the night open and let Paris make the next move.',
    agendaMicroMissions: [],
    imageLabel: 'No plan night',
    imageDescription: 'A playful no-plan-night mood image.',
    imageClasses: 'from-slate-300 via-slate-100 to-zinc-100',
    visualStyle: 'street',
    photoSlotId: 'no-plan-night'
  },
  {
    id: 'lvmh-agm',
    order: 3,
    stampNumber: 'Stamp 03',
    icon: '👔',
    title: 'LVMH AGM — Carrousel du Louvre',
    location: 'Carrousel du Louvre',
    dateLabel: 'Thursday, 23 April 2026',
    timeLabel: '10:30–13:00',
    period: 'Morning',
    dayId: 'day-2',
    dayLabel: 'Day 2',
    dayTitle: 'Ambition & Movement',
    teaser: 'A sharp morning in the middle of Paris.',
    whySpecial:
      'Business, luxury, and Paris rarely sit this neatly together. Inside the Carrousel du Louvre, ambition meets the atmosphere of the city itself, which is what gives the morning its edge.',
    mission: 'Write down one thing that feels bigger than business.',
    agendaText: 'Notes: the interesting parts + our own observations.',
    agendaMicroMissions: [],
    imageLabel: 'Carrousel mood',
    imageDescription:
      'An elegant placeholder suggesting the Louvre, a polished meeting atmosphere, and a clear Paris morning.',
    imageClasses: 'from-stone-200 via-zinc-50 to-amber-100',
    visualStyle: 'arch',
    photoSlotId: 'lvmh-carrousel'
  },
  {
    id: 'cedric-grolet-opera',
    order: 4,
    stampNumber: 'Stamp 04',
    icon: '🍰',
    title: 'Cedric Grolet Opéra',
    location: 'Opéra',
    dateLabel: 'Thursday, 23 April 2026',
    timeLabel: 'Late afternoon',
    period: 'Afternoon',
    dayId: 'day-2',
    dayLabel: 'Day 2',
    dayTitle: 'Ambition & Movement',
    teaser: 'Art you can eat.',
    whySpecial:
      'Not just dessert, but precision, aesthetics, and enough hype to feel like modern Paris.',
    mission: 'Pick something that looks too perfect to eat.',
    agendaText:
      'A short stop for something exact, beautiful, and a little bit excessive in the right way.',
    agendaMicroMissions: [],
    imageLabel: 'Cedric Grolet',
    imageDescription: 'A refined placeholder for an immaculate Paris pastry moment.',
    imageClasses: 'from-amber-50 via-white to-orange-100',
    visualStyle: 'dessert',
    photoSlotId: 'cedric-grolet'
  },
  {
    id: 'galeries-champs',
    order: 5,
    stampNumber: 'Stamp 05',
    icon: '🛍',
    title: 'Galeries Lafayette / Champs-Élysées',
    location: 'Galeries Lafayette / Champs-Élysées',
    dateLabel: 'Thursday, 23 April 2026',
    timeLabel: 'Early evening',
    period: 'Evening',
    dayId: 'day-2',
    dayLabel: 'Day 2',
    dayTitle: 'Ambition & Movement',
    teaser: 'A little too much, in the best way.',
    whySpecial:
      'Overflow, luxury, movement, and a useful contrast to the quieter parts of the trip.',
    mission: 'Try on something you would never buy.',
    agendaText:
      'A little spectacle, a little excess, and a reminder that Paris can feel grand without needing to stay serious.',
    agendaMicroMissions: [],
    imageLabel: 'Luxury run',
    imageDescription: 'A premium placeholder for a moving Paris luxury shopping scene.',
    imageClasses: 'from-stone-100 via-white to-amber-50',
    visualStyle: 'street',
    photoSlotId: 'galeries-champs'
  },
  {
    id: 'fondation-louis-vuitton',
    order: 6,
    stampNumber: 'Stamp 06',
    icon: '🎨',
    title: 'Fondation Louis Vuitton — Premium Tickets',
    location: 'Fondation Louis Vuitton',
    dateLabel: 'Friday, 24 April 2026',
    timeLabel: 'When it feels right',
    period: 'Morning',
    dayId: 'day-3',
    dayLabel: 'Day 3',
    dayTitle: 'Art & Quiet Contrast',
    teaser: 'Art without pressure.',
    whySpecial:
      'There is no stopwatch here. The Fondation feels special because the building is part of the experience, and the whole visit holds art, architecture, and space at the same time.',
    mission: 'Pick one artwork that feels like us.',
    agendaText: 'No time pressure. We go when it feels right.',
    agendaMicroMissions: [
      'Pick one artwork that feels like us.',
      'Find one corner worth staying in a little longer.'
    ],
    imageLabel: 'Fondation light',
    imageDescription:
      'A refined placeholder suggesting modern art, glass architecture, and quiet museum light.',
    imageClasses: 'from-slate-100 via-white to-sky-100',
    visualStyle: 'glass',
    photoSlotId: 'fondation-louis-vuitton'
  },
  {
    id: 'louvre-slow-walk',
    order: 7,
    stampNumber: 'Stamp 07',
    icon: '🖼',
    title: 'Louvre — Slow Walk',
    location: 'Louvre',
    dateLabel: 'Friday, 24 April 2026',
    timeLabel: 'Late afternoon',
    period: 'Afternoon',
    dayId: 'day-3',
    dayLabel: 'Day 3',
    dayTitle: 'Art & Quiet Contrast',
    teaser: 'Not everything needs to be seen.',
    whySpecial:
      'The Louvre can overwhelm you. The trick is not to see everything, but to choose a little and see it properly.',
    mission: 'Skip the Mona Lisa. Find something better.',
    agendaText:
      'Not a checklist, not a speed run. Pick a few rooms, slow down, and let the museum feel smaller on purpose.',
    agendaMicroMissions: [],
    imageLabel: 'Louvre walk',
    imageDescription: 'A quiet placeholder for a slower Louvre moment.',
    imageClasses: 'from-stone-100 via-white to-amber-50',
    visualStyle: 'arch',
    photoSlotId: 'louvre-slow-walk'
  },
  {
    id: 'notre-dame-reflection',
    order: 8,
    stampNumber: 'Stamp 08',
    icon: '⛪',
    title: 'Notre-Dame — Return & Reflection',
    location: 'Notre-Dame',
    dateLabel: 'Saturday, 25 April 2026',
    timeLabel: 'Quiet morning',
    period: 'Morning',
    dayId: 'day-4',
    dayLabel: 'Day 4',
    dayTitle: 'Slow & Elegant',
    teaser: 'Still standing.',
    whySpecial:
      'History, rebuilding, and a rare kind of calm in the middle of the city. It has already had enough drama for one cathedral.',
    mission: 'Make a quiet wish you won’t say out loud.',
    agendaText:
      'A slower stop for perspective, quiet, and a little depth before the day turns elegant again. Paris already handled the dramatic chapter here; we only need the quiet one.',
    agendaMicroMissions: [],
    imageLabel: 'Notre-Dame',
    imageDescription: 'A dramatic placeholder for Notre-Dame and what came after the fire.',
    imageClasses: 'from-stone-200 via-white to-slate-100',
    visualStyle: 'cathedral',
    photoSlotId: 'notre-dame'
  },
  {
    id: 'paris-dinner',
    order: 9,
    stampNumber: 'Stamp 09',
    icon: '🍽️',
    title: 'Dinner — Somewhere Good',
    location: 'A restaurant we choose on the night',
    dateLabel: 'Saturday, 25 April 2026',
    timeLabel: 'Evening',
    period: 'Evening',
    dayId: 'day-4',
    dayLabel: 'Day 4',
    dayTitle: 'Slow & Elegant',
    teaser: 'A table, two glasses, and something worth staying for.',
    whySpecial:
      'Not reserved yet, which is part of the point. The best version of dinner is the one that suits the night we are actually having.',
    mission: 'Pick the place together and stay for dessert if it deserves it.',
    agendaText:
      'No rigid reservation. Just find somewhere warm, good, and worth lingering in.',
    agendaMicroMissions: [],
    imageLabel: 'Restaurant night',
    imageDescription: 'A warm restaurant placeholder for the final evening in Paris.',
    imageClasses: 'from-amber-100 via-stone-50 to-rose-100',
    visualStyle: 'salon',
    photoSlotId: 'restaurant-night'
  }
];
