"use client";

import { useState, ReactNode, useRef, useEffect } from "react";

interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    defaultOpen?: string[];
}

export default function Accordion({ items, defaultOpen = [] }: AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));
    const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="accordion">
            {items.map((item) => {
                const isOpen = openItems.has(item.id);

                return (
                    <div
                        key={item.id}
                        className={`accordion-item ${isOpen ? "open" : ""}`}
                    >
                        <button
                            className="accordion-trigger"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${item.id}`}
                        >
                            <span>{item.title}</span>
                            <svg
                                className="accordion-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div
                            id={`accordion-content-${item.id}`}
                            className="accordion-content"
                            ref={(el) => {
                                if (el) contentRefs.current.set(item.id, el);
                            }}
                        >
                            <div className="accordion-inner">
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
