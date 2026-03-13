import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import NavigationBar, { type Section } from '@/components/NavigationBar';
import AdventureMap from '@/components/AdventureMap';
import Timeline from '@/components/Timeline';
import FutureAdventures from '@/components/FutureAdventures';
import TravelStats from '@/components/TravelStats';
import MemoryAlbum from '@/components/MemoryAlbum';
import {
  samplePlaces,
  sampleTimeline,
  sampleFutureAdventures,
} from '@/data/adventures';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('map');

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
        {activeSection === 'map' && <AdventureMap places={samplePlaces} />}
        {activeSection === 'timeline' && <Timeline events={sampleTimeline} />}
        {activeSection === 'adventures' && (
          <FutureAdventures adventures={sampleFutureAdventures} />
        )}
        {activeSection === 'stats' && <TravelStats places={samplePlaces} />}
        {activeSection === 'album' && <MemoryAlbum places={samplePlaces} />}
      </main>
    </div>
  );
};

export default Index;
