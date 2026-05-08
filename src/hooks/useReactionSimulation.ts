"use client";

import { useState, useEffect, useCallback } from "react";

interface ChemistryState {
  reactantA: number;
  reactantB: number;
  concentration: number;
  temperature: number;
  catalyst: boolean;
}

export const useReactionSimulation = (initialState: ChemistryState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const step = useCallback(() => {
    setHistory(prev => {
      const last = prev[prev.length - 1] || { 
        A: state.reactantA, 
        B: state.reactantB,
        Product: 0,
        time: 0 
      };

      if (last.A <= 0 || last.B <= 0) return prev;

      // Rate = k * [A] * [B]
      // Arrhenius: k = A * exp(-Ea / (R * T))
      const Ea = state.catalyst ? 20 : 50;
      const R = 8.314;
      const T = state.temperature + 273.15;
      const k = 0.1 * Math.exp(-Ea * 1000 / (R * T)) * 1000000; // Scaled k
      
      const rate = k * (state.concentration / 100) * (last.A / 100) * (last.B / 100);

      const newA = Math.max(0, last.A - rate);
      const newB = Math.max(0, last.B - rate);
      const newProduct = last.Product + rate;

      return [...prev, { 
        time: last.time + 0.5, 
        A: newA, 
        B: newB, 
        Product: newProduct 
      }].slice(-100);
    });
  }, [state]);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(step, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating, step]);

  const startSimulation = () => {
    setHistory([{ 
      time: 0, 
      A: state.reactantA, 
      B: state.reactantB, 
      Product: 0 
    }]);
    setIsSimulating(true);
  };

  const stopSimulation = () => setIsSimulating(false);

  return {
    state,
    setState,
    history,
    isSimulating,
    startSimulation,
    stopSimulation,
    stats: {
      reactionRate: history.length > 1 ? (history[history.length-1].Product - history[history.length-2].Product) : 0,
      completion: history.length > 0 ? (history[history.length-1].Product / (state.reactantA)) * 100 : 0
    }
  };
};
