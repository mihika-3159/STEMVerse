"use client";

import { useState, useEffect, useCallback } from "react";

interface MathState {
  functionType: "quadratic" | "sinusoidal" | "valley";
  learningRate: number;
  initialX: number;
  momentum: number;
}

export const useOptimizationSimulation = (initialState: MathState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState<any[]>([]);
  const [currentPoint, setCurrentPoint] = useState({ x: initialState.initialX, y: 0 });
  const [isSimulating, setIsSimulating] = useState(false);

  const f = (x: number) => {
    switch(state.functionType) {
      case "quadratic": return x * x;
      case "sinusoidal": return x * Math.sin(x) + x * x / 10;
      case "valley": return Math.pow(x, 4) - 4 * x * x + 5;
      default: return x * x;
    }
  };

  const df = (x: number) => {
    const h = 0.001;
    return (f(x + h) - f(x)) / h;
  };

  const step = useCallback(() => {
    setCurrentPoint(prev => {
      const grad = df(prev.x);
      const newX = prev.x - state.learningRate * grad;
      const newY = f(newX);
      
      const newPoint = { x: newX, y: newY };
      setHistory(h => [...h, newPoint].slice(-50));
      return newPoint;
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
    setHistory([{ x: state.initialX, y: f(state.initialX) }]);
    setCurrentPoint({ x: state.initialX, y: f(state.initialX) });
    setIsSimulating(true);
  };

  const stopSimulation = () => setIsSimulating(false);

  const generateFunctionData = () => {
    const data = [];
    for (let x = -5; x <= 5; x += 0.1) {
      data.push({ x: parseFloat(x.toFixed(1)), y: f(x) });
    }
    return data;
  };

  return {
    state,
    setState,
    history,
    setHistory,
    currentPoint,
    functionData: generateFunctionData(),
    isSimulating,
    startSimulation,
    stopSimulation,
    stats: {
      gradient: df(currentPoint.x),
      loss: currentPoint.y
    }
  };
};

