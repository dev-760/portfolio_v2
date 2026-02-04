"use client";

import { useState } from "react";
import Image from "next/image";
import { Artwork } from "@/data/artworks";
import { Locale, getTranslations } from "@/lib/i18n";

interface BookViewProps {
    artworks: Artwork[];
    locale: Locale;
    onArtworkClick?: (artwork: Artwork, index: number) => void;
}

export default function BookView({
    artworks,
    locale,
    onArtworkClick,
}: BookViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = getTranslations(locale);
    const isRTL = locale === "ar";

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(artworks.length - 1, prev + 1));
    };

    // In RTL mode, swap the navigation direction
    const handleLeftClick = isRTL ? goToNext : goToPrevious;
    const handleRightClick = isRTL ? goToPrevious : goToNext;

    const currentArtwork = artworks[currentIndex];

    if (!currentArtwork) {
        return null;
    }

    return (
        <div className="book-view">
            <div className="book-container">
                <button
                    className="book-nav-button"
                    onClick={handleLeftClick}
                    disabled={isRTL ? currentIndex >= artworks.length - 1 : currentIndex <= 0}
                    aria-label={isRTL ? t.artwork.next : t.artwork.previous}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div
                    className="book-image-container"
                    onClick={() => onArtworkClick?.(currentArtwork, currentIndex)}
                    style={{ cursor: onArtworkClick ? "pointer" : "default" }}
                >
                    <Image
                        src={`/artworks/${currentArtwork.filename}`}
                        alt={currentArtwork.title[locale]}
                        width={900}
                        height={600}
                        className="book-image"
                        priority
                        style={{ objectFit: "contain" }}
                    />
                    <span className="book-counter">
                        {currentIndex + 1} / {artworks.length}
                    </span>
                </div>

                <button
                    className="book-nav-button"
                    onClick={handleRightClick}
                    disabled={isRTL ? currentIndex <= 0 : currentIndex >= artworks.length - 1}
                    aria-label={isRTL ? t.artwork.previous : t.artwork.next}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
