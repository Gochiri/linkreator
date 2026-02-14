'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, FileText, Link2, FolderPlus, ChevronDown, Search } from 'lucide-react'

interface CanvasHeaderProps {
  title: string
  itemCount: number
  searchQuery: string
  onSearch: (query: string) => void
  onCreateNote: () => void
  onCreateLink: () => void
}

const MENU_ITEMS = [
  { label: 'Nueva nota', icon: FileText, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', action: 'note' as const },
  { label: 'Nuevo link', icon: Link2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', action: 'link' as const },
  { label: 'Nueva carpeta', icon: FolderPlus, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-950/30', action: 'folder' as const },
]

export function CanvasHeader({ title, itemCount, searchQuery, onSearch, onCreateNote, onCreateLink }: CanvasHeaderProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handlers = { note: onCreateNote, link: onCreateLink }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {itemCount} {itemCount === 1 ? 'elemento' : 'elementos'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile search bar could go here or replace the title when active */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            className="w-full md:w-64 pl-9 pr-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-xl py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
              {MENU_ITEMS.filter(item => item.action !== 'folder').map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.action}
                    onClick={() => {
                      handlers[item.action as keyof typeof handlers]()
                      setOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    <div className={`p-1.5 rounded-lg ${item.bg}`}>
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
    </div>
  )
}
