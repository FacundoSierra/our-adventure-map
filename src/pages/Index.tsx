import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import NavigationBar, { type Section } from '@/components/NavigationBar';
import AdventureMap from '@/components/AdventureMap';
import Timeline from '@/components/Timeline';
import TravelStats from '@/components/TravelStats';
import MemoryAlbum from '@/components/MemoryAlbum';
import OnboardingGuide from '@/components/OnboardingGuide';
import { useDestinations } from '@/hooks/useDestinations';
import { useCustomEvents } from '@/hooks/useCustomEvents';
import { buildTimeline } from '@/data/adventures';
import { HelpCircle } from 'lucide-react';

const ONBOARDING_KEY = 'hasSeenOnboarding';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('map');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { destinations, add, update, remove } = useDestinations();
  const { events: customEvents, add: addEvent, update: updateEvent, remove: removeEvent } = useCustomEvents();

  const timelineEvents = useMemo(
    () => buildTimeline(destinations, customEvents),
    [destinations, customEvents]
  );

  const handleStart = () => {
    setShowWelcome(false);
    const hasSeen = localStorage.getItem(ONBOARDING_KEY);
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

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
      <NavigationBar active={activeSection} onChange={setActiveSection} />

      {/* Help button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', damping: 20 }}
        onClick={() => setShowOnboarding(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="fixed top-4 right-4 z-[1090] w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors"
        style={{
          background: 'hsl(var(--card) / 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid hsl(var(--border) / 0.3)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
        title="Abrir guía"
      >
        <HelpCircle size={17} />
      </motion.button>

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
            {activeSection === 'album' && <MemoryAlbum destinations={destinations} />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingGuide onClose={handleCloseOnboarding} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
