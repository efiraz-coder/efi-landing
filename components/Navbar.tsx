"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--background)]/95 backdrop-blur-md shadow-glass border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="text-xl md:text-2xl font-bold">
            <span className="text-brand-blue">אפי</span>{" "}
            <span className={scrolled ? "text-[var(--foreground)]" : "text-white"}>
              רוזנברג
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  scrolled
                    ? "text-[var(--foreground)] hover:bg-[var(--muted)]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
            <DarkModeToggle />
            <a
              href="#contact"
              className="mr-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark transition-colors shadow-md"
            >
              שיחה חינם
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors",
                scrolled ? "text-[var(--foreground)]" : "text-white"
              )}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--background)] border-t border-[var(--border)] shadow-glass-lg animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-3 rounded-xl bg-brand-blue text-white text-sm font-semibold text-center hover:bg-brand-blue-dark transition-colors"
            >
              קבע שיחה חינם
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
