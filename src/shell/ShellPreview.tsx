import { AppShell } from './components/AppShell'
import type { NavigationItem } from './components/MainNav'
import type { User } from './components/UserMenu'

export default function ShellPreview() {
  const navigationItems: NavigationItem[] = [
    { label: 'Tasks & Priorities', href: '/tasks', icon: 'CheckSquare', isActive: true },
    { label: 'Goals & Planning', href: '/goals', icon: 'Target' },
    { label: 'AI Coach', href: '/coach', icon: 'Bot' },
    { label: 'Focus Mode', href: '/focus', icon: 'Timer' },
    { label: 'Dashboard', href: '/dashboard', icon: 'BarChart3' },
  ]

  const user: User = {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
      onCoachClick={() => console.log('Open AI Coach')}
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Tasks & Priorities
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Gestión de tareas con priorización automática Pareto (80/20).
        </p>

        {/* Placeholder content */}
        <div className="grid gap-4">
          {[
            { title: 'Preparar presentación Q1', priority: 'high' },
            { title: 'Revisar propuesta de cliente', priority: 'high' },
            { title: 'Actualizar documentación', priority: 'medium' },
            { title: 'Responder emails pendientes', priority: 'low' },
          ].map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-amber-500'
                    : task.priority === 'medium'
                    ? 'bg-violet-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
              <span className="text-slate-900 dark:text-slate-100">{task.title}</span>
              {task.priority === 'high' && (
                <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                  Alto impacto
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
