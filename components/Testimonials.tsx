"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Quote } from "lucide-react";
import { useContent } from "@/lib/ContentContext";

export default function Testimonials() {
  const { testimonials } = useContent();
  const [current, setCurrent] = useState(0);
  const items = testimonials.items;

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setCurrent((prev) => (prev - 1 + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (items.length === 0) return null;

  const testimonial = items[current];

  return (
    <section id="testimonials" className="section-padding bg-[var(--muted)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium mb-4"
          >
            {testimonials.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
          >
            {testimonials.title}
          </motion.h2>
        </div>

        <div className="relative">
          <div className="bg-[var(--card)] rounded-3xl p-8 md:p-12 shadow-glass min-h-[280px] flex flex-col justify-center">
            <Quote className="w-10 h-10 text-brand-gold/30 mb-4" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl leading-relaxed text-[var(--foreground)] mb-8">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[var(--foreground)]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl bg-[var(--card)] shadow-glass hover:shadow-glass-lg transition-all text-[var(--foreground)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-brand-blue w-8"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl bg-[var(--card)] shadow-glass hover:shadow-glass-lg transition-all text-[var(--foreground)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
