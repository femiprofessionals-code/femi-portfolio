import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.name}>Femi Falade</span>
          <span className={styles.separator}>—</span>
          <span className={styles.title}>Transformation & Operations</span>
        </Link>
        
        <div className={styles.links}>
          <Link href="/#career">Career</Link>
          <Link href="/#special-projects">Special Projects</Link>
          <Link href="/travel">Travel</Link>
          <Link href="/about">About</Link>
          <Link href="/portfolio" className={styles.portfolioLink}>Portfolio</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
