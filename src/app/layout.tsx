import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orko Biswas | Full-Stack Product Designer & Developer",
  description: "A hybrid professional bridging design and development. Eliminating friction between creative vision and technical execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          spaceMono.variable,
          inter.variable,
          "font-body antialiased bg-void text-mist overflow-x-hidden selection:bg-lime-acid selection:text-black cursor-none"
        )}
      >
        {children}
      </body>
    </html>
  );
}
