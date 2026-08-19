import { priorityInvitee, type Source } from './taskData'

export type Touch = {
  step: number
  timing: string
  channel: string
  condition: string
  purpose: string
  intendedAction: string
  message: string
  rationale: string
  sources: Source[]
}

const guideSource: Source = {
  id: 'guide-inline',
  title: 'Friends of Finance Orientation Guide (provided source)',
  url: '/Friends_of_Finance_Orientation_Guide (1).pdf',
  retrieved: 'Provided with assessment; not committed or deployed',
  kind: 'Primary / current',
}

export const touches: Touch[] = [
  {
    step: 1,
    timing: 'Day 0',
    channel: 'LinkedIn connection request (simulated)',
    condition: 'Send once. If the request is declined or remains unaccepted, do not send Touch 2.',
    purpose: 'Ask to connect and state the community context without implying broader permission.',
    intendedAction: 'Accept only if connecting is useful; acceptance permits one contextual LinkedIn message, not email or repeated outreach.',
    message: 'Hi Chris - I have been reading your public work on practical FP&A and finance transformation. I am helping assess fit for Friends of Finance, a peer-learning community for finance practitioners, and your business-partnering perspective stood out. I would be glad to connect. This is not a product pitch, and no reply is expected.',
    rationale: 'The note uses only public work, names the real reason for connecting, and makes a narrow request without pretending that a connection is consent to the full sequence.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[1], guideSource],
  },
  {
    step: 2,
    timing: 'Day 1 after acceptance',
    channel: 'LinkedIn message (simulated)',
    condition: 'Send only after the connection is accepted. Stop immediately if Chris declines or says the community is not relevant.',
    purpose: 'Explain the practical peer-learning fit without presenting a generic group.',
    intendedAction: 'Reply yes to receive a short overview in the same thread, or decline without friction.',
    message: 'Thanks for connecting. Friends of Finance is described as a finance-and-accounting peer-learning community: people share real workflows, ask judgment-call questions, compare tools, and discuss career growth. Your public work on business partnership and finance transformation seemed relevant. Would it be useful if I sent a short overview? Completely fine if not.',
    rationale: 'The value is tied to the guide’s documented spaces and to public Fresh FP&A material, while the ask is only permission to send context.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 3,
    timing: 'After an explicit yes (target: Day 3)',
    channel: 'Invitation email (simulated; permission required)',
    condition: 'Send only after an explicit yes and only if Chris prefers email or an appropriate verified professional address is available. Otherwise keep any requested overview on LinkedIn and end the email follow-up branch; do not search for private contact data.',
    purpose: 'Share a clear invitation with enough context to make an informed choice.',
    intendedAction: 'Reply yes if the described format is worth exploring, or no to close the sequence; no call, product demo, or immediate participation is requested.',
    message: 'Subject: A practical finance peer-learning space\n\nHi Chris,\n\nHere is the short overview you agreed to receive. The guide describes Friends of Finance as a place where finance and accounting practitioners compare real workflows, ask specific peer questions, discuss tools and systems, and share career experiences.\n\nI thought of your public work on finance transformation and business partnership. If that format sounds useful, reply yes and I can pass your interest back to the Growth Squad. There is no expectation to post, meet, promote a service, or treat this as a buying conversation. If it is not relevant, reply no and I will close the loop.\n\nBest,\nGrowth Squad (simulated)',
    rationale: 'The email follows an affirmative permission gate, provides the overview inline because no official joining link was supplied, and sets a non-promotional expectation without inventing familiarity.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 4,
    timing: 'Four days after Touch 3 (about Day 7)',
    channel: 'Same consented email thread (simulated)',
    condition: 'Send only if Touch 3 was permitted and sent, no decline or opt-out was received, and there has been no reply for four days.',
    purpose: 'Offer one concrete value angle rather than repeating the invitation.',
    intendedAction: 'Reply only if the specific workflow angle is timely; otherwise no action is needed.',
    message: 'One useful angle, only if timely: the guide’s Finance Workflows space is for how finance work actually gets done, while Tools & Systems covers software, dashboards, automation, and implementation. Your public writing on moving finance from reporting toward business partnership could give practitioners a practical discussion starter. If that is not useful now, no action needed.',
    rationale: 'The touch gives a specific community use case, but leaves the decision with the invitee and does not claim he wants to contribute.',
    sources: [priorityInvitee.sources[1], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 5,
    timing: 'Seven days after Touch 4 (about Day 14)',
    channel: 'Same consented email thread (simulated)',
    condition: 'Send once only if Touch 4 was sent and there is still no response. Never send after a decline, opt-out, or channel change request.',
    purpose: 'Stop respectfully and protect trust.',
    intendedAction: 'No response needed; the sequence ends here.',
    message: 'Hi Chris - I am closing the loop so this does not become noise. I reached out because of your public work on practical FP&A and finance transformation, but I do not know whether Friends of Finance is relevant to you. I will not follow up again on this sequence. Wishing you well with the work at Fresh FP&A.',
    rationale: 'It acknowledges the inference, makes the stop rule explicit, and does not turn silence into permission for continued outreach.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[1]],
  },
]

export const situations = [
  {
    label: 'Situation A',
    prompt: '“I do not want to join another promotional group.”',
    response: 'That makes sense. I would not want another promotional feed either. The guide describes Friends of Finance as a peer-learning community for sharing real finance work, specific questions, tools, and career experiences - not as a place where you need to buy anything or promote a service. There is no pressure to join or post. If that still does not sound useful, I can close the loop here.',
  },
  {
    label: 'Situation B',
    prompt: '“Is this a Volopay sales community?”',
    response: 'Volopay supplied this assessment, so I would not describe Friends of Finance as independent when the materials do not establish that. The guide presents it as a peer-learning community for finance and accounting practitioners, not a sales channel, and participation should never be treated as buying intent. If that relationship makes you uncomfortable, I understand and will close the loop.',
  },
  {
    label: 'Situation C',
    prompt: 'The person does not respond after the complete sequence.',
    response: 'Do not jump channels or bypass a missed permission gate. Complete only the touches whose conditions were met, then stop after Touch 5 and never interpret silence as interest. At most one future approach would be reasonable after a minimum 90-day pause, and only if a genuinely new, relevant public professional signal gives a specific reason to reconnect. Without that signal, leave the person alone.',
  },
] as const

export const stopRule = 'Follow every permission gate and stop immediately on a decline or opt-out. If the permitted sequence reaches Touch 5 with no response, do not chase. Allow at most one future approach only after a minimum 90-day pause and a genuinely new, relevant public signal; otherwise close the record.'
