import { Flame, TrendingUp, CalendarDays } from 'lucide-react'
import type { PublishingStatsData } from '../types'

interface PublishingStatsProps {
  stats: PublishingStatsData
  weeklyGoal: number
}

export function PublishingStats({ stats, weeklyGoal }: PublishingStatsProps) {
  const weeklyProgress = Math.min((stats.thisWeek / weeklyGoal) * 100, 100)

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {/* Streak */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40">
          <Flame className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {stats.streak} dias de racha
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Publicando
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-stone-200 dark:bg-stone-700" />

      {/* This Week */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40">
          <TrendingUp className="w-4 h-4 text-sky-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              {stats.thisWeek}/{weeklyGoal} posts
            </p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-20 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              esta semana
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-stone-200 dark:bg-stone-700" />

      {/* This Month */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/40">
          <CalendarDays className="w-4 h-4 text-violet-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {stats.thisMonth} posts
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            este mes
          </p>
        </div>
      </div>
    </div>
  )
}
