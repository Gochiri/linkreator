import React from 'react'
import { ImageTypeSelector, type ImageType } from './ImageTypeSelector'
import { TemplateGallery, type SampleImage } from './TemplateGallery'
import { ImageCanvas, type FormatSpec } from './ImageCanvas'
import { ImageControls, type BrandColor } from './ImageControls'

interface ImageGeneratorProps {
  imageTypes: ImageType[]
  formats: FormatSpec[]
  sampleImages: SampleImage[]
  brandColors: BrandColor[]
}

function getDefaultTextForType(type: string): SampleImage {
  const defaults: Record<string, SampleImage> = {
    quote: {
      id: 'default-quote',
      type: 'quote',
      format: 'square',
      text: 'El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.',
      author: 'Tu Nombre',
      bgColor: '#1C1917',
      textColor: '#FAFAF9',
      accentColor: '#84CC16',
    },
    stat: {
      id: 'default-stat',
      type: 'stat',
      format: 'landscape',
      headline: '85%',
      subtext: 'de los profesionales consideran LinkedIn como la red social más efectiva para generar leads B2B',
      source: 'HubSpot 2024',
      bgColor: '#0F172A',
      textColor: '#F8FAFC',
      accentColor: '#0EA5E9',
    },
    cover: {
      id: 'default-cover',
      type: 'cover',
      format: 'landscape',
      text: 'Cómo escalar tu negocio digital en 2024',
      bgColor: '#1C1917',
      textColor: '#FAFAF9',
      accentColor: '#F59E0B',
    },
    'tip-card': {
      id: 'default-tip',
      type: 'tip-card',
      format: 'square',
      title: 'Consejo profesional',
      body: 'Dedica los primeros 30 minutos de tu día a la tarea más importante.',
      number: '01',
      bgColor: '#FAFAF9',
      textColor: '#1C1917',
      accentColor: '#84CC16',
    },
  }
  return defaults[type] ?? defaults.quote
}

function getMainText(image: SampleImage): string {
  switch (image.type) {
    case 'quote':
      return image.text ?? ''
    case 'stat':
      return image.headline ?? ''
    case 'tip-card':
      return image.body ?? ''
    case 'cover':
      return image.text ?? image.title ?? ''
    default:
      return image.text ?? ''
  }
}

export function ImageGenerator({
  imageTypes,
  formats,
  sampleImages,
  brandColors,
}: ImageGeneratorProps) {
  const [activeType, setActiveType] = React.useState(imageTypes[0]?.id ?? 'quote')
  const [activeFormat, setActiveFormat] = React.useState(formats[1]?.id ?? 'square')
  const [selectedImage, setSelectedImage] = React.useState<SampleImage | null>(null)
  const [editedText, setEditedText] = React.useState('')

  // Filter templates for the active type
  const filteredTemplates = sampleImages.filter((img) => img.type === activeType)

  // Current image to display (selected or default)
  const currentImage = selectedImage?.type === activeType
    ? selectedImage
    : filteredTemplates[0] ?? getDefaultTextForType(activeType)

  // Current format spec
  const currentFormat = formats.find((f) => f.id === activeFormat) ?? formats[1] ?? formats[0]

  // Sync edited text when image changes
  React.useEffect(() => {
    setEditedText(getMainText(currentImage))
  }, [currentImage.id, currentImage.type])

  const handleTypeChange = (typeId: string) => {
    setActiveType(typeId)
    setSelectedImage(null)
  }

  const handleTemplateSelect = (template: SampleImage) => {
    setSelectedImage(template)
    setActiveFormat(template.format)
  }

  const handleBgColorChange = (color: string) => {
    if (selectedImage) {
      setSelectedImage({ ...selectedImage, bgColor: color })
    } else {
      const img = { ...currentImage, bgColor: color }
      setSelectedImage(img)
    }
  }

  const handleDownload = () => {
    console.log('Download image:', {
      image: currentImage,
      format: currentFormat,
      text: editedText,
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Generador de imágenes
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Crea imágenes profesionales para tus publicaciones de LinkedIn
        </p>
      </div>

      {/* Image type selector */}
      <div className="mb-6">
        <ImageTypeSelector
          types={imageTypes}
          activeType={activeType}
          onSelect={handleTypeChange}
        />
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar - Template gallery */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
            {filteredTemplates.length > 0 ? (
              <TemplateGallery
                templates={filteredTemplates}
                activeTemplateId={currentImage.id}
                onSelect={handleTemplateSelect}
              />
            ) : (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-1">
                  Plantillas
                </h3>
                <TemplateGallery
                  templates={[getDefaultTextForType(activeType)]}
                  activeTemplateId={currentImage.id}
                  onSelect={handleTemplateSelect}
                />
              </div>
            )}
          </div>
        </div>

        {/* Center - Image canvas */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 flex items-center justify-center min-h-[400px]">
            <ImageCanvas
              image={currentImage}
              format={currentFormat}
              editedText={editedText}
            />
          </div>
        </div>

        {/* Right sidebar - Controls */}
        <div className="lg:col-span-4">
          <ImageControls
            formats={formats}
            activeFormatId={activeFormat}
            onFormatChange={setActiveFormat}
            brandColors={brandColors}
            activeBgColor={currentImage.bgColor}
            onBgColorChange={handleBgColorChange}
            editedText={editedText}
            onTextChange={setEditedText}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  )
}
