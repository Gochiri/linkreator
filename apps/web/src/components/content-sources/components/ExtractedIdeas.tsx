'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, Sparkles, BookmarkPlus } from 'lucide-react'

interface ExtractedIdeasProps {
  ideas: string[]
  onCreatePost: (selectedIdeas: string[]) => void
  onSave: () => void
}

export function ExtractedIdeas({ ideas, onCreatePost, onSave }: ExtractedIdeasProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleIdea = (index: number) => {
    const next = new Set(selected)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setSelected(next)
  }

  const selectedIdeas = ideas.filter((_, i) => selected.has(i))

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Ideas extraidas
          </h3>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {selected.size} de {ideas.length} seleccionadas
        </span>
      </div>

      {/* Ideas list */}
      <div className="p-3">
        <div className="space-y-1">
          {ideas.map((idea, i) => {
            const isSelected = selected.has(i)
            return (
              <button
                key={i}
                onClick={() => toggleIdea(i)}
                className={`
                  w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all
                  ${isSelected
                    ? 'bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-800'
                    : 'hover:bg-stone-50 dark:hover:bg-stone-800/50 border border-transparent'
                  }
                `}
              >
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-300 dark:text-stone-600 shrink-0 mt-0.5" />
                )}
                <span className={`
                  text-sm leading-relaxed
                  ${isSelected
                    ? 'text-stone-900 dark:text-stone-100 font-medium'
                    : 'text-stone-600 dark:text-stone-400'
                  }
                `}>
                  {idea}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
        <button
          onClick={() => onCreatePost(selectedIdeas)}
          disabled={selected.size === 0}
          className={`
            flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
            ${selected.size > 0
              ? 'bg-lime-600 hover:bg-lime-700 text-white shadow-sm'
              : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }
          `}
        >
          <Sparkles className="w-4 h-4" />
          Crear post con {selected.size > 0 ? `${selected.size} ideas` : 'ideas seleccionadas'}
        </button>
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <BookmarkPlus className="w-4 h-4" />
          Guardar fuente
        </button>
      </div>
    </div>
  )
}
