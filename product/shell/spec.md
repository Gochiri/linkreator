# Application Shell Specification

## Overview
FocusAI uses a sidebar navigation pattern optimized for a productivity app with multiple functional areas. The shell provides persistent navigation, user menu, and a floating AI coach button accessible from any section.

## Navigation Structure
- **Tasks & Priorities** → Primary task management with Pareto prioritization
- **Goals & Planning** → SMART goals and RPM method
- **AI Coach** → Conversational coach and suggestions
- **Focus Mode** → Pomodoro sessions and focus tracking
- **Dashboard** → Productivity metrics and progress

## User Menu
- Location: Bottom of sidebar
- Contents: User avatar, display name, logout button
- Behavior: Shows user info inline (not dropdown)

## AI Coach Floating Button
- Location: Bottom-right corner, fixed position
- Purpose: Quick access to AI coach chat from any section
- Behavior: Opens chat overlay/modal without navigating away
- Icon: Bot/sparkle icon in violet accent

## Layout Pattern
- Sidebar width: 240px (expanded), 64px (collapsed)
- Content area: Fills remaining width
- Sidebar position: Fixed on left
- Content scrolls independently

## Responsive Behavior
- **Desktop (1024px+):** Full sidebar with labels and icons
- **Tablet (768px-1023px):** Collapsed sidebar with icons only, expandable on hover
- **Mobile (<768px):** Hidden sidebar, hamburger menu triggers slide-out drawer

## Design Notes
- Active nav item uses violet-600 background with white text
- Hover states use violet-100 (light) / violet-900 (dark)
- Sidebar background: slate-50 (light) / slate-900 (dark)
- Floating coach button: violet-600 with white icon, subtle shadow
- All transitions: 200ms ease for smooth interactions
