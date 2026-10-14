# Mockup content assignment — Stage 2

These are static mockups. Open `docs/mockups/index.html` to see every screenshot, or open each page directly.
- **Regenerate:** `python3 docs/mockups/_build.py`
- **Screenshots:** `docs/mockups/screens/`, at 1440×900 and 390×844 full page, plus Home at 1024×768 and first-screen crops
- **No motion, no scripts, no backend.** Yellow notes are design-review annotations only.

Every string below is website wording, from repo `main` @182768d, which the pack's `content-source.json` (retrieved 14 Oct 2026) corroborates. The exceptions are marked *pack* (the pack's proposed synthesis) or *new UI label*. "M:" line refs are listed in [../content-inventory.md](../content-inventory.md).

## Global (every page)
| Slot | Content | Source |
|---|---|---|
| Nav | FF wordmark (→ Home) · About · Work · Services · Contact · **Résumé** | Website nav M:Nav.tsx#L9-13. Résumé added per brief (DL-04); it is **inert**, with no href, because no PDF exists (D-14). |
| Footer | Location: Femi Falade, New York, NY, femi@femifalade.com · Navigate: Home/About/Work/Services/Contact · Connect: LinkedIn, Calendly, Email, Résumé (inert) | M:Footer.tsx#L38-61 |

## Home — `home.html` (+ `home-existing-room.html` for comparison)
| Slot | Content | Source |
|---|---|---|
| Background | Desktop: the pack concept `room-master-morning.png`, with rug, tree and sofa all in view. Comparison page: the existing room. | Pack asset (sha256 `cf276d3e…`); replacement **not yet approved** (DL-14) |
| Frames (L→R) | T. Rowe Price, The Carlyle Group, Goldman Sachs: official marks set into the concept's mat openings | `public/logos/*` (DL-06; GS provenance D-23) |
| Above frames | "Strategic Transformation" / "Femi Falade" / "Transformation, financial operations, and AI-enabled workflows across institutional finance." | Positioning is user-selected (pack). The sentence is the pack's *proposed synthesis* and needs approval. |
| Captions below frames | Company name + "Oct 2019 – Jun 2021" / "Jun 2021 – Nov 2023" / "Nov 2023 – Present"; each opens its company view | Website About timeline M:about#L10-12 (⚑ D-01–D-04) |
| Actions | View work · Résumé (inert) · Contact, in the nav and in a strip directly under the room | Brief; website "View work" label M:VideoHero |
| Mobile | Close crop of pictures and bench → identity → three company links (logo, name, dates) → three full-width actions | scene-layout.json `mobile_crop` |
| Not on Home | Ticker, metrics tiles, "Special Projects — Currently in stealth", hero sub-copy containing $580M | D-07, D-17, DL-10 |

## Work — `work.html`
| Slot | Content | Source |
|---|---|---|
| Head | "Career work, 2019 to Present" / "Programs that shipped." / "Six programs across Goldman Sachs, The Carlyle Group, and T. Rowe Price." | M:work#L98-106 |
| List | Six website programs grouped by company (newest first), each with its number, title, period, verbatim description and website stat | M:work#L10-53 |
| Changes | #2 title shortened to "Entity Migration" and its figure withheld (D-07). The #6 stat "6+ Years foundation" is omitted (D-06). Website filters are dropped (DL-15). | — |
| Not shown | Spec-only briefs (D-15), ventures (DL-10) | — |

## Case study — `case-study-claude-ai-workflow.html` (DL-08)
| Slot | Content | Source |
|---|---|---|
| Header | "Goldman Sachs · Global Banking and Markets · 2023" / "Claude AI Workflow Deployment" / facts: 60 team members · 60% faster · Global Banking and Markets | M:work#L12-16 |
| 01 Challenge | **Left empty:** "Not documented on femifalade.com." | — needs Femi |
| 02 Ownership | "Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking and Markets." | M:work#L15 |
| 03 Approach | "Restructured document review pipelines…". The second clause adapts a website principle and is flagged "confirm or cut". | M:work#L15; M:about#L20 |
| 04 Outcomes | 60% review-cycle reduction · a full category of manual processing eliminated · in use across 60 | M:work#L15; M:services#L27 |
| Quote | "AI as infrastructure. Not a demo. Not a pilot…" | M:about#L20 |

## Company view — `company-goldman-sachs.html` (template for all three)
| Slot | Content | Source |
|---|---|---|
| Back to room | "← Back to the room" (top and bottom) | new UI label |
| Identity | GS mark · "Goldman Sachs" · "Senior Associate, Global Banking and Markets Transformation" · "Nov 2023 – Present · New York" | M:about#L10; M:VideoHero#L122 |
| Scope | Website timeline body, with the $580M figure withheld | M:about#L10 |
| Projects | Claude AI Workflow Deployment (→ case study), Entity Migration, CFTC Regulatory Governance Framework | M:work |
| Excluded | Spec-only scope ($13B+, 600+ etc.) | D-08 |

## About — `about.html`
| Slot | Content | Source |
|---|---|---|
| Head | Website H1, plus the intro with the ventures sentence removed | M:about#L63, #L68 (D-06 flag on "Six years") |
| Story | Portrait (`femi-portrait.webp`) + website paragraphs 1–4. Paragraph 3's figure is withheld; paragraph 5 (ventures) is omitted. | M:about#L153-156 |
| Interests | **Review annotation only.** Nothing designed in. | D-12, DL-09 |
| Principles | Four website principles, verbatim | M:about#L16-21 |
| Timeline | Four website rows, with ⚑ flags | M:about#L9-14 |

## Services — `services.html`
| Slot | Content | Source |
|---|---|---|
| Head | "What I do" / "The skills to shape what is next." / website subline | M:services#L50-58 |
| Tabs | Regulatory · Transformation · AI and Tooling · Advisory, in website order. **Transformation is pre-selected** (DL-16). The other panels are shown expanded for review. | M:services#L9-37 |
| Panels | Each tab's verbatim headline, description, proof line and all 8 offerings. The Transformation description and proof line have the figure withheld. | M:services |
| CTA | "Ready to bring this expertise to your team?" / "A 30-day sprint…" / "Start a conversation" | M:services#L95-101 |

## Contact — `contact.html`
| Slot | Content | Source |
|---|---|---|
| Head | "Get in touch" / "Work with me" / "Let us talk about your next chapter." | M:contact#L42-50 |
| Channels | femi@femifalade.com · linkedin.com/in/femi-falade · Calendly "Book a Calendly call" (exact targets) | M:contact#L61-68; M:Footer#L59 |
| Best for | Five website items, verbatim | M:contact#L74-80 |
| Form | Name, Email, "What are you looking for?" (7 website options), Message, "Send message" / "or book a call". **Annotated: no backend** (D-16). | M:contact#L110-140 |
| FAQs | Three website FAQs, verbatim; consulting FAQ flagged D-21, response promise flagged D-16 | M:contact#L18-22 |

## Accessibility notes checked in the mockups
- At 390px there is no horizontal overflow on any page.
- Interactive targets are at least 44px, except inline text links.
- Services uses `role=tablist` with `aria-selected`; the room image has alt text; logo images inside labelled links have empty alt.
- Visible `:focus-visible` style throughout.
- No motion anywhere.
