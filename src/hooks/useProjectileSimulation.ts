"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ProjectileState {
  angle: number;
  velocity: number;
  gravity: number;
  mass: number;
  airResistance: boolean;
}

interface Point {
  x: number;
  y: number;
  t: number;
  vx: number;
  vy: number;
}

export const useProjectileSimulation = (initialState: ProjectileState) => {
  const [state, setState] = useState(initialState);
  const [trajectory, setTrajectory] = useState<Point[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);


  const calculateTrajectory = useCallback(() => {
    const points: Point[] = [];
    const dt = 0.05;
    let t = 0;
    let x = 0;
    let y = 0;
    
    const angleRad = (state.angle * Math.PI) / 180;
    let vx = state.velocity * Math.cos(angleRad);
    let vy = state.velocity * Math.sin(angleRad);
    
    const k = state.airResistance ? 0.1 : 0; // Air resistance coefficient
    const m = state.mass;
    const g = state.gravity;

    points.push({ x, y, t, vx, vy });

    while (y >= 0 && t < 20) {
      t += dt;
      
      // Forces
      const F_ax = -k * vx;
      const F_ay = -k * vy;
      const F_g = -m * g;

      // Accelerations
      const ax = F_ax / m;
      const ay = (F_g + F_ay) / m;

      // Update velocities
      vx += ax * dt;
      vy += ay * dt;

      // Update positions
      x += vx * dt;
      y += vy * dt;

      if (y < 0) y = 0;
      points.push({ x, y, t, vx, vy });
      if (y === 0) break;
    }

    return points;
  }, [state]);

  useEffect(() => {
    setTrajectory(calculateTrajectory());
  }, [calculateTrajectory]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentTime(0);
    lastUpdateRef.current = performance.now();
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentTime(0);
  };

  return {
    state,
    setState,
    trajectory,
    isSimulating,
    currentTime,
    startSimulation,
    resetSimulation,
    stats: {
      range: trajectory[trajectory.length - 1]?.x || 0,
      maxHeight: Math.max(...trajectory.map(p => p.y)),
      timeOfFlight: trajectory[trajectory.length - 1]?.t || 0
    }
  };
};
