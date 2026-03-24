import { MapPin, Clock, BarChart3, BookHeart } from 'lucide-react';
import { motion } from 'framer-motion';

export type Section = 'map' | 'timeline' | 'stats' | 'album';

interface NavigationBarProps {
  active: Section;
  onChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'map', label: 'Mapa', icon: <MapPin size={20} /> },
  { id: 'timeline', label: 'Historia', icon: <Clock size={20} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={20} /> },
  { id: 'album', label: 'Álbum', icon: <BookHeart size={20} /> },
];

const NavigationBar = ({ active, onChange }: NavigationBarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1100] safe-bottom">
      <div className="bg-card/85 backdrop-blur-2xl border-t border-border/20" style={{ boxShadow: '0 -8px 32px rgba(0,0,0,0.2)' }}>
        <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300 min-w-[60px] ${
                active === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground/50 hover:text-foreground/70'
              }`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--pink) / 0.12), hsl(var(--blue) / 0.08))',
                    border: '1px solid hsl(var(--primary) / 0.15)',
                  }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-[10px] font-semibold tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
