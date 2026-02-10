// Content types and defaults for the landing page CMS

export interface HeroContent {
  badge: string;
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: string;
  heroVideo: string;
}

export interface AboutContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  profileImage: string;
  stats: { value: string; label: string }[];
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesContent {
  badge: string;
  title: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export interface TestimonialsContent {
  badge: string;
  title: string;
  items: TestimonialItem[];
}

export interface ContactContent {
  badge: string;
  title: string;
  formTitle: string;
  calTitle: string;
  calSubtitle: string;
}

export interface FooterContent {
  phone: string;
  email: string;
  location: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  footer: FooterContent;
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "מאמן פסיכולוגי, עסקי ויועץ כלכלי",
    title1: "גלה את הפוטנציאל שלך",
    title2: "אימון פסיכולוגי ועסקי",
    title3: "מותאם אישית",
    subtitle:
      "שיטת ליווי ייחודית שמשלבת פסיכולוגיה, אסטרטגיה עסקית ותכנון כלכלי כדי לקחת אותך מאיפה שאתה היום לאן שאתה רוצה להגיע",
    ctaPrimary: "קבע שיחה חינם עכשיו",
    ctaSecondary: "גלה את השירותים",
    heroImage: "/assets/hero.jpg",
    heroVideo: "/assets/coaching.mp4",
  },
  about: {
    title: "אפי רוזנברג",
    paragraph1:
      "מאמן פסיכולוגי מוסמך, יועץ עסקי ויועץ כלכלי עם ניסיון של למעלה מ-15 שנה בליווי אנשים ועסקים להצלחה. משלב ידע עמוק בפסיכולוגיה חיובית עם כלים פרקטיים מעולם העסקים.",
    paragraph2:
      "הגישה שלי מבוססת על האמונה שכל אדם מחזיק בתוכו את הכוח לשנות את חייו. אני מלווה אותך בתהליך אישי ומותאם, מהבנת המצב הנוכחי ועד הגעה ליעדים שהצבת לעצמך.",
    profileImage: "/assets/profile.png",
    stats: [
      { value: "500+", label: "לקוחות מרוצים" },
      { value: "15+", label: "שנות ניסיון" },
      { value: "95%", label: "שיעור הצלחה" },
    ],
  },
  services: {
    badge: "השירותים שלי",
    title: "איך אני יכול לעזור לך?",
    items: [
      {
        title: "אימון פסיכולוגי",
        description:
          "ליווי אישי לפיתוח חוסן נפשי, ניהול רגשות, התמודדות עם חרדות ובניית ביטחון עצמי. שיטות מבוססות מחקר להעצמה אישית.",
      },
      {
        title: "אימון עסקי",
        description:
          "בניית אסטרטגיה עסקית, פיתוח מנהיגות, שיפור ביצועים ויצירת תהליכי צמיחה. מהרעיון ועד ההגשמה.",
      },
      {
        title: "יעוץ כלכלי",
        description:
          "תכנון פיננסי אישי ועסקי, ניהול תקציב, השקעות חכמות ובניית עתיד כלכלי יציב ובטוח.",
      },
    ],
  },
  testimonials: {
    badge: "המלצות",
    title: "מה אומרים הלקוחות",
    items: [
      {
        name: "דנה כהן",
        role: "מנהלת שיווק",
        text: "האימון עם אפי שינה לי את החיים. הגעתי בתקופה קשה וכיום אני בתפקיד בכיר עם ביטחון עצמי שלא הכרתי. המתודולוגיה שלו פשוט עובדת.",
        stars: 5,
      },
      {
        name: "יוסי לוי",
        role: "בעל עסק",
        text: "תוך 6 חודשים של ליווי עסקי, הכפלתי את ההכנסות. אפי עזר לי לראות את העסק מזווית חדשה ולבנות אסטרטגיה שעובדת.",
        stars: 5,
      },
      {
        name: "מירב שרון",
        role: "עצמאית",
        text: "היעוץ הכלכלי של אפי שם סדר בכסף שלי. לראשונה בחיים יש לי תוכנית פיננסית ברורה, חיסכון, וראש שקט.",
        stars: 5,
      },
      {
        name: "אבי גולדברג",
        role: "יזם סטארטאפ",
        text: "אפי ליווה אותי מרעיון ועד להשקה מוצלחת. השילוב בין הבנה פסיכולוגית לתבונה עסקית הפך את הכל לאפשרי. ממליץ בחום.",
        stars: 5,
      },
    ],
  },
  contact: {
    badge: "צור קשר",
    title: "בואו נתחיל את המסע שלך",
    formTitle: "שלח הודעה",
    calTitle: "קבע פגישה",
    calSubtitle: "בחר תאריך ושעה נוחים",
  },
  footer: {
    phone: "050-000-0000",
    email: "efi@efiraz.co.il",
    location: "ישראל",
    whatsappNumber: "972500000000",
    whatsappMessage: "שלום אפי, אשמח לשמוע פרטים נוספים",
  },
};
