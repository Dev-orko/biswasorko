"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
    const magnetRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const magnet = magnetRef.current;
        const content = contentRef.current;

        if (!magnet || !content) return;

        const onMouseMove = (e: MouseEvent) => {
            const bounding = magnet.getBoundingClientRect();
            const strength = 20;
            const x = ((e.clientX - bounding.left) / magnet.offsetWidth - 0.5) * strength;
            const y = ((e.clientY - bounding.top) / magnet.offsetHeight - 0.5) * strength;

            gsap.to(magnet, { x: x, y: y, duration: 0.3, ease: "power2.out" });
            gsap.to(content, { x: x * 0.5, y: y * 0.5, duration: 0.3, ease: "power2.out" });
        };

        const onMouseLeave = () => {
            gsap.to(magnet, { x: 0, y: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
            gsap.to(content, { x: 0, y: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
        };

        magnet.addEventListener("mousemove", onMouseMove);
        magnet.addEventListener("mouseleave", onMouseLeave);

        return () => {
            magnet.removeEventListener("mousemove", onMouseMove);
            magnet.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <div ref={magnetRef} className="relative inline-block">
            <div ref={contentRef}>{children}</div>
        </div>
    );
}
