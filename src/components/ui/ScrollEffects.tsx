"use client";

import { useLenis } from "@/lib/lenis";
import gsap from "gsap";

export default function ScrollEffects() {
    useLenis((lenis: any) => {
        const velocity = lenis.velocity || 0;
        const skewAmount = velocity * 0.06; // lighter reaction
        const skewElements = document.querySelectorAll(".kinetic-skew");

        if (Math.abs(velocity) > 0.2) {
            gsap.to(skewElements, {
                skewY: gsap.utils.clamp(-2, 2, skewAmount),
                duration: 0.12,
                ease: "power2.out",
            });
        } else {
            gsap.to(skewElements, {
                skewY: 0,
                duration: 0.25,
                ease: "power2.out",
            });
        }
    });

    return null;
}
