'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronRight, Hash, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HashtagCategory {
  label: string
  color: string
  tags: string[]
}

interface HashtagLibraryProps {
  library: Record<string, HashtagCategory>
}

export function HashtagLibrary({ library }: HashtagLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(library))
  )
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  const toggleCategory = (key: string) => {
    const next = new Set(expandedCategories)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    setExpandedCategories(next)
  }

  const toggleTag = (tag: string) => {
    const next = new Set(selectedTags)
    if (next.has(tag)) {
      next.delete(tag)
    } else {
      next.add(tag)
    }
    setSelectedTags(next)
  }

  const filteredLibrary = Object.entries(library).reduce<Record<string, HashtagCategory>>(
    (acc, [key, category]) => {
      if (!searchQuery) {
        acc[key] = category
        return acc
      }
      const filteredTags = category.tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (filteredTags.length > 0 || category.label.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc[key] = { ...category, tags: filteredTags.length > 0 ? filteredTags : category.tags }
      }
      return acc
    },
    {}
  )

  const totalTags = Object.values(library).reduce((sum, cat) => sum + cat.tags.length, 0)

  return (
    <div className="space-y-6">
      {/* Search & Stats Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar hashtags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-stone-400/50 transition-shadow"
          />
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">
            {totalTags} hashtags
          </Badge>
          {selectedTags.size > 0 && (
            <Badge className="text-xs bg-lime-100 dark:bg-lime-950/40 text-lime-700 dark:text-lime-300 border border-lime-200 dark:border-lime-800">
              {selectedTags.size} seleccionados
            </Badge>
          )}
        </div>
      </div>

      {/* Selected Tags Preview */}
      {selectedTags.size > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Hashtags seleccionados
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(Array.from(selectedTags).join(' '))
              }}
              className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
            >
              Copiar todos
            </button>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {Array.from(selectedTags).join(' ')}
          </p>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        {Object.entries(filteredLibrary).map(([key, category]) => {
          const isExpanded = expandedCategories.has(key)

          return (
            <div
              key={key}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(key)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex-1 text-left">
                  {category.label}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.tags.length}
                </Badge>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {/* Tags */}
              {isExpanded && (
                <div className="px-5 pb-4 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => {
                      const isSelected = selectedTags.has(tag)
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`
                            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                            ${isSelected
                              ? 'text-white shadow-sm'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                            }
                          `}
                          style={isSelected ? { backgroundColor: category.color } : undefined}
                        >
                          {isSelected ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Hash className="w-3 h-3" />
                          )}
                          {tag.replace('#', '')}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
