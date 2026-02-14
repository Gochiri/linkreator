import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Quote,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SlideData {
  id: string
  type: string
  title: string
  subtitle?: string
  body?: string
  slideNumber: number
}

export interface TemplateColors {
  bgColor: string
  textColor: string
  accentColor: string
}

interface SlideCanvasProps {
  slide: SlideData
  template: TemplateColors
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

function renderBodyWithBullets(body: string, textColor: string, accentColor: string) {
  const lines = body.split('\n').filter((l) => l.trim())
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        // Detect "Herramienta:" lines
        if (trimmed.toLowerCase().startsWith('herramienta:')) {
          return (
            <div
              key={i}
              className="flex items-center gap-2 mt-2 rounded-xl px-4 py-2.5"
              style={{ backgroundColor: `${accentColor}18` }}
            >
              <Sparkles
                className="w-4 h-4 flex-shrink-0"
                style={{ color: accentColor }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: accentColor }}
              >
                {trimmed}
              </span>
            </div>
          )
        }
        return (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{ color: textColor, opacity: 0.85 }}
          >
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}

export function SlideCanvas({
  slide,
  template,
  totalSlides,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: SlideCanvasProps) {
  const { bgColor, textColor, accentColor } = template

  return (
    <div className="relative flex items-center justify-center h-full p-4">
      {/* Prev Arrow */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={cn(
          'absolute left-2 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg',
          'border border-slate-200 dark:border-slate-700 transition-all',
          hasPrev
            ? 'hover:scale-110 hover:shadow-xl cursor-pointer text-slate-700 dark:text-slate-200'
            : 'opacity-30 cursor-not-allowed text-slate-400 dark:text-slate-600'
        )}
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slide Card - 4:5 aspect ratio */}
      <div
        className="relative w-full max-w-[400px] rounded-2xl shadow-2xl overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: bgColor,
        }}
      >
        {/* Subtle background decoration */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-8"
          style={{ backgroundColor: accentColor }}
        />

        {/* Slide Content */}
        <div className="relative h-full flex flex-col p-8">
          {/* Cover Slide */}
          {slide.type === 'cover' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {/* Decorative line */}
              <div
                className="w-12 h-1 rounded-full mb-8"
                style={{ backgroundColor: accentColor }}
              />
              <h1
                className="text-3xl font-bold leading-tight mb-5 tracking-tight"
                style={{ color: textColor }}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className="text-lg font-medium"
                  style={{ color: accentColor }}
                >
                  {slide.subtitle}
                </p>
              )}
              {/* Decorative dots */}
              <div className="flex gap-1.5 mt-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: accentColor,
                      opacity: 1 - i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Content Slide */}
          {slide.type === 'content' && (
            <div className="flex-1 flex flex-col">
              {/* Slide number accent */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {slide.slideNumber}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: `${textColor}15` }}
                />
              </div>

              <h2
                className="text-2xl font-bold leading-tight mb-5 tracking-tight"
                style={{ color: textColor }}
              >
                {slide.title}
              </h2>

              <div className="flex-1">
                {slide.body &&
                  renderBodyWithBullets(slide.body, textColor, accentColor)}
              </div>
            </div>
          )}

          {/* Quote Slide */}
          {slide.type === 'quote' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <Quote
                className="w-10 h-10 mb-6"
                style={{ color: accentColor, opacity: 0.6 }}
              />
              <h2
                className="text-2xl font-bold leading-tight italic mb-4"
                style={{ color: textColor }}
              >
                {slide.title}
              </h2>
              {slide.body && (
                <p
                  className="text-base"
                  style={{ color: textColor, opacity: 0.7 }}
                >
                  {slide.body}
                </p>
              )}
            </div>
          )}

          {/* Stats Slide */}
          {slide.type === 'stats' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h2
                className="text-5xl font-extrabold mb-4 tracking-tight"
                style={{ color: accentColor }}
              >
                {slide.title}
              </h2>
              {slide.body && (
                <p
                  className="text-lg leading-relaxed max-w-[80%]"
                  style={{ color: textColor, opacity: 0.8 }}
                >
                  {slide.body}
                </p>
              )}
            </div>
          )}

          {/* CTA Slide */}
          {slide.type === 'cta' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {/* Accent ring */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `${accentColor}20`,
                  border: `2px solid ${accentColor}`,
                }}
              >
                <ArrowRight
                  className="w-7 h-7"
                  style={{ color: accentColor }}
                />
              </div>

              <h2
                className="text-2xl font-bold leading-tight mb-4 tracking-tight"
                style={{ color: textColor }}
              >
                {slide.title}
              </h2>

              {slide.body && (
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: textColor, opacity: 0.75 }}
                >
                  {slide.body}
                </p>
              )}

              {/* CTA button visual */}
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: accentColor,
                  color: bgColor,
                }}
              >
                Seguir
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Bottom bar: slide indicator + branding */}
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === slide.slideNumber - 1 ? 16 : 6,
                    height: 6,
                    backgroundColor:
                      i === slide.slideNumber - 1
                        ? accentColor
                        : `${textColor}20`,
                  }}
                />
              ))}
            </div>
            <span
              className="text-[10px] font-medium uppercase tracking-widest"
              style={{ color: `${textColor}40` }}
            >
              LinKreator
            </span>
          </div>
        </div>
      </div>

      {/* Next Arrow */}
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={cn(
          'absolute right-2 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg',
          'border border-slate-200 dark:border-slate-700 transition-all',
          hasNext
            ? 'hover:scale-110 hover:shadow-xl cursor-pointer text-slate-700 dark:text-slate-200'
            : 'opacity-30 cursor-not-allowed text-slate-400 dark:text-slate-600'
        )}
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
