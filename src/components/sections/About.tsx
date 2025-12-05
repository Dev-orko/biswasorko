"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, Award, Code2 } from "lucide-react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const stats = [
        { label: "Years", value: "4+", icon: Calendar, desc: "Experience" },
        { label: "Projects", value: "50+", icon: Award, desc: "Delivered" },
        { label: "Clients", value: "25+", icon: Code2, desc: "Worldwide" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            gsap.from('.about-header', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });

            gsap.from('.about-content', {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });

            gsap.from('.stat-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            id="about" 
            className="py-32 px-4 md:px-20 bg-void relative z-10 border-t border-white/10 overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-5" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Kinetic Header */}
                <div className="about-header mb-20">
                    <div className="flex items-center justify-between border-b border-white/10 pb-8">
                        <div>
                            <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tight">
                                <span className="text-white">About </span>
                                <span className="text-outline">Me</span>
                            </h2>
                        </div>
                        <span className="font-mono text-xs text-lime-acid/70 tracking-widest">// PROFILE</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    {/* Portrait + Bio */}
                    <div className="lg:col-span-7">
                        <div className="group relative border border-white/10 hover:border-lime-acid/40 transition-all duration-500 overflow-hidden">
                            {/* Portrait Section */}
                            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                                
                                {/* Name badge */}
                                <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 border border-lime-acid/30 backdrop-blur-sm">
                                    <p className="font-mono text-[10px] text-lime-acid tracking-widest">VISUAL CREATIVE ENGINEER</p>
                                </div>

                                {/* Bottom info */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 kinetic-skew">
                                        Orko Biswas
                                    </h3>
                                    <div className="flex items-center gap-2 text-lime-acid font-mono text-xs">
                                        <MapPin className="w-3 h-3" />
                                        <span>Dhaka, Bangladesh</span>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-lime-acid animate-pulse rounded-full" />
                                            Available for work
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="p-8 md:p-10 bg-black/40">
                                <p className="font-body text-lg text-gray-300 leading-relaxed mb-6">
                                    I'm a <span className="text-lime-acid font-bold">visual creative engineer</span> who transforms bold ideas into high-performance digital experiences. 
                                    My work sits at the intersection of minimalist design and kinetic motion—where every pixel, every frame, and every interaction is intentional.
                                </p>
                                <p className="font-body text-gray-400 leading-relaxed mb-8">
                                    I specialize in crafting interfaces that don't just look good—they <span className="text-white">feel alive</span>. 
                                    From brutalist layouts to fluid GSAP animations, I build systems that are as functional as they are memorable.
                                </p>
                                <a 
                                    href="#contact" 
                                    className="hover-trigger inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-lime-acid hover:bg-lime-acid/10 transition-all font-mono text-xs tracking-widest group"
                                    data-cursor="CONTACT"
                                >
                                    <span>LET'S COLLABORATE</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:col-span-5 stats-grid">
                        <div className="grid grid-cols-1 gap-6 h-full">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="stat-card group relative border border-white/10 hover:border-lime-acid/40 transition-all p-8 bg-black/40 hover:bg-white/5 hover:-translate-y-1 kinetic-skew hover-trigger"
                                        data-cursor="INFO"
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <Icon className="w-8 h-8 text-lime-acid" />
                                            <span className="font-mono text-[10px] text-gray-500 tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                        <div className="font-display text-5xl md:text-6xl font-bold text-lime-acid mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                                            {stat.desc}
                                        </div>
                                        {/* Accent line */}
                                        <div className={`absolute bottom-0 left-0 h-1 bg-lime-acid transition-all duration-300 ${hoveredCard === index ? 'w-full' : 'w-0'}`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Philosophy Banner */}
                <div className="border-t border-white/10 pt-16">
                    <p className="font-display text-2xl md:text-4xl leading-tight text-center max-w-4xl mx-auto">
                        <span className="text-gray-400">"I believe the web is a </span>
                        <span className="text-white font-bold">canvas for chaos</span>
                        <span className="text-gray-400">. Code is the brush. Structure is the frame. </span>
                        <span className="text-lime-acid font-bold">Motion</span>
                        <span className="text-gray-400"> is the paint."</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
