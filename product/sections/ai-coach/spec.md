# AI Coach Specification

## Overview
Panel lateral derecho colapsable con un coach de IA conversacional. Accesible globalmente desde cualquier sección mediante botón flotante. Permite conversar, ejecutar acciones en la app, recibir sugerencias proactivas y hacer check-ins de reflexión diarios.

## User Flows
- Abrir/cerrar panel del coach mediante botón flotante (accesible desde toda la app)
- Conversar con la IA para pedir consejos, hacer preguntas o reflexionar
- Ejecutar acciones desde el chat: crear tareas, iniciar focus mode, marcar tareas completadas
- Recibir sugerencias proactivas (cards destacadas + mensajes + badge en botón)
- Ver alertas de procrastinación con mensaje empático y contexto de la tarea evitada
- Responder check-in matutino ("¿Cuál es tu prioridad #1 hoy?")
- Completar reflexión vespertina ("¿Qué lograste? ¿Qué aprendiste?")

## UI Requirements
- Panel lateral derecho colapsable (slide-in/out)
- Botón flotante (FAB) con badge para indicar sugerencias pendientes
- Interfaz de chat con burbujas de mensaje (usuario vs IA)
- Cards de sugerencia proactiva arriba del historial de chat
- Input de texto con botón enviar
- Indicador de "escribiendo..." cuando la IA responde
- Acciones rápidas sugeridas (chips/botones bajo mensajes de IA)

## Configuration
- shell: true
