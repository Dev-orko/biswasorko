"use client";

import { ReactLenis } from "@/lib/lenis";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import ScrollEffects from "@/components/ui/ScrollEffects";

export default function Layout({ children }: { children: React.ReactNode }) {
    const lenisOptions = {
        // Native-like scrolling (no interpolation smoothing)
        smoothWheel: false,
        smoothTouch: false,
        wheelMultiplier: 1.0,
        // Keep defaults for other options
    };

    return (
        <ReactLenis root options={lenisOptions}>
            <CustomCursor />
            <NoiseOverlay />
            <ScrollEffects />

            {/* Fixed Background Grid */}
            <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-20" />

            {/* Decorative Frame */}
            <div className="frame-border frame-top"></div>
            <div className="frame-border frame-bottom"></div>
            <div className="frame-border frame-left"></div>
            <div className="frame-border frame-right"></div>

            <Navigation />

            <main id="smooth-wrapper">
                <div id="smooth-content">
                    {children}
                </div>
            </main>
        </ReactLenis>
    );
}
