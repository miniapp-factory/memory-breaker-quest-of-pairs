"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function GameScreen() {
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    // Save progress
    const save = { level: 1, score };
    localStorage.setItem("memory-breaker-save", JSON.stringify(save));
  }, [score]);

  const pause = () => setPaused((p) => !p);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full max-w-md">
        <span>Timer: {timer}s</span>
        <span>Score: {score}</span>
        <Button variant="ghost" onClick={pause}>{paused ? "Resume" : "Pause"}</Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {/* Placeholder for card grid */}
        <div className="bg-muted h-24 rounded-lg" />
        <div className="bg-muted h-24 rounded-lg" />
        <div className="bg-muted h-24 rounded-lg" />
        <div className="bg-muted h-24 rounded-lg" />
      </div>
    </div>
  );
}
