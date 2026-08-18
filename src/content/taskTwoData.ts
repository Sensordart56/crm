import { priorityInvitee, type Source } from './taskData'

export type Touch = {
  step: number
  timing: string
  channel: string
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
    purpose: 'Ask for permission to share one relevant community description.',
    intendedAction: 'Accept the connection if it is useful; no reply is required.',
    message: 'Hi Chris - I have been reading your public work on practical FP&A and finance transformation. I am mapping a small peer-learning community for finance practitioners and would value connecting. No pitch or follow-up assumed.',
    rationale: 'The note names only public work, keeps the request short, and removes the expectation of a meeting or response.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[1], guideSource],
  },
  {
    step: 2,
    timing: 'Day 1 after acceptance',
    channel: 'LinkedIn message (simulated)',
    purpose: 'Explain the practical peer-learning fit without presenting a generic group.',
    intendedAction: 'Invite Chris to look at the description or decline without friction.',
    message: 'Thanks for connecting. Friends of Finance is described as a finance-and-accounting peer-learning community: people share real workflows, ask judgment-call questions, compare tools, and discuss career growth. Your public work on business partnership and finance transformation seemed relevant. Would it be useful if I sent a short overview? Completely fine if not.',
    rationale: 'The value is tied to the guide’s documented spaces and to public Fresh FP&A material, while the ask is only permission to send context.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 3,
    timing: 'Day 3',
    channel: 'Email (simulated; no address collected)',
    purpose: 'Share a clear invitation with enough context to make an informed choice.',
    intendedAction: 'Read the open-access description and choose whether to explore; no call or product demo is requested.',
    message: 'Subject: A practical finance peer-learning space\n\nHi Chris,\n\nSharing the overview I mentioned. The guide describes Friends of Finance as a place where finance and accounting practitioners compare real workflows, ask specific peer questions, discuss tools and systems, and share career experiences.\n\nI thought of your public work on finance transformation and business partnership. If the format sounds useful, you are welcome to take a look. There is no expectation to post, meet, promote a service, or treat this as a buying conversation. If it is not relevant, I will close the loop.\n\nBest,\nGrowth Squad (simulated)',
    rationale: 'This uses the public signal without inventing familiarity and sets a non-promotional expectation in the invitation itself.',
    sources: [priorityInvitee.sources[0], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 4,
    timing: 'Day 7',
    channel: 'LinkedIn or email follow-up (simulated)',
    purpose: 'Offer one concrete value angle rather than repeating the invitation.',
    intendedAction: 'Take a look only if a workflow or peer-learning discussion is timely.',
    message: 'One useful angle, only if timely: the guide’s Finance Workflows space is for how finance work actually gets done, while Tools & Systems covers software, dashboards, automation, and implementation. Your public writing on moving finance from reporting toward business partnership could give practitioners a practical discussion starter. If that is not useful now, no action needed.',
    rationale: 'The touch gives a specific community use case, but leaves the decision with the invitee and does not claim he wants to contribute.',
    sources: [priorityInvitee.sources[1], priorityInvitee.sources[2], guideSource],
  },
  {
    step: 5,
    timing: 'Day 14',
    channel: 'LinkedIn or email close-the-loop (simulated)',
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
    response: 'The verifiable association is that this assessment and its brief are from Volopay. I do not have evidence to claim that Friends of Finance is independent of Volopay, nor would I promise a relationship the sources do not document. The orientation guide itself defines Friends of Finance as an online finance-and-accounting professional community and learning hub, with peer discussions, resources, and career-oriented spaces rather than a product-sales channel. Participation must not be treated as buying intent. If that distinction is not comfortable, I would not ask you to join.',
  },
  {
    label: 'Situation C',
    prompt: 'The person does not respond after the complete sequence.',
    response: 'Stop after Touch 5. Do not continue chasing or interpret silence as interest. At most one future approach would be reasonable after a minimum 90-day pause, and only if a genuinely new, relevant public professional signal gives a specific reason to reconnect. Without that signal, the correct action is to leave the person alone.',
  },
] as const

export const stopRule = 'Stop after Touch 5. If there is no response, do not chase. Allow at most one future approach only after a minimum 90-day pause and a genuinely new, relevant public signal; otherwise close the record.'

