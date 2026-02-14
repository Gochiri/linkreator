'use client'

import { useState } from 'react'
import { Plus, Trash2, LayoutTemplate } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SlideThumbList } from './SlideThumbList'
import { SlideCanvas } from './SlideCanvas'
import { SlideEditor } from './SlideEditor'
import { TemplateStrip } from './TemplateStrip'
import type { Template } from './TemplateStrip'
import type { SlideData } from './SlideCanvas'
import type { SlideTypeOption } from './SlideEditor'


interface CarouselBuilderProps {
  initialSlides: SlideData[]
  templates: Template[]
  initialTemplateId: string
  slideTypes: SlideTypeOption[]
  carouselTitle: string
}

export function CarouselBuilder({
  initialSlides,
  templates,
  initialTemplateId,
  slideTypes,
  carouselTitle,
}: CarouselBuilderProps) {
  const [slides, setSlides] = useState<SlideData[]>(initialSlides)
  const [activeSlideId, setActiveSlideId] = useState(initialSlides[0]?.id ?? '')
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId)

  const activeSlide = slides.find((s) => s.id === activeSlideId) ?? slides[0]
  const activeIndex = slides.findIndex((s) => s.id === activeSlideId)
  const activeTemplate = templates.find((t) => t.id === activeTemplateId) ?? templates[0]

  const templateColors = {
    bgColor: activeTemplate.bgColor,
    textColor: activeTemplate.textColor,
    accentColor: activeTemplate.accentColor,
  }

  function handleSelectSlide(id: string) {
    setActiveSlideId(id)
  }

  function handlePrev() {
    if (activeIndex > 0) {
      setActiveSlideId(slides[activeIndex - 1].id)
    }
  }

  function handleNext() {
    if (activeIndex < slides.length - 1) {
      setActiveSlideId(slides[activeIndex + 1].id)
    }
  }

  function handleChangeType(type: string) {
    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlideId ? { ...s, type } : s))
    )
  }

  function handleChangeTitle(title: string) {
    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlideId ? { ...s, title } : s))
    )
  }

  function handleChangeBody(body: string) {
    setSlides((prev) =>
      prev.map((s) => (s.id === activeSlideId ? { ...s, body } : s))
    )
  }

  function handleAddSlide() {
    const newSlide: SlideData = {
      id: `slide-${Date.now()}`,
      type: 'content',
      title: 'Nueva diapositiva',
      body: 'Escribe tu contenido aqui...',
      slideNumber: slides.length + 1,
    }
    setSlides((prev) => [...prev, newSlide])
    setActiveSlideId(newSlide.id)
  }

  function handleDeleteSlide() {
    if (slides.length <= 1) return
    const newSlides = slides
      .filter((s) => s.id !== activeSlideId)
      .map((s, i) => ({ ...s, slideNumber: i + 1 }))
    setSlides(newSlides)
    const newIndex = Math.min(activeIndex, newSlides.length - 1)
    setActiveSlideId(newSlides[newIndex].id)
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-lime-100 dark:bg-lime-900/40">
            <LayoutTemplate className="w-5 h-5 text-lime-600 dark:text-lime-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Constructor de Carrusel
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {carouselTitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {slides.length} diapositivas
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Slide Thumbnails */}
        <div className="w-52 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <SlideThumbList
            slides={slides.map((s) => ({
              id: s.id,
              type: s.type,
              title: s.title,
              slideNumber: s.slideNumber,
            }))}
            activeSlideId={activeSlideId}
            onSelectSlide={handleSelectSlide}
          />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-950">
          <SlideCanvas
            slide={activeSlide}
            template={templateColors}
            totalSlides={slides.length}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < slides.length - 1}
          />
        </div>

        {/* Right Sidebar - Editor */}
        <div className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <SlideEditor
            slideId={activeSlide.id}
            slideNumber={activeSlide.slideNumber}
            slideType={activeSlide.type}
            title={activeSlide.title}
            body={activeSlide.body ?? ''}
            slideTypes={slideTypes}
            onChangeType={handleChangeType}
            onChangeTitle={handleChangeTitle}
            onChangeBody={handleChangeBody}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={cn(
          'flex items-center justify-between px-5 py-3',
          'bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800'
        )}
      >
        {/* Template Strip */}
        <TemplateStrip
          templates={templates}
          activeTemplateId={activeTemplateId}
          onSelectTemplate={setActiveTemplateId}
        />

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddSlide}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteSlide}
            disabled={slides.length <= 1}
            className="gap-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
