import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/ScrollToTop";

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
  title: "Orko Biswas — Creative Visual Developer | Full-Stack Designer",
  description: "Bridging the gap between design and development. From concept to deployment, I craft seamless digital experiences with code and creativity.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          spaceMono.variable,
          inter.variable,
          "font-body antialiased bg-void bg-noise text-mist overflow-x-hidden selection:bg-lime-acid selection:text-black cursor-none relative"
        )}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
