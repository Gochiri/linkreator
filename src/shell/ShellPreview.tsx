import {
  PenLine,
  Layers,
  ImagePlus,
  UserCircle,
  CalendarDays,
  Bookmark,
  LayoutGrid,
} from 'lucide-react'
import { AppShell } from './components/AppShell'
import type { NavigationItem } from './components/MainNav'
import type { User } from './components/UserMenu'

export default function ShellPreview() {
  const navigationItems: NavigationItem[] = [
    { label: 'Content Creator', href: '/content-creator', icon: PenLine, isActive: true },
    { label: 'Carousel Builder', href: '/carousel-builder', icon: Layers },
    { label: 'Image Generator', href: '/image-generator', icon: ImagePlus },
    { label: 'Brand & Avatar', href: '/brand-avatar', icon: UserCircle },
    { label: 'Content Calendar', href: '/content-calendar', icon: CalendarDays },
    { label: 'Content Sources', href: '/content-sources', icon: Bookmark },
    { label: 'Canvas', href: '/canvas', icon: LayoutGrid },
  ]

  const user: User = {
    name: 'German Alvarez',
    email: 'german@example.com',
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="p-8">
        <h1
          className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Content Creator
        </h1>
        <p
          className="text-slate-600 dark:text-slate-400"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Genera posts de LinkedIn con tu tono de marca, storytelling y hashtags optimizados.
        </p>
      </div>
    </AppShell>
  )
}
