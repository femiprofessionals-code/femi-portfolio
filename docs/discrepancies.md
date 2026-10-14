# Discrepancies — Stage 1

Each entry records the conflicting sources side by side. **Nothing here has been silently resolved.**
- The website value (main) is kept as *attributed draft data* unless the entry says to withhold it.
- "Spec" means `Femi_Website_Redesign_Spec.pdf`, which cites a résumé that has not been provided.

Shorthand:
- **M:** = `https://github.com/femiprofessionals-code/femi-portfolio/blob/182768df8dd86d359301ba8e5c2f58e8401c029c/`
- **B:** = `…/blob/9977c81d04fbad3f630c28003a939d78ad0e0090/` (redesign branch)

Live-site URLs are listed where the item would appear. **None could be fetched** (network policy denial), so every "website" value is from main and still needs live confirmation.

Severity:
- 🔴 **blocks display**
- 🟠 **needs Femi's decision**
- 🟡 **minor / wording**

## Roles, titles and dates

**D-01 🟠 Carlyle title**
- Website: "Associate, EMEA Fund Operations" (https://www.femifalade.com/about; M:src/app/about/page.tsx#L11).
- Spec p.4 / p.21: "Fund Coordinator, EMEA Private Equity Fund Management (promoted from Fund Assistant, 2022)". The spec says the website title "does not match the résumé source of truth".
- Branch B:src/content/site.ts#L295 already uses the spec title.
- → Draft shows the **website title, attributed**, until Femi confirms.

**D-02 🟠 T. Rowe Price title**
- Website: "Analyst, Central Operations" (M:src/app/about/page.tsx#L12).
- Spec p.4 / p.21 and branch B:src/content/site.ts#L305: "Central Operations Associate".
- → Website title shown, flagged.

**D-03 🟠 Carlyle start date**
- Website: "Jun 2021" (M:src/app/about/page.tsx#L11).
- Spec p.21 and branch B:src/content/site.ts#L297: "May 2021".

**D-04 🟠 T. Rowe Price end date**
- Website: "Jun 2021" (M:src/app/about/page.tsx#L12).
- Spec p.21 and branch B:src/content/site.ts#L307: "May 2021".
- Both sources are internally consistent: the T. Rowe end matches the Carlyle start in each.

**D-05 🟡 Education overlaps first role**
- Website: Morgan State "Aug 2016 — May 2020" (M:src/app/about/page.tsx#L13). T. Rowe Price starts "Oct 2019" (L12), so they overlap by 7 months.
- Possibly accurate (working while finishing the degree), but it should be confirmed.
- Spec p.21 lists the degree as "B.S. Finance, Minor in Economics" with PMP and BMC credentials. **None of these extras appear on the website.**

**D-06 🟡 "6+ years" is stale**
- Website: "6+ Years in institutional finance" (M:src/app/page.tsx#L25; about L75) and "Six years" in the hero (M:src/components/VideoHero.tsx#L137) and metadata (M:src/app/layout.tsx#L21).
- The website's own dates (Oct 2019 → present) give 7 years in Oct 2026.
- Spec p.4: use "7+ years" or omit.
- The Work page also misuses "6+ / Years foundation" as the T. Rowe Price stat (M:src/app/work/page.tsx#L49), but T. Rowe was ~1.7 years.

## Claims and metrics

**D-07 🔴 "$580M" — ambiguous; OMIT from draft display until clarified**
The same figure is described as three different things:
1. **What was moved:** "Entity migration managed" (M:src/app/page.tsx#L26), "Migration managed" (M:src/app/about/page.tsx#L75), "Assets migrated" (M:src/app/work/page.tsx#L20), "Led a $580M entity migration across 31 trading desks" (M:src/app/work/page.tsx#L22; Services M:src/app/services/page.tsx#L20-L21; hero M:src/components/VideoHero.tsx#L151; ticker M:src/app/page.tsx#L12).
2. **An annual saving:** Spec p.4: "your résumé identifies it as annualized funding-cost savings enabled by an enterprise implementation". Spec p.17: "Approximately $580M in annualized funding-cost savings".
3. **The scope base differs as well:** "31 trading desks" (website) vs "31 business units and 38 departments" (Spec p.12, p.17).

Branch B:src/content/site.ts#L47 and #L155 already display the spec version.
- → **Withhold the number from all draft copy and mockups.** The program itself can be named ("entity migration / clearing implementation, Goldman Sachs") without a figure.
- **Needs:** which statement is correct, and whether it can be public at all.

**D-08 🟠 Branch shows metrics the website never published**
- "$13B+ private-equity AUM supported" and "600+ clients in global cross-asset migration" (B:src/content/site.ts#L48-L49). Source: Spec p.11 / p.21.
- Not on the website. Treated as **unverified** and not used in mockups.

**D-09 🟠 Carlyle onboarding scale**
- Website: "approximately 27 annual transactions" (M:src/app/work/page.tsx#L42-L43; about L154).
- Spec p.19 and branch B:src/content/site.ts#L217-L219: "342 investors annually; cycle reduced 33%; first-pass approvals improved 27%".
- "27 transactions" vs "27% approvals" may be a transcription mix-up. Needs Femi.

**D-10 🟡 CFTC timing wording**
- "in 30 days" (M:src/app/page.tsx#L28; services L13) vs "in under 30 days" (M:src/app/work/page.tsx#L29).

**D-11 🟠 What was "adopted as the global standard" at Carlyle?**
- The CRM: "Architecture subsequently adopted as the global standard across all fund families" (M:src/app/work/page.tsx#L36).
- Onboarding: "Redesigned investor onboarding adopted as the global standard" (M:src/app/about/page.tsx#L11; home L33; work L43).
- Spec p.19 attributes the global standard to the onboarding playbook only.

**D-12 🟡 Travel counts don't reconcile**
- "30+ countries · 60+ cities" (M:src/app/travel/page.tsx#L22) vs 26 countries listed (L8-L12).
- The page is also unlinked from nav and footer.

**D-13 🟡 Goldman title wording**
- "Senior Associate, Global Banking and Markets Transformation" (about L10) vs "Senior Associate · Global Banking and Markets" (contact L60).
- The spec uses "&" ("Global Banking & Markets Transformation").

## Résumé

**D-14 🔴 No résumé file exists**
- There is no PDF in main, the branch or the uploads, and main has no résumé link.
- The branch `/resume` (B:src/app/resume/page.tsx) is an HTML page I assembled from site content. **It is not Femi's résumé and should not be presented as one.**
- Spec p.23 expects `Femi_Falade_Resume.pdf`.
- → No placeholder link is created. Mockups show the Résumé entry with a review annotation "target unresolved".
- **Needs: the actual PDF.**

## Restricted / confidential

**D-15 🔴 Spec briefs name counterparties and internal figures**
- They cover ICE Clear Credit onboarding ("~$40M annual funding-cost savings"), the Kaizen post-investment integration ("$1.8M platform"), the Carlyle Europe Partners V "€1.25B NAV facility", the pre-trade IM calculator and inter-affiliate clearing.
- Sources: Spec pp.15-20, published on the **public** branch at B:src/content/site.ts#L79-L270.
- None of this appears on the website.
- → Not used in mockups. **Needs a public-disclosure check with Femi** (employer/confidentiality).

**D-16 🔴 Contact form has no backend**
- `send()` only sets local state (M:src/app/contact/page.tsx#L34). Nothing is transmitted, yet the page shows "Message sent." and promises a reply within two business days (L98-L100).
- Visitors' messages are silently lost.
- → Mockups show the form with an annotation. Fixing it is a backend change, out of scope for this stage.

**D-17 🟠 Ventures surface in the primary narrative**
- "Three platforms in development" (hero M:src/components/VideoHero.tsx#L151), "Currently in stealth" (M:src/app/page.tsx#L125-L128), "3 AI platforms building" (about L75) and About paragraph 5 (L157).
- Spec p.24 recommends keeping ventures off primary pages.
- → Excluded from mockups.

**D-18 🔴 "Restricted" case studies are publicly readable**
- The access-code gate is client-side.
- The code is a constant in M:src/app/special-projects/case-studies/page.tsx#L9, and the full gated text sits in the same file.
- The repo `femiprofessionals-code/femi-portfolio` is **public**, so anyone can read both on GitHub and in git history. The deployed JS bundle also contains them.
- Content not reproduced here.
- **Recommend:**
  - treat that content as already exposed;
  - change the code wherever else it's used;
  - remove the content from the repo and its history if it must stay private.

## Navigation and scope

**D-19 🟠 Navigation differs between website, spec and branch**
- Website: Home · About · Work · Services · Contact (M:src/components/Nav.tsx#L9-L13).
- Spec p.9 / p.10: Work · Experience · About · Resume · Contact.
- Branch: Work · Experience · About · Resume + Contact (B:src/components/Nav.tsx#L8-L13).
- The current brief says *preserve navigation* and *show Work/Résumé/Contact clearly*. See decision-log DL-04.

**D-20 🟠 Services and Calendly**
- The branch retires `/services` (307 → `/contact`, B:src/app/services/page.tsx#L5) and drops Calendly.
- The spec p.23 calls "Book a call" consulting-sales energy.
- The current brief includes clients and asks for Services with existing categories.
- → Mockups restore Services and keep Calendly as a secondary channel. See DL-05.

**D-21 🟡 Consulting FAQ**
- "Yes. I take on select engagements…" (M:src/app/contact/page.tsx#L19).
- This may raise employer-policy questions while the Goldman role is current. Femi should confirm it's OK to publish.

## Assets

**D-22 🔴 Current homepage boards contain generated substitute marks**
- The GS and T. Rowe Price boards on the branch (`public/room/v4/boards/*-gs.webp`, `*-trowe.webp`, since commit e1b7ac7) are oil-paint re-renderings I generated. That breaks the "no substitute brand marks" rule.
- The Carlyle board currently shows the **supplied painting** in place of the official logo. Per the brief, that painting is a separate artistic asset.
- → Mockups use the **pre-painting boards** (official marks, commit 7c75688), extracted to `docs/assets/extracted/boards-pre-painting/`. See asset-manifest.

**D-23 🟠 Goldman Sachs mark provenance**
- `public/logos/gs.svg` is not an official download.
- I composed it from the community *simple-icons* `goldmansachs` path (npm package), on a `#7399C6` square.
- The Carlyle and T. Rowe Price files were supplied by Femi in chat.
- **Needs an official GS asset or approval** of this reproduction.

**D-24 🟡 Main's website shows no company logos**
- The work cards use initials only (M:src/app/page.tsx#L41-L50).
- Earlier, Femi said "the earlier website has the logos". If so, **the live site may differ from `main`** — one more reason to verify the live pages.
