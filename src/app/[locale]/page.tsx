"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export default function HomePage({ params }: HomePageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

    const t = getTranslations(locale);

    const handleEnterGallery = useCallback(() => {
        if (hasScrolled || isTransitioning) return;
        setHasScrolled(true);
        setIsTransitioning(true);

        // Fade to black, then navigate
        setTimeout(() => {
            router.push(`/${locale}/work`);
        }, 800);
    }, [hasScrolled, isTransitioning, locale, router]);

    // Handle scroll to enter
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                handleEnterGallery();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleEnterGallery();
            }
        };

        // Touch handling for mobile
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            if (deltaY > 50) {
                handleEnterGallery();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleEnterGallery]);

    return (
        <>
            {/* Transition overlay */}
            <div
                className="page-transition-overlay"
                style={{
                    opacity: isTransitioning ? 1 : 0,
                    pointerEvents: isTransitioning ? "all" : "none",
                    transition: "opacity 0.8s ease",
                }}
            />

            <section className="hero hero-entry">
                {/* Background image with gradient overlay */}
                <div className="hero-background">
                    <Image
                        src="/hero.jpg"
                        alt=""
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                    <div className="hero-gradient-overlay" />
                </div>

                {/* Content - centered but offset upward */}
                <div className="hero-content hero-content-entry">
                    <h1 className="hero-name hero-name-entry">{t.home.artistName}</h1>
                    <p className="hero-title hero-title-entry">{t.home.title}</p>
                    <span className="hero-scroll-hint">{t.home.scrollToEnter}</span>
                </div>
            </section>
        </>
    );
}
