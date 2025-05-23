import React from "react";
import type { Card as CardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  className?: string;
}

export function Card({ card, className }: CardProps) {
  const suitSymbol =
    card.suit === "hearts"
      ? "♥"
      : card.suit === "diamonds"
        ? "♦"
        : card.suit === "clubs"
          ? "♣"
          : "♠";

  const suitColor =
    card.suit === "hearts" || card.suit === "diamonds" ? "text-red-600" : "text-black";

  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105",
        card.faceUp ? "bg-white" : "bg-blue-800",
        "w-10 h-14", // Default size, can be overridden by className
        className,
      )}
    >
      <div className="w-full h-full relative">
        {/* We'll use placeholder images until we create actual card images */}
        {card.faceUp ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center">
              <div className={cn("font-bold", suitColor, "text-sm sm:text-base")}>
                {card.rank}
              </div>
              <div className={cn(suitColor, "text-xs ml-0.5")}>{suitSymbol}</div>
            </div>
            <div className={cn(suitColor, "text-lg sm:text-xl")}>{suitSymbol}</div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-4xl mt-[-6px]">🂠</div>
          </div>
        )}
      </div>
    </div>
  );
}
