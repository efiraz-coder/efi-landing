"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Calendar } from "lucide-react";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // EmailJS integration - replace with your service/template/public key
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold-dark dark:text-brand-gold text-sm font-medium mb-4"
          >
            צור קשר
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)]"
          >
            בואו נתחיל את המסע שלך
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--card)] rounded-3xl p-8 shadow-glass border border-[var(--border)]"
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--foreground)]">
              שלח הודעה
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
                  שם מלא
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
                  placeholder="הכנס את שמך"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
                    אימייל
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
                    placeholder="your@email.com"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
                    placeholder="050-0000000"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1.5">
                  הודעה
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all resize-none"
                  placeholder="ספר/י לי במה אוכל לעזור..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-blue-dark transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {status === "sending" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    נשלח בהצלחה!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    שגיאה, נסה שוב
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    שלח הודעה
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Cal.com / Scheduling */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--card)] rounded-3xl p-8 shadow-glass border border-[var(--border)] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  קבע פגישה
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  בחר תאריך ושעה נוחים
                </p>
              </div>
            </div>

            {/* Cal.com embed placeholder */}
            <div className="flex-1 rounded-2xl bg-[var(--muted)] border border-[var(--border)] min-h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <Calendar className="w-16 h-16 text-[var(--muted-foreground)]/30 mx-auto mb-4" />
                <p className="text-[var(--muted-foreground)] text-sm mb-4">
                  כאן יוטמע לוח הזמנים של Cal.com
                </p>
                <p className="text-xs text-[var(--muted-foreground)]/60">
                  הוסף את ה-embed code של Cal.com כדי לאפשר קביעת פגישות
                </p>
                {/* 
                  Replace this div with Cal.com embed:
                  <iframe src="https://cal.com/YOUR_USERNAME" ... />
                */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
