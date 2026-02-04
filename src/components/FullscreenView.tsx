"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Artwork } from "@/data/artworks";
import { Locale, getTranslations } from "@/lib/i18n";

interface FullscreenViewProps {
    artwork: Artwork;
    locale: Locale;
    onClose: () => void;
}

export default function FullscreenView({
    artwork,
    locale,
    onClose,
}: FullscreenViewProps) {
    const t = getTranslations(locale);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleKeyDown]);

    return (
        <div className="fullscreen-overlay" onClick={onClose}>
            <Image
                src={`/artworks/${artwork.filename}`}
                alt={artwork.title[locale]}
                fill
                className="fullscreen-image"
                priority
                style={{ objectFit: "contain" }}
                onClick={(e) => e.stopPropagation()}
            />
            <button
                className="fullscreen-close"
                onClick={onClose}
                aria-label={t.artwork.exitFullscreen}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
}
