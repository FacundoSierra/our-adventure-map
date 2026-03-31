# 💌 Nuestra Historia — Mapa de Aventuras

Una plataforma privada para guardar y celebrar los momentos de nuestra relación: viajes, eventos, fotos y recuerdos.

---

## Stack tecnológico

- **React + TypeScript + Vite** — frontend
- **Tailwind CSS + shadcn/ui** — estilos y componentes
- **Framer Motion** — animaciones
- **Leaflet.js** — mapa interactivo
- **Supabase** — base de datos (PostgreSQL) y almacenamiento de fotos

## Arrancar en local

```sh
npm install
npm run dev
# Abre http://localhost:8080
```

Para ver la carta de aniversario de nuevo:
```js
// En la consola del navegador (DevTools)
localStorage.removeItem('loveLetterSeen')
```

---

## Roadmap — Ideas de mejora

### Prioridad alta

- [ ] **Modo offline / PWA** — instalar la app en el móvil como si fuera nativa, que funcione sin conexión con sincronización posterior
- [ ] **Notificaciones de aniversario** — alerta automática cuando llega el aniversario o fechas especiales marcadas en la timeline
- [ ] **Búsqueda en la timeline** — filtrar eventos por año, tipo o palabra clave
- [ ] **Más fotos por destino** — subir el límite de 10 fotos o hacer que sea configurable por viaje

### Experiencia de usuario

- [ ] **Reordenar fotos** — drag & drop para cambiar el orden de las fotos dentro de un destino
- [ ] **Zoom suave en el mapa** — animar la transición al abrir el mapa por primera vez haciendo un tour por todos los destinos
- [ ] **Modo presentación** — vista de pantalla completa que hace slideshow automático de todos los destinos con sus fotos, ideal para enseñarlo en una TV
- [ ] **Estadísticas ampliadas** — kilómetros recorridos totales, país más visitado, mes favorito para viajar, racha de viajes
- [ ] **Etiquetas / categorías** — poder etiquetar eventos (primera vez, favorito, espontáneo...) y filtrar por ellas
- [ ] **Notas de voz** — grabar un audio corto asociado a un viaje o evento

### Contenido y personalización

- [ ] **Cartas por aniversario** — sistema para escribir una nueva carta cada año y poder releerlas todas
- [ ] **Bucket list con progreso** — lista de cosas que queréis hacer/visitar con porcentaje de completado
- [ ] **Canciones del momento** — asociar una canción de Spotify a cada viaje o evento (con preview)
- [ ] **Clima de los viajes** — mostrar qué tiempo hacía en cada destino en la fecha del viaje (API meteorológica histórica)
- [ ] **Mapa de calor** — overlay en el mapa que muestra las zonas más visitadas

### Técnico

- [ ] **Almacenamiento local de fotos** — guardar las fotos en `public/travel-images/` en vez de Supabase Storage (plan detallado ya redactado, listo para implementar)
- [ ] **Backup automático** — exportar todos los datos y fotos en un ZIP descargable
- [ ] **Múltiples álbumes** — organizar las fotos por categorías además de por destino (cumpleaños, navidades, días especiales...)
- [ ] **Historial de cambios** — poder ver cuándo se añadió cada recuerdo

---

## Secciones actuales

| Sección | Descripción |
|---|---|
| 🗺️ **Mapa** | Mapa interactivo con marcadores para visitados y wishlist. Fotos de portada como marcador circular. |
| 📅 **Historia** | Timeline cronológica con aniversarios automáticos, eventos personalizados e hitos. |
| 📊 **Stats** | Estadísticas de viajes: países, continentes, tipo de destinos. |
| 📸 **Álbum** | Galería de recuerdos con fotos por destino, lightbox y frases románticas. |
| 💌 **Carta** | Carta de amor del 4º aniversario, siempre accesible desde la barra de navegación. |
