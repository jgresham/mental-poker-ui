"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { GameState } from "@/lib/types";
import { useGetRoom } from "../../../api/mocks";

export default function Room() {
  const params = useParams();
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    communityCards: [],
    pot: 0,
    stage: "preflop",
    deck: [],
    currentBet: 0,
    activePlayerIndex: 0,
    dealerIndex: 0,
    smallBlindAmount: 0,
    bigBlindAmount: 0,
  });
  const roomId = params.roomId as string;

  const { data: room, isLoading, isError } = useGetRoom(roomId);

  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading room</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading game...</p>
      </div>
    );
  }

  console.log("/room/[roomId] room", room);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="w-full h-full relative">
        {room && (
          <>
            <PokerTable
              gameState={room}
              currentPlayerId={room.players[0]?.id}
              roomId={room.id || ""}
            />
            <GameControls
              gameState={gameState}
              onGameStateChange={handleGameStateChange}
              currentPlayerId={room.players?.[0]?.id}
            />
          </>
        )}
      </div>
    </main>
  );
}
