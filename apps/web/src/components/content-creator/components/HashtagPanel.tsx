'use client'

import { Hash, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface HashtagPanelProps {
  suggestedHashtags: Record<string, string[]>
  selectedHashtags: string[]
  onToggleHashtag: (hashtag: string) => void
}

const categoryLabels: Record<string, string> = {
  automatizacion: 'Automatización',
  ia: 'Inteligencia Artificial',
  innovacion: 'Innovación',
  emprendimiento: 'Emprendimiento',
  productividad: 'Productividad',
}

const categoryColors: Record<string, string> = {
  automatizacion: 'bg-blue-500',
  ia: 'bg-violet-500',
  innovacion: 'bg-emerald-500',
  emprendimiento: 'bg-amber-500',
  productividad: 'bg-rose-500',
}

export function HashtagPanel({
  suggestedHashtags,
  selectedHashtags,
  onToggleHashtag,
}: HashtagPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyHashtags = async () => {
    if (selectedHashtags.length === 0) return
    const text = selectedHashtags.join(' ')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for environments without clipboard API
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Hashtags
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
          {selectedHashtags.length} seleccionados
        </span>
      </div>

      {/* Categories */}
      <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 scrollbar-thin">
        {Object.entries(suggestedHashtags).map(([category, hashtags]) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-slate-400'}`}
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {categoryLabels[category] || category}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((hashtag) => {
                const isSelected = selectedHashtags.includes(hashtag)
                return (
                  <button
                    key={hashtag}
                    onClick={() => onToggleHashtag(hashtag)}
                    className={`
                      px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150
                      cursor-pointer select-none active:scale-95
                      ${isSelected
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {hashtag}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Copy button */}
      {selectedHashtags.length > 0 && (
        <button
          onClick={handleCopyHashtags}
          className={`
            w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium
            transition-all duration-200 active:scale-[0.98]
            ${copied
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copiados al portapapeles
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copiar hashtags
            </>
          )}
        </button>
      )}
    </div>
  )
}
