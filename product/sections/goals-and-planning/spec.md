# Goals & Planning Specification

## Overview
Sistema de gestión de metas con metodología SMART y framework RPM. Permite crear objetivos estructurados, definir su propósito y plan de acción, y crear tareas vinculadas para alcanzarlos. Vista principal en Kanban con 4 estados.

## User Flows
- Crear nueva meta con campos SMART (Específica, Medible, Alcanzable, Relevante, con Tiempo)
- Definir plan RPM dentro de la meta: Resultado esperado, Propósito/motivación, Plan de Acción Masiva
- Crear tareas directamente desde una meta (se sincronizan con Tasks & Priorities)
- Mover metas entre estados: Por iniciar → En progreso → Pausada → Completada
- Ver progreso de meta con barra de porcentaje + hitos importantes
- Cambiar entre vistas: Kanban (default), Timeline, Lista

## UI Requirements
- Vista Kanban con 4 columnas: Por iniciar, En progreso, Pausada, Completada
- Cards de meta con: título, progreso visual, fecha límite, etiquetas
- Vista detalle/modal con campos RPM (Resultado, Propósito, Acciones)
- Barra de progreso basada en tareas completadas + checklist de hitos
- Toggle para cambiar entre vistas (Kanban / Timeline / Lista)
- Vista Timeline mostrando metas ordenadas por fecha límite

## Configuration
- shell: true
