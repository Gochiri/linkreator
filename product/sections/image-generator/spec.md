# Image Generator Specification

## Overview
Generador de imágenes de apoyo para posts de LinkedIn. Ofrece dos métodos: usar plantillas editables prediseñadas o generar imágenes únicas con IA (Imagen 3 de Google). Crea quotes visuales, tarjetas con estadísticas, portadas para artículos y gráficos personalizados alineados con la marca personal.

## User Flows

**Método 1: Plantillas Editables**
- Seleccionar tipo de imagen (quote, estadística, portada, tip visual)
- Elegir plantilla de la galería
- Editar elementos: texto, fuentes, tamaños, colores, layout
- Agregar o quitar elementos según necesidad
- Previsualizar la imagen en formato LinkedIn
- Descargar en formato optimizado (1200x627, 1080x1080, o 1080x1350)

**Método 2: Generación con IA**
- Escribir un prompt describiendo la imagen deseada
- Generar imagen con Imagen 3 de Google
- Opción A: Usar imagen tal cual
- Opción B: Editar la imagen generada (agregar texto, ajustar colores, overlay de marca)
- Previsualizar en formato LinkedIn
- Descargar en formato optimizado

## UI Requirements
- Selector de método (Plantillas / Generar con IA)
- Galería de plantillas organizadas por tipo
- Input de prompt para generación con IA
- Editor completo con controles para:
  - Texto (contenido, fuente, tamaño, posición)
  - Colores (fondo, texto, acentos)
  - Layout (alineación, espaciado, disposición)
  - Elementos (agregar/quitar/duplicar)
- Vista previa a escala real
- Selector de formato (landscape 1200x627, square 1080x1080, portrait 1080x1350)
- Paleta de colores de marca pre-cargada
- Botón de descarga con opciones de formato
- Diseño limpio con foco en la vista previa

## Configuration
- shell: true
