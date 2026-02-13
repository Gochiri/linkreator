'use client'

import { useState } from 'react'
import { PenLine } from 'lucide-react'
import { ContentTypeSelector } from './ContentTypeSelector'
import { PostEditor } from './PostEditor'
import { HashtagPanel } from './HashtagPanel'
import { LinkedInPreview } from './LinkedInPreview'

interface ContentType {
  id: string
  label: string
  icon: string
  description: string
}

interface SamplePost {
  id: string
  type: string
  content: string
  hashtags: string[]
  charCount: number
  tone: string
}

interface BrandTone {
  style: string
  traits: string[]
  rules: string[]
}

interface Creator {
  name: string
  title: string
  avatar: string
}

interface ContentCreatorProps {
  contentTypes: ContentType[]
  samplePosts: SamplePost[]
  suggestedHashtags: Record<string, string[]>
  brandTone: BrandTone
  creator: Creator
}

export function ContentCreator({
  contentTypes,
  samplePosts,
  suggestedHashtags,
  brandTone,
  creator,
}: ContentCreatorProps) {
  const [activeType, setActiveType] = useState(contentTypes[0]?.id || 'tip')
  const [postContent, setPostContent] = useState('')
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  const handleToggleHashtag = (hashtag: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(hashtag) ? prev.filter((h) => h !== hashtag) : [...prev, hashtag]
    )
  }

  const handleGenerate = (post: SamplePost) => {
    setPostContent(post.content)
    setSelectedHashtags(post.hashtags)
  }

  const handleTypeSelect = (typeId: string) => {
    setActiveType(typeId)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-white dark:text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Content Creator
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Crea contenido de LinkedIn que conecta y convierte
            </p>
          </div>
        </div>
      </div>

      {/* Main grid: left sidebar + center + right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar: Content type selector */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 lg:sticky lg:top-6">
            <ContentTypeSelector
              contentTypes={contentTypes}
              activeType={activeType}
              onSelect={handleTypeSelect}
            />

            {/* Brand tone rules */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
                Reglas de tono
              </h4>
              <ul className="space-y-2">
                {brandTone.rules.slice(0, 4).map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-snug"
                  >
                    <span className="text-slate-300 dark:text-slate-600 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Center: Editor + Preview */}
        <div className="lg:col-span-6 space-y-6">
          {/* Post Editor */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <PostEditor
              content={postContent}
              onChange={setPostContent}
              samplePosts={samplePosts}
              activeType={activeType}
              brandTone={brandTone}
              onGenerate={handleGenerate}
            />
          </div>

          {/* LinkedIn Preview */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <LinkedInPreview
              content={postContent}
              hashtags={selectedHashtags}
              creator={creator}
            />
          </div>
        </div>

        {/* Right sidebar: Hashtags */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 lg:sticky lg:top-6">
            <HashtagPanel
              suggestedHashtags={suggestedHashtags}
              selectedHashtags={selectedHashtags}
              onToggleHashtag={handleToggleHashtag}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
