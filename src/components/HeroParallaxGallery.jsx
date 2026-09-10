"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

const products = [
  {
    title: "Executive Residence Siding & Fascia",
    discipline: "Siding, Soffit & Fascia",
    location: "Prospect, KY",
    link: "#configurator",
    thumbnail: "/projects/siding-hardie-board-batten.jpg",
    specs: ["James Hardie Lap Siding", "Custom Cedar Porch Ceiling", "Brake-Bent Aluminum Fascia"],
    description: "Complete exterior transformation featuring horizontal lap siding, custom tongue-and-groove cedar ceiling, and continuous moisture barrier."
  },
  {
    title: "Grand Estate Multi-Gable Gutters",
    discipline: "Seamless Gutters",
    location: "Floyds Knobs, IN",
    link: "#configurator",
    thumbnail: "/projects/gutter-seamless-fascia-run.jpg",
    specs: [".032\" Heavy Aluminum", "Multi-Gable Continuous Run", "Heavy Screw Hangers"],
    description: "Continuous heavy-gauge .032\" seamless gutter installation rollformed on-site to handle high-pitch roof drainage."
  },
  {
    title: "Farmhouse Portico & Stone Bases",
    discipline: "General Construction",
    location: "Louisville Metro, KY",
    link: "#configurator",
    thumbnail: "/projects/gc-portico-stone-columns.jpg",
    specs: ["Handcrafted Stone Columns", "Architectural Timber Posts", "Fiber-Cement Siding Tie-In"],
    description: "Grand entry portico featuring timber framing anchored onto stone masonry pillars with integrated siding details."
  },
  {
    title: "Continuous Extruded Drainage Run",
    discipline: "Seamless Gutters",
    location: "Jeffersonville, IN",
    link: "#configurator",
    thumbnail: "/projects/gutter-miter-corner-craft.jpg",
    specs: ["Precision Hand-Cut Miters", "Zero-Leak Polyurethane Seal", "Extruded On-Site"],
    description: "Hand-crafted corner miters eliminating failure-prone box miters for permanent leak-free Ohio Valley performance."
  },
  {
    title: "Carriage House Drainage & Siding",
    discipline: "Gutters, Soffit & Fascia",
    location: "Anchorage, KY",
    link: "#configurator",
    thumbnail: "/projects/gutter-heavy-aluminum-install.jpg",
    specs: ["Seamless Heavy Aluminum", "Board & Batten Tie-In", "Commercial Downspouts"],
    description: "Architectural carriage house installation coordinating continuous aluminum gutters with custom exterior trim."
  },
  {
    title: "Craftsman Timber Porch Framing",
    discipline: "General Construction",
    location: "East Louisville, KY",
    link: "#configurator",
    thumbnail: "/projects/gc-timber-porch-framing.jpg",
    specs: ["Heavy Timber Beams", "Open-Rafter Architecture", "Custom Masonry Pedestals"],
    description: "Structural timber porch addition with engineered beam spans, exposed rafter craftsmanship, and brick foundation tie."
  },
  {
    title: "Multi-Story Blue Architectural Lap Siding",
    discipline: "Siding Systems",
    location: "Prospect East, KY",
    link: "#configurator",
    thumbnail: "/projects/siding-architectural-lap-blue.jpg",
    specs: ["James Hardie Ocean Blue", "Engineered Reveal Trim", "Dual Weather Barrier"],
    description: "Multi-story full residential envelope replacement in deep ocean blue fiber-cement with crisp architectural casing."
  },
  {
    title: "Residential Multi-Unit Addition",
    discipline: "General Construction",
    location: "Clarksville, IN",
    link: "#configurator",
    thumbnail: "/projects/gc-residential-full-addition.jpg",
    specs: ["Turnkey Framing & Envelope", "Multi-Unit Construction", "Complete Exterior Package"],
    description: "Ground-up residential expansion including structural rough-in, weather barrier envelope, siding, and roofing tie-in."
  },
  {
    title: "Structural Covered Deck & Porch",
    discipline: "Remodeling & Additions",
    location: "St. Matthews, KY",
    link: "#configurator",
    thumbnail: "/projects/gc-exterior-deck-addition.jpg",
    specs: ["Pressure-Treated Framing", "Architectural Roof Tie", "Integrated Drainage"],
    description: "Custom covered outdoor living space featuring structural timber roof tie-in, vented soffit, and continuous gutters."
  },
  {
    title: "Full Exterior Envelope & Soffit",
    discipline: "Siding, Soffit & Fascia",
    location: "Goshen, KY",
    link: "#configurator",
    thumbnail: "/projects/siding-soffit-fascia-envelope.jpg",
    specs: ["Ventilated Soffit System", "Hand-Brake Fascia Wrap", "Stone & Siding Transition"],
    description: "Complete residential exterior remodel combining masonry column wraps, fiber-cement siding, and zero-maintenance trim."
  },
  {
    title: "Custom Kitchen Cabinetry & Remodel",
    discipline: "Turnkey Remodeling",
    location: "Louisville Metro, KY",
    link: "#configurator",
    thumbnail: "/projects/remodel-living-open-concept.jpg",
    specs: ["Solid Oak Shaker Cabinets", "Quartz Waterfall Island", "Under-Cabinet LED Lighting"],
    description: "Full interior kitchen modernization with open-concept layout, custom oak cabinetry, and designer architectural hardware."
  },
  {
    title: "Master Bathroom Suite Renovation",
    discipline: "Turnkey Remodeling",
    location: "Highlands, Louisville, KY",
    link: "#configurator",
    thumbnail: "/projects/remodel-luxury-kitchen-island.jpg",
    specs: ["Freestanding Soaking Tub", "Frameless Glass Enclosure", "Matte Black Fixtures"],
    description: "Luxury master bathroom overhaul with porcelain tile, dual vanity installation, and high-efficiency plumbing."
  },
  {
    title: "Modern Two-Tone Timber Entry",
    discipline: "General Construction",
    location: "Glenview, KY",
    link: "#configurator",
    thumbnail: "/projects/gc-custom-timber-entry.jpg",
    specs: ["Architectural Timber Portico", "Two-Tone Exterior Siding", "Concealed Fasteners"],
    description: "Modern architectural facade remodel featuring exposed timber entry canopy paired with horizontal lap siding."
  },
  {
    title: "Gable Downspout & Drainage Integration",
    discipline: "Seamless Gutters",
    location: "New Albany, IN",
    link: "#configurator",
    thumbnail: "/projects/gutter-downspout-soffit-tie.jpg",
    specs: ["High-Flow Downspouts", "Soffit Return Tie-In", "Leak-Proof Sealant"],
    description: "Custom-routed downspouts and bay window roofline drainage preventing foundation water saturation."
  },
  {
    title: "Commercial Structural Framing & Roof",
    discipline: "General Construction",
    location: "Louisville East, KY",
    link: "#configurator",
    thumbnail: "/projects/gc-structural-roof-elevation.jpg",
    specs: ["Engineered Roof Trusses", "Commercial Envelope", "Comprehensive Weather Proofing"],
    description: "Heavy commercial and residential structural framing elevation with precision engineered load-bearing headers."
  }
];

export default function HeroParallaxGallery({ onSelectProject }) {
  return (
    <div id="portfolio" className="relative w-full">
      <div id="gallery" className="absolute -top-20 pointer-events-none" />
      <HeroParallax 
        products={products} 
        onSelectProject={(prod) => {
          if (!onSelectProject) return;
          onSelectProject({
            title: prod.title,
            image: prod.thumbnail,
            discipline: prod.discipline,
            location: prod.location,
            specs: prod.specs,
            description: prod.description
          });
        }}
      />
    </div>
  );
}
