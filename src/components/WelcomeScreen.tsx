import { motion } from 'framer-motion';
import { Heart, MapPin, Plane } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[15%] left-[20%] text-gold opacity-20"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Plane size={32} />
      </motion.div>
      <motion.div
        className="absolute top-[25%] right-[15%] text-rose opacity-20"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Heart size={28} />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[15%] text-gold-light opacity-15"
        animate={{ y: [-8, 8, -8], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <MapPin size={30} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center px-6 max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5, duration: 0.8 }}
          className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold"
        >
          <MapPin className="text-primary-foreground" size={36} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-3xl md:text-5xl font-display text-cream leading-tight mb-6"
        >
          Nuestro Mapa de Aventuras
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-gold-light leading-relaxed mb-10 font-light"
        >
          Este mapa cuenta la historia de nuestras aventuras
          <br />
          y de todas las que aún nos quedan por vivir ❤️
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="px-8 py-4 rounded-full gradient-gold text-primary-foreground font-semibold text-lg tracking-wide glow-gold transition-all duration-300 hover:shadow-lg"
        >
          Empezar nuestra aventura
        </motion.button>
      </motion.div>

      {/* Bottom shimmer line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 w-48 h-px shimmer"
      />
    </motion.div>
  );
};

export default WelcomeScreen;
