import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import LoveLetter from '@/components/LoveLetter';
import NavigationBar, { type Section } from '@/components/NavigationBar';
import AdventureMap from '@/components/AdventureMap';
import Timeline from '@/components/Timeline';
import TravelStats from '@/components/TravelStats';
import MemoryAlbum from '@/components/MemoryAlbum';
import OnboardingGuide from '@/components/OnboardingGuide';
import ImageLightbox from '@/components/ImageLightbox';
import { useDestinations } from '@/hooks/useDestinations';
import { useCustomEvents } from '@/hooks/useCustomEvents';
import { buildTimeline, getDefaultEvents } from '@/data/adventures';

const ONBOARDING_KEY = 'hasSeenOnboarding';
const LOVE_LETTER_KEY = 'loveLetterSeen';

const Index = () => {
  const [showLoveLetter, setShowLoveLetter] = useState(!localStorage.getItem(LOVE_LETTER_KEY));
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('map');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [showLetter, setShowLetter] = useState(false);

  const { destinations, add, update, remove } = useDestinations();
  const { events: customEvents, add: addEvent, update: updateEvent, remove: removeEvent } = useCustomEvents();

  const timelineEvents = useMemo(
    () => buildTimeline(destinations, [...getDefaultEvents(), ...customEvents]),
    [destinations, customEvents]
  );

  const handleStart = () => {
    setShowWelcome(false);
    if (!localStorage.getItem(ONBOARDING_KEY)) setShowOnboarding(true);
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

  if (showLoveLetter) {
    return (
      <AnimatePresence>
        <LoveLetter
          key="love-letter"
          onClose={() => {
            localStorage.setItem(LOVE_LETTER_KEY, 'true');
            setShowLoveLetter(false);
          }}
        />
      </AnimatePresence>
    );
  }

  if (showWelcome) {
    return (
      <AnimatePresence>
        <WelcomeScreen onStart={handleStart} />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <AdventureMap destinations={destinations} onAdd={add} onUpdate={update} onRemove={remove} />
      <NavigationBar
        active={activeSection}
        onChange={setActiveSection}
        onHelp={() => setShowOnboarding(true)}
        onLetter={() => setShowLetter(true)}
      />

      <AnimatePresence>
        {activeSection !== 'map' && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 z-[1050] overflow-y-auto bg-card/90 backdrop-blur-xl pb-20"
          >
            <button
              onClick={() => setActiveSection('map')}
              className="sticky top-3 right-3 z-40 float-right mr-3 mt-3 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
            {activeSection === 'timeline' && (
              <Timeline
                events={timelineEvents}
                onAddEvent={addEvent}
                onUpdateEvent={updateEvent}
                onRemoveEvent={removeEvent}
                destinations={destinations}
                onAddDestination={add}
                onUpdateDestination={update}
                onRemoveDestination={remove}
              />
            )}
            {activeSection === 'stats' && <TravelStats destinations={destinations} />}
            {activeSection === 'album' && (
              <MemoryAlbum
                destinations={destinations}
                onOpenLightbox={(images, index) => setLightbox({ images, index })}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox — fuera del panel scrollable para evitar bug de posición */}
      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onNav={index => setLightbox(prev => prev ? { ...prev, index } : null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOnboarding && <OnboardingGuide onClose={handleCloseOnboarding} />}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && (
          <LoveLetter key="letter-modal" startOpen onClose={() => setShowLetter(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
