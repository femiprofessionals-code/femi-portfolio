/**
 * Canonical source of truth for every public title, date, metric and project fact.
 * The website, résumé and LinkedIn should all reconcile to the values in this file.
 * Do not edit copy inline in components — change it here.
 */

export const PERSON = {
  name: 'Femi Falade',
  location: 'New York, NY',
  email: 'femi@femifalade.com',
  linkedin: 'https://www.linkedin.com/in/femi-falade',
  url: 'https://www.femifalade.com',
  jobTitle: 'Senior Associate, Global Banking & Markets Transformation',
  positioning: ['Private Markets', 'Product Strategy', 'Strategic Transformation'],
  resumeFile: '/Femi_Falade_Resume.pdf',
  resumeUpdated: 'October 2026',
}

export const HERO = {
  eyebrow: 'Private Markets · Product Strategy · Strategic Transformation',
  headline: 'I lead complex work where capital, products and institutions meet.',
  body:
    'Across Goldman Sachs, The Carlyle Group and T. Rowe Price, I have led products and strategic transformations spanning private equity, credit markets, market infrastructure, regulation and applied AI.',
}

export type Institution = {
  key: 'gs' | 'carlyle' | 'trowe'
  name: string
  short: string
  division: string
}

export const INSTITUTIONS: Institution[] = [
  { key: 'gs', name: 'Goldman Sachs', short: 'Goldman Sachs', division: 'Global Banking & Markets' },
  { key: 'carlyle', name: 'The Carlyle Group', short: 'Carlyle', division: 'EMEA Private Equity' },
  { key: 'trowe', name: 'T. Rowe Price', short: 'T. Rowe Price', division: 'Investment Operations' },
]

/**
 * Metric register. `label` is the approved public wording.
 * Never describe $580M as "migration value" — it is annualized funding-cost savings
 * enabled by an enterprise implementation (see résumé).
 */
export type Metric = { value: string; label: string; source: string }

export const METRICS: Metric[] = [
  { value: '$580M', label: 'annualized funding-cost savings enabled', source: 'Goldman Sachs — Enterprise Inter-Affiliate Clearing' },
  { value: '$13B+', label: 'private-equity AUM supported', source: 'Carlyle — five flagship funds, 40+ co-investment vehicles' },
  { value: '600+', label: 'clients in global cross-asset migration', source: 'Goldman Sachs — client & dealer migration' },
  { value: '60%', label: 'review-cycle reduction through applied AI', source: 'Goldman Sachs — Claude-based review workflow' },
]

export type Pillar = 'Private Markets' | 'Product Strategy' | 'Strategic Transformation'

export type Brief = {
  slug: string
  n: string
  domain: string
  pillar: Pillar
  institution: Institution['key']
  eyebrow: string
  title: string
  thesis: string
  summary: string
  metrics: { value: string; label: string }[]
  context: string
  mandate: string
  led: string[]
  scale: string
  outcome?: string
  scope?: string
  signal: string
  featured?: boolean
}

export const BRIEFS: Brief[] = [
  {
    slug: 'pre-trade-initial-margin',
    n: '01',
    domain: 'Product Strategy / Credit',
    pillar: 'Product Strategy',
    institution: 'gs',
    eyebrow: 'Product Strategy / Credit Markets / Goldman Sachs',
    title: 'Pre-Trade Initial Margin Calculator',
    thesis: 'Turning a recurring client-friction point into a front-office product.',
    summary:
      'Scoped and drove a near-real-time margin capability from requirements through rollout across 120+ stakeholders.',
    metrics: [
      { value: '120+', label: 'stakeholders governed' },
      { value: 'CDS', label: 'first Credit rollout' },
    ],
    context:
      'Credit traders and sales teams needed faster, more reliable pre-trade initial-margin estimates. The existing process depended on another team and could be delayed or imprecise, creating friction during client conversations and trade structuring.',
    mandate:
      'Own product and transformation delivery for a pre-trade initial-margin calculator supporting the first Credit rollout, with a target experience of a near-real-time estimate after trade details are entered.',
    led: [
      'Product requirements, design and roadmap',
      'Cross-functional alignment with Strats, Front Office Engineering, Sales and Trading',
      'User acceptance testing, implementation and rollout',
      'Stakeholder governance across 120+ stakeholders',
    ],
    scale: '120+ stakeholders across Strats, Front Office Engineering, Sales and Trading.',
    scope:
      'CDS; estimated initial margin across the client and hedge legs; SIMM methodology; inputs spanning trade economics, counterparty, clearing house, portfolio data, CSA terms and risk factors.',
    signal:
      'Product judgment in a markets environment: translating a technical margin problem into a usable front-office experience while coordinating quantitative, engineering and business stakeholders.',
    featured: true,
  },
  {
    slug: 'ice-clear-credit',
    n: '02',
    domain: 'Market Infrastructure',
    pillar: 'Strategic Transformation',
    institution: 'gs',
    eyebrow: 'Market Infrastructure / Credit Derivatives / Goldman Sachs',
    title: 'ICE Clear Credit Onboarding',
    thesis: 'Compressing a 12-month implementation into 120 days.',
    summary:
      'Architected a cross-functional clearing-house onboarding through the U.S. banking entity, compressing the timeline from roughly 12 months to 120 days.',
    metrics: [
      { value: '120 days', label: 'from ~12 months' },
      { value: '~$40M', label: 'annual funding-cost savings' },
    ],
    context:
      'Goldman needed to onboard ICE Clear Credit through its U.S. banking entity, requiring legal-entity and booking-model changes across a broad front-to-back architecture.',
    mandate:
      'Architect and execute the cross-functional implementation across Sales & Trading, Engineering, Legal, Risk, Compliance, Operations and Finance.',
    led: [
      'Implementation structure and sequencing',
      'Cross-functional dependency management',
      'UAT readiness, escalation and governance',
      'Operating-model changes needed to support launch',
    ],
    scale:
      '100+ teams across five divisions in the broader onboarding program; coordination across market, legal, engineering and control stakeholders.',
    outcome:
      'Implementation timeline compressed from approximately 12 months to 120 days, enabling roughly $40M in annual funding-cost savings.',
    signal: 'Drive speed without sacrificing control in a regulated market-infrastructure launch.',
  },
  {
    slug: 'enterprise-inter-affiliate-clearing',
    n: '03',
    domain: 'Strategic Transformation',
    pillar: 'Strategic Transformation',
    institution: 'gs',
    eyebrow: 'Strategic Transformation / Enterprise Implementation / Goldman Sachs',
    title: 'Enterprise Inter-Affiliate Clearing',
    thesis: 'Rewiring a firm-wide operating model across 31 business units.',
    summary:
      'Set the implementation roadmap across 31 business units and 38 departments, enabling ~$580M in annualized funding-cost savings.',
    metrics: [
      { value: '~$580M', label: 'annualized funding-cost savings' },
      { value: '31', label: 'business units' },
      { value: '38', label: 'departments' },
    ],
    context:
      'A cross-divisional initiative required new inter-affiliate clearing capabilities, legal-entity changes and revised booking models across a large institutional footprint.',
    mandate:
      'Own the implementation roadmap and coordinate delivery under a cross-divisional Managing Director sponsor group.',
    led: [
      'Roadmap definition and phase gates',
      'Dependency management across divisions',
      'Legal-entity and booking-model implementation',
      'Risk and issue governance across business, engineering, legal, compliance, operations, risk and finance',
    ],
    scale: '31 business units; 38 departments; multiple regions and control functions; senior sponsorship across divisions.',
    outcome: 'Approximately $580M in annualized funding-cost savings enabled by the enterprise implementation.',
    signal:
      'Enterprise orchestration with financial consequences — creating alignment across organizations that do not naturally move as one.',
    featured: true,
  },
  {
    slug: 'kaizen-integration',
    n: '04',
    domain: 'M&A / Integration',
    pillar: 'Strategic Transformation',
    institution: 'gs',
    eyebrow: 'M&A Integration / Regulatory Technology / Goldman Sachs',
    title: 'Kaizen Post-Investment Integration',
    thesis: 'From diligence to Day 1 to global expansion.',
    summary:
      'Supported diligence, then led finance-side post-investment integration of a regulatory-technology platform across three global regions.',
    metrics: [
      { value: '$1.8M', label: 'platform implementation' },
      { value: '3', label: 'global regions' },
    ],
    context:
      'Following Goldman Sachs’ investment in Kaizen, the firm needed to integrate Kaizen’s control products and reporting capabilities into a global regulatory-reporting environment.',
    mandate: 'Support diligence, then lead finance-side post-investment integration and the associated platform implementation.',
    led: [
      'Day 1 roadmap',
      'Ramp-up and global expansion planning',
      'Systems-integration sequencing',
      'Coordination across Legal, Compliance, Engineering, Operations and business teams',
    ],
    scale: '$1.8M platform implementation across three global regions.',
    signal:
      'Connect transaction rationale to operating reality — moving from diligence questions to integration decisions and scaled adoption.',
  },
  {
    slug: 'emea-private-equity-investor-experience',
    n: '05',
    domain: 'Private Markets',
    pillar: 'Private Markets',
    institution: 'carlyle',
    eyebrow: 'Private Equity / Investor Experience / The Carlyle Group',
    title: 'EMEA Private Equity Investor Experience',
    thesis: 'Redesigning institutional investor onboarding across a $13B+ platform.',
    summary:
      'Redesigned onboarding for 342 institutional investors annually, reducing cycle time 33% and improving first-pass approvals 27%.',
    metrics: [
      { value: '342', label: 'investors annually' },
      { value: '33%', label: 'faster onboarding' },
      { value: '27%', label: 'more first-pass approvals' },
    ],
    context:
      'Investor onboarding across EMEA private equity involved substantial documentation, multiple control functions and recurring readiness issues that slowed closings and created avoidable rework.',
    mandate: 'Redesign the end-to-end onboarding model for institutional investors and create a repeatable operating standard.',
    led: [
      'Staged readiness checkpoints and standardized documentation',
      'DocuSign-integrated approvals and approval routing',
      'Execution sequencing',
      'Handoffs across Legal, Deal Teams, Compliance, Operations and outside counsel',
    ],
    scale: '342 institutional investors annually across EMEA private equity funds.',
    outcome:
      'Onboarding cycle reduced 33%, from six weeks to four; first-pass approvals improved 27%; playbook adopted as a global standard across Private Equity fund teams.',
    signal: 'Understand the investor journey and redesign the underlying institution around it.',
    featured: true,
  },
  {
    slug: 'nav-facility',
    n: '06',
    domain: 'Fund Finance',
    pillar: 'Private Markets',
    institution: 'carlyle',
    eyebrow: 'Fund Finance / Private Equity / The Carlyle Group',
    title: '€1.25B NAV Facility',
    thesis: 'Coordinating portfolio, investor and fund-entity diligence to close a €1.25B facility.',
    summary:
      'Led diligence execution for a NAV credit facility spanning 20+ portfolio assets and five jurisdictions over a five-month timeline.',
    metrics: [
      { value: '€1.25B', label: 'facility' },
      { value: '20+', label: 'portfolio assets' },
      { value: '5', label: 'jurisdictions' },
    ],
    context:
      'Carlyle Europe Partners V required a NAV credit facility spanning a complex portfolio and multi-jurisdictional fund structure.',
    mandate:
      'Lead execution across investor and fund-entity diligence while coordinating the internal and external workstreams required to close.',
    led: [
      'Diligence orchestration and issue resolution',
      'Workstream sequencing',
      'Coordination across fund operations, finance, legal, deal teams and external stakeholders',
    ],
    scale: '€1.25B facility; 20+ portfolio assets; 13+ internal and external teams; five jurisdictions; five-month execution timeline.',
    signal: 'Private-markets execution with direct exposure to fund structure, portfolio-level diligence and financing complexity.',
  },
]

/** Homepage order spans the three pillars: Product → Transformation → Private Markets. */
export const FEATURED = BRIEFS.filter(b => b.featured)

export type Role = {
  institution: Institution['key']
  company: string
  title: string
  location: string
  dates: string
  summary: string
  outcome: string
}

export const ROLES: Role[] = [
  {
    institution: 'gs',
    company: 'Goldman Sachs',
    title: 'Senior Associate, Global Banking & Markets Transformation',
    location: 'New York',
    dates: 'November 2023 – Present',
    summary:
      'Lead product and strategic execution across Global Banking & Markets, partnering with Sales & Trading, Engineering, Legal, Compliance, Risk, Finance and Operations on front-office products, market infrastructure, legal-entity and booking-model changes, client migrations, regulatory work and post-investment integration.',
    outcome: 'Approximately $580M in annualized funding-cost savings enabled by enterprise implementation.',
  },
  {
    institution: 'carlyle',
    company: 'The Carlyle Group',
    title: 'Fund Coordinator, EMEA Private Equity Fund Management',
    location: 'Washington, DC',
    dates: 'May 2021 – November 2023',
    summary:
      'Worked across five flagship private equity funds and 40+ co-investment vehicles representing $13B+ AUM, spanning fund implementation, investor onboarding, documentation, LP infrastructure, closing execution and fund finance. Promoted from Fund Assistant, 2022.',
    outcome: 'Investor onboarding redesign adopted as a global standard across Private Equity fund teams.',
  },
  {
    institution: 'trowe',
    company: 'T. Rowe Price',
    title: 'Central Operations Associate',
    location: 'Baltimore, MD',
    dates: 'October 2019 – May 2021',
    summary:
      'Built the institutional operations foundation behind later roles, including asset-transfer workflows and high-volume exception management in a regulated investment environment.',
    outcome: 'Operating discipline behind institutional investing, learned at volume.',
  },
]

export const EDUCATION = [
  'Morgan State University — B.S. Finance, Minor in Economics',
  'Project Management Professional (PMP)',
  'Bloomberg Market Concepts (BMC)',
]

export const CAREER_ARC = 'Institutional operations → private equity fund management → markets product & transformation.'

export const THESES = [
  {
    theme: 'AI in regulated institutions',
    body: 'AI creates durable value when it becomes workflow infrastructure — governed, adopted and embedded in how the institution actually works.',
  },
  {
    theme: 'Private-markets product',
    body: 'The best private-markets products make complexity legible to investors, distribution teams and operating functions without oversimplifying the underlying risk.',
  },
  {
    theme: 'Transformation',
    body: 'At institutional scale, transformation is an operating-model problem before it is a project-management problem.',
  },
]

export const PRINCIPLES = [
  { title: 'Clarity before motion', body: 'The fastest teams are not always moving first; they are aligned on the right problem first.' },
  { title: 'Commercial context matters', body: 'A transformation is stronger when the team understands the economic or client outcome it is meant to create.' },
  { title: 'Design for the institution', body: 'Good operating systems survive scale, scrutiny, handoffs and the departure of the person who built them.' },
  { title: 'AI is infrastructure', body: 'In regulated environments, AI becomes valuable when it is governed, trusted and embedded in real workflows.' },
]

export const CLOSING =
  'Complex institutions reward clarity, judgment and execution. That is the work I am interested in leading next.'

export const institutionName = (k: Institution['key']) => INSTITUTIONS.find(i => i.key === k)!.name
