import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Action,
  type Room,
  type Player,
  BETTING_STAGES,
} from "@/lib/types";
import { useWaitForTransactionReceipt } from "wagmi";

import {
  useWriteTexasHoldemRoomSubmitAction,
} from "../../generated";
import { toast } from "sonner";
import {
  useRoundKeys,
} from "../../hooks/localRoomState";

interface GameControlsProps {
  room: Room;
  player?: Player;
  currentPlayerId?: string;
}

export function GameControls({ room, player }: GameControlsProps) {
  console.log("GameControls room", room);
  console.log("GameControls player", player);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  console.log("GameControls isPlayerTurn", isPlayerTurn);


  const [betAmount, setBetAmount] = useState<number>(room?.currentStageBet || 0);
  const { data: roundKeys } = useRoundKeys(room.id, Number(room.roundNumber));
  console.log("GameControls roundKeys", roundKeys);

  console.log("encryptedDeck", room.encryptedDeck);

  const [txHash2, setTxHash2] = useState<string | undefined>(undefined);
  const {
    data: txResult,
    isLoading: isWaitingForTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError2,
  } = useWaitForTransactionReceipt({
    hash: txHash2 as `0x${string}`,
  });
  console.log("txReceipt", txResult);
  console.log("txReceipt2", isWaitingForTx);
  console.log("isTxSuccess", isTxSuccess);
  console.log("isTxError", isTxError);
  console.log("txError2", txError2);
  console.log("txError2.cause", txError2?.cause);
  console.log("txError2 user message", txError2?.message.split("\n")[0]);
  console.log("txError2 error message", txError2?.message);
  console.log("txError2.stack", txError2?.stack);
  console.log("txError2.name", txError2?.name);

  const { writeContractAsync: submitAction } = useWriteTexasHoldemRoomSubmitAction();

  useEffect(() => {
    if (room?.currentStageBet) {
      setBetAmount(room?.currentStageBet * 2);
    } else {
      if (room.bigBlind) {
        setBetAmount(room.bigBlind);
      } else {
        setBetAmount(0);
      }
    }
  }, [room?.currentStageBet, room?.bigBlind]);

  useEffect(() => {
    if (txError2) {
      toast.error(txError2.message.split("\n")[0], {
        duration: 30000,
        closeButton: true,
      });
    }
  }, [txError2]);

  useEffect(() => {
    console.log(
      "GC: setIsPlayerTurn",
      room.currentPlayerIndex,
      player?.playerIndex,
      room.currentPlayerIndex === player?.playerIndex,
    );
    if (room.currentPlayerIndex !== undefined && player?.playerIndex !== undefined) {
      setIsPlayerTurn(room.currentPlayerIndex === player?.playerIndex);
    }
  }, [player?.playerIndex, room.currentPlayerIndex]);


  // gen c1InversePowPrivateKey
  // const c1T = BigInt(
  //   "0xf2665a38a624f4842a01609269daac7f5551e117c56297acd911b173c9b9203e8b62e8f3eb936b4848011b7c229a9ff9b57d3f0373a0d3888e5488728568a920b2cd389e19fc1359b009f50951bafe9102433b334c30383fab880e082349182a3c2beef01f923a678d916413eafb730d4d65cdbe5edeec265cc36d12bfa096019aea81a423a94b514086a6c96d13492310d2d6681066b4e97ea0c9de988ef4546aa34a231e76debfab210de0b528d890a434ff656e73d6f6422c692e439b39f37dec20c354e8639f50319298e795e1cdae8aef6473b73704f17f9b5e03538a94f24993eab43dd806ad6baacbbcf51143f789b168a3a732d00e94570f9e42e91a",
  // );
  // const pT = BigInt(
  //   "0xab3bdb680cf7a5d81d32b1a3d6114c57803ef26b1a9451a24653f1b146560f423c35cdeb8ee4fcbd1df5cbf6643b9f544cdf2cc779fc6f9cc28929eaa38eb1a8742b84c24947e254f3c5434e34b2daf71efa1f6326128cc7d6d6500c8d963d4759189e4bae75e34d84945beb541a9b9cb441de2522066d057e0562a16d71b26a1406d054790885d3dbd8fda8f311b4c60c2e8fa7b73dbc288177925f16a98308448d58186500d21ab42c4a0678e7ec63c5a59aa30e2091363c21b09dee1740f6289a75917c29e9aeca8d835ad599fe8a21dd5c910302c6c25ce50b6d16f16799ca6552ee5148d92ee34a69e188dc4161df1237b28861810f05b43d13f47ba333",
  // );
  // const c1InversePowPrivateKey = modInverse(bigintModArith.modPow(c1T, pT, p2048), p2048);
  // console.log("c1InversePowPrivateKey", bigintToHexString(c1InversePowPrivateKey));
  // console.log("c1InversePowPrivateKey2", bigintToHexString(modInverse(c1T, p2048)));

  // Handle fold action
  const handleFold = async () => {
    console.log("handleFold");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Fold, BigInt(0)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle check action
  const handleCheck = async () => {
    console.log("handleCheck");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Check, BigInt(0)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle call action
  const handleCall = async () => {
    console.log("handleCall");
    if (!player) return;
    console.log("handleCall player", player, room.currentPlayerIndex, room.currentPlayerIndex === player.playerIndex);
    const txHash = await submitAction({
      args: [Action.Call, BigInt(0)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Handle raise action
  const handleRaise = async () => {
    console.log("handleRaise");
    if (!player) return;
    const txHash = await submitAction({
      args: [Action.Raise, BigInt(betAmount)],
    });
    console.log("txHash", txHash);
    setTxHash2(txHash);
  };

  // Determine which buttons should be enabled
  // todo: set bet buttons based on players chip amount
  // const canCheck = true;
  // const canCall = true;
  // const canRaise = true;
  //   gameState.currentStageBet === 0 ||
  //   (currentPlayer && currentPlayer.bet === gameState.currentStageBet);
  // const canCall =
  //   gameState.currentStageBet > 0 &&
  //   currentPlayer &&
  //   currentPlayer.bet < gameState.currentStageBet;
  // const canRaise = currentPlayer && currentPlayer.chips > 0;

  // , [encryptedDeck, isPlayerTurn, roundKeys, submitEncryptedDeck, player]);

  if (!player) return null;

  const isBettingStage = BETTING_STAGES.includes(room.stage);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900 p-2 flex flex-col gap-1 z-10 pb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="text-white">
          <span className="text-xs sm:text-sm">Bet: ${room?.currentStageBet}</span>
          <span className="text-xs sm:text-sm ml-2 sm:ml-4">Chips: ${player.chips}</span>
        </div>
      </div>

      {/* Player actions */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
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
          onClick={handleRevealPlayerCards}
        >
          Reveal player cards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleDecryptMyCardsLocally}
        >
          Reveal my cards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn}
          onClick={handleRevealCommunityCards}
        >
          Reveal community cards
        </Button>
      </div> */}
      {/* Bet slider */}
      {isPlayerTurn && player && isBettingStage && (
        <div className="mt-1">
          <label htmlFor="betAmount" className="text-xs sm:text-sm text-white">
            Bet amount ${betAmount}
          </label>
          <input
            type="range"
            min={room?.currentStageBet ? room.currentStageBet * 2 : 0}
            max={
              player?.chips && player?.currentStageBet
                ? player.chips + player.currentStageBet
                : 1000
            }
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full h-4"
          />
        </div>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 sm:gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !isBettingStage}
          onClick={handleFold}
        >
          Fold
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 text-xs sm:text-sm"
          disabled={!isPlayerTurn || !isBettingStage}
          onClick={handleCheck}
        >
          Check
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm bg-green-600"
          disabled={!isPlayerTurn || !isBettingStage}
          onClick={handleCall}
        >
          Call ${room?.currentStageBet !== undefined ? room.currentStageBet : 0}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 text-xs sm:text-sm bg-green-700"
          disabled={!isPlayerTurn || !isBettingStage}
          onClick={handleRaise}
        >
          Raise ${betAmount}
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
