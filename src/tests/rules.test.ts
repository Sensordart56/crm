import { describe, expect, it } from 'vitest'
import { createDemoStore } from '../crm/seed'
import { recommendNextStep } from '../domain/recommendation'
import { deriveActivityState, getFollowUpReasons } from '../domain/rules'
import type { Activity, Member } from '../domain/types'

const now = new Date(2026, 7, 19, 12, 0, 0)

function dateDaysAgo(days: number): string {
  const date = new Date(2026, 7, 19 - days, 12, 0, 0)
  return date.toISOString()
}

function dateKeyDaysAgo(days: number): string {
  const date = new Date(2026, 7, 19 - days, 12, 0, 0)
  return date.toISOString().slice(0, 10)
}

function makeMember(joinedDaysAgo: number): Member {
  return {
    id: 'test-member',
    name: 'Test Member',
    role: 'Finance Analyst',
    company: 'Test Company (fictional)',
    joinedAt: dateKeyDaysAgo(joinedDaysAgo),
    ownerId: 'owner-1',
    preferredSpaces: ['Finance Workflows', 'Tools & Systems'],
    nextAction: { text: 'Review next step', dueDate: dateKeyDaysAgo(0), status: 'planned' },
    notes: 'Fictional test record.',
  }
}

function makeActivity(id: string, daysAgo: number, type: Activity['type'] = 'post', space: Activity['space'] = 'Finance Workflows'): Activity {
  return { id, memberId: 'test-member', occurredAt: dateDaysAgo(daysAgo), space, type, summary: 'Fictional test activity', sourceMarker: 'Manually logged fictional demo data' }
}

describe('Friends of Finance activity state rules', () => {
  it('treats days 14 and 15 as different precedence boundaries', () => {
    expect(deriveActivityState(makeMember(14), [], now)).toBe('Newly joined')
    expect(deriveActivityState(makeMember(15), [], now)).toBe('At risk')
  })

  it('treats the latest meaningful activity at 30 and 31 days correctly', () => {
    expect(deriveActivityState(makeMember(90), [makeActivity('a30', 30, 'comment')], now)).toBe('Active')
    expect(deriveActivityState(makeMember(90), [makeActivity('a31', 31, 'comment')], now)).toBe('At risk')
  })

  it('treats no meaningful activity at joined days 60 and 61 correctly', () => {
    expect(deriveActivityState(makeMember(60), [], now)).toBe('At risk')
    expect(deriveActivityState(makeMember(61), [], now)).toBe('Dormant')
  })

  it('requires the complete Highly active rule, not just points', () => {
    const activities = [
      makeActivity('h1', 1, 'post', 'Finance Workflows'),
      makeActivity('h2', 3, 'post', 'Tools & Systems'),
      makeActivity('h3', 5, 'post', 'Ask Finance Peers'),
    ]
    expect(deriveActivityState(makeMember(90), activities, now)).toBe('Highly active')
    expect(deriveActivityState(makeMember(90), activities.slice(0, 2), now)).toBe('Active')
  })

  it('does not let reactions alone create Active or Highly active', () => {
    const reactions = Array.from({ length: 15 }, (_, index) => makeActivity(`r${index}`, index + 1, 'reaction', 'Tools & Systems'))
    expect(deriveActivityState(makeMember(35), reactions, now)).toBe('At risk')
  })

  it('shows every applicable follow-up reason', () => {
    const member = makeMember(8)
    member.ownerId = null
    const reasons = getFollowUpReasons(member, [], [], now)
    expect(reasons).toEqual(expect.arrayContaining(['Next action is due today', 'No owner assigned', 'Newly joined for 7+ days without a Say Hello post']))
  })

  it('keeps commercial signals outside the recommendation inputs', () => {
    const member = makeMember(35)
    const activities = [makeActivity('a1', 42, 'comment')]
    const before = recommendNextStep(member, activities, now)
    const withSignal = { ...member, commercialSignal: { status: 'possible' as const, note: 'Fictional human note', enteredByHuman: true as const, reviewRequired: true as const } }
    const after = recommendNextStep(withSignal, activities, now)
    expect(after).toEqual(before)
    expect(after.editableSuggestion).not.toContain('buy')
  })

  it('seeds 18 fictional records with all five states represented', () => {
    const store = createDemoStore(now)
    const counts = store.members.reduce<Record<string, number>>((result, member) => {
      const state = deriveActivityState(member, store.activities, now)
      result[state] = (result[state] ?? 0) + 1
      return result
    }, {})
    expect(store.members).toHaveLength(18)
    expect(['Newly joined', 'Highly active', 'Active', 'At risk', 'Dormant'].every((state) => (counts[state] ?? 0) >= 3)).toBe(true)
    expect(store.members.every((member) => member.company.includes('(fictional)'))).toBe(true)
    expect(store.activities.every((activity) => activity.sourceMarker === 'Manually logged fictional demo data')).toBe(true)
  })
})
