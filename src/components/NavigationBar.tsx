import { MapPin, Clock, BarChart3, BookHeart } from 'lucide-react';
import { motion } from 'framer-motion';

export type Section = 'map' | 'timeline' | 'stats' | 'album';

interface NavigationBarProps {
  active: Section;
  onChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'map', label: 'Mapa', icon: <MapPin size={18} /> },
  { id: 'timeline', label: 'Historia', icon: <Clock size={18} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={18} /> },
  { id: 'album', label: 'Álbum', icon: <BookHeart size={18} /> },
];

const NavigationBar = ({ active, onChange }: NavigationBarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1100]">
      <div className="bg-card/80 backdrop-blur-2xl border-b border-border/30">
        <div className="max-w-lg mx-auto flex items-center justify-around py-1.5 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-300 min-w-[56px] ${
                active === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground/60 hover:text-foreground/80'
              }`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-primary/10 border border-primary/15"
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
