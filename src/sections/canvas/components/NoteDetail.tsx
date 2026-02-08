import { X, Star, FolderIcon } from 'lucide-react'

interface NoteDetailProps {
  title: string
  content: string
  folderName: string
  folderColor: string
  tags: string[]
  isFavorite: boolean
  updatedAt: string
  onClose: () => void
  onToggleFavorite: () => void
}

function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []
  let orderedItems: React.ReactNode[] = []
  let key = 0

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300 text-sm mb-3">
          {listItems}
        </ul>
      )
      listItems = []
    }
    if (orderedItems.length > 0) {
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 text-stone-700 dark:text-stone-300 text-sm mb-3">
          {orderedItems}
        </ol>
      )
      orderedItems = []
    }
  }

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-stone-900 dark:text-stone-100">{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2 mt-4 first:mt-0">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1.5 mt-3">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith('- ')) {
      if (orderedItems.length > 0) flushList()
      listItems.push(<li key={key++}>{renderInline(trimmed.slice(2))}</li>)
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listItems.length > 0) flushList()
      orderedItems.push(<li key={key++}>{renderInline(trimmed.replace(/^\d+\.\s/, ''))}</li>)
    } else if (trimmed === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p key={key++} className="text-sm text-stone-700 dark:text-stone-300 mb-2">
          {renderInline(trimmed)}
        </p>
      )
    }
  }
  flushList()
  return elements
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NoteDetail({
  title,
  content,
  folderName,
  folderColor,
  tags,
  isFavorite,
  updatedAt,
  onClose,
  onToggleFavorite,
}: NoteDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl mx-4 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-700">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                <span className="inline-flex items-center gap-1">
                  <FolderIcon className="w-3 h-3" style={{ color: folderColor }} />
                  {folderName}
                </span>
                <span>{formatDate(updatedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onToggleFavorite}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Star
                  className={`w-4 h-4 ${
                    isFavorite
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}
                />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4 text-stone-400 dark:text-stone-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          {renderMarkdown(content)}
        </div>

        {/* Footer with tags */}
        {tags.length > 0 && (
          <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-700 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
