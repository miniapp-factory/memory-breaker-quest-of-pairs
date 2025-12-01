"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function GameScreen() {
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  // --- Card state and logic -------------------------------------------------
  const initialCards = [
    { id: 1, value: "🐰" },
    { id: 2, value: "🐰" },
    { id: 3, value: "🐱" },
    { id: 4, value: "🐱" },
    { id: 5, value: "🐦" },
    { id: 6, value: "🐦" },
    { id: 7, value: "🐻" },
    { id: 8, value: "🐻" },
  ];
  const [cards, setCards] = useState(
    initialCards
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, flipped: false, matched: false }))
  );
  const [firstCard, setFirstCard] = useState<null | typeof cards[0]>(null);
  const [secondCard, setSecondCard] = useState<null | typeof cards[0]>(null);

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.flipped || card.matched || paused) return;
    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updated);
    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      if (firstCard.value === card.value) {
        // Match
        setCards((prev) =>
          prev.map((c) =>
            c.value === card.value ? { ...c, matched: true } : c
          )
        );
        setScore((s) => s + 10);
        setFirstCard(null);
        setSecondCard(null);
      } else {
        // No match – flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setFirstCard(null);
          setSecondCard(null);
        }, 800);
      }
    }
  };

  // --- Timer effect ---------------------------------------------------------
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
        {cards.map((card) => (
          <div
            key={card.id}
            className={`h-24 rounded-lg flex items-center justify-center cursor-pointer ${
              card.flipped || card.matched ? "bg-white" : "bg-muted"
            }`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.value : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
