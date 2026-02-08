import { useState } from 'react'
import type { CanvasFolder, SidebarSection } from '@/../product/sections/canvas/types'
import { FolderIcon, FileText, Link, Star, Plus, Search } from 'lucide-react'

interface CanvasSidebarProps {
  sections: SidebarSection[]
  folders: CanvasFolder[]
  selectedSection: string
  selectedFolderId: string | null
  searchQuery: string
  onSelectSection: (sectionId: string) => void
  onSelectFolder: (folderId: string) => void
  onSearch: (query: string) => void
  onCreateFolder: () => void
}

const ICON_MAP: Record<string, typeof FileText> = {
  'file-text': FileText,
  'link': Link,
  'star': Star,
}

export function CanvasSidebar({
  sections,
  folders,
  selectedSection,
  selectedFolderId,
  searchQuery,
  onSelectSection,
  onSelectFolder,
  onSearch,
  onCreateFolder,
}: CanvasSidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 flex flex-col h-full">
      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>

      {/* Biblioteca */}
      <div className="px-3 pt-2">
        <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1 px-2">
          Biblioteca
        </h3>
        <nav className="space-y-0.5">
          {sections.map((section) => {
            const Icon = ICON_MAP[section.icon] || FileText
            const isActive = selectedSection === section.id && !selectedFolderId
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{section.label}</span>
                <span className={`text-xs tabular-nums ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-stone-400 dark:text-stone-500'}`}>
                  {section.count}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Carpetas */}
      <div className="px-3 pt-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-1 px-2">
          <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
            Carpetas
          </h3>
          <button
            onClick={onCreateFolder}
            className="p-0.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <nav className="space-y-0.5">
          {folders.map((folder) => {
            const isActive = selectedFolderId === folder.id
            return (
              <button
                key={folder.id}
                onClick={() => onSelectFolder(folder.id)}
                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <FolderIcon className="w-4 h-4 shrink-0" style={{ color: folder.color }} />
                <span className="flex-1 text-left truncate">{folder.name}</span>
                <span className={`text-xs tabular-nums ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-stone-400 dark:text-stone-500'}`}>
                  {folder.itemCount}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
