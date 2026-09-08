import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  ChevronDown, 
  Maximize2, 
  X, 
  ExternalLink, 
  Check, 
  Send,
  Star
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ScrollFrameSequence from '../components/ScrollFrameSequence';
import { Footer } from '../components/ui/footer';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [showSocials, setShowSocials] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        const rect = mainEl.getBoundingClientRect();
        // Hide social bar once the user scrolls into the main page content
        setShowSocials(rect.top > window.innerHeight * 0.35);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [configState, setConfigState] = useState({
    disciplines: ['Siding Systems'],
    propertyType: 'Single-Family Residence',
    timeline: 'Within 30 Days',
    name: '',
    phone: '',
    zip: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const toggleDiscipline = (discipline) => {
    setConfigState((prev) => {
      const exists = prev.disciplines.includes(discipline);
      if (exists && prev.disciplines.length === 1) return prev;
      return {
        ...prev,
        disciplines: exists 
          ? prev.disciplines.filter((d) => d !== discipline)
          : [...prev.disciplines, discipline]
      };
    });
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    if (!configState.name || !configState.phone) {
      toast.error('Please provide your name and direct phone number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Scope received. An architectural field superintendent will call you directly within 24 hours.');
      setConfigState({
        disciplines: ['Siding Systems'],
        propertyType: 'Single-Family Residence',
        timeline: 'Within 30 Days',
        name: '',
        phone: '',
        zip: '',
        notes: ''
      });
    }, 800);
  };

  // Real, verified photography of completed Prime Stone Builders projects
  const verifiedProjects = [
    {
      id: 'hardie-prospect',
      category: 'siding',
      title: 'Prospect Executive Facade',
      location: 'Prospect, KY',
      discipline: 'Architectural Siding',
      image: '/projects/hardie-blue-residence.jpg',
      specs: [
        'James Hardie Statement Lap Siding',
        'Custom Hand-Formed Aluminum Trim',
        'Limewashed Masonry Water-Table',
        'Dual Thermal & Moisture Barrier'
      ],
      description: 'Complete high-exposure residential facade overhaul in deep ocean blue fiber cement. Hand-mitered custom window wraps and water-shedding drip caps over brick foundation.'
    },
    {
      id: 'cedar-floyds-knobs',
      category: 'siding',
      title: 'Warm Cedar Board & Batten Gable',
      location: 'Floyds Knobs, IN',
      discipline: 'Vertical Siding Accent',
      image: '/projects/board-batten-cedar-gable.jpg',
      specs: [
        'Vertical Board & Batten Profile',
        'Cedar Tone Natural Finish',
        'Limewash Brick Contrast',
        'Engineered Continuous Reveal'
      ],
      description: 'Architectural gable accent featuring vertical board-and-batten siding paired with white limewash brick masonry, bringing warmth and modern contrast to the roofline.'
    },
    {
      id: 'portico-louisville',
      category: 'masonry',
      title: 'Craftsman Portico & Stone Bases',
      location: 'Louisville Metro, KY',
      discipline: 'General Construction & Masonry',
      image: '/projects/stone-portico-framing.jpg',
      specs: [
        'Hand-Chiseled Stone Veneer',
        'Structural Timber Post Framing',
        'Architectural Shingle Overhang',
        'On-Site Precision Mortar'
      ],
      description: 'Grand entryway transformation incorporating heavy-timber framed portico columns anchored onto handcrafted stone veneer pedestals with architectural shingle integration.'
    },
    {
      id: 'drainage-jeffersonville',
      category: 'gutters',
      title: 'Continuous Seamless Drainage & Soffit',
      location: 'Jeffersonville, IN',
      discipline: 'Seamless Drainage',
      image: '/projects/seamless-drainage-soffit.jpg',
      specs: [
        '6" .032" Heavy-Gauge Aluminum',
        'Computerized Mobile Rollforming',
        'Heavy-Duty Hidden Screw Hangers',
        'Micro-Mesh Leaf Filtration'
      ],
      description: 'Custom-extruded continuous gutter system rollformed on-site directly from our mobile van. Hand-cut miters eliminate leak-prone seams along complex rooflines.'
    },
    {
      id: 'shingle-roof-anchorage',
      category: 'roofing',
      title: '50-Year Architectural Shingle Roof',
      location: 'Anchorage, KY',
      discipline: 'Roofing Systems',
      image: '/projects/architectural-shingle-roof.jpg',
      specs: [
        '50-Year High-Wind Shingles',
        'Full Ice & Water Valley Shield',
        'Synthetic Breathable Underlayment',
        'Ridge-Vent Thermal Ventilation'
      ],
      description: 'Engineered roof replacement designed for severe Ohio Valley weather. Includes continuous synthetic underlayment, reinforced valley flashings, and complete drone attic survey.'
    },
    {
      id: 'covered-patio-addition',
      category: 'masonry',
      title: 'Covered Porch Addition & Masonry',
      location: 'Louisville East, KY',
      discipline: 'Turnkey Construction',
      image: '/projects/covered-patio-masonry.jpg',
      specs: [
        'Structural Timber Grade Beams',
        'Continuous Brick Masonry Facade',
        'Integrated Roofline Tie-In',
        'Perimeter Concrete Footings'
      ],
      description: 'Full residential rear addition featuring structural covered porch framing, continuous exterior brick masonry, and unified architectural shingle roof extension.'
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? verifiedProjects 
    : verifiedProjects.filter(p => p.category === projectFilter);

  const architecturalFaqs = [
    {
      spec: 'SPECIFICATION 01 // LICENSURE & RISK ASSURANCE',
      q: 'Are Prime Stone Builders fully licensed, insured, and certified in Kentucky & Indiana?',
      a: 'Yes, 100%. We hold active general contractor credentials across both Kentucky and Southern Indiana. We maintain comprehensive $2M commercial and residential liability coverage, full worker’s compensation, and strict OSHA-certified safety protocols.'
    },
    {
      spec: 'SPECIFICATION 02 // PROPRIETARY ON-SITE FABRICATION',
      q: 'Why do you rollform seamless gutters on-site instead of using pre-fabricated sections?',
      a: 'Pre-fabricated retail gutters sold in 10-foot sections require seams every few feet, which inevitably leak and warp under Kentucky freeze-thaw cycles. Our custom mobile Ford Transit van is outfitted with a computerized rollformer that extrudes a single continuous run of .032" heavy-gauge aluminum to the exact millimeter of your roofline.'
    },
    {
      spec: 'SPECIFICATION 03 // WARRANTY & CRAFTSMANSHIP GUARANTEE',
      q: 'What warranties accompany your siding, masonry, and roofing installations?',
      a: 'Every installation is backed by dual-tier coverage: up to 50-year non-prorated manufacturer material warranties (James Hardie Statement Collection, CertainTeed, Mastic) combined with our exclusive 10-Year Prime Stone Builders Craftsmanship and Labor Warranty.'
    },
    {
      spec: 'SPECIFICATION 04 // PROJECT ONBOARDING & TIMELINE',
      q: 'How fast can I receive a firm, itemized architectural proposal?',
      a: 'Within 24 to 48 hours of contacting us, an experienced field superintendent will conduct a physical on-site evaluation, laser measurements, and present you with a transparent, itemized scope breakdown without aggressive sales pressure.'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#080b11] text-white font-sans selection:bg-[#38bdf8] selection:text-slate-950">
      
      {/* ========================================================================
          FLOATING GLOBAL NAVBAR: Minimalist, Containerless
          ======================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 pt-6 sm:pt-6 transition-all pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo & Company Name */}
          <a href="#" className="pointer-events-auto flex items-center gap-2 sm:gap-3 group shrink-0">
            <img 
              src="/fav.png" 
              alt="Prime Stone Builders" 
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase leading-none text-white whitespace-nowrap">
                Prime Stone
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#38bdf8] tracking-widest uppercase leading-none mt-0.5">
                Builders
              </span>
            </div>
          </a>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-white/80 pointer-events-auto">
            <a href="#disciplines" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Disciplines</a>
            <a href="#gallery" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Field Work</a>
            <a href="#standards" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Standards</a>
            <a href="#configurator" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Scope Request</a>
          </nav>

          {/* Direct CTA */}
          <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto shrink-0">
            <a 
              href="tel:+15027143707" 
              className="hidden sm:flex items-center gap-2 text-xs md:text-sm font-bold text-white/90 hover:text-[#38bdf8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors px-1 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>(502) 714-3707</span>
            </a>
            <a 
              href="#configurator" 
              className="text-[11px] sm:text-xs md:text-sm font-bold bg-[#38bdf8] hover:bg-white text-slate-950 px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full transition-all shadow-[0_2px_15px_rgba(56,189,248,0.4)] hover:shadow-white/30 whitespace-nowrap"
            >
              Free Estimate
            </a>
          </div>

        </div>
      </header>

      {/* ========================================================================
          HERO SECTION: Scroll-Driven 3D Frame Sequence (Frame 1 -> Frame 120)
          Zero overlapping cards. Video finishes cleanly.
          ======================================================================== */}
      <ScrollFrameSequence 
        desktopScrollHeight="500vh"
        mobileScrollHeight="450vh"
        totalFrames={120}
        holdStart={0.05}
        holdEnd={0.90}
        smoothing={0.12}
      />

      {/* ========================================================================
          EDITORIAL ARCHITECTURAL PRESENTATION
          Open, containerless, pure photography and sharp Bahnschrift typography.
          Zero AI card containers, zero bento box templates.
          ======================================================================== */}
      <main className="relative z-30 bg-[#080b11]">

        {/* ----------------------------------------------------------------------
            1. THE STANDARDS LEDGER: Pure Hairline Architectural Rule
            No box. No negative margin over video. Open to canvas background.
            ---------------------------------------------------------------------- */}
        <section id="standards" className="w-full border-y border-white/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              {/* Spec 01 */}
              <div className="pt-6 md:pt-0 md:px-6 first:px-0 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#38bdf8] font-bold">
                    SPEC // 01
                  </span>
                  <span className="text-[10px] font-mono text-white/40">REGULATORY</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  State Licensed &amp; Insured
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Active KY &amp; IN General Contractor credentials, $2M commercial liability, full worker’s compensation, and certified OSHA safety.
                </p>
              </div>

              {/* Spec 02 */}
              <div className="pt-6 md:pt-0 md:px-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#38bdf8] font-bold">
                    SPEC // 02
                  </span>
                  <span className="text-[10px] font-mono text-white/40">CERTIFIED MATERIALS</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  James Hardie &amp; ShingleMaster
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Certified fiber cement installers, 50-year high-wind architectural roofing systems, and commercial-grade .032" aluminum alloys.
                </p>
              </div>

              {/* Spec 03 */}
              <div className="pt-6 md:pt-0 md:px-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#38bdf8] font-bold">
                    SPEC // 03
                  </span>
                  <span className="text-[10px] font-mono text-white/40">METRO FOOTPRINT</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Kentuckiana Coverage
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Dedicated company crews serving Louisville, Prospect, Anchorage, Floyds Knobs, Jeffersonville, Clarksville, and surrounding corridors.
                </p>
              </div>

              {/* Spec 04 */}
              <div className="pt-6 md:pt-0 md:px-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                    SPEC // 04
                  </span>
                  <span className="text-[10px] font-mono text-white/40">DIRECT EXECUTION</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  Zero Subcontractor Delays
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Dedicated in-house craftsmen and specialized heavy staging tools, ensuring complete project oversight without third-party delays.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------
            2. CORE DISCIPLINES: Open Editorial Architectural Spreads
            Completely unboxed. Hairline dividers, raw photography, crisp typography.
            ---------------------------------------------------------------------- */}
        <section id="disciplines" className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-24 md:py-32">
          
          {/* Section Introduction */}
          <div className="max-w-3xl space-y-4 mb-20 md:mb-28">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
              Architectural Disciplines &amp; Construction Systems
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Engineered for Enduring Structure &amp; Refined Geometry.
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
              Prime Stone Builders unifies the entire exterior envelope—siding, continuous drainage, structural roofing, and custom masonry additions—into a single accountable craftsmanship standard.
            </p>
          </div>

          <div className="space-y-28 md:space-y-36">

            {/* Discipline 01: Siding Systems */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/10 pt-16 md:pt-20">
              
              {/* Photo Column (No box wrapper, pure photo) */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative overflow-hidden aspect-[4/3] border border-white/15 group bg-black cursor-pointer" onClick={() => setSelectedProject(verifiedProjects[0])}>
                  <img 
                    src="/projects/hardie-blue-residence.jpg" 
                    alt="James Hardie Deep Ocean Blue Facade by Prime Stone Builders" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#38bdf8] uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 border border-white/15">
                      Prospect, KY // Residential Overhaul
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(verifiedProjects[0]); }}
                      className="p-2 bg-black/70 hover:bg-[#38bdf8] hover:text-slate-950 text-white transition-all backdrop-blur-md border border-white/15"
                      title="Inspect Details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Actual project photography // James Hardie Deep Ocean Blue</span>
                  <span>Click to view</span>
                </div>
              </div>

              {/* Editorial Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-semibold block">
                    01 // FACADE &amp; ENVELOPE
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    Siding Systems
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed pt-2">
                    We install engineered fiber cement (James Hardie Statement Collection), vertical Board &amp; Batten profiles, and premium insulated composites built to withstand driving Ohio Valley wind and high UV exposure without warping.
                  </p>
                </div>

                {/* Architectural Specifications Table (Hairline rows, no cards) */}
                <div className="border-y border-white/10 divide-y divide-white/10 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Weather Barrier</span>
                    <span className="font-semibold text-white">Breathable Tyvek HomeWrap &amp; Flashing Membrane</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Corner &amp; Trim</span>
                    <span className="font-semibold text-white">Hand-Bent Heavy-Gauge Aluminum Wraps</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Fire &amp; Impact</span>
                    <span className="font-semibold text-white">Non-Combustible Class-A Rated Fiber Cement</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Profiles</span>
                    <span className="font-semibold text-white">Statement Lap, Board &amp; Batten, Cedar Tone Gables</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#configurator" 
                    onClick={() => setConfigState(prev => ({ ...prev, disciplines: ['Siding Systems'] }))}
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#38bdf8] hover:text-white transition-colors group"
                  >
                    <span className="border-b border-[#38bdf8] pb-0.5 group-hover:border-white">Configure Siding Scope</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Discipline 02: Seamless Gutters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/10 pt-16 md:pt-20">
              
              {/* Editorial Content Column */}
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-semibold block">
                    02 // ARCHITECTURAL DRAINAGE
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    Seamless Gutters
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed pt-2">
                    Continuous water management extruded directly on-site to eliminate sectional seams that rot fascia boards and crack foundations. Formed from heavy-gauge .032" architectural aluminum to exact millimeter measurements.
                  </p>
                </div>

                {/* Architectural Specifications Table */}
                <div className="border-y border-white/10 divide-y divide-white/10 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Extrusion Method</span>
                    <span className="font-semibold text-white">Mobile Computerized Continuous Rollforming</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Material Alloy</span>
                    <span className="font-semibold text-white">.032" Heavy-Gauge Architectural Aluminum</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Fastening Standard</span>
                    <span className="font-semibold text-white">Internal Heavy-Duty Screw Hangers @ 24" O.C.</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Leaf Defense</span>
                    <span className="font-semibold text-white">Stainless Micro-Mesh Filtration Systems</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#configurator" 
                    onClick={() => setConfigState(prev => ({ ...prev, disciplines: ['Seamless Gutters'] }))}
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#38bdf8] hover:text-white transition-colors group"
                  >
                    <span className="border-b border-[#38bdf8] pb-0.5 group-hover:border-white">Configure Gutter Scope</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Photo Column */}
              <div className="lg:col-span-6 space-y-3 order-1 lg:order-2">
                <div className="relative overflow-hidden aspect-[4/3] border border-white/15 group bg-black cursor-pointer" onClick={() => setSelectedProject(verifiedProjects[3])}>
                  <img 
                    src="/projects/seamless-drainage-soffit.jpg" 
                    alt="Seamless aluminum gutter drainage system by Prime Stone Builders" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#38bdf8] uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 border border-white/15">
                      Jeffersonville, IN // 6" Seamless Drainage
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(verifiedProjects[3]); }}
                      className="p-2 bg-black/70 hover:bg-[#38bdf8] hover:text-slate-950 text-white transition-all backdrop-blur-md border border-white/15"
                      title="Inspect Details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Actual project photography // 6" continuous aluminum with custom mitered downspout</span>
                  <span>Click to view</span>
                </div>
              </div>

            </div>

            {/* Discipline 03: Roofing Systems */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/10 pt-16 md:pt-20">
              
              {/* Photo Column */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative overflow-hidden aspect-[4/3] border border-white/15 group bg-black cursor-pointer" onClick={() => setSelectedProject(verifiedProjects[4])}>
                  <img 
                    src="/projects/architectural-shingle-roof.jpg" 
                    alt="50-Year Architectural Shingle Roof by Prime Stone Builders" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#38bdf8] uppercase tracking-wider bg-black/70 backdrop-blur-md px-3 py-1 border border-white/15">
                      Anchorage, KY // 50-Year Roof Replacement
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(verifiedProjects[4]); }}
                      className="p-2 bg-black/70 hover:bg-[#38bdf8] hover:text-slate-950 text-white transition-all backdrop-blur-md border border-white/15"
                      title="Inspect Details"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Actual project photography // High-wind architectural shingles with continuous ridge vent</span>
                  <span>Click to view</span>
                </div>
              </div>

              {/* Editorial Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-semibold block">
                    03 // THERMAL &amp; STORM ENVELOPE
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    Roofing Systems
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed pt-2">
                    Engineered roofing systems designed specifically for Ohio Valley storm winds, hail impact, and severe freeze-thaw cycles. Complete certified tear-off, deck inspection, and continuous thermal ventilation.
                  </p>
                </div>

                {/* Architectural Specifications Table */}
                <div className="border-y border-white/10 divide-y divide-white/10 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Shingle Rating</span>
                    <span className="font-semibold text-white">50-Year Architectural / Class 4 Impact Defense</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Valley Protection</span>
                    <span className="font-semibold text-white">Full Self-Adhering Ice &amp; Water Barrier Shield</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Attic Ventilation</span>
                    <span className="font-semibold text-white">Continuous Shingle-Over Ridge Vent &amp; Soffit Intake</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-mono text-white/50 uppercase">Inspection</span>
                    <span className="font-semibold text-white">Laser &amp; High-Resolution Aerial Diagnostics</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#configurator" 
                    onClick={() => setConfigState(prev => ({ ...prev, disciplines: ['Roofing System'] }))}
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#38bdf8] hover:text-white transition-colors group"
                  >
                    <span className="border-b border-[#38bdf8] pb-0.5 group-hover:border-white">Configure Roofing Scope</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Discipline 04: General Construction & Remodeling */}
            <div className="border-t border-white/10 pt-16 md:pt-20 space-y-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold block">
                    04 // TURNKEY CONTRACTING
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                    General Construction &amp; Remodeling
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Beyond roofing and siding, Prime Stone Builders operates licensed carpentry and masonry crews for heavy timber porticos, covered porch framing, natural stone veneer water-tables, and full structural renovations.
                  </p>
                  
                  <div className="pt-2">
                    <a 
                      href="#configurator" 
                      onClick={() => setConfigState(prev => ({ ...prev, disciplines: ['General Construction & Remodeling'] }))}
                      className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-amber-400 hover:text-white transition-colors group"
                    >
                      <span className="border-b border-amber-400 pb-0.5 group-hover:border-white">Discuss Remodeling Scope</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Photo 1: Stone Portico */}
                  <div className="space-y-2 cursor-pointer" onClick={() => setSelectedProject(verifiedProjects[2])}>
                    <div className="relative overflow-hidden aspect-[4/3] border border-white/15 group bg-black">
                      <img 
                        src="/projects/stone-portico-framing.jpg" 
                        alt="Portico framing with stone column bases by Prime Stone Builders" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
                        <span className="font-mono text-white/90 bg-black/70 px-2.5 py-0.5 border border-white/15">
                          Portico Stone Bases
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-white/50">Louisville Metro // Handcrafted stone column pedestals &amp; timber framing</p>
                  </div>

                  {/* Photo 2: Cedar Board & Batten Gable */}
                  <div className="space-y-2 cursor-pointer" onClick={() => setSelectedProject(verifiedProjects[1])}>
                    <div className="relative overflow-hidden aspect-[4/3] border border-white/15 group bg-black">
                      <img 
                        src="/projects/board-batten-cedar-gable.jpg" 
                        alt="Warm cedar tone board and batten gable with brick masonry" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px]">
                        <span className="font-mono text-white/90 bg-black/70 px-2.5 py-0.5 border border-white/15">
                          Cedar Accent &amp; Masonry
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-white/50">Floyds Knobs, IN // Vertical cedar tone siding paired with limewash brick</p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ----------------------------------------------------------------------
            3. FIELD WORK DOCUMENTATION (Replacing Fake Reviews & Generic Cards)
            Clean, unboxed photo gallery with lightbox inspection.
            ---------------------------------------------------------------------- */}
        <section id="gallery" className="w-full border-t border-white/10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-16">
            
            {/* Gallery Top Heading & Category Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
                  Verified Field Documentation
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Real Installations Across Kentuckiana.
                </h2>
                <p className="text-sm text-white/60">
                  Zero 3D renderings or stock photos. Every image below documents verified field projects completed by Prime Stone Builders in Kentucky and Southern Indiana.
                </p>
              </div>

              {/* Minimalist Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {['all', 'siding', 'gutters', 'roofing', 'masonry'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    className={`px-4 py-2 uppercase tracking-wider transition-all cursor-pointer border ${
                      projectFilter === cat 
                        ? 'border-[#38bdf8] text-[#38bdf8] font-bold bg-[#38bdf8]/10' 
                        : 'border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-transparent'
                    }`}
                  >
                    {cat === 'all' ? 'All Disciplines' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid: Completely Unboxed Photography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="group space-y-3 cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden relative border border-white/15 bg-black">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity"></div>
                    <div className="absolute top-3 right-3 p-2 bg-black/70 backdrop-blur-md text-white/80 group-hover:text-[#38bdf8] transition-colors border border-white/15">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-[#38bdf8] text-slate-950 font-bold px-2.5 py-0.5">
                        {proj.discipline}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-white/50 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-[#38bdf8]" /> {proj.location}
                    </p>
                    <p className="text-xs text-white/70 line-clamp-2 pt-0.5">
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Verification Credibility Strip (No boxed card, open hairline layout) */}
            <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Local Reputation</h4>
                  <p className="text-xs text-white/60">Independent reviews and customer installations on Google and Facebook.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <a 
                  href="https://share.google/VlRLVxfPPie7ArxUK" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-4 py-2 text-xs font-bold transition-all"
                >
                  <FaGoogle className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Google Reviews</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </a>
                <a 
                  href="https://www.facebook.com/share/1DyTvo4gBJ/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-[#1877f2] text-white px-4 py-2 text-xs font-bold transition-all"
                >
                  <FaFacebookF className="w-3.5 h-3.5 text-[#1877f2]" />
                  <span>Facebook Profile</span>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            4. ARCHITECTURAL SCOPE INQUIRY & DIRECT SUPERINTENDENT CONTACT
            Open, 2-column layout directly on canvas. No nested box within a box.
            ---------------------------------------------------------------------- */}
        <section id="configurator" className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-24 md:py-32 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Leadership Access */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest font-bold block">
                  Direct Superintendent Dispatch
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Specify Your Scope. Speak Directly With Field Leadership.
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We do not route you through automated call centers or third-party lead brokers. You will communicate directly with our construction superintendents.
                </p>
              </div>

              {/* Direct Calling Numbers (Large, architectural typographic style) */}
              <div className="space-y-4 border-y border-white/10 py-6">
                
                <a 
                  href="tel:+15027143707" 
                  className="flex items-center justify-between group py-2"
                >
                  <div>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Primary Superintendent</p>
                    <p className="text-xl sm:text-2xl font-black text-white group-hover:text-[#38bdf8] transition-colors">(502) 714-3707</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all" />
                </a>

                <div className="border-t border-white/10"></div>

                <a 
                  href="tel:+15027599838" 
                  className="flex items-center justify-between group py-2"
                >
                  <div>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Secondary Field Operations</p>
                    <p className="text-xl sm:text-2xl font-black text-white group-hover:text-[#38bdf8] transition-colors">(502) 759-9838</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all" />
                </a>

                <div className="border-t border-white/10"></div>

                <a 
                  href="https://wa.me/15027143707" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between group py-2 text-emerald-400"
                >
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="w-5 h-5" />
                    <div>
                      <p className="font-mono text-[10px] text-emerald-400/70 uppercase tracking-widest">Live Jobsite WhatsApp</p>
                      <p className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Send Photos &amp; Project Coordinates</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

              </div>

              <div className="space-y-2 text-xs text-white/50 font-mono">
                <p>• Written proposal delivered within 24 to 48 hours of on-site evaluation</p>
                <p>• Physical material catalogs &amp; James Hardie samples provided at your residence</p>
                <p>• Fixed-price contract terms with zero unexpected cost additions</p>
              </div>
            </div>

            {/* Right Column: Clean Architectural Form */}
            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
              <form onSubmit={handleConfigSubmit} className="space-y-6">
                
                {/* Step 1: Discipline Tags */}
                <div className="space-y-3">
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/70">
                    Step 01 // Select Project Disciplines:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Siding Systems',
                      'Seamless Gutters',
                      'Roofing System',
                      'Stone Masonry',
                      'Porch & Portico Framing',
                      'Turnkey Full Exterior'
                    ].map((disc) => {
                      const isSelected = configState.disciplines.includes(disc);
                      return (
                        <button
                          type="button"
                          key={disc}
                          onClick={() => toggleDiscipline(disc)}
                          className={`px-3.5 py-2 text-xs font-semibold transition-all border cursor-pointer ${
                            isSelected
                              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/10'
                              : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white bg-transparent'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isSelected && <Check className="w-3 h-3 text-[#38bdf8]" />}
                            {disc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Property Type & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                      Property Structure
                    </label>
                    <select
                      value={configState.propertyType}
                      onChange={(e) => setConfigState({ ...configState, propertyType: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                    >
                      <option value="Single-Family Residence" className="bg-[#080b11]">Single-Family Residence</option>
                      <option value="Luxury Custom Home" className="bg-[#080b11]">Luxury Custom Home</option>
                      <option value="Multi-Family Property" className="bg-[#080b11]">Multi-Family Property</option>
                      <option value="Commercial Facility" className="bg-[#080b11]">Commercial Facility</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                      Target Timeline
                    </label>
                    <select
                      value={configState.timeline}
                      onChange={(e) => setConfigState({ ...configState, timeline: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
                    >
                      <option value="Immediate Storm / Leak Repair" className="bg-[#080b11]">Immediate Storm / Leak Repair</option>
                      <option value="Within 30 Days" className="bg-[#080b11]">Within 30 Days</option>
                      <option value="Next 60-90 Days" className="bg-[#080b11]">Next 60-90 Days</option>
                      <option value="Budgeting & Planning Phase" className="bg-[#080b11]">Budgeting &amp; Planning Phase</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={configState.name}
                      onChange={(e) => setConfigState({ ...configState, name: e.target.value })}
                      placeholder="e.g. John Miller" 
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                      Direct Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={configState.phone}
                      onChange={(e) => setConfigState({ ...configState, phone: e.target.value })}
                      placeholder="(502) 000-0000" 
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Property Address or Zip Code
                  </label>
                  <input 
                    type="text" 
                    value={configState.zip}
                    onChange={(e) => setConfigState({ ...configState, zip: e.target.value })}
                    placeholder="e.g. 40059, Prospect, KY" 
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60">
                    Scope Notes or Specific Preferences
                  </label>
                  <textarea 
                    rows={3} 
                    value={configState.notes}
                    onChange={(e) => setConfigState({ ...configState, notes: e.target.value })}
                    placeholder="Describe specific siding issues, desired Hardie colors, roof pitch, or custom stone requests..."
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-[#38bdf8] hover:bg-white text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Transmitting Scope...' : 'Submit Scope For Superintendent Estimate'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[10px] text-white/40 font-mono">
                  Protected by company privacy commitment. No robocalls, no spam distribution.
                </p>

              </form>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------
            6. ARCHITECTURAL TECHNICAL FAQ
            Minimalist hairline accordion list. Completely containerless.
            ---------------------------------------------------------------------- */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-20 border-t border-white/10">
          <div className="mb-12 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
              Frequently Addressed Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Technical &amp; Operational Clarifications
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {architecturalFaqs.map((faq, idx) => (
              <div key={idx} className="py-5 sm:py-6">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-start justify-between text-left cursor-pointer group"
                >
                  <div className="space-y-1 pr-6">
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase tracking-widest font-semibold block">
                      {faq.spec}
                    </span>
                    <span className="font-bold text-base sm:text-lg text-white group-hover:text-[#38bdf8] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#38bdf8] shrink-0 mt-1 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs sm:text-sm text-white/70 leading-relaxed pt-4 pr-10"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Floating Social Icons (Fixed Left Center on BOTH Mobile & Desktop, Only during Animation, Pure & Containerless) */}
      <div 
        className={`flex fixed z-40 left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 flex-col gap-4 sm:gap-4 transition-all duration-500 ${
          showSocials 
            ? 'opacity-100 translate-x-0 pointer-events-auto' 
            : 'opacity-0 -translate-x-12 pointer-events-none'
        }`}
      >
        <a 
          href="https://www.facebook.com/share/1DyTvo4gBJ/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/80 hover:text-[#1877f2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all hover:scale-125 p-2 sm:p-1.5"
          title="Facebook"
        >
          <FaFacebookF className="w-5 h-5 sm:w-4 sm:h-4" />
        </a>
        <a 
          href="https://www.instagram.com/edward_sding_guttets_llc?igsh=dDMyOHcxbmZyYjVj" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/80 hover:text-[#e4405f] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all hover:scale-125 p-2 sm:p-1.5"
          title="Instagram"
        >
          <FaInstagram className="w-5 h-5 sm:w-4 sm:h-4" />
        </a>
        <a 
          href="https://wa.me/15027143707" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/80 hover:text-[#25d366] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all hover:scale-125 p-2 sm:p-1.5"
          title="WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-4 sm:h-4" />
        </a>
        <a 
          href="https://share.google/VlRLVxfPPie7ArxUK" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/80 hover:text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all hover:scale-125 p-2 sm:p-1.5"
          title="Google Reviews"
        >
          <FaGoogle className="w-5 h-5 sm:w-4 sm:h-4" />
        </a>
      </div>

      {/* Lightbox Modal for Real Jobsite Photography */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#080b11] border border-white/20 overflow-hidden shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#38bdf8] hover:text-slate-950 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 bg-black flex items-center justify-center">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full max-h-[65vh] object-cover" 
                  />
                </div>
                <div className="md:col-span-5 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#38bdf8] border border-[#38bdf8]/40 px-2.5 py-1">
                      {selectedProject.discipline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white pt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-white/50 flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" /> {selectedProject.location}
                    </p>
                    <p className="text-xs text-white/75 leading-relaxed pt-1">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-white/10">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">Technical Specifications:</p>
                      {selectedProject.specs.map((sp, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/85">
                          <Check className="w-3 h-3 text-[#38bdf8] shrink-0" />
                          <span>{sp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#configurator"
                      onClick={() => {
                        setSelectedProject(null);
                        setConfigState(prev => ({ ...prev, notes: `Inquiry regarding: ${selectedProject.title} (${selectedProject.location})` }));
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#38bdf8] hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider py-3 transition-all"
                    >
                      Inquire About This Scope <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
