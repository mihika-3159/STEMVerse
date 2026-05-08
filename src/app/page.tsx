"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Atom, 
  Dna, 
  Beaker, 
  Calculator, 
  Sparkles, 
  Gamepad2, 
  BrainCircuit,
  Zap,
  CheckCircle2
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-primary/20 blur-[120px] -z-10 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>DSH Hacks V1 Winner Material</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          STEM Learning <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Reimagined.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Enter a living simulation world where complex concepts become interactive playgrounds. 
          Powered by Gemini AI to guide you through every discovery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/dashboard"
            className="group relative px-8 py-4 rounded-2xl bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span>Enter the STEMVerse</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
            Watch Demo
          </button>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-10 md:left-20 p-4 rounded-2xl glass-dark text-physics hidden lg:block"
        >
          <Atom className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-10 md:right-20 p-4 rounded-2xl glass-dark text-biology hidden lg:block"
        >
          <Dna className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Worlds Section */}
      <section className="w-full bg-white/[0.02] border-y border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Four Worlds. Infinite Learning.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Physics", icon: Atom, color: "text-physics", desc: "Master projectile motion, gravity, and kinematics." },
              { title: "Biology", icon: Dna, color: "text-biology", desc: "Explore ecosystem stability and predator-prey dynamics." },
              { title: "Chemistry", icon: Beaker, color: "text-chemistry", desc: "Visualize molecular collisions and reaction speeds." },
              { title: "Mathematics", icon: Calculator, color: "text-math", desc: "Optimize functions and visualize gradient descent." },
            ].map((world, i) => (
              <motion.div
                key={world.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${world.color}`}>
                  <world.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{world.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{world.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Adaptive AI that <br />
              <span className="text-brand-primary">Thinks with You.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Real-time Feedback", desc: "AI observes your experiments and explains outcomes instantly.", icon: Zap },
                { title: "Misconception Detection", desc: "Identifies logical errors in your reasoning and corrects them.", icon: BrainCircuit },
                { title: "Gamified Challenges", desc: "Earn experience by solving complex STEM puzzles.", icon: Gamepad2 },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 text-brand-primary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-white/60">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-transparent" />
              {/* Mockup AI Interface */}
              <div className="absolute inset-8 rounded-2xl bg-black/40 border border-white/10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                    <BrainCircuit className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold">Gemini AI Tutor</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-white/80 leading-relaxed italic">
                  "Notice how the trajectory changed when we added air resistance. The horizontal velocity is no longer constant. Why do you think that is?"
                </div>
                <div className="mt-auto flex gap-2">
                  <div className="h-2 w-12 rounded-full bg-brand-primary" />
                  <div className="h-2 w-8 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-secondary/30 blur-[80px] -z-10" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-32">
        <div className="p-12 md:p-20 rounded-[40px] stem-gradient text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to explore?</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
            Join thousands of students and start your journey into the STEMVerse today.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-white text-brand-primary font-bold text-lg hover:scale-105 transition-transform"
          >
            Launch Dashboard
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="w-full py-12 border-t border-white/5 text-center text-white/40 text-sm">
        <p>© 2026 STEMVerse AI. Built for DSH Hacks V1.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
