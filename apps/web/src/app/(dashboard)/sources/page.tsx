'use client'

import { useState } from 'react'
import data from '@/components/content-sources/data.json'
import { ContentSource } from '@/components/content-sources/types'
import { SourceInput } from '@/components/content-sources/components/SourceInput'
import { YouTubePreview } from '@/components/content-sources/components/YouTubePreview'
import { ExtractedIdeas } from '@/components/content-sources/components/ExtractedIdeas'
import { SourceLibrary } from '@/components/content-sources/components/SourceLibrary'

export default function ContentSourcesView() {
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showExtracted, setShowExtracted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const savedSources = data.savedSources as unknown as ContentSource[]
  const currentInput = data.currentInput

  const isYouTubeUrl = (text: string) =>
    /youtube\.com|youtu\.be/i.test(text)

  const detectedType = isYouTubeUrl(inputValue) ? 'youtube' : inputValue.length > 0 ? 'text' : null

  const handleExtract = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowExtracted(true)
    }, 800)
  }

  const handleLoadExample = () => {
    setInputValue('https://www.youtube.com/watch?v=example-new')
    setTimeout(() => {
      setShowExtracted(true)
    }, 300)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Fuentes de contenido
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Transforma referencias e inspiración en posts de LinkedIn
        </p>
      </div>

      {/* Source Input */}
      <SourceInput
        value={inputValue}
        onChange={setInputValue}
        detectedType={detectedType}
        isProcessing={isProcessing}
        onExtract={handleExtract}
        onLoadExample={handleLoadExample}
      />

      {/* YouTube Preview + Extracted Ideas */}
      {showExtracted && (
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* YouTube Preview */}
          {(detectedType === 'youtube' || isYouTubeUrl(inputValue)) && (
            <YouTubePreview
              title={currentInput.title}
              channel={currentInput.channel}
              duration={currentInput.duration}
            />
          )}

          {/* Extracted Ideas */}
          <ExtractedIdeas
            ideas={currentInput.extractedIdeas}
            onCreatePost={(selected) => console.log('Create post with:', selected)}
            onSave={() => console.log('Save source')}
          />
        </div>
      )}

      {/* Source Library */}
      <div className="mt-10">
        <SourceLibrary
          sources={savedSources}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </div>
  )
}
