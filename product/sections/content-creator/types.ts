export type PostType = 'tip' | 'storytelling' | 'framework' | 'opinion' | 'case-study'
export type ToneStyle = 'direct' | 'storytelling' | 'framework' | 'opinion'

export interface ContentTypeOption {
  id: PostType
  label: string
  icon: string
  description: string
}

export interface Post {
  id: string
  type: PostType
  content: string
  hashtags: string[]
  charCount: number
  tone: ToneStyle
}

export interface HashtagGroup {
  [category: string]: string[]
}

export interface BrandTone {
  style: string
  traits: string[]
  rules: string[]
}

export interface Creator {
  name: string
  title: string
  avatar: string
}

export interface ContentCreatorData {
  contentTypes: ContentTypeOption[]
  samplePosts: Post[]
  suggestedHashtags: HashtagGroup
  brandTone: BrandTone
  creator: Creator
}
