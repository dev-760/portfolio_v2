"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, getTranslations } from "@/lib/i18n";
import { getSeriesBySlug, Artwork } from "@/data/artworks";
import BookView from "@/components/BookView";

interface SeriesPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export default function SeriesPage({ params }: SeriesPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [slug, setSlug] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        params.then(({ locale, slug }) => {
            setLocale(locale as Locale);
            setSlug(slug);
        });
    }, [params]);

    const t = getTranslations(locale);
    const currentSeries = slug ? getSeriesBySlug(slug) : null;

    if (slug && !currentSeries) {
        notFound();
    }

    if (!currentSeries) {
        return (
            <div className="series-view page-enter">
                <header className="series-header">
                    <div className="series-skeleton-link" aria-hidden="true" />
                    <div className="series-skeleton-title" aria-hidden="true" />
                    <div className="series-skeleton-description" aria-hidden="true" />
                </header>
                <div className="series-skeleton-image" aria-hidden="true" />
                <span className="visually-hidden">{t.misc.loading}</span>
            </div>
        );
    }

    const handleArtworkClick = (artwork: Artwork, index?: number) => {
        router.push(`/${locale}/art/${artwork.id}?series=${slug}`);
    };

    return (
        <div className="series-view page-enter">
            <header className="series-header">
                <Link
                    href={`/${locale}/work`}
                    className="series-back-link"
                    aria-label={t.series.backToWork}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span>{t.series.backToWork}</span>
                </Link>

                <h1 className="series-view-title">{currentSeries.title[locale]}</h1>

                {currentSeries.description && (
                    <p className="series-statement">{currentSeries.description[locale]}</p>
                )}
            </header>

            {/* Book View - Only Mode */}
            <BookView
                artworks={currentSeries.artworks}
                locale={locale}
                onArtworkClick={handleArtworkClick}
            />
        </div>
    );
}
