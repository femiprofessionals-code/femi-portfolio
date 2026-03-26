'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { HeadshotImage } from '../ImageWithFallback';

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* INTRO */}
        <section className={styles.intro}>
          <div className={styles.imageSection}>
            <div className={styles.profileImage}>
              <HeadshotImage />
            </div>
          </div>

          <div className={styles.textSection}>
            <h1 className={styles.title}>About</h1>
            
            <div className={styles.bio}>
              <p>
                Hi, I'm Femi.
              </p>

              <p>
                I've spent the last six years building operational systems across Goldman Sachs, 
                The Carlyle Group, and T. Rowe Price—work that taught me how complex organizations 
                execute, scale, and transform under pressure.
              </p>

              <p>
                But I've never been content just executing inside institutions. I'm drawn to 
                building—whether that's transformation frameworks for global banks or AI-native 
                platforms for hiring and housing. I think in systems, operate with precision, 
                and stay endlessly curious about what's next.
              </p>

              <p>
                Outside of work, I've photographed 30+ countries, documenting how different 
                places solve problems and organize themselves. That global perspective shapes 
                everything I build—reminding me that there's always another way to approach a 
                problem if you're willing to look for it.
              </p>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className={styles.philosophy}>
          <h2 className={styles.sectionTitle}>How I work</h2>
          
          <div className={styles.philosophyContent}>
            <p>
              I approach problems through systems thinking—understanding how components interact, 
              where bottlenecks form, and what happens when you change one variable in a complex 
              environment. That mindset applies whether I'm redesigning operational workflows at 
              Goldman Sachs or building AI platforms from scratch.
            </p>

            <p>
              I've learned that the best solutions balance precision with adaptability. Systems 
              need to be rigorous enough to handle scale and flexible enough to evolve as 
              conditions change. Perfection is often the enemy of resilience.
            </p>

            <p>
              I value execution discipline. Ideas matter, but execution determines whether 
              systems actually work. I've operated in environments where the margin for error 
              is zero, where stakeholder coordination is complex, and where delivery timelines 
              are unforgiving. That taught me how to ship work that holds up under scrutiny.
            </p>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section className={styles.future}>
          <h2 className={styles.sectionTitle}>What's next</h2>
          
          <div className={styles.futureContent}>
            <p>
              I'm building AI-native platforms that rethink foundational processes—hiring, 
              housing, independent work. These aren't theoretical projects. They're systems 
              designed to solve inefficiencies I've experienced firsthand, built with the 
              same rigor I brought to institutional transformation work.
            </p>

            <p>
              Some are in beta. Some are in development. All share the same question: does 
              this solve a real problem in a meaningfully better way?
            </p>

            <p>
              Beyond specific projects, I'm interested in what comes next. How AI changes 
              operational infrastructure. How platforms can combine institutional discipline 
              with startup speed. How systems thinking applies to problems that haven't been 
              solved yet.
            </p>

            <p>
              I'm open to conversations about ventures, collaboration, or just interesting 
              ideas worth exploring. If you're building something that rethinks how systems 
              should work, I'd like to hear about it.
            </p>
          </div>
        </section>

        {/* EDUCATION & BACKGROUND */}
        <section className={styles.background}>
          <h2 className={styles.sectionTitle}>Background</h2>
          
          <div className={styles.backgroundGrid}>
            <div className={styles.backgroundItem}>
              <h3>Education</h3>
              <p>BS in Finance, Economics minor</p>
              <p>Morgan State University</p>
            </div>

            <div className={styles.backgroundItem}>
              <h3>Based</h3>
              <p>New York, NY</p>
              <p>Open to SF / London / Singapore</p>
            </div>

            <div className={styles.backgroundItem}>
              <h3>Interests</h3>
              <p>Systems thinking · AI infrastructure · Global markets · Travel photography · Operational design</p>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className={styles.closing}>
          <p>
            If you're a founder, collaborator, or someone building something interesting, 
            let's connect. I respond to everyone.
          </p>
          <Link href="/contact" className="button">
            Get in touch
          </Link>
        </section>
      </div>
    </main>
  );
}
