import type { CanvasLink, CanvasFolder } from '@/../product/sections/canvas/types'
import { Star, MoreVertical, Trash2, FolderInput, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface LinkCardProps {
  link: CanvasLink
  folder?: CanvasFolder
  folders: CanvasFolder[]
  onClick?: () => void
  onToggleFavorite?: () => void
  onDelete?: () => void
  onMove?: (folderId: string) => void
}

export function LinkCard({
  link,
  folder,
  folders,
  onClick,
  onToggleFavorite,
  onDelete,
  onMove
}: LinkCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showMoveMenu, setShowMoveMenu] = useState(false)

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return domain.replace('www.', '')
    } catch {
      return url
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      onClick={onClick}
      className="
        group relative p-5 rounded-xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        hover:border-amber-300 dark:hover:border-amber-700
        hover:shadow-lg hover:shadow-amber-100/50 dark:hover:shadow-amber-900/20
        transition-all duration-200 cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-base leading-snug line-clamp-2 mb-1.5">
            {link.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{getDomain(link.url)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.()
            }}
            className={`
              p-1.5 rounded-lg transition-all
              ${link.isFavorite
                ? 'text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950/30'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <Star className={`w-4 h-4 ${link.isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Menu button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Menu dropdown */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(false)
                }}
              />
              <div className="absolute right-5 top-12 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMoveMenu(true)
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <FolderInput className="w-4 h-4" />
                  Move to...
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border-t border-slate-200 dark:border-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}

          {/* Move menu */}
          {showMoveMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMoveMenu(false)
                }}
              />
              <div className="absolute right-5 top-12 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden max-h-60 overflow-y-auto">
                {folders.map(f => (
                  <button
                    key={f.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onMove?.(f.id)
                      setShowMoveMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
        {link.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {link.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
            >
              {tag}
            </span>
          ))}
          {link.tags.length > 2 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{link.tags.length - 2}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {folder && (
            <>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: folder.color }}
              />
              <span className="truncate max-w-24">{folder.name}</span>
              <span>•</span>
            </>
          )}
          <span>{formatDate(link.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
