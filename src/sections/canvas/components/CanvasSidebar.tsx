import type { CanvasFolder, SidebarSection } from '@/../product/sections/canvas/types'
import { FolderIcon, FileText, Link, Star, Plus } from 'lucide-react'

interface CanvasSidebarProps {
  folders: CanvasFolder[]
  sidebarSections: SidebarSection[]
  selectedFolderId?: string
  selectedSection?: string
  onSelectFolder?: (folderId: string) => void
  onSelectSection?: (sectionId: string) => void
  onCreateFolder?: () => void
}

export function CanvasSidebar({
  folders,
  sidebarSections,
  selectedFolderId,
  selectedSection,
  onSelectFolder,
  onSelectSection,
  onCreateFolder
}: CanvasSidebarProps) {
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, typeof FileText> = {
      'file-text': FileText,
      'link': Link,
      'star': Star,
      'folder': FolderIcon
    }
    return icons[iconName] || FileText
  }

  return (
    <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          Canvas
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Your knowledge workspace
        </p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick sections */}
        <div className="px-3 py-4">
          <h3 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Quick Access
          </h3>
          <div className="space-y-0.5">
            {sidebarSections.map(section => {
              const Icon = getIconComponent(section.icon)
              const isSelected = selectedSection === section.id

              return (
                <button
                  key={section.id}
                  onClick={() => onSelectSection?.(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                    ${isSelected
                      ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{section.label}</span>
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded font-medium
                    ${isSelected
                      ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }
                  `}>
                    {section.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Folders */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Folders
            </h3>
            <button
              onClick={onCreateFolder}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              title="Create folder"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {folders.map(folder => {
              const isSelected = selectedFolderId === folder.id

              return (
                <button
                  key={folder.id}
                  onClick={() => onSelectFolder?.(folder.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group
                    ${isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }
                  `}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="flex-1 text-left truncate">{folder.name}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {folder.itemCount}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
