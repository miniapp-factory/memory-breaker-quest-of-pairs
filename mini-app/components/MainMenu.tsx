"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function MainMenu() {
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("memory-breaker-save");
    setHasSave(!!saved);
  }, []);

  const startGame = () => {
    // Reset or start level 1
    localStorage.setItem("memory-breaker-save", JSON.stringify({ level: 1, score: 0 }));
    window.location.href = "/game";
  };

  const continueGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Memory Breaker: Soft Match Edition</h1>
      <p className="text-muted-foreground text-center max-w-md">
        A simple and relaxing memory‑matching game with a soft pastel interface and clean, minimal card designs.
      </p>
      <Button onClick={startGame}>Start Game</Button>
      {hasSave && <Button variant="outline" onClick={continueGame}>Continue</Button>}
    </div>
  );
}
