"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'CLIENT' | 'LAB'>('ALL');

    const projects = [
        {
            id: 1,
            title: "NEON HORIZON",
            category: "CLIENT",
            year: "2024",
            desc: "Immersive WebGL experience with real-time data visualization and interactive 3D environments",
            tags: ["React", "WebGL", "GSAP"],
            image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "KINETIC FLUX",
            category: "CLIENT",
            year: "2024",
            desc: "Physics-based motion design system with fluid animations",
            tags: ["Three.js", "Animation"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Particle Cosmos",
            category: "LAB",
            year: "2024",
            desc: "100k+ particle GPU simulation exploring generative systems",
            tags: ["WebGL", "Shaders"],
            image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2608&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "VOID SYSTEM",
            category: "CLIENT",
            year: "2023",
            desc: "Complete design system with 200+ components and documentation",
            tags: ["Design System", "Figma"],
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Fluid Dreams",
            category: "LAB",
            year: "2024",
            desc: "Real-time fluid dynamics simulation with WebGPU acceleration",
            tags: ["Physics", "WebGPU"],
            image: "https://images.unsplash.com/photo-1618123069712-9c6f9446eb0a?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "CYBER PORTAL",
            category: "CLIENT",
            year: "2024",
            desc: "Next-gen e-commerce platform with AR product preview",
            tags: ["Next.js", "Stripe"],
            image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 7,
            title: "NEURAL FORGE",
            category: "LAB",
            year: "2024",
            desc: "AI-powered generative art tool with neural style transfer",
            tags: ["TensorFlow", "Python", "Canvas"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        },
    ];

    const filteredProjects = activeFilter === 'ALL' 
        ? projects 
        : projects.filter(p => p.category === activeFilter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.work-card', {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [filteredProjects]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>, cardRef: HTMLDivElement) => {
        const rect = cardRef.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        gsap.to(cardRef, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = (cardRef: HTMLDivElement) => {
        gsap.to(cardRef, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    return (
        <section 
            ref={sectionRef}
            id="work" 
            className="relative py-24 px-4 md:px-8 bg-void overflow-hidden border-t border-white/10"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            
            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Sticky Header */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
                        <div>
                            <h2 className="font-display text-7xl md:text-[10rem] font-bold text-white leading-[0.8] tracking-[-0.02em] mb-4">
                                WORK
                            </h2>
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xs text-gray-600">{filteredProjects.length} PROJECTS</span>
                                <div className="h-px w-12 bg-lime-acid/50" />
                                <span className="font-mono text-xs text-lime-acid">SELECTED {activeFilter}</span>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2">
                            {(['ALL', 'CLIENT', 'LAB'] as const).map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-3 font-mono text-xs font-bold transition-all duration-300 hover-trigger ${
                                        activeFilter === filter
                                            ? 'bg-lime-acid text-black scale-105'
                                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                                    }`}
                                    data-cursor="FILTER"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[400px]">
                    {filteredProjects.map((project, index) => {
                        // Pattern: large (8 cols, 2 rows), medium (4 cols, 2 rows), medium (4 cols, 2 rows), repeat
                        // This creates: [0]=large, [1-2]=medium pair, [3]=large, [4-5]=medium pair, [6]=medium (last one)
                        let spanClass = '';
                        let rowSpan = '';
                        let isLarge = false;
                        
                        if (index === 0 || index === 3) {
                            // Large cards
                            spanClass = 'col-span-12 lg:col-span-8';
                            rowSpan = 'lg:row-span-2';
                            isLarge = true;
                        } else if (index === 6) {
                            // Last card - make it span 4 cols, 1 row to fit on same line
                            spanClass = 'col-span-12 lg:col-span-4';
                            rowSpan = 'lg:row-span-1';
                            isLarge = false;
                        } else {
                            // Medium cards (1-2, 4-5)
                            spanClass = 'col-span-12 lg:col-span-4';
                            rowSpan = 'lg:row-span-2';
                            isLarge = false;
                        }
                        
                        return (
                            <div
                                key={project.id}
                                className={`work-card group relative ${spanClass} ${rowSpan} bg-cement border border-white/10 overflow-hidden hover-trigger`}
                                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                data-cursor="VIEW"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                                </div>

                                {/* Content Overlay */}
                                <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                                    {/* Top: Number & Category */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 border-2 border-white/20 group-hover:border-lime-acid flex items-center justify-center transition-colors duration-300">
                                                <span className="font-mono text-sm text-white/60 group-hover:text-lime-acid font-bold">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className={`px-3 py-1.5 border font-mono text-[10px] font-bold tracking-wider ${
                                                project.category === 'LAB'
                                                    ? 'border-lime-acid bg-lime-acid/20 text-lime-acid'
                                                    : 'border-white/30 bg-white/10 text-white'
                                            }`}>
                                                {project.category}
                                            </div>
                                        </div>

                                        <span className="font-mono text-xs text-white/40 group-hover:text-lime-acid transition-colors">
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Bottom: Title & Tags */}
                                    <div>
                                        <h3 className={`font-display font-bold text-white mb-4 leading-[0.9] tracking-tight ${
                                            isLarge ? 'text-6xl md:text-7xl' : 'text-4xl md:text-5xl'
                                        }`}>
                                            {project.title}
                                        </h3>
                                        
                                        <p className={`font-body text-white/70 mb-6 leading-relaxed ${
                                            isLarge ? 'text-lg max-w-2xl' : 'text-base'
                                        }`}>
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-black/40 border border-white/20 font-mono text-[10px] text-white/60 group-hover:border-lime-acid/50 group-hover:text-lime-acid backdrop-blur-sm transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Arrow Indicator */}
                                        <div className="absolute bottom-8 right-8 w-14 h-14 border-2 border-white/20 group-hover:border-lime-acid group-hover:bg-lime-acid flex items-center justify-center transition-all duration-300">
                                            <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Corner Accents */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-lime-acid opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-lime-acid opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 relative">
                    <div className="relative bg-lime-acid overflow-hidden group hover-trigger" data-cursor="CONTACT">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-grid animate-pulse" />
                        </div>
                        
                        {/* Gradient Orbs */}
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-black/20 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-1000" />
                        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-1000" />
                        
                        <div className="relative z-10 px-8 md:px-16 py-20 md:py-32">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                    {/* Left: Content */}
                                    <div>
                                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black/10 border-2 border-black/20">
                                            <Sparkles className="w-5 h-5 text-black" />
                                            <span className="font-mono text-xs text-black font-bold tracking-wider">AVAILABLE FOR WORK</span>
                                        </div>
                                        
                                        <h3 className="font-display text-6xl md:text-8xl font-bold text-black mb-8 leading-[0.85] tracking-tighter">
                                            LET&apos;S
                                            <br />
                                            CREATE
                                            <br />
                                            TOGETHER
                                        </h3>
                                        
                                        <p className="font-body text-xl md:text-2xl text-black/70 mb-12 leading-relaxed">
                                            Got a bold idea? Let&apos;s turn it into reality. Whether it&apos;s a full product, creative experiment, or something in between.
                                        </p>
                                        
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <a
                                                href="#contact"
                                                className="group/btn inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-lime-acid font-mono text-sm font-bold hover:bg-white hover:text-black transition-all duration-300 hover-trigger"
                                                data-cursor="GO"
                                            >
                                                START A PROJECT
                                                <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </a>
                                            
                                            <a
                                                href="#contact"
                                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border-2 border-black text-black font-mono text-sm font-bold hover:bg-black hover:text-lime-acid transition-all duration-300 hover-trigger"
                                                data-cursor="CHAT"
                                            >
                                                JUST SAY HI
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Right: Stats */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-black/10 border-2 border-black/20 backdrop-blur-sm group-hover:bg-black/20 transition-colors">
                                            <div className="font-display text-6xl font-bold text-black mb-2">50+</div>
                                            <div className="font-mono text-xs text-black/60 tracking-wider">PROJECTS SHIPPED</div>
                                        </div>
                                        
                                        <div className="p-8 bg-black/10 border-2 border-black/20 backdrop-blur-sm group-hover:bg-black/20 transition-colors">
                                            <div className="font-display text-6xl font-bold text-black mb-2">5+</div>
                                            <div className="font-mono text-xs text-black/60 tracking-wider">YEARS EXPERIENCE</div>
                                        </div>
                                        
                                        <div className="p-8 bg-black/10 border-2 border-black/20 backdrop-blur-sm group-hover:bg-black/20 transition-colors">
                                            <div className="font-display text-6xl font-bold text-black mb-2">15+</div>
                                            <div className="font-mono text-xs text-black/60 tracking-wider">HAPPY CLIENTS</div>
                                        </div>
                                        
                                        <div className="p-8 bg-black/10 border-2 border-black/20 backdrop-blur-sm group-hover:bg-black/20 transition-colors">
                                            <div className="font-display text-6xl font-bold text-black mb-2">24/7</div>
                                            <div className="font-mono text-xs text-black/60 tracking-wider">AVAILABILITY</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
