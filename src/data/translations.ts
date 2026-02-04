// Internationalization translations for Arabic and English
export const translations = {
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      work: "الأعمال",
      cv: "السيرة",
      contact: "تواصل",
    },
    // Home page
    home: {
      artistName: "حسن كراسو",
      title: "فنان بصري ومصور",
      enterGallery: "ادخل المعرض",
      tagline: "العبور · الضوء والظل · الصمت",
    },
    // Work page
    work: {
      title: "الأعمال",
      seriesCount: "صور",
      filters: {
        all: "الكل",
        shadow: "ظل",
        light: "ضوء",
        passage: "عبور",
        night: "ليل",
      },
    },
    // Series view
    series: {
      backToWork: "العودة للأعمال",
      bookView: "عرض الكتاب",
      scrollView: "عرض التمرير",
    },
    // Artwork detail
    artwork: {
      previous: "السابق",
      next: "التالي",
      backToSeries: "العودة للسلسلة",
      fullscreen: "ملء الشاشة",
      exitFullscreen: "خروج",
    },
    // CV page
    cv: {
      title: "السيرة الذاتية",
      artistName: "حسن كراسو",
      about: "نبذة عني",
      aboutText: [
        "فنان بصري أستكشف التصوير من خلال الملاحظة المتأنية والوعي المكاني.",
        "تنشغل أعمالي بالضوء والظل والصمت والفضاءات الانتقالية.",
        "يظهر الحضور الإنساني بشكل خفي عبر الجو، لا عبر التمثيل المباشر.",
      ],
      experience: "الخبرات",
      skills: "المهارات",
      languages: "اللغات",
      education: "التعليم",
      downloadCV: "تحميل السيرة الذاتية",
    },
    // Contact page
    contact: {
      title: "تواصل",
      emailLabel: "البريد الإلكتروني",
      copyEmail: "نسخ البريد",
      copied: "تم النسخ",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال",
      },
      success: "تم استلام رسالتك. شكراً لمرورك.",
    },
    // 404 page
    notFound: {
      title: "صفحة غير موجودة",
      message: "يبدو أنك ضللت الطريق في الظلام.",
      backHome: "العودة للرئيسية",
    },
    // Misc
    misc: {
      loading: "جاري التحميل...",
      soundOn: "الصوت: مفعّل",
      soundOff: "الصوت: مغلق",
      passage: "عبور",
      shadow: "ظل",
      silence: "صمت",
      light: "ضوء",
      night: "ليل",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      work: "Work",
      cv: "CV",
      contact: "Contact",
    },
    // Home page
    home: {
      artistName: "Hassan Karasu",
      title: "Visual Artist & Photographer",
      enterGallery: "Enter the gallery",
      tagline: "Passage · Light and Shadow · Silence",
    },
    // Work page
    work: {
      title: "Work",
      seriesCount: "images",
      filters: {
        all: "All",
        shadow: "Shadow",
        light: "Light",
        passage: "Passage",
        night: "Night",
      },
    },
    // Series view
    series: {
      backToWork: "Back to Work",
      bookView: "Book View",
      scrollView: "Scroll View",
    },
    // Artwork detail
    artwork: {
      previous: "Previous",
      next: "Next",
      backToSeries: "Back to Series",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit",
    },
    // CV page
    cv: {
      title: "Curriculum Vitae",
      artistName: "Hassan Karasu",
      about: "About Me",
      aboutText: [
        "Visual Artist exploring photography through attentive observation and spatial awareness.",
        "My work engages with light, shadow, silence, and transitional spaces.",
        "Human presence emerges subtly through atmosphere rather than direct depiction.",
      ],
      experience: "Experience",
      skills: "Skills",
      languages: "Languages",
      education: "Education",
      downloadCV: "Download CV",
    },
    // Contact page
    contact: {
      title: "Contact",
      emailLabel: "Email",
      copyEmail: "Copy Email",
      copied: "Copied",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
      },
      success: "Your message has been received. Thank you for passing through.",
    },
    // 404 page
    notFound: {
      title: "Page Not Found",
      message: "It seems you've lost your way in the darkness.",
      backHome: "Return Home",
    },
    // Misc
    misc: {
      loading: "Loading...",
      soundOn: "Sound: On",
      soundOff: "Sound: Off",
      passage: "Passage",
      shadow: "Shadow",
      silence: "Silence",
      light: "Light",
      night: "Night",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
