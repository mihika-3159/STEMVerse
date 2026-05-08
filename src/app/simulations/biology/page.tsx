"use client";

import React from "react";
import SimulationLayout from "@/components/simulation/SimulationLayout";
import AIGuidance from "@/components/simulation/AIGuidance";
import { useEcosystemSimulation } from "@/hooks/useEcosystemSimulation";
import { Dna, Play, Square, RotateCcw, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const EcosystemSim = () => {
  const { 
    state, 
    setState, 
    history, 
    setHistory,
    isSimulating, 
    startSimulation, 
    stopSimulation,
    stats 
  } = useEcosystemSimulation({

    preyPopulation: 50,
    predatorPopulation: 10,
    foodAvailability: 50,
    reproductionRate: 50,
    environmentalStress: 0
  });

  return (
    <SimulationLayout 
      title="Ecosystem Simulator" 
      world="Biology" 
      icon={Dna} 
      colorClass="text-biology"
    >
      <div className="flex h-full">
        {/* Main Simulation Area */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          {/* Visual Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-3xl bg-black/40 border border-white/5 h-[400px]">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-biology" />
                Population Trends
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorPrey" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="prey" 
                    name="Prey (Rabbits)"
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorPrey)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predator" 
                    name="Predators (Wolves)"
                    stroke="#f43f5e" 
                    fillOpacity={1} 
                    fill="url(#colorPred)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${stats.extinctionRisk === "High" ? "bg-red-500/20 text-red-500" : "bg-biology/20 text-biology"}`}>
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <p className="text-sm text-white/40 mb-1">Extinction Risk</p>
                <p className={`text-2xl font-bold ${stats.extinctionRisk === "High" ? "text-red-500" : "text-biology"}`}>
                  {stats.extinctionRisk}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-sm text-white/40 mb-1">Ecosystem Stability</p>
                <p className="text-2xl font-bold text-brand-primary">
                  {stats.isStable ? "Balanced" : "Fluctuating"}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Initial Populations</h2>
                <div className="flex gap-2">
                  {!isSimulating ? (
                    <button 
                      onClick={startSimulation}
                      className="px-6 py-2 rounded-xl bg-biology text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-4 h-4 fill-current" /> Start
                    </button>
                  ) : (
                    <button 
                      onClick={stopSimulation}
                      className="px-6 py-2 rounded-xl bg-red-500 text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Square className="w-4 h-4 fill-current" /> Stop
                    </button>
                  )}
                  <button 
                    onClick={() => setHistory([])}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Initial Prey", key: "preyPopulation", min: 10, max: 200, color: "accent-biology" },
                  { label: "Initial Predators", key: "predatorPopulation", min: 2, max: 50, color: "accent-red-500" },
                ].map((param) => (
                  <div key={param.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white/60">{param.label}</label>
                      <span className="text-sm font-bold">{state[param.key as keyof typeof state]}</span>
                    </div>
                    <input 
                      type="range" 
                      min={param.min} 
                      max={param.max} 
                      disabled={isSimulating}
                      value={state[param.key as keyof typeof state] as number}
                      onChange={(e) => setState({ ...state, [param.key]: parseInt(e.target.value) })}
                      className={`w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer ${param.color} disabled:opacity-50`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
              <h2 className="text-xl font-bold">Environmental Factors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Food Availability", key: "foodAvailability", min: 10, max: 100 },
                  { label: "Reproduction Rate", key: "reproductionRate", min: 10, max: 100 },
                  { label: "Environmental Stress", key: "environmentalStress", min: 0, max: 100 },
                ].map((param) => (
                  <div key={param.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white/60">{param.label}</label>
                      <span className="text-sm font-bold text-brand-primary">{state[param.key as keyof typeof state]}%</span>
                    </div>
                    <input 
                      type="range" 
                      min={param.min} 
                      max={param.max} 
                      value={state[param.key as keyof typeof state] as number}
                      onChange={(e) => setState({ ...state, [param.key]: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="w-[400px] hidden xl:block">
          <AIGuidance world="Biology" context={state} />
        </div>
      </div>
    </SimulationLayout>
  );
};

export default EcosystemSim;
