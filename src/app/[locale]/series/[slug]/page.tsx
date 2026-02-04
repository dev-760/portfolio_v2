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
            <div className="series-view">
                <div className="loading-screen">
                    <span className="loading-text">{t.misc.loading}</span>
                </div>
            </div>
        );
    }

    const handleArtworkClick = (artwork: Artwork, index?: number) => {
        router.push(`/${locale}/art/${artwork.id}?series=${slug}`);
    };

    return (
        <div className="series-view">
            <header className="series-header">
                <Link
                    href={`/${locale}/work`}
                    className="series-nav-link"
                    style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text-muted)",
                        display: "block",
                        marginBottom: "var(--space-xl)",
                    }}
                >
                    ← {t.series.backToWork}
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
