import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  const socialIcons = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1DyTvo4gBJ/",
      svg: (
        <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/edward_sding_guttets_llc?igsh=dDMyOHcxbmZyYjVj",
      svg: (
        <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/15027143707",
      svg: (
        <FaWhatsapp className="size-6 transition-transform duration-200 hover:scale-110" />
      )
    }
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 font-sans relative z-20 w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <img src="/logo.png" alt="Edward Siding & Gutter" className="h-16 w-auto mb-6 filter brightness-110 drop-shadow-2xl" />
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-white/80 text-lg font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <a href="tel:+15027143707" className="hover:text-[#38bdf8] transition-colors">(502) 714-3707</a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <a href="tel:+15027599838" className="hover:text-[#38bdf8] transition-colors">(502) 759-9838</a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href="mailto:edwarsiding@gmail.com" className="hover:text-[#38bdf8] transition-colors">edwarsiding@gmail.com</a>
            </div>
          </div>
        </div>

        <nav className="mb-8 w-full">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-white/60 hover:text-white transition-all duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#38bdf8] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm">
          {socialIcons.map((icon) => (
            <a
              key={icon.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
              className="text-white/60 hover:text-[#38bdf8] transition-colors duration-300"
              href={icon.href}
            >
              {icon.svg}
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-white/40 mt-4">
          &copy; {new Date().getFullYear()} Edward Siding & Gutter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
