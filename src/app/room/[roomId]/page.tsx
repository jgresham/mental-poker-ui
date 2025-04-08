"use client";

import { useParams } from "next/navigation";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { useGetRoom } from "../../../api/mocks";

export default function Room() {
  const params = useParams();
  const roomId = params.roomId as string;

  const { data: room, isLoading, isError } = useGetRoom(roomId);

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
              room={room}
              currentPlayerId={room.players[0]?.id}
              roomId={roomId || ""}
            />
            <GameControls
              gameState={room?.gameState}
              currentPlayerId={room.players?.[0]?.id}
              isPlayerTurn={true}
            />
          </>
        )}
      </div>
    </main>
  );
}
