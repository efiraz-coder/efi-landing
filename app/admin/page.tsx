"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Save,
  LogIn,
  Upload,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import type { SiteContent, TestimonialItem, ServiceItem } from "@/lib/content";
import { DEFAULT_CONTENT } from "@/lib/content";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const storedPass = useRef("");

  // Load content on auth
  const loadContent = useCallback(async (pass: string) => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch {
      // Use defaults
    }
    storedPass.current = pass;
  }, []);

  const handleLogin = async () => {
    // Try to fetch content with password to validate
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
        setAuthenticated(true);
        storedPass.current = password;
        localStorage.setItem("admin_pass", password);
      }
    } catch {
      setAuthenticated(true);
      storedPass.current = password;
    }
  };

  // Check saved password
  useEffect(() => {
    const saved = localStorage.getItem("admin_pass");
    if (saved) {
      setPassword(saved);
      storedPass.current = saved;
      setAuthenticated(true);
      loadContent(saved);
    }
  }, [loadContent]);

  const saveContent = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPass.current.trim(),
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("Save failed:", res.status, err);
        setSaveStatus("error");
      }
    } catch (e) {
      console.error("Save error:", e);
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const uploadFile = async (
    file: File,
    fieldPath: string
  ): Promise<string | null> => {
    setUploadingField(fieldPath);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": storedPass.current },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setUploadingField(null);
        return data.url;
      }
    } catch {
      // Fail silently
    }
    setUploadingField(null);
    return null;
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    section: keyof SiteContent,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file, field);
    if (url) {
      setContent((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: url },
      }));
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">פאנל ניהול</h1>
            <p className="text-gray-400 text-sm mt-2">הכנס סיסמה כדי לערוך את האתר</p>
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="סיסמה"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          >
            כניסה
          </button>
        </div>
      </div>
    );
  }

  // Section navigation
  const SECTIONS = [
    { id: "hero", label: "Hero - ראשי", icon: "🎬" },
    { id: "about", label: "אודות", icon: "👤" },
    { id: "services", label: "שירותים", icon: "💼" },
    { id: "testimonials", label: "המלצות", icon: "⭐" },
    { id: "contact", label: "צור קשר", icon: "📧" },
    { id: "footer", label: "פוטר", icon: "🔗" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">
              E
            </div>
            <span className="font-bold">עורך האתר</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-sm hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              צפה באתר
            </a>
            <button
              onClick={saveContent}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {saveStatus === "saving" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saveStatus === "saved" ? (
                <CheckCircle2 className="w-4 h-4 text-green-300" />
              ) : saveStatus === "error" ? (
                <AlertCircle className="w-4 h-4 text-red-300" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saveStatus === "saving"
                ? "שומר..."
                : saveStatus === "saved"
                ? "נשמר!"
                : saveStatus === "error"
                ? "שגיאה"
                : "שמור שינויים"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-20 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeSection === s.id
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile section tabs */}
        <div className="lg:hidden fixed bottom-0 right-0 left-0 bg-gray-900 border-t border-gray-800 z-40 overflow-x-auto">
          <div className="flex px-2 py-2 gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                  activeSection === s.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 min-w-0 pb-20 lg:pb-0">
          {/* HERO */}
          {activeSection === "hero" && (
            <SectionEditor title="Hero - מסך ראשי">
              <FieldGroup label="תג עליון">
                <TextInput
                  value={content.hero.badge}
                  onChange={(v) =>
                    setContent((p) => ({ ...p, hero: { ...p.hero, badge: v } }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת - שורה 1">
                <TextInput
                  value={content.hero.title1}
                  onChange={(v) =>
                    setContent((p) => ({ ...p, hero: { ...p.hero, title1: v } }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת - שורה 2 (צבע זהב)">
                <TextInput
                  value={content.hero.title2}
                  onChange={(v) =>
                    setContent((p) => ({ ...p, hero: { ...p.hero, title2: v } }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת - שורה 3">
                <TextInput
                  value={content.hero.title3}
                  onChange={(v) =>
                    setContent((p) => ({ ...p, hero: { ...p.hero, title3: v } }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="תיאור">
                <TextArea
                  value={content.hero.subtitle}
                  onChange={(v) =>
                    setContent((p) => ({ ...p, hero: { ...p.hero, subtitle: v } }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="טקסט כפתור ראשי">
                <TextInput
                  value={content.hero.ctaPrimary}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hero: { ...p.hero, ctaPrimary: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="טקסט כפתור משני">
                <TextInput
                  value={content.hero.ctaSecondary}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      hero: { ...p.hero, ctaSecondary: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="תמונת רקע">
                <FileUpload
                  currentUrl={content.hero.heroImage}
                  accept="image/*"
                  uploading={uploadingField === "hero.heroImage"}
                  icon={<ImageIcon className="w-5 h-5" />}
                  onChange={(e) =>
                    handleFileUpload(e, "hero.heroImage", "hero", "heroImage")
                  }
                  onUrlChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      hero: { ...p.hero, heroImage: url },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="וידאו רקע">
                <FileUpload
                  currentUrl={content.hero.heroVideo}
                  accept="video/*"
                  uploading={uploadingField === "hero.heroVideo"}
                  icon={<Video className="w-5 h-5" />}
                  onChange={(e) =>
                    handleFileUpload(e, "hero.heroVideo", "hero", "heroVideo")
                  }
                  onUrlChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      hero: { ...p.hero, heroVideo: url },
                    }))
                  }
                />
              </FieldGroup>
            </SectionEditor>
          )}

          {/* ABOUT */}
          {activeSection === "about" && (
            <SectionEditor title="אודות">
              <FieldGroup label="שם / כותרת">
                <TextInput
                  value={content.about.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      about: { ...p.about, title: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="פסקה ראשונה">
                <TextArea
                  value={content.about.paragraph1}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      about: { ...p.about, paragraph1: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="פסקה שנייה">
                <TextArea
                  value={content.about.paragraph2}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      about: { ...p.about, paragraph2: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="תמונת פרופיל">
                <FileUpload
                  currentUrl={content.about.profileImage}
                  accept="image/*"
                  uploading={uploadingField === "about.profileImage"}
                  icon={<ImageIcon className="w-5 h-5" />}
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      "about.profileImage",
                      "about",
                      "profileImage"
                    )
                  }
                  onUrlChange={(url) =>
                    setContent((p) => ({
                      ...p,
                      about: { ...p.about, profileImage: url },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="סטטיסטיקות">
                {content.about.stats.map((stat, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <input
                      value={stat.value}
                      onChange={(e) => {
                        const stats = [...content.about.stats];
                        stats[i] = { ...stats[i], value: e.target.value };
                        setContent((p) => ({
                          ...p,
                          about: { ...p.about, stats },
                        }));
                      }}
                      placeholder="ערך"
                      className="w-24 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm"
                    />
                    <input
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...content.about.stats];
                        stats[i] = { ...stats[i], label: e.target.value };
                        setContent((p) => ({
                          ...p,
                          about: { ...p.about, stats },
                        }));
                      }}
                      placeholder="תווית"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm"
                    />
                  </div>
                ))}
              </FieldGroup>
            </SectionEditor>
          )}

          {/* SERVICES */}
          {activeSection === "services" && (
            <SectionEditor title="שירותים">
              <FieldGroup label="תג">
                <TextInput
                  value={content.services.badge}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      services: { ...p.services, badge: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת">
                <TextInput
                  value={content.services.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      services: { ...p.services, title: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="שירותים">
                <ItemList<ServiceItem>
                  items={content.services.items}
                  onChange={(items) =>
                    setContent((p) => ({
                      ...p,
                      services: { ...p.services, items },
                    }))
                  }
                  renderItem={(item, i, update) => (
                    <div className="space-y-3">
                      <input
                        value={item.title}
                        onChange={(e) => update({ ...item, title: e.target.value })}
                        placeholder="שם השירות"
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm font-medium"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          update({ ...item, description: e.target.value })
                        }
                        placeholder="תיאור"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm resize-none"
                      />
                    </div>
                  )}
                  newItem={{ title: "", description: "" }}
                />
              </FieldGroup>
            </SectionEditor>
          )}

          {/* TESTIMONIALS */}
          {activeSection === "testimonials" && (
            <SectionEditor title="המלצות">
              <FieldGroup label="תג">
                <TextInput
                  value={content.testimonials.badge}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      testimonials: { ...p.testimonials, badge: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת">
                <TextInput
                  value={content.testimonials.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      testimonials: { ...p.testimonials, title: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="עדויות">
                <ItemList<TestimonialItem>
                  items={content.testimonials.items}
                  onChange={(items) =>
                    setContent((p) => ({
                      ...p,
                      testimonials: { ...p.testimonials, items },
                    }))
                  }
                  renderItem={(item, i, update) => (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          value={item.name}
                          onChange={(e) =>
                            update({ ...item, name: e.target.value })
                          }
                          placeholder="שם"
                          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm"
                        />
                        <input
                          value={item.role}
                          onChange={(e) =>
                            update({ ...item, role: e.target.value })
                          }
                          placeholder="תפקיד"
                          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm"
                        />
                      </div>
                      <textarea
                        value={item.text}
                        onChange={(e) =>
                          update({ ...item, text: e.target.value })
                        }
                        placeholder="טקסט ההמלצה"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">דירוג:</span>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            onClick={() => update({ ...item, stars: s })}
                            className="p-0.5"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                s <= item.stars
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  newItem={{ name: "", role: "", text: "", stars: 5 }}
                />
              </FieldGroup>
            </SectionEditor>
          )}

          {/* CONTACT */}
          {activeSection === "contact" && (
            <SectionEditor title="צור קשר">
              <FieldGroup label="תג">
                <TextInput
                  value={content.contact.badge}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      contact: { ...p.contact, badge: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת">
                <TextInput
                  value={content.contact.title}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      contact: { ...p.contact, title: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת טופס">
                <TextInput
                  value={content.contact.formTitle}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      contact: { ...p.contact, formTitle: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="כותרת לוח פגישות">
                <TextInput
                  value={content.contact.calTitle}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      contact: { ...p.contact, calTitle: v },
                    }))
                  }
                />
              </FieldGroup>
            </SectionEditor>
          )}

          {/* FOOTER */}
          {activeSection === "footer" && (
            <SectionEditor title="פוטר">
              <FieldGroup label="טלפון">
                <TextInput
                  value={content.footer.phone}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      footer: { ...p.footer, phone: v },
                    }))
                  }
                  dir="ltr"
                />
              </FieldGroup>
              <FieldGroup label="אימייל">
                <TextInput
                  value={content.footer.email}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      footer: { ...p.footer, email: v },
                    }))
                  }
                  dir="ltr"
                />
              </FieldGroup>
              <FieldGroup label="מיקום">
                <TextInput
                  value={content.footer.location}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      footer: { ...p.footer, location: v },
                    }))
                  }
                />
              </FieldGroup>
              <FieldGroup label="מספר וואטסאפ (בפורמט בינלאומי, ללא +)">
                <TextInput
                  value={content.footer.whatsappNumber}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      footer: { ...p.footer, whatsappNumber: v },
                    }))
                  }
                  dir="ltr"
                  placeholder="972501234567"
                />
              </FieldGroup>
              <FieldGroup label="הודעת וואטסאפ">
                <TextInput
                  value={content.footer.whatsappMessage}
                  onChange={(v) =>
                    setContent((p) => ({
                      ...p,
                      footer: { ...p.footer, whatsappMessage: v },
                    }))
                  }
                />
              </FieldGroup>
            </SectionEditor>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function SectionEditor({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  dir,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
    />
  );
}

function FileUpload({
  currentUrl,
  accept,
  uploading,
  icon,
  onChange,
  onUrlChange,
}: {
  currentUrl: string;
  accept: string;
  uploading: boolean;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const isImage = accept.startsWith("image");

  return (
    <div className="space-y-3">
      {/* Current preview */}
      {currentUrl && (
        <div className="rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentUrl}
              alt="preview"
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="p-4 flex items-center gap-3 text-sm text-gray-300">
              <Video className="w-5 h-5" />
              <span className="truncate">{currentUrl}</span>
            </div>
          )}
        </div>
      )}

      {/* URL input */}
      <input
        type="text"
        value={currentUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="URL של הקובץ או העלה קובץ חדש"
        dir="ltr"
        className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      {/* Upload button */}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {uploading ? "מעלה..." : "העלה קובץ"}
        <span className="text-gray-500 mr-2">{icon}</span>
      </button>
    </div>
  );
}

function ItemList<T>({
  items,
  onChange,
  renderItem,
  newItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode;
  newItem: T;
}) {
  const [expanded, setExpanded] = useState<number | null>(0);

  const updateItem = (index: number, item: T) => {
    const next = [...items];
    next[index] = item;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    setExpanded(null);
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setExpanded(target);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden"
        >
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <span className="text-sm font-medium">
              פריט {i + 1}
              {(item as Record<string, unknown>).title
                ? ` - ${(item as Record<string, unknown>).title}`
                : (item as Record<string, unknown>).name
                ? ` - ${(item as Record<string, unknown>).name}`
                : ""}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveItem(i, -1);
                }}
                className="p-1 rounded hover:bg-gray-700"
                disabled={i === 0}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveItem(i, 1);
                }}
                className="p-1 rounded hover:bg-gray-700"
                disabled={i === items.length - 1}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(i);
                }}
                className="p-1 rounded hover:bg-red-900/50 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {expanded === i ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
          {expanded === i && (
            <div className="px-4 pb-4">
              {renderItem(item, i, (updated) => updateItem(i, updated))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          onChange([...items, newItem]);
          setExpanded(items.length);
        }}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-gray-600 text-sm text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        הוסף פריט
      </button>
    </div>
  );
}
