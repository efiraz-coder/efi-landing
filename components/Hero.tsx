"use client";

import { motion } from "framer-motion";
import { Check, GraduationCap } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 text-amber-400/90 text-sm font-medium border border-amber-400/20 backdrop-blur-sm">
            מאמן פסיכולוגי, עסקי וייעוץ כלכלי
          </span>
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-gray-400 text-base md:text-lg font-medium"
        >
          לבעלי עסקים ואנשים שרוצים שינוי אמיתי
        </motion.p>

        {/* Main Title - gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
        >
          <span className="gradient-text">גלה את הפוטנציאל שלך</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          שיטת ליווי ייחודית שמשלבת כלים פסיכולוגיים, אסטרטגיה עסקית ותכנון כלכלי
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 rounded-2xl bg-blue-600 text-white text-lg font-bold shadow-xl shadow-blue-600/25 hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            קבע שיחת היכרות חינם
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-4 text-gray-500 text-sm"
        >
          ללא התחייבות • 30 דקות בזום/טלפון
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 flex items-center justify-center gap-6 sm:gap-10"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-sm font-medium">מאות שעות אימון</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <GraduationCap className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-medium">תואר שני</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-9 rounded-full border border-white/15 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
