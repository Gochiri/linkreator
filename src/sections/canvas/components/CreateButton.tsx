import { Plus, FileText, Link } from 'lucide-react'
import { useState } from 'react'

interface CreateButtonProps {
  onCreateNote?: () => void
  onCreateLink?: () => void
}

export function CreateButton({ onCreateNote, onCreateLink }: CreateButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-4 py-3 rounded-xl
          bg-blue-600 hover:bg-blue-700
          text-white font-medium text-sm
          transition-all shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        "
      >
        <Plus className="w-4 h-4" />
        Create
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
            <button
              onClick={() => {
                onCreateNote?.()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">New Note</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Create markdown note</div>
              </div>
            </button>
            <button
              onClick={() => {
                onCreateLink?.()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-t border-slate-200 dark:border-slate-700"
            >
              <Link className="w-4 h-4 text-amber-500" />
              <div className="text-left">
                <div className="font-medium">New Link</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Save reference link</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
