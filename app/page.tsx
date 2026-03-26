'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { useScrollAnimations, useSmoothScroll, useCardHover, useMagneticButtons } from './animations';
import { useState, useEffect } from 'react';
import { HeadshotImage } from './ImageWithFallback';

export default function Home() {
  useScrollAnimations();
  useSmoothScroll();
  useCardHover();
  useMagneticButtons();

  return (
    <main className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroImage}>
              <HeadshotImage />
            </div>
            
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                <span className="hero-title-line">Femi Falade</span>
              </h1>
              
              <p className={`${styles.heroTagline} hero-subtext`}>
                Transformation & Operations Leader
              </p>
              
              <p className={`${styles.heroDescription} hero-description`}>
                Building operational systems across Goldman Sachs, Carlyle, and T. Rowe Price. 
                Creating AI-native ventures. Thinking globally, executing systematically.
              </p>
              
              <div className={styles.heroActions}>
                <Link href="/career" className={`${styles.primaryButton} magnetic-button`}>
                  View Career
                </Link>
                <Link href="/contact" className={`${styles.secondaryButton} magnetic-button`}>
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE OVERVIEW */}
      <section className={`${styles.experience} logos-section`}>
        <div className={styles.container}>
          <p className={styles.experienceLabel}>Experience</p>
          <div className={styles.logoGrid}>
            <div className={`${styles.logoItem} logo-item`}>
              <span className={styles.logoText}>Goldman Sachs</span>
            </div>
            <div className={`${styles.logoItem} logo-item`}>
              <span className={styles.logoText}>Carlyle</span>
            </div>
            <div className={`${styles.logoItem} logo-item`}>
              <span className={styles.logoText}>T. Rowe Price</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className={styles.aboutPreview}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutColumn}>
              <h2 className={styles.sectionTitle}>About</h2>
              <p className={styles.aboutText}>
                Six years building operational systems across three major financial institutions. 
                My work spans transformation, governance, and AI-enabled infrastructure—always 
                focused on creating systems that scale and endure.
              </p>
              <p className={styles.aboutText}>
                Beyond institutions, I'm building AI-native platforms that rethink foundational 
                processes in hiring, housing, and independent work.
              </p>
              <Link href="/about" className={styles.textLink}>
                Read more about my background →
              </Link>
            </div>
            
            <div className={styles.statsColumn}>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>6+</h3>
                <p className={styles.statLabel}>Years experience</p>
              </div>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>3</h3>
                <p className={styles.statLabel}>Major institutions</p>
              </div>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>30+</h3>
                <p className={styles.statLabel}>Countries visited</p>
              </div>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>3</h3>
                <p className={styles.statLabel}>AI ventures building</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER HIGHLIGHTS */}
      <section id="career" className={styles.career}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Career</h2>
            <Link href="/career" className={styles.textLink}>
              View full story →
            </Link>
          </div>

          {/* Goldman Sachs */}
          <div className={`${styles.careerCard} company-card hover-card`}>
            <div className={styles.careerContent}>
              <div className={styles.careerInfo}>
                <span className={styles.companyLogo}>GOLDMAN SACHS</span>
                <h3 className={styles.careerTitle}>Transformation & Operations</h3>
                <p className={styles.careerTimeline}>November 2023 — Present</p>
                <p className={styles.careerDescription}>
                  Building CFTC regulatory governance frameworks and deploying AI-enabled 
                  workflow tools across global banking operations. 60% reduction in 
                  review-cycle times across 60-member transformation team.
                </p>
              </div>
              <div className={`${styles.careerImage} card-image`}>
                <img 
                  src="/images/goldman-screenshot.jpg" 
                  alt="Goldman Sachs"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholderWork} style={{display: 'none'}}>GS</div>
              </div>
            </div>
          </div>

          {/* Carlyle */}
          <div className={`${styles.careerCard} company-card hover-card`}>
            <div className={styles.careerContent}>
              <div className={styles.careerInfo}>
                <span className={styles.companyLogo}>CARLYLE</span>
                <h3 className={styles.careerTitle}>EMEA Fund Operations</h3>
                <p className={styles.careerTimeline}>June 2021 — November 2023</p>
                <p className={styles.careerDescription}>
                  Managed operational infrastructure across ~27 annual private equity 
                  transactions. Redesigned global investor onboarding process adopted 
                  as firm-wide standard.
                </p>
              </div>
              <div className={`${styles.careerImage} card-image`}>
                <img 
                  src="/images/carlyle-screenshot.jpg" 
                  alt="Carlyle"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholderWork} style={{display: 'none'}}>TC</div>
              </div>
            </div>
          </div>

          {/* T. Rowe Price */}
          <div className={`${styles.careerCard} company-card hover-card`}>
            <div className={styles.careerContent}>
              <div className={styles.careerInfo}>
                <span className={styles.companyLogo}>T. ROWE PRICE</span>
                <h3 className={styles.careerTitle}>Investment Operations</h3>
                <p className={styles.careerTimeline}>October 2019 — May 2021</p>
                <p className={styles.careerDescription}>
                  Foundation in institutional operations at $1.5T asset manager. 
                  Trade settlement, position reconciliation, and operational coordination 
                  across global investment platforms.
                </p>
              </div>
              <div className={`${styles.careerImage} card-image`}>
                <img 
                  src="/images/trowe-screenshot.jpg" 
                  alt="T. Rowe Price"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholderWork} style={{display: 'none'}}>TRP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL PROJECTS */}
      <section id="special-projects" className={`${styles.projects} projects-section`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Special Projects</h2>
            <Link href="/special-projects" className={styles.textLink}>
              View all projects →
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            <div className={`${styles.projectCard} hover-card`}>
              <div className={styles.projectHeader}>
                <span className={styles.statusBadge}>Beta Testing</span>
                <h3 className={styles.projectTitle}>AI Hiring Platform</h3>
              </div>
              <p className={styles.projectDescription}>
                AI-native pre-screening platform reducing time-to-hire by 65%. 
                Currently processing 500+ applications/month for SMB clients.
              </p>
              <Link href="/special-projects#ai-hiring" className={styles.projectLink}>
                Learn more →
              </Link>
            </div>

            <div className={`${styles.projectCard} hover-card`}>
              <div className={styles.projectHeader}>
                <span className={styles.statusBadge}>Pre-Launch</span>
                <h3 className={styles.projectTitle}>Renter Matching</h3>
              </div>
              <p className={styles.projectDescription}>
                NYC apartment matching platform with 1,200+ renter waitlist. 
                Launching Q2 2026 with $33M in potential lease value.
              </p>
              <Link href="/special-projects#renter-matching" className={styles.projectLink}>
                Learn more →
              </Link>
            </div>

            <div className={`${styles.projectCard} hover-card`}>
              <div className={styles.projectHeader}>
                <span className={styles.statusBadge}>Alpha Testing</span>
                <h3 className={styles.projectTitle}>Freelance Infrastructure</h3>
              </div>
              <p className={styles.projectDescription}>
                All-in-one platform for freelance operations. Saving users 12+ hours/week 
                on invoicing, contracts, and client management.
              </p>
              <Link href="/special-projects#freelance" className={styles.projectLink}>
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL PREVIEW */}
      <section className={`${styles.travel} travel-section`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Travel & Photography</h2>
              <p className={styles.travelStats}>30 countries · 60+ cities</p>
            </div>
            <Link href="/travel" className={styles.textLink}>
              Explore archive →
            </Link>
          </div>

          <div className={styles.travelGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`${styles.travelImage} travel-image hover-card`}>
                <img 
                  src={`/travel/featured-${i}.jpg`} 
                  alt={`Travel ${i}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className={styles.placeholderTravel} style={{display: 'none'}}>{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className={`${styles.contact} contact-section`}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <h2 className={`${styles.contactTitle} contact-title`}>
              Let's build something together
            </h2>
            <p className={styles.contactText}>
              Open to conversations about ventures, collaboration, advisory work, 
              or just interesting problems worth solving. I respond to everyone 
              within 48 hours.
            </p>
            <div className={styles.contactActions}>
              <Link href="/contact" className={`${styles.primaryButton} magnetic-button`}>
                Get in Touch
              </Link>
              <Link href="https://calendly.com/femifalade" className={`${styles.secondaryButton} magnetic-button`}>
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
