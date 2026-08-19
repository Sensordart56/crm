# Friends of Finance Growth Squad Assessment

This is a static Vite + React + TypeScript submission hub and fictional community activity CRM. It has no backend, authentication, API keys, or live member data.

## Open-access submission

- Live site: https://crm-black-theta.vercel.app
- Task 1 research: https://crm-black-theta.vercel.app/task-1
- Task 2 invitation journey: https://crm-black-theta.vercel.app/task-2

## Routes

- `/` submission hub
- `/task-1` research and prioritisation
- `/task-2` invitation journey
- `/crm` overview and filters
- `/crm/members/:id` editable member detail, history, simulated next step, and separate commercial-signal review
- `/crm/follow-up`, `/crm/new`, `/crm/highly-active`, `/crm/risk`, `/crm/help`

## Local commands

```text
pnpm install
pnpm run lint
pnpm run test
pnpm run build
pnpm run dev
```

The CRM persists its versioned demo store under `fof-crm:v1` in browser-local storage. Use **Reset demo data** to restore the seeded fictional records.

## Safeguards

- Only six documented discussion spaces accept logged activities: Say Hello, Ask Finance Peers, Finance Workflows, Tools & Systems, Career & Compensation, and Water Cooler.
- Activity state is derived from dates and meaningful activity, not manually editable.
- The simulated next-step aid is deterministic, evidence-limited, editable, copyable, and never sends anything.
- Commercial signals are human-entered, visually separate, review-required, excluded from state and recommendation inputs, and never treated as buying intent.
- Browser-local storage is not a shared multi-user CRM.
