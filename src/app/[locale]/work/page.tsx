"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale, getTranslations } from "@/lib/i18n";
import { series, getArtworksByMood, Series } from "@/data/artworks";

type MoodFilter = "all" | "shadow" | "light" | "passage" | "night";

interface WorkPageProps {
    params: Promise<{ locale: string }>;
}

export default function WorkPage({ params }: WorkPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [activeMood, setActiveMood] = useState<MoodFilter>("all");
    const [filteredSeries, setFilteredSeries] = useState<Series[]>(series);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

    useEffect(() => {
        if (activeMood === "all") {
            setFilteredSeries(series);
        } else {
            // Filter series that have artworks matching the mood
            const filtered = series.filter((s) =>
                s.artworks.some((a) => a.mood.includes(activeMood))
            );
            setFilteredSeries(filtered);
        }
    }, [activeMood]);

    // Custom cursor for desktop
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setCursorVisible(true);
        const handleMouseLeave = () => setCursorVisible(false);

        // Only enable on desktop
        if (window.matchMedia("(min-width: 769px)").matches) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseenter", handleMouseEnter);
            document.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const t = getTranslations(locale);

    const moodButtons: { key: MoodFilter; label: string }[] = [
        { key: "all", label: t.work.filters.all },
        { key: "shadow", label: t.work.filters.shadow },
        { key: "light", label: t.work.filters.light },
        { key: "passage", label: t.work.filters.passage },
        { key: "night", label: t.work.filters.night },
    ];

    return (
        <div className="work-page">
            {/* Custom cursor */}
            <div
                ref={cursorRef}
                className={`custom-cursor ${cursorVisible ? "visible" : ""} ${isHoveringCard ? "hovering" : ""}`}
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                }}
            />

            <header className="work-header container">
                <h1 className="work-title">{t.work.title}</h1>

                {/* Mood Map Filters */}
                <div className="mood-filters">
                    {moodButtons.map((mood) => (
                        <button
                            key={mood.key}
                            className={`mood-button ${activeMood === mood.key ? "active" : ""}`}
                            onClick={() => setActiveMood(mood.key)}
                        >
                            {mood.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Series Grid */}
            <div className="series-grid">
                {filteredSeries.map((s) => (
                    <Link
                        key={s.slug}
                        href={`/${locale}/series/${s.slug}`}
                        className="series-card"
                        onMouseEnter={() => setIsHoveringCard(true)}
                        onMouseLeave={() => setIsHoveringCard(false)}
                    >
                        <Image
                            src={`/artworks/${s.cover}`}
                            alt={s.title[locale]}
                            fill
                            className="series-card-image"
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="series-card-overlay">
                            <h2 className="series-card-title">{s.title[locale]}</h2>
                            <p className="series-card-count">
                                {s.artworks.length} {t.work.seriesCount}
                            </p>
                            {s.brief && (
                                <p className="series-card-brief">{s.brief[locale]}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
