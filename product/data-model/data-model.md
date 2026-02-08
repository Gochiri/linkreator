# Data Model

## Entities

### Post
Contenido de texto generado para LinkedIn. Incluye el cuerpo del post, formato (tip, storytelling, opinión, caso de estudio), hashtags asociados y estado de publicación.

### Carousel
Conjunto de slides visuales diseñadas para publicar como carrusel en LinkedIn. Tiene un título, tema y plantilla de diseño aplicada.

### Slide
Diapositiva individual dentro de un carrusel. Contiene texto, imagen de fondo opcional y posición dentro del carrusel.

### Image
Imagen de apoyo generada para acompañar posts (quotes, estadísticas, portadas). Tiene un estilo visual y texto superpuesto.

### BrandProfile
Configuración del tono de marca del creador: voz, estilo de escritura (directo, minimalista, accionable), referencias de estilo (Dan Koe, Justin Welsh) y paleta visual.

### AudienceAvatar
Perfil del público objetivo. Define intereses, problemas, nivel profesional y motivaciones de la audiencia a la que se dirige el contenido.

### HashtagSet
Colección de hashtags agrupados por nicho o tema (IA, automatización, innovación). Permite reutilizar grupos de hashtags en múltiples posts.

### CalendarEntry
Publicación programada en el calendario de contenido. Vincula un post, carrusel o imagen a una fecha y hora específica.

### ContentSource
Referencia externa usada como inspiración: texto pegado, link de YouTube, artículo o cualquier fuente. Se transforma en ideas clave para generar contenido.

### CanvasNote
Nota en markdown guardada en el workspace de contenido. Tiene título, contenido, carpeta, tags y estado de favorito. Sirve como material de referencia para la creación de contenido.

### CanvasLink
Link de referencia guardado en el workspace. Tiene URL, título, descripción, carpeta y tags. Permite centralizar recursos externos relevantes.

### CanvasFolder
Carpeta para organizar notas y links en el workspace por tema o proyecto.

## Relationships

- BrandProfile tiene muchos Post, Carousel e Image (el tono se aplica a todo el contenido)
- AudienceAvatar pertenece a BrandProfile (la audiencia define el tono)
- Carousel tiene muchos Slide
- Slide pertenece a un Carousel
- Post tiene muchos HashtagSet
- CalendarEntry referencia un Post, Carousel o Image (contenido programado)
- ContentSource genera muchos Post (una fuente puede inspirar varios posts)
- CanvasFolder tiene muchos CanvasNote y CanvasLink
- CanvasNote pertenece a un CanvasFolder
- CanvasLink pertenece a un CanvasFolder
