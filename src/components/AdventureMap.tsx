import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, MapPin, Sparkles } from 'lucide-react';
import type { Place, PlaceCategory } from '@/data/adventures';

interface AdventureMapProps {
  places: Place[];
}

const categoryConfig: Record<PlaceCategory, { color: string; label: string; icon: string }> = {
  visited: { color: '#c5943a', label: 'Visitado', icon: '📍' },
  dreamed: { color: '#b35e8a', label: 'Soñado', icon: '💭' },
  special: { color: '#e8b34a', label: 'Especial', icon: '⭐' },
};

const createMarkerIcon = (category: PlaceCategory, emoji?: string) => {
  const config = categoryConfig[category];
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 36px; height: 36px;
      border-radius: 50%;
      background: ${config.color};
      border: 2px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      box-shadow: 0 0 12px ${config.color}66;
      cursor: pointer;
      transition: transform 0.2s;
    ">${emoji || config.icon}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const AdventureMap = ({ places }: AdventureMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [30, 10],
      zoom: 3,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    // Add markers with staggered animation
    places.forEach((place, index) => {
      setTimeout(() => {
        const marker = L.marker([place.lat, place.lng], {
          icon: createMarkerIcon(place.category, place.emoji),
        }).addTo(map);

        marker.on('click', () => setSelectedPlace(place));
      }, index * 200);
    });

    // Draw lines between visited places (sorted by date)
    const visited = places
      .filter((p) => p.category === 'visited' && p.date)
      .sort((a, b) => (a.date! > b.date! ? 1 : -1));

    if (visited.length > 1) {
      const latlngs = visited.map((p) => [p.lat, p.lng] as [number, number]);
      setTimeout(() => {
        L.polyline(latlngs, {
          color: '#c5943a',
          weight: 1.5,
          opacity: 0.4,
          dashArray: '8 8',
        }).addTo(map);
      }, places.length * 200 + 300);
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [places]);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] md:h-[calc(100vh-56px)]">
      <div ref={mapRef} className="w-full h-full rounded-none" />

      {/* Legend */}
      <div className="absolute top-4 right-4 z-[1000] card-romantic p-3 text-sm space-y-2">
        {Object.entries(categoryConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: val.color }}
            />
            <span className="text-cream text-xs">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Place detail modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[1000] card-romantic"
          >
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{selectedPlace.emoji || '📍'}</span>
              <div>
                <h3 className="font-display text-xl text-cream">
                  {selectedPlace.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {selectedPlace.country}
                </p>
              </div>
              {selectedPlace.isFavorite && (
                <Star className="text-gold ml-auto" size={18} fill="currentColor" />
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: categoryConfig[selectedPlace.category].color + '33',
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
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>

            {selectedPlace.note && (
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {selectedPlace.note}
              </p>
            )}

            {selectedPlace.surpriseMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-muted border border-gold/20"
              >
                <Sparkles className="text-gold shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-gold-light italic">
                  {selectedPlace.surpriseMessage}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureMap;
