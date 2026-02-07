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
  today,
}: MonthGridProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const weeks = buildCalendarGrid(year, month)

  // Build a map of dateStr -> posts
  const postsByDate = new Map<string, ScheduledPost[]>()
  for (const post of posts) {
    const existing = postsByDate.get(post.date) || []
    existing.push(post)
    postsByDate.set(post.date, existing)
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-stone-200 dark:border-stone-800">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="px-3 py-2.5 text-xs font-semibold text-stone-500 dark:text-stone-400 text-center uppercase tracking-wider"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar body */}
      <div className="grid grid-cols-7">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const dayPosts = postsByDate.get(day.dateStr) || []
            const isToday = day.dateStr === today
            const isHovered = hoveredDay === day.dateStr
            const hasNoPosts = dayPosts.length === 0

            return (
              <div
                key={`${wi}-${di}`}
                className={`
                  relative min-h-[100px] border-b border-r border-stone-100 dark:border-stone-800 p-2
                  transition-colors
                  ${!day.isCurrentMonth ? 'bg-stone-50/50 dark:bg-stone-950/30' : ''}
                  ${isToday ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''}
                  ${di === 6 ? 'border-r-0' : ''}
                  ${wi === weeks.length - 1 ? 'border-b-0' : ''}
                `}
                onMouseEnter={() => setHoveredDay(day.dateStr)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {/* Day number */}
                <div className="flex items-center justify-between mb-1">
                  <span
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

                  {/* Add button on hover */}
                  {isHovered && hasNoPosts && day.isCurrentMonth && (
                    <button
                      onClick={() => onAddPost(day.dateStr)}
                      className="w-5 h-5 rounded flex items-center justify-center bg-stone-200/70 dark:bg-stone-700/70 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-500 dark:text-stone-400 transition-colors"
                      aria-label={`Agregar post el ${day.date}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Post pills */}
                <div className="space-y-1">
                  {dayPosts.map((post) => {
                    const typeConfig = contentTypeColors[post.type]
                    const isSelected = selectedPostId === post.id

                    return (
                      <button
                        key={post.id}
                        onClick={() => onSelectPost(post)}
                        className={`
                          w-full text-left px-2 py-1 rounded-md text-xs font-medium truncate
                          transition-all duration-150 cursor-pointer
                          flex items-center gap-1.5
                          ${isSelected
                            ? 'ring-2 ring-offset-1 dark:ring-offset-stone-900 shadow-sm'
                            : 'hover:shadow-sm hover:scale-[1.02]'
                          }
                        `}
                        style={{
                          backgroundColor: typeConfig.bgColor,
                          color: typeConfig.color,
                          ...(isSelected ? { ringColor: typeConfig.color } : {}),
                        }}
                        title={post.title}
                      >
                        {/* Status dot */}
                        <span
                          className={`
                            inline-block w-1.5 h-1.5 rounded-full shrink-0
                            ${STATUS_DOT_COLORS[post.status]}
                          `}
                        />
                        <span className="truncate">{post.title}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Hover add button when there are already posts */}
                {isHovered && !hasNoPosts && day.isCurrentMonth && (
                  <button
                    onClick={() => onAddPost(day.dateStr)}
                    className="mt-1 w-full py-0.5 rounded flex items-center justify-center bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 dark:text-stone-500 transition-colors"
                    aria-label={`Agregar post el ${day.date}`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
