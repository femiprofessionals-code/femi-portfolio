# Decision log

Newest last. Each entry records the decision, why it was made and what would reverse it. "D-nn" refers to [discrepancies.md](discrepancies.md).

| # | Date | Stage | Decision | Reason | Reverse if |
|---|---|---|---|---|---|
| DL-01 | 2026-10-14 | 1 | Use repo `main` @182768d as a proxy for femifalade.com | The live host is denied by this session's network policy, and the public fetcher can't resolve it | The live pages become readable → re-diff every M: row |
| DL-02 | 2026-10-14 | 1 | Proceed without `content-source.json`, `AGENTS.md` or `mockups.html` | None exists in the repo, the uploads or on disk | The pack is supplied → reconcile against it |
| DL-03 | 2026-10-14 | 1 | Withhold "$580M" from all draft copy and mockups | Three incompatible meanings (D-07) | Femi confirms the wording and that it's public |
| DL-04 | 2026-10-14 | 2 | Nav = the website's **About · Work · Services · Contact**, with the **FF wordmark as Home**, plus a visible **Résumé** link next to Contact | The brief says preserve navigation *and* make Work/Résumé/Contact clear. The website nav has no Résumé, so it's added rather than any item removed. "Experience" from the branch is not a top-nav item; company views open from the frames and Work. | Femi prefers the spec nav (D-19) |
| DL-05 | 2026-10-14 | 2 | Restore Services with the four existing tabs and their real offerings; keep Calendly as a secondary contact channel | Clients are an audience; the branch retired both (D-20) | Femi drops client services |
| DL-06 | 2026-10-14 | 2 | Frames use the **pre-painting boards** with official marks (commit 7c75688). The supplied Carlyle painting is not placed in any frame. | No generated substitute marks; the painting is a separate art asset (D-22) | Femi approves a placement for the painting as artwork |
| DL-07 | 2026-10-14 | 2 | Titles and dates show website values, marked ⚑ in design-review annotations | Preserve website dates as attributed draft data (D-01 to D-04) | Résumé/source of truth supplied |
| DL-08 | 2026-10-14 | 2 | Detailed case-study mockup = **Claude AI Workflow Deployment (Goldman Sachs)** | Fully website-documented, consistent across all sources (60 users / 60%), no restricted detail. Fields the website doesn't document (e.g. the challenge) are left visibly empty, not written. | Femi picks another brief with documented detail |
| DL-09 | 2026-10-14 | 2 | About shows career narrative and portrait only; the interests slot is **marked missing in review annotations only** | No user-approved interests; Travel is unlinked and unreconciled (D-12) | Femi supplies interests |
| DL-10 | 2026-10-14 | 2 | Exclude ventures, special projects and spec-only briefs from all mockups | D-15, D-17, D-18 | Femi clears them for public display |
| DL-11 | 2026-10-14 | 2 | Mockups are static HTML under `docs/mockups/` with PNG exports; no app code, motion, backend or deploy changes | Stage scope | — |
| DL-12 | 2026-10-14 | 2 | Home room = the static **morning** still. The golden/night stills are programmatic relights and the motion clips are Femi's AI-generated videos; neither is used in mockups. | Static stage; correct labelling of programmatic vs AI media | — |
| DL-13 | 2026-10-14 | 2 | Contact form is shown as on the website, annotated "no backend — messages are not sent" | D-16; backend changes are out of scope | Form endpoint decided |
