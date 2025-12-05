"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLenis } from "@/lib/lenis";
import MagneticButton from "@/components/ui/MagneticButton";
import { LuArrowDownRight } from "react-icons/lu";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState<string>("");
    const [visitorTime, setVisitorTime] = useState<string>("");
    const [visitorLocation, setVisitorLocation] = useState<string>("LOADING...");
    const [mounted, setMounted] = useState(false);
    const menuOverlayRef = useRef<HTMLDivElement>(null);

    useLenis(({ scroll }: { scroll: number }) => {
        const scrollLabel = document.getElementById("scroll-y");
        if (scrollLabel) {
            scrollLabel.innerText = Math.round(scroll).toString().padStart(4, "0");
        }
    });

    useEffect(() => {
        setMounted(true);
        
        // Dhaka time (Bangladesh Standard Time - GMT+6)
        const updateDhakaTime = () => {
            const now = new Date();
            const dhakaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
            setTime(dhakaTime.toLocaleTimeString("en-US", { hour12: false }));
        };
        
        // Visitor's local time
        const updateVisitorTime = () => {
            const now = new Date();
            setVisitorTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        
        // Get visitor's location
        const getVisitorLocation = async () => {
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const locationParts = timezone.split('/');
                const city = locationParts[locationParts.length - 1].replace(/_/g, ' ').toUpperCase();
                const region = locationParts.length > 1 ? locationParts[0].substring(0, 2).toUpperCase() : '';
                setVisitorLocation(`${city}${region ? ', ' + region : ''}`);
            } catch (error) {
                setVisitorLocation('LOCAL');
            }
        };
        
        updateDhakaTime();
        updateVisitorTime();
        getVisitorLocation();
        
        const interval = setInterval(() => {
            updateDhakaTime();
            updateVisitorTime();
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        if (isOpen) {
            // Close
            gsap.to(menuOverlayRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "expo.inOut",
                onComplete: () => setIsOpen(false),
            });
        } else {
            // Open
            setIsOpen(true);
            gsap.to(menuOverlayRef.current, {
                y: "0%",
                duration: 0.8,
                ease: "expo.inOut",
            });
        }
    };

    // Initial set for menu overlay
    useEffect(() => {
        if (menuOverlayRef.current) {
            gsap.set(menuOverlayRef.current, { y: "-100%" });
        }
    }, []);

    return (
        <>
            {/* Glassmorphism Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                    <Link href="/" className="font-display font-bold text-xl hover-trigger tracking-tight text-white" data-cursor="HOME">
                        ORKO BISWAS
                    </Link>
                    
                    <div className="flex gap-8 items-center">
                        <div className="hidden md:flex gap-6 font-mono text-xs">
                            <div className="text-gray-400">
                                DHAKA, BD <span className="text-white ml-2">{mounted ? time : "--:--:--"}</span>
                            </div>
                            <div className="text-gray-400 border-l border-white/20 pl-6">
                                {mounted ? visitorLocation : "YOUR LOCATION"} <span className="text-lime-acid ml-2">{mounted ? visitorTime : "--:--:--"}</span>
                            </div>
                        </div>
                        <div className="relative group">
                            <MagneticButton>
                                <button
                                    onClick={toggleMenu}
                                    className="font-mono text-xs border border-white/20 px-6 py-2 hover:bg-lime-acid hover:text-black hover:border-lime-acid transition-all uppercase hover-trigger tracking-widest text-white"
                                    data-cursor="OPEN"
                                >
                                    Menu
                                </button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="fixed bottom-8 left-8 z-50 block">
                <div className="font-mono text-xs text-gray-400 rotate-180" style={{ writingMode: "vertical-rl" }}>
                    SCROLL_Y: <span id="scroll-y" className="text-white">0000</span>
                </div>
            </div>

            <div className="fixed bottom-8 right-8 z-50 group cursor-pointer hover-trigger" data-cursor="SCROLL">
                <div className="relative w-40 h-40">
                    {/* Main rotating text circle */}
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
                        <svg viewBox="0 0 160 160" width="160" height="160" className="filter drop-shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                            <defs>
                                <path id="circle" d="M 80, 80 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0" />
                            </defs>
                            <text 
                                fontSize="13" 
                                fill="currentColor" 
                                className="text-lime-acid font-bold tracking-[0.25em] uppercase" 
                                fontFamily="Space Mono"
                            >
                                <textPath href="#circle" startOffset="0%">
                                    SCROLL TO EXPLORE • VISUAL ENGINEER • 
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    
                    {/* Center icon with glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Pulsing glow background */}
                            <div className="absolute inset-0 bg-lime-acid/30 blur-2xl animate-pulse scale-150" />
                            
                            {/* Arrow icon */}
                            <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                <LuArrowDownRight className="w-16 h-16 text-lime-acid drop-shadow-[0_0_15px_rgba(212,255,0,0.6)]" strokeWidth={2.5} />
                                
                                {/* Animated lines around arrow */}
                                <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-0 left-1/2 w-px h-3 bg-lime-acid animate-pulse" />
                                    <div className="absolute bottom-0 left-1/2 w-px h-3 bg-lime-acid animate-pulse" style={{ animationDelay: '0.3s' }} />
                                    <div className="absolute left-0 top-1/2 w-3 h-px bg-lime-acid animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <div className="absolute right-0 top-1/2 w-3 h-px bg-lime-acid animate-pulse" style={{ animationDelay: '0.9s' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Menu */}
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 bg-void z-9000 grid place-items-center transform -translate-y-full"
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-8 right-8 font-mono text-lime-acid hover-trigger"
                    data-cursor="CLOSE"
                >
                    [ CLOSE ]
                </button>
                <div className="flex flex-col gap-2 text-center">
                    {["HOME", "ABOUT", "WORK", "LAB", "CONTACT"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={toggleMenu}
                            className="font-display text-6xl md:text-9xl text-mist hover:text-lime-acid transition-colors hover-trigger"
                            data-cursor="GO"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
