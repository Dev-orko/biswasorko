"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Zap, Database, Layers, Sparkles } from "lucide-react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  const stackCategories = [
    { 
      label: 'Frontend', 
      icon: Code2, 
      tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
      color: 'lime-acid'
    },
    { 
      label: 'Creative', 
      icon: Sparkles, 
      tools: ['GSAP', 'Three.js', 'WebGL', 'Framer Motion', 'Canvas API'],
      color: 'white'
    },
    { 
      label: 'Backend', 
      icon: Database, 
      tools: ['Node.js', 'Supabase', 'Firebase', 'PostgreSQL', 'REST APIs'],
      color: 'lime-acid'
    },
    { 
      label: 'Design', 
      icon: Palette, 
      tools: ['Figma', 'Adobe XD', 'Blender', 'Spline', 'Typography'],
      color: 'white'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stack-category', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.manifesto-content', {
        x: 60,
        opacity: 0,
        duration: 1,
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
    <section ref={sectionRef} id="stack" className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10 bg-void relative z-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      {/* Stack Column */}
      <div className="relative p-8 md:p-16 lg:p-24 border-r border-white/10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-lime-acid" />
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">The Stack</h3>
          </div>
          <p className="font-mono text-[10px] text-lime-acid/70 tracking-widest">// TECHNICAL ARSENAL</p>
        </div>

        <div className="space-y-8">
          {stackCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="stack-category group hover-trigger"
                data-cursor="TECH"
              >
                <div className="border border-white/10 hover:border-lime-acid/40 transition-all p-6 bg-black/40 hover:bg-white/5 kinetic-skew">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 text-${category.color}`} />
                      <h4 className="font-display text-xl font-bold text-white group-hover:text-lime-acid transition-colors uppercase">
                        {category.label}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 border border-white/10 font-mono text-xs text-gray-400 hover:border-lime-acid/40 hover:text-lime-acid transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manifesto Column */}
      <div className="relative p-8 md:p-16 lg:p-24 flex flex-col justify-between manifesto-content">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-lime-acid" />
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Manifesto</h3>
          </div>
          
          <div className="space-y-8 mb-12">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-display">
              <span className="text-gray-400">"The web is my </span>
              <span className="text-white font-bold">battleground</span>
              <span className="text-gray-400">. I fight mediocrity with </span>
              <span className="text-lime-acid font-bold">bold design</span>
              <span className="text-gray-400"> and </span>
              <span className="text-white font-bold">kinetic motion</span>
              <span className="text-gray-400">."</span>
            </p>

            <div className="border-l-2 border-lime-acid pl-6">
              <p className="font-body text-gray-400 leading-relaxed mb-4">
                I don't build websites. I engineer <span className="text-white font-bold">digital experiences</span> that command attention and drive action.
              </p>
              <p className="font-body text-gray-400 leading-relaxed">
                Every project is an opportunity to push boundaries—to merge brutalist minimalism with fluid, buttery interactions that make users stop and stare.
              </p>
            </div>
          </div>

          {/* Principles */}
          <div className="space-y-4 mb-12">
            <p className="font-mono text-xs text-lime-acid tracking-widest mb-3">// CORE PRINCIPLES</p>
            {[
              'Performance is non-negotiable',
              'Motion should feel inevitable',
              'Every pixel serves a purpose',
              'Bold choices over safe ones',
            ].map((principle, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-1 h-1 bg-lime-acid group-hover:w-6 transition-all" />
                <span className="font-body text-sm text-gray-400 group-hover:text-white transition-colors">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="border-t border-white/10 pt-8">
          <span className="block font-mono text-xs text-gray-500 mb-3 tracking-widest">CURRENT STATUS</span>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-lime-acid text-lime-acid text-sm font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-lime-acid animate-pulse" />
              AVAILABLE FOR NEW PROJECTS
            </span>
            <a 
              href="#contact" 
              className="hover-trigger font-mono text-xs border border-white/10 px-4 py-2 hover:border-lime-acid hover:text-lime-acid transition-colors tracking-widest"
              data-cursor="HIRE"
            >
              HIRE ME →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
