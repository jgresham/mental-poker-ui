"use client";

import { useParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import { useGetRoom } from "../../../api/mocks";
import {
  useReadTexasHoldemRoomStage,
  useReadTexasHoldemRoomIsPrivate,
  useReadTexasHoldemRoomSmallBlind,
  useWriteTexasHoldemRoomJoinGame,
  useReadTexasHoldemRoomBigBlind,
  useReadTexasHoldemRoomDealerPosition,
  useReadTexasHoldemRoomCurrentPlayerIndex,
  useReadTexasHoldemRoomLastRaiseIndex,
  useReadTexasHoldemRoomEncryptedDeck,
  useReadTexasHoldemRoomCommunityCards,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { useGetPlayers } from "../../../wagmi/wrapper";

export default function Room() {
  const params = useParams();
  const { address } = useAccount();
  const roomId = params.roomId as string;
  const [txStatus, setTxStatus] = useState<string | null>(null);

  const { data: room, isLoading, isError } = useGetRoom(roomId);
  // const { data: room } = watchContractEvent(config, {
  //   address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   abi: [],
  //   functionName: "getRoom",
  //   args: [roomId],
  // });
  const { data: stage } = useReadTexasHoldemRoomStage({});
  const { data: isPrivate } = useReadTexasHoldemRoomIsPrivate({});
  const { data: smallBlind } = useReadTexasHoldemRoomSmallBlind({});
  const { data: bigBlind } = useReadTexasHoldemRoomBigBlind({});
  const { data: dealerPosition } = useReadTexasHoldemRoomDealerPosition({});
  const { data: currentPlayerIndex } = useReadTexasHoldemRoomCurrentPlayerIndex({});
  const { data: lastRaiseIndex } = useReadTexasHoldemRoomLastRaiseIndex({});
  const { data: communityCards } = useReadTexasHoldemRoomCommunityCards({});
  const { data: encryptedDeck } = useReadTexasHoldemRoomEncryptedDeck({});
  const { data: players } = useGetPlayers();
  console.log(
    "/room/[roomId] useReadTexasHoldemRoom all properties",
    stage,
    isPrivate,
    smallBlind,
    bigBlind,
    dealerPosition,
    currentPlayerIndex,
    lastRaiseIndex,
    communityCards,
    encryptedDeck,
    players,
  );

  const { writeContractAsync: joinGame, isPending: isJoiningGame } =
    useWriteTexasHoldemRoomJoinGame();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const {
    data: txResult,
    isLoading: isWaitingForTx,
    isSuccess: isTxSuccess,
    isError: isTxError,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  console.log("/room/[roomId] joinGame txResult", txResult); // txResult.status === "success", txResult.logs = []
  console.log("/room/[roomId] transaction error", txError);

  // Extract contract revert reason if available
  const revertReason = txError?.message
    ? txError.message.includes("reverted")
      ? txError.message.split("reverted:")[1]?.trim() || txError.message
      : txError.message
    : null;

  //     GameStage stage;
  //     uint256 pot;
  //     uint256 currentStageBet; // per player (to stay in the round)
  //     uint256 smallBlind;
  //     uint256 bigBlind;
  //     uint256 dealerPosition;
  //     uint256 currentPlayerIndex;
  //     uint256 lastRaiseIndex;
  //     string[5] communityCards;
  //     BigNumber[] encryptedDeck;

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

  const handleJoinGame = async () => {
    try {
      setTxStatus("Submitting transaction...");
      const hash = await joinGame({
        args: [],
      });
      setTxHash(hash);
      setTxStatus("Transaction submitted, waiting for confirmation...");
    } catch (error) {
      console.error("Error joining game:", error);
      setTxStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-5 right-5 z-20">
        <ConnectButton />
      </div>
      <div className="w-full h-full relative">
        {room && (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <Button onClick={handleJoinGame} disabled={isJoiningGame || isWaitingForTx}>
                {isJoiningGame
                  ? "Submitting..."
                  : isWaitingForTx
                    ? "Confirming..."
                    : "Join Game"}
              </Button>

              {txStatus && (
                <div className="text-sm p-2 bg-gray-100 rounded">Status: {txStatus}</div>
              )}

              {txHash && (
                <div className="text-sm p-2 bg-gray-100 rounded">
                  Transaction Hash: {txHash}
                </div>
              )}

              {isTxSuccess && (
                <div className="text-sm p-2 bg-green-100 rounded">
                  Transaction confirmed! You have joined the game.
                </div>
              )}
              {isTxError && (
                <div className="text-sm p-2 bg-red-100 rounded">
                  Transaction failed: {revertReason || txError?.message}
                </div>
              )}
            </div>

            <PokerTable
              room={{
                stage,
                isPrivate,
                smallBlind,
                pot: room.pot,
                ...room,
              }}
              players={players || []}
              roomId={roomId || ""}
            />
            <GameControls
              gameState={room?.gameState}
              isPlayerTurn={true}
              player={players?.find((player) => player.addr === address)}
            />
          </>
        )}
      </div>
    </main>
  );
}
