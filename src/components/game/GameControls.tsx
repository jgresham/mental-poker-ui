import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { GameState } from "@/lib/types";
import { dealCommunityCards, getNextStage, nextPlayer } from "@/lib/poker-utils";
import { useRouter } from "next/navigation";
interface GameControlsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  currentPlayerId?: string;
}

export function GameControls({
  gameState,
  onGameStateChange,
  currentPlayerId,
}: GameControlsProps) {
  const [betAmount, setBetAmount] = useState<number>(gameState.currentBet);
  const router = useRouter();
  const currentPlayer = currentPlayerId
    ? gameState.players.find((p) => p.id === currentPlayerId)
    : undefined;

  const isPlayerTurn = currentPlayer?.isTurn || false;

  // Check if all active players have matched the current bet or are all-in
  const allPlayersActed = gameState.players
    .filter((p) => p.isActive && !p.isAllIn)
    .every((p) => p.bet === gameState.currentBet || p.chips === 0);

  // Handle fold action
  const handleFold = () => {
    if (!isPlayerTurn || !currentPlayerId) return;

    const updatedPlayers = gameState.players.map((player) =>
      player.id === currentPlayerId
        ? { ...player, isActive: false, isTurn: false }
        : player,
    );

    const newState = nextPlayer({
      ...gameState,
      players: updatedPlayers,
    });

    onGameStateChange(newState);
  };

  // Handle check action
  const handleCheck = () => {
    if (!isPlayerTurn || !currentPlayerId) return;

    // Can only check if current bet is 0 or player has already matched it
    if (gameState.currentBet > 0 && currentPlayer?.bet !== gameState.currentBet) return;

    const newState = nextPlayer(gameState);
    onGameStateChange(newState);
  };

  // Handle call action
  const handleCall = () => {
    if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    const amountToCall = gameState.currentBet - (currentPlayer.bet || 0);

    // If player doesn't have enough chips, they go all-in
    const isAllIn = currentPlayer.chips <= amountToCall;
    const actualCallAmount = isAllIn ? currentPlayer.chips : amountToCall;

    const updatedPlayers = gameState.players.map((player) =>
      player.id === currentPlayerId
        ? {
            ...player,
            chips: player.chips - actualCallAmount,
            bet: player.bet + actualCallAmount,
            isAllIn: isAllIn,
          }
        : player,
    );

    const newState = nextPlayer({
      ...gameState,
      players: updatedPlayers,
      pot: gameState.pot + actualCallAmount,
    });

    onGameStateChange(newState);
  };

  // Handle raise action
  const handleRaise = () => {
    if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    // Calculate how much more the player needs to add
    const currentPlayerBet = currentPlayer.bet || 0;
    const amountToAdd = betAmount - currentPlayerBet;

    // Check if player has enough chips
    if (amountToAdd > currentPlayer.chips) return;

    // Check if raise is at least the minimum (double the current bet)
    if (betAmount < gameState.currentBet * 2) return;

    const updatedPlayers = gameState.players.map((player) =>
      player.id === currentPlayerId
        ? {
            ...player,
            chips: player.chips - amountToAdd,
            bet: betAmount,
            isAllIn: player.chips - amountToAdd === 0,
          }
        : player,
    );

    const newState = nextPlayer({
      ...gameState,
      players: updatedPlayers,
      pot: gameState.pot + amountToAdd,
      currentBet: betAmount,
    });

    onGameStateChange(newState);
  };

  // Handle advancing to the next stage
  const handleNextStage = () => {
    if (!allPlayersActed) return;

    // Reset player bets for the new round
    const updatedPlayers = gameState.players.map((player) => ({
      ...player,
      bet: 0,
      isTurn: player.id === gameState.players[gameState.dealerIndex].id,
    }));

    // Move to the next stage and deal cards if needed
    const nextStage = getNextStage(gameState.stage);
    let newState: GameState = {
      ...gameState,
      players: updatedPlayers,
      stage: nextStage,
      currentBet: 0,
      currentPlayerIndex: gameState.dealerIndex,
    };

    // Deal community cards based on the new stage
    if (nextStage === "flop" || nextStage === "turn" || nextStage === "river") {
      newState = dealCommunityCards(newState);
    }

    onGameStateChange(newState);
  };

  // Handle leaving game
  const handleLeaveGame = () => {
    // ask the user to confirm they want to leave
    // if they leave during a round, warn them:
    // that their hand will be folded and they will forfeit any of their chips in the pot
    // if they confirm, leave the game
    // if they cancel, do nothing
    if (
      confirm(
        "Are you sure you want to leave the game? Any chips in the pot will be forfeited.",
      )
    ) {
      // Handle leaving logic here
      router.push("/");
    }
  };

  // Determine which buttons should be enabled
  const canCheck =
    gameState.currentBet === 0 ||
    (currentPlayer && currentPlayer.bet === gameState.currentBet);
  const canCall =
    gameState.currentBet > 0 && currentPlayer && currentPlayer.bet < gameState.currentBet;
  const canRaise = currentPlayer && currentPlayer.chips > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 flex flex-col gap-1 z-10">
      <div className="flex justify-between items-center mb-1">
        <div className="text-white">
          <span className="text-xs sm:text-sm">Bet: ${gameState.currentBet}</span>
          {currentPlayer && (
            <span className="text-xs sm:text-sm ml-2 sm:ml-4">
              Chips: ${currentPlayer.chips}
            </span>
          )}
        </div>
      </div>

      {/* Player actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleFold}
        >
          Fold
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !canCheck}
          onClick={handleCheck}
        >
          Check
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !canCall}
          onClick={handleCall}
        >
          Call ${gameState.currentBet}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !canRaise}
          onClick={handleRaise}
        >
          Raise to ${betAmount}
        </Button>
      </div>

      {/* Bet slider */}
      {isPlayerTurn && canRaise && currentPlayer && (
        <div className="mt-1">
          <input
            type="range"
            min={gameState.currentBet * 2}
            max={currentPlayer.chips + currentPlayer.bet}
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full h-4"
          />
        </div>
      )}

      <div>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 text-xs px-2"
          onClick={handleLeaveGame}
        >
          Leave Game
        </Button>
      </div>

      {/* Dealer controls - only visible when it's time to advance the game */}
      {/* {allPlayersActed && gameState.stage !== "ended" && (
        <div className="mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs sm:text-sm"
            onClick={handleNextStage}
          >
            {gameState.stage === "river" ? "Show Cards" : "Next Round"}
          </Button>
        </div>
      )} */}
    </div>
  );
}
