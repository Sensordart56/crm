import { deriveActivityState, elapsedDays, formatDate, getActivityStats, getMemberActivities } from './rules'
import type { Activity, Member } from './types'

export type Recommendation = {
  title: string
  recommendation: string
  rationale: string
  evidence: string[]
  humanChecks: string[]
  editableSuggestion: string
}

export function recommendNextStep(member: Member, activities: Activity[], now = new Date()): Recommendation {
  const state = deriveActivityState(member, activities, now)
  const stats = getActivityStats(member, activities, now)
  const memberActivities = getMemberActivities(member.id, activities)
  const preferredSpace = member.preferredSpaces[0] ?? 'Ask Finance Peers'
  const lastMeaningful = stats.latestMeaningful
  const lastActivityLabel = lastMeaningful
    ? `${lastMeaningful.type} in ${lastMeaningful.space} on ${formatDate(lastMeaningful.occurredAt)}`
    : 'No meaningful activity recorded'

  let recommendation = ''
  let rationale = ''
  let suggestion = ''

  if (state === 'Newly joined') {
    recommendation = 'Invite a low-pressure introduction in Say Hello.'
    rationale = 'The member is still in the onboarding window. A short introduction is the documented first step into the community.'
    suggestion = `Hi ${member.name.split(' ')[0]}, welcome to Friends of Finance. If useful, the Say Hello space is a simple place to share your finance background and what you are learning this season. No pressure to post.`
  } else if (state === 'Highly active') {
    recommendation = `Invite a practical peer contribution in ${preferredSpace}.`
    rationale = 'Recent meaningful participation is strong enough to offer a contribution that helps peers, while keeping the decision with the member.'
    suggestion = `Hi ${member.name.split(' ')[0]}, your recent activity in ${preferredSpace} suggests a practical question or lesson could help peers. Would you be open to sharing one small workflow lesson when it feels useful?`
  } else if (state === 'Active') {
    recommendation = `Offer one specific next step in ${preferredSpace}.`
    rationale = 'The member has recent meaningful activity but does not meet the higher activity threshold, so one relevant invitation is more appropriate than a broad sequence.'
    suggestion = `Hi ${member.name.split(' ')[0]}, if you are looking for a next conversation, ${preferredSpace} may be a useful place to compare notes with finance peers. Happy to leave it there if now is not the right time.`
  } else if (state === 'At risk') {
    recommendation = `Use a permission-based re-entry prompt tied to ${preferredSpace}.`
    rationale = 'The recorded activity is cooling or absent. A single helpful prompt is safer than assuming intent or sending a promotional message.'
    suggestion = `Hi ${member.name.split(' ')[0]}, I noticed your last recorded community touch was ${lastActivityLabel.toLowerCase()}. If a practical ${preferredSpace.toLowerCase()} question comes up, the space is there; no reply is needed if it is not useful right now.`
  } else {
    recommendation = 'Pause outreach and wait for a genuinely new public or member-led signal.'
    rationale = 'The record is dormant. Repeated chasing would add noise and would not be supported by the stored evidence.'
    suggestion = `No message recommended now. Keep the record for review and only revisit after a new, relevant signal and a meaningful pause.`
  }

  const evidence = [
    `Derived state: ${state}`,
    `Meaningful activities recorded: ${stats.meaningfulCount}`,
    `Rolling 30-day points: ${stats.points30}`,
    `Latest meaningful activity: ${lastActivityLabel}`,
    `Preferred documented spaces: ${member.preferredSpaces.join(', ') || 'None recorded'}`,
    `Owner: ${member.ownerId ?? 'Unassigned'}`,
    `Next action: ${member.nextAction.text || 'None recorded'}${member.nextAction.dueDate ? `, ${formatDate(member.nextAction.dueDate)}` : ''}`,
    `Activity records in history: ${memberActivities.length}`,
  ]

  return {
    title: 'Simulated - deterministic rules; no LLM call.',
    recommendation,
    rationale,
    evidence,
    humanChecks: [
      'Confirm the preferred space is still relevant before using the suggestion.',
      'Edit or discard any wording that does not sound like the community manager.',
      'Do not send automatically; ask permission and honor a no-response stop rule.',
      'Do not interpret activity as buying intent. Review any commercial signal separately.',
    ],
    editableSuggestion: suggestion,
  }
}
