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
    <div className="min-h-screen bg-background">
      <NavigationBar active={activeSection} onChange={setActiveSection} />
      <main className="md:pt-0">
        {activeSection === 'map' && (
          <AdventureMap destinations={destinations} onAdd={add} onUpdate={update} onRemove={remove} />
        )}
        {activeSection === 'timeline' && <Timeline events={sampleTimeline} />}
        {activeSection === 'stats' && <TravelStats destinations={destinations} />}
        {activeSection === 'album' && <MemoryAlbum destinations={destinations} />}
      </main>
    </div>
  );
};

export default Index;
