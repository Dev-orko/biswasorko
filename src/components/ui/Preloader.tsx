"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(".reveal-title", {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2,
        }).to(preloaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.5,
            onComplete: () => {
                if (preloaderRef.current) {
                    preloaderRef.current.style.display = "none";
                }
            },
        });
    }, []);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 bg-void z-10000 flex justify-center items-center"
            id="preloader"
        >
            <div className="text-center">
                <h1 className="font-display text-4xl md:text-8xl font-bold text-mist mb-4 overflow-hidden flex flex-col md:block">
                    <span className="inline-block translate-y-full reveal-title">ORKO</span>
                    <span className="inline-block translate-y-full reveal-title text-lime-acid md:ml-4">BISWAS</span>
                </h1>
                <div className="font-mono text-xs text-gray-500 mt-4">[ LOADING ARTIFACTS ]</div>
            </div>
        </div>
    );
}
