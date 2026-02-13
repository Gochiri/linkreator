'use client'

import { useState } from 'react'
import { Sparkles, AlertCircle, Type } from 'lucide-react'

interface SamplePost {
  id: string
  type: string
  content: string
  hashtags: string[]
  charCount: number
  tone: string
}

interface BrandTone {
  style: string
  traits: string[]
  rules: string[]
}

interface PostEditorProps {
  content: string
  onChange: (content: string) => void
  samplePosts: SamplePost[]
  activeType: string
  brandTone: BrandTone
  onGenerate: (post: SamplePost) => void
  maxChars?: number
}

const toneLabels: Record<string, { label: string; color: string }> = {
  direct: { label: 'Directo', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  storytelling: { label: 'Narrativo', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400' },
  framework: { label: 'Estructurado', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
  opinion: { label: 'Opinativo', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400' },
  'case-study': { label: 'Analítico', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' },
}

export function PostEditor({
  content,
  onChange,
  samplePosts,
  activeType,
  brandTone,
  onGenerate,
  maxChars = 3000,
}: PostEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const charCount = content.length
  const charPercentage = Math.min((charCount / maxChars) * 100, 100)
  const isNearLimit = charCount > maxChars * 0.9
  const isOverLimit = charCount > maxChars

  const matchingPost = samplePosts.find((p) => p.type === activeType)
  const currentTone = matchingPost?.tone || 'direct'
  const toneInfo = toneLabels[currentTone] || toneLabels.direct

  const handleGenerate = () => {
    if (matchingPost) {
      onGenerate(matchingPost)
    }
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Editor de post
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Tone badge */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${toneInfo.color}`}
          >
            {toneInfo.label}
          </span>
          {/* Style reference */}
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Estilo: {brandTone.style}
          </span>
        </div>
      </div>

      {/* Textarea container */}
      <div
        className={`
          relative rounded-xl border transition-all duration-200
          ${isFocused
            ? 'border-slate-400 dark:border-slate-500 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
            : 'border-slate-200 dark:border-slate-800'
          }
          bg-white dark:bg-slate-900
        `}
      >
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onChange(e.target.value)
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Escribe tu post de LinkedIn aquí...&#10;&#10;Tip: Empieza con un hook fuerte que capture la atención."
          className="w-full min-h-[280px] px-4 pt-4 pb-12 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none leading-relaxed"
          spellCheck
        />

        {/* Character counter bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 rounded-b-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 max-w-[200px]">
              <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${isOverLimit
                      ? 'bg-red-500'
                      : isNearLimit
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  style={{ width: `${charPercentage}%` }}
                />
              </div>
            </div>
            <span
              className={`text-xs font-mono tabular-nums ${isOverLimit
                  ? 'text-red-500 font-semibold'
                  : isNearLimit
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
            >
              {charCount.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Over limit warning */}
      {isOverLimit && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Has superado el límite de {maxChars.toLocaleString()} caracteres</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        {/* Brand tone rules hint */}
        <div className="hidden md:flex items-center gap-1.5 flex-wrap">
          {brandTone.traits.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!matchingPost}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4" />
          Generar ejemplo
        </button>
      </div>
    </div>
  )
}
