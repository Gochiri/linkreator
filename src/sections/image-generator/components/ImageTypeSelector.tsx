import { Quote, TrendingUp, FileText, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ImageType {
  id: string
  label: string
  icon: string
  description: string
}

interface ImageTypeSelectorProps {
  types: ImageType[]
  activeType: string
  onSelect: (typeId: string) => void
}

const iconMap: Record<string, React.ReactNode> = {
  quote: <Quote className="size-4" />,
  'trending-up': <TrendingUp className="size-4" />,
  'file-text': <FileText className="size-4" />,
  zap: <Zap className="size-4" />,
}

export function ImageTypeSelector({ types, activeType, onSelect }: ImageTypeSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/60 rounded-xl">
      {types.map((type) => {
        const isActive = type.id === activeType
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-white/50 dark:hover:bg-stone-700/40'
            )}
          >
            <span className={cn(
              'transition-colors',
              isActive ? 'text-lime-600 dark:text-lime-400' : ''
            )}>
              {iconMap[type.icon] ?? <FileText className="size-4" />}
            </span>
            <span>{type.label}</span>
          </button>
        )
      })}
    </div>
  )
}
