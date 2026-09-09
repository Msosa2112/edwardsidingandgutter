"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

const products = [
  {
    title: "Prospect Executive Residence",
    discipline: "Siding, Soffit & Fascia",
    location: "Prospect, KY",
    link: "#configurator",
    thumbnail: "/projects/hardie-blue-residence.jpg",
    specs: ["James Hardie Lap Siding", "Custom Aluminum Fascia", "Dual Weather Barrier"],
    description: "Complete residential facade overhaul in deep ocean blue fiber-cement with custom brake-bent fascia wraps and vented soffits."
  },
  {
    title: "Warm Cedar Board & Batten",
    discipline: "Exterior Siding Accent",
    location: "Floyds Knobs, IN",
    link: "#configurator",
    thumbnail: "/projects/board-batten-cedar-gable.jpg",
    specs: ["Vertical Board & Batten", "Natural Cedar Finish", "Engineered Reveal"],
    description: "Architectural gable accent featuring vertical siding paired with white limewash brick masonry."
  },
  {
    title: "Continuous Seamless Gutters",
    discipline: "Seamless Drainage",
    location: "Jeffersonville, IN",
    link: "#configurator",
    thumbnail: "/projects/seamless-drainage-soffit.jpg",
    specs: [".032\" Heavy Aluminum", "Extruded On-Site", "Hidden Screw Hangers"],
    description: "Custom-extruded continuous gutter system rollformed on-site directly from our mobile van."
  },
  {
    title: "Craftsman Portico & Stone Bases",
    discipline: "General Construction",
    location: "Louisville Metro, KY",
    link: "#configurator",
    thumbnail: "/projects/stone-portico-framing.jpg",
    specs: ["Hand-Chiseled Stone Veneer", "Timber Post Framing", "Shingle Tie-In"],
    description: "Grand entryway transformation incorporating heavy-timber framed columns anchored onto handcrafted stone veneer pedestals."
  },
  {
    title: "50-Year Architectural Shingles",
    discipline: "Roofing Systems",
    location: "Anchorage, KY",
    link: "#configurator",
    thumbnail: "/projects/architectural-shingle-roof.jpg",
    specs: ["50-Year High-Wind Shingles", "Full Ice & Water Shield", "Ridge Thermal Vents"],
    description: "Engineered roof replacement designed for severe Ohio Valley weather and continuous synthetic underlayment."
  },
  {
    title: "Covered Porch & Brick Addition",
    discipline: "Turnkey Remodeling",
    location: "Louisville East, KY",
    link: "#configurator",
    thumbnail: "/projects/covered-patio-masonry.jpg",
    specs: ["Structural Timber Beams", "Continuous Brick Facade", "Integrated Roofline"],
    description: "Full residential rear addition featuring structural covered porch framing and continuous brick masonry."
  },
  {
    title: "Ventilated Soffit & Custom Fascia",
    discipline: "Soffit & Fascia Systems",
    location: "St. Matthews, KY",
    link: "#configurator",
    thumbnail: "/projects/porch-siding-patio.jpg",
    specs: ["Ventilated Aluminum Soffits", "Hand-Formed Fascia Metal", "Moisture Seal"],
    description: "Complete patio enclosure and exterior siding upgrade with precision mitered corners, ventilated soffits, and custom fascia wraps."
  },
  {
    title: "Structural Timber Rough-In",
    discipline: "General Construction",
    location: "East Louisville, KY",
    link: "#configurator",
    thumbnail: "/projects/craft-siding-real.jpg",
    specs: ["Engineered Timber", "Concealed Fasteners", "Load-Bearing Bases"],
    description: "Precision-milled structural timber framing, weather-barrier rough-in, and full envelope construction."
  },
  {
    title: "Zero-Leak Hand-Formed Miters",
    discipline: "Seamless Gutters",
    location: "Clarksville, IN",
    link: "#configurator",
    thumbnail: "/projects/craft-gutter-detail.jpg",
    specs: ["Hand-Cut Miters", "Polyurethane Sealant", "Direct Fascia Tie"],
    description: "Hand-crafted corner miters eliminate failure-prone factory box miters, ensuring permanent leak protection."
  },
  {
    title: "On-Site Mobile Van Extrusion",
    discipline: "Mobile Gutter Fabrication",
    location: "Louisville Metro, KY",
    link: "#configurator",
    thumbnail: "/projects/craft-gutter-real.jpg",
    specs: ["Mobile Van Extrusion", "Custom Pitch Drop", "High-Flow Downspouts"],
    description: "Continuous gutters rollformed on-site directly from our mobile fabrication unit for exact building dimensions."
  },
  {
    title: "Continuous Ice & Water Decking",
    discipline: "Thermal Roofline Decking",
    location: "Glenview, KY",
    link: "#configurator",
    thumbnail: "/projects/craft-roof-detail.jpg",
    specs: ["Full Eave Shield", "Synthetic Underlayment", "Drip Edge Flashing"],
    description: "Dual-layer self-adhering ice and water membrane across eaves, valleys, and vulnerable rooflines."
  },
  {
    title: "Ridge Ventilation & Drone Survey",
    discipline: "Engineered Roofing",
    location: "Anchorage, KY",
    link: "#configurator",
    thumbnail: "/projects/craft-roof-real.jpg",
    specs: ["Ridge Vent Thermal", "6-Nail Fastener Pattern", "Drone Orthomosaic"],
    description: "Low-profile continuous ridge vent system inspected via high-resolution aerial drone documentation."
  },
  {
    title: "Hand-Formed Aluminum Fascia Wrap",
    discipline: "Soffit & Fascia Systems",
    location: "Prospect, KY",
    link: "#configurator",
    thumbnail: "/projects/craft-siding-detail.jpg",
    specs: ["Heavy Aluminum Coil", "Custom Brake Bending", "Zero-Maintenance Trim"],
    description: "Custom brake-bent aluminum fascia wrap and window casing profiles preventing moisture rot."
  },
  {
    title: "Full Residential Remodeling",
    discipline: "Turnkey Remodeling",
    location: "Prospect East, KY",
    link: "#configurator",
    thumbnail: "/projects/hardie-blue-residence.jpg",
    specs: ["Full Exterior Overhaul", "James Hardie Siding", "Soffit & Fascia Package"],
    description: "Comprehensive whole-home exterior modernization combining siding, gutters, soffits, and custom fascia."
  },
  {
    title: "Heavy-Gauge Soffit & Drainage Run",
    discipline: "Gutters, Soffit & Fascia",
    location: "Clarksville, IN",
    link: "#configurator",
    thumbnail: "/projects/seamless-drainage-soffit.jpg",
    specs: [".032\" Heavy Aluminum", "Vented Aluminum Soffits", "Heavy Screw Hangers"],
    description: "Unified continuous gutter installation tied seamlessly with ventilated soffit panels and fascia caps."
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
