import type { CanvasWorkspaceProps } from '@/../product/sections/canvas/types'
import { CanvasSidebar } from './CanvasSidebar'
import { CanvasGrid } from './CanvasGrid'
import { SearchBar } from './SearchBar'
import { CreateButton } from './CreateButton'

// Design tokens: blue (primary), amber (secondary), slate (neutral)
// Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (code)

export function CanvasWorkspace({
  folders,
  notes,
  links,
  sidebarSections,
  stats,
  selectedFolderId,
  selectedSection,
  searchQuery = '',
  onCreateNote,
  onCreateLink,
  onCreateFolder,
  onSelectFolder,
  onSelectSection,
  onSearch,
  onItemClick,
  onToggleFavorite,
  onDeleteItem,
  onMoveItem
}: CanvasWorkspaceProps) {
  // Filter items based on selected folder/section and search query
  const allItems = [...notes, ...links]

  const filteredItems = allItems.filter(item => {
    // Filter by folder
    if (selectedFolderId && item.folderId !== selectedFolderId) return false

    // Filter by section
    if (selectedSection === 'links' && item.type !== 'link') return false
    if (selectedSection === 'all' && item.type !== 'note') return false
    if (selectedSection === 'favorites' && !item.isFavorite) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = item.title.toLowerCase().includes(query)
      const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query))
      const matchesContent = item.type === 'note' && item.content.toLowerCase().includes(query)
      const matchesDescription = item.type === 'link' && item.description.toLowerCase().includes(query)

      return matchesTitle || matchesTags || matchesContent || matchesDescription
    }

    return true
  })

  // Sort by most recently updated first
  const sortedItems = [...filteredItems].sort((a, b) => {
    const dateA = 'updatedAt' in a ? new Date(a.updatedAt).getTime() : new Date(a.createdAt).getTime()
    const dateB = 'updatedAt' in b ? new Date(b.updatedAt).getTime() : new Date(b.createdAt).getTime()
    return dateB - dateA
  })

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <CanvasSidebar
        folders={folders}
        sidebarSections={sidebarSections}
        selectedFolderId={selectedFolderId}
        selectedSection={selectedSection}
        onSelectFolder={onSelectFolder}
        onSelectSection={onSelectSection}
        onCreateFolder={onCreateFolder}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with search and create button */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <SearchBar
              value={searchQuery}
              onChange={onSearch}
            />
            <CreateButton
              onCreateNote={onCreateNote}
              onCreateLink={onCreateLink}
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.totalNotes}</span> notes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.totalLinks}</span> links
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{stats.totalFolders}</span> folders
              </span>
            </div>
            {searchQuery && (
              <div className="ml-auto text-slate-600 dark:text-slate-400">
                Found <span className="font-semibold text-slate-900 dark:text-slate-100">{sortedItems.length}</span> results
              </div>
            )}
          </div>
        </div>

        {/* Content grid */}
        <CanvasGrid
          items={sortedItems}
          folders={folders}
          onItemClick={onItemClick}
          onToggleFavorite={onToggleFavorite}
          onDeleteItem={onDeleteItem}
          onMoveItem={onMoveItem}
        />
      </div>
    </div>
  )
}
