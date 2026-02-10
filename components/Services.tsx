"use client";

import { motion } from "framer-motion";
import { Brain, Briefcase, PiggyBank } from "lucide-react";
import { useContent } from "@/lib/ContentContext";

const SERVICE_STYLES = [
  {
    icon: Brain,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Briefcase,
    color: "from-brand-gold to-amber-600",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: PiggyBank,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const { services } = useContent();

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold-dark dark:text-brand-gold text-sm font-medium mb-4"
          >
            {services.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
          >
            {services.title}
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.items.map((service, i) => {
            const style = SERVICE_STYLES[i] || SERVICE_STYLES[0];
            const Icon = style.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative rounded-3xl p-8 ${style.bgLight} border border-[var(--border)] hover:shadow-glass-lg transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center mt-6 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  למידע נוסף
                  <span className="mr-2 group-hover:translate-x-[-4px] transition-transform">
                    &larr;
                  </span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
