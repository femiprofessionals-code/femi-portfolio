'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth scroll using Lenis
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);
}

// Scroll-triggered animations
export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fade in cards on scroll
    const cards = gsap.utils.toArray('.hover-card');
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Hero title animation
    const heroTitleLines = gsap.utils.toArray('.hero-title-line');
    if (heroTitleLines.length > 0) {
      gsap.fromTo(
        heroTitleLines,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }

    // Parallax images
    const parallaxImages = gsap.utils.toArray('.card-image');
    parallaxImages.forEach((image: any) => {
      gsap.fromTo(
        image,
        {
          y: -50,
        },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

// Card hover effects
export function useCardHover() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = document.querySelectorAll('.hover-card');

    cards.forEach((card) => {
      const image = card.querySelector('.card-image');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (image) {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });
  }, []);
}

// Magnetic button effect
export function useMagneticButtons() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const buttons = document.querySelectorAll('.magnetic-button');

    buttons.forEach((button) => {
      const btn = button as HTMLElement;

      btn.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);
}
