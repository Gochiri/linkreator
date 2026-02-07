import { Monitor, Square, Smartphone, Download, Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { FormatSpec } from './ImageCanvas'

export interface BrandColor {
  name: string
  value: string
}

interface ImageControlsProps {
  formats: FormatSpec[]
  activeFormatId: string
  onFormatChange: (formatId: string) => void
  brandColors: BrandColor[]
  activeBgColor: string
  onBgColorChange: (color: string) => void
  editedText: string
  onTextChange: (text: string) => void
  onDownload: () => void
}

const formatIcons: Record<string, React.ReactNode> = {
  landscape: <Monitor className="size-4" />,
  square: <Square className="size-3.5" />,
  portrait: <Smartphone className="size-4" />,
}

export function ImageControls({
  formats,
  activeFormatId,
  onFormatChange,
  brandColors,
  activeBgColor,
  onBgColorChange,
  editedText,
  onTextChange,
  onDownload,
}: ImageControlsProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-5">
      {/* Format selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Formato
        </label>
        <div className="flex gap-2">
          {formats.map((fmt) => {
            const isActive = fmt.id === activeFormatId
            return (
              <button
                key={fmt.id}
                onClick={() => onFormatChange(fmt.id)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all duration-200',
                  isActive
                    ? 'border-lime-500 dark:border-lime-400 bg-lime-50 dark:bg-lime-950/30 text-stone-900 dark:text-stone-100'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                )}
              >
                {formatIcons[fmt.id] ?? <Square className="size-4" />}
                <span className="text-xs font-medium">{fmt.label}</span>
                <span className="text-[10px] font-mono opacity-60">
                  {fmt.width}&times;{fmt.height}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Color palette */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Color de fondo
        </label>
        <div className="flex items-center gap-2">
          {brandColors.map((color) => {
            const isActive = color.value === activeBgColor
            return (
              <button
                key={color.value}
                onClick={() => onBgColorChange(color.value)}
                title={color.name}
                className={cn(
                  'w-9 h-9 rounded-xl border-2 transition-all duration-200 hover:scale-110 active:scale-95 relative',
                  isActive
                    ? 'border-lime-500 dark:border-lime-400 ring-2 ring-lime-500/30 scale-110'
                    : 'border-stone-200 dark:border-stone-600'
                )}
                style={{ backgroundColor: color.value }}
              >
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        borderColor:
                          color.value === '#FAFAF9' || color.value === '#F8FAFC'
                            ? '#1C1917'
                            : '#FAFAF9',
                      }}
                    />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Text editor */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          <Type className="size-3" />
          Texto principal
        </label>
        <Input
          value={editedText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Escribe tu texto aquí..."
          className="rounded-xl"
        />
      </div>

      {/* Download button */}
      <Button
        onClick={onDownload}
        className="w-full rounded-xl h-11 bg-lime-600 hover:bg-lime-700 text-white font-semibold gap-2 shadow-lg shadow-lime-600/20 transition-all duration-200 hover:shadow-xl hover:shadow-lime-600/30"
      >
        <Download className="size-4" />
        Descargar imagen
      </Button>
    </div>
  )
}
