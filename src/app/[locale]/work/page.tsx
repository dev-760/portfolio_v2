"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale, getTranslations } from "@/lib/i18n";
import { artworks, Artwork } from "@/data/artworks";

interface WorkPageProps {
    params: Promise<{ locale: string }>;
}

export default function WorkPage({ params }: WorkPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

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

    return (
        <div className="work-page page-enter">
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
                <div className="elegant-separator" style={{ marginTop: "var(--space-lg)" }} />
            </header>

            {/* Artwork Grid */}
            <div className="artwork-grid">
                {artworks.map((artwork, index) => (
                    <Link
                        key={artwork.id}
                        href={`/${locale}/art/${artwork.id}`}
                        className="artwork-card stagger-item smooth-scale"
                        style={{ animationDelay: `${0.1 + index * 0.15}s` }}
                        onMouseEnter={() => setIsHoveringCard(true)}
                        onMouseLeave={() => setIsHoveringCard(false)}
                    >
                        <div className="artwork-card-image-wrapper">
                            <Image
                                src={`/artworks/${artwork.filename}`}
                                alt={artwork.title[locale]}
                                fill
                                className="artwork-card-image"
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="artwork-card-content">
                            <h2 className="artwork-card-title">{artwork.title[locale]}</h2>
                            {artwork.quote && (
                                <p className="artwork-card-quote">
                                    "{artwork.quote[locale]}"
                                    {artwork.quote.author && (
                                        <span className="artwork-card-author">
                                            — {artwork.quote.author[locale]}
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
