import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import { locales, Locale, getDirection } from "@/lib/i18n";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    const direction = getDirection(locale as Locale);

    return (
        <div dir={direction} lang={locale}>
            {/* Cinematic overlays for artistic atmosphere */}
            <div className="grain-overlay" aria-hidden="true" />
            <div className="vignette-overlay" aria-hidden="true" />

            <Navigation locale={locale as Locale} />
            <main className="page-enter">{children}</main>
            <footer className="footer">
                <div className="elegant-separator" />
                <p className="footer-text">© 2026 Hassan Karasu</p>
            </footer>
        </div>
    );
}
