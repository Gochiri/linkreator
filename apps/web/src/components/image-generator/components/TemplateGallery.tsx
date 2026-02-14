import { cn } from '@/lib/utils'

export interface SampleImage {
  id: string
  type: string
  format: string
  text?: string
  author?: string
  headline?: string
  subtext?: string
  source?: string
  title?: string
  body?: string
  number?: string
  bgColor: string
  textColor: string
  accentColor: string
}

interface TemplateGalleryProps {
  templates: SampleImage[]
  activeTemplateId: string | null
  onSelect: (template: SampleImage) => void
}

function MiniQuotePreview({ template }: { template: SampleImage }) {
  return (
    <div
      className="w-full aspect-square rounded-lg flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: template.bgColor }}
    >
      <div
        className="w-6 h-0.5 rounded-full mb-2"
        style={{ backgroundColor: template.accentColor }}
      />
      <p
        className="text-[8px] leading-tight text-center font-medium line-clamp-3 px-2"
        style={{ color: template.textColor }}
      >
        {template.text}
      </p>
      <p
        className="text-[6px] mt-1.5 opacity-60"
        style={{ color: template.textColor }}
      >
        {template.author}
      </p>
    </div>
  )
}

function MiniStatPreview({ template }: { template: SampleImage }) {
  return (
    <div
      className="w-full aspect-[1.91/1] rounded-lg flex flex-col items-center justify-center p-3 relative overflow-hidden"
      style={{ backgroundColor: template.bgColor }}
    >
      <p
        className="text-lg font-black leading-none"
        style={{ color: template.accentColor }}
      >
        {template.headline}
      </p>
      <p
        className="text-[6px] leading-tight text-center mt-1 px-2 line-clamp-2 opacity-80"
        style={{ color: template.textColor }}
      >
        {template.subtext}
      </p>
      <p
        className="text-[5px] mt-1 opacity-40"
        style={{ color: template.textColor }}
      >
        {template.source}
      </p>
    </div>
  )
}

function MiniTipPreview({ template }: { template: SampleImage }) {
  return (
    <div
      className="w-full aspect-square rounded-lg flex flex-col items-start justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: template.bgColor }}
    >
      <div
        className="w-4 h-4 rounded-md flex items-center justify-center text-[6px] font-bold mb-1.5"
        style={{ backgroundColor: template.accentColor, color: template.bgColor }}
      >
        {template.number}
      </div>
      <p
        className="text-[7px] font-bold leading-tight"
        style={{ color: template.textColor }}
      >
        {template.title}
      </p>
      <p
        className="text-[6px] leading-tight mt-0.5 opacity-70 line-clamp-2"
        style={{ color: template.textColor }}
      >
        {template.body}
      </p>
    </div>
  )
}

function MiniCoverPreview({ template }: { template: SampleImage }) {
  return (
    <div
      className="w-full aspect-[1.91/1] rounded-lg flex flex-col items-center justify-center p-3 relative overflow-hidden"
      style={{ backgroundColor: template.bgColor }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${template.accentColor}, transparent 60%)`,
        }}
      />
      <p
        className="text-[7px] font-bold text-center leading-tight relative z-10 line-clamp-2 px-1"
        style={{ color: template.textColor }}
      >
        {template.text ?? template.title ?? 'Portada de artículo'}
      </p>
    </div>
  )
}

function MiniPreview({ template }: { template: SampleImage }) {
  switch (template.type) {
    case 'quote':
      return <MiniQuotePreview template={template} />
    case 'stat':
      return <MiniStatPreview template={template} />
    case 'tip-card':
      return <MiniTipPreview template={template} />
    case 'cover':
      return <MiniCoverPreview template={template} />
    default:
      return <MiniQuotePreview template={template} />
  }
}

export function TemplateGallery({ templates, activeTemplateId, onSelect }: TemplateGalleryProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-1">
        Plantillas
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => {
          const isActive = template.id === activeTemplateId
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={cn(
                'rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                isActive
                  ? 'border-lime-500 dark:border-lime-400 shadow-lg shadow-lime-500/20'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
              )}
            >
              <MiniPreview template={template} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
