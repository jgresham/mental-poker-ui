"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { GameState } from "@/lib/types";
import { initializeGame, dealCards } from "@/lib/poker-utils";

export default function Room() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const roomId = params.roomId as string;
  const playerCount = parseInt(searchParams.get("players") || "4");
  const currentPlayerId = searchParams.get("position") || "player-0";

  useEffect(() => {
    const initialState = initializeGame(playerCount);
    const stateWithCards = dealCards(initialState);
    setGameState(stateWithCards);
  }, [playerCount]);

  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  if (!gameState) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading game...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="w-full h-full relative">
        <PokerTable
          gameState={gameState}
          currentPlayerId={currentPlayerId}
          roomId={roomId}
        />
        <GameControls
          gameState={gameState}
          onGameStateChange={handleGameStateChange}
          currentPlayerId={currentPlayerId}
        />
      </div>
    </main>
  );
}
