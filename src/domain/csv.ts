import type { Professional } from '../content/taskData'

function escapeCsv(value: string | number): string {
  const text = String(value).replaceAll('"', '""')
  return `"${text}"`
}

export function professionalsToCsv(professionals: Professional[]): string {
  const headers = ['Rank', 'Name', 'Role', 'Company', 'Community relevance', 'Potential contribution', 'Likely member value', 'Evidence strength', 'Total', 'Most relevant space']
  const rows = professionals.map((person, index) => [
    index + 1,
    person.name,
    person.role,
    person.company,
    person.scores.communityRelevance,
    person.scores.potentialContribution,
    person.scores.likelyMemberValue,
    person.scores.evidenceStrength,
    person.total,
    person.space,
  ])
  return [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n')
}
