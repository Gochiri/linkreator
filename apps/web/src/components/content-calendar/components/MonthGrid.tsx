'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { ScheduledPost, ContentType, PostStatus, ContentTypeConfig } from '../types'


const DAY_LABELS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']

const STATUS_DOT_COLORS: Record<PostStatus, string> = {
  idea: 'bg-stone-400',
  draft: 'bg-amber-400',
  scheduled: 'bg-lime-500',
  published: 'bg-sky-500',
}

interface MonthGridProps {
  year: number
  month: number
  posts: ScheduledPost[]
  contentTypeColors: Record<ContentType, ContentTypeConfig>
  selectedPostId: string | null
  onSelectPost: (post: ScheduledPost) => void
  onAddPost: (date: string) => void
  onMovePost: (post: ScheduledPost, newDate: string) => void
  today: string
}

interface CalendarDay {
  date: number
  dateStr: string
  isCurrentMonth: boolean
}

function buildCalendarGrid(year: number, month: number): CalendarDay[][] {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // getDay() returns 0=Sun. We want Mon=0, so adjust:
  // Sun=0 -> 6, Mon=1 -> 0, Tue=2 -> 1, etc.
  let startDow = firstDay.getDay()
  startDow = startDow === 0 ? 6 : startDow - 1

  // Previous month overflow
  const prevMonthLastDay = new Date(year, month, 0).getDate()

  const cells: CalendarDay[] = []

  // Fill leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const mm = String(prevMonth + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    cells.push({
      date: d,
      dateStr: `${prevYear}-${mm}-${dd}`,
      isCurrentMonth: false,
    })
  }

  // Fill current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    cells.push({
      date: d,
      dateStr: `${year}-${mm}-${dd}`,
      isCurrentMonth: true,
    })
  }

  // Fill trailing days from next month
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1
      const nextYear = month === 11 ? year + 1 : year
      const mm = String(nextMonth + 1).padStart(2, '0')
      const dd = String(d).padStart(2, '0')
      cells.push({
        date: d,
        dateStr: `${nextYear}-${mm}-${dd}`,
        isCurrentMonth: false,
      })
    }
  }

  // Split into weeks
  const weeks: CalendarDay[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return weeks
}

export function MonthGrid({
  year,
  month,
  posts,
  contentTypeColors,
  selectedPostId,
  onSelectPost,
  onAddPost,
  onMovePost,
  today,
}: MonthGridProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [dragOverDay, setDragOverDay] = useState<string | null>(null)

  const weeks = buildCalendarGrid(year, month)

  // Build a map of dateStr -> posts
  const postsByDate = new Map<string, ScheduledPost[]>()
  for (const post of posts) {
    const existing = postsByDate.get(post.date) || []
    existing.push(post)
    postsByDate.set(post.date, existing)
  }

  const handleDragStart = (e: React.DragEvent, post: ScheduledPost) => {
    e.dataTransfer.setData('text/plain', post.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault()
    setDragOverDay(dateStr)
  }

  const handleDrop = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault()
    setDragOverDay(null)
    const postId = e.dataTransfer.getData('text/plain')
    const post = posts.find(p => p.id === postId)
    if (post && post.date !== dateStr) {
      onMovePost(post, dateStr)
    }
  }

  return (
    <div
      className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
      role="grid"
      aria-label="Calendario de contenido"
    >
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-stone-200 dark:border-stone-800" role="row">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="px-3 py-2.5 text-xs font-semibold text-stone-500 dark:text-stone-400 text-center uppercase tracking-wider"
            role="columnheader"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar body */}
      <div className="grid grid-cols-7">
        {weeks.map((week, wi) => (
          <div key={`week-${wi}`} className="contents" role="row">
            {week.map((day, di) => {
              const dayPosts = postsByDate.get(day.dateStr) || []
              const isToday = day.dateStr === today
              const isHovered = hoveredDay === day.dateStr
              const isDragOver = dragOverDay === day.dateStr
              const hasNoPosts = dayPosts.length === 0

              const dateObj = new Date(day.dateStr);
              const readableDate = dateObj.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return (
                <div
                  key={`${wi}-${di}`}
                  role="gridcell"
                  aria-label={`${readableDate}. ${dayPosts.length} publicaciones.`}
                  className={`
                    relative min-h-[100px] border-b border-r border-stone-100 dark:border-stone-800 p-2
                    transition-all outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500/30
                    ${!day.isCurrentMonth ? 'bg-stone-50/50 dark:bg-stone-950/30' : ''}
                    ${isToday ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''}
                    ${isDragOver ? 'bg-sky-100/50 dark:bg-sky-900/30 ring-2 ring-inset ring-sky-400' : ''}
                    ${di === 6 ? 'border-r-0' : ''}
                    ${wi === weeks.length - 1 ? 'border-b-0' : ''}
                  `}
                  onMouseEnter={() => setHoveredDay(day.dateStr)}
                  onMouseLeave={() => {
                    setHoveredDay(null)
                    if (isDragOver) setDragOverDay(null)
                  }}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e, day.dateStr)}
                  onDrop={(e) => handleDrop(e, day.dateStr)}
                >
                  <div className="flex items-center justify-between mb-1 pointer-events-none">
                    <span
                      aria-hidden="true"
                      className={`
                        inline-flex items-center justify-center text-sm
                        ${isToday
                          ? 'w-7 h-7 rounded-full bg-sky-500 text-white font-bold'
                          : day.isCurrentMonth
                            ? 'font-medium text-stone-700 dark:text-stone-300'
                            : 'text-stone-400 dark:text-stone-600'
                        }
                      `}
                    >
                      {day.date}
                    </span>

                    {(isHovered || hasNoPosts) && day.isCurrentMonth && !isDragOver && (
                      <button
                        onClick={() => onAddPost(day.dateStr)}
                        className={`
                          w-5 h-5 rounded flex items-center justify-center pointer-events-auto
                          bg-stone-200/70 dark:bg-stone-700/70 hover:bg-stone-300 dark:hover:bg-stone-600 
                          text-stone-500 dark:text-stone-400 transition-all
                          focus:ring-2 focus:ring-sky-500 focus:outline-none
                          ${!isHovered && !hasNoPosts ? 'opacity-0 focus:opacity-100' : 'opacity-100'}
                        `}
                        aria-label={`Agregar contenido el ${readableDate}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 relative z-10">
                    {dayPosts.map((post) => {
                      const typeConfig = contentTypeColors[post.type]
                      const isSelected = selectedPostId === post.id

                      return (
                        <div
                          key={post.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onClick={() => onSelectPost(post)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              onSelectPost(post)
                            }
                          }}
                          aria-label={`Post: ${post.title}. Tipo: ${typeConfig.label}. Estado: ${post.status}.`}
                          className={`
                            w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium truncate
                            transition-all duration-200 ease-out cursor-grab active:cursor-grabbing
                            flex items-center gap-2 group/post
                            focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-stone-900
                            ${isSelected
                              ? 'ring-2 ring-offset-2 dark:ring-offset-stone-900 shadow-md scale-[1.02] z-20'
                              : 'hover:shadow-sm hover:scale-[1.02] active:scale-[0.98] border border-transparent'
                            }
                          `}
                          style={{
                            backgroundColor: typeConfig.bgColor,
                            color: typeConfig.color,
                            borderColor: isSelected ? typeConfig.color : 'transparent',
                            ...(isSelected ? { ringColor: typeConfig.color } : { focusRingColor: typeConfig.color }),
                          }}
                          title={post.title}
                        >
                          <span
                            className={`
                              inline-block w-2 h-2 rounded-full shrink-0 transition-transform duration-300 group-hover/post:scale-110
                              ${STATUS_DOT_COLORS[post.status]}
                              ${post.status === 'scheduled' ? 'animate-pulse' : ''}
                            `}
                          />
                          <span className="truncate flex-1">{post.title}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}