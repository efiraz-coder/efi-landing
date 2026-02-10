"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "ראשי", href: "#hero" },
  { label: "אודות", href: "#about" },
  { label: "שירותים", href: "#services" },
  { label: "המלצות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="gradient-gold">אפי</span>{" "}
            <span className="text-white">רוזנברג</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mr-3 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/20"
            >
              שיחת היכרות
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold text-center"
            >
              שיחת היכרות
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
