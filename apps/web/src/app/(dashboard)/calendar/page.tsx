'use client'

import { useState } from 'react'
import data from '@/components/content-calendar/data.json'
import { CalendarHeader } from '@/components/content-calendar/components/CalendarHeader'
import { PublishingStats } from '@/components/content-calendar/components/PublishingStats'
import { MonthGrid } from '@/components/content-calendar/components/MonthGrid'
import { PostDetailPanel } from '@/components/content-calendar/components/PostDetailPanel'
import type { ScheduledPost, ContentType, ContentTypeConfig, ViewMode, PublishingStatsData } from '@/components/content-calendar/types'

export default function ContentCalendarPage() {
    const [year, setYear] = useState(2026)
    const [month, setMonth] = useState(1) // 0-indexed, so 1 = February
    const [viewMode, setViewMode] = useState<ViewMode>('month')
    const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)

    // Lift posts to state to allow drag & drop updates
    const [posts, setPosts] = useState<ScheduledPost[]>(data.scheduledPosts as ScheduledPost[])

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

    const handleMovePost = (post: ScheduledPost, newDate: string) => {
        setPosts(currentPosts =>
            currentPosts.map(p =>
                p.id === post.id
                    ? { ...p, date: newDate, status: p.status === 'idea' ? 'draft' : p.status }
                    : p
            )
        )
    }

    return (
        <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto flex flex-col">
            {/* Header */}
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Calendario de contenido
                </h1>
                <p className="text-stone-500 dark:text-stone-400 mt-1">
                    Planifica y organiza tu contenido de LinkedIn
                </p>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col gap-6">
                {/* Stats & Controls */}
                <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
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
                    <div className="lg:col-span-1">
                        <PublishingStats stats={publishingStats} weeklyGoal={data.weeklyGoal} />
                    </div>
                </div>

                {/* Calendar Area */}
                <div className="flex-1 flex gap-6 overflow-hidden">
                    <div className="flex-1 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-y-auto shadow-sm">
                        <MonthGrid
                            year={year}
                            month={month}
                            posts={posts}
                            contentTypeColors={contentTypeColors}
                            selectedPostId={selectedPost?.id ?? null}
                            onSelectPost={(post) => setSelectedPost(post)}
                            onAddPost={(date) => console.log('Add post on', date)}
                            onMovePost={handleMovePost}
                            today="2026-02-07"
                        />
                    </div>

                    {/* Detail Panel */}
                    {selectedPost && (
                        <div className="w-80 flex-shrink-0 overflow-y-auto animate-in slide-in-from-right-4 duration-300">
                            <PostDetailPanel
                                post={selectedPost}
                                contentTypeColors={contentTypeColors}
                                onClose={() => setSelectedPost(null)}
                                onEdit={(post) => console.log('Edit:', post)}
                                onDelete={(post) => console.log('Delete:', post)}
                                onViewContent={(post) => console.log('View:', post)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
