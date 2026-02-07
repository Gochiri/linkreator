import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
  isActive?: boolean
}

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <ul className="space-y-1 px-3">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <li key={item.href}>
            <button
              onClick={() => onNavigate?.(item.href)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium transition-colors duration-200
                ${
                  item.isActive
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
