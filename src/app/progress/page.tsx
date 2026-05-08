"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, TrendingUp, Microscope, Atom, Beaker, Calculator } from "lucide-react";

const ProgressPage = () => {
  const stats = [
    { label: "Total Simulations", value: "12", icon: Microscope, color: "text-brand-primary" },
    { label: "Challenges Won", value: "8", icon: Award, color: "text-brand-secondary" },
    { label: "Concepts Mastered", value: "15", icon: CheckCircle2, color: "text-biology" },
    { label: "Exploration Hours", value: "12.5", icon: TrendingUp, color: "text-physics" },
  ];

  const worlds = [
    { name: "Physics", progress: 65, icon: Atom, color: "bg-physics" },
    { name: "Biology", progress: 40, icon: Microscope, color: "bg-biology" },
    { name: "Chemistry", progress: 25, icon: Beaker, color: "bg-chemistry" },
    { name: "Math", progress: 80, icon: Calculator, color: "bg-math" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-brand-primary" />
          Your Learning Journey
        </h1>
        <p className="text-white/60">
          Tracking your growth through the STEMVerse. Keep exploring to unlock new worlds and badges.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Bars */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-8">World Mastery</h2>
          <div className="space-y-8">
            {worlds.map((world) => (
              <div key={world.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <world.icon className="w-5 h-5 text-white/60" />
                    <span className="font-bold">{world.name} World</span>
                  </div>
                  <span className="text-sm font-medium text-white/40">{world.progress}% Mastered</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${world.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${world.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-8">Recent Badges</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-4 text-center group">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-brand-primary" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Badge #{i}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors">
            View All Badges
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
