"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Terminal, Code2, Zap } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [glitchText, setGlitchText] = useState('VISUAL');
    const roles = ['V1SU@L', 'VISUAL', 'V!$U∆L', 'VISUAL'];
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let index = 0;
        const glitchInterval = setInterval(() => {
            setGlitchText(roles[index % roles.length]);
            index++;
        }, 150);

        setTimeout(() => {
            clearInterval(glitchInterval);
            setGlitchText('VISUAL');
        }, 2000);

        const mainInterval = setInterval(() => {
            let index = 0;
            const glitchInterval = setInterval(() => {
                setGlitchText(roles[index % roles.length]);
                index++;
            }, 150);

            setTimeout(() => {
                clearInterval(glitchInterval);
                setGlitchText('VISUAL');
            }, 2000);
        }, 5000);

        return () => {
            clearInterval(mainInterval);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split screen slide in
            gsap.from('.hero-left', {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2,
            });

            gsap.from('.hero-right', {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2,
            });

            // Rotating elements
            gsap.to('.rotate-slow', {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });

            gsap.to('.rotate-reverse', {
                rotation: -360,
                duration: 15,
                repeat: -1,
                ease: 'none',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-void"
        >
            {/* Custom Cursor Trail */}
            <div 
                ref={cursorRef}
                className="fixed w-8 h-8 border-2 border-lime-acid pointer-events-none z-50 mix-blend-difference"
                style={{ left: -16, top: -16 }}
            />

            {/* Simple Grid Background */}
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 h-screen flex items-center">
                <div className="w-full">
                    
                    {/* Terminal-style Header */}
                    <div className="mb-8 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Terminal className="w-4 h-4 text-lime-acid" />
                            <span className="text-lime-acid">~/portfolio</span>
                            <span className="text-gray-600">$</span>
                            <span className="text-white">introduce --role</span>
                        </div>
                        <div className="flex items-start gap-3 text-gray-500">
                            <div className="flex flex-col gap-1 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-lime-acid animate-pulse" />
                                <div className="w-1.5 h-1.5 bg-lime-acid/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <div className="w-1.5 h-1.5 bg-lime-acid/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>
                            <div className="flex-1">
                                <div className="mb-1">
                                    <span className="text-lime-acid">[SYSTEM]</span> Initializing creative engine...
                                </div>
                                <div className="text-xs space-y-0.5 text-gray-600">
                                    <div>→ Loading design protocols... <span className="text-lime-acid">OK</span></div>
                                    <div>→ Compiling visual assets... <span className="text-lime-acid">OK</span></div>
                                    <div>→ Ready for execution... <span className="text-lime-acid animate-pulse">●</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Heading - Center Stage */}
                    <div className="mb-10 max-w-6xl">
                        <div className="overflow-hidden mb-2">
                            <h1 className="font-display text-[11vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] font-bold tracking-[-0.02em] leading-[0.85]">
                                <span className="inline-block text-white">CREATIVE</span>
                            </h1>
                        </div>
                        <div className="overflow-hidden mb-2">
                            <h1 className="font-display text-[11vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] font-bold tracking-[-0.02em] leading-[0.85]">
                                <span className="inline-block text-lime-acid glitch-text">{glitchText}</span>
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="font-display text-[11vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5vw] font-bold tracking-[-0.02em] leading-[0.85]">
                                <span className="inline-block text-white opacity-20" style={{ WebkitTextStroke: '2px white' }}>DEVELOPER</span>
                            </h1>
                        </div>
                    </div>

                    {/* Two Column Layout for Description and Metrics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 max-w-5xl">
                        
                        {/* Description with Code Style */}
                        <div>
                            <div className="font-mono text-sm text-gray-600 mb-3">{'// System Output:'}</div>
                            <p className="font-body text-lg md:text-xl text-gray-300 leading-relaxed">
                                Bridging the gap between <span className="text-lime-acid font-bold">design and development</span>. 
                                I don't just hand off designs—<span className="text-lime-acid font-bold">I bring them to life</span> with code.
                            </p>
                        </div>

                        {/* Live Metrics */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="relative">
                                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-lime-acid" />
                                <div className="font-mono text-xs text-gray-600 mb-1">UPTIME</div>
                                <div className="font-display text-3xl font-bold text-lime-acid">5Y+</div>
                                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 border-lime-acid" />
                            </div>
                            <div className="relative">
                                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-lime-acid" />
                                <div className="font-mono text-xs text-gray-600 mb-1">BUILDS</div>
                                <div className="font-display text-3xl font-bold text-lime-acid">50+</div>
                                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 border-lime-acid" />
                            </div>
                            <div className="relative">
                                <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-lime-acid" />
                                <div className="font-mono text-xs text-gray-600 mb-1">STATUS</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-lime-acid rounded-full animate-pulse" />
                                    <span className="font-mono text-sm font-bold text-lime-acid">LIVE</span>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 border-lime-acid" />
                            </div>
                        </div>
                    </div>

                    {/* CTAs with Terminal Style */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#contact"
                            className="group relative px-8 py-4 bg-lime-acid text-black font-mono text-sm font-bold overflow-hidden hover-trigger"
                            data-cursor="EXECUTE"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {'> EXECUTE_PROJECT()'}
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </a>
                        
                        <a
                            href="#work"
                            className="px-8 py-4 border-2 border-lime-acid/30 text-lime-acid font-mono text-sm font-bold hover:bg-lime-acid/10 transition-all hover-trigger"
                            data-cursor="SCAN"
                        >
                            {'> VIEW_PORTFOLIO()'}
                        </a>
                    </div>
                    
                </div>
            </div>

            {/* Mouse Position Tracker */}
            <div className="fixed top-8 right-8 font-mono text-xs text-lime-acid/50 z-50 mix-blend-difference">
                X:{mousePos.x.toString().padStart(4, '0')} Y:{mousePos.y.toString().padStart(4, '0')}
            </div>

            <style jsx>{`
                .glitch-text {
                    animation: glitch 0.3s infinite;
                }
                @keyframes glitch {
                    0%, 100% { transform: translate(0); }
                    25% { transform: translate(-2px, 2px); }
                    50% { transform: translate(2px, -2px); }
                    75% { transform: translate(-2px, -2px); }
                }
            `}</style>
        </section>
    );
}
