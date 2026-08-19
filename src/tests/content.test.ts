import { describe, expect, it } from 'vitest'
import { professionals, priorityInvitee, rankedProfessionals, totalScore } from '../content/taskData'
import { situations, stopRule, touches } from '../content/taskTwoData'
import { professionalsToCsv } from '../domain/csv'

describe('assessment content', () => {
  it('contains exactly eight ranked professionals with two or more public sources each', () => {
    expect(professionals).toHaveLength(8)
    expect(professionals.every((person) => person.sources.length >= 2)).toBe(true)
    expect(rankedProfessionals[0].id).toBe(priorityInvitee.id)
    expect(rankedProfessionals[0].id).toBe('chris-ortega')
    expect(rankedProfessionals.slice(0, 3).map((person) => person.id)).toEqual(['chris-ortega', 'glenn-hopper', 'christian-wattig'])
    expect(professionals.map((person) => person.id)).toEqual(expect.arrayContaining(['nicholas-moen', 'royston-da-costa', 'mary-schaeffer']))
    expect(professionals.every((person) => totalScore(person) >= 15)).toBe(true)
  })

  it('keeps Task 2 on the same priority invitee and includes the exact situations', () => {
    expect(touches).toHaveLength(5)
    expect(touches.every((touch) => touch.message.trim().length > 0)).toBe(true)
    expect(touches[0].message).toContain('Chris')
    expect(touches[2].message).toContain('Chris')
    expect(situations.map((situation) => situation.label)).toEqual(['Situation A', 'Situation B', 'Situation C'])
    expect(situations[0].prompt).toBe('“I do not want to join another promotional group.”')
    expect(situations[1].prompt).toBe('“Is this a Volopay sales community?”')
  })

  it('keeps research evidence and every touch field complete', () => {
    expect(professionals.every((person) => person.sources.some((source) => source.kind === 'Primary / current'))).toBe(true)
    expect(professionals.every((person) => person.verified.length > 0 && person.assumed.length > 0)).toBe(true)
    expect(professionals.every((person) => Object.values(person.scores).every((score) => score >= 1 && score <= 5))).toBe(true)
    expect(touches.every((touch) => touch.channel && touch.timing && touch.condition && touch.purpose && touch.intendedAction && touch.rationale && touch.sources.length > 0)).toBe(true)
    expect(touches.some((touch) => touch.channel.includes(' or '))).toBe(false)
    expect(touches[2].condition).toContain('explicit yes')
    expect(touches.every((touch) => !touch.message.includes('http'))).toBe(true)
    expect(stopRule).toContain('90-day pause')
    expect(situations[2].prompt).toBe('The person does not respond after the complete sequence.')
  })

  it('keeps CSV rows aligned with the ranked source dataset and calculated totals', () => {
    const lines = professionalsToCsv(rankedProfessionals).split('\n')

    expect(lines).toHaveLength(9)
    expect(lines[0]).toContain('"Rank"')
    expect(lines[0]).toContain('"Public signal"')
    expect(lines[0]).toContain('"Potential contribution"')
    expect(lines[0]).toContain('"Source links"')
    rankedProfessionals.forEach((person, index) => {
      const row = lines[index + 1]
      expect(row.startsWith(`"${index + 1}","${person.name}"`)).toBe(true)
      expect(row).toContain(`"${person.contribution.replaceAll('"', '""')}"`)
      expect(row).toContain(`"${person.space}"`)
      expect(row).toContain(`"${totalScore(person)}"`)
      person.sources.forEach((source) => expect(row).toContain(source.url))
    })
  })
})
