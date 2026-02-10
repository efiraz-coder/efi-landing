"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "דנה כהן",
    role: "מנהלת שיווק",
    text: "האימון עם אפי שינה לי את החיים. הגעתי בתקופה קשה וכיום אני בתפקיד בכיר עם ביטחון עצמי שלא הכרתי.",
    stars: 5,
  },
  {
    name: "יוסי לוי",
    role: "בעל עסק",
    text: "תוך 6 חודשים של ליווי עסקי, הכפלתי את ההכנסות. אפי עזר לי לראות את העסק מזווית חדשה.",
    stars: 5,
  },
  {
    name: "מירב שרון",
    role: "עצמאית",
    text: "היעוץ הכלכלי של אפי שם סדר בכסף שלי. לראשונה בחיים יש לי תוכנית פיננסית ברורה וראש שקט.",
    stars: 5,
  },
  {
    name: "אבי גולדברג",
    role: "יזם סטארטאפ",
    text: "אפי ליווה אותי מרעיון ועד להשקה מוצלחת. השילוב בין הבנה פסיכולוגית לתבונה עסקית הפך הכל לאפשרי.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="section-padding relative noise">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-blue-400/80 text-sm font-medium border border-blue-400/15"
          >
            המלצות
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-bold text-white"
          >
            מה אומרים הלקוחות
          </motion.h2>
        </div>

        {/* Card */}
        <div className="card-dark rounded-3xl p-8 md:p-12 min-h-[260px] flex flex-col justify-center">
          <Quote className="w-8 h-8 text-amber-400/20 mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-blue-500 w-8"
                    : "bg-white/10 w-1.5 hover:bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
