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
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[280vh] sm:h-[300vh] py-20 sm:py-36 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#080b11] select-none"
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
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-14 md:space-x-20 mb-8 sm:mb-14 md:mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 sm:mb-14 md:mb-20 space-x-8 sm:space-x-14 md:space-x-20">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 sm:space-x-14 md:space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              onSelectProject={onSelectProject}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 w-full left-0 top-0 z-10">
      <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold mb-3 sm:mb-4">
        <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
        4+ Years Proven Experience // High-Growth Field Contractor
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none uppercase">
        General Construction <br />
        <span className="text-[#38bdf8]">&amp; Remodeling.</span>
      </h1>
      <p className="max-w-3xl text-xs sm:text-sm md:text-base mt-4 sm:mt-6 text-white/70 font-light leading-relaxed">
        A young, high-growth construction powerhouse with over <span className="text-white font-semibold">4 years of battle-tested field experience</span> across Kentuckiana. Specialized in <span className="text-[#38bdf8] font-semibold">Siding, Seamless Gutters, Soffit, and Fascia</span>, alongside turnkey residential remodeling and structural additions.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  onSelectProject,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      onClick={() => onSelectProject && onSelectProject(product)}
      className="group/product h-64 sm:h-80 md:h-96 w-[18rem] sm:w-[24rem] md:w-[30rem] relative shrink-0 cursor-pointer rounded-none border-0 overflow-hidden bg-black"
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

      {/* Hover Overlay with Pure Architectural Information */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-85 bg-black transition-opacity duration-300 pointer-events-none rounded-none border-0 flex flex-col justify-between p-4 sm:p-6" />

      {/* Top Details (Visible on Hover) */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
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
      <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10 space-y-1">
        <h2 className="text-base sm:text-lg md:text-xl font-black text-white leading-snug">
          {product.title}
        </h2>
        {product.specs && (
          <p className="text-[10px] sm:text-xs text-white/70 font-mono line-clamp-1">
            {product.specs.join(" • ")}
          </p>
        )}
      </div>

      {/* Hover Inspect Icon Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 text-[#38bdf8] flex items-center justify-center opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg">
        <Maximize2 className="w-4 h-4" />
      </div>
    </motion.div>
  );
};
