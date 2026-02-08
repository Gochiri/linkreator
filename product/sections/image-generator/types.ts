// =============================================================================
// Data Types
// =============================================================================

export type ImageType = 'quote' | 'stat' | 'cover' | 'tip-card'
export type ImageFormat = 'landscape' | 'square' | 'portrait'
export type GenerationMethod = 'template' | 'ai-generated'

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

export interface Template {
  id: string
  name: string
  type: ImageType
  bgColor: string
  textColor: string
  accentColor: string
  preview: string
  fontFamily: string
}

export interface Image {
  id: string
  type: ImageType
  format: ImageFormat
  method: GenerationMethod
  text?: string
  author?: string
  headline?: string
  subtext?: string
  source?: string
  title?: string
  body?: string
  number?: string
  prompt?: string
  bgColor: string
  textColor: string
  accentColor: string
  templateId: string | null
}

export interface BrandColor {
  name: string
  value: string
}

// =============================================================================
// Editor Types
// =============================================================================

export interface TextElement {
  id: string
  content: string
  fontSize: number
  fontFamily: string
  color: string
  position: { x: number; y: number }
  alignment: 'left' | 'center' | 'right'
}

export interface ImageEditorState {
  bgColor: string
  textColor: string
  accentColor: string
  format: FormatOption
  textElements: TextElement[]
  backgroundImage?: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ImageGeneratorProps {
  /** Available image types to choose from */
  imageTypes: ImageTypeOption[]
  /** Available export formats */
  formats: FormatOption[]
  /** Template gallery for quick start */
  templates: Template[]
  /** Sample images for reference */
  sampleImages: Image[]
  /** Brand color palette */
  brandColors: BrandColor[]
  /** Called when user selects generation method */
  onSelectMethod?: (method: GenerationMethod) => void
  /** Called when user selects a template */
  onSelectTemplate?: (templateId: string) => void
  /** Called when user generates image with AI */
  onGenerateWithAI?: (prompt: string) => void
  /** Called when user updates text element */
  onUpdateText?: (elementId: string, content: string) => void
  /** Called when user changes font properties */
  onChangeFont?: (elementId: string, fontFamily: string, fontSize: number) => void
  /** Called when user changes colors */
  onChangeColors?: (colors: { bg: string; text: string; accent: string }) => void
  /** Called when user adds a new element */
  onAddElement?: (type: 'text' | 'shape') => void
  /** Called when user removes an element */
  onRemoveElement?: (elementId: string) => void
  /** Called when user moves an element */
  onMoveElement?: (elementId: string, position: { x: number; y: number }) => void
  /** Called when user changes layout/alignment */
  onChangeLayout?: (alignment: 'left' | 'center' | 'right') => void
  /** Called when user changes format */
  onChangeFormat?: (formatId: ImageFormat) => void
  /** Called when user downloads the image */
  onDownload?: (formatId: ImageFormat) => void
  /** Called when user selects image type */
  onSelectType?: (typeId: ImageType) => void
}

export interface ImageGeneratorData {
  imageTypes: ImageTypeOption[]
  formats: FormatOption[]
  templates: Template[]
  sampleImages: Image[]
  brandColors: BrandColor[]
}
