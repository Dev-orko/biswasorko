"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        const tl = gsap.timeline();

        // Animate progress bar width
        tl.to(progressRef.current, {
            scaleX: 1,
            duration: 2,
            ease: "power2.inOut",
        });

        tl.to(".reveal-title", {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2,
        }, "-=1.5").to(preloaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.3,
            onComplete: () => {
                if (preloaderRef.current) {
                    preloaderRef.current.style.display = "none";
                }
                clearInterval(progressInterval);
            },
        });

        return () => clearInterval(progressInterval);
    }, []);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 bg-void z-10000 flex flex-col justify-center items-center"
            id="preloader"
        >
            <div className="text-center px-4">
                <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-mist mb-3 sm:mb-4 overflow-hidden flex flex-col md:block">
                    <span className="inline-block translate-y-full reveal-title">ORKO</span>
                    <span className="inline-block translate-y-full reveal-title text-lime-acid md:ml-4">BISWAS</span>
                </h1>
                <div className="font-mono text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">[ LOADING ARTIFACTS ]</div>
                
                {/* Progress Line */}
                <div className="mt-6 sm:mt-8 w-48 sm:w-64 md:w-96 mx-auto">
                    <div className="h-px bg-white/10 relative overflow-hidden">
                        <div
                            ref={progressRef}
                            className="absolute inset-0 bg-lime-acid origin-left"
                            style={{ transform: 'scaleX(0)' }}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 font-mono text-[9px] sm:text-[10px] text-gray-600">
                        <span>00</span>
                        <span className="text-lime-acid">{Math.min(Math.round(progress), 100)}%</span>
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
