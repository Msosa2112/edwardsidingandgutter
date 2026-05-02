import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Home, Search, LayoutGrid, User, Bell, Settings, Moon, Sun, 
  ChevronLeft, ChevronRight, Phone, CheckCircle2, ArrowRight, ArrowUpRight, 
  Menu, Droplets, Wrench, Star, Mail, MapPin, Clock, X, ChevronDown
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaGoogle } from 'react-icons/fa';
import { ThreeDMarquee } from "./components/ui/3d-marquee";
import { Marquee } from "./components/ui/marquee";
import { Footer } from "./components/ui/footer";
import { cn } from "./lib/utils";

const photos = [
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM (1).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM (2).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM (3).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM (4).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM (5).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.35 AM.jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (1).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (2).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (3).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (4).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (5).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM (6).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.36 AM.jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.37 AM (1).jpeg",
  "/fotos/WhatsApp Image 2026-04-27 at 9.05.37 AM.jpeg",
];

const marqueeImages = [...photos, ...photos];

const reviews = [
  {
    name: "Michael T.",
    username: "Louisville, KY",
    body: "Edward Siding did an incredible job on our gutters. Highly professional and efficient team.",
    img: "https://avatar.vercel.sh/michaelt",
  },
  {
    name: "Sarah L.",
    username: "Jeffersonville, IN",
    body: "The new architectural siding completely transformed our home's exterior. 10/10 recommend!",
    img: "https://avatar.vercel.sh/sarahl",
  },
  {
    name: "David H.",
    username: "New Albany, IN",
    body: "Fast, affordable, and zero mess left behind. The seamless gutters match perfectly.",
    img: "https://avatar.vercel.sh/davidh",
  },
  {
    name: "Jessica W.",
    username: "Clarksville, IN",
    body: "Excellent craftsmanship. They repaired our roof and siding after the storm flawlessly.",
    img: "https://avatar.vercel.sh/jessicaw",
  },
  {
    name: "Robert M.",
    username: "Louisville, KY",
    body: "Very transparent pricing and they finished the patio exactly when they said they would.",
    img: "https://avatar.vercel.sh/robertm",
  },
  {
    name: "Emily C.",
    username: "St. Matthews, KY",
    body: "Great communication from start to finish. Our new windows look gorgeous.",
    img: "https://avatar.vercel.sh/emilyc",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-2xl border p-4",
        "spatial-glass border-white/10 hover:bg-white/10 transition-colors"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white/80">{body}</blockquote>
    </figure>
  );
};

const additionalServices = [
  { title: "Roofing Services", content: "From minor repairs to complete roof replacements, we provide top-quality roofing solutions that protect your home from the elements." },
  { title: "Window Installation", content: "Upgrade your home's energy efficiency and curb appeal with our premium window installation and replacement services." },
  { title: "Exterior Painting", content: "Give your home a fresh, vibrant look with our professional exterior painting services, using weather-resistant paints for long-lasting results." },
  { title: "Decks & Patios", content: "Expand your outdoor living space with custom-designed decks and patios tailored to your lifestyle and home architecture." },
  { title: "Door Installation", content: "Secure and beautify your entryways with our high-quality door installation services, offering a variety of styles and materials." }
];

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="spatial-glass border border-white/10 rounded-2xl overflow-hidden mb-4">
      <button 
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
        onClick={onClick}
      >
        <span className="font-bold text-lg">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-[#38bdf8]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-4 text-white/70">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white font-sans relative flex flex-col overflow-x-hidden selection:bg-[#38bdf8] selection:text-white pb-32 md:pb-0 md:pl-24">
      
      {/* Dynamic Background Image (Fixed) */}
      <div className="fixed inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={photos[activeIndex]} 
              className="w-full h-full object-cover"
              alt="Background"
            />
            {/* GPU-optimized overlay instead of heavy CSS filters */}
            <div className="absolute inset-0 bg-black/70"></div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#0f172a_120%)] pointer-events-none"></div>
      </div>



      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center pt-8 md:pt-16 px-4 md:px-8">
        
        {/* HERO SECTION */}
        <section id="portfolio" className="w-full flex flex-col items-center justify-center min-h-[85vh] mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center mb-10 md:mb-16 z-20"
          >
            <img src="/logo.png" alt="Edward Siding & Gutter" className="mx-auto h-24 md:h-32 lg:h-48 object-contain drop-shadow-2xl filter brightness-110" />
            <p className="mt-4 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light drop-shadow-md px-4">
              Premium Siding & Gutters for the modern home. Unmatched craftsmanship and lifetime durability.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-sm font-semibold text-white">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-sm font-semibold text-white">Free Estimates</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Carousel */}
          <motion.div 
            className="relative w-full max-w-5xl h-[350px] md:h-[450px] flex items-center justify-center perspective-1000 touch-pan-y"
            onPanEnd={(e, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                nextSlide();
              } else if (info.offset.x > swipeThreshold) {
                prevSlide();
              }
            }}
          >
            <AnimatePresence>
              {photos.map((photo, index) => {
                let offset = index - activeIndex;
                if (offset < -2) offset += photos.length;
                if (offset > 2) offset -= photos.length;

                const isVisible = Math.abs(offset) <= 2;
                if (!isVisible) return null;

                // Tighter desktop offsets to avoid overlap with edges
                const xOffset = isMobile ? offset * 120 : offset * 200;
                const scaleValue = 1 - Math.abs(offset) * 0.15;
                const zOffset = isMobile ? -Math.abs(offset) * 100 : -Math.abs(offset) * 150;
                const rotateYValue = offset * -20;

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      x: xOffset,
                      scale: scaleValue,
                      rotateY: rotateYValue,
                      z: zOffset,
                      opacity: 1 - Math.abs(offset) * 0.3,
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className={`absolute w-[280px] md:w-[500px] lg:w-[600px] h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] spatial-glass-dark border border-white/20 p-2 ${
                      offset === 0 ? 'z-30 cursor-default' : 'z-10 cursor-pointer hover:border-white/40'
                    }`}
                    onClick={() => offset !== 0 && setActiveIndex(index)}
                    style={{ transformOrigin: "center center", willChange: "transform, opacity" }}
                  >
                    <img src={photo} loading={index > 3 ? "lazy" : "eager"} className="w-full h-full object-cover rounded-[1.25rem] transform-gpu" alt={`Project ${index + 1}`} />
                    
                    {offset === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 spatial-glass p-4 md:p-6 rounded-2xl flex justify-between items-end backdrop-blur-xl"
                      >
                        <div>
                          <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 line-clamp-1">Project Portfolio</h3>
                          <p className="text-xs md:text-sm text-white/70 line-clamp-2">"Craftsmanship that protects and elevates."</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPortfolio(true);
                          }}
                          className="bg-white text-slate-900 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:scale-110 transition-transform shrink-0 ml-2"
                        >
                          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="spatial-glass rounded-full p-2 flex items-center gap-3 md:gap-4 z-30 mt-8"
          >
            <button onClick={prevSlide} className="p-1 md:p-2 hover:bg-white/20 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /></button>
            <div className="flex gap-2">
              {photos.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-white w-5 md:w-6' : 'bg-white/30 w-1.5 md:w-2'}`} 
                />
              ))}
            </div>
            <button onClick={nextSlide} className="p-1 md:p-2 hover:bg-white/20 rounded-full transition-colors"><ChevronRight className="w-5 h-5 md:w-6 md:h-6" /></button>
          </motion.div>

          {/* Reviews Marquee */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full mt-12 max-w-5xl relative flex flex-col items-center justify-center overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <Marquee pauseOnHover className="[--duration:30s] mb-4">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="w-full py-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Engineered solutions for the modern home exterior, built with precision and care.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Home, title: 'Architectural Siding', desc: 'High-performance, weather-resistant siding that improves energy efficiency and curb appeal.' },
              { icon: Droplets, title: 'Seamless Gutters', desc: 'Custom-fabricated water management systems designed to protect your foundation perfectly.' },
              { icon: Wrench, title: 'Custom Trim & Repair', desc: 'Detailed fascia, soffit, and custom trim work to give your home a flawless finish.' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="spatial-glass p-8 rounded-3xl hover:bg-white/10 transition-colors group"
              >
                <service.icon className="w-10 h-10 text-[#38bdf8] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{service.desc}</p>
                <button className="text-[#38bdf8] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Accordion for Other Services */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Other Construction Services</h3>
            {additionalServices.map((service, index) => (
              <AccordionItem 
                key={index}
                title={service.title}
                content={service.content}
                isOpen={activeAccordion === index}
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
              />
            ))}
            
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowServices(true)}
                className="bg-[#38bdf8] text-slate-900 font-bold py-4 px-8 rounded-full hover:bg-white transition-colors inline-flex justify-center items-center gap-2"
              >
                View Detailed Services <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* ABOUT / WHY US SECTION */}
        <section id="about" className="w-full py-20">
          <div className="spatial-glass rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full filter blur-[80px]"></div>
            
            <div className="flex-1 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Edward Exteriors?</h2>
              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                We don't just build exteriors; we craft shields for your home. With over a decade of experience, we bring modern techniques and premium materials to every project, ensuring your home looks beautiful and withstands the test of time.
              </p>
              <ul className="space-y-4">
                {[
                  'Lifetime Warranty on Materials',
                  'Expert, Certified Installation Team',
                  'Free, Transparent Estimates',
                  'Fully Licensed & Insured'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 relative z-10 w-full">
              <div className="space-y-4">
                <div className="spatial-glass p-6 rounded-3xl text-center">
                  <div className="text-4xl font-bold text-[#38bdf8] mb-2">4</div>
                  <div className="text-xs text-white/60 uppercase tracking-widest">Years Exp.</div>
                </div>
                <div className="h-48 rounded-3xl overflow-hidden transform-gpu">
                  <img src={photos[0]} loading="lazy" className="w-full h-full object-cover" alt="Work 1" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="h-48 rounded-3xl overflow-hidden transform-gpu">
                  <img src={photos[1]} loading="lazy" className="w-full h-full object-cover" alt="Work 2" />
                </div>
                <div className="spatial-glass p-6 rounded-3xl text-center">
                  <div className="text-4xl font-bold text-[#38bdf8] mb-2">100%</div>
                  <div className="text-xs text-white/60 uppercase tracking-widest">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D MARQUEE GALLERY SECTION */}
        <section className="w-full py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Visual Impact</h2>
            <p className="text-white/60 max-w-2xl mx-auto">See the difference quality makes. Browse through our extensive library of transformations.</p>
          </div>
          <div className="w-full overflow-hidden relative">
            <ThreeDMarquee images={marqueeImages} />
          </div>
        </section>

        {/* CTA & CONTACT SECTION */}
        <section id="contact" className="w-full py-20 mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="spatial-glass-dark p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#38bdf8]/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/10 to-transparent"></div>
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Great.</h2>
                <p className="text-white/60 mb-8 text-lg">Reach out today for a free consultation. We're ready to transform your space.</p>
                
                <div className="space-y-4 md:space-y-6 w-full">
                  <div className="flex items-center gap-4 spatial-glass p-4 rounded-2xl w-full">
                    <div className="bg-[#38bdf8]/20 p-3 rounded-full shrink-0"><Phone className="w-5 h-5 md:w-6 md:h-6 text-[#38bdf8]" /></div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/50 uppercase">Call Us</p>
                      <p className="font-bold text-sm md:text-lg truncate">(502) 714-3707</p>
                      <p className="font-bold text-sm md:text-lg truncate">(502) 759-9838</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 spatial-glass p-4 rounded-2xl w-full">
                    <div className="bg-[#38bdf8]/20 p-3 rounded-full shrink-0"><Mail className="w-5 h-5 md:w-6 md:h-6 text-[#38bdf8]" /></div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/50 uppercase">Email Us</p>
                      <p className="font-bold text-sm md:text-lg truncate">edwarsiding@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 spatial-glass p-4 rounded-2xl w-full">
                    <div className="bg-[#38bdf8]/20 p-3 rounded-full shrink-0"><MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#38bdf8]" /></div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/50 uppercase">Location</p>
                      <p className="font-bold text-sm md:text-lg truncate">Louisville, KY</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple Contact Form */}
              <div className="spatial-glass p-6 md:p-8 rounded-3xl w-full">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Request an Estimate</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors" />
                  </div>
                  <div>
                    <textarea placeholder="Tell us about your project..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors resize-none"></textarea>
                  </div>
                  <button className="w-full bg-[#38bdf8] text-slate-900 font-bold py-4 rounded-xl hover:bg-white transition-colors flex justify-center items-center gap-2">
                    Submit Request <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
      
      {/* Footer Section */}
      <Footer />

      {/* Dock Navigation (Bottom on Mobile, Left on Desktop) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 flex flex-row md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-6 md:translate-x-0 md:flex-col gap-2 md:gap-4"
      >
        <div className="spatial-glass rounded-full p-2 md:p-3 flex flex-row md:flex-col gap-2 md:gap-6 items-center shadow-2xl backdrop-blur-3xl border border-white/10">
          <a href="https://www.facebook.com/share/1DyTvo4gBJ/" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 p-2 md:p-3 rounded-full shadow-lg hover:scale-110 transition-all"><FaFacebookF className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/edward_sding_guttets_llc?igsh=dDMyOHcxbmZyYjVj" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-white/10 p-2 md:p-3 rounded-full transition-all hover:scale-110"><FaInstagram className="w-5 h-5" /></a>
          <a href="https://wa.me/15027143707" target="_blank" rel="noopener noreferrer" className="text-white hover:bg-white/10 p-2 md:p-3 rounded-full transition-all hover:scale-110"><FaWhatsapp className="w-5 h-5" /></a>
          <a href="#" className="text-white hover:bg-white/10 p-2 md:p-3 rounded-full transition-all hover:scale-110"><FaGoogle className="w-5 h-5" /></a>
        </div>
      </motion.div>

      {/* Full-Screen Portfolio Overlay */}
      <AnimatePresence>
        {showPortfolio && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-[#0f172a] overflow-y-auto"
          >
            <div className="sticky top-0 z-10 spatial-glass-dark border-b border-white/10 p-4 md:p-6 flex justify-between items-center backdrop-blur-3xl">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold">Project Portfolio</h2>
                <p className="text-white/60 text-sm md:text-base">A detailed look at our craftsmanship</p>
              </div>
              <button 
                onClick={() => setShowPortfolio(false)}
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, idx) => {
                const services = ["Premium Siding", "Seamless Gutters", "Fascia & Soffit", "Window Trim", "Complete Exterior"];
                const serviceName = services[idx % services.length];
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{ willChange: "transform, opacity" }}
                    className="group relative h-64 md:h-80 rounded-3xl overflow-hidden spatial-glass-dark border border-white/10 cursor-pointer transform-gpu"
                  >
                    <img src={photo} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" alt={`Project ${idx}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{serviceName}</h3>
                      <p className="text-sm text-[#38bdf8]">View Details <ArrowUpRight className="inline w-4 h-4" /></p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Services Overlay */}
      <AnimatePresence>
        {showServices && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-[#0f172a] overflow-y-auto"
          >
            <div className="sticky top-0 z-20 spatial-glass-dark border-b border-white/10 p-4 md:p-6 flex justify-between items-center backdrop-blur-3xl">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold">Our Services</h2>
                <p className="text-white/60 text-sm md:text-base">Detailed solutions for your home's exterior</p>
              </div>
              <button 
                onClick={() => setShowServices(false)}
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 md:space-y-12 py-12">
              {[
                {
                  title: "Siding",
                  icon: Home,
                  description: "Transform your home's exterior with our premium architectural siding. We offer high-performance, weather-resistant materials that not only improve your home's energy efficiency but also dramatically boost its curb appeal. Our expert installers ensure every panel is perfectly aligned to protect your home against the elements.",
                  features: ["Vinyl & Fiber Cement Options", "Weather & Impact Resistant", "Energy Efficient Insulation", "Wide Range of Colors & Textures"]
                },
                {
                  title: "Gutters",
                  icon: Droplets,
                  description: "Protect your foundation and landscaping with our custom-fabricated seamless gutters. Designed for optimal water management, our systems are built to handle heavy rainfall while maintaining a clean, modern look. We measure and form the gutters right at your home for a perfect, leak-free fit.",
                  features: ["Seamless Custom Fabrication", "Leaf Guards & Covers", "Proper Pitching & Drainage", "Multiple Color Matches"]
                },
                {
                  title: "Roofing",
                  icon: Shield,
                  description: "Your roof is your home's first line of defense. From minor repairs to complete tear-offs and replacements, we provide top-quality roofing solutions engineered to protect your home from the harshest elements. We use only top-tier materials that offer longevity and aesthetic appeal.",
                  features: ["Architectural Shingles", "Leak Detection & Repair", "Storm Damage Restoration", "Proper Attic Ventilation"]
                },
                {
                  title: "Remodeling",
                  icon: Wrench,
                  description: "Breathe new life into your space with our comprehensive remodeling services. Whether it's an exterior face-lift or an interior transformation, our expert team delivers flawless craftsmanship from start to finish. We work closely with you to turn your vision into a reality.",
                  features: ["Exterior Makeovers", "Interior Renovations", "Custom Trim & Molding", "Modernized Finishes"]
                },
                {
                  title: "Fences & Decks",
                  icon: LayoutGrid,
                  description: "Expand your outdoor living space with custom-designed decks and secure, beautiful fencing. Tailored to your lifestyle and your home's architecture, we build outdoor spaces made for making memories. From standard privacy fences to multi-level composite decks, we do it all.",
                  features: ["Wood & Composite Decks", "Privacy & Picket Fencing", "Custom Railings & Stairs", "Weather-Treated Materials"]
                }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="spatial-glass-dark border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start group hover:border-[#38bdf8]/50 transition-colors"
                >
                  <div className="bg-[#38bdf8]/10 p-6 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-[#38bdf8]/20 transition-all">
                    <service.icon className="w-10 h-10 md:w-12 md:h-12 text-[#38bdf8]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0" />
                          <span className="text-white/90 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA in the overlay */}
            <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
              <div className="spatial-glass p-8 md:p-12 rounded-3xl border border-[#38bdf8]/30 bg-gradient-to-br from-[#38bdf8]/10 to-transparent">
                <h3 className="text-3xl font-bold mb-4">Ready to start your project?</h3>
                <p className="text-white/70 mb-8 text-lg">Contact us for a free estimate and discover how we can transform your home.</p>
                <button 
                  onClick={() => {
                    setShowServices(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#38bdf8] text-slate-900 font-bold py-4 px-10 rounded-full hover:bg-white transition-colors inline-flex justify-center items-center gap-2"
                >
                  Get a Free Estimate <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
