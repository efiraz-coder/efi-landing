import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "אפי רוזנברג | מאמן פסיכולוגי, עסקי ויועץ כלכלי",
  description:
    "גלה את הפוטנציאל שלך עם אימון פסיכולוגי ועסקי מותאם אישית. אפי רוזנברג מלווה אותך להצלחה בחיים האישיים והעסקיים.",
  keywords: [
    "מאמן פסיכולוגי",
    "אימון עסקי",
    "יועץ כלכלי",
    "אפי רוזנברג",
    "קואצ'ינג",
    "פיתוח אישי",
  ],
  openGraph: {
    title: "אפי רוזנברג | מאמן פסיכולוגי, עסקי ויועץ כלכלי",
    description:
      "גלה את הפוטנציאל שלך עם אימון פסיכולוגי ועסקי מותאם אישית.",
    url: "https://efiraz.co.il",
    siteName: "אפי רוזנברג",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "אפי רוזנברג - מאמן פסיכולוגי ועסקי",
              url: "https://efiraz.co.il",
              description:
                "אימון פסיכולוגי, אימון עסקי ויעוץ כלכלי מותאם אישית",
              areaServed: "IL",
              serviceType: [
                "Psychological Coaching",
                "Business Coaching",
                "Financial Consulting",
              ],
            }),
          }}
        />
      </head>
      <body className="font-rubik antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
