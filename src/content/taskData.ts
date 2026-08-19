export type Source = {
  id: string
  title: string
  url: string
  retrieved: string
  kind: 'Primary / current' | 'Public professional source'
}

export type Professional = {
  id: string
  name: string
  role: string
  company: string
  signal: string
  whyValuable: string
  contribution: string
  space: string
  scores: {
    communityRelevance: number
    potentialContribution: number
    likelyMemberValue: number
    evidenceStrength: number
  }
  verified: string[]
  assumed: string[]
  sources: Source[]
}

export const researchRetrieved = '19 August 2026'

export const communitySources: Source[] = [
  {
    id: 'guide',
    title: 'Friends of Finance Orientation Guide (provided source)',
    url: '/Friends_of_Finance_Orientation_Guide (1).pdf',
    retrieved: 'Provided with assessment; not committed or deployed',
    kind: 'Primary / current',
  },
  {
    id: 'assignment',
    title: 'Growth Squad Assignment (provided source)',
    url: '/Growth_Squad_Assignment (1).pdf',
    retrieved: 'Provided with assessment; not committed or deployed',
    kind: 'Primary / current',
  },
]

export const professionals: Professional[] = [
  {
    id: 'chris-ortega',
    name: 'Chris Ortega',
    role: 'CEO and fractional CFO',
    company: 'Fresh FP&A',
    signal: 'Fresh FP&A describes Ortega’s work across accounting, finance, FP&A, fractional CFO leadership, finance transformation, and scale; its public resources also discuss business partnership and practical finance operating choices.',
    whyValuable: 'His public work maps directly to the guide’s promise of practical peer learning for finance practitioners who want to compare how work gets done.',
    contribution: 'He could contribute a grounded perspective on finance transformation, business partnership, cash-flow confidence, and the career shift from scorekeeping to decision support.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 5, evidenceStrength: 5 },
    verified: [
      'Fresh FP&A identifies Chris Ortega as its CEO and describes his experience in accounting, finance, FP&A, and finance transformation.',
      'A CFI interview describes his current fractional CFO work with small and mid-sized businesses and his finance leadership background.',
      'Fresh FP&A publishes practical content on business partnership, technology, cash flow, and finance transformation.',
    ],
    assumed: [
      'He would value Friends of Finance specifically; no private interest or relationship is known.',
      'He would prefer peer exchange over a promotional invitation; this must be tested only with a low-pressure simulation.',
    ],
    sources: [
      { id: 'chris-workflows', title: 'The Top 3 Insights for all Fractional CFOs - Fresh FP&A', url: 'https://freshfpa.com/resource/coworking-with-fractional-cfos/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'chris-cfi', title: 'Careers in Finance: Chris Ortega - CFI', url: 'https://corporatefinanceinstitute.com/resources/finpod/chris-ortega/', retrieved: researchRetrieved, kind: 'Public professional source' },
      { id: 'chris-leadership', title: 'From CFO to CEO: How CFOs can step up - Fresh FP&A', url: 'https://freshfpa.com/resource/from-cfo-to-ceo-how-cfos-can-step-up-to-the-executive-suite/', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'glenn-hopper',
    name: 'Glenn Hopper',
    role: 'Managing Director and Head of AI Practice',
    company: 'VAi Consulting',
    signal: 'A public Ramp webinar describes Hopper’s current AI-practice leadership for finance teams, alongside more than two decades of CFO experience, teaching, and authorship on AI and finance.',
    whyValuable: 'The intersection of AI, data, controls, and finance operations is a natural bridge between the guide’s Tools & Systems and Finance Workflows spaces.',
    contribution: 'He could share practical lessons on automation, data ownership, forecasting, and responsible adoption of AI in finance teams.',
    space: 'Tools & Systems',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'Ramp identifies Glenn Hopper as Managing Director and Head of AI Practice at VAi Consulting.',
      'CFI describes him as a technology-minded CFO, consultant, lecturer, and author on AI and finance.',
      'His public work includes finance automation, data science, operational efficiency, and AI education.',
    ],
    assumed: [
      'He has time and interest for a community conversation; this is not established by the sources.',
      'His current title is used as published by the current public event page and should be rechecked before any real outreach.',
    ],
    sources: [
      { id: 'glenn-ramp', title: 'Closing the AI Execution Gap - Ramp webinar', url: 'https://ramp.com/webinars/closing-the-gap', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'glenn-cfi', title: 'Glenn Hopper - Corporate Finance Institute author profile', url: 'https://corporatefinanceinstitute.com/author/glenn-hopper/', retrieved: researchRetrieved, kind: 'Public professional source' },
      { id: 'glenn-publisher', title: 'Deep Finance - Simon & Schuster publisher page', url: 'https://www.simonandschuster.net/books/Deep-Finance/Glenn-Hopper/9781637350270', retrieved: researchRetrieved, kind: 'Public professional source' },
    ],
  },
  {
    id: 'carlos-vega',
    name: 'Carlos Vega',
    role: 'Co-founder and CEO',
    company: 'Tesorio',
    signal: 'Tesorio’s public story describes how Vega and the founding team moved from manual AR and spreadsheet-heavy cash management toward connected financial operations, cash application, forecasting, and payment workflows.',
    whyValuable: 'His cash-flow and AR experience is practical, cross-functional, and relevant to the guide’s focus on real workflows rather than polished theory.',
    contribution: 'He could contribute lessons on order-to-cash handoffs, cash forecasting, data connectivity, and the human side of financial operations.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 4 },
    verified: [
      'Tesorio identifies Carlos Vega as co-founder and CEO and explains the company’s focus on connected financial operations.',
      'A Tesorio interview describes his finance background and his views on cash flow as a data and workflow problem.',
      'The public materials discuss AR, cash application, forecasting, payment management, and system connectivity.',
    ],
    assumed: [
      'A founder of a finance-technology company may have useful peer experience but may also have commercial constraints.',
      'He would contribute without turning the conversation into a product pitch; this requires an explicit expectation.',
    ],
    sources: [
      { id: 'carlos-about', title: 'About Tesorio - company story', url: 'https://www.tesorio.com/about', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'carlos-podcast', title: 'Leaders in Payments: Tesorio CEO Carlos Vega', url: 'https://www.tesorio.com/blog/leaders-in-payments-tesorio-ceo-carlos-vega-on-connected-finance-panama-and-starting-out-in-finance', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'sonalee-parekh',
    name: 'Sonalee Parekh',
    role: 'Chief Financial Officer',
    company: 'SentinelOne',
    signal: 'SentinelOne announced Parekh as CFO effective March 24, 2026, with responsibility for global finance operations spanning FP&A, accounting, tax, treasury, internal audit, and investor relations.',
    whyValuable: 'Her current remit covers several of the finance problems the guide names, particularly operating discipline, tools, systems, and practical scale.',
    contribution: 'She could contribute a public-company perspective on forecasting discipline, margin expansion, controls, treasury, and scaling finance operations.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 4, potentialContribution: 5, likelyMemberValue: 3, evidenceStrength: 5 },
    verified: [
      'SentinelOne’s current management page identifies Sonalee Parekh as CFO.',
      'The appointment announcement states her start date and the scope of the global finance organization.',
      'The same sources describe prior CFO roles at Asana and RingCentral and experience across public software companies.',
    ],
    assumed: [
      'The scale of her current remit could make participation difficult.',
      'Her experience would translate into a useful peer contribution despite the difference between a public-company role and a broader community audience.',
    ],
    sources: [
      { id: 'sonalee-management', title: 'SentinelOne executive management', url: 'https://investors.sentinelone.com/governance/executive-management/default.aspx', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'sonalee-appointment', title: 'SentinelOne appoints Sonalee Parekh as CFO', url: 'https://www.sentinelone.com/press/sentinelone-appoints-sonalee-parekh-as-chief-financial-officer/', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'christian-wattig',
    name: 'Christian Wattig',
    role: 'Founder and lead instructor',
    company: 'Inside FP&A',
    signal: 'Inside FP&A identifies Wattig as its founder and lead instructor and as director of Wharton’s FP&A program, after finance leadership roles at P&G, Unilever, and Squarespace. His current public teaching focuses on forecasting, modeling, financial storytelling, and business partnering.',
    whyValuable: 'He works directly on the practical FP&A skills and peer questions named in the guide, with material aimed at finance practitioners rather than only executives.',
    contribution: 'He could contribute usable frameworks for forecasting, business partnering, financial storytelling, modeling, and developing FP&A careers.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'Inside FP&A identifies Christian Wattig as its founder and lead instructor and says he directs Wharton’s FP&A program.',
      'The current Inside FP&A profile describes more than a decade leading FP&A and accounting teams at P&G, Unilever, and Squarespace.',
      'A public Ramp workshop documents practical teaching on cross-functional influence, finance business partnering, and freeing time for strategy.',
    ],
    assumed: [
      'His own training community could overlap with Friends of Finance, so a non-promotional boundary would need to be explicit.',
      'Strong public teaching evidence does not establish that he wants another community commitment.',
    ],
    sources: [
      { id: 'christian-inside', title: 'Inside FP&A - founder and program profile', url: 'https://www.insidefpa.com/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'christian-ramp', title: 'Christian Wattig on finance business partnering - Ramp', url: 'https://ramp.com/blog/christian-wattig-how-modern-leaders-empower-other-teams', retrieved: researchRetrieved, kind: 'Public professional source' },
    ],
  },
  {
    id: 'nicholas-moen',
    name: 'Nicholas Moen',
    role: 'Director of Finance',
    company: 'Section',
    signal: 'Section’s current team page says Moen leads Finance, HR, and Operations by building AI-first functions designed to scale. A June 2026 FP&A interview covers faster financial models, automated workflows, human oversight, and business partnering.',
    whyValuable: 'He is an in-seat finance operator working through the implementation choices that practitioners are likely to debate in the guide’s Tools & Systems space.',
    contribution: 'He could contribute current lessons on AI-assisted modeling, workflow design, data structure, team adoption, controls, and where human judgment must remain.',
    space: 'Tools & Systems',
    scores: { communityRelevance: 4, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'Section’s current team page identifies Nicholas Moen, CMA, as Director of Finance.',
      'Section says he leads Finance, HR, and Operations and builds AI-first functions designed to scale.',
      'A June 2026 public interview documents practical work on financial modeling, automation, decision-making, and human oversight.',
    ],
    assumed: [
      'His AI focus is highly relevant to one space but does not establish interest in the wider community.',
      'His employer’s AI positioning could create promotional pressure, so any contribution would need to stay practitioner-led.',
    ],
    sources: [
      { id: 'nicholas-section', title: 'About Section - team profile', url: 'https://www.sectionai.com/about', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'nicholas-fpa', title: 'Nicholas Moen on AI, decisions, and financial models - FP&A Unlocked', url: 'https://www.thefpandaguy.com/fpa-unlocked-podcast/ai-better-decisions-faster-financial-models-nicholas-moen', retrieved: researchRetrieved, kind: 'Public professional source' },
    ],
  },
  {
    id: 'royston-da-costa',
    name: 'Royston Da Costa',
    role: 'Assistant Treasurer',
    company: 'Ferguson',
    signal: 'A 2025 practitioner profile describes Da Costa’s work on intercompany loans, dividend hedging, share buybacks, liquidity, cash visibility, and treasury technology at Ferguson. Current industry material also documents his teaching and speaking on generative AI in treasury.',
    whyValuable: 'He brings the working treasury and cash-management perspective that the guide’s broad finance audience needs, rather than another general executive profile.',
    contribution: 'He could contribute lessons on cash visibility, payments, treasury systems, cyber risk, AI adoption, and leading process change with stakeholder buy-in.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 4 },
    verified: [
      'A June 2025 Treasury Today profile identifies Royston Da Costa as Assistant Treasurer at Ferguson.',
      'The profile describes responsibility for intercompany loans, dividend hedging, share buybacks, treasury technology, and measurable process improvements.',
      'Current public industry material identifies him as a lecturer and speaker on AI adoption in corporate treasury.',
    ],
    assumed: [
      'Public speaking and teaching suggest an ability to contribute, not willingness to join Friends of Finance.',
      'The available current sources are direct professional profiles rather than an employer biography, so the role should be rechecked before real outreach.',
    ],
    sources: [
      { id: 'royston-profile', title: 'Ferguson’s Royston Da Costa: facilitating change - Treasury Today', url: 'https://treasurytoday.com/women-in-treasury/fergusons-royston-da-costa-facilitating-change/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'royston-ai', title: 'Generative AI in Corporate Treasury - Treasury Today, September 2025', url: 'https://treasurytoday.com/wp-content/uploads/2025/09/treasurytodaygroup-2025-09-september.pdf', retrieved: researchRetrieved, kind: 'Public professional source' },
    ],
  },
  {
    id: 'mary-schaeffer',
    name: 'Mary Schaeffer',
    role: 'Founder and Publisher',
    company: 'AP Now',
    signal: 'AP Now identifies Schaeffer as its founder and publisher and documents prior corporate cash-management, risk, and treasury work. Its current public podcast covers controls, invoice processing, payments, vendor files, fraud prevention, technology, and AP career practice.',
    whyValuable: 'Accounts payable is explicitly part of the guide’s audience, and her operational focus fills a gap left by a shortlist dominated by FP&A and CFO profiles.',
    contribution: 'She could contribute practical AP lessons on internal controls, fraud-resistant payment changes, invoice workflows, vendor-master hygiene, automation, and career development.',
    space: 'Ask Finance Peers',
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 4 },
    verified: [
      'AP Now identifies Mary Schaeffer as its founder and publisher and describes her corporate cash-management and treasury background.',
      'AP Now’s public podcast centers on practical accounts-payable operations, controls, fraud, compliance, and technology.',
      'The current public feed shows continuing AP education rather than a one-off or stale signal.',
    ],
    assumed: [
      'Publishing educational material does not prove that another peer community would be useful to her.',
      'Her official biography is older than the current podcast signal, so current role details should be reconfirmed before real outreach.',
    ],
    sources: [
      { id: 'mary-profile', title: 'Mary S. Schaeffer - AP Now profile', url: 'https://www.ap-now.com/public/Mary-S-Schaeffer.cfm', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'mary-podcast', title: 'AP Now Podcast - current public feed', url: 'https://www.ap-now.com/public/AP-Now-Podcast.cfm', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
]

export const scoringAnchors = [
  ['Community relevance', '1 = peripheral; 3 = credible finance/community overlap; 5 = direct fit with the documented audience and spaces.'],
  ['Potential contribution', '1 = unclear; 3 = one concrete relevant experience area; 5 = multiple current, practical peer-learning contributions.'],
  ['Likely member value', '1 = weak/promotional fit; 3 = plausible benefit; 5 = direct benefit from peer, workflow, systems, career, or resource value.'],
  ['Evidence strength', '1 = thin/stale/secondary; 3 = one current credible source; 5 = multiple current sources including a primary source.'],
] as const

export const rankedProfessionals = [...professionals].sort((a, b) => {
  if (totalScore(b) !== totalScore(a)) return totalScore(b) - totalScore(a)
  if (b.scores.evidenceStrength !== a.scores.evidenceStrength) return b.scores.evidenceStrength - a.scores.evidenceStrength
  if (b.scores.communityRelevance !== a.scores.communityRelevance) return b.scores.communityRelevance - a.scores.communityRelevance
  return b.scores.potentialContribution - a.scores.potentialContribution
})

export const priorityInvitee = professionals.find((person) => person.id === 'chris-ortega')!

export function totalScore(person: Professional): number {
  return Object.values(person.scores).reduce((sum, score) => sum + score, 0)
}

export function rankOf(personId: string): number {
  return rankedProfessionals.findIndex((person) => person.id === personId) + 1
}
