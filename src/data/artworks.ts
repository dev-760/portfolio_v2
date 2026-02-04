// Artwork data structure and series definitions

export interface Artwork {
    id: string;
    filename: string;
    title: {
        ar: string;
        en: string;
    };
    series: string;
    mood: ('shadow' | 'light' | 'passage' | 'night')[];
    year: number;
    statement?: {
        ar: string;
        en: string;
    };
}

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
    brief?: {
        ar: string;
        en: string;
    };
    cover: string;
    artworks: Artwork[];
}

// Define all artworks with their metadata
export const artworks: Artwork[] = [
    {
        id: "above-trees",
        filename: "Above Trees.jpg",
        title: { ar: "فوق الأشجار", en: "Above Trees" },
        series: "light-passages",
        mood: ["light", "passage"],
        year: 2024,
    },
    {
        id: "blue-passage",
        filename: "Blue Passage.jpg",
        title: { ar: "العبور الأزرق", en: "Blue Passage" },
        series: "light-passages",
        mood: ["passage", "light"],
        year: 2024,
        statement: { ar: "عبور", en: "Passage" },
    },
    {
        id: "burning-sky",
        filename: "Burning Sky.jpg",
        title: { ar: "السماء المشتعلة", en: "Burning Sky" },
        series: "light-passages",
        mood: ["light"],
        year: 2024,
    },
    {
        id: "golden-canopy",
        filename: "Golden Canopy.jpg",
        title: { ar: "المظلة الذهبية", en: "Golden Canopy" },
        series: "light-passages",
        mood: ["light"],
        year: 2024,
        statement: { ar: "ضوء", en: "Light" },
    },
    {
        id: "long-corridor",
        filename: "Long Corridor.jpg",
        title: { ar: "الممر الطويل", en: "Long Corridor" },
        series: "urban-silence",
        mood: ["passage", "shadow"],
        year: 2024,
        statement: { ar: "عبور", en: "Passage" },
    },
    {
        id: "moon-over-city",
        filename: "Moon Over City.jpg",
        title: { ar: "القمر فوق المدينة", en: "Moon Over City" },
        series: "night-traces",
        mood: ["night", "shadow"],
        year: 2024,
        statement: { ar: "صمت", en: "Silence" },
    },
    {
        id: "passing-city",
        filename: "Passing City.jpg",
        title: { ar: "المدينة العابرة", en: "Passing City" },
        series: "urban-silence",
        mood: ["passage", "shadow"],
        year: 2024,
    },
    {
        id: "quiet-hour",
        filename: "Quiet Hour.jpg",
        title: { ar: "الساعة الهادئة", en: "Quiet Hour" },
        series: "urban-silence",
        mood: ["shadow", "night"],
        year: 2024,
        statement: { ar: "صمت", en: "Silence" },
    },
    {
        id: "quiet-passage",
        filename: "Quiet Passage.jpg",
        title: { ar: "العبور الهادئ", en: "Quiet Passage" },
        series: "urban-silence",
        mood: ["passage", "shadow"],
        year: 2024,
        statement: { ar: "عبور", en: "Passage" },
    },
    {
        id: "rain-crossing",
        filename: "Rain Crossing.jpg",
        title: { ar: "عبور المطر", en: "Rain Crossing" },
        series: "urban-silence",
        mood: ["passage", "shadow"],
        year: 2024,
    },
    {
        id: "red-stop",
        filename: "Red Stop.jpg",
        title: { ar: "التوقف الأحمر", en: "Red Stop" },
        series: "night-traces",
        mood: ["night", "shadow"],
        year: 2024,
    },
    {
        id: "silent-crowd",
        filename: "Silent Crowd.jpg",
        title: { ar: "الحشد الصامت", en: "Silent Crowd" },
        series: "urban-silence",
        mood: ["shadow", "passage"],
        year: 2024,
        statement: { ar: "صمت", en: "Silence" },
    },
    {
        id: "silent-harvest",
        filename: "Silent Harvest.jpg",
        title: { ar: "الحصاد الصامت", en: "Silent Harvest" },
        series: "light-passages",
        mood: ["light"],
        year: 2024,
    },
    {
        id: "silent-riders",
        filename: "Silent Riders.jpg",
        title: { ar: "الراكبون الصامتون", en: "Silent Riders" },
        series: "urban-silence",
        mood: ["shadow", "passage"],
        year: 2024,
    },
];

// Define series with their artworks grouped
export const series: Series[] = [
    {
        slug: "light-passages",
        title: { ar: "ممرات الضوء", en: "Light Passages" },
        description: {
            ar: "لحظات حيث يخترق الضوء الظلام",
            en: "Moments where light pierces through darkness",
        },
        brief: {
            ar: "استكشاف اللحظات العابرة حين يتسلل الضوء عبر الأشجار والمباني، محولاً المألوف إلى سحري.",
            en: "Exploring fleeting moments when light filters through trees and structures, transforming the ordinary into the magical.",
        },
        cover: "Golden Canopy.jpg",
        artworks: artworks.filter((a) => a.series === "light-passages"),
    },
    {
        slug: "urban-silence",
        title: { ar: "صمت المدينة", en: "Urban Silence" },
        description: {
            ar: "الهدوء في قلب الضجيج",
            en: "Quietude in the heart of noise",
        },
        brief: {
            ar: "البحث عن الصمت في الفضاءات الحضرية — الممرات والشوارع والزوايا المنسية حيث تتوقف المدينة عن الصراخ.",
            en: "Finding silence within urban spaces — corridors, streets, and forgotten corners where the city stops screaming.",
        },
        cover: "Long Corridor.jpg",
        artworks: artworks.filter((a) => a.series === "urban-silence"),
    },
    {
        slug: "night-traces",
        title: { ar: "آثار الليل", en: "Night Traces" },
        description: {
            ar: "ما يتبقى بعد غياب الشمس",
            en: "What remains after the sun departs",
        },
        brief: {
            ar: "توثيق الآثار التي يتركها الليل — الأضواء الاصطناعية والظلال الممتدة والحضور الإنساني كأثر وليس كموضوع.",
            en: "Documenting the traces night leaves behind — artificial lights, extended shadows, and human presence as echo rather than subject.",
        },
        cover: "Moon Over City.jpg",
        artworks: artworks.filter((a) => a.series === "night-traces"),
    },
];

// Helper functions
export function getArtworkById(id: string): Artwork | undefined {
    return artworks.find((a) => a.id === id);
}

export function getSeriesBySlug(slug: string): Series | undefined {
    return series.find((s) => s.slug === slug);
}

export function getArtworksByMood(mood: string): Artwork[] {
    if (mood === "all") return artworks;
    return artworks.filter((a) => a.mood.includes(mood as Artwork["mood"][number]));
}

export function getRandomArtwork(): Artwork {
    return artworks[Math.floor(Math.random() * artworks.length)];
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
