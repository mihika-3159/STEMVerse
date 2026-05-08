"use client";

import React, { useRef, useEffect } from "react";
import SimulationLayout from "@/components/simulation/SimulationLayout";
import AIGuidance from "@/components/simulation/AIGuidance";
import { useProjectileSimulation } from "@/hooks/useProjectileSimulation";
import { Atom, Play, RotateCcw, Info, Settings } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const ProjectileLab = () => {
  const { 
    state, 
    setState, 
    trajectory, 
    isSimulating, 
    startSimulation, 
    resetSimulation,
    stats 
  } = useProjectileSimulation({
    angle: 45,
    velocity: 20,
    gravity: 9.8,
    mass: 1,
    airResistance: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ground
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.stroke();

    // Scaling
    const scale = 10; // 1 meter = 10 pixels
    const offsetX = 50;
    const offsetY = canvas.height - 20;

    // Draw Trajectory Path
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    trajectory.forEach(p => {
      ctx.lineTo(offsetX + p.x * scale, offsetY - p.y * scale);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Launch Angle Indicator
    const angleRad = (state.angle * Math.PI) / 180;
    ctx.strokeStyle = "rgba(236, 72, 153, 0.6)";
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(
      offsetX + Math.cos(angleRad) * 50,
      offsetY - Math.sin(angleRad) * 50
    );
    ctx.stroke();

    // Draw Projectile
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#3b82f6";
    ctx.fill();

  }, [trajectory, state.angle]);

  return (
    <SimulationLayout 
      title="Projectile Motion Lab" 
      world="Physics" 
      icon={Atom} 
      colorClass="text-physics"
    >
      <div className="flex h-full">
        {/* Main Simulation Area */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          {/* Visual Simulation Card */}
          <div className="relative aspect-[16/9] w-full rounded-3xl bg-black/40 border border-white/5 overflow-hidden shadow-2xl">
            <canvas 
              ref={canvasRef} 
              width={1200} 
              height={675}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono">
                <span className="text-white/40">Range:</span> <span className="text-physics font-bold">{stats.range.toFixed(2)}m</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono">
                <span className="text-white/40">Max Height:</span> <span className="text-brand-secondary font-bold">{stats.maxHeight.toFixed(2)}m</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Card */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-physics" />
                  Parameters
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={startSimulation}
                    className="p-3 rounded-xl bg-physics text-white hover:opacity-90 transition-opacity"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <button 
                    onClick={resetSimulation}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Launch Angle", key: "angle", min: 0, max: 90, unit: "°" },
                  { label: "Initial Velocity", key: "velocity", min: 1, max: 100, unit: "m/s" },
                  { label: "Gravity", key: "gravity", min: 0.1, max: 20, unit: "m/s²" },
                  { label: "Mass", key: "mass", min: 0.1, max: 50, unit: "kg" },
                ].map((param) => (
                  <div key={param.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-white/60">{param.label}</label>
                      <span className="text-sm font-bold text-physics">{state[param.key as keyof typeof state]}{param.unit}</span>
                    </div>
                    <input 
                      type="range" 
                      min={param.min} 
                      max={param.max} 
                      step={param.key === "gravity" ? 0.1 : 1}
                      value={state[param.key as keyof typeof state] as number}
                      onChange={(e) => setState({ ...state, [param.key]: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-physics"
                    />
                  </div>
                ))}

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Info className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">Enable Air Resistance</span>
                  </div>
                  <button 
                    onClick={() => setState({ ...state, airResistance: !state.airResistance })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${state.airResistance ? 'bg-physics' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.airResistance ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Graphs Card */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-physics" />
                Trajectory Graph
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trajectory.filter((_, i) => i % 5 === 0)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="x" 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={12}
                      label={{ value: "Distance (m)", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={12}
                      label={{ value: "Height (m)", angle: -90, position: "insideLeft", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                      itemStyle={{ color: "#3b82f6" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="y" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      dot={false}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="w-[400px] hidden xl:block">
          <AIGuidance world="Physics" context={state} />
        </div>
      </div>
    </SimulationLayout>
  );
};

export default ProjectileLab;
