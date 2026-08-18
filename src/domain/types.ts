export const LOGGED_SPACES = [
  'Say Hello',
  'Ask Finance Peers',
  'Finance Workflows',
  'Tools & Systems',
  'Career & Compensation',
  'Water Cooler',
] as const

export type LoggedSpace = (typeof LOGGED_SPACES)[number]
export type ActivityType = 'post' | 'comment' | 'reaction'
export type ActivityState = 'Newly joined' | 'Highly active' | 'Active' | 'At risk' | 'Dormant'
export type NextActionStatus = 'planned' | 'completed'
export type CommercialSignalStatus = 'none' | 'possible' | 'reviewed'

export type Owner = {
  id: string
  displayName: string
}

export type CommercialSignal = {
  status: CommercialSignalStatus
  note: string
  enteredByHuman: true
  reviewRequired: true
  reviewer?: string
  reviewedAt?: string
}

export type Member = {
  id: string
  name: string
  role: string
  company: string
  joinedAt: string
  ownerId: string | null
  preferredSpaces: LoggedSpace[]
  nextAction: {
    text: string
    dueDate: string
    status: NextActionStatus
  }
  notes: string
  commercialSignal?: CommercialSignal
}

export type Activity = {
  id: string
  memberId: string
  occurredAt: string
  space: LoggedSpace
  type: ActivityType
  summary: string
  sourceMarker: 'Manually logged fictional demo data'
}

export type CrmStore = {
  version: 1
  members: Member[]
  activities: Activity[]
  owners: Owner[]
}
