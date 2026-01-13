# Data Model

## Entities

### Task
Una tarea individual que representa una unidad de trabajo. Incluye prioridad Pareto (alto/medio/bajo impacto) calculada por la IA, estado de completado y fecha límite opcional. Es el elemento central del sistema de productividad.

### Goal
Un objetivo estructurado usando el framework SMART (Específico, Medible, Alcanzable, Relevante, con Tiempo definido) y/o el método RPM de Tony Robbins (Resultado deseado, Propósito emocional, Plan de Acción Masiva). Agrupa tareas relacionadas hacia un resultado mayor.

### FocusSession
Una sesión de trabajo usando la técnica Pomodoro. Registra duración, pausas tomadas, estado (completada, interrumpida, en progreso) y opcionalmente la tarea en la que se trabajó. Alimenta las métricas de tiempo en foco.

### CoachInteraction
Una interacción con el coach de IA. Puede ser un mensaje de chat del usuario, una respuesta de la IA, una sugerencia proactiva, una pregunta de reflexión, o una alerta de procrastinación detectada. Puede referenciar una tarea o meta específica.

### ProductivityMetrics
Datos agregados que alimentan el dashboard. Incluye score de productividad (diario/semanal), tiempo total en foco, tareas de alto impacto completadas, y progreso hacia metas. Se calcula a partir de las otras entidades.

## Relationships

- Goal has many Tasks (como parte del plan de acción)
- Task optionally belongs to Goal (puede ser independiente)
- FocusSession optionally links to Task (puede ser tiempo general)
- CoachInteraction can reference Task or Goal (contexto de la interacción)
- ProductivityMetrics aggregates from Tasks, FocusSessions, and Goals
