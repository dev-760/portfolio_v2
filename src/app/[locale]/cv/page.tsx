"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";
import { cvData } from "@/data/artworks";
import Accordion from "@/components/Accordion";

interface CVPageProps {
    params: Promise<{ locale: string }>;
}

export default function CVPage({ params }: CVPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [photoLoaded, setPhotoLoaded] = useState(false);
    const photoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

    // Trigger photo animation after mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhotoLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const t = getTranslations(locale);

    const accordionItems = [
        {
            id: "experience",
            title: t.cv.experience,
            content: (
                <ul className="cv-list">
                    {cvData.experience.map((exp, index) => (
                        <li key={index} className="cv-list-item">
                            <h4 className="cv-list-title">{exp.title[locale]}</h4>
                            <p className="cv-list-meta">{exp.period[locale]}</p>
                            <div className="cv-list-description">
                                {exp.description[locale].map((line, i) => (
                                    <p key={i} style={{ marginBottom: i < exp.description[locale].length - 1 ? "0.5rem" : 0 }}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            id: "skills",
            title: t.cv.skills,
            content: (
                <div className="skill-tags">
                    {cvData.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill[locale]}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            id: "languages",
            title: t.cv.languages,
            content: (
                <ul className="cv-list">
                    {cvData.languages.map((lang, index) => (
                        <li key={index} className="cv-list-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="cv-list-title">{lang.name[locale]}</span>
                            <span className="cv-list-meta">
                                {lang.level[locale]}
                            </span>
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    return (
        <div className="cv-page page-enter">
            <div className="cv-container">
                {/* Header */}
                <header className="cv-header">
                    {t.cv.title && <h1 className="cv-title shimmer-text">{t.cv.title}</h1>}
                    <p className="cv-artist-name elegant-underline">{t.cv.artistName}</p>
                    <div className="elegant-separator" />
                </header>

                {/* Profile Section - Photo + About */}
                <section className="profile-section gradient-border">
                    <div className="profile-photo-container ambient-glow">
                        <Image
                            ref={photoRef}
                            src="/profile.jpg"
                            alt={t.cv.artistName}
                            width={260}
                            height={347}
                            className={`profile-photo ${photoLoaded ? "loaded" : ""}`}
                            priority
                            onLoad={() => setPhotoLoaded(true)}
                        />
                    </div>

                    <div className="profile-text-container">
                        <h2 className="about-heading">{t.cv.about}</h2>
                        <div className="about-text artistic-quote">
                            {t.cv.aboutText.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CV Accordion */}
                <Accordion items={accordionItems} />
            </div>
        </div>
    );
}
