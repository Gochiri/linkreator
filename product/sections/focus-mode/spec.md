# Focus Mode Specification

## Overview
Sesiones de trabajo enfocado con técnica Pomodoro personalizable. Pantalla inmersiva durante sesiones activas con animaciones relajantes. La IA aprende patrones del usuario para sugerir duraciones óptimas.

## User Flows
- Iniciar sesión de foco desde esta sección (con o sin tarea asociada)
- Iniciar sesión de foco desde cualquier tarea en Tasks & Priorities
- Configurar duración de trabajo y descanso (personalizable)
- Ver pantalla inmersiva durante sesión activa con timer y animaciones
- Recibir notificación al terminar y elegir: tomar descanso o continuar
- Pausar o cancelar sesión en cualquier momento
- Ver estadísticas del día y racha de días consecutivos
- Explorar historial de sesiones en calendario visual

## UI Requirements
- Vista principal con botón prominente para iniciar sesión
- Selector de duración (presets sugeridos por IA + custom)
- Pantalla inmersiva semi-fullscreen durante sesión (oculta nav, muestra controles)
- Timer grande con animación de progreso
- Fondo con animaciones sutiles/relajantes
- Controles flotantes: pausar, cancelar, ver tarea
- Panel de estadísticas: tiempo de hoy, sesiones completadas, racha
- Calendario visual con historial de sesiones por día

## Configuration
- shell: true
