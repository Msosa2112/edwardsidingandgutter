import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Maximize2, 
  Layers, 
  Droplets, 
  Shield, 
  Hammer, 
  Star,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

// Verified Field Projects in Kentuckiana
const PROJECTS = [
  {
    id: "hardie-blue",
    title: "Executive Residence Siding & Fascia",
    category: "siding",
    discipline: "Architectural Siding",
    icon: <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "Prospect, KY",
    year: "2025 Build",
    image: "/projects/siding-hardie-board-batten.jpg",
    specs: ["James Hardie 8.25\" Lap", "Dual Weather Barrier", "Custom Cedar Porch Ceiling"],
    description: "Complete residential exterior transformation in deep fiber-cement lap siding with custom-formed aluminum window and fascia cladding.",
    featured: true
  },
  {
    id: "cedar-gable",
    title: "Multi-Story Blue Architectural Lap",
    category: "siding",
    discipline: "Vertical Siding & Gable",
    icon: <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "Floyds Knobs, IN",
    year: "2025 Build",
    image: "/projects/siding-architectural-lap-blue.jpg",
    specs: ["Vertical Board & Batten", "Ocean Blue Lap Siding", "Engineered Reveal Joint"],
    description: "Architectural gable accent featuring vertical board & batten siding paired with white limewashed brick masonry for striking curb contrast."
  },
  {
    id: "seamless-gutter-run",
    title: "Continuous Heavy-Gauge Gutters",
    category: "gutters",
    discipline: "Seamless Drainage",
    icon: <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "Jeffersonville, IN",
    year: "2025 Mobile Extrusion",
    image: "/projects/gutter-seamless-fascia-run.jpg",
    specs: [".032\" Heavy Aluminum", "Extruded On-Site", "Hidden Screw Hangers"],
    description: "Custom-extruded seamless gutter run rollformed on-site directly from our mobile fabrication van, eliminating leak-prone seams."
  },
  {
    id: "hand-miter-joints",
    title: "Zero-Leak Hand-Formed Miters",
    category: "gutters",
    discipline: "Gutter Engineering",
    icon: <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "Clarksville, IN",
    year: "2025 Mobile Extrusion",
    image: "/projects/gutter-miter-corner-craft.jpg",
    specs: ["Hand-Cut Miters", "Polyurethane Sealant", "Direct Fascia Tie"],
    description: "Precision hand-cut and riveted corner miters that eliminate standard prefabricated box joints and prevent sagging and corner leaks."
  },
  {
    id: "mobile-van-extrusion",
    title: "Carriage House Drainage & Siding",
    category: "gutters",
    discipline: "Mobile Manufacturing",
    icon: <Droplets className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "Louisville Metro, KY",
    year: "2025 Fabrication",
    image: "/projects/gutter-heavy-aluminum-install.jpg",
    specs: ["Mobile Van Extrusion", "Custom Pitch Calibration", "High-Flow Downspouts"],
    description: "Continuous 5-inch and 6-inch K-style aluminum gutters fabricated on-site to exact millimeter measurements for zero waste."
  },
  {
    id: "shingle-roof-anchorage",
    title: "Commercial Roof & Structural Elevation",
    category: "roofing",
    discipline: "Roofing Systems",
    icon: <Shield className="w-3.5 h-3.5 text-amber-400" />,
    location: "Anchorage, KY",
    year: "2025 Storm Shield",
    image: "/projects/gc-structural-roof-elevation.jpg",
    specs: ["50-Year High-Wind Shingles", "Full Synthetic Decking", "Ridge Thermal Vents"],
    description: "Engineered roof replacement designed for severe Ohio Valley weather spikes, continuous synthetic underlayment, and attic thermal airflow."
  },
  {
    id: "roof-decking-barrier",
    title: "Gable Bay Drainage Tie-In",
    category: "roofing",
    discipline: "Thermal Deck Protection",
    icon: <Shield className="w-3.5 h-3.5 text-amber-400" />,
    location: "Glenview, KY",
    year: "2025 Storm Shield",
    image: "/projects/gutter-downspout-soffit-tie.jpg",
    specs: ["Full Eave Shield", "Synthetic Underlayment", "Drip Edge Flashing"],
    description: "Dual-layer self-adhering ice and water membrane across eaves and roof valleys before nailing high-impact architectural shingles."
  },
  {
    id: "stone-portico-framing",
    title: "Farmhouse Portico & Stone Bases",
    category: "masonry",
    discipline: "Masonry & Timber",
    icon: <Hammer className="w-3.5 h-3.5 text-amber-400" />,
    location: "Louisville Metro, KY",
    year: "2025 Field Build",
    image: "/projects/gc-portico-stone-columns.jpg",
    specs: ["Hand-Chiseled Stone Veneer", "Heavy Timber Framing", "Integrated Shingle Tie"],
    description: "Grand front entryway transformation incorporating heavy structural timber columns resting on hand-cut natural stone veneer pedestals."
  },
  {
    id: "covered-porch-brick",
    title: "Craftsman Timber Porch Framing",
    category: "masonry",
    discipline: "Turnkey Addition",
    icon: <Hammer className="w-3.5 h-3.5 text-amber-400" />,
    location: "Louisville East, KY",
    year: "2025 Field Build",
    image: "/projects/gc-timber-porch-framing.jpg",
    specs: ["Continuous Brick Facade", "Structural Timber Beams", "Tongue & Groove Ceiling"],
    description: "Full residential rear addition featuring structural covered porch framing, continuous brick masonry, and unified shingle roof extension."
  },
  {
    id: "porch-siding-patio",
    title: "Full Exterior Envelope & Soffit",
    category: "siding",
    discipline: "Custom Millwork & Siding",
    icon: <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />,
    location: "St. Matthews, KY",
    year: "2025 Field Build",
    image: "/projects/siding-soffit-fascia-envelope.jpg",
    specs: ["Custom Millwork Trim", "Fiber-Cement Lap", "Ventilated Soffit Transitions"],
    description: "Complete patio enclosure and exterior siding upgrade with precision mitered corners, ventilated soffits, and moisture-sealed trims."
  }
];

const CATEGORIES = [
  { key: "all", label: "All Work", count: 10 },
  { key: "siding", label: "Siding Systems", count: 3 },
  { key: "gutters", label: "Seamless Gutters", count: 3 },
  { key: "roofing", label: "Roofing Systems", count: 2 },
  { key: "masonry", label: "Masonry & Porches", count: 2 }
];

export default function FieldPortfolioGallery({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef(null);

  const filtered = activeCategory === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  // Before & After Drag Handlers
  const handleMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="portfolio" className="relative w-full bg-[#080b11] text-white py-16 sm:py-24 md:py-32">
      <div id="gallery" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        
        {/* Top Header & Minimalist Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-white/10">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
              Verified Field Documentation // Kentuckiana
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Real Installations. <span className="text-[#38bdf8]">Documented In The Field.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Zero 3D mockups or stock photos. Every image below documents real field projects completed by Prime Stone Builders across Louisville and Southern Indiana.
            </p>
          </div>

          {/* Horizontally Scrollable Tabs for Mobile / Clean Wrap for Desktop */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full w-max">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      isActive ? "text-slate-950 font-bold" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#38bdf8] rounded-full shadow-md"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {cat.label}
                      <span className={`text-[10px] ${isActive ? "text-slate-900/80 font-bold" : "text-white/40"}`}>
                        ({cat.count})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ====================================================================
            FEATURED INTERACTIVE BEFORE & AFTER TRANSFORMATION SHOWCASE
            ==================================================================== */}
        {activeCategory === "all" && (
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0a0f1d] shadow-2xl">
            <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#38bdf8]">
                  <Sliders className="w-3.5 h-3.5" />
                  Interactive Transformation Slider // Drag to Compare
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Prospect Residence: Structural Framing &rarr; Finished James Hardie
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSliderPos(15)}
                  className={`px-3 py-1 text-xs font-mono rounded-full border transition-all cursor-pointer ${
                    sliderPos <= 20 ? "bg-[#38bdf8] text-slate-950 font-bold border-[#38bdf8]" : "bg-black/60 text-white/70 border-white/20 hover:text-white"
                  }`}
                >
                  Inspect Rough-In
                </button>
                <button 
                  onClick={() => setSliderPos(85)}
                  className={`px-3 py-1 text-xs font-mono rounded-full border transition-all cursor-pointer ${
                    sliderPos >= 80 ? "bg-[#38bdf8] text-slate-950 font-bold border-[#38bdf8]" : "bg-black/60 text-white/70 border-white/20 hover:text-white"
                  }`}
                >
                  Inspect Finished
                </button>
              </div>
            </div>

            {/* Before/After Split Container */}
            <div 
              ref={sliderContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative w-full h-[40vh] sm:h-[50vh] md:h-[62vh] max-h-[580px] overflow-hidden select-none cursor-ew-resize touch-none"
            >
              {/* After Image (Right / Base) */}
              <img
                src="/projects/siding-architectural-lap-blue.jpg"
                alt="Prospect Residence Finished James Hardie Lap"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-white backdrop-blur-md">
                Finished Hardie Lap &amp; Trim
              </div>

              {/* Before Image (Left / Clipped) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/projects/gc-timber-porch-framing.jpg"
                  alt="Prospect Residence Structural Rough-In"
                  className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : "100vw"
                  }}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/80 border border-[#38bdf8]/40 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#38bdf8] backdrop-blur-md">
                  Structural Rough-In &amp; Timber
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div 
                className="absolute inset-y-0 w-0.5 bg-[#38bdf8] z-20 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#080b11] border-2 border-[#38bdf8] shadow-2xl flex items-center justify-center text-[#38bdf8]">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Details Scrim */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-white/15 text-[10px] sm:text-xs font-mono text-white/80 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[#38bdf8] inline mr-1" />
                  Prospect, KY // Residential Transformation
                </div>
                <div className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-white/60 bg-black/70 px-2.5 py-1 rounded">
                  Drag slider horizontally &harr;
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            RESPONSIVE ARCHITECTURAL BENTO GRID
            Adapts seamlessly: 1 col on mobile, 2 cols on tablet, 3 cols on desktop
            ==================================================================== */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="group relative rounded-2xl overflow-hidden bg-[#0c1424] border border-white/15 hover:border-[#38bdf8]/60 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                {/* Full-bleed Photo with Aspect Ratio */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Dark Vignette Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-transparent to-black/60 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                      {proj.icon}
                      <span>{proj.discipline}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 text-[9px] sm:text-[10px] font-mono text-white/80 backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-[#38bdf8]" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 border border-[#38bdf8]/60 text-[#38bdf8] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl z-10">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Body & Technical Specs */}
                <div className="p-4 sm:p-5 space-y-3 bg-[#0c1424] flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                        {proj.title}
                      </h4>
                      <span className="font-mono text-[10px] text-white/40 shrink-0">
                        {proj.year}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Specs Chips & CTA */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.specs.slice(0, 2).map((sp, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80 whitespace-nowrap"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>

                    <span className="text-[10px] font-bold text-[#38bdf8] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      Inspect <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================================
            VERIFIED LOCAL REPUTATION STRIP (Google & Facebook Direct Proof)
            ==================================================================== */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                Direct Local Reputation
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  5.0 ★ Verified
                </span>
              </h4>
              <p className="text-xs text-white/60">
                Independent reviews and completed installations on Google and Facebook across the Louisville Metro.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a 
              href="https://share.google/VlRLVxfPPie7ArxUK" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 hover:border-[#38bdf8] text-white hover:text-[#38bdf8] text-xs font-bold font-mono transition-all"
            >
              <FaGoogle className="w-3.5 h-3.5 text-white" />
              <span>Google Reviews</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a 
              href="https://www.facebook.com/edwardsidingandgutter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 hover:border-[#38bdf8] text-white hover:text-[#38bdf8] text-xs font-bold font-mono transition-all"
            >
              <FaFacebookF className="w-3.5 h-3.5 text-white" />
              <span>Facebook Page</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="#configurator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#38bdf8] hover:bg-white text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md"
            >
              <span>Get Estimate</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
