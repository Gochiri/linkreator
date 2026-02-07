import { useState } from 'react'
import { User, Palette, Target, Hash } from 'lucide-react'
import data from '@/../product/sections/brand-avatar-config/data.json'
import { CreatorProfile } from './components/CreatorProfile'
import { BrandTone } from './components/BrandTone'
import { AvatarConfig } from './components/AvatarConfig'
import { HashtagLibrary } from './components/HashtagLibrary'

type Tab = 'profile' | 'tone' | 'avatar' | 'hashtags'

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Perfil del Creador', icon: User },
  { id: 'tone', label: 'Tono de Marca', icon: Palette },
  { id: 'avatar', label: 'Avatar de Audiencia', icon: Target },
  { id: 'hashtags', label: 'Hashtags', icon: Hash },
]

export default function BrandConfigView() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          Marca & Avatar
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Configura tu identidad de marca y define tu audiencia ideal
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'profile' && (
          <CreatorProfile profile={data.creatorProfile} />
        )}
        {activeTab === 'tone' && (
          <BrandTone tone={data.brandTone} />
        )}
        {activeTab === 'avatar' && (
          <AvatarConfig avatar={data.avatar} />
        )}
        {activeTab === 'hashtags' && (
          <HashtagLibrary library={data.hashtagLibrary} />
        )}
      </div>
    </div>
  )
}
