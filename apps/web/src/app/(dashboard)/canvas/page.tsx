'use client'

import { useState } from 'react'
import data from '@/components/canvas/data.json'
import type { CanvasItem, CanvasNote, CanvasLink } from '@/components/canvas/types'
import { CanvasSidebar } from '@/components/canvas/components/CanvasSidebar'
import { CanvasGrid } from '@/components/canvas/components/CanvasGrid'
import { CanvasHeader } from '@/components/canvas/components/CanvasHeader'
import { NoteDetail } from '@/components/canvas/components/NoteDetail'

export default function CanvasPage() {
    const [selectedSection, setSelectedSection] = useState('all')
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedNote, setSelectedNote] = useState<CanvasNote | null>(null)

    // Use type assertion here since JSON imports might not perfectly match the types
    const allItems: CanvasItem[] = [
        ...(data.notes as unknown as CanvasNote[]),
        ...(data.links as unknown as CanvasLink[])
    ]

    // Filter items logic...
    const filteredItems = allItems.filter((item) => {
        // 1. Initial filter based on section/folder
        let matchesContext = false

        if (selectedFolderId) {
            matchesContext = item.folderId === selectedFolderId
        } else {
            switch (selectedSection) {
                case 'all':
                    matchesContext = true
                    break
                case 'notes':
                    matchesContext = item.type === 'note'
                    break
                case 'links':
                    matchesContext = item.type === 'link'
                    break
                case 'favorites':
                    matchesContext = item.isFavorite
                    break
                case 'trash':
                    matchesContext = false
                    break
                default:
                    matchesContext = true
            }
        }

        if (!matchesContext) return false

        // 2. Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            const titleMatch = item.title.toLowerCase().includes(q)
            const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(q))
            const contentMatch =
                item.type === 'note'
                    ? (item as CanvasNote).content.toLowerCase().includes(q)
                    : (item as CanvasLink).description.toLowerCase().includes(q)

            return titleMatch || tagMatch || contentMatch
        }

        return true
    })

    // Handlers
    const handleSelectSection = (sectionId: string) => {
        setSelectedSection(sectionId)
        setSelectedFolderId(null)
    }

    const handleSelectFolder = (folderId: string) => {
        if (selectedFolderId === folderId) {
            setSelectedFolderId(null)
            setSelectedSection('all')
        } else {
            setSelectedFolderId(folderId)
            setSelectedSection('')
        }
    }

    const handleItemClick = (item: CanvasItem) => {
        if (item.type === 'note') {
            setSelectedNote(item as CanvasNote)
        } else {
            window.open((item as CanvasLink).url, '_blank')
        }
    }

    const handleToggleFavorite = (itemId: string) => {
        // In a real app, this would update state/backend
        console.log('Toggle favorite:', itemId)
    }

    // Derived state for UI
    const folders = data.folders.map(f => ({
        ...f,
        itemCount: f.count // adapting data.json field 'count' to 'itemCount' used in components
    }))

    const sidebarSections = data.sidebarSections.map(s => ({
        ...s,
        // count is already correct in data.json
    }))

    const currentFolder = selectedFolderId
        ? folders.find((f) => f.id === selectedFolderId)
        : null

    const pageTitle = currentFolder
        ? currentFolder.name
        : sidebarSections.find((s) => s.id === selectedSection)?.label || 'Canvas'


    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-stone-50 dark:bg-stone-950">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 hidden md:block border-r border-stone-200 dark:border-stone-800">
                <CanvasSidebar
                    sections={sidebarSections}
                    folders={folders}
                    selectedSection={selectedSection}
                    selectedFolderId={selectedFolderId}
                    onSelectSection={handleSelectSection}
                    onSelectFolder={handleSelectFolder}
                    onCreateFolder={() => console.log('Create folder')}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-stone-900 rounded-tl-2xl shadow-xl border-l border-stone-200 dark:border-stone-800 overflow-hidden">
                <div className="p-6 pb-0">
                    <CanvasHeader
                        title={pageTitle}
                        itemCount={filteredItems.length}
                        searchQuery={searchQuery}
                        onSearch={setSearchQuery}
                        onCreateNote={() => console.log('Create note')}
                        onCreateLink={() => console.log('Create link')}
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <CanvasGrid
                        items={filteredItems}
                        folders={folders}
                        onItemClick={handleItemClick}
                        onToggleFavorite={() => { }}
                    />
                </div>
            </main>

            {/* Note Detail Modal */}
            {selectedNote && (
                <NoteDetail
                    note={selectedNote}
                    folderName={folders.find(f => f.id === selectedNote.folderId)?.name || 'General'}
                    folderColor={folders.find(f => f.id === selectedNote.folderId)?.color || '#78716c'}
                    onClose={() => setSelectedNote(null)}
                    onToggleFavorite={() => handleToggleFavorite(selectedNote.id)}
                />
            )}
        </div>
    )
}
