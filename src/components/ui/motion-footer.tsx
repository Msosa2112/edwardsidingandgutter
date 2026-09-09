"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground, #ffffff) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground, #ffffff) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background, #080b11) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground, #ffffff) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background, #080b11) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground, #ffffff) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground, #ffffff) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground, #ffffff) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground, #ffffff) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background, #080b11) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground, #ffffff) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive, #ef4444) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive, #ef4444) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground, #ffffff) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground, #ffffff) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary, #38bdf8) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary, #0284c7) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground, #ffffff);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: clamp(3.2rem, 13.5vw, 15vw);
  line-height: 0.85;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(56, 189, 248, 0.35) 60%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.2));
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground, #ffffff) 0%, color-mix(in oklch, var(--foreground, #ffffff) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground, #ffffff) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
export interface CinematicFooterProps {
  logoSrc?: string;
  brandName?: string;
  headingText?: string;
  marqueeItems?: string[];
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  links?: { label: string; href: string }[];
  copyrightText?: string;
  creatorName?: string;
}

const DefaultMarqueeItem = ({ items }: { items?: string[] }) => {
  const displayItems = items || [
    "General Construction & Remodeling",
    "Specialized in Siding",
    "Seamless Gutters",
    "Soffit & Fascia Systems",
    "4+ Years Proven Experience",
    "High-Growth Regional Contractor",
    "Turnkey Porches & Roofing"
  ];
  return (
    <div className="flex items-center space-x-12 px-6">
      {displayItems.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          <span className="text-[#38bdf8]/80">✦</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export function CinematicFooter({
  logoSrc = "/prime-stone-logo.svg",
  brandName = "PRIME STONE",
  headingText = "Ready to build or remodel your home?",
  marqueeItems,
  ctaPrimaryText = "Call (502) 714-3707",
  ctaPrimaryLink = "tel:+15027143707",
  ctaSecondaryText = "WhatsApp Direct",
  ctaSecondaryLink = "https://wa.me/15027143707",
  links = [
    { label: "Free Estimate", href: "#configurator" },
    { label: "House Anatomy", href: "#house-breakdown" },
    { label: "Field Portfolio", href: "#portfolio" },
    { label: "4+ Years Growth", href: "#about-growth" }
  ],
  copyrightText = "© 2026 Prime Stone Builders // General Construction & Remodeling LLC. 4+ Years of Proven Regional Growth across Kentuckiana.",
  creatorName = "Prime Stone Builders"
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "4vh", scale: 0.92, opacity: 0.4 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#080b11] text-white cinematic-footer-wrapper">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background logo / watermark (extends slightly past screen edges) */}
          <div
            ref={giantTextRef}
            className="absolute bottom-[9vh] sm:bottom-[11vh] md:bottom-[7vh] left-1/2 -translate-x-1/2 w-[122vw] sm:w-[114vw] md:w-[106vw] max-w-none pointer-events-none select-none z-0 flex items-center justify-center"
          >
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt={brandName} 
                className="w-full h-auto object-contain opacity-45 sm:opacity-40 filter drop-shadow-[0_0_45px_rgba(56,189,248,0.25)] brightness-110"
              />
            ) : (
              <span className="footer-giant-bg-text whitespace-nowrap text-center">
                {brandName}
              </span>
            )}
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-[#080b11]/80 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[#38bdf8] uppercase">
              <DefaultMarqueeItem items={marqueeItems} />
              <DefaultMarqueeItem items={marqueeItems} />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center text-white"
            >
              {headingText}
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary Call & WhatsApp Links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as="a" href={ctaPrimaryLink} className="footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group">
                  <svg className="w-5 h-5 text-[#38bdf8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {ctaPrimaryText}
                </MagneticButton>
                
                <MagneticButton as="a" href={ctaSecondaryLink} target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-8 sm:px-10 py-4 sm:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group border-emerald-500/30">
                  <svg className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.581 1.777.947 2.8.947 3.179 0 5.765-2.587 5.765-5.766.001-3.18-2.585-5.766-5.769-5.766zm8.813 5.765c-.002 4.873-3.964 8.835-8.814 8.835-1.526 0-2.964-.39-4.225-1.076l-4.705 1.234 1.256-4.588c-.768-1.309-1.18-2.822-1.18-4.405.002-4.873 3.964-8.835 8.814-8.835 4.851 0 8.814 3.962 8.814 8.835z"/>
                  </svg>
                  {ctaSecondaryText}
                </MagneticButton>
              </div>

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                {links.map((link, idx) => (
                  <MagneticButton key={idx} as="a" href={link.href} className="footer-glass-pill px-5 py-2.5 rounded-full text-white/70 font-medium text-xs md:text-sm hover:text-white">
                    {link.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-white/40 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
              {copyrightText}
            </div>



            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-white/60 hover:text-white group order-3"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
