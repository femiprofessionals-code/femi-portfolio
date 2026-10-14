"""Generates the static review mockups in this folder. Run: python3 docs/mockups/_build.py
All copy is website wording (repo main @182768d = femifalade.com per pack content-source.json);
see content-assignment.md for the per-page source map. No scripts, no motion."""
from pathlib import Path

OUT = Path(__file__).parent
WITHHELD = '<span class="rv">$ figure withheld — D-07</span>'
RESUME = '<a class="btn" aria-disabled="true" role="link" tabindex="0">Résumé</a>'


def rv(text, block=False):
    return f'<span class="rv{" rv--block" if block else ""}">{text}</span>'


def nav(current='', over=False):
    items = [('About', 'about.html'), ('Work', 'work.html'), ('Services', 'services.html'), ('Contact', 'contact.html')]
    lis = ''.join(f'<li><a href="{h}"{" aria-current=\"page\"" if l == current else ""}>{l}</a></li>' for l, h in items)
    return f'''<header class="nav{" nav--over" if over else ""}">
  <a class="brand" href="home.html" aria-label="Femi Falade — home"><span class="brand__mono" aria-hidden="true">FF</span><span class="brand__name">Femi Falade</span></a>
  <nav aria-label="Primary"><ul>{lis}<li>{RESUME}</li></ul></nav>
  <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor"/></svg></button>
</header>'''


FOOTER = '''<footer class="footer"><div class="wrap">
  <div><h4>Location</h4><p style="margin:0 0 6px;font:500 20px/1.3 var(--serif)">Femi Falade</p><p class="muted" style="margin:0 0 10px">New York, NY</p><a href="mailto:femi@femifalade.com">femi@femifalade.com</a></div>
  <div><h4>Navigate</h4><a href="home.html">Home</a><a href="about.html">About</a><a href="work.html">Work</a><a href="services.html">Services</a><a href="contact.html">Contact</a></div>
  <div><h4>Connect</h4><a href="https://www.linkedin.com/in/femi-falade">LinkedIn</a><a href="https://calendly.com/femijfalade/femi">Calendly</a><a href="mailto:femi@femifalade.com">Email</a><a aria-disabled="true" role="link" tabindex="0">Résumé <span class="rv">PDF not supplied — D-14</span></a></div>
</div></footer>'''


def page(name, title, body, current=''):
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — Femi Falade (static mockup)</title><link rel="stylesheet" href="mock.css"></head>
<body>
<div class="reviewbar">STATIC MOCKUP · for review, not final design · yellow notes are design-review annotations only · {title}</div>
{body}
{FOOTER}
</body></html>'''
    (OUT / name).write_text(html)


# ── shared bits
COMPANIES = [  # website dates/titles (about page timeline), attributed draft
    dict(id='trowe', name='T. Rowe Price', dates='Oct 2019 – Jun 2021', flag='D-02 · D-04', role='Analyst, Central Operations', x=(502, 650), mat=(526, 368, 625, 470), logo='trowe.webp'),
    dict(id='carlyle', name='The Carlyle Group', dates='Jun 2021 – Nov 2023', flag='D-01 · D-03', role='Associate, EMEA Fund Operations', x=(674, 822), mat=(698, 368, 798, 470), logo='carlyle.webp'),
    dict(id='gs', name='Goldman Sachs', dates='Nov 2023 – Present', flag='D-13', role='Senior Associate, Global Banking and Markets Transformation', x=(845, 994), mat=(870, 368, 970, 470), logo='gs.svg'),
]
W, H = 1536, 1024
pct = lambda v, d: f'{v / d * 100:.3f}%'
IDENTITY = dict(
    positioning='Strategic Transformation',
    name='Femi Falade',
    intro='Transformation, financial operations, and AI-enabled workflows across institutional finance.',
)


def logo_chip(c):
    return f'<span class="logo-chip logo-chip--{c["id"]}"><img src="img/{c["logo"]}" alt=""></span>'


def scene(room='room-master-morning.webp', wall=True):
    mats = ''.join(
        f'<div class="mat mat--{c["id"]}" style="left:{pct(c["mat"][0], W)};top:{pct(c["mat"][1], H)};width:{pct(c["mat"][2] - c["mat"][0], W)};height:{pct(c["mat"][3] - c["mat"][1], H)}">'
        f'<img src="img/{c["logo"]}" alt=""></div>' for c in COMPANIES)
    caps = ''.join(
        f'<a class="caption" href="company-goldman-sachs.html" style="left:{pct((c["x"][0] + c["x"][1]) / 2 - 100, W)}">'
        f'<b>{c["name"]}</b><span>{c["dates"]}</span></a>' for c in COMPANIES) if wall else ''
    text = f'''<div class="walltext"><p class="eyebrow">{IDENTITY["positioning"]}</p><h1>{IDENTITY["name"]}</h1><p>{IDENTITY["intro"]}</p></div>''' if wall else ''
    return f'<div class="scene"><img class="room" src="img/{room}" alt="A quiet gallery room in New York: three framed company artworks on a limestone wall above a leather bench, an olive tree and a sofa by floor-to-ceiling windows.">{mats}{text}{caps}</div>'


# ── HOME
def home(room, fname, label):
    body = f'''{nav(over=True)}
<main>
  <section class="home-desktop" aria-label="Gallery room">
    <div style="position:relative">{scene(room)}
      <span class="rv rv--pin" style="left:30.5%;top:9.5%">Identity line: pack "proposed synthesis" — needs Femi's approval</span>
      <span class="rv rv--pin" style="left:31%;top:56.4%">Dates = website About timeline (attributed draft) · ⚑ D-01–D-04 · each caption opens its company view</span>
      <span class="rv rv--pin" style="left:1.5%;top:93%">{label}</span>
    </div>
    <div class="wrap" style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;padding-top:22px;padding-bottom:6px">
      <a class="btn btn--solid" href="work.html">View work</a>{RESUME}<a class="btn" href="contact.html">Contact</a>
      {rv("Résumé: no real file exists — button inert, no placeholder link (D-14)")}
    </div>
  </section>
  <section class="home-mobile" aria-label="Gallery room (mobile)">
    <div class="crop">{scene(room, wall=False)}</div>
    <div class="wrap" style="padding-top:26px">
      <p class="eyebrow">{IDENTITY["positioning"]}</p>
      <h1 class="display" style="font-size:44px">{IDENTITY["name"]}</h1>
      <p class="lede" style="font-size:19px;margin:12px 0 4px">{IDENTITY["intro"]}</p>
      {rv("Identity line: proposed synthesis — needs approval")}
      <ul style="list-style:none;margin:24px 0 0;padding:0;border-top:1px solid var(--line)">
        {"".join(f'<li style="border-bottom:1px solid var(--line)"><a href="company-goldman-sachs.html" style="display:flex;gap:14px;align-items:center;padding:14px 0;text-decoration:none">{logo_chip(c)}<span style="flex:1"><b style="display:block;font:500 20px/1.2 var(--serif)">{c["name"]}</b><span class="eyebrow" style="margin:4px 0 0;display:block">{c["dates"]}</span></span><span aria-hidden="true">→</span></a></li>' for c in COMPANIES)}
      </ul>
      <div style="display:grid;gap:10px;margin-top:22px"><a class="btn btn--solid" href="work.html" style="justify-content:center">View work</a><a class="btn" aria-disabled="true" role="link" tabindex="0" style="justify-content:center">Résumé</a><a class="btn" href="contact.html" style="justify-content:center">Contact</a></div>
      {rv("Résumé inert until the real PDF is supplied (D-14)", True)}
    </div>
  </section>
</main>
<style>.home-mobile{{display:none}} @media(max-width:760px){{.home-desktop{{display:none}}.home-mobile{{display:block}}.nav--over{{position:relative;background:var(--paper)}}}}</style>'''
    page(fname, 'Home', body)


home('room-master-morning.webp', 'home.html', 'Background: pack concept room-master-morning.png — replacement of the existing room NOT yet approved (DL-14)')
home('room-existing-morning.webp', 'home-existing-room.html', 'Comparison: existing room (public/room/v4/morning.webp) — rug and sofa are cropped in this image')


# ── WORK
PROJECTS = {
    'gs': [
        ('01', 'Claude AI Workflow Deployment', '2023', '60%', 'Faster review cycles',
         'Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking and Markets. Restructured document review pipelines, cutting cycle times by 60 percent and eliminating a full category of manual processing.', 'case-study-claude-ai-workflow.html', ''),
        ('02', 'Entity Migration', '2024', '', '',
         f'Led a {WITHHELD} entity migration across 31 trading desks. Coordinated across legal, risk, technology, and operations. Zero disruption to active positions. Delivered on schedule across a compressed timeline.', '', 'Website title "$580M Entity Migration" shortened; stat withheld (D-07)'),
        ('03', 'CFTC Regulatory Governance Framework', '2024', '30 Days', 'End-to-end delivery',
         'Built a CFTC regulatory governance framework across 10 departments in under 30 days. Set precedent for compliance velocity inside Global Banking and Markets. Became the reference standard for subsequent regulatory programs.', '', '"30 days" vs "under 30 days" — D-10'),
    ],
    'carlyle': [
        ('04', 'Salesforce CRM, EMEA Funds', '2022', 'Global', 'Standard adopted',
         'Built Salesforce CRM from scratch for all Carlyle EMEA private equity funds. Architected data models, automated investor workflows, and trained the team. Architecture subsequently adopted as the global standard across all fund families.', '', 'Which work became the global standard? — D-11'),
        ('05', 'Investor Onboarding Redesign', '2022', '27', 'Annual transactions',
         'Redesigned investor onboarding across approximately 27 annual transactions. Eliminated redundant touchpoints. Built structured data-capture flows. Reduced time-to-close. Adopted as global standard across Carlyle fund families.', '', '27 transactions vs spec "342 investors / 27%" — D-09'),
    ],
    'trowe': [
        ('06', 'Central Operations Foundation', '2019–2021', '', '',
         'Trade settlement, position reconciliation, and operational coordination across global investment platforms. Built the analytical and operational rigor that underpins every program since.', '', 'Website stat "6+ Years foundation" omitted — inaccurate for this role (D-06)'),
    ],
}


def project_row(p):
    n, title, period, stat, statl, desc, href, note = p
    stat_html = f'<p style="margin:0;font:400 46px/1 var(--display)">{stat}</p><p class="eyebrow" style="margin:6px 0 0">{statl}</p>' if stat else ''
    link = f'<p style="margin:14px 0 0"><a href="{href}" style="font:500 12.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;display:inline-block;padding:15px 0">Read the case study →</a></p>' if href else ''
    return f'''<article class="prow">
  <p class="eyebrow" style="margin:6px 0 0">{n}</p>
  <div><h3 class="h3">{title}</h3><p class="eyebrow" style="margin:0 0 10px">{period}</p><p style="margin:0;color:var(--ink-2)">{desc}</p>{link}{(" " + rv(note)) if note else ""}</div>
  <div>{stat_html}</div>
</article>'''


work_body = f'''{nav('Work')}
<main class="wrap">
  <div class="page-head"><p class="eyebrow">Career work, 2019 to Present</p><h1 class="display">Programs that shipped.</h1><p class="lede">Six programs across Goldman Sachs, The Carlyle Group, and T. Rowe Price.</p>
  {rv("Website filters (All / AI and Technology / Regulatory / Finance / Operations) dropped for an editorial list — six items browse without them (DL-15). Independent ventures intentionally not listed (DL-10).", True)}</div>
  {"".join(f"""<section class="cgroup" aria-labelledby="g-{c['id']}"><div class="chead">{logo_chip(c)}<div><h2 id="g-{c['id']}" class="h2" style="margin:0">{c['name']}</h2><p class="eyebrow" style="margin:6px 0 0">{c['dates']} · <a href="company-goldman-sachs.html">Company view</a></p></div></div>{''.join(project_row(p) for p in PROJECTS[c['id']])}</section>""" for c in reversed(COMPANIES))}
</main>
<style>
.cgroup{{border-top:1px solid var(--ink);padding:28px 0 8px;margin-top:28px}}
.chead{{display:flex;gap:18px;align-items:center;margin-bottom:8px}}
.prow{{display:grid;grid-template-columns:70px 1fr 200px;gap:28px;padding:26px 0;border-bottom:1px solid var(--line)}}
@media(max-width:760px){{.prow{{grid-template-columns:40px 1fr;gap:12px}}.prow>div:last-child{{grid-column:2}}}}
</style>'''
page('work.html', 'Work', work_body, 'Work')


# ── CASE STUDY (DL-08)
def cs_section(n, head, content):
    return f'<section class="cs"><p class="eyebrow">{n}</p><div><h2 class="h2" style="font-size:34px">{head}</h2>{content}</div></section>'


cs_body = f'''{nav('Work')}
<main class="wrap" style="max-width:1040px">
  <p style="margin:28px 0 0"><a href="work.html" style="font:500 12.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;text-decoration:none;display:inline-block;padding:15px 0">← All work</a></p>
  <div class="page-head" style="padding-top:36px">
    <p class="eyebrow">Goldman Sachs · Global Banking and Markets · 2023</p>
    <h1 class="display">Claude AI Workflow Deployment</h1>
    <dl class="facts"><div><dt>Team members</dt><dd>60</dd></div><div><dt>Review cycles</dt><dd>60% faster</dd></div><div><dt>Division</dt><dd>Global Banking and Markets</dd></div></dl>
    {rv("Only website-documented detail is used (work page L15; About L155; Services AI tab L27). Empty fields are left visibly empty, not written.", True)}
  </div>
  {cs_section('01', 'Challenge', '<div class="slot">Not documented on femifalade.com.</div>' + rv('Needs Femi: what problem the review workflow had before the tool. Nothing inferred.', True))}
  {cs_section('02', 'Ownership', '<p>Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking and Markets.</p>')}
  {cs_section('03', 'Approach', '<p>Restructured document review pipelines around the tool, taking it into daily production use rather than a pilot.</p>' + rv('Second clause adapts the website principle "Not a demo. Not a pilot. AI tools that go into production and get used daily." — confirm or cut. Any further method detail is undocumented.', True))}
  {cs_section('04', 'Outcomes', '<ul class="outs"><li><b>60%</b> reduction in review-cycle times</li><li>A full category of manual processing eliminated</li><li>In use across a team of <b>60</b></li></ul>')}
  <blockquote class="quote"><p>“AI as infrastructure. Not a demo. Not a pilot. AI tools that go into production and get used daily.”</p><cite class="eyebrow">Operating principle · About</cite></blockquote>
  <hr class="rule"><p style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:22px"><a href="work.html">← All work</a><a href="company-goldman-sachs.html">Goldman Sachs — company view →</a></p>
</main>
<style>
.facts{{display:flex;gap:48px;flex-wrap:wrap;margin:30px 0 0}} .facts dt{{font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--stone)}} .facts dd{{margin:8px 0 0;font:400 30px/1.1 var(--display)}}
.cs{{display:grid;grid-template-columns:70px 1fr;gap:24px;border-top:1px solid var(--line);padding:30px 0}}
.slot{{border:1px dashed var(--line);padding:22px;color:var(--stone);font-style:italic}}
.outs{{margin:0;padding:0;list-style:none}} .outs li{{padding:10px 0;border-bottom:1px solid var(--line)}}
.quote{{margin:36px 0;padding:0 0 0 24px;border-left:2px solid var(--brass)}} .quote p{{font:400 28px/1.3 var(--display);margin:0 0 10px}}
@media(max-width:760px){{.cs{{grid-template-columns:1fr;gap:4px}}.facts{{gap:24px}}}}
</style>'''
page('case-study-claude-ai-workflow.html', 'Case study', cs_body, 'Work')


# ── COMPANY VIEW (Goldman Sachs; template for the other two)
gs = COMPANIES[2]
co_body = f'''{nav()}
<main class="wrap">
  <p style="margin:28px 0 0"><a href="home.html" style="font:500 12.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;text-decoration:none;display:inline-block;padding:15px 0">← Back to the room</a></p>
  <div class="page-head grid2" style="align-items:end;grid-template-columns:auto 1fr">
    <div class="mat-lg"><img src="img/gs.svg" alt="Goldman Sachs"></div>
    <div><p class="eyebrow">Experience</p><h1 class="display">Goldman Sachs</h1>
      <p class="lede" style="margin:14px 0 0">Senior Associate, Global Banking and Markets Transformation</p>
      <p class="eyebrow" style="margin:12px 0 0">Nov 2023 – Present · New York</p>
      {rv("Title/dates = website About timeline · title wording varies across pages (D-13) · GS mark provenance unconfirmed (D-23)")}</div>
  </div>
  <section class="grid2" style="border-top:1px solid var(--ink);padding-top:30px">
    <div><p class="eyebrow">Scope</p><p class="lede" style="margin:0">Leading enterprise-scale transformation inside Global Banking and Markets. CFTC regulatory frameworks delivered in 30 days. A {WITHHELD} entity migration across 31 trading desks. A Claude-based AI workflow tool deployed to 60 team members. Review cycles cut by 60 percent.</p></div>
    <div><p class="eyebrow">Projects</p>
      <ul class="plist">
        <li><a href="case-study-claude-ai-workflow.html"><b>Claude AI Workflow Deployment</b><span>2023 · Case study →</span></a></li>
        <li><a href="work.html"><b>Entity Migration</b><span>2024 · Work list</span></a></li>
        <li><a href="work.html"><b>CFTC Regulatory Governance Framework</b><span>2024 · Work list</span></a></li>
      </ul></div>
  </section>
  {rv("Same template for The Carlyle Group and T. Rowe Price, using their About-timeline role/dates and Work items. Spec-only scope (e.g. $13B+ AUM) excluded (D-08).", True)}
  <hr class="rule" style="margin-top:40px"><p style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:22px"><a href="home.html">← Back to the room</a><a href="work.html">All work →</a></p>
</main>
<style>
.mat-lg{{width:180px;aspect-ratio:1;padding:16px;background:#F8F4EC;box-shadow:inset 0 0 0 1px var(--line),0 1px 0 var(--line)}} .mat-lg img{{width:100%;height:100%}}
.plist{{list-style:none;margin:0;padding:0}} .plist a{{display:flex;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:1px solid var(--line);text-decoration:none}}
.plist b{{font:500 20px/1.3 var(--serif)}} .plist span{{font:500 11px/1.6 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--stone);white-space:nowrap}}
@media(max-width:760px){{.mat-lg{{width:120px}}.plist a{{flex-direction:column;gap:4px}}}}
</style>'''
page('company-goldman-sachs.html', 'Company view', co_body)


# ── ABOUT
STORY = [
    'I started at T. Rowe Price. One of the largest active asset managers in the world. I learned what rigorous financial operations actually look like at scale. That foundation never left.',
    'At The Carlyle Group, I moved into private equity fund operations. I built the EMEA Salesforce CRM from scratch. I redesigned the investor onboarding workflow. It became the global standard. Twenty-seven transactions a year teaches you to operate without margin for error.',
    f'Goldman Sachs is where the scale changed entirely. CFTC regulatory frameworks across ten departments in thirty days. A {WITHHELD} entity migration across thirty-one trading desks. And the work I am most proud of. Deploying a Claude-based AI workflow tool to sixty team members in Global Banking and Markets. Cutting review-cycle times by sixty percent.',
    'That deployment proved the thesis I had been building toward. AI is not a feature. It is infrastructure. Not a demo for a committee. A tool that goes into production on Monday and makes the team faster by Thursday.',
]
PRINCIPLES = [
    ('Precision over polish.', 'A framework that works beats a presentation that dazzles. Outcomes over optics.'),
    ('Speed with rigor.', 'The 30-day CFTC framework was fast because the thinking was done upfront. Not because corners were cut.'),
    ('Build to hand off.', 'The best programs do not require the person who built them. Designed for institutional durability.'),
    ('AI as infrastructure.', 'Not a demo. Not a pilot. AI tools that go into production and get used daily.'),
]
INTERESTS_NOTE = ('INTERESTS — not supplied. The only candidate is the unlinked Travel page, whose counts do not reconcile (D-12). '
                  'Awaiting approved interests from Femi; nothing is written here until then.')
TIMELINE = [
    ('Nov 2023 — Present', 'Goldman Sachs', 'Senior Associate, Global Banking and Markets Transformation', ''),
    ('Jun 2021 — Nov 2023', 'The Carlyle Group', 'Associate, EMEA Fund Operations', 'D-01 · D-03'),
    ('Oct 2019 — Jun 2021', 'T. Rowe Price', 'Analyst, Central Operations', 'D-02 · D-04'),
    ('Aug 2016 — May 2020', 'Morgan State University', 'B.S. Finance', 'D-05'),
]
about_body = f'''{nav('About')}
<main class="wrap">
  <div class="page-head"><p class="eyebrow">About Femi Falade</p>
    <h1 class="display" style="max-width:20ch">I build operational systems. I ship programs that scale. I do this inside institutions that move markets.</h1>
    <p class="lede" style="margin-top:22px">Six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Goldman-caliber operational discipline applied to transformation programs that actually ship.</p>
    {rv('"Six years" is stale against the website dates (D-06). Website sentence "Three AI-native platforms in development." removed (DL-10).', True)}</div>
  <section class="story">
    <figure style="margin:0"><img src="img/femi-portrait.webp" alt="Portrait of Femi Falade" width="1066" height="1600" style="width:100%;height:auto"></figure>
    <div><p class="eyebrow">The story</p><h2 class="h2">Operational discipline, built inside the hardest rooms.</h2>
      {''.join(f'<p style="color:var(--ink-2)">{p}</p>' for p in STORY)}
      {rv('Website paragraph 5 (the three ventures) not shown (DL-10).', True)}
      <div class="interests">{rv(INTERESTS_NOTE, True)}</div>
    </div>
  </section>
  <section style="margin-top:72px"><p class="eyebrow">Operating principles</p>
    <div class="pgrid">{''.join(f'<div><h3 class="h3" style="color:var(--brass)">{t}</h3><p style="margin:0;color:var(--ink-2)">{b}</p></div>' for t, b in PRINCIPLES)}</div></section>
  <section style="margin-top:72px"><p class="eyebrow">Career timeline</p>
    {''.join(f'<div class="trow"><p class="tdate">{d}</p><div><h3 class="h3">{co}</h3><p class="muted" style="margin:0">{r}{(" " + rv("⚑ " + f)) if f else ""}</p></div></div>' for d, co, r, f in TIMELINE)}</section>
  <p style="margin-top:48px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="work.html">View work</a><a class="btn btn--solid" href="contact.html">Start a conversation</a></p>
</main>
<style>
.story{{display:grid;grid-template-columns:340px 1fr;gap:64px;align-items:start}}
.pgrid{{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}} .pgrid>div{{background:var(--paper);padding:26px}}
.trow{{display:grid;grid-template-columns:240px 1fr;gap:24px;border-top:1px solid var(--line);padding:22px 0}} .tdate{{margin:0;font:400 22px/1.3 var(--display);color:var(--brass)}}
@media(max-width:1100px){{.pgrid{{grid-template-columns:1fr 1fr}}}}
@media(max-width:760px){{.story{{grid-template-columns:1fr;gap:28px}}.story figure{{max-width:260px}}.pgrid{{grid-template-columns:1fr}}.trow{{grid-template-columns:1fr;gap:4px}}}}
</style>'''
page('about.html', 'About', about_body, 'About')


# ── SERVICES (website tabs, exact; Transformation selected as the central positioning — DL-16)
SERVICES = [
    ('regulatory', 'Regulatory', 'Compliance delivered at velocity.',
     'Built on the experience of delivering a CFTC governance framework across 10 departments in 30 days at Goldman Sachs. Regulatory strategy, gap analysis, and framework design without the usual six-month timeline.',
     'CFTC framework. 10 departments. 30 days. Goldman Sachs.',
     ['Regulatory gap analysis', 'Governance framework design', 'CFTC and SEC compliance architecture', 'Risk and controls documentation', 'Cross-department coordination', 'Regulatory reporting design', 'Audit trail infrastructure', 'Policy and procedure build']),
    ('transformation', 'Transformation', 'Enterprise programs that ship.',
     f'Led a {WITHHELD} entity migration across 31 trading desks at Goldman Sachs. Redesigned Carlyle investor onboarding adopted globally. Complex, multi-stakeholder programs delivered on time without disrupting live operations.',
     f'{WITHHELD} migration. 31 trading desks. Goldman Sachs.',
     ['Program architecture and governance', 'Entity migration management', 'Cross-functional stakeholder coordination', 'Investor relations redesign', 'Operating model transformation', 'Change management and adoption', 'Post-launch optimization', 'Institutional documentation']),
    ('ai', 'AI and Tooling', 'AI as infrastructure, not decoration.',
     'Deployed a Claude-based AI workflow tool to 60 team members at Goldman Sachs. Cut review-cycle times by 60 percent. Built Salesforce CRM from scratch for all Carlyle EMEA funds. Technology that goes live, gets used daily, and creates measurable outcomes.',
     '60% review reduction. 60 users. Claude deployment. GBM.',
     ['AI workflow tool design and deployment', 'CRM architecture and build', 'Process automation design', 'Tool evaluation and selection', 'User training and change management', 'Systems integration', 'Data architecture', 'Performance monitoring setup']),
    ('advisory', 'Advisory', 'Strategic clarity before execution.',
     'Drawing on six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Asset management, private equity, and investment banking. Advisory engagements focused on strategy, operating model design, and organizational structure.',
     'Goldman Sachs. Carlyle Group. T. Rowe Price. Six years.',
     ['Operating model design', 'Organizational structure review', 'Business case development', 'Stakeholder alignment facilitation', 'Executive reporting frameworks', 'Investment operations advisory', 'Program diagnostic and audit', 'Strategic roadmap development']),
]


def svc_panel(s, active):
    sid, label, head, desc, proof, items = s
    return f'''<section class="svc{" svc--active" if active else ""}" id="p-{sid}" role="tabpanel" aria-labelledby="t-{sid}">
  <p class="eyebrow" style="color:var(--brass)">{label}{"" if active else " — tab panel shown expanded for review"}</p>
  <h2 class="h2">{head}</h2><p class="lede" style="margin:0 0 12px">{desc}</p><p class="muted" style="font-style:italic;margin:0 0 22px">{proof}</p>
  <ul class="offer">{''.join(f'<li>{i}</li>' for i in items)}</ul></section>'''


svc_body = f'''{nav('Services')}
<main class="wrap">
  <div class="page-head"><p class="eyebrow">What I do</p><h1 class="display">The skills to shape what is next.</h1>
    <p class="lede" style="font-style:italic">Regulatory, transformation, AI tooling, and strategic advisory. Built on real institutional experience.</p></div>
  <div class="svcwrap">
    <div role="tablist" aria-label="Disciplines" class="tabs">
      {''.join(f'<button role="tab" id="t-{s[0]}" aria-controls="p-{s[0]}" aria-selected="{"true" if s[0] == "transformation" else "false"}" tabindex="{0 if s[0] == "transformation" else -1}">{s[1]}<span aria-hidden="true">→</span></button>' for s in SERVICES)}
      {rv("Order = website. Transformation pre-selected as the central positioning (website default: Regulatory) — DL-16", True)}
    </div>
    <div>{svc_panel(SERVICES[1], True)}{''.join(svc_panel(s, False) for s in SERVICES if s[0] != 'transformation')}</div>
  </div>
  <section style="text-align:center;margin-top:80px;border-top:1px solid var(--line);padding-top:64px">
    <h2 class="h2">Ready to bring this expertise to your team?</h2><p class="lede" style="margin:0 auto 28px">A 30-day sprint or a multi-year transformation. Let us scope the right engagement.</p>
    <a class="btn btn--solid" href="contact.html">Start a conversation</a></section>
</main>
<style>
.svcwrap{{display:grid;grid-template-columns:260px 1fr;gap:56px;border-top:1px solid var(--ink);padding-top:32px}}
.tabs button{{display:flex;justify-content:space-between;width:100%;min-height:52px;align-items:center;background:none;border:0;border-bottom:1px solid var(--line);font:400 26px/1 var(--display);color:var(--stone);cursor:pointer;padding:0;text-align:left}}
.tabs button[aria-selected=true]{{color:var(--ink);border-bottom-color:var(--ink)}}
.svc{{padding-bottom:36px;margin-bottom:36px;border-bottom:1px solid var(--line)}} .svc:not(.svc--active){{opacity:.78}}
.offer{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line)}} .offer li{{padding:12px 16px 12px 0;border-bottom:1px solid var(--line);font:400 15px/1.4 var(--sans);color:var(--ink-2)}}
@media(max-width:760px){{.svcwrap{{grid-template-columns:1fr;gap:20px}}.tabs{{display:flex;overflow-x:auto;gap:18px}}.tabs button{{width:auto;white-space:nowrap;font-size:20px;gap:8px}}.tabs button span{{display:none}}.offer{{grid-template-columns:1fr}}}}
</style>'''
page('services.html', 'Services', svc_body, 'Services')


# ── CONTACT
REASONS = ['Transformation programme', 'Regulatory framework delivery', 'AI tooling deployment', 'CRM or systems build', 'Strategic advisory', 'Speaking opportunity', 'Other']
BEST = [('Regulatory delivery', 'CFTC, SEC, and governance frameworks'), ('AI deployment', 'Workflow tools for financial operations teams'), ('Transformation', 'Multi-stakeholder enterprise programs'), ('Systems builds', 'CRM, data architecture, and integrations'), ('Strategic advisory', 'Operating model and organizational design')]
FAQS = [
    ('Do you take on consulting work alongside your primary role?', 'Yes. I take on select engagements. Typically 30 to 90-day sprints focused on regulatory frameworks, AI deployment, or operations architecture. Volume is deliberately limited to maintain quality.', 'Confirm OK to publish while employed (D-21)'),
    ('What sectors do you work in?', 'Financial services is the core. Investment banking, private equity, and asset management. I also advise fintech platforms and AI-native companies building infrastructure adjacent to financial services.', ''),
    ('How quickly do you respond?', 'Every message gets a personal response within two business days. If you need to move faster, Calendly is the quickest path to a live conversation.', 'Response promise depends on the form working (D-16)'),
]
contact_body = f'''{nav('Contact')}
<main class="wrap">
  <div class="page-head"><p class="eyebrow">Get in touch</p><h1 class="display">Work with me</h1><p class="lede" style="font-style:italic">Let us talk about your next chapter.</p></div>
  <section class="cgrid">
    <div>
      <p class="eyebrow">New York, US</p><p style="margin:0;font:500 24px/1.3 var(--serif)">Femi Falade</p><p class="muted" style="margin:4px 0 18px;font:400 14px/1.5 var(--sans)">Senior Associate · Global Banking and Markets</p>
      <ul class="chan">
        <li><span class="eyebrow">Email</span><a href="mailto:femi@femifalade.com">femi@femifalade.com</a></li>
        <li><span class="eyebrow">LinkedIn</span><a href="https://www.linkedin.com/in/femi-falade">linkedin.com/in/femi-falade</a></li>
        <li><span class="eyebrow">Calendar</span><a href="https://calendly.com/femijfalade/femi">Book a Calendly call</a></li>
      </ul>
      {rv("Targets are exact website values; not click-tested from this environment (live host blocked)", True)}
      <p class="eyebrow" style="margin-top:36px">Best for</p>
      <ul class="best">{''.join(f'<li><b>{t}</b><span>{s}</span></li>' for t, s in BEST)}</ul>
    </div>
    <form aria-labelledby="form-title" onsubmit="return false">
      <p class="eyebrow" id="form-title">Send a message</p>
      {rv("Current website form has NO backend: “Send” shows “Message sent.” but nothing is transmitted (D-16). Endpoint must be decided before build; mailto fallback meanwhile.", True)}
      <div class="grid2" style="gap:24px"><label>Name<input name="name" placeholder="Your name" autocomplete="name"></label><label>Email<input name="email" type="email" placeholder="your@email.com" autocomplete="email"></label></div>
      <label>What are you looking for?<select name="reason"><option value="">Select a type of engagement</option>{''.join(f'<option>{r}</option>' for r in REASONS)}</select></label>
      <label>Message<textarea name="message" rows="5" placeholder="Tell me about your challenge or opportunity. The more specific, the better."></textarea></label>
      <p style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><button class="btn btn--solid" type="submit">Send message</button><span class="muted" style="font:400 14px/1 var(--sans)">or <a href="https://calendly.com/femijfalade/femi">book a call</a></span></p>
    </form>
  </section>
  <section style="margin-top:72px"><p class="eyebrow">Common questions</p>
    <div class="faqs">{''.join(f'<div><h3 class="h3">{q}</h3><p style="margin:0;color:var(--ink-2)">{a}</p>{(" " + rv(n)) if n else ""}</div>' for q, a, n in FAQS)}</div></section>
</main>
<style>
.cgrid{{display:grid;grid-template-columns:1fr 1.5fr;gap:64px;border-top:1px solid var(--ink);padding-top:36px}}
.chan,.best{{list-style:none;margin:0;padding:0}} .chan li{{display:grid;gap:4px;padding:12px 0;border-top:1px solid var(--line)}} .chan .eyebrow{{margin:0}} .chan a{{font:400 19px/1.4 var(--serif);display:block;padding:9px 0}}
.best li{{display:grid;padding:12px 0;border-top:1px solid var(--line)}} .best b{{font:500 15px/1.4 var(--sans)}} .best span{{font:400 14px/1.4 var(--sans);color:var(--stone)}}
form label{{display:block;font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--stone);margin:0 0 26px}}
form input,form select,form textarea{{display:block;width:100%;margin-top:10px;min-height:44px;border:0;border-bottom:1px solid rgba(26,23,20,.35);background:transparent;font:400 17px/1.5 var(--serif);color:var(--ink);padding:8px 0;text-transform:none;letter-spacing:0}}
.faqs{{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}} .faqs>div{{background:var(--paper);padding:26px}}
@media(max-width:760px){{.cgrid{{grid-template-columns:1fr;gap:40px}}.faqs{{grid-template-columns:1fr}}}}
</style>'''
page('contact.html', 'Contact', contact_body, 'Contact')
print('built', sorted(p.name for p in OUT.glob('*.html')))
