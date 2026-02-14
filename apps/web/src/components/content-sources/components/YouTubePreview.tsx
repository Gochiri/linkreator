import { Play, Clock, User } from 'lucide-react'

interface YouTubePreviewProps {
  title: string
  channel: string
  duration: string
}

export function YouTubePreview({ title, channel, duration }: YouTubePreviewProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
      <div className="flex gap-4 p-4">
        {/* Thumbnail placeholder */}
        <div className="relative w-48 h-28 rounded-xl bg-stone-900 dark:bg-stone-800 flex items-center justify-center shrink-0 overflow-hidden">
          {/* Fake video gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950" />

          {/* Play button */}
          <div className="relative z-10 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {channel}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-medium">
              <Play className="w-3 h-3" fill="currentColor" />
              YouTube
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
