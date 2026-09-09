"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";

export const HeroParallax = ({
  products,
  onSelectProject,
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smooth desktop spring (mass 0.4, stiffness 120, damping 26) - zero bounce oscillation.
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Mobile uses direct hardware-accelerated scrollYProgress for instant 120Hz/60Hz touch response.
  // Desktop uses springProgress for smooth mouse wheel interpolation.
  const activeProgress = isMobile ? scrollYProgress : springProgress;

  // Mobile transforms: calibrated for 390px-768px viewports to eliminate black void and avoid off-screen clipping
  const translateXMobile = useTransform(activeProgress, [0, 1], [0, 260]);
  const translateXReverseMobile = useTransform(activeProgress, [0, 1], [0, -260]);
  const translateYMobile = useTransform(activeProgress, [0, 1], [0, 50]);
  const rotateXMobile = useTransform(activeProgress, [0, 1], [0, 0]);
  const rotateZMobile = useTransform(activeProgress, [0, 1], [0, 0]);
  const opacityMobile = useTransform(activeProgress, [0, 0.15], [0.6, 1]);

  // Desktop transforms: full cinematic 3D perspective stream
  const translateXDesktop = useTransform(activeProgress, [0, 1], [0, 800]);
  const translateXReverseDesktop = useTransform(activeProgress, [0, 1], [0, -800]);
  const translateYDesktop = useTransform(activeProgress, [0, 0.85], [-220, 260]);
  const rotateXDesktop = useTransform(activeProgress, [0, 0.25], [14, 0]);
  const rotateZDesktop = useTransform(activeProgress, [0, 0.25], [16, 0]);
  const opacityDesktop = useTransform(activeProgress, [0, 0.2], [0.25, 1]);

  const translateX = isMobile ? translateXMobile : translateXDesktop;
  const translateXReverse = isMobile ? translateXReverseMobile : translateXReverseDesktop;
  const translateY = isMobile ? translateYMobile : translateYDesktop;
  const rotateX = isMobile ? rotateXMobile : rotateXDesktop;
  const rotateZ = isMobile ? rotateZMobile : rotateZDesktop;
  const opacity = isMobile ? opacityMobile : opacityDesktop;

  return (
    <div
      ref={ref}
      className="h-[130vh] sm:h-[170vh] md:h-[230vh] lg:h-[280vh] py-8 sm:py-16 md:py-24 overflow-hidden antialiased relative flex flex-col self-auto md:[perspective:1000px] md:[transform-style:preserve-3d] bg-[#080b11] select-none"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-14 lg:space-x-20 mb-4 sm:mb-8 md:mb-14 lg:mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-4 sm:mb-8 md:mb-14 lg:mb-20 space-x-4 sm:space-x-8 md:space-x-14 lg:space-x-20">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-14 lg:space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-6 sm:py-12 md:py-20 px-4 sm:px-8 md:px-12 w-full left-0 top-0 z-10">
      <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold mb-2 sm:mb-4">
        <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
        4+ Years Proven Experience // High-Growth Field Contractor
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
        General Construction <br />
        <span className="text-[#38bdf8]">&amp; Remodeling.</span>
      </h1>
      <p className="max-w-3xl text-xs sm:text-sm md:text-base mt-3 sm:mt-6 text-white/70 font-light leading-relaxed">
        A young, high-growth construction powerhouse with over <span className="text-white font-semibold">4 years of battle-tested field experience</span> across Kentuckiana. Specialized in <span className="text-[#38bdf8] font-semibold">Siding, Seamless Gutters, Soffit, and Fascia</span>, alongside turnkey residential remodeling and structural additions.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  onSelectProject,
  isMobile,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={isMobile ? undefined : {
        y: -20,
      }}
      onClick={() => onSelectProject && onSelectProject(product)}
      className="group/product h-44 sm:h-60 md:h-80 lg:h-96 w-[15rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] relative shrink-0 cursor-pointer rounded-none border-0 overflow-hidden bg-black"
    >
      <div className="block h-full w-full rounded-none border-0">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-none border-0"
          alt={product.title}
          loading="lazy"
        />
      </div>

      {/* Hover Overlay with Pure Architectural Information (Desktop) */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-85 bg-black transition-opacity duration-300 pointer-events-none rounded-none border-0 flex flex-col justify-between p-4 sm:p-6" />

      {/* Top Details (Visible on Hover) */}
      <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#38bdf8] font-bold bg-black/80 px-2.5 py-1">
          {product.discipline || "Field Installation"}
        </span>
        {product.location && (
          <span className="font-mono text-[9px] sm:text-[10px] text-white/80 bg-black/80 px-2.5 py-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#38bdf8]" />
            {product.location}
          </span>
        )}
      </div>

      {/* Bottom Title & Specs (Visible on Hover) */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10 space-y-1">
        <h2 className="text-sm sm:text-lg md:text-xl font-black text-white leading-snug">
          {product.title}
        </h2>
        {product.specs && (
          <p className="text-[9px] sm:text-xs text-white/70 font-mono line-clamp-1">
            {product.specs.join(" • ")}
          </p>
        )}
      </div>

      {/* Hover Inspect Icon Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 text-[#38bdf8] flex items-center justify-center opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Subtle Mobile Minimal Tag */}
      <div className="md:hidden absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
        <span className="bg-black/75 backdrop-blur-sm text-white/90 text-[10px] font-bold px-2 py-0.5 truncate max-w-[70%]">
          {product.title}
        </span>
        <span className="bg-[#38bdf8]/90 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5">
          {product.discipline?.split(" ")[0] || "Spec"}
        </span>
      </div>
    </motion.div>
  );
};
