import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles } from 'lucide-react';
import type { Place, PlaceCategory } from '@/data/adventures';

interface AdventureMapProps {
  places: Place[];
}

const categoryConfig: Record<PlaceCategory, { color: string; glow: string; label: string; icon: string }> = {
  visited: { color: '#c5943a', glow: 'rgba(197,148,58,0.4)', label: 'Visitado', icon: '📍' },
  dreamed: { color: '#b35e8a', glow: 'rgba(179,94,138,0.4)', label: 'Soñado', icon: '💭' },
  special: { color: '#e8b34a', glow: 'rgba(232,179,74,0.5)', label: 'Especial', icon: '⭐' },
};

const createMarkerIcon = (category: PlaceCategory, emoji?: string) => {
  const config = categoryConfig[category];
  const isSpecial = category === 'special';
  const size = isSpecial ? 44 : 38;
  
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="marker-pin marker-${category}" style="
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, ${config.color}ee, ${config.color}aa);
      border: 2px solid rgba(255,255,255,0.25);
      display: flex; align-items: center; justify-content: center;
      font-size: ${isSpecial ? 20 : 17}px;
      box-shadow: 0 0 16px ${config.glow}, 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      position: relative;
    ">
      <span style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">${emoji || config.icon}</span>
      ${isSpecial ? `<div style="
        position: absolute; inset: -4px; border-radius: 50%;
        border: 1px solid ${config.color}44;
        animation: marker-pulse 2s ease-in-out infinite;
      "></div>` : ''}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const AdventureMap = ({ places }: AdventureMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [35, 10],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    places.forEach((place, index) => {
      setTimeout(() => {
        const marker = L.marker([place.lat, place.lng], {
          icon: createMarkerIcon(place.category, place.emoji),
        }).addTo(map);

        marker.on('click', () => setSelectedPlace(place));
      }, 300 + index * 250);
    });

    const visited = places
      .filter((p) => p.category === 'visited' && p.date)
      .sort((a, b) => (a.date! > b.date! ? 1 : -1));

    if (visited.length > 1) {
      const latlngs = visited.map((p) => [p.lat, p.lng] as [number, number]);
      setTimeout(() => {
        L.polyline(latlngs, {
          color: '#c5943a',
          weight: 1.5,
          opacity: 0.3,
          dashArray: '6 10',
        }).addTo(map);
      }, places.length * 250 + 500);
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [places]);

  return (
    <div className="relative w-full h-[calc(100vh-72px)] md:h-[calc(100vh-56px)]">
      <div ref={mapRef} className="w-full h-full" />

      {/* Legend */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-4 left-4 z-[1000] bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-3.5 text-sm space-y-2.5 shadow-2xl"
      >
        {Object.entries(categoryConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ background: val.color, boxShadow: `0 0 8px ${val.glow}` }}
            />
            <span className="text-cream/80 text-xs tracking-wide">{val.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Place detail card */}
      <AnimatePresence>
        {selectedPlace && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[999] md:hidden"
              onClick={() => setSelectedPlace(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-20 left-3 right-3 md:bottom-6 md:left-auto md:right-6 md:w-[380px] z-[1000]
                bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-5 shadow-2xl"
              style={{ boxShadow: `0 0 40px ${categoryConfig[selectedPlace.category].glow}, 0 20px 60px rgba(0,0,0,0.5)` }}
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: categoryConfig[selectedPlace.category].color + '20' }}>
                  {selectedPlace.emoji || '📍'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-cream leading-tight">
                    {selectedPlace.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedPlace.country}
                  </p>
                </div>
                {selectedPlace.isFavorite && (
                  <Star className="text-gold shrink-0" size={18} fill="currentColor" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium tracking-wide"
                  style={{
                    background: categoryConfig[selectedPlace.category].color + '20',
                    color: categoryConfig[selectedPlace.category].color,
                  }}
                >
                  {categoryConfig[selectedPlace.category].label}
                </span>
                {selectedPlace.date && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(selectedPlace.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                )}
              </div>

              {selectedPlace.note && (
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  {selectedPlace.note}
                </p>
              )}

              {selectedPlace.surpriseMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/50 border border-gold/15"
                >
                  <Sparkles className="text-gold shrink-0 mt-0.5" size={15} />
                  <p className="text-sm text-gold-light italic leading-relaxed">
                    {selectedPlace.surpriseMessage}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureMap;
