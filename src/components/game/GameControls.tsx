import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { GameState, Player } from "@/lib/types";
// import { dealCommunityCards, getNextStage, nextPlayer } from "@/lib/poker-utils";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {
  DECK,
  formatCardDeckForShuffleAndEncrypt,
  shuffleAndEncryptDeck,
} from "../../lib/encrypted-poker-1chunk";
import {
  useReadTexasHoldemRoomEncryptedDeck,
  useWriteTexasHoldemRoomSubmitEncryptedShuffle,
} from "../../generated";
interface GameControlsProps {
  gameState: GameState;
  player?: Player;
  onGameStateChange?: (newState: GameState) => void;
  currentPlayerId?: string;
  isPlayerTurn?: boolean;
}

export function GameControls({ gameState, isPlayerTurn, player }: GameControlsProps) {
  const [betAmount, setBetAmount] = useState<number>(gameState?.currentStageBet || 0);
  const router = useRouter();
  const { address } = useAccount();
  const { data: encryptedDeck } = useReadTexasHoldemRoomEncryptedDeck({});
  const {
    writeContractAsync: submitEncryptedDeck,
    isPending: isSubmittingEncryptedDeck,
    isSuccess: isSubmittingEncryptedDeckSuccess,
    isError: isSubmittingEncryptedDeckError,
  } = useWriteTexasHoldemRoomSubmitEncryptedShuffle();
  console.log("isSubmittingEncryptedDeck", isSubmittingEncryptedDeck);
  console.log("isSubmittingEncryptedDeckSuccess", isSubmittingEncryptedDeckSuccess);
  console.log("isSubmittingEncryptedDeckError", isSubmittingEncryptedDeckError);
  // const currentPlayer = currentPlayerId
  //   ? gameState.players.find((p) => p.id === currentPlayerId)
  //   : undefined;

  // const isPlayerTurn = currentPlayer?.isTurn || false;

  // Check if all active players have matched the current bet or are all-in
  // const allPlayersActed = gameState.players
  //   .filter((p) => p.isActive && !p.isAllIn)
  //   .every((p) => p.bet === gameState.currentStageBet || p.chips === 0);

  // Handle fold action
  const handleFold = () => {
    console.log("handleFold");
    // if (!isPlayerTurn || !currentPlayerId) return;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? { ...player, isActive: false, isTurn: false }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    // });

    // onGameStateChange?.(newState);
  };

  // Handle check action
  const handleCheck = () => {
    console.log("handleCheck");

    // if (!isPlayerTurn || !currentPlayerId) return;

    // // Can only check if current bet is 0 or player has already matched it
    // if (gameState.currentStageBet > 0 && currentPlayer?.bet !== gameState.currentStageBet)
    //   return;

    // const newState = nextPlayer(gameState);
    // onGameStateChange?.(newState);
  };

  // Handle call action
  const handleCall = () => {
    console.log("handleCall");

    // if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    // const amountToCall = gameState.currentStageBet - (currentPlayer.bet || 0);

    // // If player doesn't have enough chips, they go all-in
    // const isAllIn = currentPlayer.chips <= amountToCall;
    // const actualCallAmount = isAllIn ? currentPlayer.chips : amountToCall;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? {
    //         ...player,
    //         chips: player.chips - actualCallAmount,
    //         bet: player.bet + actualCallAmount,
    //         isAllIn: isAllIn,
    //       }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    //   pot: gameState.pot + actualCallAmount,
    // });

    // onGameStateChange(newState);
  };

  // Handle raise action
  const handleRaise = () => {
    console.log("handleRaise");
    // if (!isPlayerTurn || !currentPlayerId || !currentPlayer) return;

    // Calculate how much more the player needs to add
    // const currentPlayerBet = currentPlayer.bet || 0;
    // const amountToAdd = betAmount - currentPlayerBet;

    // // Check if player has enough chips
    // if (amountToAdd > currentPlayer.chips) return;

    // // Check if raise is at least the minimum (double the current bet)
    // if (betAmount < gameState.currentStageBet * 2) return;

    // const updatedPlayers = gameState.players.map((player) =>
    //   player.id === currentPlayerId
    //     ? {
    //         ...player,
    //         chips: player.chips - amountToAdd,
    //         bet: betAmount,
    //         isAllIn: player.chips - amountToAdd === 0,
    //       }
    //     : player,
    // );

    // const newState = nextPlayer({
    //   ...gameState,
    //   players: updatedPlayers,
    //   pot: gameState.pot + amountToAdd,
    //   currentStageBet: betAmount,
    // });

    // onGameStateChange(newState);
  };

  // Handle advancing to the next stage
  // const handleNextStage = () => {
  //   // if (!allPlayersActed) return;

  //   // Reset player bets for the new round
  //   const updatedPlayers = gameState.players.map((player) => ({
  //     ...player,
  //     bet: 0,
  //     isTurn: player.id === gameState.players[gameState.dealerIndex].id,
  //   }));

  //   // Move to the next stage and deal cards if needed
  //   const nextStage = getNextStage(gameState.stage);
  //   let newState: GameState = {
  //     ...gameState,
  //     players: updatedPlayers,
  //     stage: nextStage,
  //     currentStageBet: 0,
  //     currentPlayerIndex: gameState.dealerIndex,
  //   };

  //   // Deal community cards based on the new stage
  //   if (nextStage === "flop" || nextStage === "turn" || nextStage === "river") {
  //     newState = dealCommunityCards(newState);
  //   }

  //   onGameStateChange(newState);
  // };

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
  const canCheck = true;
  const canCall = true;
  const canRaise = true;
  //   gameState.currentStageBet === 0 ||
  //   (currentPlayer && currentPlayer.bet === gameState.currentStageBet);
  // const canCall =
  //   gameState.currentStageBet > 0 &&
  //   currentPlayer &&
  //   currentPlayer.bet < gameState.currentStageBet;
  // const canRaise = currentPlayer && currentPlayer.chips > 0;

  function handleShuffle() {
    console.log("handleShuffle");
    if (encryptedDeck === undefined) {
      // new encrypted deck from unencrypted deck
      const r = BigInt(
        "0x42487fec44e8ebebfae79a43ec4f15e29a5786ed7f560c14b1e063d1a665c26364c68ecb046fb187000fb48f5cf25cdbe5fe556040b8c501744ec352623fa6dde35cb29e971309bd5ffd2350336972a64e12fb38ba7470d08b5b05b065c42e82b48c97a3e4c577d7b78576cda00deb05caf92f56a7bb414a54262a399182ed8cf49954981886269ab273daa3da74e75541c5045f88dc57420e5d015e9f6cab562fa6580351410c31ed0401be6e6784641ffbd822fe65f0db9aed947d9eb8caf50ffa31c143492fc54aeda70c7ae710f4bd3b4fe3bb5801e38d72f47652f92db0d8f3cf2dd331a7786c887a6a176414289e76a7eb23c88bb87f05c01e21af7aac",
      );
      const publicKey = BigInt(
        "0x3604d113ebdc5af0d64c20b264ad9510bab5a5e30838e74f9166001957d57a4381053ea18cf365d4056c765553fd01701a16dc492b62b4aca50f4a7305f69d450c892d9fac8e5bb2262b85a8f5037a061a5f8374bf8d58172908c366a86a6768730a6e1b1f673d43c622b6bac660835af06f1d600193239c22461791f878dcccb5ba2d378eba454e0c35a2378d0389be911227e3fe82bd8071e5889feb8fe21696ff0170ba2c81b3ca734c07b2f3c1b3a698198151344f5cf4d473885b69d8ed97774ca246663e4dee223fb4379a86186e63ee49cf1a3afd07521d0d184db11155e116816e3e6432ca4cf577064e5e74359b2e70c4521b257dd2bfc4fad83ab3",
      );
      const privateKey = BigInt(
        "0x17961b1f461e2abcf70d0d2d6896ebc79602890102fbba7114bce0282452deb807b1cf193dddbe5330eec10abd9f35ca30cdf4c7a404bd5e7b8b493d6126361df60000f3ca12f630e95f4afdab15a7c264ee9c3df641ffaf008821a39c778fc163a8b54a6bb712437aa5bbf3a2c383362c69333bcc09f28804b61ca64012bb941ddbd7aa792416646504293e843e5f68805cca9a0817e23dbcff537f0b0929ccb6dd597ea3e63f888f70f954e71f59950b7a8dbcfe02128d7366499e5c7541910d4f050e9ee95bed9c045d5fdd6de504d080fccb6a06ba1f95a9de7fce9bca740028729c79ec352c32afb1f816708dcb997541ff8a281129588d54b31cc7203d",
      );
      const deck: {
        c1: bigint;
        c2: bigint;
      }[] = formatCardDeckForShuffleAndEncrypt({ deck: DECK, r });
      const encryptedDeck = shuffleAndEncryptDeck({
        encryptedDeck: deck,
        publicKey,
        r,
      });
      submitEncryptedDeck({
        args: [encryptedDeck],
      });
    } else {
      // encrypt and shuffle the existing encrypted deck
    }
    // if (!player) return;
    // onGameStateChange?.(newState);
  }
  if (!player) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 flex flex-col gap-1 z-10">
      <div className="flex justify-between items-center mb-1">
        <div className="text-white">
          <span className="text-xs sm:text-sm">Bet: ${gameState.currentStageBet}</span>
          <span className="text-xs sm:text-sm ml-2 sm:ml-4">Chips: ${player.chips}</span>
        </div>
      </div>

      {/* Player actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleShuffle}
        >
          Submit Shuffle
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleFold}
        >
          Reveal player cards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleFold}
        >
          Reveal community cards
        </Button>
      </div>
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
          Call ${gameState.currentStageBet}
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
      {isPlayerTurn && canRaise && player && (
        <div className="mt-1">
          <input
            type="range"
            min={gameState.currentStageBet * 2}
            max={player.chips + player.bet}
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
