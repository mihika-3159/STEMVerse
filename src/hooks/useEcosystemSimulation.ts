"use client";

import { useState, useEffect, useCallback } from "react";

interface EcosystemState {
  preyPopulation: number;
  predatorPopulation: number;
  foodAvailability: number;
  reproductionRate: number;
  environmentalStress: number;
}

export const useEcosystemSimulation = (initialState: EcosystemState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const step = useCallback(() => {
    setHistory(prev => {
      const last = prev[prev.length - 1] || { 
        prey: state.preyPopulation, 
        predator: state.predatorPopulation,
        time: 0 
      };

      // Lotka-Volterra equations
      // dx/dt = alpha*x - beta*x*y
      // dy/dt = delta*x*y - gamma*y

      const alpha = 0.1 * (state.foodAvailability / 50) * (state.reproductionRate / 50);
      const beta = 0.01 * (1 + state.environmentalStress / 100);
      const delta = 0.005 * (1 - state.environmentalStress / 200);
      const gamma = 0.05 * (1 + state.environmentalStress / 100);

      const dx = alpha * last.prey - beta * last.prey * last.predator;
      const dy = delta * last.prey * last.predator - gamma * last.predator;

      const newPrey = Math.max(0, last.prey + dx);
      const newPredator = Math.max(0, last.predator + dy);

      const newHistory = [...prev, { 
        time: last.time + 1, 
        prey: Math.round(newPrey), 
        predator: Math.round(newPredator) 
      }];
      
      // Keep last 100 points
      return newHistory.slice(-100);
    });
  }, [state]);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(step, 200);
    }
    return () => clearInterval(interval);
  }, [isSimulating, step]);

  const startSimulation = () => {
    setHistory([{ 
      time: 0, 
      prey: state.preyPopulation, 
      predator: state.predatorPopulation 
    }]);
    setIsSimulating(true);
  };

  const stopSimulation = () => setIsSimulating(false);

  return {
    state,
    setState,
    history,
    setHistory,
    isSimulating,
    startSimulation,
    stopSimulation,
    stats: {
      isStable: history.length > 20 && Math.abs(history[history.length-1].prey - history[history.length-10].prey) < 5,
      extinctionRisk: (history[history.length-1]?.prey < 5 || history[history.length-1]?.predator < 2) ? "High" : "Low"
    }
  };
};

