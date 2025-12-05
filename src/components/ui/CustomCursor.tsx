"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<HTMLDivElement[]>([]);
    const [text, setText] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        let rafId: number;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const animate = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            
            currentX += dx * 0.15;
            currentY += dy * 0.15;

            if (cursor) {
                cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
            if (dot) {
                dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }

            trailRefs.current.forEach((trail, i) => {
                if (trail) {
                    const delay = (i + 1) * 0.05;
                    const trailX = currentX + (targetX - currentX) * delay;
                    const trailY = currentY + (targetY - currentY) * delay;
                    trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
                }
            });

            rafId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

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
            const trigger = target.closest(".hover-trigger");
            
            if (trigger) {
                setText("");
                setIsHovered(false);
            }
        };

        const onMouseDown = () => {
            if (cursor) gsap.to(cursor, { scale: 0.8, duration: 0.1 });
            if (dot) gsap.to(dot, { scale: 0.7, duration: 0.1 });
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                width: 30px;
                height: 30px;
                border: 2px solid rgba(212, 255, 0, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${mousePos.current.x}px;
                top: ${mousePos.current.y}px;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 2.5,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        };

        const onMouseUp = () => {
            if (cursor) gsap.to(cursor, { scale: 1, duration: 0.2 });
            if (dot) gsap.to(dot, { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseEnter);
        document.addEventListener("mouseout", onMouseLeave);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnter);
            document.removeEventListener("mouseout", onMouseLeave);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <>
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) trailRefs.current[i] = el;
                    }}
                    style={{
                        position: 'fixed',
                        top: '-4px',
                        left: '-4px',
                        width: `${8 - i * 1.5}px`,
                        height: `${8 - i * 1.5}px`,
                        backgroundColor: '#D4FF00',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 9996 - i,
                        opacity: isHovered ? 0 : (0.5 - i * 0.1),
                        mixBlendMode: 'difference',
                        transition: 'opacity 0.2s ease'
                    }}
                />
            ))}

            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: isHovered ? '-40px' : '-16px',
                    left: isHovered ? '-40px' : '-16px',
                    width: isHovered ? '80px' : '32px',
                    height: isHovered ? '80px' : '32px',
                    border: isHovered ? 'none' : '2px solid #D4FF00',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: isHovered ? 'normal' : 'difference',
                    backgroundColor: isHovered ? '#D4FF00' : 'transparent',
                    transition: 'width 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), height 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), top 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), left 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), background-color 0.3s ease, border 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isHovered && text && (
                    <span style={{
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        letterSpacing: '0.15em',
                        color: '#000',
                        textAlign: 'center'
                    }}>
                        {text}
                    </span>
                )}
            </div>

            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: '-3px',
                    left: '-3px',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#D4FF00',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    mixBlendMode: 'difference',
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            />
        </>
    );
}
