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
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'WEBSITE' | 'MOBILE' | 'GRAPHIC' | 'MOTION'>('ALL');

    const projects = [
        // Website Projects
        {
            id: 1,
            title: "NEON HORIZON",
            category: "WEBSITE",
            year: "2024",
            desc: "Immersive portfolio website with WebGL animations and interactive 3D environments",
            tags: ["React", "Next.js", "GSAP"],
            image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "CYBER PORTAL",
            category: "WEBSITE",
            year: "2024",
            desc: "Next-gen e-commerce platform with seamless checkout and product showcase",
            tags: ["Next.js", "Stripe", "Tailwind"],
            image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "VOID SYSTEM",
            category: "WEBSITE",
            year: "2023",
            desc: "Corporate website with smooth scroll animations and dynamic content sections",
            tags: ["React", "GSAP", "Framer"],
            image: "https://images.unsplash.com/photo-1618123069712-9c6f9446eb0a?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "DIGITAL AGENCY",
            category: "WEBSITE",
            year: "2024",
            desc: "Modern agency website with case studies and client testimonials",
            tags: ["Next.js", "TypeScript"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "TECH STARTUP",
            category: "WEBSITE",
            year: "2024",
            desc: "SaaS landing page with interactive product demos and pricing calculator",
            tags: ["React", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "PORTFOLIO HUB",
            category: "WEBSITE",
            year: "2023",
            desc: "Creative portfolio platform with grid gallery and project filtering",
            tags: ["Next.js", "GSAP"],
            image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2608&auto=format&fit=crop",
        },
        {
            id: 7,
            title: "RESTAURANT ONLINE",
            category: "WEBSITE",
            year: "2024",
            desc: "Restaurant website with online ordering and reservation system",
            tags: ["React", "Firebase"],
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        },

        // Mobile App Projects
        {
            id: 8,
            title: "FITNESS TRACKER",
            category: "MOBILE",
            year: "2024",
            desc: "Health and fitness app with workout tracking and nutrition planning",
            tags: ["Flutter", "Firebase", "Dart"],
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 9,
            title: "FINTECH APP",
            category: "MOBILE",
            year: "2024",
            desc: "Mobile banking app with secure transactions and budget management",
            tags: ["React Native", "Node.js"],
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 10,
            title: "SOCIAL CONNECT",
            category: "MOBILE",
            year: "2024",
            desc: "Social networking app with real-time chat and media sharing",
            tags: ["Flutter", "Firebase"],
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        },
        {
            id: 11,
            title: "FOOD DELIVERY",
            category: "MOBILE",
            year: "2023",
            desc: "Food ordering app with live tracking and payment integration",
            tags: ["React Native", "Stripe"],
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
        },
        {
            id: 12,
            title: "MEDITATION APP",
            category: "MOBILE",
            year: "2024",
            desc: "Mindfulness app with guided meditations and sleep sounds",
            tags: ["Flutter", "Dart"],
            image: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 13,
            title: "E-LEARNING",
            category: "MOBILE",
            year: "2024",
            desc: "Educational app with video courses and progress tracking",
            tags: ["React Native", "Firebase"],
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop",
        },
        {
            id: 14,
            title: "TRAVEL PLANNER",
            category: "MOBILE",
            year: "2023",
            desc: "Travel app with itinerary builder and booking management",
            tags: ["Flutter", "Google Maps"],
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2635&auto=format&fit=crop",
        },

        // Graphic Design Projects
        {
            id: 15,
            title: "BRAND IDENTITY",
            category: "GRAPHIC",
            year: "2024",
            desc: "Complete brand identity with logo, color palette, and style guide",
            tags: ["Illustrator", "Figma"],
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop",
        },
        {
            id: 16,
            title: "POSTER SERIES",
            category: "GRAPHIC",
            year: "2024",
            desc: "Event poster series with bold typography and vibrant colors",
            tags: ["Photoshop", "Illustrator"],
            image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 17,
            title: "PACKAGING DESIGN",
            category: "GRAPHIC",
            year: "2023",
            desc: "Product packaging design for premium skincare brand",
            tags: ["Illustrator", "3D Mockup"],
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 18,
            title: "SOCIAL MEDIA KIT",
            category: "GRAPHIC",
            year: "2024",
            desc: "Instagram template pack with 50+ customizable designs",
            tags: ["Figma", "Canva"],
            image: "https://images.unsplash.com/photo-1611926653670-7a6f8a2c3d04?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 19,
            title: "MAGAZINE LAYOUT",
            category: "GRAPHIC",
            year: "2024",
            desc: "Editorial design for fashion magazine with modern grid system",
            tags: ["InDesign", "Photoshop"],
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 20,
            title: "LOGO COLLECTION",
            category: "GRAPHIC",
            year: "2023",
            desc: "Diverse logo designs for tech startups and creative agencies",
            tags: ["Illustrator", "Figma"],
            image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=2671&auto=format&fit=crop",
        },
        {
            id: 21,
            title: "INFOGRAPHIC SET",
            category: "GRAPHIC",
            year: "2024",
            desc: "Data visualization infographics for business presentations",
            tags: ["Illustrator", "Affinity"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        },

        // Motion Animation Projects
        {
            id: 22,
            title: "BRAND ANIMATION",
            category: "MOTION",
            year: "2024",
            desc: "Logo animation with kinetic typography and particle effects",
            tags: ["After Effects", "Cinema 4D"],
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 23,
            title: "PRODUCT PROMO",
            category: "MOTION",
            year: "2024",
            desc: "30-second product showcase with smooth transitions and effects",
            tags: ["After Effects", "Premiere Pro"],
            image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2562&auto=format&fit=crop",
        },
        {
            id: 24,
            title: "UI TRANSITIONS",
            category: "MOTION",
            year: "2024",
            desc: "App interface animations with micro-interactions and gestures",
            tags: ["After Effects", "Figma"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 25,
            title: "EXPLAINER VIDEO",
            category: "MOTION",
            year: "2023",
            desc: "Animated explainer video for SaaS product with character animation",
            tags: ["After Effects", "Illustrator"],
            image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 26,
            title: "SOCIAL ADS",
            category: "MOTION",
            year: "2024",
            desc: "Series of animated social media ads with bold visuals",
            tags: ["After Effects", "Premiere"],
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2662&auto=format&fit=crop",
        },
        {
            id: 27,
            title: "MUSIC VISUALIZER",
            category: "MOTION",
            year: "2024",
            desc: "Audio-reactive visualizer with particle systems and waveforms",
            tags: ["After Effects", "Expressions"],
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop",
        },
        {
            id: 28,
            title: "TITLE SEQUENCE",
            category: "MOTION",
            year: "2024",
            desc: "Cinematic title sequence for documentary film with dynamic typography",
            tags: ["After Effects", "Cinema 4D"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop",
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
                        <div className="flex gap-2 flex-wrap">
                            {(['ALL', 'WEBSITE', 'MOBILE', 'GRAPHIC', 'MOTION'] as const).map((filter) => (
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
