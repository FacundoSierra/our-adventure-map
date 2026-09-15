# Nuestra Historia — mapa de aventuras

Plataforma privada de pareja para guardar y celebrar momentos compartidos: mapa de viajes y destinos, línea de tiempo de eventos, álbum de fotos y una carta de bienvenida.

Estado: proyecto personal en pausa. El contexto se completará al retomarlo.

## Stack
- React 18 + Vite + TypeScript, Tailwind CSS y shadcn/ui
- React Router 6, TanStack Query, Framer Motion
- Leaflet para el mapa
- Supabase: tablas `destinations` y `relationship_events`, y Storage para las fotos
- Vitest
- Proyecto iniciado con Lovable y después independizado

## Comandos
- Instalar: `npm ci` (las dependencias aún no están instaladas en este PC)
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: `npm test`

## Estructura
- `src/pages/Index.tsx`: aplicación principal
- `src/components/`: `AdventureMap`, `Timeline`, `MemoryAlbum`, `TravelStats`, `DestinationForm`, `EventForm`, `ImageUploader`, `ImageLightbox`, `LoveLetter`, `WelcomeScreen`, `OnboardingGuide` y `NavigationBar`
- `supabase/migrations/`

## Variables de entorno
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

## Reglas
- Contenido personal: no usar datos ni fotos reales en ejemplos o tests
- Commits en español y descriptivos
- Se trabaja desde Windows: no añadir dependencias ni archivos específicos de macOS
