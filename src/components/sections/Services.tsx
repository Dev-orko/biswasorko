"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap, Box, Layers } from "lucide-react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    const services = [
        { 
            title: "INTERFACE DESIGN", 
            desc: "Crafting pixel-perfect, user-centric interfaces that blend aesthetics with functionality",
            tags: ["UI/UX", "Prototyping", "Design Systems"],
            icon: Sparkles,
            color: "lime-acid"
        },
        { 
            title: "CREATIVE DEV", 
            desc: "Building modern web experiences with cutting-edge technologies and clean architecture",
            tags: ["React", "Next.js", "TypeScript"],
            icon: Zap,
            color: "cyan-400"
        },
        { 
            title: "MOTION & 3D", 
            desc: "Bringing designs to life with smooth animations, WebGL, and interactive experiences",
            tags: ["GSAP", "Three.js", "WebGL"],
            icon: Box,
            color: "purple-400"
        },
        { 
            title: "DIGITAL STRATEGY", 
            desc: "Optimizing performance, analytics, and product strategy for measurable growth",
            tags: ["Analytics", "SEO", "Performance"],
            icon: Layers,
            color: "pink-400"
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance
            gsap.from('.service-card-new', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });

            // Number counters animation
            gsap.from('.service-number', {
                textContent: 0,
                duration: 1.5,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                snap: { textContent: 1 },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="relative py-32 px-6 md:px-12 bg-void overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-acid/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                
                {/* Header with Glitch Effect */}
                <div className="mb-20 text-center">
                    <div className="inline-block mb-4 px-4 py-2 border border-lime-acid/30 font-mono text-xs text-lime-acid tracking-[0.3em]">
                        CAPABILITIES
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] leading-[0.9] mb-6">
                        <span className="inline-block text-white">WHAT I</span>{' '}
                        <span className="inline-block text-lime-acid relative">
                            DO
                            <div className="absolute -inset-2 bg-lime-acid/10 blur-xl -z-10" />
                        </span>
                    </h2>
                    <p className="font-mono text-sm text-gray-500 tracking-wider max-w-2xl mx-auto">
                        Transforming ideas into stunning digital experiences through design, code, and motion
                    </p>
                </div>

                {/* Services Grid - Bento Style */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card-new group relative hover-trigger"
                            data-cursor="EXPLORE"
                        >
                            <div className="relative h-full bg-cement border-2 border-white/5 p-10 overflow-hidden transition-all duration-500 hover:border-lime-acid/30 hover:-translate-y-2">
                                
                                {/* Large Number Background */}
                                <div className="absolute top-4 right-4 font-display text-[200px] font-black text-white/[0.02] leading-none pointer-events-none service-number">
                                    {index + 1}
                                </div>

                                {/* Icon with Glow */}
                                <div className="relative mb-6 w-16 h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-lime-acid/20 blur-xl group-hover:bg-lime-acid/40 transition-all duration-500" />
                                    <service.icon className="w-10 h-10 text-lime-acid relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-[-0.01em] group-hover:text-lime-acid transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="font-body text-base text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                        {service.desc}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.tags.map((tag, i) => (
                                            <span 
                                                key={i}
                                                className="px-3 py-1 bg-black/40 border border-lime-acid/20 font-mono text-xs text-lime-acid/70 group-hover:border-lime-acid/40 group-hover:text-lime-acid transition-all"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Hover Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-lime-acid transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="relative mt-24 border-2 border-lime-acid/20 bg-cement p-12 md:p-16 text-center overflow-hidden group hover:border-lime-acid/40 transition-all">
                    {/* Background Pulse */}
                    <div className="absolute inset-0 bg-lime-acid/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-[-0.01em]">
                            READY TO BUILD?
                        </h3>
                        <p className="font-mono text-sm text-gray-400 mb-8 tracking-wider">
                            Let's create something extraordinary together
                        </p>
                        <a 
                            href="#contact" 
                            className="inline-flex items-center gap-3 px-10 py-5 bg-lime-acid text-black font-mono text-sm font-bold hover:bg-white transition-all duration-300 hover-trigger group/btn"
                            data-cursor="INITIATE"
                        >
                            <span>START PROJECT</span>
                            <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
