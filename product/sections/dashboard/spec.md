# Dashboard Specification

## Overview
Centro de métricas de productividad con score visual tipo gauge, progreso hacia metas, tiempo en foco, y elementos motivacionales. Permite ver datos de hoy, semana o mes. Incluye insights de la IA y cards de motivación.

## User Flows
- Ver score de productividad en gráfico circular (gauge)
- Cambiar período de visualización: Hoy / Semana / Mes
- Ver progreso hacia cada meta activa con porcentaje
- Revisar tiempo total en foco y sesiones completadas
- Ver tareas de alto impacto completadas vs pendientes
- Leer card de motivación diaria (frase + insight de IA)
- Ver logros/achievements desbloqueados
- Comparar rendimiento actual vs período anterior

## UI Requirements
- Toggle de período (Hoy/Semana/Mes) en header
- Gráfico circular grande con score de productividad (0-100)
- Grid de métricas: tiempo en foco, sesiones, tareas completadas
- Lista de metas con barras de progreso
- Card de motivación con frase inspiracional
- Sección de insights de IA (observaciones personalizadas)
- Mini-gráfico de tendencia (últimos 7 días)
- Badges/achievements ganados

## Configuration
- shell: true
