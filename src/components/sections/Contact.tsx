"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";
import gsap from "gsap";

export default function Contact() {
    const [time, setTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        
        updateTime(); // Set initial time
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (ctaRef.current) {
            const handleMouseMove = (e: MouseEvent) => {
                const { left, top, width, height } = ctaRef.current!.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) / 20;
                const y = (e.clientY - top - height / 2) / 20;
                
                gsap.to(ctaRef.current, {
                    x,
                    y,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(ctaRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)',
                });
            };

            ctaRef.current.addEventListener('mousemove', handleMouseMove);
            ctaRef.current.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                ctaRef.current?.removeEventListener('mousemove', handleMouseMove);
                ctaRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { icon: Linkedin, label: "LinkedIn", href: "#", tag: "_LI" },
        { icon: Twitter, label: "Twitter", href: "#", tag: "_X" },
        { icon: Instagram, label: "Instagram", href: "#", tag: "_IG" },
        { icon: Github, label: "GitHub", href: "#", tag: "_GH" },
    ];

    return (
        <footer
            id="contact"
            className="min-h-screen bg-void relative border-t border-white/10 flex flex-col justify-between overflow-hidden"
        >
            {/* Kinetic Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(212, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 255, 0, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }} />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 md:px-20 py-32 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-acid/30 bg-black/50 backdrop-blur-sm mb-12">
                        <span className="w-2 h-2 bg-lime-acid animate-pulse" />
                        <span className="font-mono text-xs text-lime-acid tracking-widest">LET'S CREATE TOGETHER</span>
                    </div>

                    {/* Main CTA */}
                    <div ref={ctaRef} className="mb-16">
                        <h2 className="kinetic-skew font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-none tracking-tighter uppercase">
                            Start Your
                            <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: '2px #D4FF00' }}>Project Today</span>
                        </h2>
                        <p className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Have an idea? Let's bring it to life. I'm currently available for freelance work and exciting collaborations.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
                        <a
                            href="mailto:orko@example.com"
                            className="group glass rounded-2xl p-8 hover:scale-105 transition-all duration-500 hover:bg-white/10"
                        >
                            <div className="text-4xl mb-4">✉️</div>
                            <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-lime-acid transition-colors">
                                Email Me
                            </h3>
                            <p className="font-mono text-sm text-gray-400">orko@example.com</p>
                        </a>

                        <a
                            href="#"
                            className="group glass rounded-2xl p-8 hover:scale-105 transition-all duration-500 hover:bg-white/10"
                        >
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-lime-acid transition-colors">
                                Schedule Call
                            </h3>
                            <p className="font-mono text-sm text-gray-400">Book a meeting</p>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mb-16">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-lime-acid hover:scale-110 transition-all group"
                            >
                                <social.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
                        {/* Location */}
                        <div>
                            <div className="text-gray-500 mb-2">LOCATION</div>
                            <div className="text-white">Dhaka, Bangladesh</div>
                            <div className="text-gray-600 text-[10px]">23.81°N, 90.41°E</div>
                        </div>

                        {/* Time */}
                        <div>
                            <div className="text-gray-500 mb-2">LOCAL TIME</div>
                            <div className="text-lime-acid font-bold text-lg">
                                {mounted ? time : "--:--:--"}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <div className="text-gray-500 mb-2">QUICK LINKS</div>
                            <div className="space-y-1">
                                {['Home', 'About', 'Work', 'Lab'].map((link, i) => (
                                    <Link
                                        key={i}
                                        href={`#${link.toLowerCase()}`}
                                        className="block text-white hover:text-lime-acid transition-colors"
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Back to Top */}
                        <div>
                            <button
                                onClick={scrollToTop}
                                className="w-full px-4 py-3 glass rounded-xl hover:bg-lime-acid hover:text-black transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>BACK TO TOP</span>
                                <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="bg-black/50 border-t border-white/5 py-4 px-4 md:px-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-600">
                        <div>© 2025 Orko Biswas. All rights reserved.</div>
                        <div className="flex items-center gap-6">
                            <span>Designed & Developed with ♥</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-lime-acid animate-pulse" />
                                <span className="text-lime-acid">ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
