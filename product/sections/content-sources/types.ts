export type SourceType = 'youtube' | 'article' | 'tweet' | 'note'

export interface SourceTypeOption {
  id: SourceType
  label: string
  icon: string
  color: string
}

export interface ContentSource {
  id: string
  type: SourceType
  title: string
  url: string | null
  thumbnail?: string | null
  channel?: string
  duration?: string
  referenceText?: string
  dateAdded: string
  extractedIdeas: string[]
  usedForPosts: number
}

export interface CurrentInput {
  type: SourceType
  url: string
  title: string
  channel: string
  duration: string
  extractedIdeas: string[]
}

export interface ContentSourcesData {
  sourceTypes: SourceTypeOption[]
  savedSources: ContentSource[]
  currentInput: CurrentInput
}
