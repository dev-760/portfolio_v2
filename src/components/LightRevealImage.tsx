"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";

interface LightRevealImageProps {
    src: string;
    alt: string;
    locale: Locale;
    priority?: boolean;
    onDoubleClick?: () => void;
}

export default function LightRevealImage({
    src,
    alt,
    locale,
    priority = false,
    onDoubleClick,
}: LightRevealImageProps) {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
        },
        []
    );

    return (
        <div
            className="artwork-image-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onDoubleClick={onDoubleClick}
            style={
                {
                    "--mouse-x": `${mousePosition.x}%`,
                    "--mouse-y": `${mousePosition.y}%`,
                } as React.CSSProperties
            }
        >
            <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="artwork-image"
                priority={priority}
                style={{ objectFit: "contain" }}
            />
            <div
                className="light-reveal-overlay"
                style={{ opacity: isHovering ? 1 : 0 }}
            />
        </div>
    );
}
