declare module 'react-lenis' {
    import { ReactNode } from 'react';

    export interface LenisProps {
        children?: ReactNode;
        root?: boolean;
        options?: any;
        className?: string;
    }

    export function ReactLenis(props: LenisProps): JSX.Element;

    export function useLenis(callback: (lenis: any) => void, deps?: any[]): any;
}
