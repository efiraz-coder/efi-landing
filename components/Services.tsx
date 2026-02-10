"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, PiggyBank, ArrowLeft } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    emoji: "🧠",
    title: "אימון פסיכולוגי",
    description:
      "פיתוח חוסן נפשי, ניהול רגשות, ביטחון עצמי והתמודדות עם חרדות. שיטות מבוססות מחקר שעובדות.",
    gradient: "from-purple-500/20 to-blue-500/20",
    borderHover: "hover:border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "אימון עסקי",
    description:
      "בניית אסטרטגיה, פיתוח מנהיגות, שיפור ביצועים וצמיחה עסקית. מהחזון למציאות.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderHover: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: PiggyBank,
    emoji: "💰",
    title: "ייעוץ כלכלי",
    description:
      "תכנון פיננסי, ניהול תקציב, השקעות חכמות ובניית עתיד כלכלי יציב ובטוח.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    borderHover: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding relative noise">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-amber-400/80 text-sm font-medium border border-amber-400/15"
          >
            השירותים שלי
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-bold text-white"
          >
            איך אני יכול לעזור לך?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative card-dark rounded-3xl p-8 ${service.borderHover} transition-all duration-300 group cursor-default overflow-hidden`}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
              />

              <div className="relative z-10">
                {/* Emoji + Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{service.emoji}</span>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  למידע נוסף
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
