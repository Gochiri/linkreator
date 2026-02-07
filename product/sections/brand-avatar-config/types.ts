export interface CreatorProfile {
  name: string
  title: string
  tagline: string
  industry: string
  bio: string
  avatar: string
}

export interface BrandTone {
  formalCasual: number
  technicalSimple: number
  seriousHumor: number
  inspirationalPractical: number
  references: string[]
  voiceTraits: string[]
  writingRules: string[]
}

export interface AudienceAvatar {
  name: string
  role: string
  age: string
  industry: string
  painPoints: string[]
  goals: string[]
  platforms: string[]
  contentPreferences: string[]
}

export interface HashtagCategory {
  label: string
  color: string
  tags: string[]
}

export interface HashtagLibrary {
  [categoryId: string]: HashtagCategory
}

export interface BrandAvatarConfigData {
  creatorProfile: CreatorProfile
  brandTone: BrandTone
  avatar: AudienceAvatar
  hashtagLibrary: HashtagLibrary
}
