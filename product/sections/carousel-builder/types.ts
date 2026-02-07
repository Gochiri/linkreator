export type SlideType = 'cover' | 'content' | 'quote' | 'stats' | 'cta'

export interface CarouselTemplate {
  id: string
  name: string
  bgColor: string
  textColor: string
  accentColor: string
  preview: string
}

export interface Slide {
  id: string
  type: SlideType
  title: string
  subtitle?: string
  body?: string
  slideNumber: number
}

export interface Carousel {
  id: string
  title: string
  templateId: string
  slides: Slide[]
}

export interface SlideTypeOption {
  id: SlideType
  label: string
  icon: string
}

export interface CarouselBuilderData {
  templates: CarouselTemplate[]
  sampleCarousel: Carousel
  slideTypes: SlideTypeOption[]
}
