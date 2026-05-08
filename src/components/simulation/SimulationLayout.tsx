"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, HelpCircle, Settings2 } from "lucide-react";

interface SimulationLayoutProps {
  children: React.ReactNode;
  title: string;
  world: "Physics" | "Biology" | "Chemistry" | "Math";
  icon: React.ElementType;
  colorClass: string;
}

const SimulationLayout: React.FC<SimulationLayoutProps> = ({ 
  children, 
  title, 
  world, 
  icon: Icon,
  colorClass 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      {/* Top Bar */}
      <div className="border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>{world} World</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-brand-primary flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Simulation
                </span>
              </div>
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white flex items-center gap-2 text-sm font-medium">
            <HelpCircle className="w-5 h-5" />
            <span className="hidden sm:inline">How it works</span>
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SimulationLayout;
