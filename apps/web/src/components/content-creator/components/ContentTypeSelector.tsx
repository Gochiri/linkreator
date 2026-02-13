'use client'

import {
  Lightbulb,
  BookOpen,
  LayoutGrid,
  MessageCircle,
  BarChart3,
} from 'lucide-react'

interface ContentType {
  id: string
  label: string
  icon: string
  description: string
}

interface ContentTypeSelectorProps {
  contentTypes: ContentType[]
  activeType: string
  onSelect: (typeId: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lightbulb: Lightbulb,
  'book-open': BookOpen,
  'layout-grid': LayoutGrid,
  'message-circle': MessageCircle,
  'bar-chart': BarChart3,
}

const colorMap: Record<string, { bg: string; icon: string; activeBg: string; activeBorder: string }> = {
  tip: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    icon: 'text-amber-600 dark:text-amber-400',
    activeBg: 'bg-amber-50 dark:bg-amber-950/40',
    activeBorder: 'border-amber-400 dark:border-amber-500',
  },
  storytelling: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    icon: 'text-violet-600 dark:text-violet-400',
    activeBg: 'bg-violet-50 dark:bg-violet-950/40',
    activeBorder: 'border-violet-400 dark:border-violet-500',
  },
  framework: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    icon: 'text-blue-600 dark:text-blue-400',
    activeBg: 'bg-blue-50 dark:bg-blue-950/40',
    activeBorder: 'border-blue-400 dark:border-blue-500',
  },
  opinion: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    icon: 'text-rose-600 dark:text-rose-400',
    activeBg: 'bg-rose-50 dark:bg-rose-950/40',
    activeBorder: 'border-rose-400 dark:border-rose-500',
  },
  'case-study': {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    activeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    activeBorder: 'border-emerald-400 dark:border-emerald-500',
  },
}

export function ContentTypeSelector({ contentTypes, activeType, onSelect }: ContentTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Tipo de contenido
        </h3>
      </div>
      <div className="space-y-2">
        {contentTypes.map((type) => {
          const IconComponent = iconMap[type.icon] || Lightbulb
          const colors = colorMap[type.id] || colorMap.tip
          const isActive = activeType === type.id

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                w-full text-left px-3.5 py-3 rounded-xl border transition-all duration-200
                group cursor-pointer
                ${isActive
                  ? `${colors.activeBg} ${colors.activeBorder} shadow-sm`
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                    ${isActive ? colors.bg : 'bg-slate-100 dark:bg-slate-800 group-hover:' + colors.bg.split(' ')[0]}
                  `}
                >
                  <IconComponent
                    className={`w-4.5 h-4.5 transition-colors ${isActive ? colors.icon : 'text-slate-500 dark:text-slate-400'
                      }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium leading-tight ${isActive
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-slate-700 dark:text-slate-300'
                      }`}
                  >
                    {type.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
