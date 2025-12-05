"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Linkedin, Instagram, Github, Mail, Calendar, MapPin, Clock, Zap, Send, Phone } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import gsap from "gsap";

export default function Contact() {
    const [time, setTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-header', {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });

            gsap.from('.contact-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Me",
            subtitle: "Response in 24h",
            value: "orkobiswas@example.com",
            href: "mailto:orkobiswas@example.com",
            color: "lime-acid"
        },
        {
            icon: Calendar,
            title: "Schedule Call",
            subtitle: "30-min free consultation",
            value: "Book a meeting",
            href: "#",
            color: "cyan-400"
        },
        {
            icon: Phone,
            title: "WhatsApp",
            subtitle: "Quick chat",
            value: "+880 1XXX-XXXXXX",
            href: "#",
            color: "green-400"
        }
    ];

    const socialLinks = [
        { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/orkobiswas/", tag: "linkedin.com/in/orkobiswas" },
        { icon: FaBehance, label: "Behance", href: "#", tag: "@orkobiswas" },
        { icon: Instagram, label: "Instagram", href: "#", tag: "@orko.dev" },
        { icon: Github, label: "GitHub", href: "https://github.com/Dev-orko", tag: "github.com/Dev-orko" },
    ];

    const stats = [
        { label: "Response Time", value: "< 24h", icon: Clock },
        { label: "Projects Done", value: "50+", icon: Zap },
        { label: "Availability", value: "Open", icon: MapPin }
    ];

    return (
        <footer
            ref={sectionRef}
            id="contact"
            className="relative bg-void overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-acid/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

            {/* Main Content */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-32">
                
                {/* Header */}
                <div className="contact-header text-center mb-16">
                    <div className="inline-block mb-6 px-4 py-2 border border-lime-acid/30 font-mono text-xs text-lime-acid tracking-[0.3em]">
                        GET IN TOUCH
                    </div>
                    <h2 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] leading-[0.9] mb-6">
                        <span className="block text-white">LET'S BUILD</span>
                        <span className="block text-lime-acid relative">
                            SOMETHING
                            <div className="absolute -inset-2 bg-lime-acid/10 blur-xl -z-10" />
                        </span>
                        <span className="block text-white">AMAZING</span>
                    </h2>
                    <p className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Looking for someone who can handle the entire product lifecycle—from concept to deployment? Let's talk about bringing your vision to life.
                    </p>
                </div>

                {/* Social Links Section */}
                <div className="contact-card bg-black/60 backdrop-blur-sm border-2 border-lime-acid/20 p-12 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="font-display text-3xl font-bold text-white mb-3">
                            FOLLOW MY JOURNEY
                        </h3>
                        <p className="font-mono text-sm text-lime-acid/60 tracking-wider font-bold">
                            Connect with me on social media
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="group relative bg-black/40 border border-lime-acid/30 p-6 hover:border-lime-acid/60 hover:bg-lime-acid/10 transition-all hover-trigger"
                                    data-cursor="FOLLOW"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <Icon className="w-6 h-6 text-lime-acid group-hover:scale-110 transition-transform" />
                                        <div className="text-center">
                                            <div className="font-display text-sm font-bold text-white mb-1">
                                                {social.label}
                                            </div>
                                            <div className="font-mono text-xs text-gray-600 group-hover:text-lime-acid transition-colors">
                                                {social.tag}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Info Bar */}
            <div className="border-t-2 border-lime-acid/20 bg-black/50 relative z-10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
                        {/* Location */}
                        <div>
                            <div className="flex items-center gap-2 text-lime-acid mb-2">
                                <MapPin className="w-3 h-3" />
                                <span className="font-bold tracking-wider">LOCATION</span>
                            </div>
                            <div className="text-white">Dhaka, Bangladesh</div>
                            <div className="text-gray-600 text-[10px]">23.81°N, 90.41°E</div>
                        </div>

                        {/* Time */}
                        <div>
                            <div className="flex items-center gap-2 text-lime-acid mb-2">
                                <Clock className="w-3 h-3" />
                                <span className="font-bold tracking-wider">LOCAL TIME</span>
                            </div>
                            <div className="text-white text-lg font-bold">
                                {mounted ? time : "--:--:--"}
                            </div>
                            <div className="text-gray-600 text-[10px]">GMT+6</div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <div className="text-lime-acid mb-2 font-bold tracking-wider">NAVIGATION</div>
                            <div className="grid grid-cols-2 gap-1">
                                {['Home', 'About', 'Work', 'Services'].map((link, i) => (
                                    <Link
                                        key={i}
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-500 hover:text-lime-acid transition-colors"
                                    >
                                        → {link}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Back to Top */}
                        <div className="flex items-end">
                            <button
                                onClick={scrollToTop}
                                className="w-full px-6 py-3 bg-cement border border-lime-acid/30 hover:bg-lime-acid hover:text-black transition-all flex items-center justify-center gap-2 group font-bold tracking-wider"
                            >
                                <span>BACK TO TOP</span>
                                <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="border-t border-white/5 py-6 px-6 md:px-12">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
                        <div className="text-gray-600">
                            © 2025 <span className="text-lime-acid">Orko Biswas</span>. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-gray-600">
                            <span>Crafted with passion & code</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-lime-acid animate-pulse" />
                                <span className="text-lime-acid font-bold">ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
