import { cn } from '@/lib/utils'
import type { SampleImage } from './TemplateGallery'

export interface FormatSpec {
  id: string
  label: string
  width: number
  height: number
  ratio: string
}

interface ImageCanvasProps {
  image: SampleImage
  format: FormatSpec
  editedText: string
}

function QuoteCanvas({
  image,
  editedText,
}: {
  image: SampleImage
  editedText: string
}) {
  const displayText = editedText || image.text || ''
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[12%] py-[10%]">
      {/* Decorative top-left accent */}
      <div
        className="absolute top-[8%] left-[8%] w-16 h-16 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: image.accentColor }}
      />

      {/* Opening quotation mark */}
      <div
        className="text-6xl sm:text-7xl font-serif leading-none opacity-30 mb-4 select-none"
        style={{ color: image.accentColor }}
      >
        &ldquo;
      </div>

      {/* Accent line */}
      <div
        className="w-12 h-1 rounded-full mb-6"
        style={{ backgroundColor: image.accentColor }}
      />

      {/* Quote text */}
      <p
        className="text-center text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed tracking-tight"
        style={{ color: image.textColor }}
      >
        {displayText}
      </p>

      {/* Author */}
      {image.author && (
        <div className="mt-8 flex items-center gap-3">
          <div
            className="w-8 h-0.5 rounded-full"
            style={{ backgroundColor: image.accentColor, opacity: 0.5 }}
          />
          <p
            className="text-sm font-medium tracking-wide uppercase opacity-60"
            style={{ color: image.textColor }}
          >
            {image.author}
          </p>
          <div
            className="w-8 h-0.5 rounded-full"
            style={{ backgroundColor: image.accentColor, opacity: 0.5 }}
          />
        </div>
      )}

      {/* Decorative bottom-right accent */}
      <div
        className="absolute bottom-[8%] right-[8%] w-24 h-24 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: image.accentColor }}
      />
    </div>
  )
}

function StatCanvas({
  image,
  editedText,
}: {
  image: SampleImage
  editedText: string
}) {
  const displayHeadline = editedText || image.headline || ''
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[10%] py-[8%]">
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${image.accentColor}, transparent 70%)`,
        }}
      />

      {/* Top label */}
      <div
        className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6 opacity-80"
        style={{
          backgroundColor: `${image.accentColor}20`,
          color: image.accentColor,
          border: `1px solid ${image.accentColor}30`,
        }}
      >
        Dato clave
      </div>

      {/* Big number */}
      <p
        className="text-7xl sm:text-8xl md:text-9xl font-black leading-none tracking-tighter relative z-10"
        style={{ color: image.accentColor }}
      >
        {displayHeadline}
      </p>

      {/* Subtext */}
      {image.subtext && (
        <p
          className="text-center text-sm sm:text-base md:text-lg max-w-md mt-6 leading-relaxed opacity-80 font-light"
          style={{ color: image.textColor }}
        >
          {image.subtext}
        </p>
      )}

      {/* Accent divider */}
      <div
        className="w-16 h-0.5 rounded-full mt-6 opacity-40"
        style={{ backgroundColor: image.accentColor }}
      />

      {/* Source */}
      {image.source && (
        <p
          className="text-xs mt-4 opacity-40 font-medium tracking-wide"
          style={{ color: image.textColor }}
        >
          Fuente: {image.source}
        </p>
      )}
    </div>
  )
}

function TipCardCanvas({
  image,
  editedText,
}: {
  image: SampleImage
  editedText: string
}) {
  const displayBody = editedText || image.body || ''
  return (
    <div className="relative w-full h-full flex flex-col items-start justify-center px-[12%] py-[10%]">
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]"
        style={{
          background: `linear-gradient(135deg, ${image.accentColor}, transparent)`,
        }}
      />

      {/* Number badge */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black mb-6 shadow-lg"
        style={{
          backgroundColor: image.accentColor,
          color: image.bgColor,
          boxShadow: `0 8px 24px ${image.accentColor}40`,
        }}
      >
        {image.number}
      </div>

      {/* Title */}
      {image.title && (
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-50"
          style={{ color: image.textColor }}
        >
          {image.title}
        </p>
      )}

      {/* Body text */}
      <p
        className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight max-w-lg"
        style={{ color: image.textColor }}
      >
        {displayBody}
      </p>

      {/* Bottom accent line */}
      <div
        className="w-20 h-1.5 rounded-full mt-8"
        style={{ backgroundColor: image.accentColor }}
      />

      {/* Decorative dots */}
      <div className="absolute bottom-[10%] right-[10%] flex gap-1.5 opacity-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: image.accentColor }}
          />
        ))}
      </div>
    </div>
  )
}

function CoverCanvas({
  image,
  editedText,
}: {
  image: SampleImage
  editedText: string
}) {
  const displayText = editedText || image.text || image.title || 'Portada de artículo'
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[10%] py-[8%] overflow-hidden">
      {/* Multi-layer gradient background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `radial-gradient(circle at 20% 80%, ${image.accentColor}, transparent 50%), radial-gradient(circle at 80% 20%, ${image.accentColor}, transparent 50%)`,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${image.textColor} 1px, transparent 1px), linear-gradient(90deg, ${image.textColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top accent badge */}
      <div
        className="px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-8 relative z-10"
        style={{
          backgroundColor: `${image.accentColor}20`,
          color: image.accentColor,
          border: `1px solid ${image.accentColor}30`,
        }}
      >
        LinkedIn Article
      </div>

      {/* Main title */}
      <p
        className="text-center text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight max-w-xl relative z-10"
        style={{ color: image.textColor }}
      >
        {displayText}
      </p>

      {/* Bottom accent */}
      <div className="flex items-center gap-3 mt-8 relative z-10">
        <div
          className="w-10 h-0.5 rounded-full"
          style={{ backgroundColor: image.accentColor }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: image.accentColor, opacity: 0.6 }}
        />
        <div
          className="w-10 h-0.5 rounded-full"
          style={{ backgroundColor: image.accentColor }}
        />
      </div>
    </div>
  )
}

const aspectRatioMap: Record<string, string> = {
  landscape: 'aspect-[1.91/1]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
}

export function ImageCanvas({ image, format, editedText }: ImageCanvasProps) {
  const aspectClass = aspectRatioMap[format.id] ?? 'aspect-square'

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Canvas container */}
      <div
        className={cn(
          'relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/20 dark:shadow-black/40 ring-1 ring-stone-200/50 dark:ring-stone-700/50',
          aspectClass,
        )}
        style={{ backgroundColor: image.bgColor }}
      >
        {image.type === 'quote' && (
          <QuoteCanvas image={image} editedText={editedText} />
        )}
        {image.type === 'stat' && (
          <StatCanvas image={image} editedText={editedText} />
        )}
        {image.type === 'tip-card' && (
          <TipCardCanvas image={image} editedText={editedText} />
        )}
        {image.type === 'cover' && (
          <CoverCanvas image={image} editedText={editedText} />
        )}
      </div>

      {/* Dimensions badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full">
        <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
          {format.width} &times; {format.height}
        </span>
        <span className="text-[10px] text-stone-400 dark:text-stone-500">
          ({format.ratio})
        </span>
      </div>
    </div>
  )
}
