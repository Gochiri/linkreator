'use client'

import data from '@/components/carousel-builder/data.json'
import { CarouselBuilder } from '@/components/carousel-builder/components/CarouselBuilder'

export default function CarouselBuilderView() {
    const slides = data.sampleCarousel.slides.map((slide) => ({
        id: slide.id,
        type: slide.type,
        title: slide.title,
        subtitle: 'subtitle' in slide ? (slide as { subtitle?: string }).subtitle : undefined,
        body: 'body' in slide ? (slide as { body?: string }).body : undefined,
        slideNumber: slide.slideNumber,
    }))

    const templates = data.templates.map((t) => ({
        id: t.id,
        name: t.name,
        bgColor: t.bgColor,
        textColor: t.textColor,
        accentColor: t.accentColor,
        preview: t.preview,
    }))

    const slideTypes = data.slideTypes.map((st) => ({
        id: st.id,
        label: st.label,
        icon: st.icon,
    }))

    return (
        <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <CarouselBuilder
                initialSlides={slides}
                templates={templates}
                initialTemplateId={data.sampleCarousel.templateId}
                slideTypes={slideTypes}
                carouselTitle={data.sampleCarousel.title}
            />
        </div>
    )
}
