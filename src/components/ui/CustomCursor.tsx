"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<HTMLDivElement[]>([]);
    const [text, setText] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const trailPositions = useRef<Array<{ x: number; y: number }>>([]);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Initialize trail positions
        trailPositions.current = Array(5).fill({ x: 0, y: 0 });

        // Use quickTo for optimal performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            
            mousePos.current = { x: e.clientX, y: e.clientY };
            xTo(e.clientX);
            yTo(e.clientY);

            // Update trail with delay
            const newPositions = [mousePos.current, ...trailPositions.current.slice(0, -1)];
            trailPositions.current = newPositions;

            // Animate trail elements
            trailRefs.current.forEach((trail, i) => {
                if (trail && newPositions[i]) {
                    gsap.to(trail, {
                        x: newPositions[i].x,
                        y: newPositions[i].y,
                        duration: 0.2 + i * 0.08,
                        ease: "power2.out"
                    });
                }
            });
        };

        const onMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trigger = target.closest(".hover-trigger");
            
            if (trigger) {
                const cursorText = trigger.getAttribute("data-cursor");
                if (cursorText) {
                    setText(cursorText);
                    setIsHovered(true);
                    
                    // Animate to larger size
                    gsap.to(cursor, { 
                        scale: 1.5, 
                        duration: 0.3,
                        ease: "back.out(2)"
                    });
                }
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trigger = target.closest(".hover-trigger");
            
            if (trigger) {
                setText("");
                setIsHovered(false);
                
                // Animate back to normal size
                gsap.to(cursor, { 
                    scale: 1, 
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        const onMouseDown = () => {
            gsap.to(cursor, { 
                scale: isHovered ? 1.3 : 0.85, 
                duration: 0.1,
                ease: "power2.out"
            });
            
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.cssText = `
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid #D4FF00;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${mousePos.current.x}px;
                top: ${mousePos.current.y}px;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { 
                scale: isHovered ? 1.5 : 1, 
                duration: 0.1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", onMouseMove);
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
    }, [isVisible, isHovered]);

    return (
        <>
            {/* Trail elements */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) trailRefs.current[i] = el;
                    }}
                    className={cn(
                        "fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity",
                        !isVisible && "opacity-0"
                    )}
                    style={{
                        zIndex: 9997 - i,
                        width: `${12 - i * 2}px`,
                        height: `${12 - i * 2}px`,
                        backgroundColor: '#D4FF00',
                        opacity: (0.4 - i * 0.06) * (isHovered ? 0 : 1),
                        mixBlendMode: 'difference'
                    }}
                />
            ))}

            {/* Main cursor */}
            <div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200",
                    !isVisible && "opacity-0"
                )}
            >
                {/* Outer ring */}
                <div className={cn(
                    "absolute inset-0 rounded-full border-2 transition-all duration-300",
                    isHovered 
                        ? "w-20 h-20 border-lime-acid bg-lime-acid" 
                        : "w-8 h-8 border-lime-acid bg-transparent mix-blend-difference"
                )}>
                    {/* Inner dot */}
                    {!isHovered && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-lime-acid rounded-full" />
                    )}
                </div>

                {/* Text label */}
                {isHovered && (
                    <span className="relative z-10 font-mono text-[9px] font-bold tracking-[0.15em] text-black animate-fade-in">
                        {text}
                    </span>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </>
    );
}
