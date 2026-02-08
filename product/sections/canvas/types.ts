export type CanvasItemType = 'note' | 'link'

export interface CanvasFolder {
  id: string
  name: string
  icon: string
  color: string
  itemCount: number
}

export interface CanvasNote {
  id: string
  type: 'note'
  title: string
  content: string
  folderId: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export interface CanvasLink {
  id: string
  type: 'link'
  title: string
  url: string
  description: string
  folderId: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
  favicon: string | null
}

export type CanvasItem = CanvasNote | CanvasLink

export interface SidebarSection {
  id: string
  label: string
  icon: string
  count: number
}

export interface CanvasStats {
  totalNotes: number
  totalLinks: number
  totalFolders: number
  recentlyUpdated: number
}

export interface CanvasData {
  folders: CanvasFolder[]
  notes: CanvasNote[]
  links: CanvasLink[]
  sidebarSections: SidebarSection[]
  stats: CanvasStats
}

// Canvas Workspace Props
export interface CanvasWorkspaceProps {
  folders: CanvasFolder[]
  notes: CanvasNote[]
  links: CanvasLink[]
  sidebarSections: SidebarSection[]
  stats: CanvasStats
  selectedFolderId?: string
  selectedSection?: string
  searchQuery?: string
  onCreateNote?: () => void
  onCreateLink?: () => void
  onCreateFolder?: () => void
  onSelectFolder?: (folderId: string) => void
  onSelectSection?: (sectionId: string) => void
  onSearch?: (query: string) => void
  onItemClick?: (item: CanvasItem) => void
  onToggleFavorite?: (itemId: string) => void
  onDeleteItem?: (itemId: string) => void
  onMoveItem?: (itemId: string, folderId: string) => void
}
