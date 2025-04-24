"use client";

import { useParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PokerTable } from "@/components/game/PokerTable";
import { GameControls } from "@/components/game/GameControls";
import {
  useWriteTexasHoldemRoomJoinGame,
  useReadTexasHoldemRoomGetPlayerIndexFromAddr,
  useWatchTexasHoldemRoomEvent,
  useWatchDeckHandlerEvent,
  useWriteTexasHoldemRoomResetRound,
} from "../../../generated";
import { Button } from "../../../components/ui/button";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState } from "react";
import { useGetBulkRoomData, useGetPlayers } from "../../../wagmi/wrapper";
import { ADMIN_ADDRESSES, getCommunityCards } from "../../../lib/utils";
import { useRoundKeys } from "../../../hooks/localRoomState";
import { type Room as RoomType, type Card, GameStage } from "../../../lib/types";
import { toast } from "sonner";

export default function Room() {
  const params = useParams();
  const { address } = useAccount();
  const roomId = params.roomId as string;
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);

  const { data: getPlayerIndexFromAddr, refetch: refetchGetPlayerIndexFromAddr } =
    useReadTexasHoldemRoomGetPlayerIndexFromAddr({
      args: [address as `0x${string}`],
    });
  const { data: players, refetch: refetchPlayers } = useGetPlayers();
  const { data: roomData, refetch: refetchRoomData } = useGetBulkRoomData();
  console.log(
    "/room/[roomId] useReadTexasHoldemRoom non-bulk properties",
    players,
    getPlayerIndexFromAddr,
  );
  console.log(
    "/room/[roomId] useReadDeckHandlerGetPublicVariables all properties",
    roomData,
  );
  const { data: roundKeys } = useRoundKeys(roomId, roomData?.roundNumber);

  const { writeContractAsync: joinGame, isPending: isJoiningGame } =
    useWriteTexasHoldemRoomJoinGame();

  const { writeContractAsync: resetRound, isPending: isResettingRound } =
    useWriteTexasHoldemRoomResetRound();

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

  useWatchTexasHoldemRoomEvent({
    onLogs: (logs) => {
      console.log("Texas Holdem Room event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchGetPlayerIndexFromAddr();
      refetchPlayers();
    },
  });

  useWatchDeckHandlerEvent({
    onLogs: (logs) => {
      console.log("Deck Handler event logs", logs);
      // refretch all contract data
      refetchRoomData();
      refetchGetPlayerIndexFromAddr();
      refetchPlayers();
    },
  });
  // Destructure all properties except encryptedDeck to keep it mutable
  const {
    stage,
    isPrivate,
    smallBlind,
    bigBlind,
    pot,
    currentStageBet,
    dealerPosition,
    currentPlayerIndex,
    lastRaiseIndex,
    numPlayers,
    roundNumber,
  } = roomData ?? {
    stage: GameStage.Idle,
  };

  // Access encryptedDeck directly from roomData to keep it mutable
  const encryptedDeck = roomData?.encryptedDeck.concat() || [];

  // setTimeout(() => {
  //   console.log("refetching numPlayers", numPlayersUpdatedAt, numPlayers);
  //   refetchNumPlayers();
  // }, 5000);

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

  const handleResetRound = async () => {
    try {
      setTxStatus("Submitting reset round transaction...");
      const hash = await resetRound({
        args: [],
      });
      setTxHash(hash);
      setTxStatus("Transaction submitted, waiting for confirmation...");
    } catch (error) {
      console.error("Error joining game:", error);
      setTxStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  useEffect(() => {
    if (
      roomData &&
      roomData.stage !== undefined &&
      roomData.encryptedDeck !== undefined &&
      roomData.numPlayers !== undefined
    ) {
      if (roomData.stage >= GameStage.Flop) {
        try {
          const communityCards = getCommunityCards({
            stage: roomData.stage,
            numOfPlayers: roomData.numPlayers,
            encryptedDeck: roomData.encryptedDeck,
          });
          console.log("communityCards", communityCards);
          setCommunityCards(communityCards);
        } catch (error) {
          console.error("Error getting community cards:", error);
          toast.error("Error decrypting table cards");
          setCommunityCards([]);
        }

        return;
      }
    } else {
      console.log("roomData is not ready yet", roomData);
    }
    setCommunityCards([]);
  }, [roomData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-5 right-5 z-20">
        <ConnectButton />
      </div>
      <div className="w-full h-full relative">
        <>
          <div className="flex flex-col gap-2 mb-4">
            <Button onClick={handleJoinGame} disabled={isJoiningGame || isWaitingForTx}>
              {isJoiningGame
                ? "Submitting..."
                : isWaitingForTx
                  ? "Confirming..."
                  : "Join Game"}
            </Button>

            {address && ADMIN_ADDRESSES.includes(address) && (
              <Button
                onClick={handleResetRound}
                disabled={isResettingRound || isWaitingForTx}
              >
                {isResettingRound
                  ? "Submitting..."
                  : isWaitingForTx
                    ? "Resetting..."
                    : "Reset Round"}
              </Button>
            )}

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
          {/* Dev view: Display all the properties of the game state */}
          <div className="flex flex-row gap-2 text-[8px]">
            <span>Small Blind: {smallBlind}</span>
            <span>Big Blind: {bigBlind}</span>
            <span>Pot: {pot}</span>
            <span>Current Stage Bet: {currentStageBet}</span>
            <span>Dealer Position: {dealerPosition}</span>
            <span>Current Player Index: {currentPlayerIndex}</span>
            <span>Last Raise Index: {lastRaiseIndex}</span>
            <span>Community Cards: {JSON.stringify(communityCards)}</span>
            {/* <span>Encrypted Deck: {encryptedDeck}</span> */}
            <span>Logged in Player Index: {getPlayerIndexFromAddr}</span>
            {/* <span>Players: {JSON.stringify(players)}</span> */}
            <span>
              Round Keys. priv. r. pub.
              <br />
              {JSON.stringify(roundKeys.privateKey, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
              <br />
              {JSON.stringify(roundKeys.r, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
              <br />
              {JSON.stringify(roundKeys.publicKey, (key, value) =>
                typeof value === "bigint" ? value.toString() : value,
              )}
            </span>
          </div>
          <PokerTable
            room={
              {
                ...roomData,
                id: roomId,
                communityCards,
                encryptedDeck: encryptedDeck,
              } as RoomType
            }
            players={players || []}
            roomId={roomId || ""}
          />
          <GameControls
            room={{
              id: roomId,
              roundNumber: Number(roundNumber),
              stage,
              isPrivate: isPrivate ?? false,
              smallBlind: Number(smallBlind),
              bigBlind: Number(bigBlind),
              pot: Number(pot),
              numPlayers: Number(numPlayers),
              currentStageBet: Number(currentStageBet),
              dealerPosition: Number(dealerPosition),
              currentPlayerIndex: Number(currentPlayerIndex),
              lastRaiseIndex: Number(lastRaiseIndex),
              encryptedDeck: encryptedDeck,
              communityCards,
            }}
            player={players?.find((player) => player.addr === address)}
          />
        </>
      </div>
    </main>
  );
}
