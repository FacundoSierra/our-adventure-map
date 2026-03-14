import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import NavigationBar, { type Section } from '@/components/NavigationBar';
import AdventureMap from '@/components/AdventureMap';
import Timeline from '@/components/Timeline';
import TravelStats from '@/components/TravelStats';
import MemoryAlbum from '@/components/MemoryAlbum';
import { useDestinations } from '@/hooks/useDestinations';
import { sampleTimeline } from '@/data/adventures';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('map');
  const { destinations, add, update, remove } = useDestinations();

  if (showWelcome) {
    return (
      <AnimatePresence>
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mapa siempre visible de fondo */}
      <AdventureMap destinations={destinations} onAdd={add} onUpdate={update} onRemove={remove} />

      {/* Navegación flotante */}
      <NavigationBar active={activeSection} onChange={setActiveSection} />

      {/* Paneles overlay */}
      <AnimatePresence>
        {activeSection !== 'map' && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 z-30 overflow-y-auto bg-card/90 backdrop-blur-xl"
          >
            <button
              onClick={() => setActiveSection('map')}
              className="sticky top-3 right-3 z-40 float-right mr-3 mt-3 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
            {activeSection === 'timeline' && <Timeline events={sampleTimeline} />}
            {activeSection === 'stats' && <TravelStats destinations={destinations} />}
            {activeSection === 'album' && <MemoryAlbum destinations={destinations} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
