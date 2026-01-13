import data from '@/../product/sections/focus-mode/data.json'
import { FocusModeDashboard } from './components/FocusModeDashboard'
import type {
  ActiveSession,
  FocusStats,
  DurationPreset,
  FocusSession,
  CalendarDay,
} from '@/../product/sections/focus-mode/types'

export default function FocusModeDashboardViewPreview() {
  return (
    <FocusModeDashboard
      activeSession={data.activeSession as ActiveSession | null}
      focusStats={data.focusStats as FocusStats}
      durationPresets={data.durationPresets as DurationPreset[]}
      focusSessions={data.focusSessions as FocusSession[]}
      calendarDays={data.calendarDays as CalendarDay[]}
      onStartSession={(duration, breakTime, taskId) =>
        console.log('Start session:', duration, 'min, break:', breakTime, 'min, task:', taskId)
      }
      onPauseSession={() => console.log('Pause session')}
      onResumeSession={() => console.log('Resume session')}
      onCancelSession={() => console.log('Cancel session')}
      onCompleteSession={() => console.log('Complete session')}
      onStartBreak={() => console.log('Start break')}
      onSkipBreak={() => console.log('Skip break')}
      onSelectDay={(date) => console.log('Select day:', date)}
      onSelectTask={() => console.log('Select task')}
    />
  )
}
