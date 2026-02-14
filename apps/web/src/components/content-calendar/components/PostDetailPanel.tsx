'use client'

import { X, Pencil, Trash2, ExternalLink, Clock, CalendarDays } from 'lucide-react'
import type { ScheduledPost, ContentType, PostStatus, ContentTypeConfig, PostStatusConfig } from '../types'


const STATUS_CONFIG: Record<PostStatus, { label: string; color: string; bg: string }> = {
  idea: { label: 'Idea', color: 'text-stone-600 dark:text-stone-300', bg: 'bg-stone-100 dark:bg-stone-800' },
  draft: { label: 'Borrador', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  scheduled: { label: 'Programado', color: 'text-lime-700 dark:text-lime-300', bg: 'bg-lime-50 dark:bg-lime-950/40' },
  published: { label: 'Publicado', color: 'text-sky-700 dark:text-sky-300', bg: 'bg-sky-50 dark:bg-sky-950/40' },
}

interface PostDetailPanelProps {
  post: ScheduledPost
  contentTypeColors: Record<ContentType, ContentTypeConfig>
  onClose: () => void
  onEdit: (post: ScheduledPost) => void
  onDelete: (post: ScheduledPost) => void
  onViewContent: (post: ScheduledPost) => void
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return date.toLocaleDateString('es-ES', options)
}

export function PostDetailPanel({
  post,
  contentTypeColors,
  onClose,
  onEdit,
  onDelete,
  onViewContent,
}: PostDetailPanelProps) {
  const typeConfig = contentTypeColors[post.type]
  const statusConfig = STATUS_CONFIG[post.status]

  return (
    <div className="w-80 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg overflow-hidden animate-in slide-in-from-right-4 duration-200">
      {/* Header bar with type color */}
      <div className="h-1.5" style={{ backgroundColor: typeConfig.color }} />

      <div className="p-5">
        {/* Close button */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug pr-4">
            {post.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 dark:text-stone-500 transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-5">
          {/* Type badge */}
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
          >
            {typeConfig.label}
          </span>

          {/* Status badge */}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          {/* Date */}
          <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
            <CalendarDays className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            <span className="capitalize">{formatDate(post.date)}</span>
          </div>

          {/* Time */}
          {post.time && (
            <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
              <Clock className="w-4 h-4 text-stone-400 dark:text-stone-500" />
              <span>{post.time} hrs</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-px bg-stone-200 dark:bg-stone-800 mb-5" />

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => onEdit(post)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>

          <button
            onClick={() => onViewContent(post)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver contenido
          </button>

          <button
            onClick={() => onDelete(post)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
