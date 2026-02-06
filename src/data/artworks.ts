// Artwork data structure and individual artwork definitions

export interface Artwork {
    id: string;
    filename: string;
    title: {
        ar: string;
        en: string;
    };
    description?: {
        ar: string;
        en: string;
    };
    quote?: {
        ar: string;
        en: string;
        author?: {
            ar: string;
            en: string;
        };
    };
    mood: ('shadow' | 'light' | 'passage' | 'night')[];
    year: number;
}

// Define all artworks with their metadata
export const artworks: Artwork[] = [
    {
        id: "uncertain-passage",
        filename: "Uncertain Passage.jpg",
        title: { ar: "عبور غامض", en: "Uncertain Passage" },
        quote: {
            ar: "كل طريقٍ يبدو أطول حين نمشيه وحدنا.",
            en: "Every road seems longer when we walk it alone.",
            author: { ar: "ألبير كامو", en: "Albert Camus" }
        },
        mood: ["passage", "shadow"],
        year: 2024,
    },
    {
        id: "look-up",
        filename: "Look Up.jpg",
        title: { ar: "انظر للأعلى", en: "Look Up" },
        quote: {
            ar: "أرفعُ رأسي… ليس كبرياءً، بل لأن السماء أوسع من الأسئلة.",
            en: "I lift my head—not out of pride, but because the sky is wider than questions.",
            author: { ar: "محمود درويش", en: "Mahmoud Darwish" }
        },
        mood: ["light"],
        year: 2024,
    },
    {
        id: "silent-field",
        filename: "Silent Field.jpg",
        title: { ar: "حقل صامت", en: "Silent Field" },
        quote: {
            ar: "هذا الفراغ ليس خاليًا… إنه فقط لا يشرح نفسه.",
            en: "This emptiness is not empty; it simply does not explain itself.",
        },
        mood: ["shadow", "passage"],
        year: 2024,
    },
    {
        id: "baroud",
        filename: "Baroud.jpg",
        title: { ar: "بارود", en: "Baroud" },
        quote: {
            ar: "هنا، لا يُطلَق البارود، بل الزمن.",
            en: "Here, it is not gunpowder that is fired, but time.",
        },
        mood: ["shadow", "night"],
        year: 2024,
    },
];

// Helper functions
export function getArtworkById(id: string): Artwork | undefined {
    return artworks.find((a) => a.id === id);
}

export function getArtworksByMood(mood: string): Artwork[] {
    if (mood === "all") return artworks;
    return artworks.filter((a) => a.mood.includes(mood as Artwork["mood"][number]));
}

export function getRandomArtwork(): Artwork {
    return artworks[Math.floor(Math.random() * artworks.length)];
}

// Series interface and data
export interface Series {
    slug: string;
    title: {
        ar: string;
        en: string;
    };
    description?: {
        ar: string;
        en: string;
    };
    coverImage: string;
    artworks: Artwork[];
}

export const series: Series[] = [
    {
        slug: "passages",
        title: { ar: "عبور", en: "Passages" },
        description: {
            ar: "استكشاف الفضاءات الانتقالية والعتبات",
            en: "Exploring transitional spaces and thresholds"
        },
        coverImage: "/artworks/Uncertain Passage.jpg",
        artworks: artworks.filter(a => a.mood.includes("passage")),
    },
    {
        slug: "shadows",
        title: { ar: "ظلال", en: "Shadows" },
        description: {
            ar: "دراسات في الضوء والغياب",
            en: "Studies in light and absence"
        },
        coverImage: "/artworks/Silent Field.jpg",
        artworks: artworks.filter(a => a.mood.includes("shadow")),
    },
    {
        slug: "night",
        title: { ar: "ليل", en: "Night" },
        description: {
            ar: "لحظات من الصمت الليلي",
            en: "Moments of nocturnal silence"
        },
        coverImage: "/artworks/Baroud.jpg",
        artworks: artworks.filter(a => a.mood.includes("night")),
    },
];

export function getSeriesBySlug(slug: string): Series | undefined {
    return series.find((s) => s.slug === slug);
}

export function getAllSeries(): Series[] {
    return series;
}

// CV Data - Updated with correct information
export const cvData = {
    email: "me@hassankarasu.art",
    linkedin: "https://linkedin.com/in/hassankarasu",

    experience: [
        {
            title: {
                ar: "EL25 Studio — مساعد إنتاج (متدرب)",
                en: "EL25 Studio — Production Assistant (Trainee)"
            },
            period: { ar: "يوليو 2023 — سبتمبر 2023", en: "July 2023 — September 2023" },
            description: {
                ar: [
                    "المساعدة في إعداد الكاميرا وتصميم الإضاءة والتنسيق أثناء تصوير الإعلانات المصوّرة.",
                    "المشاركة في مراحل ما بعد الإنتاج، بما في ذلك مراجعة اللقطات والتحضير للمونتاج.",
                    "العمل ضمن فرق إبداعية وتقنية وتحت ضغط زمني.",
                ],
                en: [
                    "Supported camera setup, lighting design, and on-site coordination during video advertising shoots.",
                    "Participated in post-production workflows, including footage review and editing preparation.",
                    "Collaborated with creative directors, technical teams, and clients under tight production timelines.",
                ],
            },
        },
        {
            title: {
                ar: "ممارسة فنية مستقلة",
                en: "Independent Visual Practice"
            },
            period: { ar: "2024 — حتى الآن", en: "2024 — Present" },
            description: {
                ar: [
                    "بدأت استكشاف الفن البصري والتصوير الفني.",
                    "العمل على تطوير أعمال بصرية شخصية تتمحور حول الضوء والظل والجو المكاني.",
                ],
                en: [
                    "Began exploring visual art and artistic photography.",
                    "Developing personal visual works focused on light, shadow, and spatial atmosphere.",
                ],
            },
        },
    ],

    skills: [
        { ar: "الإعداد التقني", en: "Technical Setup" },
        { ar: "تحرير الصور", en: "Photo Editing" },
        { ar: "استخدام التصوير كوسيط تعبيري", en: "Photography as a Medium" },
        { ar: "الكتابة الإبداعية", en: "Creative Writing" },
        { ar: "المساهمة في مراحل ما بعد الإنتاج", en: "Post-Production" },
    ],

    languages: [
        { name: { ar: "العربية", en: "Arabic" }, level: { ar: "اللغة الأم", en: "Native" } },
        { name: { ar: "الإنجليزية", en: "English" }, level: { ar: "بطلاقة", en: "Fluent" } },
    ],

    education: [
        {
            title: {
                ar: "البكالوريا في العلوم الفيزيائية",
                en: "Baccalaureate in Physical Sciences"
            },
            institution: {
                ar: "ثانوية الأمير مولاي عبد الله",
                en: "Prince Moulay Abdellah High School"
            },
            year: "2023 — 2026",
            status: { ar: "(قيد الدراسة)", en: "(In Progress)" },
        },
    ],
};
