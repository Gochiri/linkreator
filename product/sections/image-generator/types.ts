export type ImageType = 'quote' | 'stat' | 'cover' | 'tip-card'
export type ImageFormat = 'landscape' | 'square' | 'portrait'

export interface ImageTypeOption {
  id: ImageType
  label: string
  icon: string
  description: string
}

export interface FormatOption {
  id: ImageFormat
  label: string
  width: number
  height: number
  ratio: string
}

export interface Image {
  id: string
  type: ImageType
  format: ImageFormat
  text?: string
  author?: string
  headline?: string
  subtext?: string
  source?: string
  title?: string
  body?: string
  number?: string
  bgColor: string
  textColor: string
  accentColor: string
}

export interface BrandColor {
  name: string
  value: string
}

export interface ImageGeneratorData {
  imageTypes: ImageTypeOption[]
  formats: FormatOption[]
  sampleImages: Image[]
  brandColors: BrandColor[]
}
