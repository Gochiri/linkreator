'use client'

import { useState } from 'react'
import {
  SlidersHorizontal,
  Bookmark,
  MessageSquare,
  ListChecks,
  Sparkles,
  X,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BrandToneProps {
  tone: {
    formalCasual: number
    technicalSimple: number
    seriousHumor: number
    inspirationalPractical: number
    references: string[]
    voiceTraits: string[]
    writingRules: string[]
  }
}

interface ToneSliderProps {
  leftLabel: string
  rightLabel: string
  value: number
  onChange: (value: number) => void
  color: string
}

function ToneSlider({ leftLabel, rightLabel, value, onChange, color }: ToneSliderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)))
    onChange(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)))
    onChange(percentage)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
          {leftLabel}
        </span>
        <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
          {value}%
        </span>
        <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
          {rightLabel}
        </span>
      </div>
      <div
        className="relative h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full cursor-pointer select-none"
        onClick={handleBarClick}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
        {/* Marker / Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full border-2 border-white dark:border-stone-900 shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing"
          style={{ left: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function BrandTone({ tone }: BrandToneProps) {
  const [formalCasual, setFormalCasual] = useState(tone.formalCasual)
  const [technicalSimple, setTechnicalSimple] = useState(tone.technicalSimple)
  const [seriousHumor, setSeriousHumor] = useState(tone.seriousHumor)
  const [inspirationalPractical, setInspirationalPractical] = useState(tone.inspirationalPractical)
  const [references, setReferences] = useState(tone.references)
  const [voiceTraits, setVoiceTraits] = useState(tone.voiceTraits)
  const [writingRules] = useState(tone.writingRules)
  const [expandedRule, setExpandedRule] = useState<number | null>(null)
  const [newTrait, setNewTrait] = useState('')
  const [showAddTrait, setShowAddTrait] = useState(false)

  const removeVoiceTrait = (index: number) => {
    setVoiceTraits(voiceTraits.filter((_, i) => i !== index))
  }

  const addVoiceTrait = () => {
    if (newTrait.trim()) {
      setVoiceTraits([...voiceTraits, newTrait.trim()])
      setNewTrait('')
      setShowAddTrait(false)
    }
  }

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index))
  }

  // Generate sample text based on tone values
  const getSampleText = () => {
    if (inspirationalPractical > 50) {
      return '3 automatizaciones que puedes implementar hoy en tu negocio:\n\n→ Email de bienvenida automatico con Zapier\n→ Lead scoring con Make + Google Sheets\n→ Reporte semanal automatizado con N8N\n\nNo necesitas ser tecnico.\nSolo necesitas empezar.'
    }
    return 'El 90% de los emprendedores pierden 10+ horas semanales en tareas que una IA podria resolver.\n\nNo es cuestion de talento.\nEs cuestion de sistemas.\n\nLa pregunta no es si automatizar.\nEs que automatizar primero.'
  }

  return (
    <div className="space-y-8">
      {/* Tone Sliders */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="w-4 h-4 text-stone-500" />
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Espectro de tono
          </h3>
        </div>

        <div className="space-y-6">
          <ToneSlider
            leftLabel="Formal"
            rightLabel="Casual"
            value={formalCasual}
            onChange={setFormalCasual}
            color="#0ea5e9"
          />
          <ToneSlider
            leftLabel="Tecnico"
            rightLabel="Simple"
            value={technicalSimple}
            onChange={setTechnicalSimple}
            color="#8b5cf6"
          />
          <ToneSlider
            leftLabel="Serio"
            rightLabel="Humor"
            value={seriousHumor}
            onChange={setSeriousHumor}
            color="#f59e0b"
          />
          <ToneSlider
            leftLabel="Inspiracional"
            rightLabel="Practico"
            value={inspirationalPractical}
            onChange={setInspirationalPractical}
            color="#10b981"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: References + Voice Traits */}
        <div className="space-y-6">
          {/* References */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-4 h-4 text-stone-500" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Referencias
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Creadores cuyo estilo te inspira.
            </p>
            <div className="flex flex-wrap gap-2">
              {references.map((ref, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-sm font-medium border border-sky-200 dark:border-sky-800"
                >
                  {ref}
                  <button
                    onClick={() => removeReference(i)}
                    className="hover:text-sky-900 dark:hover:text-sky-100 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-stone-300 dark:border-stone-600 text-sm text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 transition-colors">
                <Plus className="w-3 h-3" />
                Agregar
              </button>
            </div>
          </div>

          {/* Voice Traits */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-stone-500" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Rasgos de voz
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Palabras clave que definen como suenas.
            </p>
            <div className="flex flex-wrap gap-2">
              {voiceTraits.map((trait, i) => (
                <button
                  key={i}
                  onClick={() => removeVoiceTrait(i)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 text-sm font-medium border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-950/60 transition-colors"
                >
                  {trait}
                  <X className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              {showAddTrait ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    addVoiceTrait()
                  }}
                  className="inline-flex"
                >
                  <input
                    autoFocus
                    value={newTrait}
                    onChange={(e) => setNewTrait(e.target.value)}
                    onBlur={() => {
                      if (!newTrait.trim()) setShowAddTrait(false)
                    }}
                    placeholder="Nuevo rasgo..."
                    className="w-28 px-3 py-1.5 rounded-full border border-violet-300 dark:border-violet-700 bg-transparent text-sm outline-none focus:ring-1 focus:ring-violet-400 text-stone-900 dark:text-stone-100"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowAddTrait(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-stone-300 dark:border-stone-600 text-sm text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Agregar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Writing Rules */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-4 h-4 text-stone-500" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Reglas de escritura
              </h3>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
              Lineamientos que la IA seguira al generar contenido.
            </p>
            <div className="space-y-1">
              {writingRules.map((rule, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedRule(expandedRule === i ? null : i)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                >
                  <span className="w-5 h-5 rounded-md bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-medium text-stone-500 dark:text-stone-400 shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-stone-700 dark:text-stone-300">
                    {rule}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-stone-400 transition-transform ${expandedRule === i ? 'rotate-90' : ''
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Asi suena tu marca:
          </h3>
          <Badge variant="secondary" className="text-xs">
            Preview
          </Badge>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-5 border border-stone-100 dark:border-stone-700/50">
          <div className="whitespace-pre-line text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-[inherit]">
            {getSampleText()}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Tono {formalCasual > 50 ? 'casual' : 'formal'} ({formalCasual}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {technicalSimple > 50 ? 'Simple' : 'Tecnico'} ({technicalSimple}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {inspirationalPractical > 50 ? 'Practico' : 'Inspiracional'} ({inspirationalPractical}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
