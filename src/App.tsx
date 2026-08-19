import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { communitySources, priorityInvitee, professionals, rankOf, rankedProfessionals, scoringAnchors, totalScore } from './content/taskData'
import { situations, stopRule, touches } from './content/taskTwoData'
import { createDemoStore } from './crm/seed'
import { professionalsToCsv } from './domain/csv'
import { recommendNextStep, type Recommendation } from './domain/recommendation'
import {
  compareFollowUpDueDates,
  deriveActivityState,
  dueStatus,
  elapsedDays,
  formatDate,
  getActivityStats,
  getRollingActivityPulse,
  getFollowUpReasons,
  getMemberActivities,
  hasFollowUp,
} from './domain/rules'
import { loadStore, saveStore } from './domain/storage'
import { LOGGED_SPACES, type Activity, type ActivityState, type CommercialSignal, type CrmStore, type LoggedSpace, type Member, type Owner } from './domain/types'

type CrmContextValue = {
  store: CrmStore
  now: Date
  updateMember: (memberId: string, patch: Partial<Member>) => void
  addMember: (member: Member) => void
  addActivity: (activity: Activity) => void
  updateCommercialSignal: (memberId: string, signal: CommercialSignal) => void
  resetDemo: () => void
}

const CrmContext = createContext<CrmContextValue | null>(null)

function CrmProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<CrmStore>(() => loadStore())
  const [now] = useState(() => new Date())

  useEffect(() => {
    saveStore(store)
  }, [store])

  const value = useMemo<CrmContextValue>(() => ({
    store,
    now,
    updateMember: (memberId, patch) => {
      setStore((previous) => ({
        ...previous,
        members: previous.members.map((member) => member.id === memberId ? { ...member, ...patch } : member),
      }))
    },
    addMember: (member) => setStore((previous) => ({ ...previous, members: [...previous.members, member] })),
    addActivity: (activity) => setStore((previous) => ({ ...previous, activities: [...previous.activities, activity] })),
    updateCommercialSignal: (memberId, signal) => {
      setStore((previous) => ({
        ...previous,
        members: previous.members.map((member) => member.id === memberId ? { ...member, commercialSignal: signal } : member),
      }))
    },
    resetDemo: () => setStore(createDemoStore()),
  }), [now, store])

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>
}

function useCrm(): CrmContextValue {
  const value = useContext(CrmContext)
  if (!value) throw new Error('useCrm must be used inside CrmProvider')
  return value
}

const stateMeta: Record<ActivityState, { className: string; label: string }> = {
  'Newly joined': { className: 'state-new', label: 'Newly joined' },
  'Highly active': { className: 'state-high', label: 'Highly active' },
  Active: { className: 'state-active', label: 'Active' },
  'At risk': { className: 'state-risk', label: 'At risk' },
  Dormant: { className: 'state-dormant', label: 'Dormant' },
}

function StateBadge({ state }: { state: ActivityState }) {
  return <span className={`state-badge ${stateMeta[state].className}`}><span className="state-dot" />{stateMeta[state].label}</span>
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'orange' | 'teal' | 'dark' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function PrintButton() {
  return <button type="button" className="button button-secondary no-print" onClick={() => window.print()}>Print / Save PDF</button>
}

function SourceLink({ title, url, kind }: { title: string; url: string; kind?: string }) {
  if (url.startsWith('/')) {
    return <span className="source-item source-local"><span className="source-icon">↗</span><span><strong>{title}</strong><small>{kind ?? 'Provided locally; not deployed'}</small></span></span>
  }
  return <a className="source-item" href={url} target="_blank" rel="noreferrer"><span className="source-icon">↗</span><span><strong>{title}</strong><small>{kind ?? 'Open public source'}</small></span></a>
}

function Layout() {
  const { store } = useCrm()
  const followUpCount = store.members.filter((member) => hasFollowUp(member, store.activities, store.owners)).length
  return (
    <div className="app-shell">
      <aside className="sidebar no-print">
        <Link to="/" className="brand">
          <span className="brand-mark">F</span>
          <span><strong>Friends of Finance</strong><small>growth squad desk</small></span>
        </Link>
        <div className="sidebar-label">Assessment pack</div>
        <nav className="side-nav" aria-label="Submission navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>•</span>Home</NavLink>
          <NavLink to="/task-1" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>01</span>Task 1 research</NavLink>
          <NavLink to="/task-2" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>02</span>Task 2 journey</NavLink>
        </nav>
        <div className="sidebar-label crm-label">CRM workspace</div>
        <nav className="side-nav" aria-label="CRM navigation">
          <NavLink to="/crm" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>03</span>Task 3 overview</NavLink>
          <NavLink to="/crm/follow-up" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>{followUpCount}</span>Follow-up</NavLink>
          <NavLink to="/crm/new" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>✦</span>Newly joined</NavLink>
          <NavLink to="/crm/highly-active" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>↗</span>Highly active</NavLink>
          <NavLink to="/crm/risk" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>!</span>At risk / dormant</NavLink>
          <NavLink to="/crm/help" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>?</span>Rules & help</NavLink>
        </nav>
        <div className="sidebar-footer">
          <Pill tone="orange">Fictional demo</Pill>
          <span>Local store · v1</span>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar no-print">
          <div><span className="eyebrow">Growth Squad assessment</span><span className="topbar-title">Friends of Finance</span></div>
          <div className="topbar-right"><span className="topbar-status"><span className="live-dot" />Open access prototype</span><Link to="/crm/members/new" className="button button-dark button-small">Add member</Link></div>
        </header>
        <div className="mobile-nav no-print">
          <Link to="/" className="brand"><span className="brand-mark">F</span><strong>FoF</strong></Link>
          <div><Link to="/task-1">Task 1</Link><Link to="/task-2">Task 2</Link><Link to="/crm">CRM</Link></div>
        </div>
        <div className="page-wrap">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task-1" element={<TaskOnePage />} />
            <Route path="/task-2" element={<TaskTwoPage />} />
            <Route path="/crm" element={<CrmOverviewPage />} />
            <Route path="/crm/members/:id" element={<MemberDetailPage />} />
            <Route path="/crm/follow-up" element={<FollowUpPage />} />
            <Route path="/crm/new" element={<FocusedMembersPage focus="new" />} />
            <Route path="/crm/members/new" element={<NewMemberPage />} />
            <Route path="/crm/highly-active" element={<FocusedMembersPage focus="high" />} />
            <Route path="/crm/risk" element={<FocusedMembersPage focus="risk" />} />
            <Route path="/crm/help" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function HomePage() {
  const { store } = useCrm()
  const counts = getStateCounts(store)
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <Pill tone="orange">Submission hub · 19 Aug 2026</Pill>
          <h1>Real finance work.<br /><em>Shared openly.</em></h1>
          <p className="hero-lede">A source-led research pack and a deliberately small community activity desk for Friends of Finance.</p>
          <div className="hero-actions">
            <Link to="/task-1" className="button button-dark">Open Task 1 <span>↗</span></Link>
            <Link to="/crm" className="button button-secondary">Open live CRM <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit orbit-three" />
          <div className="hero-note"><span className="eyebrow">Operating principle</span><strong>Useful before it is impressive.</strong><small>Make the next action clearer, then let a human decide.</small></div>
        </div>
      </section>
      <div className="demo-notice"><span className="notice-icon">i</span><div><strong>Fictional data + simulated outreach</strong><p>Every CRM identity, employer, activity, and note is fictional. Task 1/2 messages are ready-to-send simulations only. No real professional has been contacted and no message can be sent from this app.</p></div></div>
      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">Deliverables</span><h2>Three open-access work surfaces</h2></div><span className="muted">Open access · no sign-in</span></div>
        <div className="deliverable-grid">
          <DeliverableCard number="01" title="Research & prioritisation" description="Eight current finance professionals, public evidence, transparent scoring, top three, and one priority invitee." to="/task-1" status="Complete" />
          <DeliverableCard number="02" title="Invitation journey" description="Five-touch sequence, three exact situation responses, public-source mapping, and a clear stop rule." to="/task-2" status="Complete" />
          <DeliverableCard number="03" title="Community activity CRM" description={`${store.members.length} fictional members, derived state, follow-up work, history, and a human-reviewed next step aid.`} to="/crm" status="Live demo" />
        </div>
      </section>
      <section className="home-lower-grid">
        <div className="card overview-mini">
          <div className="card-heading"><div><span className="eyebrow">CRM snapshot</span><h3>State distribution</h3></div><Link to="/crm" className="text-link">Open desk ↗</Link></div>
          <div className="mini-bars">{(Object.keys(counts) as ActivityState[]).map((state) => <div className="mini-bar-row" key={state}><span>{state}</span><div className="bar-track"><div className={`bar-fill ${stateMeta[state].className}`} style={{ width: `${Math.max(8, (counts[state] / Math.max(store.members.length, 1)) * 100)}%` }} /></div><strong>{counts[state]}</strong></div>)}</div>
        </div>
        <div className="card limitations-card"><span className="eyebrow">Honest limitations</span><h3>Good judgment stays in the loop.</h3><p>This is a browser-local prototype. The state calculator is deterministic, the simulated aid has no LLM call, and possible commercial signals stay outside activity logic.</p><Link to="/crm/help" className="text-link">Read rules & safeguards ↗</Link></div>
      </section>
    </div>
  )
}

function DeliverableCard({ number, title, description, to, status }: { number: string; title: string; description: string; to: string; status: string }) {
  return <Link to={to} className="deliverable-card"><div className="deliverable-top"><span className="deliverable-number">{number}</span><Pill tone={status === 'Live demo' ? 'teal' : 'neutral'}>{status}</Pill></div><h3>{title}</h3><p>{description}</p><span className="card-arrow">Open deliverable ↗</span></Link>
}

function PageHeader({ eyebrow, title, intro, actions }: { eyebrow: string; title: string; intro: string; actions?: ReactNode }) {
  return <div className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div>{actions ? <div className="page-actions no-print">{actions}</div> : null}</div>
}

function TaskOnePage() {
  const [expanded, setExpanded] = useState<string | null>('chris-ortega')
  const downloadCsv = () => {
    const blob = new Blob([professionalsToCsv(rankedProfessionals)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'friends-of-finance-task-1-research.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="print-sheet">
      <PageHeader eyebrow="Task 1 · research & prioritisation" title="Eight people worth a thoughtful invitation" intro="Current public professional signals, scored against the Friends of Finance audience and its documented spaces. All outreach remains simulated." actions={<><button type="button" className="button button-secondary" onClick={downloadCsv}>Download CSV</button><PrintButton /></>} />
      <div className="source-boundary"><strong>Research boundary</strong><span>Retrieved 19 August 2026. Exactly eight real current finance professionals are shown. No contact details, people-search databases, or private information are included. The two provided PDFs are source material only and are not committed or deployed.</span></div>
      <section className="priority-grid">
        <div className="priority-card"><div className="priority-kicker">Priority invitee · rank {rankOf(priorityInvitee.id)}</div><div className="priority-person"><div className="avatar avatar-large">CO</div><div><h2>{priorityInvitee.name}</h2><p>{priorityInvitee.role} · {priorityInvitee.company}</p></div><div className="priority-score"><strong>{totalScore(priorityInvitee)}</strong><small>/20</small></div></div><p>Chris is the strongest choice because the public evidence combines hands-on accounting, finance, FP&A, transformation, and business-partnership work. That is a direct fit with the guide’s workflow-first tone. The fit is an inference, not evidence that he wants an invitation.</p><div className="priority-tags"><Pill tone="teal">Finance Workflows</Pill><Pill>Public sources × {priorityInvitee.sources.length}</Pill><Pill tone="orange">Simulated only</Pill></div></div>
        <div className="stop-card"><span className="eyebrow">Stop rule</span><h3>Respect the person’s attention.</h3><p>Stop after the Task 2 sequence if there is no response. Allow at most one future approach after a minimum 90-day pause and only when a genuinely new, relevant public signal gives a specific reason to reconnect.</p><Link to="/task-2" className="text-link">See the full journey ↗</Link></div>
      </section>
      <section className="section-block compact-section"><div className="section-heading"><div><span className="eyebrow">Scoring framework</span><h2>What the numbers mean</h2></div><span className="muted">Tie-breakers: evidence, relevance, contribution</span></div><div className="anchor-grid">{scoringAnchors.map(([label, text]) => <div className="anchor-card" key={label}><strong>{label}</strong><span>{text}</span></div>)}</div></section>
      <section className="table-section"><div className="section-heading"><div><span className="eyebrow">Ranked table</span><h2>Evidence before enthusiasm</h2></div><span className="muted">Click a row to inspect verified vs assumed</span></div><div className="table-wrap"><table className="research-table"><thead><tr><th>Rank</th><th>Professional</th><th>Signal & community fit</th><th>Space</th><th>Relevance</th><th>Contribution</th><th>Member value</th><th>Evidence</th><th>Total</th></tr></thead><tbody>{rankedProfessionals.map((person) => { const rank = rankOf(person.id); return <tr key={person.id} className={person.id === priorityInvitee.id ? 'priority-row' : ''}><td className="rank-cell">{rank === 1 ? '01' : `0${rank}`}</td><td><div className="person-cell"><div className="avatar">{person.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><strong>{person.name}</strong><span>{person.role}<br />{person.company}</span><button type="button" className="detail-toggle" onClick={() => setExpanded(expanded === person.id ? null : person.id)}>{expanded === person.id ? 'Hide evidence' : 'Show evidence'}</button></div></div>{expanded === person.id ? <div className="evidence-drawer"><div><strong>Verified</strong><ul>{person.verified.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Assumed / to test</strong><ul>{person.assumed.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="source-stack">{person.sources.map((source) => <SourceLink key={source.id} {...source} />)}</div></div> : null}</td><td className="signal-cell"><p>{person.signal}</p><span>{person.whyValuable}</span></td><td><Pill tone="teal">{person.space}</Pill></td><td>{person.scores.communityRelevance}/5</td><td>{person.scores.potentialContribution}/5</td><td>{person.scores.likelyMemberValue}/5</td><td>{person.scores.evidenceStrength}/5</td><td><strong className="total-score">{totalScore(person)}</strong><small>/20</small></td></tr>})}</tbody></table></div></section>
      <section className="source-section"><div className="section-heading"><div><span className="eyebrow">Source check</span><h2>Public sources, open by design</h2></div><span className="muted">Each person has at least two sources, including a primary/current source</span></div><div className="source-grid">{rankedProfessionals.map((person) => <div className="source-card" key={person.id}><strong>{person.name}</strong><span>{person.sources.length} sources · retrieved {person.sources[0].retrieved}</span>{person.sources.slice(0, 2).map((source) => <SourceLink key={source.id} {...source} />)}</div>)}</div></section>
    </div>
  )
}

function TaskTwoPage() {
  return (
    <div className="print-sheet">
      <PageHeader eyebrow="Task 2 · invitation journey" title={`A five-touch invitation with an exit`} intro={`One priority invitee, one coordinated sequence, and enough context to say no safely. The priority invitee is the same Chris Ortega selected in Task 1.`} actions={<PrintButton />} />
      <div className="source-boundary"><strong>Simulation notice</strong><span>These are ready-to-send simulated messages only. No email address or contact detail was collected. Do not contact the real person. The copy uses public professional sources and the provided orientation guide only.</span></div>
      <section className="journey-rail">{touches.map((touch) => <article className="touch-card" key={touch.step}><div className="touch-marker">0{touch.step}</div><div className="touch-content"><div className="touch-meta"><Pill tone={touch.step === 5 ? 'orange' : 'teal'}>{touch.timing}</Pill><span>{touch.channel}</span></div><h2>{touch.purpose}</h2><div className="message-block">{touch.message}</div><div className="touch-details"><div><strong>Intended action</strong><span>{touch.intendedAction}</span></div><div><strong>Why it fits</strong><span>{touch.rationale}</span></div></div><div className="touch-sources"><strong>Personalisation sources</strong>{touch.sources.map((source) => <SourceLink key={source.id} {...source} />)}</div></div></article>)}</section>
      <section className="situation-section"><div className="section-heading"><div><span className="eyebrow">Trust-aware responses</span><h2>Three situations, answered plainly</h2></div><span className="muted">No oversell · no invented relationship</span></div><div className="situation-grid">{situations.map((situation) => <article className="situation-card" key={situation.label}><Pill tone="orange">{situation.label}</Pill><h3>{situation.prompt}</h3><p>{situation.response}</p></article>)}</div></section>
      <div className="stop-banner"><div><span className="eyebrow">Close the loop</span><h2>Silence is not permission.</h2><p>{stopRule}</p></div><span className="stop-symbol">×</span></div>
    </div>
  )
}

function CrmOverviewPage() {
  const { store, now, resetDemo } = useCrm()
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState<ActivityState | 'all'>('all')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [spaceFilter, setSpaceFilter] = useState<LoggedSpace | 'all'>('all')
  const [followFilter, setFollowFilter] = useState(false)
  const counts = getStateCounts(store, now)
  const filtered = useMemo(() => store.members.filter((member) => {
    const state = deriveActivityState(member, store.activities, now)
    const normalized = search.toLowerCase().trim()
    const matchesSearch = !normalized || [member.name, member.role, member.company].some((value) => value.toLowerCase().includes(normalized))
    const matchesState = stateFilter === 'all' || state === stateFilter
    const matchesOwner = ownerFilter === 'all' || (ownerFilter === 'unassigned' ? !member.ownerId : member.ownerId === ownerFilter)
    const matchesSpace = spaceFilter === 'all' || member.preferredSpaces.includes(spaceFilter)
    const matchesFollow = !followFilter || hasFollowUp(member, store.activities, store.owners, now)
    return matchesSearch && matchesState && matchesOwner && matchesSpace && matchesFollow
  }), [followFilter, now, ownerFilter, search, spaceFilter, stateFilter, store.activities, store.members, store.owners])
  const recent = [...store.activities].sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()).slice(0, 5)
  const activityPulse = getRollingActivityPulse(store.activities, now)

  return (
    <div className="crm-page">
      <PageHeader eyebrow="Task 3 · fictional community activity CRM" title="The activity desk" intro="Make follow-up visible, keep state rules inspectable, and leave the final judgment with a human." actions={<><button type="button" className="button button-secondary" onClick={() => { if (window.confirm('Reset all fictional demo changes?')) resetDemo() }}>Reset demo data</button><Link to="/crm/members/new" className="button button-dark">Add member</Link></>} />
      <div className="crm-disclosure"><span className="notice-icon">✦</span><div><strong>Fictional demo workspace</strong><p>{store.members.length} fictional members · browser-local storage · no live community integration · no authentication</p></div><Link to="/crm/help" className="text-link">How it works ↗</Link></div>
      <section className="metric-grid">{(Object.keys(counts) as ActivityState[]).map((state) => <div className="metric-card" key={state}><div className={`metric-icon ${stateMeta[state].className}`}>{state === 'Newly joined' ? '✦' : state === 'Highly active' ? '↗' : state === 'Active' ? '•' : state === 'At risk' ? '!' : '×'}</div><span>{state}</span><strong>{counts[state]}</strong><small>{state === 'Newly joined' ? '0–14 days' : state === 'Highly active' ? '12+ pts / 30d' : state === 'Active' ? 'Meaningful / 30d' : state === 'At risk' ? 'Cooling / absent' : '60d+'}</small></div>)}<div className="metric-card metric-card-accent"><div className="metric-icon">!</div><span>Needs follow-up</span><strong>{store.members.filter((member) => hasFollowUp(member, store.activities, store.owners, now)).length}</strong><small>Due, unowned, risk, dormant</small></div></section>
      <section className="overview-grid"><div className="card chart-card"><div className="card-heading"><div><span className="eyebrow">30-day pulse</span><h3>Activity at a glance</h3></div><Pill tone="teal">{activityPulse.points} points logged</Pill></div><div className="pulse-row"><div className="pulse-number"><strong>{activityPulse.activityCount}</strong><span>logged activities</span></div><div className="pulse-bars">{(Object.keys(counts) as ActivityState[]).map((state) => <div key={state} className="pulse-bar-wrap"><div className={`pulse-bar ${stateMeta[state].className}`} style={{ height: `${Math.max(12, counts[state] * 15)}px` }} /><small>{counts[state]}</small><span>{state === 'Newly joined' ? 'New' : state === 'Highly active' ? 'High' : state === 'Active' ? 'Act' : state === 'At risk' ? 'Risk' : 'Dorm'}</span></div>)}</div></div></div><div className="card recent-card"><div className="card-heading"><div><span className="eyebrow">Latest log</span><h3>Recent activity</h3></div><Link to="/crm" className="text-link">Refresh</Link></div><div className="recent-list">{recent.map((activity) => { const member = store.members.find((item) => item.id === activity.memberId); return <div className="recent-item" key={activity.id}><span className={`activity-type type-${activity.type}`}>{activity.type === 'post' ? 'P' : activity.type === 'comment' ? 'C' : 'R'}</span><div><strong>{member?.name ?? 'Unknown member'}</strong><span>{activity.space} · {relativeDate(activity.occurredAt, now)}</span></div></div>})}</div></div></section>
      <section className="member-table-section"><div className="section-heading"><div><span className="eyebrow">Member directory</span><h2>Find the next useful action</h2></div><span className="muted">{filtered.length} of {store.members.length} shown</span></div><div className="filters card"><label className="search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, role, or company" aria-label="Search members" /></label><label><span>State</span><select value={stateFilter} onChange={(event) => setStateFilter(event.target.value as ActivityState | 'all')}><option value="all">All states</option>{Object.keys(stateMeta).map((state) => <option key={state} value={state}>{state}</option>)}</select></label><label><span>Owner</span><select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}><option value="all">All owners</option><option value="unassigned">Unassigned</option>{store.owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.displayName}</option>)}</select></label><label><span>Preferred space</span><select value={spaceFilter} onChange={(event) => setSpaceFilter(event.target.value as LoggedSpace | 'all')}><option value="all">All spaces</option>{LOGGED_SPACES.map((space) => <option key={space} value={space}>{space}</option>)}</select></label><label className="check-field"><input type="checkbox" checked={followFilter} onChange={(event) => setFollowFilter(event.target.checked)} /><span>Needs follow-up</span></label><button type="button" className="button button-ghost" onClick={() => { setSearch(''); setStateFilter('all'); setOwnerFilter('all'); setSpaceFilter('all'); setFollowFilter(false) }}>Clear</button></div><MemberList members={filtered} now={now} emptyMessage="No members match these filters." /></section>
    </div>
  )
}

function MemberList({ members, now, emptyMessage = 'No members found.', sortMode = 'default' }: { members: Member[]; now: Date; emptyMessage?: string; sortMode?: 'default' | 'follow-up' }) {
  const { store } = useCrm()
  const sorted = [...members].sort((a, b) => {
    const stateA = deriveActivityState(a, store.activities, now)
    const stateB = deriveActivityState(b, store.activities, now)
    const riskOrder: Record<ActivityState, number> = { 'At risk': 0, Dormant: 1, 'Newly joined': 2, Active: 3, 'Highly active': 4 }
    const followA = hasFollowUp(a, store.activities, store.owners, now)
    const followB = hasFollowUp(b, store.activities, store.owners, now)
    if (followA !== followB) return followA ? -1 : 1
    if (sortMode === 'follow-up') {
      const dueDifference = compareFollowUpDueDates(a, b, now)
      if (dueDifference !== 0) return dueDifference
    }
    if (riskOrder[stateA] !== riskOrder[stateB]) return riskOrder[stateA] - riskOrder[stateB]
    return a.name.localeCompare(b.name)
  })
  if (!sorted.length) return <div className="empty-state card"><span className="empty-icon">○</span><h3>{emptyMessage}</h3><p>Try clearing a filter or add a fictional member to the demo.</p></div>
  return <div className="member-list">{sorted.map((member) => { const state = deriveActivityState(member, store.activities, now); const reasons = getFollowUpReasons(member, store.activities, store.owners, now); const stats = getActivityStats(member, store.activities, now); const owner = store.owners.find((item) => item.id === member.ownerId); return <Link to={`/crm/members/${member.id}`} className="member-row card" key={member.id}><div className="member-main"><div className="avatar">{member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><strong>{member.name}</strong><span>{member.role} · {member.company}</span><small>Joined {formatDate(member.joinedAt)} · {stats.meaningfulCount} meaningful activities</small></div></div><div className="member-state"><StateBadge state={state} />{reasons.length ? <span className="followup-flag">Follow-up</span> : null}</div><div className="member-spaces"><span className="row-label">Preferred spaces</span><div>{member.preferredSpaces.slice(0, 2).map((space) => <Pill key={space}>{space}</Pill>)}</div></div><div className="member-action"><span className="row-label">Next action</span><strong>{member.nextAction.text || 'No next action'}</strong><span>{member.nextAction.dueDate ? `${dueStatus(member, now) === 'overdue' ? 'Overdue' : `Due ${formatDate(member.nextAction.dueDate)}`}` : 'No due date'} · {owner?.displayName ?? 'Unassigned'}</span></div><span className="row-arrow">↗</span></Link>})}</div>
}

function FollowUpPage() {
  const { store, now } = useCrm()
  const members = store.members.filter((member) => hasFollowUp(member, store.activities, store.owners, now))
  const overdue = members.filter((member) => dueStatus(member, now) === 'overdue').length
  const unowned = members.filter((member) => !member.ownerId).length
  const risk = members.filter((member) => ['At risk', 'Dormant'].includes(deriveActivityState(member, store.activities, now))).length
  return <div className="crm-page"><PageHeader eyebrow="CRM workspace · attention queue" title="Follow-up, with reasons" intro="A queue ordered by overdue work first, then due date, with risk and dormancy made visible." actions={<Link to="/crm" className="button button-secondary">Back to overview</Link>} /><section className="metric-grid queue-metrics"><div className="metric-card metric-card-accent"><span>Queue</span><strong>{members.length}</strong><small>Members with a reason</small></div><div className="metric-card"><span>Overdue</span><strong>{overdue}</strong><small>Next action date passed</small></div><div className="metric-card"><span>Unowned</span><strong>{unowned}</strong><small>Human assignment needed</small></div><div className="metric-card"><span>Risk / dormant</span><strong>{risk}</strong><small>Cooling or quiet records</small></div></section><div className="queue-callout"><strong>Every reason is shown on the member record.</strong><span>Needs follow-up can come from a due action, missing owner, risk/dormant state, or a newly joined member without a Say Hello post after seven days.</span></div><MemberList members={members} now={now} emptyMessage="The queue is clear." sortMode="follow-up" /></div>
}

function FocusedMembersPage({ focus }: { focus: 'new' | 'high' | 'risk' }) {
  const { store, now } = useCrm()
  const members = store.members.filter((member) => { const state = deriveActivityState(member, store.activities, now); return focus === 'new' ? state === 'Newly joined' : focus === 'high' ? state === 'Highly active' : state === 'At risk' || state === 'Dormant' })
  const config = focus === 'new' ? { eyebrow: 'Focused view · onboarding', title: 'Newly joined', intro: 'Members in their first 14 elapsed days. Make the first useful action clear without manufacturing urgency.' } : focus === 'high' ? { eyebrow: 'Focused view · peer energy', title: 'Highly active', intro: 'Members meeting the full 30-day threshold: points, meaningful activity, cross-space participation, distinct dates, and recency.' } : { eyebrow: 'Focused view · cooling signals', title: 'At risk and dormant', intro: 'Members whose meaningful activity is cooling or absent. Treat this as a prompt to review, not a verdict or sales signal.' }
  return <div className="crm-page"><PageHeader eyebrow={config.eyebrow} title={config.title} intro={config.intro} actions={<Link to="/crm" className="button button-secondary">Back to overview</Link>} /><div className="focused-note card"><div className={`metric-icon ${focus === 'new' ? 'state-new' : focus === 'high' ? 'state-high' : 'state-risk'}`}>{focus === 'new' ? '✦' : focus === 'high' ? '↗' : '!'}</div><div><strong>{members.length} fictional records in this view</strong><p>Open any record to see the exact state evidence, activity history, next action, and human checks.</p></div></div><MemberList members={members} now={now} emptyMessage="No records in this focused view." /></div>
}

function NewMemberPage() {
  const { store, now, addMember } = useCrm()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', company: '', joinedAt: dateInput(now), ownerId: '', preferredSpaces: ['Say Hello'] as LoggedSpace[], nextText: 'Welcome and invite an introduction', dueDate: dateInput(addDays(now, 2)), notes: '' })
  const toggleSpace = (space: LoggedSpace) => setForm((current) => ({ ...current, preferredSpaces: current.preferredSpaces.includes(space) ? current.preferredSpaces.filter((value) => value !== space) : [...current.preferredSpaces, space] }))
  const submit = (event: FormEvent) => { event.preventDefault(); if (!form.name.trim() || !form.role.trim() || !form.company.trim()) return; const id = `m${Date.now()}`; addMember({ id, name: form.name.trim(), role: form.role.trim(), company: form.company.includes('(fictional)') ? form.company.trim() : `${form.company.trim()} (fictional)`, joinedAt: form.joinedAt, ownerId: form.ownerId || null, preferredSpaces: form.preferredSpaces.length ? form.preferredSpaces : ['Say Hello'], nextAction: { text: form.nextText.trim(), dueDate: form.dueDate, status: 'planned' }, notes: `Fictional demo record. ${form.notes.trim()}` }); setSaved(true); setTimeout(() => navigate(`/crm/members/${id}`), 300) }
  return <div className="crm-page"><PageHeader eyebrow="CRM workspace · new record" title="Add a fictional member" intro="Create a clearly labelled demo record. State is calculated from dates and activity after save." actions={<Link to="/crm" className="button button-secondary">Cancel</Link>} /><form className="form-layout" onSubmit={submit}><div className="card form-card"><div className="form-card-heading"><span className="eyebrow">Identity</span><Pill tone="orange">Fictional only</Pill></div><div className="form-grid"><label><span>Name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Avery Brooks" /></label><label><span>Role</span><input required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} placeholder="e.g. Finance Operations Analyst" /></label><label><span>Company (fictional)</span><input required value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="e.g. Cedarline Works" /></label><label><span>Joined date</span><input type="date" required value={form.joinedAt} onChange={(event) => setForm({ ...form, joinedAt: event.target.value })} /></label><label><span>Owner</span><select value={form.ownerId} onChange={(event) => setForm({ ...form, ownerId: event.target.value })}><option value="">Unassigned</option>{store.owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.displayName}</option>)}</select></label><label><span>Next action status</span><select value="planned" disabled><option value="planned">Planned</option></select></label></div></div><div className="card form-card"><div className="form-card-heading"><span className="eyebrow">Documented spaces</span><span className="muted">Preferences only</span></div><p className="form-help">Choose spaces the fictional member might prefer. Only the six documented discussion spaces can receive activity logs.</p><div className="space-check-grid">{LOGGED_SPACES.map((space) => <label className="check-tile" key={space}><input type="checkbox" checked={form.preferredSpaces.includes(space)} onChange={() => toggleSpace(space)} /><span>{space}</span></label>)}</div></div><div className="card form-card"><div className="form-card-heading"><span className="eyebrow">Next action</span><span className="muted">Editable after save</span></div><div className="form-grid"><label className="wide"><span>Action</span><input value={form.nextText} onChange={(event) => setForm({ ...form, nextText: event.target.value })} /></label><label><span>Due date</span><input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} /></label><label className="wide"><span>Notes</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Fictional context only" /></label></div></div><div className="form-submit"><button className="button button-dark" type="submit">Create fictional member</button>{saved ? <span className="saved-note">Saved. Opening member detail…</span> : null}</div></form></div>
}

function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { store, now, updateMember, addActivity, updateCommercialSignal } = useCrm()
  const member = store.members.find((item) => item.id === id)
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<Member | null>(member ?? null)
  const [activityForm, setActivityForm] = useState({ type: 'post' as Activity['type'], space: 'Say Hello' as LoggedSpace, occurredAt: dateInput(now), summary: '' })
  const [signalDraft, setSignalDraft] = useState<CommercialSignal>(member?.commercialSignal ?? blankCommercialSignal())
  const [suggestion, setSuggestion] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => { setForm(member ?? null); setSignalDraft(member?.commercialSignal ?? blankCommercialSignal()) }, [member, id])
  const recommendation = useMemo<Recommendation | null>(() => member ? recommendNextStep(member, store.activities, now) : null, [member, now, store.activities])
  useEffect(() => { if (recommendation) setSuggestion(recommendation.editableSuggestion) }, [recommendation])
  if (!member || !form || !recommendation) return <NotFoundPage />
  const state = deriveActivityState(member, store.activities, now)
  const activities = getMemberActivities(member.id, store.activities)
  const stats = getActivityStats(member, store.activities, now)
  const reasons = getFollowUpReasons(member, store.activities, store.owners, now)
  const owner = store.owners.find((item) => item.id === member.ownerId)
  const toggleSpace = (space: LoggedSpace) => setForm((current) => current ? { ...current, preferredSpaces: current.preferredSpaces.includes(space) ? current.preferredSpaces.filter((value) => value !== space) : [...current.preferredSpaces, space] } : current)
  const saveMember = (event: FormEvent) => { event.preventDefault(); updateMember(member.id, form); setSaved(true); setTimeout(() => setSaved(false), 1600) }
  const logActivity = (event: FormEvent) => { event.preventDefault(); if (!activityForm.summary.trim()) return; addActivity({ id: `a${Date.now()}`, memberId: member.id, occurredAt: new Date(`${activityForm.occurredAt}T12:00:00`).toISOString(), space: activityForm.space, type: activityForm.type, summary: `Fictional demo: ${activityForm.summary.trim()}`, sourceMarker: 'Manually logged fictional demo data' }); setActivityForm({ ...activityForm, summary: '' }) }
  const saveSignal = (event: FormEvent) => { event.preventDefault(); updateCommercialSignal(member.id, { ...signalDraft, enteredByHuman: true, reviewRequired: true, reviewedAt: signalDraft.status === 'reviewed' ? (signalDraft.reviewedAt || new Date().toISOString()) : undefined }) }
  const copySuggestion = () => { void navigator.clipboard?.writeText(suggestion); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  return <div className="crm-page member-detail-page"><div className="breadcrumb no-print"><Link to="/crm">CRM overview</Link><span>/</span><span>{member.name}</span></div><PageHeader eyebrow="Member detail · fictional record" title={member.name} intro={`${member.role} at ${member.company}. State is derived from recorded dates and meaningful activity.`} actions={<><button type="button" className="button button-secondary" onClick={() => navigate(-1)}>Back</button><Link to="/crm/follow-up" className="button button-ghost">Follow-up queue</Link></>} /><div className="member-hero card"><div className="member-hero-main"><div className="avatar avatar-xl">{member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><div className="hero-badges"><StateBadge state={state} />{reasons.length ? <Pill tone="orange">Needs follow-up</Pill> : <Pill tone="teal">No follow-up reason</Pill>}</div><h2>{member.role}</h2><p>{member.company} · joined {formatDate(member.joinedAt)} ({elapsedDays(member.joinedAt, now)} elapsed days)</p></div></div><div className="member-hero-stats"><div><strong>{stats.points30}</strong><span>30d points</span></div><div><strong>{stats.meaningfulCount}</strong><span>meaningful</span></div><div><strong>{activities.length}</strong><span>history items</span></div></div></div><div className="detail-grid"><div className="detail-main"><form className="card form-card" onSubmit={saveMember}><div className="form-card-heading"><span className="eyebrow">Editable profile</span>{saved ? <span className="saved-note">Saved</span> : <span className="muted">Human-entered fields</span>}</div><div className="form-grid"><label><span>Name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label><span>Role</span><input value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} /></label><label><span>Company</span><input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label><label><span>Joined date</span><input type="date" value={form.joinedAt} onChange={(event) => setForm({ ...form, joinedAt: event.target.value })} /></label><label><span>Owner</span><select value={form.ownerId ?? ''} onChange={(event) => setForm({ ...form, ownerId: event.target.value || null })}><option value="">Unassigned</option>{store.owners.map((item) => <option value={item.id} key={item.id}>{item.displayName}</option>)}</select></label><label><span>Activity state</span><div className="readonly-input"><StateBadge state={state} /></div></label><label className="wide"><span>Notes</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label></div><div className="form-card-heading sub-heading"><span className="eyebrow">Preferred documented spaces</span><span className="muted">No invented resource mechanics</span></div><div className="space-check-grid">{LOGGED_SPACES.map((space) => <label className="check-tile" key={space}><input type="checkbox" checked={form.preferredSpaces.includes(space)} onChange={() => toggleSpace(space)} /><span>{space}</span></label>)}</div><div className="form-card-heading sub-heading"><span className="eyebrow">Next action</span><span className="muted">Displayed in follow-up views</span></div><div className="form-grid"><label className="wide"><span>Action</span><input value={form.nextAction.text} onChange={(event) => setForm({ ...form, nextAction: { ...form.nextAction, text: event.target.value } })} /></label><label><span>Due date</span><input type="date" value={form.nextAction.dueDate} onChange={(event) => setForm({ ...form, nextAction: { ...form.nextAction, dueDate: event.target.value } })} /></label><label><span>Status</span><select value={form.nextAction.status} onChange={(event) => setForm({ ...form, nextAction: { ...form.nextAction, status: event.target.value as 'planned' | 'completed' } })}><option value="planned">Planned</option><option value="completed">Completed</option></select></label></div><button className="button button-dark" type="submit">Save member changes</button></form><form className="card form-card" onSubmit={logActivity}><div className="form-card-heading"><span className="eyebrow">Log documented activity</span><Pill tone="orange">Fictional manual log</Pill></div><p className="form-help">Posts and comments are meaningful. Reactions add points but cannot independently make or keep a member Active or Highly active.</p><div className="form-grid"><label><span>Type</span><select value={activityForm.type} onChange={(event) => setActivityForm({ ...activityForm, type: event.target.value as Activity['type'] })}><option value="post">Post · 4 points</option><option value="comment">Comment · 2 points</option><option value="reaction">Reaction · 1 point</option></select></label><label><span>Documented space</span><select value={activityForm.space} onChange={(event) => setActivityForm({ ...activityForm, space: event.target.value as LoggedSpace })}>{LOGGED_SPACES.map((space) => <option value={space} key={space}>{space}</option>)}</select></label><label><span>Occurred on</span><input type="date" value={activityForm.occurredAt} onChange={(event) => setActivityForm({ ...activityForm, occurredAt: event.target.value })} /></label><label className="wide"><span>Fictional summary</span><textarea required value={activityForm.summary} onChange={(event) => setActivityForm({ ...activityForm, summary: event.target.value })} placeholder="Describe only the documented interaction" /></label></div><button className="button button-secondary" type="submit">Log activity</button></form><ActivityHistory activities={activities} /></div><aside className="detail-side"><AiAid recommendation={recommendation} suggestion={suggestion} setSuggestion={setSuggestion} copied={copied} copySuggestion={copySuggestion} /><div className="card next-action-card"><span className="eyebrow">Follow-up reasons</span><h3>{reasons.length ? `${reasons.length} reason${reasons.length > 1 ? 's' : ''} to review` : 'No follow-up reason'}</h3>{reasons.length ? <ul className="reason-list">{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul> : <p className="muted">The record is not currently in the attention queue.</p>}<div className="owner-line"><span>Owner</span><strong>{owner?.displayName ?? 'Unassigned'}</strong></div></div><CommercialSignalPanel signal={signalDraft} setSignal={setSignalDraft} saveSignal={saveSignal} /></aside></div></div>
}

function ActivityHistory({ activities }: { activities: Activity[] }) {
  return <section className="card history-card"><div className="card-heading"><div><span className="eyebrow">Reverse-chronological history</span><h3>Recorded member activity</h3></div><span className="muted">{activities.length} items</span></div>{activities.length ? <div className="timeline">{activities.map((activity) => <div className="timeline-item" key={activity.id}><span className={`activity-type type-${activity.type}`}>{activity.type === 'post' ? 'P' : activity.type === 'comment' ? 'C' : 'R'}</span><div><div className="timeline-meta"><Pill>{activity.type}</Pill><span>{activity.space}</span><span>{formatDate(activity.occurredAt)}</span></div><p>{activity.summary}</p><small>{activity.sourceMarker}</small></div></div>)}</div> : <div className="empty-inline">No activity logged yet.</div>}</section>
}

function AiAid({ recommendation, suggestion, setSuggestion, copied, copySuggestion }: { recommendation: Recommendation; suggestion: string; setSuggestion: (value: string) => void; copied: boolean; copySuggestion: () => void }) {
  return <div className="card ai-card"><div className="ai-header"><div><Pill tone="orange">Human review required</Pill><h3>Next-step aid</h3></div><span className="ai-spark">✦</span></div><div className="ai-label">{recommendation.title}</div><strong className="ai-recommendation">{recommendation.recommendation}</strong><p>{recommendation.rationale}</p><div className="ai-subsection"><strong>Exact evidence used</strong><ul>{recommendation.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="ai-subsection"><strong>Human checks</strong><ul>{recommendation.humanChecks.map((item) => <li key={item}>{item}</li>)}</ul></div><label className="suggestion-label"><span>Editable suggestion</span><textarea value={suggestion} onChange={(event) => setSuggestion(event.target.value)} /></label><button type="button" className="button button-secondary button-full" onClick={copySuggestion}>{copied ? 'Copied to clipboard' : 'Copy suggestion'}</button><p className="ai-footnote">Never sends. Never reads commercial signals. Never treats activity as buying intent.</p></div>
}

function CommercialSignalPanel({ signal, setSignal, saveSignal }: { signal: CommercialSignal; setSignal: (signal: CommercialSignal) => void; saveSignal: (event: FormEvent) => void }) {
  return <form className="card commercial-card" onSubmit={saveSignal}><div className="commercial-head"><div><span className="eyebrow">Separate human review</span><h3>Commercial signal</h3></div><span className="lock-symbol">⌁</span></div><div className="commercial-warning"><strong>Excluded from state + AI</strong><span>This is a fictional, human-entered review field. It is never inferred from activity and never treated as buying intent.</span></div><label><span>Status</span><select value={signal.status} onChange={(event) => setSignal({ ...signal, status: event.target.value as CommercialSignal['status'] })}><option value="none">None recorded</option><option value="possible">Possible · review required</option><option value="reviewed">Reviewed by human</option></select></label><label><span>Human-entered note</span><textarea value={signal.note} onChange={(event) => setSignal({ ...signal, note: event.target.value })} placeholder="Record a careful, fictional note only" /></label><label><span>Reviewer</span><input value={signal.reviewer ?? ''} onChange={(event) => setSignal({ ...signal, reviewer: event.target.value })} placeholder="Name or role" /></label><button className="button button-ghost button-full" type="submit">Save human review</button><small className="field-note">enteredByHuman: true · reviewRequired: true</small></form>
}

function HelpPage() {
  return <div className="crm-page help-page"><PageHeader eyebrow="CRM workspace · rules & safeguards" title="Use the tool without overreading it" intro="The CRM makes recorded activity easier to inspect. It does not turn a browser demo into a shared system or a community interaction into a sales signal." actions={<Link to="/crm" className="button button-secondary">Back to overview</Link>} /><div className="help-grid"><section className="card help-card"><span className="eyebrow">Storage model</span><h2>Browser-local by design</h2><p>State is stored under <code>fof-crm:v1</code> in localStorage. Reloads persist changes in the same browser; other managers will not see them. Reset demo data restores the fictional seed.</p><div className="limitation-callout"><strong>Central limitation</strong><span>localStorage is browser-local and is not a shared multi-user CRM.</span></div></section><section className="card help-card"><span className="eyebrow">Activity boundaries</span><h2>Only documented spaces</h2><p>Activities can be logged only in the six discussion spaces below. Interviews & Stories and Curated Jobs are preferences or resource recommendations here, not invented likes, saves, attendance, or applications.</p><div className="space-chip-list">{LOGGED_SPACES.map((space) => <Pill tone="teal" key={space}>{space}</Pill>)}</div></section></div><section className="card rules-card"><div className="card-heading"><div><span className="eyebrow">Deterministic state calculator</span><h2>Precedence and boundaries</h2></div><Pill tone="orange">Derived · not manually editable</Pill></div><div className="rules-table"><div className="rules-row rules-header"><span>Priority</span><span>State</span><span>Rule</span></div><div className="rules-row"><span>01</span><strong><StateBadge state="Newly joined" /></strong><span>Joined 0–14 elapsed days ago.</span></div><div className="rules-row"><span>02</span><strong><StateBadge state="Highly active" /></strong><span>Not new; 12+ points in rolling 30 days; 3+ meaningful activities across 2+ spaces and 3 dates; latest meaningful activity within 7 days.</span></div><div className="rules-row"><span>03</span><strong><StateBadge state="Active" /></strong><span>Not above; at least one meaningful post or comment within 30 days.</span></div><div className="rules-row"><span>04</span><strong><StateBadge state="At risk" /></strong><span>No meaningful activity and joined 15–60 days ago, or latest meaningful activity is 31–60 days old.</span></div><div className="rules-row"><span>05</span><strong><StateBadge state="Dormant" /></strong><span>No meaningful activity and joined over 60 days ago, or latest meaningful activity is over 60 days old.</span></div></div><div className="weights-row"><span>Weights</span><Pill>Post · 4</Pill><Pill>Comment · 2</Pill><Pill>Reaction · 1</Pill><span className="muted">Reactions add points but cannot independently qualify a member.</span></div></section><section className="card help-card"><span className="eyebrow">Simulated AI safeguard</span><h2>Recommendation, not automation</h2><p>The aid is deterministic and labeled “Simulated — deterministic rules; no LLM call.” It uses only member fields, derived state, activity history, preferred spaces, owner, and next action. It shows evidence and human checks, produces editable/copyable wording, never sends, never fabricates personalisation, and never reads the commercial-signal field.</p><div className="two-column-note"><div><strong>Commercial signal</strong><span>Human-entered, separate, review-required, excluded from state and recommendation inputs.</span></div><div><strong>Human override</strong><span>Discard the suggestion, change the next action, or choose pause whenever the recorded context is not enough.</span></div></div></section><section className="card test-card"><div className="card-heading"><div><span className="eyebrow">Exact testing steps</span><h2>QA the operating decisions</h2></div><Pill tone="teal">Ready for demo</Pill></div><ol className="test-list"><li>Reset demo data and confirm all five states appear in the overview.</li><li>Search by member name, role, and company; filter by state, owner, preferred space, and needs-follow-up; clear filters.</li><li>Open a member, edit owner/next action/notes, reload, and confirm persistence.</li><li>Log a post or comment and confirm history and derived state update immediately.</li><li>Log a reaction only and confirm it cannot independently make a member Active or Highly active.</li><li>Open the Highly active view and verify points, meaningful activity, spaces, distinct dates, and recency.</li><li>Change the commercial signal, then confirm state and the simulated AI evidence/recommendation do not change.</li><li>Use Copy suggestion; confirm there is no send control and all wording remains editable.</li><li>Open Task 1 and Task 2, test external source links, CSV download, and Print / Save PDF.</li></ol></section></div>
}

function NotFoundPage() {
  return <div className="empty-state card not-found"><span className="empty-icon">404</span><h2>That page is not in the desk.</h2><p>Use the navigation to return to the assessment hub or CRM overview.</p><Link to="/" className="button button-dark">Back home</Link></div>
}

function getStateCounts(store: CrmStore, now = new Date()): Record<ActivityState, number> {
  return store.members.reduce<Record<ActivityState, number>>((counts, member) => { const state = deriveActivityState(member, store.activities, now); counts[state] += 1; return counts }, { 'Newly joined': 0, 'Highly active': 0, Active: 0, 'At risk': 0, Dormant: 0 })
}

function blankCommercialSignal(): CommercialSignal {
  return { status: 'none', note: '', enteredByHuman: true, reviewRequired: true }
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12, 0, 0, 0)
}

function dateInput(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function relativeDate(value: string, now: Date): string {
  const days = elapsedDays(value, now)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days > 1) return `${days}d ago`
  return `in ${Math.abs(days)}d`
}

export default function App() {
  return <CrmProvider><Layout /></CrmProvider>
}
