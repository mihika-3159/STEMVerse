"use client";

import React from "react";
import SimulationLayout from "@/components/simulation/SimulationLayout";
import AIGuidance from "@/components/simulation/AIGuidance";
import { useReactionSimulation } from "@/hooks/useReactionSimulation";
import { Beaker, Play, Square, RotateCcw, Thermometer, Zap, FlaskConical } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const ReactionLab = () => {
  const { 
    state, 
    setState, 
    history, 
    isSimulating, 
    startSimulation, 
    stopSimulation,
    stats 
  } = useReactionSimulation({
    reactantA: 100,
    reactantB: 100,
    concentration: 50,
    temperature: 25,
    catalyst: false
  });

  return (
    <SimulationLayout 
      title="Virtual Reaction Lab" 
      world="Chemistry" 
      icon={Beaker} 
      colorClass="text-chemistry"
    >
      <div className="flex h-full">
        {/* Main Simulation Area */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          {/* Reaction Progress Card */}
          <div className="p-8 rounded-3xl bg-black/40 border border-white/5 h-[450px]">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-chemistry" />
              Reaction Progress
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" label={{ value: "Time (s)", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.4)" }} />
                <YAxis label={{ value: "Concentration (%)", angle: -90, position: "insideLeft", fill: "rgba(255,255,255,0.4)" }} stroke="rgba(255,255,255,0.4)" />
                <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                <Legend />
                <Line type="monotone" dataKey="A" name="Reactant A" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="B" name="Reactant B" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Product" name="Product" stroke="#f59e0b" strokeWidth={4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reaction Variables</h2>
                <div className="flex gap-2">
                  {!isSimulating ? (
                    <button 
                      onClick={startSimulation}
                      className="px-6 py-2 rounded-xl bg-chemistry text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-4 h-4 fill-current" /> Start Reaction
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
                    onClick={() => { stopSimulation(); setState({ ...state, reactantA: 100, reactantB: 100 }); }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                      <Thermometer className="w-4 h-4" /> Temperature
                    </label>
                    <span className="text-sm font-bold text-chemistry">{state.temperature}°C</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={state.temperature}
                    onChange={(e) => setState({ ...state, temperature: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-chemistry"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/60">Concentration</label>
                    <span className="text-sm font-bold text-chemistry">{state.concentration}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" 
                    value={state.concentration}
                    onChange={(e) => setState({ ...state, concentration: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-chemistry"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Catalyst</span>
                      <span className="text-[10px] text-white/40">Lowers activation energy</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setState({ ...state, catalyst: !state.catalyst })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${state.catalyst ? 'bg-chemistry' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.catalyst ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                <p className="text-sm text-white/40 mb-2">Instantaneous Reaction Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-bold text-chemistry">{stats.reactionRate.toFixed(4)}</p>
                  <p className="text-sm text-white/40">mol/L·s</p>
                </div>
                <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-chemistry transition-all duration-300"
                    style={{ width: `${Math.min(100, stats.reactionRate * 5000)}%` }}
                  />
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                <p className="text-sm text-white/40 mb-2">Reaction Completion</p>
                <p className="text-5xl font-bold text-brand-secondary">{stats.completion.toFixed(1)}%</p>
                <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-secondary transition-all duration-300"
                    style={{ width: `${stats.completion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="w-[400px] hidden xl:block">
          <AIGuidance world="Chemistry" context={state} />
        </div>
      </div>
    </SimulationLayout>
  );
};

export default ReactionLab;
