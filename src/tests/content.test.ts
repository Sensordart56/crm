import { describe, expect, it } from 'vitest'
import { professionals, priorityInvitee, rankedProfessionals, totalScore } from '../content/taskData'
import { situations, touches } from '../content/taskTwoData'

describe('assessment content', () => {
  it('contains exactly eight ranked professionals with two or more public sources each', () => {
    expect(professionals).toHaveLength(8)
    expect(professionals.every((person) => person.sources.length >= 2)).toBe(true)
    expect(rankedProfessionals[0].id).toBe(priorityInvitee.id)
    expect(rankedProfessionals[0].id).toBe('chris-ortega')
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
})
