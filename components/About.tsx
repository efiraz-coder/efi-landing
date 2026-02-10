"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, TrendingUp } from "lucide-react";
import { useContent } from "@/lib/ContentContext";

const STAT_ICONS = [Users, Award, TrendingUp];

export default function About() {
  const { about } = useContent();

  return (
    <section id="about" className="section-padding bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-glass-lg">
              {about.profileImage.startsWith("http") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={about.profileImage}
                  alt={about.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={about.profileImage}
                  alt={about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-brand-gold/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-brand-blue/20 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium mb-4">
              אודות
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--foreground)]">
              {about.title}
            </h2>
            <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {about.stats.map((stat, i) => {
                const Icon = STAT_ICONS[i] || Users;
                return (
                  <div
                    key={i}
                    className="text-center p-4 rounded-2xl bg-[var(--card)] shadow-glass"
                  >
                    <Icon className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-brand-blue">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
