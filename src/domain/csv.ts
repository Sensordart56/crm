import { totalScore, type Professional } from '../content/taskData'

function escapeCsv(value: string | number): string {
  const text = String(value).replaceAll('"', '""')
  return `"${text}"`
}

export function professionalsToCsv(professionals: Professional[]): string {
  const headers = [
    'Rank',
    'Name',
    'Role',
    'Company',
    'Public signal',
    'Why Friends of Finance may be valuable',
    'Potential contribution',
    'Most relevant space',
    'Community relevance score',
    'Potential contribution score',
    'Likely member value score',
    'Evidence strength score',
    'Total',
    'Verified evidence',
    'Assumptions / to test',
    'Source links',
  ]
  const rows = professionals.map((person, index) => [
    index + 1,
    person.name,
    person.role,
    person.company,
    person.signal,
    person.whyValuable,
    person.contribution,
    person.space,
    person.scores.communityRelevance,
    person.scores.potentialContribution,
    person.scores.likelyMemberValue,
    person.scores.evidenceStrength,
    totalScore(person),
    person.verified.join(' | '),
    person.assumed.join(' | '),
    person.sources.map((source) => source.url).join(' | '),
  ])
  return [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n')
}
