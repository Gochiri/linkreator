import { useState, useRef, useEffect } from 'react'
import { Plus, FileText, Link2, FolderPlus, ChevronDown } from 'lucide-react'

interface CanvasHeaderProps {
  title: string
  itemCount: number
  onCreateNote: () => void
  onCreateLink: () => void
  onCreateFolder: () => void
}

const MENU_ITEMS = [
  { label: 'Nueva nota', icon: FileText, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', action: 'note' as const },
  { label: 'Nuevo link', icon: Link2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', action: 'link' as const },
  { label: 'Nueva carpeta', icon: FolderPlus, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-950/30', action: 'folder' as const },
]

export function CanvasHeader({ title, itemCount, onCreateNote, onCreateLink, onCreateFolder }: CanvasHeaderProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handlers = { note: onCreateNote, link: onCreateLink, folder: onCreateFolder }

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {itemCount} {itemCount === 1 ? 'elemento' : 'elementos'}
        </p>
      </div>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-lg py-1 z-20">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.action}
                  onClick={() => {
                    handlers[item.action]()
                    setOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <div className={`p-1 rounded-lg ${item.bg}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
