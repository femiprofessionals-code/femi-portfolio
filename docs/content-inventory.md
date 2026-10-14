# Content inventory — Stage 1

Prepared 14 Oct 2026. This is a sourced inventory only; nothing here is approved display copy.
Conflicts are flagged, not merged: see [discrepancies.md](discrepancies.md). Decisions: [decision-log.md](decision-log.md). Files: [asset-manifest.md](asset-manifest.md).

## Source status — read this first

| Source | Status | Used as |
|---|---|---|
| Live site — `https://www.femifalade.com/`, `/about`, `/work`, `/services`, `/contact` | **NOT FETCHED.** The session's network policy denies the host (gateway 403 on CONNECT), and the public fetcher returned `ENOTFOUND` for both `www.femifalade.com` and `femifalade.com`. | — |
| Repo `main` @ [`182768d`](https://github.com/femiprofessionals-code/femi-portfolio/tree/182768df8dd86d359301ba8e5c2f58e8401c029c) (last commit 7 May 2026, "Logo badge for visibility…") | Read in full | **Proxy for the live site.** Assumed to be what femifalade.com serves; **unverified** until the live pages can be read. |
| Redesign branch `claude/dazzling-mayer-dsymdu` @ [`9977c81`](https://github.com/femiprofessionals-code/femi-portfolio/tree/9977c81d04fbad3f630c28003a939d78ad0e0090) | Read; routes tested locally | Current preview. Content mostly derived from the spec PDF, **not** from the website. |
| `Femi_Website_Redesign_Spec.pdf` (uploaded; two identical copies, md5 `1a5572b4…`) | Read | A second source. It cites a "résumé source of truth" that has not been provided. |
| `Femi_Website_Visual_Spec.pdf` (uploaded; two identical copies, md5 `036c63fa…`) | Read | Design reference only |
| `content-source.json` | **Not provided.** Not in any branch, upload or file on disk. | — |
| `AGENTS.md` | **Not in this repo.** The only AGENTS.md on disk belongs to the unrelated Amtrak-Price-Watch repo. | — |
| Résumé PDF | **None exists** in any branch or upload | — |

Shorthand below:
- **M:** = `https://github.com/femiprofessionals-code/femi-portfolio/blob/182768df8dd86d359301ba8e5c2f58e8401c029c/`
- **B:** = `…/blob/9977c81d04fbad3f630c28003a939d78ad0e0090/`
- **Spec p.N** = Redesign Spec page N

When the live site becomes readable, every row marked M: must be re-checked against the matching live URL.

---

## 1. Routes and features

### Website (main) — intended live URLs
| Live URL (unverified) | Source file | In nav? | Features |
|---|---|---|---|
| https://www.femifalade.com/ | M:src/app/page.tsx | Home | Video hero (`/videos/hero.mp4`, poster), auto-scrolling credential ticker, 4 metrics, 3 work cards, "Special Projects — Currently in stealth" + Request access, CTA |
| https://www.femifalade.com/about | M:src/app/about/page.tsx | About | Hero statement, 5 stats, headshot + 5-paragraph story, 4 operating principles, career timeline, CTA |
| https://www.femifalade.com/work | M:src/app/work/page.tsx | Work | Filter tabs (All / AI and Technology / Regulatory / Finance / Operations), 6 project cards |
| https://www.femifalade.com/services | M:src/app/services/page.tsx | Services | **4 service tabs** (Regulatory / Transformation / AI and Tooling / Advisory), each with headline, description, proof line and 8 offerings; CTA |
| https://www.femifalade.com/contact | M:src/app/contact/page.tsx | Contact | Email, Calendly, "Best for" list, **contact form (no backend — see D-16)**, 3 FAQs |
| https://www.femifalade.com/special-projects | M:src/app/special-projects/page.tsx | not in nav | 3 ventures "In Development" |
| https://www.femifalade.com/special-projects/case-studies | M:src/app/special-projects/case-studies/page.tsx | not in nav | Client-side access-code gate (**insecure — see D-18**) |
| https://www.femifalade.com/travel | M:src/app/travel/page.tsx | not in nav | Travel page, countries by region, Globe component |

Navigation (M:src/components/Nav.tsx#L9-L13): **Home · About · Work · Services · Contact**. There is also a "Contact" button, and the mobile menu shows `femi@femifalade.com` (L254).

Footer (M:src/components/Footer.tsx#L38-L61) has three columns:
- **Location:** "Femi Falade", "New York, NY · [live clock] EST", email, "Book a call".
- **Navigate:** Home / About / Work / Services / Contact.
- **Connect:** LinkedIn / Calendly / Email.

Metadata (M:src/app/layout.tsx#L20-L21):
- title "Femi Falade"
- description "Transformation and operations leader. Six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price."

### Redesign branch — tested locally on `next start`, 14 Oct 2026
| Route | HTTP | Note |
|---|---|---|
| `/` | 200 | Gallery-room homepage |
| `/work`, `/work/[slug]` (6 slugs) | 200 | Spec briefs |
| `/experience` | 200 | New route |
| `/about` | 200 | |
| `/contact` | 200 | mailto + LinkedIn; Calendly removed |
| `/resume` | 200 | HTML print page assembled from site content — **not an original résumé** (D-14) |
| `/ventures` | 200 | Unlinked |
| `/services` | 307 → `/contact` | **Retired**, which conflicts with the current brief (D-20) |
| `/travel` | 307 → `/about` | Retired |
| `/special-projects`, `/special-projects/case-studies` | 307 → `/ventures` | Retired |

Branch nav (B:src/components/Nav.tsx#L8-L13): **Work · Experience · About · Resume** + Contact, plus a time-of-day selector. This differs from the website nav (D-19).

## 2. Contact targets (exact)
| Channel | Exact target | Where | Verified live? |
|---|---|---|---|
| Email | `mailto:femi@femifalade.com` | M:src/app/contact/page.tsx#L61, M:src/components/Footer.tsx#L41, M:src/components/Nav.tsx#L254 | No |
| LinkedIn | `https://www.linkedin.com/in/femi-falade` | M:src/components/Footer.tsx#L59 | No |
| Calendly | `https://calendly.com/femijfalade/femi` | M:src/app/contact/page.tsx#L65, #L102, #L139; M:src/components/Footer.tsx#L42, #L60 | No |
| Résumé download | **None found.** No PDF in either branch or in the uploads, and no résumé link on main. | — | — |

Location: "New York, NY" (Footer L40) and "New York, US" (Contact L58).

## 3. Positioning and introduction (website wording, attributed draft)
| Item | Exact text | Source |
|---|---|---|
| Hero eyebrow | "Goldman Sachs · Global Banking and Markets · New York" | M:src/components/VideoHero.tsx#L122 |
| Hero H1 | "I build and ship operational programs. *Six years.* Three institutions. Real deliverables." | M:src/components/VideoHero.tsx#L136-L138 |
| Hero sub | "Goldman Sachs. The Carlyle Group. T. Rowe Price. CFTC frameworks delivered in 30 days. A $580M entity migration. An AI workflow tool deployed to 60 team members. Three platforms in development." | M:src/components/VideoHero.tsx#L151 |
| About H1 | "I build operational systems. I ship programs that scale. I do this inside institutions that move markets." | M:src/app/about/page.tsx#L63 |
| About intro | "Six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Three AI-native platforms in development. Goldman-caliber operational discipline applied to transformation programs that actually ship." | M:src/app/about/page.tsx#L68 |
| Home CTA | "Bringing operational discipline to the work that ships. *Let us build what is next.*" / "Goldman-caliber rigor applied to transformation programs that ship on time and at scale." | M:src/app/page.tsx#L157-L161 |

The brief's central positioning, **Strategic Transformation**, matches the website's "Transformation" service tab (M:src/app/services/page.tsx#L18-L23). The branch's three-part line "Private Markets · Product Strategy · Strategic Transformation" (B:src/content/site.ts#L14) comes from the spec, not the website.

## 4. Roles and dates — website draft data (attributed; not reconciled)
| Company | Website dates | Website title | Website summary | Source |
|---|---|---|---|---|
| Goldman Sachs | "Nov 2023 — Present"; "2023 to Present" on home | "Senior Associate, Global Banking and Markets Transformation"; contact page: "Senior Associate · Global Banking and Markets" | "Leading enterprise-scale transformation inside Global Banking and Markets. CFTC regulatory frameworks delivered in 30 days. A $580M entity migration across 31 trading desks. A Claude-based AI workflow tool deployed to 60 team members. Review cycles cut by 60 percent." | M:src/app/about/page.tsx#L10, M:src/app/page.tsx#L32, M:src/app/contact/page.tsx#L60 |
| The Carlyle Group | "Jun 2021 — Nov 2023"; "2021 to 2023" | "Associate, EMEA Fund Operations" | "Built Salesforce CRM for all EMEA private equity funds from scratch. Redesigned investor onboarding adopted as the global standard. Operated across approximately 27 annual transactions." | M:src/app/about/page.tsx#L11, M:src/app/page.tsx#L33 |
| T. Rowe Price | "Oct 2019 — Jun 2021"; "2019 to 2021" | "Analyst, Central Operations" | "Foundation in institutional operations. Trade settlement, position reconciliation, and operational coordination across global investment platforms. The discipline that underpins every role since." | M:src/app/about/page.tsx#L12, M:src/app/page.tsx#L34 |
| Morgan State University | "Aug 2016 — May 2020" | "B.S. Finance" | "Capital markets, financial theory, and quantitative analysis. The foundation for institutional finance." | M:src/app/about/page.tsx#L13 |

The spec and the redesign branch disagree on four of these titles/dates. See D-01 to D-05.

## 5. Metrics and claims (website)
| Claim | Website wording | Source | Display status |
|---|---|---|---|
| Tenure | "6+ / Years in institutional finance" | M:src/app/page.tsx#L25, about L75 | Flagged (D-06) |
| **$580M** | "Entity migration managed" (home); "Migration managed" (about); "Assets migrated" (work); "Led a $580M entity migration across 31 trading desks" | M:src/app/page.tsx#L26, M:src/app/about/page.tsx#L75, M:src/app/work/page.tsx#L20-L22 | **OMIT from draft display until clarified (D-07)** |
| 60% | "Review cycle reduction"; "Faster review cycles" | M:src/app/page.tsx#L27, M:src/app/work/page.tsx#L14-L15 | Draft OK |
| 30 days | "CFTC framework delivered / 10 departments"; work page says "in under 30 days" | M:src/app/page.tsx#L28, M:src/app/work/page.tsx#L29 | Draft; wording varies (D-10) |
| 60 users | "deployed to 60 team members" | M:src/app/work/page.tsx#L15 | Draft OK |
| 27 | "Annual transactions" (Carlyle) | M:src/app/about/page.tsx#L75, M:src/app/work/page.tsx#L42-L43 | Conflicts with the spec's "342 investors" (D-09) |
| 3 | "AI platforms building" | M:src/app/about/page.tsx#L75 | Restricted / secondary (D-17) |
| Ticker | Goldman Sachs; $580M Migration; CFTC Framework; 60% Reduction; Carlyle Group; Claude AI Deploy; T. Rowe Price; 31 Trading Desks; Salesforce CRM; 27 Transactions | M:src/app/page.tsx#L10-L21 | Contains $580M; omit that item |

Branch-only metrics, sourced from the spec and not on the website:
- "$13B+ private-equity AUM supported"
- "600+ clients in global cross-asset migration"
- "$580M annualized funding-cost savings enabled"

Source: B:src/content/site.ts#L47-L50. See D-07 and D-08.

## 6. Work (website — six programs)
Page header: "Career work, 2019 to Present" / "Programs that shipped." / "Six programs across Goldman Sachs, The Carlyle Group, and T. Rowe Price." (M:src/app/work/page.tsx#L98-L106)

| # | Company | Title | Period | Stat | Description (verbatim) | Source |
|---|---|---|---|---|---|---|
| 1 | Goldman Sachs | Claude AI Workflow Deployment | 2023 | 60% / Faster review cycles | "Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking and Markets. Restructured document review pipelines, cutting cycle times by 60 percent and eliminating a full category of manual processing." | M:src/app/work/page.tsx#L12-L16 |
| 2 | Goldman Sachs | $580M Entity Migration | 2024 | $580M / Assets migrated | "Led a $580M entity migration across 31 trading desks. Coordinated across legal, risk, technology, and operations. Zero disruption to active positions. Delivered on schedule across a compressed timeline." | M:…#L19-L23 — **$580M figure withheld from draft display (D-07)** |
| 3 | Goldman Sachs | CFTC Regulatory Governance Framework | 2024 | 30 Days | "Built a CFTC regulatory governance framework across 10 departments in under 30 days. Set precedent for compliance velocity inside Global Banking and Markets. Became the reference standard for subsequent regulatory programs." | M:…#L26-L30 |
| 4 | The Carlyle Group | Salesforce CRM, EMEA Funds | 2022 | Global / Standard adopted | "Built Salesforce CRM from scratch for all Carlyle EMEA private equity funds. Architected data models, automated investor workflows, and trained the team. Architecture subsequently adopted as the global standard across all fund families." | M:…#L33-L37 |
| 5 | The Carlyle Group | Investor Onboarding Redesign | 2022 | 27 / Annual transactions | "Redesigned investor onboarding across approximately 27 annual transactions. Eliminated redundant touchpoints. Built structured data-capture flows. Reduced time-to-close. Adopted as global standard across Carlyle fund families." | M:…#L40-L44 |
| 6 | T. Rowe Price | Central Operations Foundation | 2019-2021 | 6+ / Years foundation | "Trade settlement, position reconciliation, and operational coordination across global investment platforms. Built the analytical and operational rigor that underpins every program since." | M:…#L47-L51 |

Spec-only briefs, shown on the branch at `/work/[slug]`:
1. Pre-Trade Initial Margin Calculator
2. ICE Clear Credit Onboarding
3. Enterprise Inter-Affiliate Clearing
4. Kaizen Post-Investment Integration
5. EMEA PE Investor Experience
6. €1.25B NAV Facility

Sources: Spec pp.15-20; B:src/content/site.ts#L79-L270. These name counterparties, transactions and internal figures that the website never published. They need a public-disclosure check before any display (D-15).

## 7. Services (website — four tabs, exact)
Header (M:src/app/services/page.tsx#L50-L58): "What I do" / "The skills to shape what is next." / "Regulatory, transformation, AI tooling, and strategic advisory. Built on real institutional experience."

| Tab | Headline | Description (verbatim) | Proof line | Offerings |
|---|---|---|---|---|
| Regulatory (L10-L16) | "Compliance delivered at velocity." | "Built on the experience of delivering a CFTC governance framework across 10 departments in 30 days at Goldman Sachs. Regulatory strategy, gap analysis, and framework design without the usual six-month timeline." | "CFTC framework. 10 departments. 30 days. Goldman Sachs." | Regulatory gap analysis · Governance framework design · CFTC and SEC compliance architecture · Risk and controls documentation · Cross-department coordination · Regulatory reporting design · Audit trail infrastructure · Policy and procedure build |
| Transformation (L17-L23) | "Enterprise programs that ship." | "Led a $580M entity migration across 31 trading desks at Goldman Sachs. Redesigned Carlyle investor onboarding adopted globally. Complex, multi-stakeholder programs delivered on time without disrupting live operations." **(contains $580M — withhold)** | "$580M migration. 31 trading desks. Goldman Sachs." **(withhold)** | Program architecture and governance · Entity migration management · Cross-functional stakeholder coordination · Investor relations redesign · Operating model transformation · Change management and adoption · Post-launch optimization · Institutional documentation |
| AI and Tooling (L24-L30) | "AI as infrastructure, not decoration." | "Deployed a Claude-based AI workflow tool to 60 team members at Goldman Sachs. Cut review-cycle times by 60 percent. Built Salesforce CRM from scratch for all Carlyle EMEA funds. Technology that goes live, gets used daily, and creates measurable outcomes." | "60% review reduction. 60 users. Claude deployment. GBM." | AI workflow tool design and deployment · CRM architecture and build · Process automation design · Tool evaluation and selection · User training and change management · Systems integration · Data architecture · Performance monitoring setup |
| Advisory (L31-L37) | "Strategic clarity before execution." | "Drawing on six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Asset management, private equity, and investment banking. Advisory engagements focused on strategy, operating model design, and organizational structure." | "Goldman Sachs. Carlyle Group. T. Rowe Price. Six years." | Operating model design · Organizational structure review · Business case development · Stakeholder alignment facilitation · Executive reporting frameworks · Investment operations advisory · Program diagnostic and audit · Strategic roadmap development |

Services CTA (L95-L101): "Ready to bring this expertise to your team?" / "A 30-day sprint or a multi-year transformation. Let us scope the right engagement." / "Start a conversation".

## 8. Contact page (website, exact)
- Header (M:src/app/contact/page.tsx#L42-L50): "Get in touch" / "Work with me" / "Let us talk about your next chapter."
- Card (L58-L69): "New York, US" · "Femi Falade" · "Senior Associate · Global Banking and Markets" · femi@femifalade.com · "Book a Calendly call".
- "Best for" (L74-L80):
  - Regulatory delivery — CFTC, SEC, and governance frameworks
  - AI deployment — Workflow tools for financial operations teams
  - Transformation — Multi-stakeholder enterprise programs
  - Systems builds — CRM, data architecture, and integrations
  - Strategic advisory — Operating model and organizational design
- Form (L110-L140), fields:
  - Name ("Your name")
  - Email ("your@email.com")
  - "What are you looking for?" select, with options Transformation programme / Regulatory framework delivery / AI tooling deployment / CRM or systems build / Strategic advisory / Speaking opportunity / Other
  - Message ("Tell me about your challenge or opportunity. The more specific, the better.")
  - "Send message" button, plus "or book a call"
- **The form has no backend** (D-16). Its success copy (L98-L100): "Message sent." / "I respond to every message personally within two business days…"
- FAQs (L18-L22):
  - consulting alongside the primary role
  - sectors
  - response time

## 9. About / personal content
- Story paragraphs 1–4 (careers) are usable draft text: M:src/app/about/page.tsx#L153-L156. They contain "$580M", which is withheld.
- Paragraph 5 describes the three ventures (L157). It is restricted/secondary (D-17).
- Operating principles (L16-L21): "Precision over polish." · "Speed with rigor." · "Build to hand off." · "AI as infrastructure." (with bodies).
- **Portrait: available.**
  - `public/images/femi-headshot.jpg` (1066×1600) is on main and used on About.
  - `femi-portrait.webp` (1066×1600) is a branch copy.
  - `femi-headshot 1.jpg` (600×800) is unused.
  - No request to the user is needed.
- **Interests: only one candidate exists**, the unlinked Travel page:
  - "30+ countries · 60+ cities" / "The world, in motion." / "DC to Lagos. London to Tokyo. The map keeps growing."
  - Lists 26 countries across 5 regions.
  - Source: M:src/app/travel/page.tsx#L8-L30.
  - It is unlinked, its counts don't reconcile (D-12), and it has not been user-approved as About content. **Interests are therefore treated as unavailable; asking the user.**

## 10. Restricted / secondary content (inventoried, not for display)
The special-projects ventures and their gated case studies (M:src/app/special-projects/…) are inventoried by **title only**: AI Hiring Platform, Renter Matching, Freelance Infrastructure. Their gated details are not reproduced here (D-18).
