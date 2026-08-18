# Friends of Finance Assessment Handoff

This file is the working handoff for the non-video assessment deliverables. All CRM records and activity are fictional. Outreach content is simulated and must not be sent to real professionals.

## Submission links

- Task 1 public URL: `https://crm-black-theta.vercel.app/task-1` *(anonymous HTTP 200 verified)*
- Task 2 public URL: `https://crm-black-theta.vercel.app/task-2` *(anonymous HTTP 200 verified)*
- Task 3 live CRM URL: `https://crm-black-theta.vercel.app/crm` *(anonymous HTTP 200 verified)*
- Task 4 video: `[USER TO ADD AFTER RECORDING/UPLOAD]`
- Task 4 script URL: `https://crm-black-theta.vercel.app/task-4` *(anonymous HTTP 200 verified)*

## Status

- Task 1: research page complete; eight-person shortlist, scoring, sources, verification notes, priority invitee, and stop rule are included.
- Task 2: five-touch journey complete; situations A/B/C and simulated outreach boundaries are included.
- Task 3: fictional browser-local CRM complete; overview, focused views, search/filtering, add/update/log, state rules, follow-up, deterministic AI aid, and commercial-signal separation are included.
- Task 4 preparation: script and recording checklist complete; no recording or upload performed.

## Known source and service context

- Workspace: `C:\Users\ujjua\Downloads\VoloPay`
- GitHub repository: `https://github.com/Sensordart56/crm`
- Existing Vercel team: `Ujjual` / `ujjual` / `team_BxfzTkFmdMIYKzWpYMp3YxXO`
- Existing Vercel project: `crm` / `prj_w9ijYVAmRl7VHtP5sbv6ythBPuls`
- Source PDFs are intentionally ignored and will not be committed.
- Latest substantive production deployment: `dpl_71eKi4tphPjmN8mP1FeRtg1eLS7M` / `https://crm-8m8vji2q3-ujjual.vercel.app` (corrected seed coverage; `READY`)

## Checkpoint log

1. 2026-08-19 IST — Read the pasted execution brief; initialized an empty Git repository on `main`; added ignores for PDFs, temporary renders, dependencies, builds, Vercel metadata, environments, and secrets.
2. 2026-08-19 IST — Extracted and visually reviewed the three-page assignment PDF and twelve-page Friends of Finance orientation guide. The guide is authoritative for the community motto, tone, spaces, and documented member-interaction boundaries.
3. 2026-08-19 IST — Built the Vite/React/TypeScript submission, added 18 fictional CRM members across all five derived states, and kept all real-person research and all CRM records clearly separated from outreach execution.
4. 2026-08-19 IST — Local verification passed: TypeScript check, production build, and 9/9 automated tests. Browser QA passed all required routes plus search/filtering, add/reload/reset, activity logging and state recalculation, copyable editable suggestion, and commercial-signal separation. The desktop CRM layout was visually reviewed.
5. 2026-08-19 01:02 IST — Published `main` to the existing public repository `Sensordart56/crm`; commit `4ea6057` triggered the existing Vercel project and exposed the GitHub linkage.
6. 2026-08-19 01:07 IST — Fixed the Vercel build type error in `src/domain/csv.ts`; pushed commit `a7ca9ef`.
7. 2026-08-19 01:08 IST — Existing Vercel project deployed commit `a7ca9ef` to production as `dpl_8BGQ5EkQ7hmSHqfM5P83cv8dyq1U`; deployment is `READY` and the stable aliases are present.
8. 2026-08-19 01:16 IST — Re-ran local lint, tests, and production build: all passed; Vercel reports no runtime errors in the last 24 hours.
9. 2026-08-19 01:18 IST — Anonymous route checks returned HTTP 302 to Vercel SSO on the stable aliases. Read-only protection inspection confirms `ssoProtection.deploymentType = all_except_custom_domains`. Disabling SSO was attempted twice and rejected by the environment’s production access-control safety gate; no indirect bypass was used.
10. 2026-08-19 01:20 IST — The handoff commit `780b085` triggered the same existing GitHub-linked project; substantive production deployment `dpl_A82hf2ZVzTh2XyPboNu7QVRLiCrp` is `READY`, build errors are clear, and Vercel reports no runtime errors in the last 24 hours. The subsequent handoff-only commit `0e1e3f7` also produced a `READY` production deployment `dpl_9HnW7mUENp1fgxyNKzS4XnLsMFkD`.
11. 2026-08-19 01:52 IST — Rechecked every required production route on `crm-ujjual.vercel.app`: `/`, `/task-1`, `/task-2`, `/crm`, `/crm/follow-up`, `/crm/new`, `/crm/highly-active`, `/crm/risk`, `/crm/help`, and `/task-4` all returned `302 Found` to Vercel SSO. Direct route access therefore remains blocked.
12. 2026-08-19 IST — Corrected the fictional activity seed so all five derived CRM states are represented by at least three members; added CSV/ranked-source parity and state-coverage tests. The application code was pushed as commit `2077c24`, and production deployment `dpl_71eKi4tphPjmN8mP1FeRtg1eLS7M` is `READY`.
13. 2026-08-19 IST — Rechecked every required production route on `crm-ujjual.vercel.app`, including `/crm/members/m11`: all 11 routes returned `302 Found` to Vercel SSO after the corrected deployment. Anonymous route access on that alias remains blocked.
14. 2026-08-19 IST — Tested the existing project alias `crm-black-theta.vercel.app` directly without authentication: `/`, `/task-1`, `/task-2`, `/crm`, `/crm/members/m11`, `/crm/follow-up`, `/crm/new`, `/crm/highly-active`, `/crm/risk`, `/crm/help`, and `/task-4` all returned HTTP 200; the published JavaScript and CSS assets also returned HTTP 200. This alias is the verified anonymous submission host.

## Verification log

Local checks: PASS — `pnpm run lint`, `pnpm run test` (11/11), and `pnpm run build`. Added tests cover CSV rows aligned with the ranked source dataset and 18 fictional records with all five states represented. Prior local browser QA passed the required routes and CRM flows.

GitHub: PASS — public repository `https://github.com/Sensordart56/crm`, branch `main`, corrected application commit `2077c243b63ed7924917d133e42e9e5c47ad25f3` pushed to `main`. The handoff documentation update is included in the commit that contains this record; earlier deployment-evidence commits and the code-fix commit `a7ca9ef` remain in the same history.

Vercel: deployment PASS — existing project/team IDs match the authorized target; corrected application deployment `dpl_71eKi4tphPjmN8mP1FeRtg1eLS7M` is `READY`, build errors are clear, and the runtime-error scan is clear. Git connection PASS — the deployment was created from GitHub `main` commit `2077c243...`. Public anonymous access: PASS on `https://crm-black-theta.vercel.app`; all 11 required routes and the published JavaScript/CSS assets returned HTTP 200 without authentication. The other project aliases `crm-ujjual.vercel.app` and `crm-git-main-ujjual.vercel.app` remain SSO-protected and are not submission links.

### Vercel alias note

The existing project exposes multiple aliases with different protection behavior. Use only `crm-black-theta.vercel.app`, which is an existing alias of the authorized project and passed anonymous checks. No protection setting was changed, no duplicate project or custom domain was created, and no indirect bypass was used.

## User-only morning checklist (09:00–10:00 IST)

09:00–09:10: Open this file and test Task 1, Task 2, and CRM links in a private window.

09:10–09:20: Sanity-check the priority invitee, current-role claims, messages, and all source links; confirm outreach remains simulated.

09:20–09:28: Open `/task-4`, reset demo data, and rehearse the representative At-risk member flow.

09:28–09:42: Record one clean video under five minutes with notifications, bookmarks, credentials, tokens, and unrelated tabs hidden.

09:42–09:50: Upload with anyone-with-the-link viewing and verify anonymous playback in a private window.

09:50–09:55: Replace the Task 4 placeholder where convenient; the critical action is putting the real public video URL into the assessment submission.

09:55–10:00: Submit exactly four links: Task 1, Task 2, live CRM, and public video. Confirm submission.
