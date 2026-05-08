"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, LayoutDashboard, Microscope, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Landing", href: "/", icon: Sparkles },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Simulations", href: "/simulations", icon: Microscope },
    { name: "My Progress", href: "/progress", icon: GraduationCap },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            STEM<span className="text-brand-primary">Verse</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-brand-primary" : "")} />
                  {item.name}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-brand-primary/10 border border-brand-primary/20 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-medium shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-opacity">
            Join STEMVerse
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
