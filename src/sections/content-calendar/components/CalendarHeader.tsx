import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import type { ViewMode } from '../types'

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

interface CalendarHeaderProps {
  year: number
  month: number
  viewMode: ViewMode
  onPrevMonth: () => void
  onNextMonth: () => void
  onViewModeChange: (mode: ViewMode) => void
  onNewPost: () => void
}

export function CalendarHeader({
  year,
  month,
  viewMode,
  onPrevMonth,
  onNextMonth,
  onViewModeChange,
  onNewPost,
}: CalendarHeaderProps) {
  const monthName = MONTH_NAMES[month]

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Month navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition-colors"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 min-w-[180px] text-center">
          {monthName} {year}
        </h2>

        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition-colors"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Center: View mode toggle */}
      <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
        {(['week', 'month'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`
              px-4 py-1.5 text-sm font-medium rounded-lg transition-all
              ${viewMode === mode
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }
            `}
          >
            {mode === 'week' ? 'Semana' : 'Mes'}
          </button>
        ))}
      </div>

      {/* Right: New post button */}
      <button
        onClick={onNewPost}
        className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Nuevo post
      </button>
    </div>
  )
}
