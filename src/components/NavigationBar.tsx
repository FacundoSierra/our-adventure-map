import { MapPin, Clock, Compass, BarChart3, BookHeart } from 'lucide-react';
import { motion } from 'framer-motion';

export type Section = 'map' | 'timeline' | 'adventures' | 'stats' | 'album';

interface NavigationBarProps {
  active: Section;
  onChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'map', label: 'Mapa', icon: <MapPin size={20} /> },
  { id: 'timeline', label: 'Historia', icon: <Clock size={20} /> },
  { id: 'adventures', label: 'Próximas', icon: <Compass size={20} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={20} /> },
  { id: 'album', label: 'Álbum', icon: <BookHeart size={20} /> },
];

const NavigationBar = ({ active, onChange }: NavigationBarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-lg border-t border-gold/20 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-around py-2 md:py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors duration-200 ${
              active === item.id
                ? 'text-gold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {active === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-xl bg-muted"
                transition={{ type: 'spring', duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10 text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
