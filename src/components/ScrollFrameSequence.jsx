import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * ScrollFrameSequence
 * Production-quality, high-performance scroll-driven canvas image sequence component.
 * Driven strictly by vertical scroll position -> frame index -> canvas render.
 */
export default function ScrollFrameSequence({
  desktopScrollHeight = '500vh',
  mobileScrollHeight = '450vh',
  totalFrames = 120,
  holdStart = 0.05,
  holdEnd = 0.90,
  smoothing = 0.12,
  breakpoint = '(min-width: 768px)',
  className = ''
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stickyRef = useRef(null);

  // Structural states (do not re-render on scroll)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(breakpoint).matches;
    }
    return true;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('identity'); // 'identity' | 'framing' | 'siding' | 'complete'

  // Animation completion stop latch states
  const [isAtStop, setIsAtStop] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isAtStopRef = useRef(false);
  const isUnlockedRef = useRef(false);
  const userLiftedFingerRef = useRef(false);
  const stopTimestampRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Performance refs (deserialized from React render cycle)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const displayedFrameRef = useRef(null);
  const rafIdRef = useRef(null);
  const imageCacheRef = useRef(new Map());
  const loadingSetRef = useRef(new Set());
  const activeOrientationRef = useRef(isDesktop ? 'desktop' : 'mobile');
  const needsRedrawRef = useRef(true);

  // Helper to format frame path
  const getFrameUrl = useCallback((frameIndex, orientation) => {
    const padded = String(frameIndex).padStart(4, '0');
    return `/frames/${orientation}/frame-${padded}.webp`;
  }, []);

  // Frame calculation based on configurable holds
  const getFrameIndexFromProgress = useCallback((progress) => {
    if (progress <= holdStart) return 1;
    if (progress >= holdEnd) return totalFrames;
    const normalized = (progress - holdStart) / (holdEnd - holdStart);
    return Math.min(totalFrames, Math.max(1, Math.round(normalized * (totalFrames - 1)) + 1));
  }, [holdStart, holdEnd, totalFrames]);

  // Canvas drawing with aspect-ratio-preserving cover scaling
  const drawFrameToCanvas = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    if (cw === 0 || ch === 0 || iw === 0 || ih === 0) return;

    // Cover math: preserve aspect ratio, center image
    const imgAspect = iw / ih;
    const canvasAspect = cw / ch;

    let drawWidth, drawHeight;
    if (canvasAspect > imgAspect) {
      drawWidth = cw;
      drawHeight = cw / imgAspect;
    } else {
      drawHeight = ch;
      drawWidth = ch * imgAspect;
    }

    const offsetX = (cw - drawWidth) / 2;
    const offsetY = (ch - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload a single frame into memory cache
  const preloadFrame = useCallback((frameIndex, orientation, priority = false) => {
    const key = `${orientation}_${frameIndex}`;
    if (imageCacheRef.current.has(key)) {
      return imageCacheRef.current.get(key);
    }
    if (loadingSetRef.current.has(key)) {
      return null;
    }

    loadingSetRef.current.add(key);
    const img = new Image();
    img.src = getFrameUrl(frameIndex, orientation);

    if (priority) {
      img.fetchPriority = 'high';
    }

    img.onload = () => {
      loadingSetRef.current.delete(key);
      imageCacheRef.current.set(key, img);

      // If this matches the currently requested frame or frame 1, flag redraw
      if (frameIndex === 1 && orientation === activeOrientationRef.current) {
        setIsFirstFrameReady(true);
      }
      needsRedrawRef.current = true;
    };

    img.onerror = () => {
      loadingSetRef.current.delete(key);
    };

    return img;
  }, [getFrameUrl]);

  // Load a window of frames centered on the target
  const loadNearbyFrames = useCallback((centerFrame, orientation) => {
    const radiusBefore = 4;
    const radiusAfter = 16;
    const minFrame = Math.max(1, centerFrame - radiusBefore);
    const maxFrame = Math.min(totalFrames, centerFrame + radiusAfter);

    for (let f = minFrame; f <= maxFrame; f++) {
      preloadFrame(f, orientation);
    }
  }, [preloadFrame, totalFrames]);

  // Background loader for the remaining sequence
  const startBackgroundPrefetch = useCallback((orientation) => {
    let frameToLoad = 1;
    const interval = setInterval(() => {
      if (frameToLoad > totalFrames) {
        clearInterval(interval);
        return;
      }
      if (orientation !== activeOrientationRef.current) {
        clearInterval(interval);
        return;
      }
      preloadFrame(frameToLoad, orientation);
      frameToLoad++;
    }, 35);

    return () => clearInterval(interval);
  }, [preloadFrame, totalFrames]);

  // Update canvas pixel dimensions matching CSS layout & devicePixelRatio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      needsRedrawRef.current = true;
    }
  }, []);

  // Find best frame available if target frame is pending download
  const getBestAvailableFrame = useCallback((targetIndex, orientation) => {
    const key = `${orientation}_${targetIndex}`;
    if (imageCacheRef.current.has(key)) {
      return imageCacheRef.current.get(key);
    }

    // Fallback to closest loaded frame to prevent blank frames
    let closestFrame = null;
    let minDistance = Infinity;

    for (let f = 1; f <= totalFrames; f++) {
      const candidateKey = `${orientation}_${f}`;
      if (imageCacheRef.current.has(candidateKey)) {
        const dist = Math.abs(f - targetIndex);
        if (dist < minDistance) {
          minDistance = dist;
          closestFrame = imageCacheRef.current.get(candidateKey);
        }
      }
    }

    return closestFrame;
  }, [totalFrames]);

  // Scroll listener (Calculates scroll progress into targetProgressRef with stop latch)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;

    if (totalScrollable <= 0) {
      targetProgressRef.current = 0;
      return;
    }

    const currentScrollY = window.scrollY;
    const maxHeroScroll = totalScrollable;

    // Check if user has reached the end of the animation sequence
    if (!isUnlockedRef.current) {
      if (currentScrollY >= maxHeroScroll - 2) {
        if (!isAtStopRef.current) {
          isAtStopRef.current = true;
          setIsAtStop(true);
          stopTimestampRef.current = Date.now();
          userLiftedFingerRef.current = false;
        }

        // Clamp right at the end of the animation so it doesn't bleed into <main>
        if (currentScrollY > maxHeroScroll) {
          window.scrollTo(0, maxHeroScroll);
        }
      } else if (currentScrollY < maxHeroScroll - 60) {
        if (isAtStopRef.current) {
          isAtStopRef.current = false;
          setIsAtStop(false);
        }
      }
    } else {
      // Re-arm the stop latch if the user scrolls far back up into the animation
      if (currentScrollY < maxHeroScroll - 140) {
        isUnlockedRef.current = false;
        setIsUnlocked(false);
        isAtStopRef.current = false;
        setIsAtStop(false);
      }
    }

    // Progress: 0 (top of section reaches top) to 1 (bottom reaches viewport bottom)
    const rawProgress = -rect.top / totalScrollable;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    targetProgressRef.current = clampedProgress;
  }, []);

  // Event listener for touch and wheel gesture detection to enforce "scroll again"
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getMaxHeroScroll = () => {
      return container.offsetHeight - window.innerHeight;
    };

    // Mobile touch tracking
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      if (isAtStopRef.current && !isUnlockedRef.current) {
        // User has lifted their finger after reaching the end!
        userLiftedFingerRef.current = true;
      }
    };

    const onTouchMove = (e) => {
      if (!isAtStopRef.current || isUnlockedRef.current) return;
      if (!e.touches || e.touches.length === 0) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY; // positive = swipe up = scroll down

      if (!userLiftedFingerRef.current) {
        // Still in the scroll gesture that reached the end -> stop momentum!
        if (deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, getMaxHeroScroll());
        }
      } else {
        // User lifted finger and is now swiping AGAIN -> Unlock and continue!
        if (deltaY > 10) {
          isUnlockedRef.current = true;
          setIsUnlocked(true);
          isAtStopRef.current = false;
          setIsAtStop(false);
        }
      }
    };

    // Desktop wheel tracking
    const onWheel = (e) => {
      // If user scrolls up, always allow and reset latch
      if (e.deltaY < 0) {
        if (isAtStopRef.current) {
          isAtStopRef.current = false;
          setIsAtStop(false);
        }
        return;
      }

      if (isAtStopRef.current && !isUnlockedRef.current) {
        const elapsed = Date.now() - stopTimestampRef.current;
        if (elapsed < 350) {
          // Absorb initial wheel momentum burst
          e.preventDefault();
          window.scrollTo(0, getMaxHeroScroll());
        } else {
          // User paused and wheeled AGAIN -> Unlock and continue!
          isUnlockedRef.current = true;
          setIsUnlocked(true);
          isAtStopRef.current = false;
          setIsAtStop(false);
        }
      }
    };

    // Anchor click handler so nav links are never trapped
    const onDocClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], button');
      if (anchor) {
        isUnlockedRef.current = true;
        setIsUnlocked(true);
        isAtStopRef.current = false;
        setIsAtStop(false);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('click', onDocClick);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  // Responsive orientation listener
  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateOrientation = (e) => {
      const desktopNow = e.matches;
      setIsDesktop(desktopNow);
      const newOrientation = desktopNow ? 'desktop' : 'mobile';
      activeOrientationRef.current = newOrientation;

      // Preload the corresponding frame for current progress
      const targetFrame = getFrameIndexFromProgress(currentProgressRef.current);
      preloadFrame(targetFrame, newOrientation, true);
      loadNearbyFrames(targetFrame, newOrientation);

      needsRedrawRef.current = true;
      resizeCanvas();
    };

    const updateMotion = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    setPrefersReducedMotion(motionQuery.matches);
    mediaQuery.addEventListener('change', updateOrientation);
    motionQuery.addEventListener('change', updateMotion);

    return () => {
      mediaQuery.removeEventListener('change', updateOrientation);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, [breakpoint, getFrameIndexFromProgress, preloadFrame, loadNearbyFrames, resizeCanvas]);

  // Handle window resize and scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [handleScroll, resizeCanvas]);

  // Initialize initial frames and start prefetching
  useEffect(() => {
    const orientation = activeOrientationRef.current;

    // Frame 1 immediate high priority
    preloadFrame(1, orientation, true);
    // Final frame (completed house) high priority
    preloadFrame(totalFrames, orientation, false);
    // Initial batch [1..24] for immediate responsive scroll
    for (let i = 1; i <= Math.min(24, totalFrames); i++) {
      preloadFrame(i, orientation, false);
    }

    // Background prefetch remainder
    const cancelPrefetch = startBackgroundPrefetch(orientation);

    return () => {
      cancelPrefetch();
    };
  }, [preloadFrame, startBackgroundPrefetch, totalFrames]);

  // Main Render Loop with requestAnimationFrame
  useEffect(() => {
    let lastReportedPercent = -1;
    let lastReportedPhase = '';

    const renderLoop = () => {
      // Lerp smoothing
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * smoothing;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      const targetFrame = getFrameIndexFromProgress(p);
      const orientation = activeOrientationRef.current;

      // Check if frame changed or needs redraw
      if (displayedFrameRef.current !== targetFrame || needsRedrawRef.current) {
        const imgToDraw = getBestAvailableFrame(targetFrame, orientation);
        if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
          drawFrameToCanvas(imgToDraw);
          displayedFrameRef.current = targetFrame;
          needsRedrawRef.current = false;
        }

        // Keep loading adjacent frames
        loadNearbyFrames(targetFrame, orientation);
      }

      // Update Phase & Progress for HUD (throttled by integer percentage)
      const currentPercent = Math.round(p * 100);
      if (currentPercent !== lastReportedPercent) {
        lastReportedPercent = currentPercent;
        setDisplayProgress(currentPercent);

        let newPhase = 'identity';
        if (p >= 0.88) {
          newPhase = 'remodeling';
        } else if (p >= 0.65) {
          newPhase = 'roofing';
        } else if (p >= 0.35) {
          newPhase = 'gutters';
        } else if (p >= 0.08) {
          newPhase = 'siding';
        }

        if (newPhase !== lastReportedPhase) {
          lastReportedPhase = newPhase;
          setCurrentPhase(newPhase);
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [smoothing, getFrameIndexFromProgress, getBestAvailableFrame, drawFrameToCanvas, loadNearbyFrames]);

  // Smooth jump past the animation
  const scrollToRelease = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.height - window.innerHeight + 60;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  const unlockAndRelease = useCallback(() => {
    isUnlockedRef.current = true;
    setIsUnlocked(true);
    isAtStopRef.current = false;
    setIsAtStop(false);
    scrollToRelease();
  }, [scrollToRelease]);

  const containerHeight = isDesktop ? desktopScrollHeight : mobileScrollHeight;

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full z-20 ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Sticky Canvas Viewport (stays fixed during scroll) */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0f1d] flex items-center justify-center select-none z-20"
      >
        {/* Canvas Engine */}
        <canvas 
          ref={canvasRef}
          className="w-full h-full block pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Fallback skeleton if first frame is still loading */}
        {!isFirstFrameReady && (
          <div className="absolute inset-0 bg-[#0a0f1d] flex flex-col items-center justify-center text-white/70 space-y-4 z-10">
            <div className="w-12 h-12 border-3 border-[#38bdf8] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center space-y-1">
              <p className="text-sm uppercase tracking-widest text-[#38bdf8] font-bold">
                Prime Stone Builders
              </p>
              <p className="text-xs text-white/50">
                Initializing Cinematic Sequence...
              </p>
            </div>
          </div>
        )}

        {/* Minimalist Storytelling & Interactive HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end px-4 py-4 sm:p-6 md:p-12 z-30 pb-6 sm:pb-8 md:pb-12">

          {/* Lower Dynamic Storytelling Text (Minimalist, No Background Box) */}
          <div className="w-full max-w-xl mx-auto text-center pointer-events-none px-2 mb-3 sm:mb-4 md:mb-5 transition-all duration-500">
            
            {/* Phase 0: Identity Cue */}
            {currentPhase === 'identity' && (
              <div className="space-y-1 transition-opacity duration-500">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#38bdf8] tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Prime Stone Builders
                </span>
                <p className="text-[11px] sm:text-xs md:text-sm text-white/80 max-w-xs sm:max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-light leading-snug">
                  Scroll forward to witness the architectural transformation.
                </p>
              </div>
            )}

            {/* Card 1: Siding */}
            {currentPhase === 'siding' && (
              <div className="space-y-1 transition-opacity duration-500">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#38bdf8] tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Architectural Exterior
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] tracking-wide">
                  Siding
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-white/85 max-w-xs sm:max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-light leading-relaxed">
                  Engineered James Hardie, fiber cement, and vertical Board &amp; Batten siding.
                </p>
              </div>
            )}

            {/* Card 2: Gutters */}
            {currentPhase === 'gutters' && (
              <div className="space-y-1 transition-opacity duration-500">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#38bdf8] tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Seamless Drainage
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] tracking-wide">
                  Gutters
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-white/85 max-w-xs sm:max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-light leading-relaxed">
                  Custom 5" &amp; 6" seamless aluminum gutters extruded on-site with leaf protection.
                </p>
              </div>
            )}

            {/* Card 3: Roofing */}
            {currentPhase === 'roofing' && (
              <div className="space-y-1 transition-opacity duration-500">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#38bdf8] tracking-[0.22em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Storm Protection
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] tracking-wide">
                  Roofing
                </h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-white/85 max-w-xs sm:max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-light leading-relaxed">
                  Heavy-duty 50-year architectural shingles and standing seam metal roof accents.
                </p>
              </div>
            )}

            {/* Phase 4: General Construction & Remodeling */}
            {currentPhase === 'remodeling' && (
              <div className="space-y-1 transition-opacity duration-500">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 tracking-[0.22em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  Turnkey Contracting
                </span>
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  General Construction &amp; Remodeling
                </h2>
                <p className="text-[11px] sm:text-xs text-white/80 max-w-xs sm:max-w-md mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] font-light leading-snug">
                  From custom stone masonry and decks to full residential and commercial exterior renovations.
                </p>
              </div>
            )}

          </div>

          {/* Bottom Interactive Scroll Indicator & Progress Bar */}
          <div className="flex flex-col items-center justify-center w-full max-w-xs mx-auto space-y-1.5">
            
            {/* Scroll Direction Cue */}
            {isAtStop && !isUnlocked ? (
              <button 
                type="button"
                onClick={unlockAndRelease}
                className="pointer-events-auto flex items-center gap-1.5 text-[#38bdf8] hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest cursor-pointer py-0.5 animate-pulse"
              >
                <span>Scroll again to explore</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] text-[10px] sm:text-[11px]">
                <ChevronDown className="w-3 h-3 text-[#38bdf8] animate-bounce" />
                <span className="font-semibold uppercase tracking-wider">
                  Scroll to build • {displayProgress}%
                </span>
              </div>
            )}

            {/* Micro Progress Bar */}
            <div className="w-28 sm:w-36 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-lg">
              <div 
                className="h-full bg-[#38bdf8] transition-all duration-100 ease-out"
                style={{ width: `${displayProgress}%` }}
              ></div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
