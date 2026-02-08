import type { CanvasNote, CanvasFolder } from '@/../product/sections/canvas/types'
import { Star, MoreVertical, Trash2, FolderInput } from 'lucide-react'
import { useState } from 'react'

interface NoteCardProps {
  note: CanvasNote
  folder?: CanvasFolder
  folders: CanvasFolder[]
  onClick?: () => void
  onToggleFavorite?: () => void
  onDelete?: () => void
  onMove?: (folderId: string) => void
}

export function NoteCard({
  note,
  folder,
  folders,
  onClick,
  onToggleFavorite,
  onDelete,
  onMove
}: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showMoveMenu, setShowMoveMenu] = useState(false)

  // Extract preview from markdown content (first few lines)
  const getPreview = (content: string) => {
    const lines = content
      .split('\n')
      .filter(line => !line.startsWith('#')) // Remove headers
      .filter(line => line.trim().length > 0)
      .slice(0, 3)
      .join(' ')

    return lines.length > 120 ? lines.slice(0, 120) + '...' : lines
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
        hover:border-blue-300 dark:hover:border-blue-700
        hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20
        transition-all duration-200 cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-base leading-snug flex-1 line-clamp-2">
          {note.title}
        </h3>

        <div className="flex items-center gap-1 shrink-0">
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.()
            }}
            className={`
              p-1.5 rounded-lg transition-all
              ${note.isFavorite
                ? 'text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950/30'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} />
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

      {/* Preview */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
        {getPreview(note.content)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {note.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{note.tags.length - 2}
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
          <span>{formatDate(note.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}
