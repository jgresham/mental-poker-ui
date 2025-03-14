import React from "react";
import { Card as CardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  className?: string;
}

export function Card({ card, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105",
        card.faceUp ? "bg-white" : "bg-blue-800",
        "w-10 h-14", // Default size, can be overridden by className
        className
      )}
    >
      <div className="w-full h-full relative">
        {/* We'll use placeholder images until we create actual card images */}
        {card.faceUp ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className={cn(
              "font-bold",
              card.suit === "hearts" || card.suit === "diamonds" ? "text-red-600" : "text-black",
              "text-sm sm:text-base"
            )}>
              {card.rank}
            </div>
            <div className={cn(
              card.suit === "hearts" || card.suit === "diamonds" ? "text-red-600" : "text-black",
              "text-lg sm:text-xl"
            )}>
              {card.suit === "hearts" ? "♥" :
                card.suit === "diamonds" ? "♦" :
                  card.suit === "clubs" ? "♣" : "♠"}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-xl">🂠</div>
          </div>
        )}
      </div>
    </div>
  );
} 