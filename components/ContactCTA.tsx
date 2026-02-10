"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Shield } from "lucide-react";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("sent");
      setForm({ name: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section-padding relative noise">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-amber-400/80 text-sm font-medium border border-amber-400/15"
          >
            צור קשר
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl font-bold text-white"
          >
            בואו נתחיל
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-400"
          >
            השאר פרטים ואחזור אליך תוך 24 שעות
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card-dark rounded-3xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                placeholder="שם מלא"
              />
            </div>
            <div>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                placeholder="טלפון"
                dir="ltr"
              />
            </div>
            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                placeholder="אימייל (אופציונלי)"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-2.5 hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/20 disabled:opacity-60 mt-2"
            >
              {status === "sending" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === "sent" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  נשלח בהצלחה! אחזור אליך בקרוב
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  שגיאה, נסה שוב
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  שלח ואקבע שיחה עכשיו
                </>
              )}
            </button>
          </form>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 mt-5 text-gray-500 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>הפרטים שלך מאובטחים ולא יועברו לצד שלישי</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
