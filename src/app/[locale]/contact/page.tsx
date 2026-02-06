"use client";

import { useState, useEffect } from "react";
import { Locale, getTranslations } from "@/lib/i18n";
import { cvData } from "@/data/artworks";

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
    const [locale, setLocale] = useState<Locale>("en");
    const [copied, setCopied] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        params.then(({ locale }) => {
            setLocale(locale as Locale);
        });
    }, [params]);

    const t = getTranslations(locale);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(cvData.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send the form data to a server
        console.log("Form submitted:", formData);
        setFormSubmitted(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="contact-page page-enter">
            <div className="contact-container">
                <header className="contact-header">
                    <h1 className="contact-title elegant-underline">{t.contact.title}</h1>
                    <div className="elegant-separator" />
                </header>

                {/* Contact Links */}
                <div className="contact-links">
                    {/* Email */}
                    <div className="contact-link-item stagger-item gradient-border">
                        <div>
                            <p className="contact-link-label">{t.contact.emailLabel}</p>
                            <p className="contact-link-value">{cvData.email}</p>
                        </div>
                        <button
                            className={`copy-button ${copied ? "copied" : ""}`}
                            onClick={copyEmail}
                        >
                            {copied ? t.contact.copied : t.contact.copyEmail}
                        </button>
                    </div>

                    {/* Instagram */}
                    <a
                        href={cvData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link-item stagger-item gradient-border"
                        style={{ textDecoration: "none", animationDelay: "0.2s" }}
                    >
                        <div>
                            <p className="contact-link-label">Instagram</p>
                            <p className="contact-link-value">@v6.i6_</p>
                        </div>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>

                {/* Contact Form */}
                {formSubmitted ? (
                    <div className="success-message">
                        <p className="success-text">{t.contact.success}</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                {t.contact.form.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={locale === "ar" ? "اسمك الكامل" : "Your full name"}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                {t.contact.form.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={locale === "ar" ? "بريدك الإلكتروني" : "your@email.com"}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                {t.contact.form.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={locale === "ar" ? "رسالتك..." : "Your message..."}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            {t.contact.form.send}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
