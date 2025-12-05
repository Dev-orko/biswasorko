"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Lab() {
    const sectionRef = useRef<HTMLElement>(null);

    const experiments = [
        {
            title: "Particle System",
            desc: "WebGL particle physics simulation",
            image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2608&auto=format&fit=crop",
            span: "md:col-span-1 md:row-span-2",
            tag: "WebGL",
        },
        {
            title: "Fluid Dynamics",
            desc: "Real-time fluid simulation",
            image: "https://images.unsplash.com/photo-1618123069712-9c6f9446eb0a?q=80&w=2574&auto=format&fit=crop",
            span: "md:col-span-2",
            tag: "Three.js",
        },
        {
            title: "Morphing Shapes",
            desc: "SVG morphing experiments",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            span: "md:col-span-1",
            tag: "GSAP",
        },
        {
            title: "Neural Network",
            desc: "AI visualization experiment",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
            span: "md:col-span-2",
            tag: "TensorFlow",
        },
        {
            title: "Coming Soon",
            desc: "New experiments in progress",
            image: null,
            span: "md:col-span-1",
            tag: "TBA",
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.lab-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            id="lab" 
            className="py-32 px-4 md:px-20 bg-cement relative overflow-hidden border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-2">The Lab</h2>
                        <p className="font-mono text-sm text-lime-acid">[ EXPERIMENTS_&_EXPLORATIONS ]</p>
                    </div>
                    <span className="font-mono text-lime-acid text-sm hidden md:block">03</span>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
                    {experiments.map((experiment, index) => (
                        <div
                            key={index}
                            className={`lab-item ${experiment.span} group relative overflow-hidden cursor-pointer border border-white/10 hover:border-lime-acid/50 transition-all duration-500`}
                        >
                            {experiment.image ? (
                                <>
                                    {/* Image */}
                                    <img
                                        src={experiment.image}
                                        alt={experiment.title}
                                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                        {/* Tag */}
                                        <div className="flex justify-between items-start">
                                            <span className="px-3 py-1 glass rounded-full font-mono text-xs text-lime-acid">
                                                {experiment.tag}
                                            </span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xl">→</span>
                                        </div>
                                        
                                        {/* Info */}
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="font-display text-2xl font-bold text-white mb-2">
                                                {experiment.title}
                                            </h3>
                                            <p className="font-body text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {experiment.desc}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full glass flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/20">
                                    <div className="w-16 h-16 rounded-full border-4 border-lime-acid/20 border-t-lime-acid animate-spin" />
                                    <div className="text-center">
                                        <h3 className="font-display text-2xl font-bold text-white mb-2">
                                            {experiment.title}
                                        </h3>
                                        <p className="font-mono text-xs text-gray-500">
                                            {experiment.desc}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="mt-16 text-center">
                    <p className="font-body text-gray-400 mb-4">
                        This is where I experiment with new technologies and push creative boundaries.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 font-mono text-sm text-lime-acid hover:text-white transition-colors"
                    >
                        <span>VIEW ALL EXPERIMENTS</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
