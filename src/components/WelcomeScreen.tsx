import { motion } from 'framer-motion';
import { Heart, MapPin, Plane, Sparkles, Star, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const FloatingParticle = ({ delay, x, y, children, size = 1 }: { delay: number; x: string; y: string; children: React.ReactNode; size?: number }) => (
  <motion.div
    className="absolute text-primary/10"
    style={{ left: x, top: y, fontSize: `${size}rem` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.25, 0.1, 0.25, 0],
      scale: [0.5, 1, 0.8, 1, 0.5],
      y: [-20, 20, -15, 10, -20],
      rotate: [0, 10, -5, 8, 0],
    }}
    transition={{ duration: 10, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, hsl(340 30% 12%), hsl(225 25% 8%) 60%, hsl(225 20% 5%))',
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2 }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(var(--pink)), transparent 65%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(var(--blue)), transparent 65%)' }} />
        <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(var(--pink-light)), transparent 65%)' }} />
      </div>

      {/* Stars field */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-cream/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        />
      ))}

      <FloatingParticle delay={0} x="10%" y="15%"><Plane size={22} /></FloatingParticle>
      <FloatingParticle delay={1.5} x="85%" y="20%"><Heart size={18} /></FloatingParticle>
      <FloatingParticle delay={0.8} x="15%" y="75%"><MapPin size={20} /></FloatingParticle>
      <FloatingParticle delay={2.2} x="80%" y="70%"><Star size={16} /></FloatingParticle>
      <FloatingParticle delay={3} x="50%" y="10%"><Sparkles size={14} /></FloatingParticle>
      <FloatingParticle delay={1} x="90%" y="45%"><Heart size={12} /></FloatingParticle>
      <FloatingParticle delay={2.8} x="5%" y="45%"><Globe size={16} /></FloatingParticle>
      <FloatingParticle delay={3.5} x="70%" y="85%"><Sparkles size={12} /></FloatingParticle>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="text-center px-8 max-w-xl relative z-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 80, delay: 0.5 }}
          className="mb-10 inline-flex items-center justify-center w-28 h-28 rounded-full relative"
        >
          <div className="absolute inset-0 rounded-full gradient-pink-blue opacity-90" />
          <div className="absolute inset-0 rounded-full animate-pulse-glow" />
          <div className="absolute -inset-3 rounded-full border border-primary/10 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          <MapPin className="text-white relative z-10" size={44} />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-20 h-px mx-auto mb-8 shimmer"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="text-5xl md:text-7xl font-display text-cream leading-tight mb-5 tracking-tight"
        >
          Nuestro Mapa
          <br />
          <span className="text-pink-accent italic">de Aventuras</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-base md:text-lg text-foreground/45 leading-relaxed mb-14 font-light max-w-sm mx-auto"
        >
          Un regalo hecho con amor para contar
          <br />
          la historia de nuestras aventuras juntos
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="group relative px-12 py-5 rounded-full overflow-hidden font-semibold text-lg tracking-wide transition-all duration-500 glow-pink"
          >
            <div className="absolute inset-0 gradient-pink-blue opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="relative z-10 text-white flex items-center gap-3">
              Empezar nuestra aventura
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={20} fill="currentColor" />
              </motion.span>
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="flex items-center gap-3 text-muted-foreground/30 text-xs tracking-widest uppercase"
          >
            <span className="w-8 h-px bg-current" />
            hecho con amor
            <span className="w-8 h-px bg-current" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="absolute bottom-10 w-64 h-px shimmer" />
    </motion.div>
  );
};

export default WelcomeScreen;
