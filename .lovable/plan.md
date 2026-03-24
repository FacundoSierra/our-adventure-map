

## Plan: Añadir selector de tipo al formulario de eventos y corregir etiqueta de aniversarios

### Problema 1: No se puede elegir tipo de evento
El formulario `EventForm` siempre guarda como `type: 'custom'`. El usuario quiere poder elegir entre "Evento" y "Hito" al crear/editar. Los aniversarios NO deben ser creables manualmente (se generan automáticamente cada 2 de abril).

### Problema 2: Aniversarios muestran "Hito" en vez de "Aniversario"
En `adventures.ts`, los aniversarios generados automáticamente tienen `type: 'milestone'`, pero la función `getEventType` los detecta por `id.startsWith('anniversary-')`. El problema es que los aniversarios de la BD tienen UUIDs, no IDs con prefijo `anniversary-`. Hay que usar el título o una lógica diferente para identificarlos.

### Cambios

**1. `src/components/EventForm.tsx`**
- Añadir un selector (radio o select) con dos opciones: "Evento personalizado" y "Hito importante"
- Pasar el `type` elegido en el `onSubmit` (cambiar la interfaz para incluir `type`)
- Cuando se edita, preseleccionar el tipo actual

**2. `src/hooks/useCustomEvents.ts`**
- Modificar la función `add` para aceptar el `type` del evento (`milestone` o `custom`) en lugar de hardcodear `'custom'`

**3. `src/data/adventures.ts`**
- En `getEventType`: detectar aniversarios por título (contiene "aniversario") en vez de por prefijo de ID, ya que los de BD usan UUID
- Los aniversarios generados dinámicamente por `getDefaultEvents` ya no se guardan en BD (se calculan en runtime), así que mantener la detección por ID para esos

**4. `src/components/Timeline.tsx`**
- Actualizar `onAddEvent` para pasar el tipo seleccionado

### Archivos a modificar
- `src/components/EventForm.tsx` — añadir selector de tipo (evento/hito)
- `src/hooks/useCustomEvents.ts` — aceptar tipo en `add`
- `src/data/adventures.ts` — mejorar detección de aniversarios en `getEventType`
- `src/components/Timeline.tsx` — pasar tipo al crear evento

