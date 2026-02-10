"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
          message: form.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => {
      setStatus("idle");
      if (status !== "error") onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[var(--card)] rounded-3xl p-6 md:p-8 shadow-glass-lg border border-[var(--border)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-xl hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
              קבע שיחת ייעוץ חינם
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              השאר פרטים ואחזור אליך תוך 24 שעות
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="שם מלא"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="אימייל"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
                />
              </div>
              <textarea
                rows={3}
                placeholder="מה תרצה לשפר בחייך?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-blue-dark transition-all shadow-md disabled:opacity-60"
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
                    שלח ואקבע שיחה
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
