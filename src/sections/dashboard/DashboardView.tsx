import data from '@/../product/sections/dashboard/data.json'
import { Dashboard } from './components/Dashboard'
import type {
  Period,
  AllMetrics,
  TrendDataPoint,
  GoalProgress,
  MotivationalCard,
  Achievement,
  AIInsight,
} from '@/../product/sections/dashboard/types'

export default function DashboardViewPreview() {
  return (
    <Dashboard
      currentPeriod={data.currentPeriod as Period}
      metrics={data.metrics as AllMetrics}
      trendData={data.trendData as TrendDataPoint[]}
      goalProgress={data.goalProgress as GoalProgress[]}
      motivationalCard={data.motivationalCard as MotivationalCard}
      achievements={data.achievements as Achievement[]}
      aiInsights={data.aiInsights as AIInsight[]}
      onPeriodChange={(period) => console.log('Period changed:', period)}
      onGoalClick={(goalId) => console.log('Goal clicked:', goalId)}
      onAchievementClick={(achievementId) => console.log('Achievement clicked:', achievementId)}
      onDismissInsight={(insightId) => console.log('Insight dismissed:', insightId)}
      onRefreshMotivation={() => console.log('Refresh motivation')}
    />
  )
}
