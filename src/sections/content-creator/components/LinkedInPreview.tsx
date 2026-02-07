import { useState } from 'react'
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Globe,
  Copy,
  Check,
  MoreHorizontal,
} from 'lucide-react'

interface Creator {
  name: string
  title: string
  avatar: string
}

interface LinkedInPreviewProps {
  content: string
  hashtags: string[]
  creator: Creator
}

const LINKEDIN_BLUE = '#0A66C2'

export function LinkedInPreview({ content, hashtags, creator }: LinkedInPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const displayContent = content || 'Tu post aparecerá aquí...'
  const hasContent = content.length > 0
  const shouldTruncate = content.split('\n').length > 5 && !isExpanded
  const truncatedContent = shouldTruncate
    ? content.split('\n').slice(0, 5).join('\n')
    : content

  const fullPostText = [content, '', hashtags.join(' ')].join('\n').trim()

  const handleCopyPost = async () => {
    if (!hasContent) return
    try {
      await navigator.clipboard.writeText(fullPostText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format content: preserve newlines and highlight arrows
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {i > 0 && <br />}
        {line}
      </span>
    ))
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
        Vista previa de LinkedIn
      </h3>

      {/* LinkedIn card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Post header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center flex-shrink-0 ring-2 ring-white dark:ring-slate-900">
                <span className="text-lg font-bold text-white dark:text-slate-300">
                  {creator.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {/* Name and title */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  {creator.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                  {creator.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Ahora</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <Globe className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </div>
              </div>
            </div>
            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </button>
          </div>
        </div>

        {/* Post content */}
        <div className="px-4 pb-3">
          <div
            className={`text-sm leading-relaxed whitespace-pre-line ${
              hasContent
                ? 'text-slate-800 dark:text-slate-200'
                : 'text-slate-400 dark:text-slate-600 italic'
            }`}
          >
            {hasContent ? formatContent(truncatedContent) : displayContent}
          </div>

          {/* See more */}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm font-medium mt-1 hover:underline"
              style={{ color: LINKEDIN_BLUE }}
            >
              ...ver más
            </button>
          )}
          {isExpanded && content.split('\n').length > 5 && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sm font-medium mt-1 hover:underline"
              style={{ color: LINKEDIN_BLUE }}
            >
              ver menos
            </button>
          )}

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-1.5 gap-y-0.5">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium cursor-pointer hover:underline"
                  style={{ color: LINKEDIN_BLUE }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Engagement stats bar */}
        {hasContent && (
          <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                <span className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px]" style={{ backgroundColor: LINKEDIN_BLUE }}>
                  <ThumbsUp className="w-2.5 h-2.5 text-white" />
                </span>
                <span className="w-4.5 h-4.5 rounded-full bg-red-500 flex items-center justify-center text-[8px]">
                  <span className="text-white">❤</span>
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">42</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">8 comentarios</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">3 reposts</span>
            </div>
          </div>
        )}

        {/* Action bar */}
        <div className="px-2 py-1 flex items-center justify-around">
          {[
            { icon: ThumbsUp, label: 'Recomendar' },
            { icon: MessageSquare, label: 'Comentar' },
            { icon: Repeat2, label: 'Repostear' },
            { icon: Send, label: 'Enviar' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <Icon className="w-5 h-5 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors" />
              <span className="text-xs font-medium hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Copy post button */}
      {hasContent && (
        <button
          onClick={handleCopyPost}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-200 active:scale-[0.98]
            ${copied
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
              : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 hover:shadow-md'
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Post copiado al portapapeles
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar post completo
            </>
          )}
        </button>
      )}
    </div>
  )
}
