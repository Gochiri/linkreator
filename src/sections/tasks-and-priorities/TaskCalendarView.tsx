import data from '@/../product/sections/tasks-and-priorities/data.json'
import { TaskCalendarView } from './components/TaskCalendarView'

export default function TaskCalendarViewPreview() {
  return (
    <TaskCalendarView
      tasks={data.tasks}
      projects={data.projects}
      tags={data.tags}
      workBlocks={data.workBlocks}
      onCreateTask={() => console.log('Create new task')}
      onEditTask={(id) => console.log('Edit task:', id)}
      onDeleteTask={(id) => console.log('Delete task:', id)}
      onCompleteTask={(id) => console.log('Complete task:', id)}
      onPostponeTask={(id, date) => console.log('Postpone task:', id, 'to', date)}
      onDuplicateTask={(id) => console.log('Duplicate task:', id)}
      onChangePriority={(id, priority) => console.log('Change priority:', id, 'to', priority)}
      onScheduleWorkBlock={(taskId, date, start, end) => console.log('Schedule work block:', taskId, date, start, end)}
      onDeleteWorkBlock={(id) => console.log('Delete work block:', id)}
      onChangeView={(view) => console.log('Change view to:', view)}
      onFilterByProject={(projectId) => console.log('Filter by project:', projectId)}
      onFilterByTags={(tagIds) => console.log('Filter by tags:', tagIds)}
    />
  )
}
