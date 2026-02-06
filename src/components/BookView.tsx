"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const t = getTranslations(locale);
    const isRTL = locale === "ar";

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0 && !isTransitioning) {
            setIsTransitioning(true);
            setImageLoaded(false);
            setCurrentIndex((prev) => prev - 1);
            setTimeout(() => setIsTransitioning(false), 300);
        }
    }, [currentIndex, isTransitioning]);

    const goToNext = useCallback(() => {
        if (currentIndex < artworks.length - 1 && !isTransitioning) {
            setIsTransitioning(true);
            setImageLoaded(false);
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => setIsTransitioning(false), 300);
        }
    }, [currentIndex, artworks.length, isTransitioning]);

    // In RTL mode, swap the navigation direction
    const handleLeftClick = isRTL ? goToNext : goToPrevious;
    const handleRightClick = isRTL ? goToPrevious : goToNext;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                handleLeftClick();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleRightClick();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (onArtworkClick && currentArtwork) {
                    onArtworkClick(currentArtwork, currentIndex);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleLeftClick, handleRightClick, onArtworkClick, currentIndex]);

    // Touch swipe support for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        const deltaX = touchEnd.x - touchStartRef.current.x;
        const deltaY = touchEnd.y - touchStartRef.current.y;

        // Only trigger if horizontal swipe is dominant and significant
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Swiped right
                isRTL ? goToNext() : goToPrevious();
            } else {
                // Swiped left
                isRTL ? goToPrevious() : goToNext();
            }
        }

        touchStartRef.current = null;
    };

    const currentArtwork = artworks[currentIndex];

    if (!currentArtwork) {
        return null;
    }

    return (
        <div
            className="book-view"
            ref={containerRef}
            role="region"
            aria-label={t.artwork?.gallery || "Artwork gallery"}
            aria-live="polite"
        >
            <div
                className="book-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
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
                    className={`book-image-container ${isTransitioning ? 'transitioning' : ''}`}
                    onClick={() => onArtworkClick?.(currentArtwork, currentIndex)}
                    style={{ cursor: onArtworkClick ? "pointer" : "default" }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${currentArtwork.title[locale]} - ${t.artwork?.clickToView || 'Click to view'}`}
                >
                    {/* Loading shimmer */}
                    {!imageLoaded && (
                        <div className="book-image-loading" aria-hidden="true" />
                    )}
                    <Image
                        src={`/artworks/${currentArtwork.filename}`}
                        alt={currentArtwork.title[locale]}
                        width={900}
                        height={600}
                        className={`book-image ${imageLoaded ? 'loaded' : ''}`}
                        priority
                        style={{ objectFit: "contain" }}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <span className="book-counter" aria-live="polite">
                        {currentIndex + 1} / {artworks.length}
                    </span>

                    {/* Swipe hint for mobile */}
                    <span className="swipe-hint" aria-hidden="true">
                        ← {t.misc?.swipe || 'Swipe'} →
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
