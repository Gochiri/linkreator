import { Video, FileText, Sparkles, Loader2, Link } from 'lucide-react'

interface SourceInputProps {
  value: string
  onChange: (value: string) => void
  detectedType: 'youtube' | 'text' | null
  isProcessing: boolean
  onExtract: () => void
  onLoadExample: () => void
}

export function SourceInput({
  value,
  onChange,
  detectedType,
  isProcessing,
  onExtract,
  onLoadExample,
}: SourceInputProps) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
      {/* Detection indicator */}
      {detectedType && (
        <div className={`
          flex items-center gap-2 px-5 py-2 text-xs font-medium
          ${detectedType === 'youtube'
            ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
            : 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400'
          }
        `}>
          {detectedType === 'youtube' ? (
            <>
              <Video className="w-3.5 h-3.5" />
              YouTube detectado
            </>
          ) : (
            <>
              <FileText className="w-3.5 h-3.5" />
              Texto de referencia
            </>
          )}
        </div>
      )}

      {/* Input area */}
      <div className="p-5">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pega un link de YouTube, texto de referencia, o escribe tus ideas..."
          rows={4}
          className="w-full text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 bg-transparent outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
        <button
          onClick={onLoadExample}
          className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          <Link className="w-3.5 h-3.5" />
          Ver ejemplo
        </button>

        <button
          onClick={onExtract}
          disabled={!value || isProcessing}
          className={`
            inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all
            ${value && !isProcessing
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200'
              : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }
          `}
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isProcessing ? 'Extrayendo...' : 'Extraer ideas'}
        </button>
      </div>
    </div>
  )
}
