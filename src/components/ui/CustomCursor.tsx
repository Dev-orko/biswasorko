"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use quickTo for better performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trigger = target.closest(".hover-trigger");
            
            if (trigger) {
                const cursorText = trigger.getAttribute("data-cursor");
                if (cursorText) {
                    setText(cursorText);
                    setIsHovered(true);
                }
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest(".hover-trigger")) {
                setText("");
                setIsHovered(false);
            }
        };

        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.95, duration: 0.08 });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { scale: 1, duration: 0.08 });
        };

        document.addEventListener("mouseover", onMouseEnter);
        document.addEventListener("mouseout", onMouseLeave);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnter);
            document.removeEventListener("mouseout", onMouseLeave);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isVisible]);

    return (
        <div
            ref={cursorRef}
            className={cn(
                "fixed top-0 left-0 pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out",
                // Default: small lime circle, difference blend
                "w-4 h-4 bg-lime-acid mix-blend-difference rounded-full",
                // Hovered: large lime circle, normal blend, black text
                isHovered && "w-16 h-16 mix-blend-normal bg-lime-acid text-black",
                !isVisible && "opacity-0"
            )}
        >
            {isHovered && (
                <span className="font-mono text-[10px] font-bold tracking-widest">
                    {text}
                </span>
            )}
        </div>
    );
}
