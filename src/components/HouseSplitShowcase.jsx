import React from "react";
import { ScrollSplitCard } from "./ui/scroll-split-card";
import { Layers, Droplets, Shield } from "lucide-react";

export default function HouseSplitShowcase({ onSelectDiscipline }) {
  const handleCardClick = (disciplineName) => {
    if (onSelectDiscipline) {
      onSelectDiscipline(disciplineName);
    }
    const configEl = document.getElementById("configurator");
    if (configEl) {
      configEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cards = [
    {
      title: "Siding, Soffit & Fascia",
      frontTitle: "Exterior Envelope Mastery",
      frontLabel: "SPECIALIZATION 01 // SIDING, SOFFIT & FASCIA",
      description: "Engineered James Hardie fiber-cement, vertical board & batten, ventilated aluminum soffits, and custom brake-bent fascia trims with dual moisture barriers.",
      bgColor: "#0c1527", // deep midnight navy
      textColor: "#ffffff",
      image: "/projects/siding-hardie-board-batten.jpg",
      icon: <Layers className="w-6 h-6 text-[#38bdf8]" />,
      specs: ["James Hardie Certified", "Ventilated Soffits", "Custom Fascia Wraps"],
      actionText: "Configure Siding & Trim Scope",
      onClick: () => handleCardClick("Siding, Soffit & Fascia")
    },
    {
      title: "Seamless Gutters",
      frontTitle: "On-Site Extruded Drainage",
      frontLabel: "SPECIALIZATION 02 // SEAMLESS GUTTERS",
      description: "Heavy-gauge .032\" aluminum rollformed on-site directly from our mobile extrusion unit. Precision hand-mitered corners eliminate leak-prone seams entirely.",
      bgColor: "#0284c7", // rich brand sky blue
      textColor: "#ffffff",
      image: "/projects/gutter-seamless-fascia-run.jpg",
      icon: <Droplets className="w-6 h-6 text-white" />,
      specs: ["Extruded On-Site", ".032\" Heavy Aluminum", "Micro-Mesh Leaf Filtration"],
      actionText: "Configure Gutter Scope",
      onClick: () => handleCardClick("Seamless Gutters")
    },
    {
      title: "General Construction & Remodeling",
      frontTitle: "Turnkey Remodeling & Construction",
      frontLabel: "SPECIALIZATION 03 // REMODELING & CONSTRUCTION",
      description: "Complete residential remodeling, structural porch additions, timber porticos, masonry facades, and turnkey interior renovations with over 4 years of proven field execution.",
      bgColor: "#172033", // architectural graphite slate
      textColor: "#ffffff",
      image: "/projects/gc-timber-porch-framing.jpg",
      icon: <Shield className="w-6 h-6 text-amber-400" />,
      specs: ["Turnkey Remodeling", "Structural Timber & Masonry", "Over 4+ Years Experience"],
      actionText: "Configure Remodeling Scope",
      onClick: () => handleCardClick("General Construction & Remodeling")
    }
  ];

  return (
    <section id="house-breakdown" className="relative w-full bg-transparent">
      <ScrollSplitCard
        imageSrc="/showcase-house-custom.jpg"
        mobileImageSrc="/showcase-house-mobile.jpg"
        cards={cards}
        headerText="GENERAL CONSTRUCTION &amp; REMODELING // 4+ YEARS OF FIELD EXCELLENCE"
        footerText="A Young, High-Growth Powerhouse. 4+ Years of Battle-Tested Craftsmanship."
      />
    </section>
  );
}
