"use client";

import { useState, useEffect } from "react";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { GameState } from "@/lib/types";
import { initializeGame, dealCards } from "@/lib/poker-utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [showSetup, setShowSetup] = useState<boolean>(true);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>("player-0");

  // Initialize game when player count changes
  useEffect(() => {
    if (!showSetup && !gameState) {
      const initialState = initializeGame(playerCount);
      const stateWithCards = dealCards(initialState);
      setGameState(stateWithCards);
    }
  }, [showSetup, gameState, playerCount]);

  // Handle game state changes
  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  // Handle starting a new game
  const handleStartGame = () => {
    setShowSetup(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      {gameState ? (
        <div className="w-full h-full relative">
          <PokerTable gameState={gameState} currentPlayerId={currentPlayerId} />
          <GameControls
            gameState={gameState}
            onGameStateChange={handleGameStateChange}
            currentPlayerId={currentPlayerId}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p>Loading game...</p>
        </div>
      )}

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
                Number of Players: {playerCount}
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
              <label htmlFor="player-id" className="text-sm font-medium">
                Your Position
              </label>
              <select
                id="player-id"
                value={currentPlayerId}
                onChange={(e) => setCurrentPlayerId(e.target.value)}
                className="w-full p-2 rounded-md border"
              >
                {Array.from({ length: playerCount }).map((_, i) => (
                  <option key={i} value={`player-${i}`}>
                    Player {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleStartGame}>Start Game</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
