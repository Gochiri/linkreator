import { useState } from 'react'
import data from '@/../product/sections/canvas/data.json'
import type { CanvasItem, CanvasNote, CanvasLink } from '@/../product/sections/canvas/types'
import { CanvasSidebar } from './components/CanvasSidebar'
import { CanvasGrid } from './components/CanvasGrid'
import { CanvasHeader } from './components/CanvasHeader'
import { NoteDetail } from './components/NoteDetail'
import { Menu, X } from 'lucide-react'

export default function CanvasView() {
  const [selectedSection, setSelectedSection] = useState('all')
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNote, setSelectedNote] = useState<CanvasNote | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const allItems: CanvasItem[] = [...(data.notes as CanvasNote[]), ...(data.links as CanvasLink[])]

  // Filter items
  const filteredItems = allItems.filter((item) => {
    // Section filter
    if (!selectedFolderId) {
      if (selectedSection === 'all' && item.type !== 'note') return false
      if (selectedSection === 'links' && item.type !== 'link') return false
      if (selectedSection === 'favorites' && !item.isFavorite) return false
    }

    // Folder filter
    if (selectedFolderId && item.folderId !== selectedFolderId) return false

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(q)
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q))
      const contentMatch =
        item.type === 'note'
          ? (item as CanvasNote).content.toLowerCase().includes(q)
          : (item as CanvasLink).description.toLowerCase().includes(q)
      if (!titleMatch && !tagMatch && !contentMatch) return false
    }

    return true
  })

  const handleSelectSection = (sectionId: string) => {
    setSelectedSection(sectionId)
    setSelectedFolderId(null)
    setSidebarOpen(false)
  }

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId === selectedFolderId ? null : folderId)
    setSidebarOpen(false)
  }

  const handleItemClick = (item: CanvasItem) => {
    if (item.type === 'note') {
      setSelectedNote(item as CanvasNote)
    } else {
      window.open((item as CanvasLink).url, '_blank')
    }
  }

  const handleToggleFavorite = (itemId: string) => {
    console.log('Toggle favorite:', itemId)
  }

  const currentFolder = selectedFolderId
    ? data.folders.find((f) => f.id === selectedFolderId)
    : null

  const headerTitle = currentFolder
    ? currentFolder.name
    : data.sidebarSections.find((s) => s.id === selectedSection)?.label || 'Canvas'

  return (
    <div className="flex h-full relative">
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-3 left-3 z-40 p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-stone-600 dark:text-stone-400" /> : <Menu className="w-5 h-5 text-stone-600 dark:text-stone-400" />}
      </button>

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`${
          sidebarOpen ? 'fixed inset-0 z-30 bg-black/30 md:bg-transparent md:relative md:inset-auto' : 'hidden md:flex'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`${sidebarOpen ? 'block' : 'hidden md:flex'} h-full`}
          onClick={(e) => e.stopPropagation()}
        >
          <CanvasSidebar
            sections={data.sidebarSections}
            folders={data.folders}
            selectedSection={selectedSection}
            selectedFolderId={selectedFolderId}
            searchQuery={searchQuery}
            onSelectSection={handleSelectSection}
            onSelectFolder={handleSelectFolder}
            onSearch={setSearchQuery}
            onCreateFolder={() => console.log('Create folder')}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 md:pl-6 pl-14">
        <CanvasHeader
          title={headerTitle}
          itemCount={filteredItems.length}
          onCreateNote={() => console.log('Create note')}
          onCreateLink={() => console.log('Create link')}
          onCreateFolder={() => console.log('Create folder')}
        />
        <CanvasGrid
          items={filteredItems}
          folders={data.folders}
          onItemClick={handleItemClick}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

      {/* Note detail modal */}
      {selectedNote && (
        <NoteDetail
          title={selectedNote.title}
          content={selectedNote.content}
          folderName={data.folders.find((f) => f.id === selectedNote.folderId)?.name || ''}
          folderColor={data.folders.find((f) => f.id === selectedNote.folderId)?.color || '#6B7280'}
          tags={selectedNote.tags}
          isFavorite={selectedNote.isFavorite}
          updatedAt={selectedNote.updatedAt}
          onClose={() => setSelectedNote(null)}
          onToggleFavorite={() => handleToggleFavorite(selectedNote.id)}
        />
      )}
    </div>
  )
}
