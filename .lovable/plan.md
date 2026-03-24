

## Plan: Migrar datos de localStorage a Lovable Cloud (base de datos)

### Problema
Actualmente todos los destinos y eventos se guardan en `localStorage`, lo que significa que se pierden al cambiar de navegador/dispositivo y pueden variar entre sesiones. Queremos que los datos sean permanentes y consistentes.

### Cambios

**1. Crear tablas en la base de datos**

Dos tablas sin autenticación (acceso público por ahora, se puede añadir auth después):

- **`destinations`**: `id` (uuid PK), `city`, `country`, `type` (visited/wishlist), `lat`, `lng`, `date`, `note`, `emoji`, `created_at`
- **`relationship_events`**: `id` (uuid PK), `date`, `title`, `description`, `emoji`, `type` (milestone/custom), `created_at`

RLS desactivado o con política permisiva (SELECT/INSERT/UPDATE/DELETE para todos) ya que no hay autenticación implementada. Se podrá restringir después al añadir auth.

Insertar los hitos por defecto (Empezó todo, Inicio relación, aniversarios hasta la fecha) como seed en la tabla `relationship_events`.

**2. Reescribir `useDestinations.ts`**

- Reemplazar localStorage por queries a la tabla `destinations` usando el cliente Supabase
- `useState` + `useEffect` para cargar datos al montar
- `add`/`update`/`remove` hacen operaciones contra la BD y actualizan el estado local

**3. Reescribir `useCustomEvents.ts`**

- Reemplazar localStorage por queries a la tabla `relationship_events`
- Eliminar la lógica de seed version / localStorage
- Los hitos base ya estarán en la BD desde la migración inicial
- Los aniversarios se siguen generando dinámicamente en `buildTimeline` (no se guardan en BD, se calculan en runtime)

**4. Sin cambios en componentes**

Los componentes (`AdventureMap`, `Timeline`, `TravelStats`, `MemoryAlbum`, `Index`) no necesitan cambios ya que consumen los hooks que mantendrán la misma interfaz (`destinations`, `add`, `update`, `remove`).

### Archivos afectados
- Nueva migración SQL (2 tablas + seed de eventos base)
- `src/hooks/useDestinations.ts` — reescribir con Supabase
- `src/hooks/useCustomEvents.ts` — reescribir con Supabase

