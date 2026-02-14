import { cn } from '@/lib/utils'

export interface SlideThumb {
  id: string
  type: string
  title: string
  slideNumber: number
}

interface SlideThumbListProps {
  slides: SlideThumb[]
  activeSlideId: string
  onSelectSlide: (id: string) => void
}

export function SlideThumbList({
  slides,
  activeSlideId,
  onSelectSlide,
}: SlideThumbListProps) {
  const activeIndex = slides.findIndex((s) => s.id === activeSlideId)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Diapositivas
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Slide {activeIndex + 1}/{slides.length}
        </p>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {slides.map((slide) => {
          const isActive = slide.id === activeSlideId
          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(slide.id)}
              className={cn(
                'w-full text-left rounded-xl p-3 transition-all duration-150 group',
                'border-2 relative',
                isActive
                  ? 'border-lime-500 bg-lime-50 dark:bg-lime-950/30 dark:border-lime-400 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
              )}
            >
              {/* Lime left accent bar for active */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-lime-500 dark:bg-lime-400" />
              )}

              {/* Slide number badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold',
                    isActive
                      ? 'bg-lime-500 text-white dark:bg-lime-400 dark:text-slate-900'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  )}
                >
                  {slide.slideNumber}
                </span>
                <span
                  className={cn(
                    'text-[10px] uppercase tracking-wider font-medium',
                    isActive
                      ? 'text-lime-700 dark:text-lime-300'
                      : 'text-slate-400 dark:text-slate-500'
                  )}
                >
                  {slide.type === 'cover'
                    ? 'Portada'
                    : slide.type === 'cta'
                      ? 'CTA'
                      : slide.type === 'quote'
                        ? 'Cita'
                        : slide.type === 'stats'
                          ? 'Estad.'
                          : 'Contenido'}
                </span>
              </div>

              {/* Title snippet */}
              <p
                className={cn(
                  'text-xs font-medium line-clamp-2 leading-relaxed pl-0.5',
                  isActive
                    ? 'text-slate-800 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-300'
                )}
              >
                {slide.title}
              </p>

              {/* Mini preview bar - simulates slide content */}
              <div className="mt-2 space-y-1 pl-0.5">
                <div
                  className={cn(
                    'h-1 rounded-full w-3/4',
                    isActive
                      ? 'bg-lime-300/60 dark:bg-lime-600/40'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                />
                <div
                  className={cn(
                    'h-1 rounded-full w-1/2',
                    isActive
                      ? 'bg-lime-300/40 dark:bg-lime-600/30'
                      : 'bg-slate-100 dark:bg-slate-700/60'
                  )}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
