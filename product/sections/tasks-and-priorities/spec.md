# Tasks & Priorities Specification

## Overview
Gestión de tareas con priorización automática Pareto calculada por IA. Dos vistas principales: prioridad (destacando el 20% de alto impacto) y calendario (deadlines + bloques de trabajo). Sistema de dependencias entre tareas que bloquea el inicio de tareas vinculadas hasta que se completen las prerequisitos.

## User Flows
- Ver lista de tareas organizada por prioridad Pareto (alto impacto destacado arriba)
- Crear nueva tarea via modal/drawer
- Editar tarea existente
- Definir dependencias entre tareas (tarea A bloquea tarea B)
- Ver indicador de tareas bloqueadas por dependencias no completadas
- Cambiar entre vista prioridad y vista calendario
- Programar bloques de trabajo en el calendario
- Filtrar tareas por proyecto o etiquetas
- Acciones rápidas: completar, posponer, eliminar, duplicar, cambiar prioridad

## UI Requirements
- Vista prioridad con sección destacada "Alto Impacto" (20% Pareto) separada visualmente del resto
- Task cards completas con: título, prioridad, deadline, etiquetas, dependencias, meta vinculada, tiempo estimado, progreso, notas
- Indicador visual claro para tareas bloqueadas por dependencias
- Modal/drawer para crear y editar tareas con todos los campos
- Vista calendario mostrando deadlines + bloques de trabajo programados
- Sistema de filtrado por proyectos y etiquetas
- Quick actions accesibles directamente desde la lista sin abrir la tarea
- Prioridad Pareto calculada automáticamente por IA basándose en deadline, dependencias y descripción

## Configuration
- shell: true
