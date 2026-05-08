"use client";

import React from "react";
import SimulationLayout from "@/components/simulation/SimulationLayout";
import AIGuidance from "@/components/simulation/AIGuidance";
import { useOptimizationSimulation } from "@/hooks/useOptimizationSimulation";
import { Calculator, Play, Square, RotateCcw, Target, Zap, LineChart as ChartIcon, Sparkles } from "lucide-react";

import { 
  ComposedChart,
  Line, 
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const OptimizationExplorer = () => {
  const { 
    state, 
    setState, 
    history, 
    setHistory,
    currentPoint,
    functionData,
    isSimulating, 
    startSimulation, 
    stopSimulation,
    stats 
  } = useOptimizationSimulation({

    functionType: "quadratic",
    learningRate: 0.1,
    initialX: -4,
    momentum: 0
  });

  return (
    <SimulationLayout 
      title="Optimization Explorer" 
      world="Math" 
      icon={Calculator} 
      colorClass="text-math"
    >
      <div className="flex h-full">
        {/* Main Simulation Area */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          {/* Optimization Graph Card */}
          <div className="p-8 rounded-3xl bg-black/40 border border-white/5 h-[450px] relative">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <ChartIcon className="w-6 h-6 text-math" />
              Gradient Descent Visualization
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={functionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="x" type="number" domain={[-5, 5]} stroke="rgba(255,255,255,0.4)" />
                <YAxis type="number" domain={[0, 25]} stroke="rgba(255,255,255,0.4)" />
                <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                
                {/* The Function Curve */}
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#ec4899" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={false}
                />

                {/* The Optimization Path */}
                <Scatter 
                  name="Optimization Path" 
                  data={history} 
                  fill="#fff"
                />
                
                {/* Current Point */}
                <Scatter 
                  name="Current Point" 
                  data={[currentPoint]} 
                  fill="#0ea5e9"
                />
              </ComposedChart>
            </ResponsiveContainer>

            <div className="absolute top-8 right-8 flex flex-col gap-2">
              <div className="px-4 py-2 rounded-xl bg-math/20 border border-math/20 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase text-math/60 block">Current Loss</span>
                <span className="text-xl font-mono font-bold text-math">{stats.loss.toFixed(4)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Optimizer Settings</h2>
                <div className="flex gap-2">
                  {!isSimulating ? (
                    <button 
                      onClick={startSimulation}
                      className="px-6 py-2 rounded-xl bg-math text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-4 h-4 fill-current" /> Run Optimizer
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
                    onClick={() => { stopSimulation(); setHistory([]); }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/60">Select Function</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["quadratic", "sinusoidal", "valley"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setState({ ...state, functionType: type as any })}
                        className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${state.functionType === type ? 'bg-math text-white' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/60">Learning Rate (η)</label>
                    <span className="text-sm font-bold text-math">{state.learningRate}</span>
                  </div>
                  <input 
                    type="range" min="0.01" max="1" step="0.01"
                    value={state.learningRate}
                    onChange={(e) => setState({ ...state, learningRate: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-math"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/60">Starting Point (x₀)</label>
                    <span className="text-sm font-bold text-math">{state.initialX}</span>
                  </div>
                  <input 
                    type="range" min="-5" max="5" step="0.1"
                    value={state.initialX}
                    onChange={(e) => setState({ ...state, initialX: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-math"
                  />
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-math" />
                Live Convergence
              </h2>
              <div className="flex-1 flex flex-col justify-center gap-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/40 mb-1">Local Gradient</p>
                    <p className={`text-3xl font-mono font-bold ${stats.gradient > 0 ? "text-red-400" : "text-green-400"}`}>
                      {stats.gradient > 0 ? "+" : ""}{stats.gradient.toFixed(4)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Zap className={`w-6 h-6 ${Math.abs(stats.gradient) < 0.01 ? "text-green-400" : "text-white/20"}`} />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-brand-primary/10 border border-brand-primary/20">
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                    AI Observation
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {state.learningRate > 0.5 
                      ? "The learning rate is quite high! Watch for oscillations or divergence where the point bounces back and forth."
                      : "A small learning rate ensures stable convergence but might take longer to reach the global minimum."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="w-[400px] hidden xl:block">
          <AIGuidance world="Math" context={state} />
        </div>
      </div>
    </SimulationLayout>
  );
};

export default OptimizationExplorer;
