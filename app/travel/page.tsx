'use client';

import styles from './page.module.css';
import { useState } from 'react';

export default function Travel() {
  const cities = [
    { name: 'Paris, France', count: 12, slug: 'paris' },
    { name: 'Tokyo, Japan', count: 15, slug: 'tokyo' },
    { name: 'London, UK', count: 10, slug: 'london' },
    { name: 'Barcelona, Spain', count: 8, slug: 'barcelona' },
    { name: 'Istanbul, Turkey', count: 9, slug: 'istanbul' },
    { name: 'Marrakech, Morocco', count: 7, slug: 'marrakech' },
    { name: 'Kyoto, Japan', count: 11, slug: 'kyoto' },
    { name: 'New York, USA', count: 14, slug: 'newyork' },
    { name: 'Dubai, UAE', count: 6, slug: 'dubai' },
    { name: 'Singapore', count: 8, slug: 'singapore' },
    { name: 'Copenhagen, Denmark', count: 7, slug: 'copenhagen' },
    { name: 'Lagos, Nigeria', count: 13, slug: 'lagos' },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* INTRO */}
        <section className={styles.intro}>
          <h1 className={styles.title}>Travel & Photography</h1>
          
          <div className={styles.stats}>
            <span className={styles.stat}>30 countries</span>
            <span className={styles.separator}>·</span>
            <span className={styles.stat}>60+ cities</span>
          </div>

          <p className={styles.philosophy}>
            Travel isn't just about seeing new places—it's about understanding how different 
            cultures solve problems, organize themselves, and create meaning. Every city teaches 
            something about systems, design, and the many ways human beings choose to live.
          </p>

          <p className={styles.philosophy}>
            I photograph what reveals character: architecture that reflects values, markets 
            that show how commerce flows, streets that demonstrate how people actually move. 
            These aren't postcards. They're field notes from a systems thinker learning how 
            the world works.
          </p>
        </section>

        {/* FEATURED VIDEO */}
        <section className={styles.videoSection}>
          <h2 className={styles.sectionTitle}>Travel Highlight Reel</h2>
          
          <div className={styles.videoContainer}>
            <video 
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
              controls
              poster="/travel/video-poster.jpg"
            >
              <source src="/travel/travel-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className={styles.videoCaption}>
              A cinematic journey through 30 countries and 60+ cities
            </div>
          </div>
        </section>

        {/* FEATURED CITIES */}
        <section className={styles.cities}>
          <h2 className={styles.sectionTitle}>Featured Cities</h2>
          
          <div className={styles.cityGrid}>
            {cities.map((city) => (
              <div key={city.name} className={styles.cityCard}>
                <div className={styles.cityImage}>
                  <img 
                    src={`/travel/cities/${city.slug}.jpg`}
                    alt={city.name}
                    className={styles.cityPhoto}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                  <div className={styles.imagePlaceholder} style={{display: 'none'}}>
                    {city.name.split(',')[0]}
                  </div>
                  <div className={styles.cityOverlay}>
                    <h3 className={styles.cityName}>{city.name}</h3>
                    <p className={styles.photoCount}>{city.count} photos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SAMPLE CITY NARRATIVES */}
        <section className={styles.narratives}>
          <h2 className={styles.sectionTitle}>City Notes</h2>

          <div className={styles.narrative}>
            <h3 className={styles.narrativeCity}>Kyoto, Japan</h3>
            <p className={styles.narrativeText}>
              Kyoto taught me the value of intentional design. Temples built to frame specific 
              views. Gardens designed to shift with seasons. Spaces that reward slowness. Every 
              detail considered. Every corner deliberate. A city that proves systems thinking 
              can create beauty.
            </p>
          </div>

          <div className={styles.narrative}>
            <h3 className={styles.narrativeCity}>Marrakech, Morocco</h3>
            <p className={styles.narrativeText}>
              Organized chaos. The medina operates on its own logic—alleyways that lead nowhere 
              and everywhere, markets that negotiate in three languages, a city that reveals 
              itself slowly if you're willing to wander. Efficiency isn't always the goal. 
              Sometimes the system is the experience.
            </p>
          </div>

          <div className={styles.narrative}>
            <h3 className={styles.narrativeCity}>Singapore</h3>
            <p className={styles.narrativeText}>
              A masterclass in systems optimization. Every inch planned. Every flow measured. 
              Gardens in the sky. Transport that actually works. Singapore proves that rigorous 
              planning doesn't have to feel sterile—it can create possibility if you design 
              for people, not just efficiency.
            </p>
          </div>

          <div className={styles.narrative}>
            <h3 className={styles.narrativeCity}>Lagos, Nigeria</h3>
            <p className={styles.narrativeText}>
              Lagos moves at its own pace. Infrastructure adapts in real-time. Entrepreneurs 
              build solutions faster than governments can regulate them. The city taught me 
              that resilience often matters more than perfection, and that informal systems 
              can be surprisingly sophisticated when you understand their logic.
            </p>
          </div>
        </section>

        {/* CLOSING */}
        <section className={styles.closing}>
          <p>
            More cities. More photos. More stories about how different places solve universal 
            problems. The archive grows every time I travel.
          </p>
          <a href="/#contact" className="button">
            Let's connect
          </a>
        </section>
      </div>
    </main>
  );
}
