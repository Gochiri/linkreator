import { useState } from 'react'
import {
  User,
  Briefcase,
  Calendar,
  Building2,
  AlertTriangle,
  Target,
  Globe,
  Heart,
  X,
  Plus,
  Pencil,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AvatarConfigProps {
  avatar: {
    name: string
    role: string
    age: string
    industry: string
    painPoints: string[]
    goals: string[]
    platforms: string[]
    contentPreferences: string[]
  }
}

const platformIcons: Record<string, string> = {
  LinkedIn: '💼',
  'Twitter/X': '𝕏',
  YouTube: '▶',
  Instagram: '📷',
  TikTok: '🎵',
}

export function AvatarConfig({ avatar }: AvatarConfigProps) {
  const [name, setName] = useState(avatar.name)
  const [role, setRole] = useState(avatar.role)
  const [age, setAge] = useState(avatar.age)
  const [industry, setIndustry] = useState(avatar.industry)
  const [painPoints, setPainPoints] = useState(avatar.painPoints)
  const [goals, setGoals] = useState(avatar.goals)
  const [platforms, setPlatforms] = useState(avatar.platforms)
  const [contentPreferences, setContentPreferences] = useState(avatar.contentPreferences)
  const [editingField, setEditingField] = useState<string | null>(null)

  const removePainPoint = (index: number) => {
    setPainPoints(painPoints.filter((_, i) => i !== index))
  }

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const removePreference = (index: number) => {
    setContentPreferences(contentPreferences.filter((_, i) => i !== index))
  }

  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform))
    } else {
      setPlatforms([...platforms, platform])
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Persona Card - Left */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm sticky top-6">
          {/* Card Header with Gradient */}
          <div className="h-24 bg-gradient-to-br from-emerald-400 to-teal-600 relative">
            <div className="absolute -bottom-8 left-5">
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-stone-900 border-3 border-white dark:border-stone-900 shadow-lg flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="pt-12 px-5 pb-5">
            {/* Editable Name */}
            {editingField === 'name' ? (
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                className="text-lg font-bold bg-transparent border-b border-stone-300 dark:border-stone-600 outline-none w-full text-stone-900 dark:text-stone-100"
              />
            ) : (
              <h3
                onClick={() => setEditingField('name')}
                className="text-lg font-bold text-stone-900 dark:text-stone-100 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 transition-colors group flex items-center gap-2"
              >
                {name}
                <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            )}

            {/* Info Items */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                <Briefcase className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                {editingField === 'role' ? (
                  <input
                    autoFocus
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                    className="bg-transparent border-b border-stone-300 dark:border-stone-600 outline-none w-full text-stone-900 dark:text-stone-100 text-sm"
                  />
                ) : (
                  <span
                    onClick={() => setEditingField('role')}
                    className="cursor-pointer hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                  >
                    {role}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                <Calendar className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                {editingField === 'age' ? (
                  <input
                    autoFocus
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                    className="bg-transparent border-b border-stone-300 dark:border-stone-600 outline-none w-full text-stone-900 dark:text-stone-100 text-sm"
                  />
                ) : (
                  <span
                    onClick={() => setEditingField('age')}
                    className="cursor-pointer hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                  >
                    {age} anos
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                <Building2 className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                {editingField === 'industry' ? (
                  <input
                    autoFocus
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                    className="bg-transparent border-b border-stone-300 dark:border-stone-600 outline-none w-full text-stone-900 dark:text-stone-100 text-sm"
                  />
                ) : (
                  <span
                    onClick={() => setEditingField('industry')}
                    className="cursor-pointer hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                  >
                    {industry}
                  </span>
                )}
              </div>
            </div>

            {/* Platforms */}
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Plataformas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(platformIcons).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      platforms.includes(platform)
                        ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-200 dark:border-stone-700 opacity-50'
                    }`}
                  >
                    <span>{platformIcons[platform]}</span>
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details - Right */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pain Points */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Puntos de dolor
            </h3>
            <Badge variant="secondary" className="text-xs ml-auto">
              {painPoints.length}
            </Badge>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Los problemas y frustraciones principales de tu audiencia.
          </p>

          <div className="space-y-2">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 px-3 py-2.5 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800/50 transition-colors"
              >
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="flex-1 text-sm text-stone-700 dark:text-stone-300">
                  {point}
                </span>
                <button
                  onClick={() => removePainPoint(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-stone-300 dark:border-stone-600 text-sm text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 transition-colors w-full">
              <Plus className="w-3.5 h-3.5" />
              Agregar punto de dolor
            </button>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Objetivos
            </h3>
            <Badge variant="secondary" className="text-xs ml-auto">
              {goals.length}
            </Badge>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Lo que tu audiencia quiere lograr.
          </p>

          <div className="space-y-2">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 px-3 py-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors"
              >
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="flex-1 text-sm text-stone-700 dark:text-stone-300">
                  {goal}
                </span>
                <button
                  onClick={() => removeGoal(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-stone-300 dark:border-stone-600 text-sm text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 transition-colors w-full">
              <Plus className="w-3.5 h-3.5" />
              Agregar objetivo
            </button>
          </div>
        </div>

        {/* Content Preferences */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Preferencias de contenido
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Tipos de contenido que resuenan con tu audiencia.
          </p>

          <div className="flex flex-wrap gap-2">
            {contentPreferences.map((pref, i) => (
              <button
                key={i}
                onClick={() => removePreference(i)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 text-sm font-medium border border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-950/50 transition-colors"
              >
                {pref}
                <X className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-stone-300 dark:border-stone-600 text-sm text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 transition-colors">
              <Plus className="w-3 h-3" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
