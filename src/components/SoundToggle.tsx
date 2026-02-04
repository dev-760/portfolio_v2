"use client";

import { useState, useRef, useEffect } from "react";

export default function SoundToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element on mount
        audioRef.current = new Audio("/sounds/ambient.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.15;

        audioRef.current.addEventListener("canplaythrough", () => {
            setIsLoaded(true);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleSound = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.log("Audio playback failed:", error);
        }
    };

    // Don't render if audio is not available
    if (!isLoaded) return null;

    return (
        <button
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={isPlaying ? "Mute sound" : "Play sound"}
            title={isPlaying ? "Sound on" : "Sound off"}
        >
            {isPlaying ? (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
            ) : (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            )}
        </button>
    );
}
