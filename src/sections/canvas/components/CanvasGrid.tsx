import { useState } from 'react'
import type { CanvasItem, CanvasNote, CanvasLink, CanvasFolder } from '@/../product/sections/canvas/types'
import { FileText, Link2, Star, MoreHorizontal, FolderIcon, ExternalLink } from 'lucide-react'

interface CanvasGridProps {
  items: CanvasItem[]
  folders: CanvasFolder[]
  onItemClick: (item: CanvasItem) => void
  onToggleFavorite: (itemId: string) => void
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/- /g, '')
    .replace(/\n/g, ' ')
    .trim()
}

function getFolderById(folders: CanvasFolder[], folderId: string) {
  return folders.find((f) => f.id === folderId)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })
}

export function CanvasGrid({ items, folders, onItemClick, onToggleFavorite }: CanvasGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const folder = getFolderById(folders, item.folderId)
        const isNote = item.type === 'note'
        const isHovered = hoveredId === item.id
        const dateStr = isNote ? (item as CanvasNote).updatedAt : (item as CanvasLink).createdAt

        return (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 cursor-pointer transition-shadow hover:shadow-md"
          >
            {/* Hover actions */}
            {isHovered && (
              <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(item.id)
                  }}
                  className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${
                      item.isFavorite
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-400 dark:text-stone-500'
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                </button>
              </div>
            )}

            {/* Type icon + folder badge */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`p-1.5 rounded-lg ${
                  isNote
                    ? 'bg-amber-50 dark:bg-amber-950/30'
                    : 'bg-blue-50 dark:bg-blue-950/30'
                }`}
              >
                {isNote ? (
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Link2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              {folder && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                  <FolderIcon className="w-3 h-3" style={{ color: folder.color }} />
                  {folder.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1.5 line-clamp-2">
              {item.title}
            </h3>

            {/* Content preview or description */}
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 mb-3">
              {isNote
                ? stripMarkdown((item as CanvasNote).content)
                : (item as CanvasLink).description}
            </p>

            {/* URL for links */}
            {!isNote && (
              <div className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 mb-3 truncate">
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="truncate">{(item as CanvasLink).url}</span>
              </div>
            )}

            {/* Tags + date */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1 min-w-0">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 2 && (
                  <span className="text-[10px] text-stone-400 dark:text-stone-500">
                    +{item.tags.length - 2}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 whitespace-nowrap">
                {formatDate(dateStr)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
