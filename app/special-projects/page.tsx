import styles from './page.module.css';

export default function SpecialProjects() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* INTRO */}
        <section className={styles.intro}>
          <h1 className={styles.title}>Special Projects</h1>
          <p className={styles.introText}>
            After years building operational systems for institutions, I'm now building 
            platforms that rethink foundational processes—hiring, housing, independent work.
          </p>
          <p className={styles.introText}>
            These aren't side projects. They're systems-first, AI-native platforms designed 
            to solve real inefficiencies I've seen and experienced. Some are in beta. Some 
            are in development. All are built with the same rigor I brought to transformation 
            work at Goldman Sachs.
          </p>
          <p className={styles.introText}>
            Here's what's in motion.
          </p>
        </section>

        {/* PROJECT 1: AI HIRING */}
        <section id="ai-hiring" className={styles.project}>
          <div className={styles.projectHeader}>
            <span className={styles.status}>Beta Testing</span>
            <h2 className={styles.projectTitle}>AI Hiring & Pre-screening Platform</h2>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Problem</h3>
              <p>
                Companies waste 40+ hours per role manually screening resumes and conducting 
                first interviews. Most candidates never get meaningful feedback. Hiring teams 
                burn out reviewing hundreds of applications that don't match the role.
              </p>
              <p>
                The current process is inefficient for everyone: candidates apply into a void, 
                recruiters drown in noise, and hiring managers only see pre-filtered candidates 
                after weeks of delay.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Solution</h3>
              <p>
                An AI-native platform that analyzes resumes against role requirements, conducts 
                structured video interviews, and delivers actionable insights to hiring teams.
              </p>
              <p>
                Candidates get fair evaluation regardless of pedigree. Recruiters get pre-scored 
                matches with reasoning. Hiring managers focus on top candidates instead of 
                drowning in volume.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Impact</h3>
              <p className={styles.metric}>65% reduction in time-to-hire</p>
              <p className={styles.metric}>Every candidate gets evaluated fairly</p>
              <p className={styles.metric}>Hiring teams focus on signal, not noise</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Status</h3>
              <p>
                Beta Testing · 3 SMB clients · 500+ applications processed/month
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT 2: RENTER MATCHING */}
        <section id="renter-matching" className={styles.project}>
          <div className={styles.projectHeader}>
            <span className={styles.status}>Pre-Launch</span>
            <h2 className={styles.projectTitle}>Renter-to-Apartment Matching</h2>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Problem</h3>
              <p>
                Finding an apartment in NYC is broken. Renters spend weeks browsing thousands 
                of listings that don't match their needs. Landlords get hundreds of unqualified 
                applications. The entire process is friction, noise, and wasted time.
              </p>
              <p>
                Current platforms optimize for volume, not matches. More listings don't help 
                if they're not relevant. More applications don't help if they're not qualified.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Solution</h3>
              <p>
                A matching platform that understands what renters actually need—neighborhood 
                preferences, commute constraints, lifestyle fit—then surfaces apartments that 
                match those criteria before they hit the open market.
              </p>
              <p>
                Renters get curated matches. Landlords get pre-qualified candidates. Both sides 
                spend less time searching and more time deciding.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Traction</h3>
              <p className={styles.metric}>1,200+ NYC renters on waitlist</p>
              <p className={styles.metric}>$33M+ in potential lease value</p>
              <p className={styles.metric}>Launching Q2 2026</p>
            </div>
          </div>
        </section>

        {/* PROJECT 3: FREELANCE PLATFORM */}
        <section id="freelance" className={styles.project}>
          <div className={styles.projectHeader}>
            <span className={styles.status}>Alpha Testing</span>
            <h2 className={styles.projectTitle}>Freelance Infrastructure Platform</h2>
          </div>

          <div className={styles.projectContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Problem</h3>
              <p>
                Freelancers spend 12+ hours per week on administrative overhead—invoicing, 
                contract management, client communication, payment tracking. That's time 
                that should go to billable work.
              </p>
              <p>
                Existing tools are fragmented: one for contracts, another for invoices, 
                another for scheduling. None of them talk to each other. None of them 
                automate the repetitive parts.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>The Solution</h3>
              <p>
                An all-in-one platform that handles the infrastructure layer of freelancing—
                contracts, invoices, payments, scheduling, client communication—so freelancers 
                can focus on the work that actually generates revenue.
              </p>
              <p>
                Automated workflows. Unified client management. One system instead of five.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Impact</h3>
              <p className={styles.metric}>12 hours/week saved per user</p>
              <p className={styles.metric}>70% faster invoice-to-payment cycle</p>
              <p className={styles.metric}>Alpha with 15 freelancers</p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className={styles.closing}>
          <p>
            More projects in development. More ideas being tested. Some will ship. Some won't. 
            All are being built with the same question: does this solve a real problem in a 
            meaningfully better way?
          </p>
          <p>
            If you're building something in this space—or if you're interested in what comes 
            next—let's talk.
          </p>
          <a href="/#contact" className="button">
            Get in touch
          </a>
        </section>
      </div>
    </main>
  );
}
