import { Check, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Template {
  id: string
  name: string
  bgColor: string
  textColor: string
  accentColor: string
  preview: string
}

interface TemplateStripProps {
  templates: Template[]
  activeTemplateId: string
  onSelectTemplate: (id: string) => void
}

export function TemplateStrip({
  templates,
  activeTemplateId,
  onSelectTemplate,
}: TemplateStripProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <Palette className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          Plantilla
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto py-1 px-1">
        {templates.map((tpl) => {
          const isActive = tpl.id === activeTemplateId
          return (
            <button
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              title={tpl.name}
              className={cn(
                'group relative flex-shrink-0 w-14 h-10 rounded-lg transition-all duration-150',
                'border-2 overflow-hidden',
                isActive
                  ? 'border-lime-500 dark:border-lime-400 shadow-md scale-105'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
              )}
              style={{ backgroundColor: tpl.bgColor }}
            >
              {/* Mini preview content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1 gap-0.5">
                <div
                  className="w-6 h-1 rounded-full"
                  style={{ backgroundColor: tpl.textColor, opacity: 0.5 }}
                />
                <div
                  className="w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: tpl.accentColor, opacity: 0.8 }}
                />
                <div
                  className="w-5 h-0.5 rounded-full"
                  style={{ backgroundColor: tpl.textColor, opacity: 0.25 }}
                />
              </div>

              {/* Active check */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Tooltip on hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {tpl.name}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
