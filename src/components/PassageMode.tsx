"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Artwork } from "@/data/artworks";
import { Locale } from "@/lib/i18n";

interface PassageModeProps {
    artworks: Artwork[];
    locale: Locale;
    onArtworkClick?: (artwork: Artwork) => void;
}

export default function PassageMode({
    artworks,
    locale,
    onArtworkClick,
}: PassageModeProps) {
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("data-artwork-id");
                    if (id) {
                        setVisibleItems((prev) => {
                            const newSet = new Set(prev);
                            if (entry.isIntersecting) {
                                newSet.add(id);
                            }
                            return newSet;
                        });
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const items = document.querySelectorAll(".passage-item");
        items.forEach((item) => {
            observerRef.current?.observe(item);
        });

        return () => {
            items.forEach((item) => {
                observerRef.current?.unobserve(item);
            });
        };
    }, [artworks]);

    return (
        <div className="passage-mode">
            {artworks.map((artwork) => (
                <div
                    key={artwork.id}
                    data-artwork-id={artwork.id}
                    className={`passage-item ${visibleItems.has(artwork.id) ? "visible" : ""
                        }`}
                    onClick={() => onArtworkClick?.(artwork)}
                    style={{ cursor: onArtworkClick ? "pointer" : "default" }}
                >
                    <Image
                        src={`/artworks/${artwork.filename}`}
                        alt={artwork.title[locale]}
                        width={900}
                        height={600}
                        className="passage-image"
                        loading="lazy"
                        style={{ objectFit: "contain", width: "100%", height: "auto" }}
                    />
                    {artwork.statement && (
                        <span className="passage-word">
                            {artwork.statement[locale]}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
