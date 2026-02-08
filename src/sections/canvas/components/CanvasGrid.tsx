import type { CanvasItem, CanvasFolder } from '@/../product/sections/canvas/types'
import { NoteCard } from './NoteCard'
import { LinkCard } from './LinkCard'

interface CanvasGridProps {
  items: CanvasItem[]
  folders: CanvasFolder[]
  onItemClick?: (item: CanvasItem) => void
  onToggleFavorite?: (itemId: string) => void
  onDeleteItem?: (itemId: string) => void
  onMoveItem?: (itemId: string, folderId: string) => void
}

export function CanvasGrid({
  items,
  folders,
  onItemClick,
  onToggleFavorite,
  onDeleteItem,
  onMoveItem
}: CanvasGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-amber-100 dark:from-blue-950/30 dark:to-amber-950/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No items yet
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Create your first note or save a link to get started building your knowledge base.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => {
            const folder = folders.find(f => f.id === item.folderId)

            if (item.type === 'note') {
              return (
                <NoteCard
                  key={item.id}
                  note={item}
                  folder={folder}
                  onClick={() => onItemClick?.(item)}
                  onToggleFavorite={() => onToggleFavorite?.(item.id)}
                  onDelete={() => onDeleteItem?.(item.id)}
                  onMove={onMoveItem ? (folderId) => onMoveItem(item.id, folderId) : undefined}
                  folders={folders}
                />
              )
            }

            return (
              <LinkCard
                key={item.id}
                link={item}
                folder={folder}
                onClick={() => onItemClick?.(item)}
                onToggleFavorite={() => onToggleFavorite?.(item.id)}
                onDelete={() => onDeleteItem?.(item.id)}
                onMove={onMoveItem ? (folderId) => onMoveItem(item.id, folderId) : undefined}
                folders={folders}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
