import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEMVerse | Interactive AI Simulation World",
  description: "Enter a living AI simulation world where STEM concepts come to life. Learn Physics, Biology, Chemistry, and Math through interactive experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}

