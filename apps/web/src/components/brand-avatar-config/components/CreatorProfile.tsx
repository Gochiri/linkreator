'use client'

import { useState } from 'react'
import { Camera, User, Briefcase, Quote, Building2, FileText, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreatorProfileProps {
  profile: {
    name: string
    title: string
    tagline: string
    industry: string
    bio: string
    avatar: string
  }
}

const industries = [
  'Tecnología / Automatización',
  'Marketing Digital',
  'Diseño / UX',
  'Educación',
  'Consultoría',
  'E-commerce',
  'Finanzas',
  'Salud / Bienestar',
]

export function CreatorProfile({ profile }: CreatorProfileProps) {
  const [name, setName] = useState(profile.name)
  const [title, setTitle] = useState(profile.title)
  const [tagline, setTagline] = useState(profile.tagline)
  const [industry, setIndustry] = useState(profile.industry)
  const [bio, setBio] = useState(profile.bio)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Form Column */}
      <div className="lg:col-span-3 space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-start gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-800 border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center overflow-hidden">
              <User className="w-10 h-10 text-stone-400 dark:text-stone-500" />
            </div>
            <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex-1 pt-2">
            <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">
              Foto de perfil
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Se mostrara en las previsualizaciones de tus publicaciones. Recomendado: 400x400px.
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-stone-700 dark:text-stone-300">
            <User className="w-3.5 h-3.5" />
            Nombre
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-stone-700 dark:text-stone-300">
            <Briefcase className="w-3.5 h-3.5" />
            Titulo profesional
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Automatizaciones & IA"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <Label className="text-stone-700 dark:text-stone-300">
            <Quote className="w-3.5 h-3.5" />
            Tagline
          </Label>
          <Input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Una frase que te define"
          />
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Esta frase aparecera debajo de tu nombre en las previsualizaciones.
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="text-stone-700 dark:text-stone-300">
            <Building2 className="w-3.5 h-3.5" />
            Industria
          </Label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full h-9 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-sm text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-stone-400/50"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label className="text-stone-700 dark:text-stone-300">
            <FileText className="w-3.5 h-3.5" />
            Bio
          </Label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Describe brevemente que haces y como ayudas..."
            className="w-full rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/50 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-stone-400/50 resize-none"
          />
          <p className="text-xs text-stone-400 dark:text-stone-500 text-right">
            {bio.length}/300 caracteres
          </p>
        </div>
      </div>

      {/* Preview Column */}
      <div className="lg:col-span-2">
        <div className="sticky top-6">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400 mb-4 lg:hidden"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Ocultar' : 'Ver'} previsualización
          </button>

          <div className={`${showPreview ? 'block' : 'hidden'} lg:block`}>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              Previsualización
            </p>

            {/* Profile Card Preview */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
              {/* Cover */}
              <div className="h-20 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />

              {/* Profile Content */}
              <div className="px-5 pb-5">
                {/* Avatar */}
                <div className="w-16 h-16 -mt-8 rounded-full bg-stone-100 dark:bg-stone-800 border-3 border-white dark:border-stone-900 flex items-center justify-center mb-3">
                  <User className="w-7 h-7 text-stone-400 dark:text-stone-500" />
                </div>

                <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {name || 'Tu Nombre'}
                </h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                  {title || 'Tu titulo profesional'}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-500 italic mt-1">
                  "{tagline || 'Tu tagline aqui'}"
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <Building2 className="w-3 h-3" />
                    {industry || 'Industria'}
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 mt-3 leading-relaxed line-clamp-3">
                  {bio || 'Tu biografia aparecera aqui...'}
                </p>
              </div>
            </div>

            {/* LinkedIn-style mini preview */}
            <div className="mt-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                Asi se vera en un post
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-stone-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {name || 'Tu Nombre'}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    {title || 'Tu titulo profesional'}
                  </p>
                  <p className="text-xs text-stone-400 dark:text-stone-500">
                    Ahora mismo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
