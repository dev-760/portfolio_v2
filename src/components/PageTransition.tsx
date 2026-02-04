"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProps) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    return (
        <>
            <div
                className={`page-transition-overlay ${isTransitioning ? "entering" : ""}`}
            />
            <div className="page-content">{children}</div>
        </>
    );
}

export function usePageTransition() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    const navigateWithTransition = useCallback(
        (href: string) => {
            setIsTransitioning(true);

            // Wait for fade out
            setTimeout(() => {
                router.push(href);

                // Reset after navigation
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 100);
            }, 400);
        },
        [router]
    );

    return { navigateWithTransition, isTransitioning };
}
