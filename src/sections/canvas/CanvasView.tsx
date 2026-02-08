import data from '@/../product/sections/canvas/data.json'
import { CanvasWorkspace } from './components/CanvasWorkspace'
import { useState } from 'react'

export default function CanvasView() {
  const [selectedFolderId, setSelectedFolderId] = useState<string>()
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <CanvasWorkspace
      folders={data.folders}
      notes={data.notes}
      links={data.links}
      sidebarSections={data.sidebarSections}
      stats={data.stats}
      selectedFolderId={selectedFolderId}
      selectedSection={selectedSection}
      searchQuery={searchQuery}
      onCreateNote={() => console.log('Create note')}
      onCreateLink={() => console.log('Create link')}
      onCreateFolder={() => console.log('Create folder')}
      onSelectFolder={(folderId) => {
        console.log('Select folder:', folderId)
        setSelectedFolderId(folderId === selectedFolderId ? undefined : folderId)
        setSelectedSection(undefined as any)
      }}
      onSelectSection={(sectionId) => {
        console.log('Select section:', sectionId)
        setSelectedSection(sectionId)
        setSelectedFolderId(undefined)
      }}
      onSearch={(query) => {
        console.log('Search:', query)
        setSearchQuery(query)
      }}
      onItemClick={(item) => console.log('Item clicked:', item)}
      onToggleFavorite={(itemId) => console.log('Toggle favorite:', itemId)}
      onDeleteItem={(itemId) => console.log('Delete item:', itemId)}
      onMoveItem={(itemId, folderId) => console.log('Move item:', itemId, 'to folder:', folderId)}
    />
  )
}
