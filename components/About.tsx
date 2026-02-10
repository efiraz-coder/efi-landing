"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Users, value: "500+", label: "לקוחות מרוצים" },
  { icon: Award, value: "15+", label: "שנות ניסיון" },
  { icon: TrendingUp, value: "95%", label: "שיעור הצלחה" },
];

export default function About() {
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
              <Image
                src="/assets/profile.png"
                alt="אפי רוזנברג - מאמן פסיכולוגי ועסקי"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
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
              אפי רוזנברג
            </h2>
            <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
              <p>
                מאמן פסיכולוגי מוסמך, יועץ עסקי ויועץ כלכלי עם ניסיון של למעלה
                מ-15 שנה בליווי אנשים ועסקים להצלחה. משלב ידע עמוק בפסיכולוגיה
                חיובית עם כלים פרקטיים מעולם העסקים.
              </p>
              <p>
                הגישה שלי מבוססת על האמונה שכל אדם מחזיק בתוכו את הכוח לשנות את
                חייו. אני מלווה אותך בתהליך אישי ומותאם, מהבנת המצב הנוכחי ועד
                הגעה ליעדים שהצבת לעצמך.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-[var(--card)] shadow-glass"
                >
                  <stat.icon className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-brand-blue">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
