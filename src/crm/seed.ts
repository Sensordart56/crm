import type { Activity, CrmStore, LoggedSpace, Member, Owner } from '../domain/types'

function dateAtDaysAgo(daysAgo: number, now: Date, hour = 12): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo, hour, 0, 0, 0)
}

function dateKeyDaysFromNow(daysFromNow: number, now: Date): string {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysFromNow, 12, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}

function dateKeyDaysAgo(daysAgo: number, now: Date): string {
  return dateKeyDaysFromNow(-daysAgo, now)
}

function activity(
  id: string,
  memberId: string,
  daysAgo: number,
  space: LoggedSpace,
  type: Activity['type'],
  summary: string,
  now: Date,
): Activity {
  return {
    id,
    memberId,
    occurredAt: dateAtDaysAgo(daysAgo, now).toISOString(),
    space,
    type,
    summary: `Fictional demo: ${summary}`,
    sourceMarker: 'Manually logged fictional demo data',
  }
}

function member(
  id: string,
  name: string,
  role: string,
  company: string,
  joinedDaysAgo: number,
  ownerId: string | null,
  preferredSpaces: LoggedSpace[],
  nextText: string,
  dueInDays: number,
  notes: string,
  now: Date,
  commercialSignal?: Member['commercialSignal'],
): Member {
  return {
    id,
    name,
    role,
    company: `${company} (fictional)`,
    joinedAt: dateKeyDaysAgo(joinedDaysAgo, now),
    ownerId,
    preferredSpaces,
    nextAction: { text: nextText, dueDate: dateKeyDaysFromNow(dueInDays, now), status: 'planned' },
    notes: `Fictional demo record. ${notes}`,
    commercialSignal,
  }
}

export function createDemoStore(now = new Date()): CrmStore {
  const owners: Owner[] = [
    { id: 'owner-ava', displayName: 'Ava Chen (demo)' },
    { id: 'owner-noah', displayName: 'Noah Mehta (demo)' },
    { id: 'owner-priya', displayName: 'Priya Singh (demo)' },
  ]

  const members: Member[] = [
    member('m01', 'Avery Brooks', 'Finance Operations Analyst', 'Cedarline Works', 3, 'owner-ava', ['Say Hello', 'Ask Finance Peers'], 'Welcome and invite an introduction', 2, 'New member with a systems curiosity.', now),
    member('m02', 'Jordan Park', 'Controller', 'Blue Orchard Studio', 8, null, ['Say Hello', 'Finance Workflows'], 'Offer a short welcome check-in', -1, 'No introduction has been logged yet.', now),
    member('m03', 'Rowan Ellis', 'Treasury Manager', 'Harbor Kite Foods', 12, 'owner-noah', ['Say Hello', 'Ask Finance Peers'], 'Invite a first question', 1, 'New member; only a light reaction is recorded.', now),

    member('m04', 'Casey Nguyen', 'FP&A Lead', 'Northstar Metrics Lab', 35, 'owner-priya', ['Finance Workflows', 'Tools & Systems'], 'Offer a peer workflow prompt', 4, 'Strong recent cross-space participation.', now),
    member('m05', 'Finley Carter', 'Accounting Systems Manager', 'Orbit and Oak Services', 70, 'owner-ava', ['Tools & Systems', 'Finance Workflows'], 'Invite a systems lesson', 6, 'Useful systems and close-process contributor.', now),
    member('m06', 'Morgan Reed', 'Finance Transformation Director', 'Mica Harbor Group', 100, 'owner-noah', ['Tools & Systems', 'Ask Finance Peers'], 'Invite a practical transformation note', 3, 'Consistent recent participation across spaces.', now),

    member('m07', 'Taylor Lee', 'Accounts Receivable Manager', 'Lumen Finch Co', 25, 'owner-ava', ['Finance Workflows', 'Ask Finance Peers'], 'Ask whether a cash-collection prompt is useful', 5, 'One recent post about a fictional AR workflow.', now),
    member('m08', 'Priyanka Shah', 'Payroll and Finance Ops Lead', 'Juniper Atlas', 45, 'owner-priya', ['Finance Workflows', 'Career & Compensation'], 'Offer a focused peer question', -2, 'Recent comment; not enough evidence for Highly active.', now),
    member('m09', 'Devon Wright', 'Finance Business Partner', 'Cobalt Meadow', 75, 'owner-noah', ['Ask Finance Peers', 'Career & Compensation'], 'Check whether the next action still fits', 8, 'Recent meaningful activity in one space.', now),
    member('m16', 'Sage Moreno', 'Revenue Operations Analyst', 'Copper Finch Labs', 31, 'owner-ava', ['Ask Finance Peers', 'Tools & Systems'], 'Share one useful peer question', 7, 'A recent comment keeps the record Active.', now),

    member('m10', 'Harper Quinn', 'Finance Manager', 'Rosewood Signal', 20, 'owner-priya', ['Tools & Systems'], 'Offer one low-pressure re-entry prompt', 0, 'Reactions alone are intentionally not meaningful activity.', now),
    member('m11', 'Emery Stone', 'Assistant Controller', 'Maple Current Studio', 40, null, ['Finance Workflows', 'Career & Compensation'], 'Pause and review the next helpful prompt', -3, 'Latest meaningful activity is outside the 30-day window.', now),
    member('m12', 'Blair Sutton', 'Treasury Analyst', 'Silver Kite Collective', 55, 'owner-noah', ['Ask Finance Peers', 'Water Cooler'], 'Review before a permission-based check-in', -1, 'No meaningful activity is recorded.', now, {
      status: 'possible',
      note: 'Human-entered fictional note: member mentioned an internal budget review in a demo conversation; not buying intent.',
      enteredByHuman: true,
      reviewRequired: true,
    }),
    member('m17', 'Rory Kim', 'Finance Systems Analyst', 'Willow Ledger House', 36, 'owner-priya', ['Tools & Systems'], 'Offer one systems question, then pause', 4, 'Last meaningful post is outside 30 days.', now),

    member('m13', 'Quinn Harper', 'Accounts Payable Lead', 'Pine Meridian Group', 75, 'owner-noah', ['Finance Workflows', 'Tools & Systems'], 'Review whether a future signal justifies re-entry', -10, 'No meaningful activity; due task is intentionally overdue.', now),
    member('m14', 'Alexis Monroe', 'Financial Reporting Manager', 'Glass Harbor Partners', 95, 'owner-priya', ['Finance Workflows', 'Career & Compensation'], 'Do not chase; monitor for a new public signal', -5, 'Representative dormant record for Task 4 preparation.', now),
    member('m15', 'Cameron Wells', 'AP and Expense Specialist', 'Amber Field Studio', 130, null, ['Tools & Systems', 'Water Cooler'], 'Keep unowned until a human reviews the record', 9, 'No activity and no owner are recorded.', now),
    member('m18', 'Drew Calder', 'Finance Program Manager', 'Fable Coast Works', 82, 'owner-ava', ['Career & Compensation', 'Water Cooler'], 'Wait for a genuinely new relevant signal', 12, 'Long quiet period; no meaningful activity.', now),
  ]

  const activities: Activity[] = [
    activity('a01', 'm01', 2, 'Water Cooler', 'reaction', 'Reacted to a month-end observation.', now),
    activity('a02', 'm02', 7, 'Say Hello', 'reaction', 'Reacted to a welcome thread.', now),
    activity('a03', 'm03', 4, 'Water Cooler', 'reaction', 'Reacted to a light finance joke.', now),

    activity('a04', 'm04', 2, 'Finance Workflows', 'post', 'Shared a three-way-match exception lesson.', now),
    activity('a05', 'm04', 4, 'Tools & Systems', 'comment', 'Added a systems documentation suggestion.', now),
    activity('a06', 'm04', 6, 'Finance Workflows', 'comment', 'Answered a fictional peer question about approvals.', now),
    activity('a07', 'm04', 1, 'Tools & Systems', 'reaction', 'Reacted to a dashboard thread.', now),
    activity('a08', 'm05', 1, 'Tools & Systems', 'post', 'Shared a migration checklist lesson.', now),
    activity('a09', 'm05', 3, 'Finance Workflows', 'comment', 'Compared manual and automated close steps.', now),
    activity('a10', 'm05', 5, 'Tools & Systems', 'comment', 'Answered a question about BI reporting.', now),
    activity('a11', 'm06', 3, 'Tools & Systems', 'post', 'Shared a fictional finance automation trade-off.', now),
    activity('a12', 'm06', 5, 'Ask Finance Peers', 'comment', 'Answered a question about data ownership.', now),
    activity('a13', 'm06', 7, 'Tools & Systems', 'comment', 'Added a note about rollout sequencing.', now),

    activity('a14', 'm07', 5, 'Finance Workflows', 'post', 'Shared a fictional cash-collection handoff lesson.', now),
    activity('a15', 'm08', 16, 'Career & Compensation', 'comment', 'Answered a question about role scope.', now),
    activity('a16', 'm08', 4, 'Water Cooler', 'reaction', 'Reacted to a month-end thread.', now),
    activity('a17', 'm09', 23, 'Ask Finance Peers', 'post', 'Asked how peers frame a forecast assumption.', now),
    activity('a18', 'm16', 2, 'Tools & Systems', 'comment', 'Answered a fictional dashboard question.', now),

    activity('a19', 'm10', 3, 'Tools & Systems', 'reaction', 'Reacted to an automation thread.', now),
    activity('a20', 'm11', 42, 'Finance Workflows', 'comment', 'Shared an old close-process observation.', now),
    activity('a21', 'm12', 10, 'Water Cooler', 'reaction', 'Reacted to a team joke.', now),
    activity('a22', 'm17', 35, 'Tools & Systems', 'post', 'Shared a fictional systems handoff lesson.', now),

    activity('a23', 'm14', 72, 'Finance Workflows', 'post', 'Shared a fictional reporting handoff story.', now),
    activity('a24', 'm13', 70, 'Tools & Systems', 'reaction', 'Reacted to a tools thread.', now),
    activity('a25', 'm04', 8, 'Finance Workflows', 'post', 'Shared a fictional approval-policy example.', now),
    activity('a26', 'm05', 7, 'Tools & Systems', 'post', 'Shared a fictional close-migration follow-up.', now),
    activity('a27', 'm06', 9, 'Ask Finance Peers', 'post', 'Shared a fictional data-ownership pattern.', now),
  ]

  return { version: 1, members, activities, owners }
}
