import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollCoordinator
 * 
 * 1. Global ultra-smooth physics via Lenis + GSAP ScrollTrigger sync:
 *    - Eased wheel scrolling with zero-latency ScrollTrigger updates
 *    - Native GPU momentum untouched on mobile touch devices
 * 
 * 2. Section Milestone Protection ("Anti-Skip Kinetic Guard"):
 *    - Prevents accidental skips past major interactive milestones
 *    - Gentle / slow scrubs remain 100% free and pixel-accurate.
 */
export default function SmoothScrollCoordinator() {
  const lenisRef = useRef(null);
  const isLockingRef = useRef(false);

  useEffect(() => {
    // Only initialize Lenis on desktop / pointer devices.
    // Mobile touch devices have 120Hz native GPU momentum and should NOT be intercepted.
    const isTouch = 
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0) || window.innerWidth < 768);

    if (isTouch) {
      return;
    }

    // Initialize Lenis with custom luxury momentum parameters for desktop mouse wheel
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
      virtualScroll: (data) => {
        const delta = data.deltaY;
        if (!delta || Math.abs(delta) < 6) return true;

        // If we are currently executing a milestone settle, let it finish cleanly
        if (isLockingRef.current) return true;

        const currentScroll = lenis.scroll;
        const targetScroll = lenis.targetScroll + delta;
        const wh = window.innerHeight;

        // Dynamic element boundaries
        const heroEl = document.getElementById('hero-sequence');
        const houseEl = document.getElementById('house-breakdown');

        // Milestones: where each sticky section rests at completion
        const heroMilestone = heroEl ? Math.max(0, heroEl.offsetTop + heroEl.offsetHeight - wh) : 0;
        const houseMilestone = houseEl ? Math.max(0, houseEl.offsetTop + houseEl.offsetHeight - wh) : 0;

        const BUFFER = 40; // Threshold zone to allow moving to next stage

        const snapTo = (targetPos) => {
          isLockingRef.current = true;
          lenis.scrollTo(targetPos, { 
            duration: 0.9,
            onComplete: () => {
              setTimeout(() => {
                isLockingRef.current = false;
              }, 120);
            }
          });
        };

        // --- SCROLLING DOWN (FORWARD) ---
        if (delta > 0) {
          // Inside Hero, attempting to skip past Hero milestone (Frame 120 + Logo)
          if (heroMilestone > 0 && currentScroll < heroMilestone - BUFFER && targetScroll > heroMilestone) {
            snapTo(heroMilestone);
            return false;
          }

          // Inside House Breakdown, attempting to skip past 3 Cards milestone
          if (
            houseMilestone > 0 &&
            currentScroll >= heroMilestone - BUFFER &&
            currentScroll < houseMilestone - BUFFER &&
            targetScroll > houseMilestone
          ) {
            snapTo(houseMilestone);
            return false;
          }
        }

        // --- SCROLLING UP (REVERSE) ---
        if (delta < 0) {
          // Inside House Breakdown, attempting to skip past Hero milestone upwards
          if (heroMilestone > 0 && currentScroll > heroMilestone + BUFFER && targetScroll < heroMilestone) {
            snapTo(heroMilestone);
            return false;
          }
        }

        return true;
      }
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP's ticker for perfectly synchronized frame rendering
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Smooth navigation anchor interception
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { 
              duration: 1.3,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      gsap.ticker.remove(updateLenis);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.destroy();
    };
  }, []);

  return null;
}
