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
      { id: 'chris-team', title: 'Chris Ortega, MBA - Fresh FP&A team profile', url: 'https://freshfpa.com/our-team/john-kobs-ceo/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'chris-cfi', title: 'Careers in Finance: Chris Ortega - CFI', url: 'https://corporatefinanceinstitute.com/resources/finpod/chris-ortega/', retrieved: researchRetrieved, kind: 'Public professional source' },
      { id: 'chris-workflows', title: 'The Top 3 Insights for all Fractional CFOs - Fresh FP&A', url: 'https://freshfpa.com/resource/coworking-with-fractional-cfos/', retrieved: researchRetrieved, kind: 'Primary / current' },
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
    scores: { communityRelevance: 5, potentialContribution: 5, likelyMemberValue: 5, evidenceStrength: 4 },
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
    scores: { communityRelevance: 4, potentialContribution: 5, likelyMemberValue: 4, evidenceStrength: 5 },
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
    id: 'david-appel',
    name: 'David Appel',
    role: 'Head of Software & SaaS',
    company: 'Sage Intacct',
    signal: 'Sage’s public author profile identifies Appel as Head of Software & SaaS; his 2025 writing covers SaaS metrics, reporting, forecasting, systems integration, and finance-team operating choices.',
    whyValuable: 'His work sits at the boundary of accounting systems, metrics, and practical finance operations, matching the guide’s Tools & Systems and Finance Workflows spaces.',
    contribution: 'He could bring a systems-and-metrics perspective on close, reporting, forecasting, subscription finance, and the trade-offs between automation and judgment.',
    space: 'Tools & Systems',
    scores: { communityRelevance: 4, potentialContribution: 4, likelyMemberValue: 5, evidenceStrength: 5 },
    verified: [
      'Sage identifies David Appel as Head of Software & SaaS at Sage Intacct.',
      'His public 2025 article discusses SaaS metrics, systems integration, reporting, forecasting, and automation.',
      'Sage’s public author page lists multiple finance and SaaS articles under his name.',
    ],
    assumed: [
      'His role at an accounting-software company may create a perception of promotion, so the invitation must be explicitly non-commercial.',
      'The community would benefit from his experience even if he only shared lessons and did not promote a product.',
    ],
    sources: [
      { id: 'david-author', title: 'David Appel - Sage Advice author profile', url: 'https://www.sage.com/en-ca/blog/author/davidappelauthor/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'david-metrics', title: 'The essential metrics SaaS CFOs now need to drive growth', url: 'https://www.sage.com/en-us/blog/essential-metrics-saas-cfos-need-to-drive-growth/', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'claire-bramley',
    name: 'Claire Bramley',
    role: 'Chief Financial Officer',
    company: 'Xero',
    signal: 'Xero’s leadership page identifies Bramley as CFO and says she oversees the global financial team and Enterprise Technology, with a focus on operational efficiency and scalability.',
    whyValuable: 'Her role links finance leadership with technology-enabled scale, a useful perspective for practical systems and workflow conversations.',
    contribution: 'She could share lessons on global finance operations, enterprise technology partnership, transformation, and communicating financial priorities.',
    space: 'Tools & Systems',
    scores: { communityRelevance: 4, potentialContribution: 4, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'Xero’s current executive page identifies Claire Bramley as CFO.',
      'Xero describes her responsibility for financial performance, the balance sheet, strategic priorities, and Enterprise Technology.',
      'The public appointment announcement records her joining Xero from Teradata after a global technology-finance career.',
    ],
    assumed: [
      'A global CFO may not have capacity for a practitioner community.',
      'Her technology remit is a stronger relevance signal than the title alone; it does not prove interest in a specific community space.',
    ],
    sources: [
      { id: 'claire-team', title: 'Meet Xero’s Executive and Regional Leaders', url: 'https://www.xero.com/au/about/team/', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'claire-appointment', title: 'Xero appointment market release', url: 'https://company-announcements.afr.com/asx/xro/2ca3ba1d-e988-11ef-b9a4-9a8239d49a91.pdf', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'mark-patterson',
    name: 'Mark Patterson',
    role: 'Executive Vice President and Chief Financial Officer',
    company: 'Cisco',
    signal: 'Cisco’s current executive profile describes Patterson’s responsibility for financial strategy, global finance, procurement, acquisition integrations, and the company’s transformation toward recurring revenue and digital selling.',
    whyValuable: 'His combination of finance, operations, procurement, and strategy maps to the guide’s workflow and systems discussions.',
    contribution: 'He could contribute a large-scale operating perspective on recurring revenue, procurement, acquisitions, transformation, and finance-business alignment.',
    space: 'Finance Workflows',
    scores: { communityRelevance: 4, potentialContribution: 4, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'Cisco’s current executive profile identifies Mark Patterson as EVP and CFO.',
      'Cisco describes his remit across finance strategy, procurement, acquisition integrations, and recurring-revenue transformation.',
      'Cisco’s public leadership update records the transition into the CFO role and his prior strategy and operations experience.',
    ],
    assumed: [
      'His enterprise scale may make a broad community invitation less relevant than a specific workflow topic.',
      'The most credible entry point would be a practical lesson, not a leadership-profile invitation.',
    ],
    sources: [
      { id: 'mark-profile', title: 'Cisco executive officers', url: 'https://investor.cisco.com/governance/executive-management/default.aspx', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'mark-transition', title: 'Updates to Cisco’s Executive Leadership Team', url: 'https://blogs.cisco.com/news/updates-to-ciscos-executive-leadership-team', retrieved: researchRetrieved, kind: 'Primary / current' },
    ],
  },
  {
    id: 'jeremy-barnum',
    name: 'Jeremy Barnum',
    role: 'Chief Financial Officer',
    company: 'JPMorganChase',
    signal: 'JPMorganChase’s current leadership page says Barnum is responsible for core finance, business management, investor relations, treasury, and several corporate teams; its 2026 reporting also notes progress in finance and treasury data strategy.',
    whyValuable: 'Treasury, controls, forecasting, and data strategy are concrete finance topics that fit the guide’s peer-question and workflow spaces.',
    contribution: 'He could offer a senior perspective on treasury, balance-sheet discipline, regulatory reporting, data strategy, and finance operating models.',
    space: 'Ask Finance Peers',
    scores: { communityRelevance: 4, potentialContribution: 4, likelyMemberValue: 4, evidenceStrength: 5 },
    verified: [
      'JPMorganChase’s current leadership page identifies Jeremy Barnum as CFO.',
      'The page names treasury, investor relations, core finance, and business management within his remit.',
      'Public 2026 investor materials describe his work on capital, liquidity, forecasting, and finance-and-treasury technology strategy.',
    ],
    assumed: [
      'A systemically important bank CFO is a high-constraint invitee and may not be the right community scale.',
      'His experience could still be valuable in a carefully scoped peer question, but no personal willingness is verified.',
    ],
    sources: [
      { id: 'jeremy-bio', title: 'Jeremy Barnum - JPMorganChase leadership bio', url: 'https://www.jpmorganchase.com/about/leadership/jeremy-barnum', retrieved: researchRetrieved, kind: 'Primary / current' },
      { id: 'jeremy-annual', title: 'JPMorganChase 2026 annual reporting and officer profile', url: 'https://jpmorganchaseco.gcs-web.com/node/872296/html', retrieved: researchRetrieved, kind: 'Primary / current' },
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
