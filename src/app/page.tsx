"use client";

import { useState, useEffect } from "react";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { GameState } from "@/lib/types";
import { initializeGame, dealCards } from "@/lib/poker-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useCreateRoom } from "../api/mocks";

export default function Home() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(8);
  const [showSetup, setShowSetup] = useState<boolean>(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>("player-0");
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const { mutate: createRoom, isPending: isCreatingRoom } = useCreateRoom();

  // Initialize game when player count changes
  useEffect(() => {
    if (!showSetup && !gameState) {
      const initialState = initializeGame(playerCount);
      const stateWithCards = dealCards(initialState);
      setGameState(stateWithCards);
    }
  }, [showSetup, gameState, playerCount]);

  // Handle starting a new game
  const handleStartGame = () => {
    createRoom(
      { isPrivate: !isPublic },
      {
        onSuccess: (createdRoom) => {
          router.push(`/room/${createdRoom.id}`);
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="w-full h-screen bg-green-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Card pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-white rounded-md"></div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="z-10 max-w-3xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Mental Poker
          </h1>

          <p className="text-xl md:text-2xl text-green-100">
            Secure, trustless poker without a third party
          </p>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Play Texas Hold&apos;em Without Trust
            </h2>
            <p className="mb-6">
              Mental Poker uses cryptographic protocols to ensure fair play without
              requiring a trusted dealer. Your cards remain private, the deck is provably
              shuffled, and the game is verifiably fair.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowSetup(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
              >
                Start Playing
              </Button>

              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() =>
                  window.open("https://en.wikipedia.org/wiki/Mental_poker", "_blank")
                }
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Provably Fair</h3>
              <p>
                Cryptographically verified shuffling and dealing ensures no one can cheat.
              </p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">No Middleman</h3>
              <p>
                Play directly with other players without a central server controlling the
                game.
              </p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">Private & Secure</h3>
              <p>Your cards remain hidden from everyone else, just like in real poker.</p>
            </div>
          </div>
        </div>

        {/* Decorative cards */}
        <div className="absolute -bottom-10 -left-10 transform rotate-12 opacity-30">
          <div className="w-32 h-44 bg-white rounded-lg shadow-lg"></div>
        </div>
        <div className="absolute -top-10 -right-10 transform -rotate-12 opacity-30">
          <div className="w-32 h-44 bg-white rounded-lg shadow-lg"></div>
        </div>
      </div>
      {/* Game setup dialog */}
      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Texas Hold&apos;em Poker</DialogTitle>
            <DialogDescription>
              Set up your poker game. You can have between 2 and 10 players.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="player-count" className="text-sm font-medium">
                Max number of players: {playerCount}
              </label>
              <input
                id="player-count"
                type="range"
                min={2}
                max={10}
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="room-type" className="text-sm font-medium">
                Room Type
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isPublic ? "default" : "outline"}
                  onClick={() => setIsPublic(true)}
                  className="flex-1"
                >
                  Public
                </Button>
                <Button
                  variant={isPublic ? "outline" : "default"}
                  onClick={() => setIsPublic(false)}
                  className="flex-1"
                  disabled={true}
                  title="Coming soon"
                >
                  Private (coming soon)
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                {isPublic
                  ? "Anyone with the link can join this room."
                  : "Only invited players can join this room."}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleStartGame} disabled={isCreatingRoom}>
              Start Game {isCreatingRoom && "loading..."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
