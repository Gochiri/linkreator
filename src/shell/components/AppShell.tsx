import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MainNav, type NavigationItem } from './MainNav'
import { UserMenu, type User } from './UserMenu'

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: User
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span
            className="font-bold text-blue-600"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            LinKreator
          </span>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-900/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          transform transition-transform duration-200 ease-out
          md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-800">
            <span
              className="text-xl font-bold text-blue-600"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              LinKreator
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <MainNav
              items={navigationItems}
              onNavigate={(href) => {
                onNavigate?.(href)
                setMobileMenuOpen(false)
              }}
            />
          </nav>

          {/* User menu */}
          {user && (
            <div className="border-t border-slate-200 dark:border-slate-800 p-4">
              <UserMenu user={user} onLogout={onLogout} />
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="md:pl-64 pt-14 md:pt-0 min-h-screen">
        <div className="h-full">{children}</div>
      </main>
    </div>
  )
}
