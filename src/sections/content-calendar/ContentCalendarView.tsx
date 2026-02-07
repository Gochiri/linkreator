import { useState } from 'react'
import data from '@/../product/sections/content-calendar/data.json'
import { CalendarHeader } from './components/CalendarHeader'
import { PublishingStats } from './components/PublishingStats'
import { MonthGrid } from './components/MonthGrid'
import { PostDetailPanel } from './components/PostDetailPanel'
import type { ScheduledPost, ContentType, ContentTypeConfig, ViewMode, PublishingStatsData } from './types'

export default function ContentCalendarView() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(1) // 0-indexed, so 1 = February
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)

  const posts = data.scheduledPosts as ScheduledPost[]
  const contentTypeColors = data.contentTypeColors as Record<ContentType, ContentTypeConfig>
  const publishingStats = data.publishingStats as PublishingStatsData

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setSelectedPost(null)
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setSelectedPost(null)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Calendario de contenido
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Planifica y organiza tu contenido de LinkedIn
        </p>
      </div>

      {/* Calendar Header */}
      <div className="mb-6">
        <CalendarHeader
          year={year}
          month={month}
          viewMode={viewMode}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onViewModeChange={setViewMode}
          onNewPost={() => console.log('New post')}
        />
      </div>

      {/* Publishing Stats */}
      <div className="mb-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
        <PublishingStats stats={publishingStats} weeklyGoal={data.weeklyGoal} />
      </div>

      {/* Calendar + Detail Panel */}
      <div className="flex gap-6">
        <div className="flex-1">
          <MonthGrid
            year={year}
            month={month}
            posts={posts}
            contentTypeColors={contentTypeColors}
            selectedPostId={selectedPost?.id ?? null}
            onSelectPost={(post) => setSelectedPost(post)}
            onAddPost={(date) => console.log('Add post on', date)}
            today="2026-02-07"
          />
        </div>

        {/* Detail Panel */}
        {selectedPost && (
          <PostDetailPanel
            post={selectedPost}
            contentTypeColors={contentTypeColors}
            onClose={() => setSelectedPost(null)}
            onEdit={(post) => console.log('Edit:', post)}
            onDelete={(post) => console.log('Delete:', post)}
            onViewContent={(post) => console.log('View:', post)}
          />
        )}
      </div>
    </div>
  )
}
