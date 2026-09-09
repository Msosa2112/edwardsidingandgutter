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
import HouseSplitShowcase from '../components/HouseSplitShowcase';
import HeroParallaxGallery from '../components/HeroParallaxGallery';
import { CinematicFooter } from '../components/ui/motion-footer';
import SmoothScrollCoordinator from '../components/SmoothScrollCoordinator';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
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
    disciplines: ['General Construction & Remodeling', 'Siding Systems (James Hardie)'],
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

  return (
    <div className="min-h-screen w-full bg-[#080b11] text-white font-sans selection:bg-[#38bdf8] selection:text-slate-950">
      
      {/* Lenis Smooth Scroll & Anti-Skip Kinetic Guard */}
      <SmoothScrollCoordinator />
      
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
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#38bdf8] tracking-wider uppercase leading-none mt-0.5">
                Construction &amp; Remodeling
              </span>
            </div>
          </a>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-white/80 pointer-events-auto">
            <a href="#house-breakdown" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">House Anatomy</a>
            <a href="#portfolio" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Field Portfolio</a>
            <a href="#about-growth" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">4+ Years Growth</a>
            <a href="#configurator" className="hover:text-[#38bdf8] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors">Direct Contact</a>
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
        desktopScrollHeight="280vh"
        mobileScrollHeight="250vh"
        totalFrames={120}
        holdStart={0.04}
        holdEnd={0.88}
        smoothing={0.22}
      />

      {/* ========================================================================
          EDITORIAL ARCHITECTURAL PRESENTATION
          Open, containerless, pure photography and sharp Bahnschrift typography.
          Zero AI card containers, zero bento box templates.
          ======================================================================== */}
      <main className="relative z-30 bg-[#080b11]">

        {/* ----------------------------------------------------------------------
            0. INTERACTIVE HOUSE DECOMPOSITION (Siding, Gutters, Roof)
            Scroll-driven 3-way split showcase with 8K macro lens inspection.
            ---------------------------------------------------------------------- */}
        <HouseSplitShowcase 
          onSelectDiscipline={(disc) => setConfigState(prev => ({ ...prev, disciplines: [disc] }))}
        />

        {/* ----------------------------------------------------------------------
            ACETERNITY HERO PARALLAX STREAM
            3-row 3D perspective parallax with sharp square edges & no contour lines
            ---------------------------------------------------------------------- */}
        <HeroParallaxGallery onSelectProject={setSelectedProject} />

        {/* ----------------------------------------------------------------------
            COMPANY PROFILE: 4+ YEARS EXPERIENCE // RAPID REGIONAL GROWTH
            High-growth General Construction & Remodeling Powerhouse
            ---------------------------------------------------------------------- */}
        <section id="about-growth" className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-20 sm:py-28 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
                Company Profile // 4+ Years of Proven Regional Growth
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                A Young, High-Growth Powerhouse. <br />
                <span className="text-[#38bdf8]">Over 4 Years of Proven Field Excellence.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                Prime Stone Builders represents the modern standard in <strong className="text-white font-semibold">General Construction and Remodeling</strong> across Kentuckiana. We combine the agility, speed, and cutting-edge standards of a young, high-growth contractor with more than 4 years of proven hands-on field experience.
              </p>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                While we execute turnkey residential remodeling, our specialized core focus is master-grade exterior systems: <strong className="text-[#38bdf8] font-semibold">Siding Systems (James Hardie &amp; Board &amp; Batten), Seamless Gutters (.032" Heavy Aluminum), Ventilated Soffit, and Custom-Bent Fascia Wraps</strong>. Our exponential growth across Louisville and Southern Indiana is driven strictly by client satisfaction, transparent fixed-price contracts, and direct superintendent jobsite supervision.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                  <Check className="w-4 h-4 text-[#38bdf8]" />
                  <span>Licensed &amp; Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                  <Check className="w-4 h-4 text-[#38bdf8]" />
                  <span>Zero Subcontractor Markups</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                  <Check className="w-4 h-4 text-[#38bdf8]" />
                  <span>Direct Superintendent Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Key Performance Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              <div className="p-6 rounded-none bg-[#0c1424] border border-white/10 space-y-2.5">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#38bdf8]">4+</span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Years Field Experience</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Battle-tested on hundreds of residential job sites with verified 5.0-star reputation across Kentucky &amp; Indiana.
                </p>
              </div>

              <div className="p-6 rounded-none bg-[#0c1424] border border-white/10 space-y-2.5">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#38bdf8]">High-Growth</span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Rapid Regional Expansion</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  One of the fastest-growing exterior remodeling contractors in the Ohio Valley, fueled by homeowner referrals.
                </p>
              </div>

              <div className="p-6 rounded-none bg-[#0c1424] border border-white/10 space-y-2.5">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#38bdf8]">Core 4</span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Exterior Specialization</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Master-level craft in Siding (James Hardie), Seamless Gutters (.032" Aluminum), Ventilated Soffit, and Fascia.
                </p>
              </div>

              <div className="p-6 rounded-none bg-[#0c1424] border border-white/10 space-y-2.5">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#38bdf8]">Turnkey</span>
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">General Remodeling</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Full remodeling, structural covered porches, timber framing additions, and 50-year high-wind roofing systems.
                </p>
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
                  Direct Superintendent Dispatch // 4+ Years Field Proven
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Specify Your Construction &amp; Remodeling Scope.
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We are a young, high-growth general construction company with over 4 years of battle-tested field execution. We do not route you through automated call centers or third-party lead brokers. You will communicate directly with our construction superintendents.
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
                <p>• 4+ years of battle-tested field leadership &amp; flawless regional reputation</p>
                <p>• Written proposal delivered within 24 to 48 hours of on-site evaluation</p>
                <p>• Physical material catalogs (James Hardie, heavy aluminum gutters, soffits) provided at your residence</p>
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
                      'General Remodeling & Construction',
                      'Siding Systems (James Hardie)',
                      'Seamless Gutters (.032" Heavy Aluminum)',
                      'Soffit & Custom Fascia Wrap',
                      'Roofing Systems (50-Yr Shingles)',
                      'Covered Porches & Masonry',
                      'Turnkey Full Exterior Overhaul'
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

      {/* Cinematic Curtain-Reveal Footer */}
      <CinematicFooter />

    </div>
  );
}
