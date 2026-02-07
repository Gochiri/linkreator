import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Image,
  Type,
  Quote,
  BarChart2,
  MousePointer,
  Pencil,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SlideTypeOption {
  id: string
  label: string
  icon: string
}

interface SlideEditorProps {
  slideId: string
  slideNumber: number
  slideType: string
  title: string
  body: string
  slideTypes: SlideTypeOption[]
  onChangeType: (type: string) => void
  onChangeTitle: (title: string) => void
  onChangeBody: (body: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  image: Image,
  type: Type,
  quote: Quote,
  'bar-chart-2': BarChart2,
  'mouse-pointer': MousePointer,
}

export function SlideEditor({
  slideNumber,
  slideType,
  title,
  body,
  slideTypes,
  onChangeType,
  onChangeTitle,
  onChangeBody,
}: SlideEditorProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-lime-100 dark:bg-lime-900/40">
            <Pencil className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Propiedades
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Editando slide {slideNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Editor Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Slide Type */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Tipo de diapositiva
          </Label>
          <div className="grid grid-cols-1 gap-1.5">
            {slideTypes.map((st) => {
              const Icon = iconMap[st.icon] || Type
              const isActive = slideType === st.id
              return (
                <button
                  key={st.id}
                  onClick={() => onChangeType(st.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-sm',
                    isActive
                      ? 'bg-lime-100 dark:bg-lime-900/40 text-lime-800 dark:text-lime-200 font-medium'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      isActive
                        ? 'text-lime-600 dark:text-lime-400'
                        : 'text-slate-400 dark:text-slate-500'
                    )}
                  />
                  {st.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label
            htmlFor="slide-title"
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
          >
            Titulo
          </Label>
          <Input
            id="slide-title"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Titulo de la diapositiva..."
            className="text-sm"
          />
        </div>

        {/* Body */}
        <div className="space-y-2">
          <Label
            htmlFor="slide-body"
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
          >
            Contenido
          </Label>
          <textarea
            id="slide-body"
            value={body}
            onChange={(e) => onChangeBody(e.target.value)}
            placeholder="Escribe el contenido de la diapositiva..."
            rows={6}
            className={cn(
              'w-full rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-lime-500/30 focus:border-lime-500',
              'dark:bg-slate-800/30 resize-none leading-relaxed'
            )}
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Usa saltos de linea para separar parrafos
          </p>
        </div>
      </div>
    </div>
  )
}
