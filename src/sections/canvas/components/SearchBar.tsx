import { Search } from 'lucide-react'

interface SearchBarProps {
  value?: string
  onChange?: (query: string) => void
}

export function SearchBar({ value = '', onChange }: SearchBarProps) {
  return (
    <div className="flex-1 max-w-2xl relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search notes, links, tags..."
        className="
          w-full pl-12 pr-4 py-3 rounded-xl
          bg-slate-100 dark:bg-slate-800
          border border-transparent
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-500 dark:placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all
        "
      />
    </div>
  )
}
