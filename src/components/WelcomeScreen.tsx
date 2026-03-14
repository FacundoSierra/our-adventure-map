import { motion } from 'framer-motion';
import { Heart, MapPin, Plane, Sparkles, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const FloatingParticle = ({ delay, x, y, children }: { delay: number; x: string; y: string; children: React.ReactNode }) => (
  <motion.div
    className="absolute text-primary/15"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.3, 0.15, 0.3, 0],
      scale: [0.5, 1, 0.8, 1, 0.5],
      y: [-20, 20, -15, 10, -20],
      rotate: [0, 10, -5, 8, 0],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(225 20% 12%), hsl(225 20% 5%))' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(var(--pink)), transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(var(--blue)), transparent 70%)' }} />
      </div>

      <FloatingParticle delay={0} x="12%" y="18%"><Plane size={24} /></FloatingParticle>
      <FloatingParticle delay={1.5} x="82%" y="22%"><Heart size={20} /></FloatingParticle>
      <FloatingParticle delay={0.8} x="18%" y="72%"><MapPin size={22} /></FloatingParticle>
      <FloatingParticle delay={2.2} x="78%" y="68%"><Star size={18} /></FloatingParticle>
      <FloatingParticle delay={3} x="50%" y="12%"><Sparkles size={16} /></FloatingParticle>
      <FloatingParticle delay={1} x="88%" y="48%"><Heart size={14} /></FloatingParticle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="text-center px-8 max-w-xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.5 }}
          className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-full relative"
        >
          <div className="absolute inset-0 rounded-full gradient-pink-blue opacity-90" />
          <div className="absolute inset-0 rounded-full animate-pulse-glow" />
          <MapPin className="text-white relative z-10" size={40} />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-16 h-px mx-auto mb-8 shimmer"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-4xl md:text-6xl font-display text-cream leading-tight mb-4 tracking-tight"
        >
          Nuestro Mapa
          <br />
          <span className="text-pink-accent italic">de Aventuras</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-base md:text-lg text-foreground/50 leading-relaxed mb-12 font-light max-w-md mx-auto"
        >
          Este mapa cuenta la historia de nuestras aventuras
          y de todas las que aún nos quedan por vivir
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="group relative px-10 py-4 rounded-full overflow-hidden font-semibold text-lg tracking-wide transition-all duration-500 glow-pink"
          >
            <div className="absolute inset-0 gradient-pink-blue opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-white flex items-center gap-2">
              Empezar nuestra aventura
              <Heart size={18} className="group-hover:scale-110 transition-transform" />
            </span>
          </motion.button>

          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-2xl">
            ❤️
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-10 w-64 h-px shimmer" />
    </motion.div>
  );
};

export default WelcomeScreen;
