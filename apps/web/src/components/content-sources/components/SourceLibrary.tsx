'use client'

import { useState } from 'react'
import {
  Video,
  FileText,
  MessageCircle,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ContentSource } from '@/components/content-sources/types'

const TYPE_CONFIG: Record<string, { icon: typeof Video; color: string; bg: string; label: string }> = {
  youtube: { icon: Video, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', label: 'YouTube' },
  article: { icon: FileText, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/30', label: 'Articulo' },
  tweet: { icon: MessageCircle, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', label: 'Tweet' },
  note: { icon: StickyNote, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', label: 'Nota' },
}

const FILTER_TABS = [
  { id: 'all', label: 'Todas' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'article', label: 'Articulos' },
  { id: 'tweet', label: 'Tweets' },
  { id: 'note', label: 'Notas' },
]

interface SourceLibraryProps {
  sources: ContentSource[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function SourceLibrary({ sources, activeFilter, onFilterChange }: SourceLibraryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = activeFilter === 'all'
    ? sources
    : sources.filter((s) => s.type === activeFilter)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            Fuentes guardadas
          </h2>
          <Badge variant="secondary" className="text-xs">{sources.length}</Badge>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl mb-5 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all
              ${activeFilter === tab.id
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Source Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((source) => {
          const config = TYPE_CONFIG[source.type] || TYPE_CONFIG.note
          const Icon = config.icon
          const isExpanded = expandedId === source.id

          return (
            <div
              key={source.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bg} shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                      {source.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-stone-400 dark:text-stone-500">
                        {source.dateAdded}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                        <Sparkles className="w-3 h-3" />
                        {source.extractedIdeas.length} ideas
                      </span>
                      {source.usedForPosts > 0 && (
                        <span className="text-xs text-lime-600 dark:text-lime-400 font-medium">
                          Usado en {source.usedForPosts} posts
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : source.id)}
                  className="flex items-center gap-1 mt-3 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      Ocultar detalles
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      Ver detalles
                    </>
                  )}
                </button>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-stone-100 dark:border-stone-800 pt-3 animate-fade-in">
                  {/* Reference text */}
                  {source.referenceText && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                        Texto de referencia
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed bg-stone-50 dark:bg-stone-800/50 rounded-lg p-3">
                        {source.referenceText}
                      </p>
                    </div>
                  )}

                  {/* Extracted ideas */}
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Ideas extraidas
                  </p>
                  <ul className="space-y-1.5">
                    {source.extractedIdeas.map((idea, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0 mt-1.5" />
                        {idea}
                      </li>
                    ))}
                  </ul>

                  {/* URL */}
                  {source.url && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">{source.url}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
