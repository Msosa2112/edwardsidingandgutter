"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";

export function ScrollSplitCard({
  className,
  imageSrc,
  mobileImageSrc,
  cards,
  containerRef: externalContainerRef,
  headerText = "The Complete Exterior Envelope // Scroll to Decompose",
  footerText = "One Unified Structure. Three Master Disciplines."
}) {
  const localTargetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeImageSrc = isMobile && mobileImageSrc ? mobileImageSrc : imageSrc;

  const { scrollYProgress } = useScroll({
    target: localTargetRef,
    offset: ["start start", "end end"],
    ...(externalContainerRef ? { container: externalContainerRef } : {})
  });

  // On desktop: spring smooths ratchet wheel clicks.
  // On mobile: direct 1:1 touch response without spring lag or micro-oscillation.
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.2,
    restDelta: 0.001,
  });

  const smoothProgress = isMobile ? scrollYProgress : springProgress;

  // Desktop horizontal split transforms
  const leftX = useTransform(smoothProgress, [0, 0.35, 0.75], [0, -48, -24]);
  const rightX = useTransform(smoothProgress, [0, 0.35, 0.75], [0, 48, 24]);
  const scale = useTransform(smoothProgress, [0, 0.35], [1, 0.92]);

  // 3D Flip (0.35 to 0.75)
  const rotateY = useTransform(smoothProgress, [0.35, 0.75], [0, 180]);
  const rotateZLeft = useTransform(smoothProgress, [0.35, 0.75], [0, 6]);
  const rotateZRight = useTransform(smoothProgress, [0.35, 0.75], [0, -6]);

  // Anti-Flicker Opacity & Z-Index: Completely removes front face when flipped past 90 degrees
  const frontOpacity = useTransform(smoothProgress, [0.48, 0.52], [1, 0]);
  const backOpacity = useTransform(smoothProgress, [0.48, 0.52], [0, 1]);
  const frontZIndex = useTransform(smoothProgress, (p) => (p >= 0.5 ? 0 : 2));
  const backZIndex = useTransform(smoothProgress, (p) => (p >= 0.5 ? 2 : 0));
  const frontPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.5 ? "none" : "auto"));
  const backPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.5 ? "auto" : "none"));

  // Mobile stacked transforms: smoothly transition from 3 vertical slices of the full house into 3 stacked cards
  const mobileCardWidth = useTransform(smoothProgress, [0.35, 0.75], ["33.333%", "100%"]);
  const mobileCardHeight = useTransform(smoothProgress, [0.35, 0.75], ["100%", "31.2%"]);

  const mobileLeftCard1 = useTransform(smoothProgress, [0.35, 0.75], ["33.333%", "0%"]);
  const mobileLeftCard2 = useTransform(smoothProgress, [0.35, 0.75], ["66.666%", "0%"]);

  const mobileYCard0 = useTransform(smoothProgress, [0.35, 0.75], ["0%", "0%"]);
  const mobileYCard1 = useTransform(smoothProgress, [0.35, 0.75], ["0%", "110%"]);
  const mobileYCard2 = useTransform(smoothProgress, [0.35, 0.75], ["0%", "220%"]);

  // Dynamic borders
  const borderRadiusLeft = useTransform(smoothProgress, [0, 0.2], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
  const borderRadiusMiddle = useTransform(smoothProgress, [0, 0.2], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
  const borderRadiusRight = useTransform(smoothProgress, [0, 0.2], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);

  // Elevation and text appearance at the end
  const cardsY = useTransform(smoothProgress, [0.8, 1], [0, -40]);
  const textOpacity = useTransform(smoothProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(smoothProgress, [0.8, 1], [30, 0]);

  // Indicator text appearance at the start
  const startTextOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const startTextY = useTransform(smoothProgress, [0, 0.12], [0, 20]);

  return (
    <div
      ref={localTargetRef}
      className={cn("relative h-[250vh] sm:h-[280vh] w-full bg-transparent", className)}
    >
      <div 
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-3 sm:px-4"
        style={{ perspective: 1200, WebkitPerspective: 1200 }}
      >
        
        {/* Starting Text indicator */}
        <motion.div
          className="absolute top-[4%] sm:top-[6%] md:top-[10%] left-0 right-0 text-center z-20 px-4 pointer-events-none"
          style={{
            opacity: startTextOpacity,
            y: startTextY,
          }}
        >
          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold block mb-1">
            {headerText}
          </span>
          <p className="text-[10px] sm:text-xs text-white/50 font-mono">
            Scroll down to cleave and flip the structure ↓
          </p>
        </motion.div>

        {/* 3-Way Split & 3D Flipping Cards Container */}
        <motion.div
          style={{ 
            scale, 
            y: cardsY, 
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d"
          }}
          className={cn(
            "relative z-10 mx-auto",
            // On mobile: large, high-impact portrait card matching the 3:4 mobile image
            "w-[94vw] max-w-[420px] aspect-[3/4] sm:max-w-md",
            // On desktop: horizontal landscape banner
            "md:w-full md:max-w-5xl md:h-[520px] md:aspect-auto"
          )}
        >
          {cards.slice(0, 3).map((card, i) => {
            // Position calculations for mobile vs desktop
            const cardLeft = isMobile
              ? (i === 0 ? "0%" : i === 1 ? mobileLeftCard1 : mobileLeftCard2)
              : (i === 0 ? "0%" : i === 1 ? "33.333%" : "66.666%");

            const cardWidth = isMobile ? mobileCardWidth : "33.333%";
            const cardHeight = isMobile ? mobileCardHeight : "100%";
            
            const cardY = isMobile
              ? (i === 0 ? mobileYCard0 : i === 1 ? mobileYCard1 : mobileYCard2)
              : 0;

            const cardX = isMobile
              ? 0
              : (i === 0 ? leftX : i === 2 ? rightX : 0);

            const cardRotateZ = isMobile
              ? 0
              : (i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0);

            const cardBorderRadius = i === 0 
              ? borderRadiusLeft 
              : i === 2 
              ? borderRadiusRight 
              : borderRadiusMiddle;

            return (
              <motion.div
                key={i}
                className="absolute cursor-pointer select-none will-change-transform"
                onClick={() => card.onClick?.()}
                style={{
                  left: cardLeft,
                  top: "0%",
                  width: cardWidth,
                  height: cardHeight,
                  x: cardX,
                  y: cardY,
                  rotateY,
                  rotateZ: cardRotateZ,
                  zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {/* Front Side: Original House Image Split */}
                <motion.div
                  className="absolute inset-0 overflow-hidden shadow-2xl"
                  style={{
                    opacity: frontOpacity,
                    zIndex: frontZIndex,
                    pointerEvents: frontPointerEvents,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: cardBorderRadius,
                    transform: "translateZ(1px)",
                    WebkitTransform: "translateZ(1px)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      left: `${-100 * i}%`,
                      width: "300%",
                      backgroundImage: `url(${activeImageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  
                  {/* Subtle front label indicator overlay at bottom only */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-6 pb-2.5 px-2.5 sm:pb-3.5 sm:px-3.5 flex flex-col justify-end pointer-events-none">
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#38bdf8] uppercase tracking-wider font-bold leading-tight">
                      {card.frontLabel || `PART 0${i + 1}`}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-white tracking-tight truncate leading-tight">
                      {card.frontTitle || card.title}
                    </span>
                  </div>
                </motion.div>

                {/* Back Side: Real Trade Craft Card (Siding, Gutters, Roofing) */}
                <motion.div
                  className={cn(
                    "absolute inset-0 overflow-hidden flex flex-col justify-between p-3 sm:p-5 md:p-8 group",
                    "border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  )}
                  style={{
                    opacity: backOpacity,
                    zIndex: backZIndex,
                    pointerEvents: backPointerEvents,
                    backgroundColor: card.bgColor || "#080b11",
                    color: card.textColor || "#ffffff",
                    transform: "rotateY(180deg) translateZ(1px)",
                    WebkitTransform: "rotateY(180deg) translateZ(1px)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: cardBorderRadius,
                  }}
                >
                  {/* Real trade photo background */}
                  {card.image && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50" />
                    </div>
                  )}

                  {/* Top Bar: Icon, Title & Pill */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1 sm:p-2.5 rounded-lg bg-black/50 border border-white/20 shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[8px] sm:text-[10px] text-[#38bdf8] uppercase tracking-wider block font-bold leading-tight">
                          {card.frontLabel || `PART 0${i + 1}`}
                        </span>
                        <h3 className="text-xs sm:text-base md:text-2xl font-black leading-tight tracking-tight text-white">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest opacity-60">
                      DISCIPLINE 0{i + 1}
                    </span>
                  </div>

                  {/* Middle: Description & Technical Specs */}
                  <div className="relative z-10 space-y-1 my-auto">
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/85 line-clamp-1 sm:line-clamp-2 font-light leading-relaxed">
                      {card.description}
                    </p>

                    {card.specs && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {card.specs.slice(0, isMobile ? 2 : 3).map((sp, idx) => (
                          <span 
                            key={idx} 
                            className="text-[8px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-white/95 whitespace-nowrap"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Action CTA */}
                  <div className="relative z-10 pt-1 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[#38bdf8] group-hover:text-white transition-colors">
                      {card.actionText || "Configure Scope →"}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] opacity-60">Select →</span>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Ending Text fixed in the sticky viewport */}
        <motion.div
          className="absolute bottom-[3%] sm:bottom-[6%] md:bottom-[8%] left-0 right-0 text-center z-20 px-4 pointer-events-none"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <p className="text-xs sm:text-lg md:text-2xl font-bold tracking-tight text-white mb-0.5 sm:mb-2">
            {footerText}
          </p>
          <a
            href="#configurator"
            className="pointer-events-auto inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-xs text-[#38bdf8] hover:text-white uppercase tracking-wider underline underline-offset-4 transition-colors"
          >
            Configure your complete exterior scope →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
