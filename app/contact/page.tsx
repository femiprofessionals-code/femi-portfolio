import styles from './page.module.css';

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* INTRO */}
        <section className={styles.intro}>
          <h1 className={styles.title}>Let's build <em>together</em></h1>
          
          <p className={styles.subtitle}>
            I advise startups, mentor founders, and regularly connect with motivated leaders 
            who have a point of view. Always open to conversations about ventures, collaboration, 
            or interesting problems worth solving.
          </p>
        </section>

        {/* WHAT TO REACH OUT ABOUT */}
        <section className={styles.reasons}>
          <h2 className={styles.sectionTitle}>What to reach out about</h2>
          
          <div className={styles.reasonsGrid}>
            <div className={styles.reason}>
              <h3>Venture opportunities</h3>
              <p>Building something? Looking for operational expertise or strategic thinking? Let's talk.</p>
            </div>

            <div className={styles.reason}>
              <h3>Collaboration</h3>
              <p>Exploring partnerships, joint ventures, or building something together.</p>
            </div>

            <div className={styles.reason}>
              <h3>Consulting & advisory</h3>
              <p>Transformation projects, operational design, AI implementation strategy.</p>
            </div>

            <div className={styles.reason}>
              <h3>Speaking & content</h3>
              <p>Podcasts, conferences, panel discussions about systems thinking and operational excellence.</p>
            </div>

            <div className={styles.reason}>
              <h3>Photography projects</h3>
              <p>Editorial travel photography, brand collaborations, commissions.</p>
            </div>

            <div className={styles.reason}>
              <h3>Interesting ideas</h3>
              <p>Sometimes the best conversations start with "I've been thinking about..." Just reach out.</p>
            </div>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <section className={styles.methods}>
          <h2 className={styles.sectionTitle}>How to reach me</h2>
          
          <div className={styles.methodsGrid}>
            <div className={styles.method}>
              <h3>Email</h3>
              <a href="mailto:hello@femifalade.com" className={styles.methodLink}>
                hello@femifalade.com
              </a>
              <p className={styles.methodNote}>Best for detailed proposals or longer conversations</p>
            </div>

            <div className={styles.method}>
              <h3>Schedule a call</h3>
              <a href="https://calendly.com/femifalade" className={styles.methodLink} target="_blank" rel="noopener noreferrer">
                Book 30 minutes
              </a>
              <p className={styles.methodNote}>For quick discussions or initial intros</p>
            </div>

            <div className={styles.method}>
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/femifalade" className={styles.methodLink} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
              <p className={styles.methodNote}>Professional network and updates</p>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className={styles.form}>
          <h2 className={styles.sectionTitle}>Send a message</h2>
          
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="What's this about?"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={8} 
                required 
                placeholder="Tell me more..."
              />
            </div>

            <button type="submit" className="button">
              Send message
            </button>
          </form>

          <p className={styles.formNote}>
            I respond to everyone within 48 hours. If your message is time-sensitive, 
            mention that in the subject line and I'll prioritize it.
          </p>
        </section>
      </div>
    </main>
  );
}
