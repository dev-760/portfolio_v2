"use client";

import { useEffect, useRef, useState } from "react";

export default function SpotlightCursor() {
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Only enable on desktop and if user doesn't prefer reduced motion
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (mediaQuery.matches || isMobile) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                spotlightRef.current.style.left = `${e.clientX}px`;
                spotlightRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseEnter = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Activate spotlight after a brief delay
        setTimeout(() => setIsActive(true), 500);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={spotlightRef}
            className={`spotlight ${isActive ? "active" : ""}`}
            aria-hidden="true"
        />
    );
}
