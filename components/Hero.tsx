"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/coaching.mp4" type="video/mp4" />
      </video>

      {/* Fallback image for mobile / no-video */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url(/assets/hero.jpg)" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold-light text-sm font-medium mb-6 backdrop-blur-sm border border-brand-gold/30">
            מאמן פסיכולוגי, עסקי ויועץ כלכלי
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          גלה את הפוטנציאל שלך
          <br />
          <span className="text-brand-gold">אימון פסיכולוגי ועסקי</span>
          <br />
          מותאם אישית
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          שיטת ליווי ייחודית שמשלבת פסיכולוגיה, אסטרטגיה עסקית ותכנון כלכלי
          כדי לקחת אותך מאיפה שאתה היום לאן שאתה רוצה להגיע
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-2xl bg-brand-blue text-white text-lg font-bold shadow-lg hover:bg-brand-blue-dark hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            קבע שיחה חינם עכשיו
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-2xl bg-white/10 text-white text-lg font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            גלה את השירותים
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
