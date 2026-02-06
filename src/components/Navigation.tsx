"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Locale, getTranslations, getOtherLocale } from "@/lib/i18n";

interface NavigationProps {
    locale: Locale;
}

export default function Navigation({ locale }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = getTranslations(locale);
    const otherLocale = getOtherLocale(locale);

    // Get current path without locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const switchLangPath = `/${otherLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    const navLinks = [
        { href: `/${locale}`, label: t.nav.home, key: "home" },
        { href: `/${locale}/work`, label: t.nav.work, key: "work" },
        { href: `/${locale}/cv`, label: t.nav.cv, key: "cv" },
        { href: `/${locale}/contact`, label: t.nav.contact, key: "contact" },
    ];

    const isActive = (href: string) => {
        if (href === `/${locale}`) {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="navigation" dir={locale === "ar" ? "rtl" : "ltr"}>
            <Link href={`/${locale}`} className="nav-logo">
                <Image
                    src="/logo.png"
                    alt="HK"
                    width={40}
                    height={28}
                    priority
                    style={{
                        objectFit: "contain",
                        filter: "brightness(0.9)",
                        transition: "filter 0.2s ease"
                    }}
                    className="nav-logo-image"
                />
            </Link>

            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                {navLinks.map((link) => (
                    <li key={link.key}>
                        <Link
                            href={link.href}
                            className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}

                {/* Mobile close button */}
                {isMenuOpen && (
                    <li>
                        <button
                            className="nav-link nav-close-button"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </li>
                )}
            </ul>

            <div className="nav-controls">
                <Link href={switchLangPath} className="lang-toggle">
                    {locale === "ar" ? "EN" : "ع"}
                </Link>

                <button
                    className="nav-hamburger"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
