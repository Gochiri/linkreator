import { useState } from 'react'
import data from '@/../product/sections/ai-coach/data.json'
import { AICoachPanel, AICoachFAB } from './components/AICoachPanel'
import type { Message, ProactiveSuggestion, CoachState, ActionType } from '@/../product/sections/ai-coach/types'

export default function AICoachPanelViewPreview() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-8">
      {/* Demo content behind the panel */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Demo: AI Coach Panel
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Este es el panel lateral del AI Coach. En la app real, aparecería sobre cualquier sección cuando el usuario haga clic en el botón flotante.
        </p>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            El contenido de la sección actual aparecería aquí. El panel del AI Coach se superpone desde la derecha.
          </p>
        </div>
      </div>

      {/* FAB Button */}
      <AICoachFAB
        unreadCount={(data.coachState as CoachState).unreadSuggestions}
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      />

      {/* Panel */}
      <AICoachPanel
        messages={data.messages as Message[]}
        proactiveSuggestions={data.proactiveSuggestions as ProactiveSuggestion[]}
        coachState={data.coachState as CoachState}
        isOpen={isOpen}
        onSendMessage={(content) => console.log('Send message:', content)}
        onQuickAction={(action, taskId) => console.log('Quick action:', action, taskId)}
        onSuggestionAction={(suggestionId, action, taskId) => console.log('Suggestion action:', suggestionId, action, taskId)}
        onDismissSuggestion={(suggestionId) => console.log('Dismiss suggestion:', suggestionId)}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
