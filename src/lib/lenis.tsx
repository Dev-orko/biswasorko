"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(callback?: (lenis: Lenis) => void, deps: any[] = []) {
    const lenis = useContext(LenisContext);

    useEffect(() => {
        if (!lenis || !callback) return;
        lenis.on("scroll", callback);
        return () => {
            lenis.off("scroll", callback);
        };
    }, [lenis, callback, ...deps]);

    return lenis;
}

export function ReactLenis({
    children,
    root = false,
    options = {},
}: {
    children: React.ReactNode;
    root?: boolean;
    options?: any;
}) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const reqIdRef = useRef<number>(0);

    useLayoutEffect(() => {
        // When root=true, Lenis expects the HTML element as wrapper and BODY as content
        const lenisInstance = new Lenis({
            ...options,
            wrapper: root ? document.documentElement : undefined,
            content: root ? document.body : undefined,
        });

        setLenis(lenisInstance);

        const raf = (time: number) => {
            lenisInstance.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        };
        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            cancelAnimationFrame(reqIdRef.current);
        };
    }, [root, JSON.stringify(options)]);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
}
