import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}

const ImageLightbox = ({ images, index, onClose, onNav }: ImageLightboxProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && index < images.length - 1) onNav(index + 1);
      if (e.key === 'ArrowLeft' && index > 0) onNav(index - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, images.length, onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[3000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" onClick={onClose} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={() => onNav(index - 1)}
          className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={() => onNav(index + 1)}
          className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          className="relative z-10 max-w-[92vw] max-h-[88vh] object-contain rounded-xl"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.18 }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onNav(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === index ? '18px' : '6px',
                height: '6px',
                background: i === index ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImageLightbox;
