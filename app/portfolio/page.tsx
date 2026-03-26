'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Portfolio() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password: FemiAI2026 (you can change this)
    if (password === 'FemiAI2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className={styles.main}>
        <div className={styles.lockScreen}>
          <div className={styles.lockContent}>
            <div className={styles.lockIcon}>🔒</div>
            <h1 className={styles.lockTitle}>Portfolio Access</h1>
            <p className={styles.lockDescription}>
              This page contains detailed portfolio materials and resume. 
              Please enter the password to continue.
            </p>
            
            <form onSubmit={handleSubmit} className={styles.lockForm}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={styles.passwordInput}
                autoFocus
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.unlockButton}>
                Unlock Portfolio
              </button>
            </form>
            
            <p className={styles.lockNote}>
              Need access? <a href="/contact">Contact me</a> to request the password.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* HEADER */}
        <section className={styles.header}>
          <h1 className={styles.title}>Portfolio & Resume</h1>
          <p className={styles.subtitle}>
            Comprehensive overview of experience, projects, and credentials
          </p>
        </section>

        {/* RESUME DOWNLOAD */}
        <section className={styles.resumeSection}>
          <div className={styles.resumeCard}>
            <div className={styles.resumeIcon}>📄</div>
            <div className={styles.resumeInfo}>
              <h3>Download Resume</h3>
              <p>Complete professional resume in PDF format</p>
            </div>
            <a 
              href="/resume.pdf" 
              download 
              className={styles.downloadButton}
            >
              Download PDF
            </a>
          </div>
        </section>

        {/* PORTFOLIO MATERIALS */}
        <section className={styles.materialsSection}>
          <h2 className={styles.sectionTitle}>Portfolio Materials</h2>
          
          <div className={styles.materialsGrid}>
            <div className={styles.materialCard}>
              <h3>Work Samples</h3>
              <p>Case studies and project documentation from Goldman Sachs, Carlyle, and T. Rowe Price</p>
              <a href="#" className={styles.materialLink}>View Samples →</a>
            </div>

            <div className={styles.materialCard}>
              <h3>Presentations</h3>
              <p>Strategic presentations and transformation frameworks</p>
              <a href="#" className={styles.materialLink}>View Presentations →</a>
            </div>

            <div className={styles.materialCard}>
              <h3>Certifications</h3>
              <p>Professional certifications and credentials</p>
              <a href="#" className={styles.materialLink}>View Certificates →</a>
            </div>

            <div className={styles.materialCard}>
              <h3>References</h3>
              <p>Professional references available upon request</p>
              <a href="/contact" className={styles.materialLink}>Request References →</a>
            </div>
          </div>
        </section>

        {/* DETAILED EXPERIENCE */}
        <section className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}>Detailed Experience</h2>
          
          <div className={styles.experienceCard}>
            <h3>Goldman Sachs</h3>
            <p className={styles.role}>Senior Associate, Global Banking & Markets Transformation</p>
            <p className={styles.timeline}>November 2023 — Present · New York, NY</p>
            <ul className={styles.achievements}>
              <li>Built CFTC regulatory governance framework from scratch</li>
              <li>Deployed AI-enabled workflow tool adopted by 60-member team</li>
              <li>Achieved 60% reduction in review-cycle times</li>
              <li>Coordinated across technology, compliance, and operations divisions</li>
            </ul>
          </div>

          <div className={styles.experienceCard}>
            <h3>The Carlyle Group</h3>
            <p className={styles.role}>Associate, EMEA Fund Operations</p>
            <p className={styles.timeline}>June 2021 — November 2023 · London, UK</p>
            <ul className={styles.achievements}>
              <li>Managed operational infrastructure across ~27 annual private equity transactions</li>
              <li>Redesigned investor onboarding process adopted as global standard</li>
              <li>Coordinated deal execution across fund managers, legal, and compliance teams</li>
              <li>Built scalable workflows for high-volume transaction processing</li>
            </ul>
          </div>

          <div className={styles.experienceCard}>
            <h3>T. Rowe Price</h3>
            <p className={styles.role}>Operations Analyst, Investment Operations</p>
            <p className={styles.timeline}>October 2019 — May 2021 · Baltimore, MD</p>
            <ul className={styles.achievements}>
              <li>Trade settlement and position reconciliation for $1.5T asset manager</li>
              <li>Operational coordination across global investment platforms</li>
              <li>Foundation in institutional operations and back-office infrastructure</li>
            </ul>
          </div>
        </section>

        {/* EDUCATION & SKILLS */}
        <section className={styles.credentialsSection}>
          <div className={styles.credentialsGrid}>
            <div>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.credentialCard}>
                <h3>Morgan State University</h3>
                <p>Bachelor of Science in Finance</p>
                <p>Minor in Economics</p>
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Core Skills</h2>
              <div className={styles.skillsGrid}>
                <span className={styles.skill}>Operational Transformation</span>
                <span className={styles.skill}>Process Design</span>
                <span className={styles.skill}>Governance Frameworks</span>
                <span className={styles.skill}>AI Implementation</span>
                <span className={styles.skill}>Cross-functional Coordination</span>
                <span className={styles.skill}>Strategic Planning</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
