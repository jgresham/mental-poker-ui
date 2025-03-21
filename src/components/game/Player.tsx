import React from "react";
import { Player as PlayerType } from "@/lib/types";
import { Card } from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PlayerProps {
  player: PlayerType;
  isCurrentUser?: boolean;
}

export function Player({ player, isCurrentUser = false }: PlayerProps) {
  const {
    name,
    address,
    chips,
    cards,
    isActive,
    isDealer,
    isSmallBlind,
    isBigBlind,
    isTurn,
    isAllIn,
    bet,
    avatarUrl,
  } = player;

  // Get initials for avatar fallback
  const initials = name
    ? name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : address?.slice(2, 4).toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-col items-center p-1 rounded-lg transition-all max-w-[110px] mx-auto",
        isTurn
          ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500"
          : "bg-gray-100 dark:bg-gray-800/30",
        !isActive && "opacity-50",
        isCurrentUser && "bg-green-100 dark:bg-green-900/30",
      )}
    >
      <div className="flex items-center gap-1 mb-1 w-full">
        <Avatar className="h-8 w-8 border-2 border-white">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-medium truncate">{name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">${chips}</span>
        </div>
      </div>

      <div className="flex gap-1 mb-1 justify-center">
        {[0, 1].map((index) => (
          <div key={index} className="w-9 h-12">
            {cards[index] ? (
              <Card
                card={{
                  ...cards[index],
                  faceUp: isCurrentUser ? true : cards[index].faceUp,
                }}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full rounded border border-black/10" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {isDealer && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            D
          </Badge>
        )}
        {isSmallBlind && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            SB
          </Badge>
        )}
        {isBigBlind && (
          <Badge variant="outline" className="text-xs py-0 px-1 h-5">
            BB
          </Badge>
        )}
        {isAllIn && (
          <Badge variant="destructive" className="text-xs py-0 px-1 h-5">
            All-In
          </Badge>
        )}
        {bet > 0 && (
          <Badge variant="secondary" className="text-xs py-0 px-1 h-5">
            Bet: ${bet}
          </Badge>
        )}
      </div>
    </div>
  );
}
