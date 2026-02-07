export type ContentType = 'post' | 'carousel' | 'image'
export type PostStatus = 'idea' | 'draft' | 'scheduled' | 'published'
export type ViewMode = 'week' | 'month'

export interface ScheduledPost {
  id: string
  date: string
  type: ContentType
  title: string
  status: PostStatus
  time: string | null
}

export interface PostStatusConfig {
  id: PostStatus
  label: string
  color: string
}

export interface ContentTypeConfig {
  label: string
  color: string
  bgColor: string
}

export interface PublishingStatsData {
  thisWeek: number
  lastWeek: number
  thisMonth: number
  streak: number
}

export interface ContentCalendarData {
  currentMonth: string
  scheduledPosts: ScheduledPost[]
  postStatuses: PostStatusConfig[]
  contentTypeColors: Record<ContentType, ContentTypeConfig>
  weeklyGoal: number
  publishingStats: PublishingStatsData
}
