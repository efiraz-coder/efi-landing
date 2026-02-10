"use client";

import { motion } from "framer-motion";
import { Target, Heart, TrendingUp } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Heart,
    title: "גישה אישית",
    text: "כל תהליך מותאם אישית, עם הקשבה עמוקה לצרכים ולמטרות שלך",
  },
  {
    icon: Target,
    title: "מיקוד בתוצאות",
    text: "מתודולוגיה מבוססת מחקר שמובילה לשינוי מדיד ומהיר",
  },
  {
    icon: TrendingUp,
    title: "צמיחה מתמדת",
    text: "ליווי מקצועי שמוביל להתפתחות בכל תחומי החיים",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative noise">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm font-medium border border-white/8"
          >
            אודות
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-bold text-white"
          >
            למה לבחור בי?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-dark rounded-2xl p-8 text-center hover:border-white/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600/10 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
