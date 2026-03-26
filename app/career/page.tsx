import styles from './page.module.css';
import Link from 'next/link';

export default function Career() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* INTRO */}
        <section className={styles.intro}>
          <h1 className={styles.title}>Career</h1>
          <p className={styles.introText}>
            Six years across three institutions that demand precision, scale, and execution. 
            Each chapter taught me something different about building systems that matter, 
            navigating complexity, and creating lasting impact.
          </p>
        </section>

        {/* GOLDMAN SACHS */}
        <section className={styles.chapter}>
          <div className={styles.chapterHeader}>
            <div className={styles.companyLogo}>GOLDMAN SACHS</div>
            <p className={styles.timeline}>November 2023 — Present</p>
            <p className={styles.context}>Global Banking & Markets · Transformation</p>
          </div>

          <div className={styles.narrative}>
            <p>
              Global Banking & Markets at Goldman Sachs processes thousands of cross-border 
              transactions daily—each one navigating complex regulatory frameworks, operational 
              dependencies, and stakeholder coordination across time zones.
            </p>

            <p>
              I joined the transformation team responsible for rebuilding critical operational 
              systems and governance frameworks. The work required translating ambiguous strategic 
              priorities into executable processes, coordinating across technology, compliance, 
              operations, and senior leadership, and designing systems flexible enough to adapt 
              as regulations evolved.
            </p>

            <p>
              The complexity wasn't just technical—it was organizational. Every decision had 
              implications across divisions. Every framework needed buy-in from stakeholders 
              who measured success differently. Every system needed to perform flawlessly while 
              remaining adaptable.
            </p>

            <p>
              The project I'm most proud of: building Goldman's CFTC regulatory governance 
              framework from scratch—a system now foundational to how the firm manages compliance 
              across swaps operations. It required designing workflows that balanced regulatory 
              precision with operational efficiency, building consensus across competing priorities, 
              and creating something scalable enough to support global operations.
            </p>

            <p>
              Beyond governance, I deployed an AI-enabled workflow tool across the transformation 
              team—60 members adopted it, cutting review-cycle times by 60%. It wasn't just about 
              automation; it was about redesigning how teams collaborate when the stakes are high 
              and the margin for error is zero.
            </p>

            <p>
              What I learned here: how to operate where precision and speed both matter. How to 
              build at institutional scale without losing sight of the details. How to navigate 
              environments where "good enough" isn't an option, and where execution determines 
              whether systems hold together under pressure.
            </p>
          </div>

          <div className={styles.transition}>
            Before Goldman Sachs, I spent two years at Carlyle.
          </div>
        </section>

        {/* CARLYLE */}
        <section className={styles.chapter}>
          <div className={styles.chapterHeader}>
            <div className={styles.companyLogo}>CARLYLE</div>
            <p className={styles.timeline}>June 2021 — November 2023</p>
            <p className={styles.context}>EMEA Fund Operations</p>
          </div>

          <div className={styles.narrative}>
            <p>
              Carlyle's EMEA fund operations team executes private equity transactions across 
              Europe, the Middle East, and Africa—high-stakes deals where timing, precision, 
              and coordination determine whether billions deploy successfully.
            </p>

            <p>
              I joined to help scale operational infrastructure across approximately 27 annual 
              transactions. The challenge wasn't volume alone—it was maintaining execution 
              discipline while coordinating across fund managers, legal teams, compliance 
              officers, and external counterparties, all operating under different incentive 
              structures and timelines.
            </p>

            <p>
              Private equity moves fast, but the back-office infrastructure that supports it 
              needs to move faster. I rebuilt processes that had evolved organically over years, 
              identifying bottlenecks that slowed deal execution and designing workflows that 
              could scale without breaking.
            </p>

            <p>
              The work I'm most proud of: redesigning Carlyle's investor onboarding process—a 
              system adopted as the global standard across the firm. It required understanding 
              how institutional investors evaluate operational credibility, then building an 
              experience that reflected Carlyle's sophistication while reducing friction. The 
              result: faster onboarding, fewer errors, and a process that scaled across regions 
              without requiring constant intervention.
            </p>

            <p>
              Beyond process design, I learned how to operate in environments where every 
              stakeholder has leverage and every decision involves negotiation. Carlyle taught 
              me that operational excellence isn't about perfection—it's about designing systems 
              resilient enough to handle real-world complexity while maintaining trust across 
              competing interests.
            </p>
          </div>

          <div className={styles.transition}>
            My first institutional experience was at T. Rowe Price.
          </div>
        </section>

        {/* T. ROWE PRICE */}
        <section className={styles.chapter}>
          <div className={styles.chapterHeader}>
            <div className={styles.companyLogo}>T. ROWE PRICE</div>
            <p className={styles.timeline}>October 2019 — May 2021</p>
            <p className={styles.context}>Investment Operations</p>
          </div>

          <div className={styles.narrative}>
            <p>
              T. Rowe Price manages over $1.5 trillion in assets—a scale where operational 
              precision isn't optional. Even small inefficiencies compound across thousands 
              of daily transactions, and errors can cascade into systemic issues.
            </p>

            <p>
              I started here in investment operations, learning how institutional asset managers 
              actually function beneath the surface. The work involved coordinating trade 
              settlement, reconciling positions across multiple systems, and ensuring that 
              back-office operations kept pace with portfolio managers making real-time 
              investment decisions.
            </p>

            <p>
              This was my introduction to operational infrastructure at scale—understanding 
              how legacy systems interact, why certain processes exist even when they seem 
              redundant, and what happens when coordination breaks down across teams managing 
              billions in daily flows.
            </p>

            <p>
              What I learned at T. Rowe Price became the foundation for everything that followed: 
              how to operate within established institutional frameworks, how to identify where 
              systems are brittle, and how to propose changes without disrupting live operations. 
              It taught me that transformation doesn't always mean rebuilding from scratch—
              sometimes it means understanding what's already there well enough to improve it 
              without breaking it.
            </p>
          </div>
        </section>

        {/* CLOSING */}
        <section className={styles.closing}>
          <p>
            These chapters taught me how to build, scale, and execute in environments where the 
            stakes are high and the margin for error is zero. I learned how complex organizations 
            move, how systems hold together under pressure, and how to deliver when it matters.
          </p>

          <p>
            Now I'm applying those lessons to something different: building platforms from the 
            ground up. Systems for hiring, housing, and independent work that combine institutional 
            discipline with entrepreneurial speed.
          </p>

          <p>
            The work continues—just in a different form.
          </p>

          <Link href="/special-projects" className="button">
            See what I'm building
          </Link>
        </section>
      </div>
    </main>
  );
}
