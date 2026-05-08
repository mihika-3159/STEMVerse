"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, MessageSquare, Send, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface AIGuidanceProps {
  world: string;
  context: any; // Current simulation variables
}

const AIGuidance: React.FC<AIGuidanceProps> = ({ world, context }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: `Hello! I'm your ${world} AI guide. I'm watching your simulation in real-time. Try changing some variables to see what happens!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate AI reaction to variable changes
  useEffect(() => {
    // Only respond occasionally to avoid spam
    const timer = setTimeout(() => {
      // In a real app, this would call Gemini API
      // For now, we'll use a local logic or just wait
    }, 2000);
    return () => clearTimeout(timer);
  }, [context]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          world: world.toLowerCase(),
          context,
          messages: [...messages, userMsg]
        })
      });

      const data = await response.json();
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    }
  };


  return (
    <div className="flex flex-col h-full bg-black/40 border-l border-white/5 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Gemini AI Tutor</h3>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Thinking</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Sparkles className="w-4 h-4 text-brand-secondary" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-brand-primary text-white rounded-tr-none" 
                  : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none"
              )}>
                {msg.content}
              </div>
              <span className="text-[10px] text-white/20 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Context Indicator */}
      <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex items-center gap-2">
        <AlertCircle className="w-3 h-3 text-brand-primary" />
        <span className="text-[10px] text-white/40 font-medium">AI is tracking 5 simulation variables</span>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-primary text-white hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGuidance;
