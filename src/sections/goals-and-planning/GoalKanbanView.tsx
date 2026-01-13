import data from '@/../product/sections/goals-and-planning/data.json'
import { GoalKanban } from './components/GoalKanban'
import type { Goal, GoalStatus, ViewMode } from '@/../product/sections/goals-and-planning/types'

export default function GoalKanbanViewPreview() {
  return (
    <GoalKanban
      goals={data.goals as Goal[]}
      viewMode="kanban"
      onCreate={() => console.log('Create new goal')}
      onView={(id) => console.log('View goal:', id)}
      onEdit={(id) => console.log('Edit goal:', id)}
      onDelete={(id) => console.log('Delete goal:', id)}
      onStatusChange={(id, newStatus) => console.log('Change status:', id, 'to', newStatus)}
      onToggleMilestone={(goalId, milestoneId) => console.log('Toggle milestone:', goalId, milestoneId)}
      onCreateTask={(goalId, taskTitle) => console.log('Create task:', goalId, taskTitle)}
      onViewModeChange={(mode) => console.log('Change view to:', mode)}
    />
  )
}
