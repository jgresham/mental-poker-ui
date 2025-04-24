import React from "react";
import { type Room, type Player, MAX_PLAYERS, GameStageToString } from "@/lib/types";
import { PlayerUI } from "./PlayerUI";
import { Card } from "./Card";
import { useAccount } from "wagmi";
import { useRoundKeys } from "../../hooks/localRoomState";
import { zeroAddress } from "viem";

interface PokerTableProps {
  room?: Room;
  players: Player[];
  roomId?: string;
}

export function PokerTable({ room, players, roomId }: PokerTableProps) {
  const { address } = useAccount();
  const { data: roundKeys } = useRoundKeys(room?.id, room?.roundNumber);

  if (!room) {
    return <p>Loading...</p>;
  }
  const { communityCards, pot, stage, dealerPosition, currentPlayerIndex, roundNumber } =
    room;
  console.log("/components/game/PokerTable room, players", room, players);
  // Calculate positions for players around the table
  // const getPlayerPositions = (playerCount: number, currentPlayerIndex: number) => {
  const getPlayerPositions = (playerCount: number) => {
    // For mobile optimization, we'll arrange players in a circular pattern
    const positions = [];
    // Reduce the radius to bring players closer to the center
    const radius = 35; // % of container (reduced from 45%)
    const centerX = 50;
    const centerY = 50;

    // Find the current player's index
    // const currentIndex = currentPlayerIndex !== -1 ? currentPlayerIndex : 0;
    const currentIndex = 0;

    for (let i = 0; i < playerCount; i++) {
      // Calculate the position relative to the current player
      // This ensures the current player is always at the bottom
      const relativePosition = (i - currentIndex + playerCount) % playerCount;

      // Calculate angle based on relative position
      // Start at bottom (270 degrees) for the current player
      const angle = (relativePosition * (360 / playerCount) + 270) * (Math.PI / 180);

      // Calculate position using trigonometry
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      positions.push({ x, y });
    }

    return positions;
  };

  // Find the current player's index
  // const currentPlayerIndex = players.findIndex((player) => player.addr === address);

  // not using players.length here. We don't want players to move around
  // const positions = getPlayerPositions(MAX_PLAYERS, currentPlayerIndex);
  const positions = getPlayerPositions(MAX_PLAYERS);
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-green-800 rounded-3xl overflow-hidden">
      {/* Poker table felt */}
      <div className="z-10 absolute top-2 left-2 text-[8px] text-gray-400">
        Room: {roomId}
        <br />
        Round: {roundNumber}
        <br />
        Keys:
        <br />
        r: {roundKeys?.r?.toString().substring(0, 5)}
        <br />
        pub: {roundKeys?.publicKey?.toString().substring(0, 5)}
        <br />
        priv: {roundKeys?.privateKey?.toString().substring(0, 5)}
      </div>
      <div className="absolute inset-[5%] bg-green-700 rounded-[40%] border-8 border-brown-800 shadow-inner">
        {/* Pot amount */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-black/30 text-white px-3 py-1 rounded-full text-sm">
          Pot: ${pot}
        </div>

        {/* Community cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
          {communityCards?.map((card) => (
            <Card
              key={card.suit + card.rank}
              card={card}
              className="w-12 h-16 sm:w-14 sm:h-20"
            />
          ))}
          {/* Placeholder for missing community cards */}
          {Array.from({ length: 5 - communityCards?.length || 0 }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-12 h-16 sm:w-14 sm:h-20 rounded-md border-2 border-dashed border-white/20"
            />
          ))}
        </div>

        {/* Game stage indicator */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 bg-black/30 text-white px-3 py-1 rounded-full text-xs uppercase">
          {GameStageToString[stage]}
        </div>
      </div>

      {/* Players positioned around the table */}
      <div className="absolute inset-0">
        {players.map((player) => {
          if (player.addr === zeroAddress) {
            return null;
          }
          const position = positions[player.seatPosition];
          const isCurrentUser = player.addr === address;

          console.log("player.seatPosition", player.seatPosition);
          console.log("dealerPosition", dealerPosition);
          if (player.playerIndex === dealerPosition) {
            player.isDealer = true;
          }
          if (player.playerIndex === currentPlayerIndex) {
            player.isTurn = true;
          } else {
            player.isTurn = false;
          }

          return (
            <div
              key={player.addr}
              className="z-10 absolute w-[110px] transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <PlayerUI player={player} isCurrentUser={isCurrentUser} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
