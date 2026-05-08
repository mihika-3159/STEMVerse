"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Atom, 
  Dna, 
  Beaker, 
  Calculator, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";

const simulations = [
  {
    id: "physics",
    title: "Projectile Motion Lab",
    description: "Analyze the physics of objects in motion. Experiment with angle, velocity, and gravity.",
    icon: Atom,
    color: "text-physics",
    bgColor: "bg-physics/10",
    borderColor: "border-physics/20",
    path: "/simulations/physics",
    difficulty: "Medium",
    topics: ["Kinematics", "Gravity", "Vectors"]
  },
  {
    id: "biology",
    title: "Ecosystem Simulator",
    description: "Balance the delicate relationship between predators and prey in a living ecosystem.",
    icon: Dna,
    color: "text-biology",
    bgColor: "bg-biology/10",
    borderColor: "border-biology/20",
    path: "/simulations/biology",
    difficulty: "Easy",
    topics: ["Ecology", "Population", "Dynamics"]
  },
  {
    id: "chemistry",
    title: "Virtual Reaction Lab",
    description: "Explore chemical kinetics and collision theory. Watch molecules react in real-time.",
    icon: Beaker,
    color: "text-chemistry",
    bgColor: "bg-chemistry/10",
    borderColor: "border-chemistry/20",
    path: "/simulations/chemistry",
    difficulty: "Hard",
    topics: ["Kinetics", "Thermodynamics", "Catalysis"]
  },
  {
    id: "math",
    title: "Optimization Explorer",
    description: "Visualize gradient descent and find the global minima of complex mathematical functions.",
    icon: Calculator,
    color: "text-math",
    bgColor: "bg-math/10",
    borderColor: "border-math/20",
    path: "/simulations/math",
    difficulty: "Hard",
    topics: ["Calculus", "Optimization", "ML Basics"]
  }
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-brand-primary font-medium mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Welcome back, Explorer</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Simulation Dashboard</h1>
        <p className="text-white/60 max-w-2xl">
          Choose a STEM world to start your interactive learning journey. 
          Your progress is tracked automatically as you experiment.
        </p>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Learning Streak", value: "5 Days", icon: TrendingUp, color: "text-orange-400" },
          { label: "Time Explored", value: "12.5 Hours", icon: Clock, color: "text-blue-400" },
          { label: "Badges Earned", value: "8", icon: Award, color: "text-purple-400" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white/40 text-sm">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {simulations.map((sim, i) => (
          <motion.div
            key={sim.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              href={sim.path}
              className={`group block p-8 rounded-3xl bg-white/5 border ${sim.borderColor} hover:bg-white/[0.08] transition-all relative overflow-hidden h-full`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${sim.bgColor} ${sim.color} group-hover:scale-110 transition-transform`}>
                  <sim.icon className="w-8 h-8" />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                  {sim.difficulty}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{sim.title}</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                {sim.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {sim.topics.map(topic => (
                  <span key={topic} className="px-3 py-1 rounded-lg bg-white/5 text-xs text-white/60">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all">
                <span>Start Simulation</span>
                <ArrowRight className="w-4 h-4 text-brand-primary" />
              </div>

              {/* Decorative Background Icon */}
              <sim.icon className={`absolute -bottom-8 -right-8 w-40 h-40 opacity-[0.03] ${sim.color} group-hover:opacity-[0.05] transition-opacity`} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recommended Section */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-brand-primary" />
          Recommended Next Steps
        </h2>
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Challenge: The Perfect Arc</h3>
            <p className="text-white/60 max-w-xl">
              Apply what you learned in the Physics World to hit a target 100m away with air resistance enabled. 
              Earn the "Kinematics Master" badge.
            </p>
          </div>
          <Link 
            href="/simulations/physics"
            className="px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Go to Physics World
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
