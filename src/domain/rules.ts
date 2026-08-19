import type { Activity, ActivityState, LoggedSpace, Member } from './types'

export const ACTIVITY_POINTS: Record<Activity['type'], number> = {
  post: 4,
  comment: 2,
  reaction: 1,
}

export const MEANINGFUL_TYPES: Activity['type'][] = ['post', 'comment']

export type ActivityPulse = {
  activityCount: number
  points: number
}

export type ActivityStats = {
  points30: number
  meaningful30: number
  meaningfulSpaces30: number
  meaningfulDates30: number
  latestMeaningfulAge: number | null
  latestMeaningful: Activity | null
  meaningfulCount: number
  latestActivity: Activity | null
}

export function startOfLocalDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

export function parseLocalDate(value: string): Date {
  if (value.length === 10) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  return new Date(value)
}

export function formatDate(value: string): string {
  const date = parseLocalDate(value)
  if (Number.isNaN(date.getTime())) return 'Unknown date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export function elapsedDays(value: string, now = new Date()): number {
  const diff = startOfLocalDay(now).getTime() - startOfLocalDay(parseLocalDate(value)).getTime()
  return Math.floor(diff / 86_400_000)
}

export function isMeaningful(activity: Activity): boolean {
  return MEANINGFUL_TYPES.includes(activity.type)
}

export function getMemberActivities(memberId: string, activities: Activity[]): Activity[] {
  return activities
    .filter((activity) => activity.memberId === memberId)
    .sort((a, b) => parseLocalDate(b.occurredAt).getTime() - parseLocalDate(a.occurredAt).getTime())
}

export function getActivityStats(member: Member, activities: Activity[], now = new Date()): ActivityStats {
  const memberActivities = getMemberActivities(member.id, activities)
  const recent30 = memberActivities.filter((activity) => {
    const age = elapsedDays(activity.occurredAt, now)
    return age >= 0 && age <= 30
  })
  const meaningful30 = recent30.filter(isMeaningful)
  const latestMeaningful = memberActivities.find(isMeaningful) ?? null
  const meaningfulAll = memberActivities.filter(isMeaningful)
  const meaningfulDates30 = new Set(meaningful30.map((activity) => activity.occurredAt.slice(0, 10))).size
  const meaningfulSpaces30 = new Set(meaningful30.map((activity) => activity.space)).size

  return {
    points30: recent30.reduce((sum, activity) => sum + ACTIVITY_POINTS[activity.type], 0),
    meaningful30: meaningful30.length,
    meaningfulSpaces30,
    meaningfulDates30,
    latestMeaningfulAge: latestMeaningful ? elapsedDays(latestMeaningful.occurredAt, now) : null,
    latestMeaningful,
    meaningfulCount: meaningfulAll.length,
    latestActivity: memberActivities[0] ?? null,
  }
}

export function getRollingActivityPulse(activities: Activity[], now = new Date(), days = 30): ActivityPulse {
  const recentActivities = activities.filter((activity) => {
    const age = elapsedDays(activity.occurredAt, now)
    return age >= 0 && age <= days
  })

  return {
    activityCount: recentActivities.length,
    points: recentActivities.reduce((sum, activity) => sum + ACTIVITY_POINTS[activity.type], 0),
  }
}

export function deriveActivityState(member: Member, activities: Activity[], now = new Date()): ActivityState {
  const joinedAge = elapsedDays(member.joinedAt, now)
  if (joinedAge >= 0 && joinedAge <= 14) return 'Newly joined'

  const stats = getActivityStats(member, activities, now)
  const highlyActive =
    stats.points30 >= 12 &&
    stats.meaningful30 >= 3 &&
    stats.meaningfulSpaces30 >= 2 &&
    stats.meaningfulDates30 >= 3 &&
    stats.latestMeaningfulAge !== null &&
    stats.latestMeaningfulAge <= 7

  if (highlyActive) return 'Highly active'
  if (stats.latestMeaningfulAge !== null && stats.latestMeaningfulAge >= 0 && stats.latestMeaningfulAge <= 30) return 'Active'

  if (stats.latestMeaningfulAge === null) {
    if (joinedAge >= 15 && joinedAge <= 60) return 'At risk'
    return 'Dormant'
  }

  if (stats.latestMeaningfulAge >= 31 && stats.latestMeaningfulAge <= 60) return 'At risk'
  if (stats.latestMeaningfulAge > 60) return 'Dormant'
  return 'Active'
}

export function dueStatus(member: Member, now = new Date()): 'overdue' | 'due' | null {
  if (member.nextAction.status === 'completed' || !member.nextAction.text || !member.nextAction.dueDate) return null
  const age = elapsedDays(member.nextAction.dueDate, now)
  if (age > 0) return 'overdue'
  if (age === 0) return 'due'
  return null
}

export function compareFollowUpDueDates(a: Member, b: Member, now = new Date()): number {
  const overdueA = dueStatus(a, now) === 'overdue'
  const overdueB = dueStatus(b, now) === 'overdue'
  if (overdueA !== overdueB) return overdueA ? -1 : 1

  const dueDateA = a.nextAction.status === 'planned' && a.nextAction.text ? a.nextAction.dueDate : ''
  const dueDateB = b.nextAction.status === 'planned' && b.nextAction.text ? b.nextAction.dueDate : ''
  if (dueDateA && dueDateB) return parseLocalDate(dueDateA).getTime() - parseLocalDate(dueDateB).getTime()
  if (dueDateA !== dueDateB) return dueDateA ? -1 : 1
  return 0
}

export function getFollowUpReasons(member: Member, activities: Activity[], owners: { id: string }[], now = new Date()): string[] {
  const state = deriveActivityState(member, activities, now)
  const reasons: string[] = []
  const due = dueStatus(member, now)
  if (due === 'overdue') reasons.push('Next action is overdue')
  if (due === 'due') reasons.push('Next action is due today')
  if (!member.ownerId || !owners.some((owner) => owner.id === member.ownerId)) reasons.push('No owner assigned')
  if (state === 'At risk') reasons.push('State is At risk')
  if (state === 'Dormant') reasons.push('State is Dormant')

  const joinedAge = elapsedDays(member.joinedAt, now)
  const hasSayHelloPost = activities.some(
    (activity) => activity.memberId === member.id && activity.space === 'Say Hello' && activity.type === 'post',
  )
  if (state === 'Newly joined' && joinedAge >= 7 && !hasSayHelloPost) {
    reasons.push('Newly joined for 7+ days without a Say Hello post')
  }
  return reasons
}

export function hasFollowUp(member: Member, activities: Activity[], owners: { id: string }[], now = new Date()): boolean {
  return getFollowUpReasons(member, activities, owners, now).length > 0
}

export function spaceLabel(space: LoggedSpace): string {
  return space
}
