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
  useReadTexasHoldemRoomGetPlayersIndexFromAddress,
  useWriteTexasHoldemRoomJoinGame,
  useReadTexasHoldemRoomGetPlayerByIndex,
  useReadTexasHoldemRoomGetPlayers,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";

export default function Room() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [txStatus, setTxStatus] = useState<string | null>(null);

  const { data: room, isLoading, isError } = useGetRoom(roomId);
  // const { data: room } = watchContractEvent(config, {
  //   address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   abi: [],
  //   functionName: "getRoom",
  //   args: [roomId],
  // });
  const { data: gameStage } = useReadTexasHoldemRoomStage({});
  console.log("/room/[roomId] useReadTexasHoldemRoomStage gameStage", gameStage);
  const { data: isPrivate } = useReadTexasHoldemRoomIsPrivate({
    // address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    // args: [],
  });
  console.log("/room/[roomId] useReadTexasHoldemRoomIsPrivate isPrivate", isPrivate);
  const { data: smallBlind } = useReadTexasHoldemRoomSmallBlind({});
  console.log("/room/[roomId] useReadTexasHoldemRoomSmallBlind smallBlind", smallBlind);
  const { data: playerIndex } = useReadTexasHoldemRoomGetPlayersIndexFromAddress({
    args: ["0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"],
  });
  console.log(
    "/room/[roomId] useReadTexasHoldemRoomGetPlayersIndexFromAddress playerIndex",
    playerIndex,
  );
  const { data: player } = useReadTexasHoldemRoomGetPlayerByIndex({
    args: [playerIndex || BigInt(0)],
  });
  console.log("/room/[roomId] useReadTexasHoldemRoomGetPlayerByIndex player", player);
  const { data: players } = useReadTexasHoldemRoomGetPlayers({
    args: [],
  });
  console.log("/room/[roomId] useReadTexasHoldemRoomGetPlayers players", players);

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

  console.log("/room/[roomId] gameStage", gameStage);
  console.log("/room/[roomId] smallBlind", smallBlind);
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
