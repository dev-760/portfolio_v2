"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: HomePageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

    const t = getTranslations(locale);

    const handleEnterGallery = () => {
        setIsTransitioning(true);

        // Fade to black, then navigate
        setTimeout(() => {
            router.push(`/${locale}/work`);
        }, 600);
    };

    return (
        <>
            {/* Transition overlay */}
            <div
                className="page-transition-overlay"
                style={{
                    opacity: isTransitioning ? 1 : 0,
                    pointerEvents: isTransitioning ? "all" : "none",
                    transition: "opacity 0.6s ease",
                }}
            />

            <section className="hero">
                {/* Background image */}
                <div className="hero-background">
                    <Image
                        src="/hero.jpg"
                        alt=""
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>

                {/* Content */}
                <div className="hero-content">
                    <h1 className="hero-name">{t.home.artistName}</h1>
                    <p className="hero-title">{t.home.title}</p>
                    <p className="hero-tagline">{t.home.tagline}</p>

                    <button
                        className="hero-button"
                        onClick={handleEnterGallery}
                        disabled={isTransitioning}
                    >
                        {t.home.enterGallery}
                    </button>
                </div>
            </section>
        </>
    );
}
