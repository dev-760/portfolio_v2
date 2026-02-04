"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, getTranslations } from "@/lib/i18n";
import { getArtworkById, getSeriesBySlug, artworks } from "@/data/artworks";
import LightRevealImage from "@/components/LightRevealImage";
import FullscreenView from "@/components/FullscreenView";

interface ArtworkPageProps {
    params: Promise<{ locale: string; id: string }>;
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [artworkId, setArtworkId] = useState<string>("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        params.then(({ locale, id }) => {
            setLocale(locale as Locale);
            setArtworkId(id);
        });
    }, [params]);

    const t = getTranslations(locale);
    const artwork = artworkId ? getArtworkById(artworkId) : null;
    const seriesSlug = searchParams.get("series");
    const currentSeries = seriesSlug ? getSeriesBySlug(seriesSlug) : null;

    // Get navigation within series or all artworks
    const artworkList = currentSeries?.artworks || artworks;
    const currentIndex = artworkList.findIndex((a) => a.id === artworkId);
    const prevArtwork = currentIndex > 0 ? artworkList[currentIndex - 1] : null;
    const nextArtwork =
        currentIndex < artworkList.length - 1 ? artworkList[currentIndex + 1] : null;

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (isFullscreen) return;

            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                const isRTL = locale === "ar";
                const goToPrev = isRTL ? e.key === "ArrowRight" : e.key === "ArrowLeft";
                const target = goToPrev ? prevArtwork : nextArtwork;

                if (target) {
                    router.push(
                        `/${locale}/art/${target.id}${seriesSlug ? `?series=${seriesSlug}` : ""}`
                    );
                }
            }
        },
        [locale, prevArtwork, nextArtwork, router, seriesSlug, isFullscreen]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (artworkId && !artwork) {
        notFound();
    }

    if (!artwork) {
        return (
            <div className="artwork-detail">
                <div className="loading-screen">
                    <span className="loading-text">{t.misc.loading}</span>
                </div>
            </div>
        );
    }

    const backLink = seriesSlug
        ? `/${locale}/series/${seriesSlug}`
        : `/${locale}/work`;

    return (
        <>
            <div className="artwork-detail">
                <div className="artwork-container">
                    <LightRevealImage
                        src={`/artworks/${artwork.filename}`}
                        alt={artwork.title[locale]}
                        locale={locale}
                        priority
                        onDoubleClick={() => setIsFullscreen(true)}
                    />

                    <div className="artwork-controls">
                        {/* Previous */}
                        <button
                            className="artwork-nav-button"
                            onClick={() =>
                                prevArtwork &&
                                router.push(
                                    `/${locale}/art/${prevArtwork.id}${seriesSlug ? `?series=${seriesSlug}` : ""}`
                                )
                            }
                            disabled={!prevArtwork}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{
                                    transform: locale === "ar" ? "rotate(180deg)" : "none",
                                }}
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            {t.artwork.previous}
                        </button>

                        {/* Back to Series */}
                        <Link href={backLink} className="artwork-nav-button">
                            {t.artwork.backToSeries}
                        </Link>

                        {/* Fullscreen */}
                        <button
                            className="artwork-nav-button"
                            onClick={() => setIsFullscreen(true)}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="15 3 21 3 21 9" />
                                <polyline points="9 21 3 21 3 15" />
                                <line x1="21" y1="3" x2="14" y2="10" />
                                <line x1="3" y1="21" x2="10" y2="14" />
                            </svg>
                            {t.artwork.fullscreen}
                        </button>

                        {/* Next */}
                        <button
                            className="artwork-nav-button"
                            onClick={() =>
                                nextArtwork &&
                                router.push(
                                    `/${locale}/art/${nextArtwork.id}${seriesSlug ? `?series=${seriesSlug}` : ""}`
                                )
                            }
                            disabled={!nextArtwork}
                        >
                            {t.artwork.next}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{
                                    transform: locale === "ar" ? "rotate(180deg)" : "none",
                                }}
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen overlay */}
            {isFullscreen && (
                <FullscreenView
                    artwork={artwork}
                    locale={locale}
                    onClose={() => setIsFullscreen(false)}
                />
            )}
        </>
    );
}
