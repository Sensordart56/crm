const scriptParagraphs = [
  "Hello, this is a short handoff for the Friends of Finance activity CRM. Everything you see is fictional demo data. The application is a browser-local prototype, not a live member database, and all outreach examples are simulations.",
  "I will use Emery Stone as the representative case. Emery is a fictional Assistant Controller at Maple Current Studio. The record says Emery joined 40 days ago, has no assigned owner, and has a planned next action that is three days overdue. The latest meaningful activity is a fictional comment in Finance Workflows 42 days ago. That combination is why the CRM assigns At risk: Emery is past the new-member window, and the latest meaningful activity is between 31 and 60 elapsed days old. A reaction would not have been enough to keep this record Active, because only posts and comments count as meaningful activity.",
  "The next action is deliberately modest: review one permission-based prompt, then pause. It is not a sequence of reminders. The preferred spaces on this record are Finance Workflows and Career & Compensation, so a human could decide whether a practical workflow question is still relevant. The record does not prove that Emery wants a message, needs a product, or has any commercial intent. It only tells us what was recorded and how old it is.",
  "The next-step aid on the member page is labeled, prominently, Simulated — deterministic rules; no LLM call. It reads the stored member fields, the derived state, the activity history, the preferred documented spaces, the owner, and the next action. It then shows the recommendation, the rationale, the exact evidence used, and human checks. In this case, it recommends a permission-based re-entry prompt connected to a documented space, because the activity is cooling. The suggestion is editable and copyable, but there is no send control. I would edit it for tone, verify the space is still appropriate, and decide whether doing nothing is better.",
  "Human judgment can override the recommendation in either direction. If Emery has asked not to be contacted, I would stop even though the rules produce a prompt. If the old comment is not actually useful context, I would remove that inference. If a genuinely new, relevant public or member-led signal appears later, I can document it and reconsider after a respectful pause. The state is a planning aid, not a verdict about the person.",
  "The separate commercial-signal panel is intentionally outside this logic. In the demo, a possible signal is human-entered and marked review-required. It is not used in the state calculator, it is not visible to the simulated recommendation, and it is never treated as buying intent. A community interaction is an interaction, not a sales lead. Any review needs a human, a reason, and an audit trail in a future shared system.",
  "The most important current limitation is storage. This prototype uses localStorage, so the data lives only in one browser. It is not shared across community managers, does not connect to Friends of Finance, and has no authentication, permissions, or durable audit history. A reset restores the fictional seed in that browser, but it is not a production recovery plan.",
  "The next improvement I would prioritize is authenticated shared storage with audit history, role-based access, and carefully consented platform integration. That would make ownership and history reliable without inventing activity or silently importing private data. Until then, the safe operating model is to use this as a transparent demo: record only documented interactions, keep the state rules visible, separate human commercial review, and let a person make the final decision.",
  "That is the handoff: the CRM helps a manager decide what deserves attention, explains why, and makes it easy to choose pause when the evidence is weak.",
]

export const taskFourScript = {
  title: 'Task 4: a calm, evidence-led CRM handoff',
  targetDuration: '4:30–4:50',
  wordCount: 620,
  memberId: 'm11',
  memberLabel: 'Emery Stone - fictional Assistant Controller at Maple Current Studio (fictional)',
  script: scriptParagraphs.join('\n\n'),
}

export const recordingChecklist = [
  'Turn off private notifications and close unrelated tabs.',
  'Use a clean browser window with no credentials, tokens, bookmarks, or personal data visible.',
  'Open the public CRM URL and reset demo data before recording.',
  'Rehearse the Emery Stone At-risk flow: open the member, inspect evidence, edit or decline the suggestion, and show the separate commercial signal.',
  'Keep the recording between 4:30 and 4:50 and below five minutes.',
  'Upload with anyone-with-the-link viewing and no download/access request.',
  'Verify anonymous playback in a private window.',
  'Place the public video URL in the assessment submission and replace the placeholder in HANDOFF.md when convenient.',
]
